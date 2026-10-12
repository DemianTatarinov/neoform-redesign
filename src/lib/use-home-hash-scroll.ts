import { useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';
import { CROSS_PAGE_HASH_SCROLL_MS } from '@/lib/navigate-to-home-hash';
import {
  isDocumentReloadNavigation,
  scrollToHashTarget,
} from '@/lib/scroll-to-section';

/** Smooth scroll to `location.hash` after home route mount (not on F5 reload). */
export function useHomeHashScroll() {
  const hash = useRouterState({
    select: state => {
      const raw = state.location.hash ?? '';
      return raw.startsWith('#') ? raw.slice(1) : raw;
    },
  });

  useEffect(() => {
    if (isDocumentReloadNavigation()) return;
    if (!hash) return;

    const timer = window.setTimeout(() => {
      scrollToHashTarget(hash);
    }, CROSS_PAGE_HASH_SCROLL_MS);

    return () => window.clearTimeout(timer);
  }, [hash]);
}
