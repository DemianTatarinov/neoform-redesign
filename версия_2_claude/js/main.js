// NEOFORM — shared site behaviour

document.addEventListener('DOMContentLoaded', () => {
  initNavOverlay();
  initActiveNav();
  initHeroLetters();
  initReveal();
  initCounters();
  initFaq();
  initLightbox();
  initContactForm();
  initServiceQueryPrefill();
});

/* ---------- Fullscreen nav overlay ---------- */
function initNavOverlay() {
  const btn = document.querySelector('.hamburger');
  const overlay = document.querySelector('.nav-overlay');
  if (!btn || !overlay) return;

  const close = () => {
    btn.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
  };
  const open = () => {
    btn.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', 'true');
  };

  btn.addEventListener('click', () => {
    btn.classList.contains('is-open') ? close() : open();
  });
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ---------- Highlight active nav link ---------- */
function initActiveNav() {
  const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  document.querySelectorAll('[data-route]').forEach(a => {
    const route = a.getAttribute('data-route');
    const isHome = route === '/' && (path === '/' || path === '');
    if (isHome || (route !== '/' && path.endsWith(route))) {
      a.classList.add('active');
    }
  });
}

/* ---------- Hero letter-by-letter reveal ---------- */
function initHeroLetters() {
  document.querySelectorAll('[data-split-chars]').forEach(el => {
    const words = el.textContent.split(' ');
    el.textContent = '';
    let delay = 0;
    words.forEach((word, wi) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      [...word].forEach(ch => {
        const span = document.createElement('span');
        span.className = 'char';
        span.style.animationDelay = delay + 'ms';
        span.textContent = ch;
        wordSpan.appendChild(span);
        delay += 22;
      });
      el.appendChild(wordSpan);
      if (wi < words.length - 1) {
        el.appendChild(document.createTextNode(' '));
        delay += 22;
      }
    });
  });
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal, .end-line');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  items.forEach(el => io.observe(el));
}

/* ---------- Animated stat counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;
  if (!('IntersectionObserver' in window)) {
    counters.forEach(el => el.textContent = el.getAttribute('data-count-to'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count-to'), 10);
      const duration = 1600;
      const start = performance.now();
      const startVal = 0;
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(startVal + (target - startVal) * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => io.observe(el));
}

/* ---------- FAQ accordion ---------- */
function initFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => i.setAttribute('data-open', 'false'));
      item.setAttribute('data-open', isOpen ? 'false' : 'true');
    });
  });
}

/* ---------- Lightbox ---------- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const img = document.getElementById('lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const open = (src, alt) => {
    img.src = src;
    img.alt = alt || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      const innerImg = el.querySelector('img');
      const src = el.getAttribute('data-lightbox') || (innerImg && innerImg.src);
      const alt = innerImg && innerImg.alt;
      open(src, alt);
    });
  });

  closeBtn && closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ---------- Prefill message field from ?usluga= query param (Zamów buttons) ---------- */
function initServiceQueryPrefill() {
  const params = new URLSearchParams(window.location.search);
  const usluga = params.get('usluga');
  const textarea = document.getElementById('message');
  if (usluga && textarea && !textarea.value) {
    textarea.value = 'Interesuje mnie: ' + usluga.replace(/\+/g, ' ') + '. ';
  }
}

/* ---------- Contact form (Web3Forms — no backend required) ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const submitBtn = form.querySelector('.form-submit');
  const label = submitBtn ? submitBtn.querySelector('.btn-label') : null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const accessKey = form.querySelector('[name="access_key"]').value;
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      status.textContent = 'Formularz nie jest jeszcze skonfigurowany — brak klucza Web3Forms.';
      status.classList.remove('is-success');
      status.classList.add('is-visible', 'is-error');
      return;
    }

    submitBtn.disabled = true;
    if (label) label.textContent = 'Wysyłanie...';
    status.classList.remove('is-visible', 'is-error', 'is-success');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const result = await res.json();

      if (result.success) {
        status.textContent = 'Wiadomość została wysłana! Skontaktujemy się wkrótce.';
        status.classList.add('is-visible', 'is-success');
        form.reset();
      } else {
        throw new Error(result.message || 'Błąd wysyłki');
      }
    } catch (err) {
      status.textContent = 'Coś poszło nie tak. Zadzwoń do nas lub spróbuj ponownie.';
      status.classList.add('is-visible', 'is-error');
    } finally {
      submitBtn.disabled = false;
      if (label) label.textContent = 'WYŚLIJ';
    }
  });
}
