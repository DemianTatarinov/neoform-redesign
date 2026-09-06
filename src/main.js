import { gsap } from 'gsap';

// Global State
let contentData = null;
let hasScrolled = false;

// Initialize Application
async function initApp() {
  try {
    const res = await fetch('/src/data/content.json');
    if (!res.ok) throw new Error('Failed to load content.json');
    contentData = await res.json();

    renderContent(contentData);
    initCustomCursor();
    initScrollAndNavHandlers();
    initEntranceAnimations();
  } catch (err) {
    console.error('Error initializing application:', err);
  }
}

// Render Exact Copy Deck
function renderContent(data) {
  if (!data) return;

  if (data.footerStamp) {
    const stampEl = document.getElementById('footer-stamp');
    if (stampEl) stampEl.textContent = data.footerStamp;
  }

  if (data.scrollHint) {
    const scrollEl = document.getElementById('scroll-text');
    if (scrollEl) scrollEl.textContent = data.scrollHint;
  }

  // 01 / PROLOGUE
  if (data.prologue) {
    document.getElementById('prologue-eyebrow').textContent = data.prologue.eyebrow;
    document.getElementById('prologue-headline').textContent = data.prologue.headline;
    document.getElementById('prologue-subline').textContent = data.prologue.subline;
  }

  // 02 / MANIFESTO
  if (data.manifesto) {
    document.getElementById('manifesto-eyebrow').textContent = data.manifesto.eyebrow;
    document.getElementById('manifesto-headline').textContent = data.manifesto.headline;
    document.getElementById('manifesto-body').textContent = data.manifesto.body;
  }

  // 03 / DISCIPLINES
  if (data.disciplines) {
    document.getElementById('disciplines-eyebrow').textContent = data.disciplines.eyebrow;
    document.getElementById('disciplines-sub-eyebrow').textContent = data.disciplines.subEyebrow;
    document.getElementById('disciplines-body').textContent = data.disciplines.body;
  }

  // 04 / EXHIBITION
  if (data.exhibition) {
    document.getElementById('exhibition-eyebrow').textContent = data.exhibition.eyebrow;
    document.getElementById('exhibition-sub-eyebrow').textContent = data.exhibition.subEyebrow;
    document.getElementById('exhibition-headline').textContent = data.exhibition.headline;
    document.getElementById('exhibition-body').textContent = data.exhibition.body;
  }

  // 05 / METHODOLOGY
  if (data.methodology) {
    document.getElementById('methodology-eyebrow').textContent = data.methodology.eyebrow;
    document.getElementById('methodology-headline').textContent = data.methodology.headline;
    document.getElementById('methodology-body').textContent = data.methodology.body;
  }

  // 06 / INITIATION
  if (data.initiation) {
    document.getElementById('initiation-eyebrow').textContent = data.initiation.eyebrow;
    document.getElementById('initiation-headline').textContent = data.initiation.headline;
    document.getElementById('initiation-body').textContent = data.initiation.body;
    document.getElementById('initiation-cta').textContent = data.initiation.cta;
  }
}

// Custom Magnetic Cursor
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  gsap.ticker.add(() => {
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    gsap.set(cursor, { x: cursorX, y: cursorY });
  });

  const interactiveElements = document.querySelectorAll('a, button, .index-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  });
}

// Entrance Choreography using IntersectionObserver + GSAP
function initEntranceAnimations() {
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.index-item');

  const observerOptions = {
    root: null,
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const secIndex = parseInt(entry.target.getAttribute('data-section'), 10);

        // Highlight corresponding Nav Index
        navItems.forEach((nav, idx) => {
          if (idx === secIndex) {
            nav.classList.add('active');
          } else {
            nav.classList.remove('active');
          }
        });

        // Background Parallax Scale Down
        const bg = entry.target.querySelector('.section-bg');
        if (bg) {
          gsap.fromTo(bg,
            { scale: 1.08 },
            { scale: 1.0, duration: 1.4, ease: 'power2.out' }
          );
        }

        // Eyebrow & Sub-eyebrow fade + slide
        const eyebrows = entry.target.querySelectorAll('.eyebrow, .sub-eyebrow');
        if (eyebrows.length) {
          gsap.fromTo(eyebrows,
            { y: -15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
          );
        }

        // Headline Mask Reveal
        const headline = entry.target.querySelector('.film-headline');
        if (headline) {
          gsap.fromTo(headline,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.15 }
          );
        }

        // Body copy slide
        const body = entry.target.querySelector('.content-bottom-left');
        if (body) {
          gsap.fromTo(body,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.3 }
          );
        }

        // Apply Kinetic Accent Flicker to active section headline
        if (headline) {
          headline.classList.add('kinetic-flicker');
        }
      } else {
        const headline = entry.target.querySelector('.film-headline');
        if (headline) {
          headline.classList.remove('kinetic-flicker');
        }
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

// Scroll & Navigation Handlers
function initScrollAndNavHandlers() {
  const scrollHint = document.getElementById('scroll-hint');

  // Fade out scroll-hint permanently after first scroll / swipe
  function handleFirstScroll() {
    if (!hasScrolled) {
      hasScrolled = true;
      if (scrollHint) {
        scrollHint.style.opacity = '0';
        setTimeout(() => scrollHint.remove(), 600);
      }
      window.removeEventListener('scroll', handleFirstScroll);
      window.removeEventListener('wheel', handleFirstScroll);
      window.removeEventListener('touchmove', handleFirstScroll);
    }
  }

  window.addEventListener('scroll', handleFirstScroll, { passive: true });
  window.addEventListener('wheel', handleFirstScroll, { passive: true });
  window.addEventListener('touchmove', handleFirstScroll, { passive: true });

  // Index Nav Click Smooth Scroll
  const navItems = document.querySelectorAll('.index-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Run application on DOM ready
document.addEventListener('DOMContentLoaded', initApp);
