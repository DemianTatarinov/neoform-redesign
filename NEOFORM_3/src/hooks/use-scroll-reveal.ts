import { useEffect, type RefObject } from 'react';

const revealTargets = [
  'h2', 'h3', 'p', '.section-label', '.paragraphs', '.individuality',
  '.principles-heading', '.principle', '.team-photo', '.technology-tiles',
  '.material-grid figure', '.image-text > img', '.system-names', '.text-link',
  '.process-grid article', '.portfolio-filters', '.gallery-photo-button',
  '.gallery-caption', '.evolution-wordmark', '.about-evolution > div:first-child',
'.footer-top', '.footer-bottom', '.contact-map', '.neo-lab-accordion',
].join(', ');

/** Progressive enhancement: server-rendered content stays readable without JS. */
export function useScrollReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const candidates = Array.from(root.querySelectorAll<HTMLElement>(revealTargets))
      .filter(element => !element.closest('.hero, .site-header, .mobile-nav'));
    const candidateSet = new Set(candidates);
    // Animate content groups once, not both parent and child simultaneously.
    const targets = candidates.filter(element => {
      let ancestor = element.parentElement;
      while (ancestor && ancestor !== root) {
        if (candidateSet.has(ancestor)) return false;
        ancestor = ancestor.parentElement;
      }
      return true;
    });

    const show = (element: HTMLElement) => {
      element.dataset['reveal'] = 'visible';
      observer?.unobserve(element);
    };
    const setup = () => {
      observer?.disconnect();
      if (motionPreference.matches) {
        targets.forEach(element => element.removeAttribute('data-reveal'));
        return;
      }
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) show(entry.target);
        });
      }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

      targets.forEach(element => {
        // Never hide content already on screen, including direct anchor visits.
        const rect = element.getBoundingClientRect();
        if (element.dataset['reveal'] === 'visible' || (rect.top < window.innerHeight && rect.bottom > 0)) {
          show(element);
        } else {
          element.dataset['reveal'] = 'pending';
          observer?.observe(element);
        }
      });
    };
    const revealFocusedContent = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      const target = event.target.closest<HTMLElement>('[data-reveal="pending"]');
      if (target) show(target);
    };

    setup();
    motionPreference.addEventListener('change', setup);
    root.addEventListener('focusin', revealFocusedContent);
    return () => {
      observer?.disconnect();
      motionPreference.removeEventListener('change', setup);
      root.removeEventListener('focusin', revealFocusedContent);
      targets.forEach(element => element.removeAttribute('data-reveal'));
    };
  }, [rootRef]);
}