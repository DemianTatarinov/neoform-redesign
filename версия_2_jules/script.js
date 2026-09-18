/**
 * NeoKuchnie - Landing Page Vanilla JavaScript
 * Mobile Burger Menu, Sticky Header, Popup Modal, Cookie Banner & Counter
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --------------------------------------------------------------------------
       1. STICKY HEADER TRANSITION ON SCROLL
       -------------------------------------------------------------------------- */
    const header = document.getElementById('header');

    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Initialize on page load

    /* --------------------------------------------------------------------------
       2. MOBILE BURGER MENU TOGGLE
       -------------------------------------------------------------------------- */
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const openMobileNav = () => {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileNav = () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (burgerMenu) {
        burgerMenu.addEventListener('click', openMobileNav);
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileNav);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    /* --------------------------------------------------------------------------
       3. POPUP MODAL CONSULTATION TOGGLE
       -------------------------------------------------------------------------- */
    const popupModal = document.getElementById('popupModal');
    const popupClose = document.getElementById('popupClose');
    const popupBackdrop = document.getElementById('popupBackdrop');
    const openPopupBtns = document.querySelectorAll('.open-popup-btn');

    const openPopup = (e) => {
        if (e) e.preventDefault();
        if (popupModal) {
            popupModal.classList.add('active');
            popupModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    };

    const closePopup = () => {
        if (popupModal) {
            popupModal.classList.remove('active');
            popupModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    openPopupBtns.forEach(btn => {
        btn.addEventListener('click', openPopup);
    });

    if (popupClose) {
        popupClose.addEventListener('click', closePopup);
    }

    if (popupBackdrop) {
        popupBackdrop.addEventListener('click', closePopup);
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupModal && popupModal.classList.contains('active')) {
            closePopup();
        }
    });

    /* --------------------------------------------------------------------------
       4. COOKIE BANNER DISMISSAL
       -------------------------------------------------------------------------- */
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');

    const hideCookieBanner = () => {
        if (cookieBanner) {
            cookieBanner.classList.add('hidden');
        }
    };

    // Check localStorage
    if (localStorage.getItem('neoKuchnieCookieConsent')) {
        hideCookieBanner();
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('neoKuchnieCookieConsent', 'accepted');
            hideCookieBanner();
        });
    }

    if (cookieReject) {
        cookieReject.addEventListener('click', () => {
            localStorage.setItem('neoKuchnieCookieConsent', 'rejected');
            hideCookieBanner();
        });
    }

    /* --------------------------------------------------------------------------
       5. ANIMATED COUNTER ON SCROLL
       -------------------------------------------------------------------------- */
    const counterNumbers = document.querySelectorAll('.counter-number');
    const counterSection = document.getElementById('counter');
    let animated = false;

    const animateCounters = () => {
        counterNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1500; // ms
            const step = Math.max(1, Math.floor(target / (duration / 16)));

            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = current;
                }
            }, 16);
        });
    };

    if (counterSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(counterSection);
    } else if (counterSection) {
        // Fallback for browsers without IntersectionObserver
        animateCounters();
    }

    /* --------------------------------------------------------------------------
       6. FORM SUBMISSION FEEDBACK
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const popupForm = document.getElementById('popupForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Dziękujemy za kontakt! Twój formularz został wysłany. Skontaktujemy się z Tobą w ciągu 24h.');
            contactForm.reset();
        });
    }

    if (popupForm) {
        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Dziękujemy! Twoje zgłoszenie na konsultację zostało przyjęte. Oddzwonimy w celu potwierdzenia terminu.');
            popupForm.reset();
            closePopup();
        });
    }
});
