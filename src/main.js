import { gsap } from 'gsap';
import contentData from './data/content.json';

function initApp() {
  try {
    renderContent(contentData);
    initCustomCursor();
    initScrollAnimations();
    initStatsCounter();
    initOfertaAccordion();
    initFAQAccordion();
    initContactForm();
  } catch (err) {
    console.error('Initialization error:', err);
  }
}

function renderContent(data) {
  if (!data) return;

  // Hero Section
  if (data.hero) {
    document.getElementById('hero-badge').textContent = data.hero.badge || 'BIG SALE';
    document.getElementById('hero-quote').textContent = data.hero.quoteCta || '';
    document.getElementById('hero-subtitle').textContent = data.hero.subtitle || '';

    const featContainer = document.getElementById('hero-features');
    if (featContainer && data.hero.features) {
      featContainer.innerHTML = data.hero.features.map(f => `
        <span class="text-xs font-mono tracking-widest uppercase px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-300">
          ${f}
        </span>
      `).join('');
    }
  }

  // About Section
  if (data.about) {
    document.getElementById('about-p1').textContent = data.about.paragraph1 || '';
    document.getElementById('about-p2').textContent = data.about.paragraph2 || '';
    document.getElementById('about-p3').textContent = data.about.paragraph3 || '';

    const hlContainer = document.getElementById('about-highlights');
    if (hlContainer && data.about.highlights) {
      hlContainer.innerHTML = data.about.highlights.map(h => `
        <div class="p-8 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-colors duration-300">
          <h3 class="text-xl font-serif font-bold text-neutral-100 mb-3">${h.title}</h3>
          <p class="text-neutral-400 font-light text-sm leading-relaxed">${h.desc}</p>
        </div>
      `).join('');
    }

    const partnersContainer = document.getElementById('partners-list');
    if (partnersContainer && data.about.partners) {
      partnersContainer.innerHTML = data.about.partners.map(p => `
        <span class="px-4 py-2 border border-neutral-900 bg-neutral-950 rounded-lg hover:border-neutral-700 transition-colors">${p}</span>
      `).join('');
    }
  }

  // Oferta Section
  if (data.oferta && data.oferta.items) {
    const ofertaAccordion = document.getElementById('oferta-accordion');
    if (ofertaAccordion) {
      ofertaAccordion.innerHTML = data.oferta.items.map((item, idx) => `
        <div class="oferta-item group cursor-pointer border-b border-neutral-800 py-6" data-img="${item.image}">
          <div class="flex justify-between items-center mb-3">
            <span class="font-mono text-xs text-amber-500">${item.id}</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-neutral-200 group-hover:text-white transition-colors">${item.title}</h3>
            <span class="text-xl text-neutral-500 group-hover:text-white transition-transform transform group-hover:translate-x-2">→</span>
          </div>
          <p class="text-neutral-400 font-light text-sm max-w-xl hidden group-hover:block transition-all duration-300">${item.description}</p>
        </div>
      `).join('');
    }
  }

  // Portfolio Section
  if (data.portfolio && data.portfolio.projects) {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (portfolioGrid) {
      portfolioGrid.innerHTML = data.portfolio.projects.map(p => `
        <div class="group cursor-pointer overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950">
          <div class="aspect-[4/3] overflow-hidden">
            <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          </div>
          <div class="p-6">
            <span class="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-1">${p.category}</span>
            <h3 class="text-xl font-serif font-bold text-neutral-100">${p.title}</h3>
          </div>
        </div>
      `).join('');
    }
  }

  // FAQ Section
  if (data.faq && data.faq.items) {
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) {
      faqContainer.innerHTML = data.faq.items.map(item => `
        <div class="accordion-item py-6 cursor-pointer">
          <div class="flex justify-between items-center select-none">
            <h3 class="text-lg md:text-xl font-serif font-semibold text-neutral-200">${item.question}</h3>
            <span class="accordion-icon text-2xl font-mono text-neutral-500 transition-transform duration-300">+</span>
          </div>
          <div class="accordion-content">
            <p class="pt-4 text-neutral-400 font-light text-sm leading-relaxed">${item.answer}</p>
          </div>
        </div>
      `).join('');
    }
  }

  // Contact / Footer Section
  if (data.contact) {
    document.getElementById('contact-address').textContent = data.contact.address || '';
    document.getElementById('contact-phone').textContent = data.contact.phone || '';
    document.getElementById('contact-phone').setAttribute('href', `tel:${(data.contact.phone || '').replace(/\s+/g, '')}`);
    document.getElementById('contact-email').textContent = data.contact.email || '';
    document.getElementById('contact-email').setAttribute('href', `mailto:${data.contact.email || ''}`);
    document.getElementById('contact-hours').textContent = data.contact.hours || '';
    document.getElementById('copyright-text').textContent = data.contact.copyright || 'Copyright © 2023 Neoform';
  }
}

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

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, input, textarea, .cursor-pointer')) {
      document.body.classList.add('cursor-active');
    } else {
      document.body.classList.remove('cursor-active');
    }
  });
}

function initScrollAnimations() {
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    gsap.from(heroTitle, { opacity: 0, y: 40, duration: 1.2, ease: 'power3.out', delay: 0.2 });
  }

  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) {
    gsap.from(heroSubtitle, { opacity: 0, y: 30, duration: 1.2, ease: 'power3.out', delay: 0.4 });
  }
}

function initStatsCounter() {
  const statItems = document.querySelectorAll('.stat-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target.querySelector('[data-target]');
        const counter = entry.target.querySelector('.counter');
        if (container && counter) {
          const target = parseInt(container.getAttribute('data-target'), 10);
          gsap.to(counter, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out'
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statItems.forEach(item => observer.observe(item));
}

function initOfertaAccordion() {
  const items = document.querySelectorAll('.oferta-item');
  const imgEl = document.getElementById('oferta-preview-img');

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const newSrc = item.getAttribute('data-img');
      if (imgEl && newSrc) {
        imgEl.src = newSrc;
      }
    });
  });
}

function initFAQAccordion() {
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.accordion-item');
    if (!item) return;

    const isActive = item.classList.contains('active');
    document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));

    if (!isActive) {
      item.classList.add('active');
    }
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (status) {
        status.classList.remove('hidden');
        form.reset();
        setTimeout(() => status.classList.add('hidden'), 5000);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initApp);
