import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global State
let contentData = null;

// Initialize App
async function initApp() {
  try {
    const res = await fetch('/src/data/content.json');
    if (!res.ok) throw new Error('Failed to load content.json');
    contentData = await res.json();

    renderContent(contentData);
    initAmbientCanvas();
    initCustomCursor();
    initAnimations();
    initNavHandlers();
  } catch (err) {
    console.error('Error initializing application:', err);
  }
}

// Dynamic Content Injection
function renderContent(data) {
  if (!data) return;

  // Prologue
  if (data.prologue) {
    document.getElementById('prologue-tag').textContent = data.prologue.tag || '01 / PROLOGUE';
    document.getElementById('prologue-headline').textContent = data.prologue.headline;
    document.getElementById('prologue-subline').textContent = data.prologue.subline;
  }

  // Manifesto
  if (data.manifesto) {
    document.getElementById('manifesto-tag').textContent = data.manifesto.tag || '02 / MANIFESTO';
    document.getElementById('manifesto-headline').textContent = data.manifesto.headline;
    document.getElementById('manifesto-subline').textContent = data.manifesto.subline;

    const linesContainer = document.getElementById('manifesto-lines-container');
    linesContainer.innerHTML = '';
    const lines = data.manifesto.lines || [
      'PRZEKUWAMY TOŻSAMOŚĆ MARKI',
      'W MONUMENTALNE LITERY PRZESTRZENNE',
      'I KINETYCZNE NEONY.'
    ];

    lines.forEach(lineText => {
      const lineEl = document.createElement('div');
      lineEl.className = 'line-item';
      lineEl.textContent = lineText;
      linesContainer.appendChild(lineEl);
    });
  }

  // Disciplines
  if (data.disciplines) {
    document.getElementById('disciplines-tag').textContent = data.disciplines.tag || '03 / DISCIPLINES';
    document.getElementById('disciplines-headline').textContent = data.disciplines.headline;
    document.getElementById('disciplines-subline').textContent = data.disciplines.subline;

    const marquee = document.getElementById('disciplines-marquee');
    marquee.innerHTML = '';
    const items = data.disciplines.items || ['KASETONY LED', 'LITERY 3D', 'NEONY KINETYCZNE'];

    // Duplicate list to create continuous flow
    const renderList = [...items, ...items, ...items];
    renderList.forEach((itemText) => {
      const itemEl = document.createElement('span');
      itemEl.className = 'marquee-item';
      itemEl.textContent = `${itemText} — `;
      marquee.appendChild(itemEl);
    });
  }

  // Exhibition
  if (data.exhibition) {
    document.getElementById('exhibition-tag').textContent = data.exhibition.tag || '04 / EXHIBITION';
    document.getElementById('exhibition-headline').textContent = data.exhibition.headline;
    document.getElementById('exhibition-subline').textContent = data.exhibition.subline;
    if (data.exhibition.projectIndex) {
      document.getElementById('exhibition-index').textContent = data.exhibition.projectIndex;
    }
    if (data.exhibition.location) {
      document.getElementById('exhibition-location').textContent = data.exhibition.location;
    }
  }

  // Methodology
  if (data.methodology) {
    document.getElementById('methodology-tag').textContent = data.methodology.tag || '05 / METHODOLOGY';
    document.getElementById('methodology-headline').textContent = data.methodology.headline;
    document.getElementById('methodology-subline').textContent = data.methodology.subline;

    const stepsContainer = document.getElementById('methodology-steps-container');
    stepsContainer.innerHTML = '';
    const steps = data.methodology.steps || [
      '01 / RIGOROUS VISUALIZATION',
      '02 / KINETIC ENGINEERING',
      '03 / ARCHITECTURAL MOUNT'
    ];

    steps.forEach(stepText => {
      const stepCard = document.createElement('div');
      stepCard.className = 'step-card';
      stepCard.textContent = stepText;
      stepsContainer.appendChild(stepCard);
    });
  }

  // Initiation
  if (data.initiation) {
    document.getElementById('initiation-tag').textContent = data.initiation.tag || '06 / INITIATION';
    document.getElementById('initiation-headline').textContent = data.initiation.headline;
    document.getElementById('initiation-subline').textContent = data.initiation.subline;
    if (data.initiation.cta) {
      document.querySelector('#initiation-cta .cta-text').textContent = data.initiation.cta;
    }
  }
}

// Background Canvas Effect (Subtle Moving Noise/Particles)
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.5 + 0.1
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// Custom Magnetic Cursor Effect
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
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    gsap.set(cursor, { x: cursorX, y: cursorY });
  });

  // Hover states for magnetic effect
  const interactiveElements = document.querySelectorAll('a, button, .cta-button, .marquee-item, .step-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  });
}

// GSAP Animations & ScrollTrigger Integrations
function initAnimations() {

  // SECTION 1: Prologue
  // Animation Intent: power4.out slow reveal from bottom; elements smoothly track upwards while background scales down from 1.05 to 1.0 & desaturates.
  const prologueBg = document.querySelector('.prologue-bg-image');
  const prologueHeadline = document.getElementById('prologue-headline');
  const prologueSubline = document.getElementById('prologue-subline');

  gsap.from(prologueHeadline, {
    y: 120,
    opacity: 0,
    duration: 2.2,
    ease: 'power4.out',
    delay: 0.2
  });

  gsap.from(prologueSubline, {
    y: 60,
    opacity: 0,
    duration: 1.8,
    ease: 'power4.out',
    delay: 0.6
  });

  gsap.to(prologueBg, {
    scale: 1.0,
    filter: 'grayscale(60%)',
    ease: 'none',
    scrollTrigger: {
      trigger: '#prologue',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Track elements upward smoothly on scroll
  gsap.to(['#prologue-headline', '#prologue-subline', '#prologue-tag'], {
    y: -80,
    ease: 'none',
    scrollTrigger: {
      trigger: '#prologue',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // SECTION 2: Manifesto
  // Animation Intent: Staggered line-by-line scrub via ScrollTrigger; text opacities shift from 0.1 to 1.0 as they intersect the center of the viewport.
  const manifestoLines = document.querySelectorAll('.manifesto-lines .line-item');
  manifestoLines.forEach((line) => {
    gsap.to(line, {
      opacity: 1.0,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 75%',
        end: 'bottom 45%',
        scrub: true
      }
    });
  });

  gsap.from('#manifesto-headline', {
    x: -50,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#manifesto',
      start: 'top 60%',
      toggleActions: 'play none none reverse'
    }
  });

  // SECTION 3: Disciplines
  // Animation Intent: Pinned vertical scroll triggering a horizontal x-axis timeline; words wipe in using clip-path polygon reveals (ease: expo.inOut).
  const marqueeTrack = document.getElementById('disciplines-marquee');
  const marqueeItems = document.querySelectorAll('.marquee-item');

  // Clip-path polygon reveal
  gsap.from(marqueeItems, {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
    stagger: 0.1,
    duration: 1.2,
    ease: 'expo.inOut',
    scrollTrigger: {
      trigger: '#disciplines',
      start: 'top 60%',
      toggleActions: 'play none none reverse'
    }
  });

  // Horizontal scrub timeline for marquee
  gsap.to(marqueeTrack, {
    x: () => -(marqueeTrack.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: '#disciplines',
      start: 'top top',
      end: '+=1500',
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true
    }
  });

  // SECTION 4: Exhibition
  // Animation Intent: Parallax mask-image scale effect; photography grows from a thin vertical slit to full width while text floats upwards (y: 30, stagger: 0.2).
  const maskContainer = document.getElementById('exhibition-mask');

  gsap.to(maskContainer, {
    clipPath: 'inset(0 0% 0 0%)',
    ease: 'none',
    scrollTrigger: {
      trigger: '#exhibition',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true
    }
  });

  gsap.from(['#exhibition-headline', '#exhibition-subline', '.exhibition-meta'], {
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#exhibition',
      start: 'top 50%',
      toggleActions: 'play none none reverse'
    }
  });

  // SECTION 5: Methodology
  // Animation Intent: Text characters stagger in randomly with a rough ease; a hairline vertical line grows from top to bottom (duration: 1.5, ease: power2.out).
  const divider = document.getElementById('methodology-divider');
  gsap.to(divider, {
    height: '100%',
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#methodology',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  });

  // Random character stagger effect on headline
  const methodologyHeadline = document.getElementById('methodology-headline');
  if (methodologyHeadline) {
    const rawText = methodologyHeadline.textContent;
    methodologyHeadline.innerHTML = rawText.split('').map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');

    gsap.from('#methodology-headline .char', {
      opacity: 0,
      y: 20,
      rotateX: 90,
      stagger: {
        amount: 0.8,
        from: 'random'
      },
      duration: 1.0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#methodology',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  gsap.from('.step-card', {
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 1.0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#methodology-steps-container',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  // SECTION 6: Initiation
  // Animation Intent: Entire section fades from pure black to dark charcoal; hovering the typography triggers a magnetic GSAP cursor effect and dramatic scale distortion.
  gsap.fromTo('#initiation',
    { backgroundColor: '#000000' },
    {
      backgroundColor: '#0f1115',
      ease: 'none',
      scrollTrigger: {
        trigger: '#initiation',
        start: 'top 80%',
        end: 'top 20%',
        scrub: true
      }
    }
  );

  const bleedingHeadline = document.getElementById('initiation-headline');
  if (bleedingHeadline) {
    bleedingHeadline.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = bleedingHeadline.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.15;
      const y = (e.clientY - top - height / 2) * 0.15;

      gsap.to(bleedingHeadline, {
        x: x,
        y: y,
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    bleedingHeadline.addEventListener('mouseleave', () => {
      gsap.to(bleedingHeadline, {
        x: 0,
        y: 0,
        scale: 1.0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  }

  // Update active nav indicators based on section in view
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-item');

  sections.forEach((sec, i) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => setActiveNav(i),
      onEnterBack: () => setActiveNav(i)
    });
  });

  function setActiveNav(index) {
    navItems.forEach((nav, idx) => {
      if (idx === index) {
        nav.classList.add('active');
      } else {
        nav.classList.remove('active');
      }
    });

    // Update bottom scroll progress indicator
    const progress = ((index + 1) / sections.length) * 100;
    gsap.to('.scroll-progress', { width: `${progress}%`, duration: 0.4 });
  }
}

// Smooth navigation scroll handlers
function initNavHandlers() {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSec = document.querySelector(targetId);
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
