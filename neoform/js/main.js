document.addEventListener('DOMContentLoaded', () => {

  // 1. BURGER MENU LOGIC
  const burgerBtn = document.querySelector('.burger-menu');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  if (burgerBtn && navOverlay) {
    burgerBtn.addEventListener('click', () => {
      navOverlay.classList.toggle('is-active');
      if (navOverlay.classList.contains('is-active')) {
        burgerBtn.innerHTML = '<span>Zamknij</span>';
        document.body.style.overflow = 'hidden';
      } else {
        burgerBtn.innerHTML = '<span>Menu</span>';
        document.body.style.overflow = '';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navOverlay.classList.remove('is-active');
        burgerBtn.innerHTML = '<span>Menu</span>';
        document.body.style.overflow = '';
      });
    });
  }

  // 2. SCROLL ANIMATIONS
  const animatedElements = document.querySelectorAll('.animate-up');

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)';
      scrollObserver.observe(el);
    });
  }

  // 3. FAQ ACCORDION LOGIC
  const faqItems = document.querySelectorAll('.faq-item');
  if(faqItems.length > 0) {
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-q');
      btn.addEventListener('click', () => {
        const isOpen = item.getAttribute('data-open') === 'true';
        faqItems.forEach(i => i.setAttribute('data-open', 'false'));
        item.setAttribute('data-open', !isOpen);
      });
    });
  }

  // 4. COOKIE BANNER
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookies');

  if (!localStorage.getItem('neoform_cookies_accepted') && cookieBanner) {
    setTimeout(() => { cookieBanner.classList.add('is-visible'); }, 1500);
  }
  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('neoform_cookies_accepted', 'true');
      cookieBanner.classList.remove('is-visible');
    });
  }
});
