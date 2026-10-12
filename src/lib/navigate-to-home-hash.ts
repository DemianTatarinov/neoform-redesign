import type { UseNavigateResult } from '@tanstack/react-router';
import { scrollToHashTarget } from '@/lib/scroll-to-section';

export const CROSS_PAGE_HASH_SCROLL_MS = 150;

/** Navigate to `/` with hash, then scroll once the home route is mounted. */
export function navigateToHomeHash(
  navigate: UseNavigateResult<string>,
  targetId: string,
) {
  return Promise.resolve(
    navigate({
      to: '/',
      hash: targetId,
      resetScroll: true,
    }),
  ).then(() => {
    window.setTimeout(() => {
      scrollToHashTarget(targetId);
    }, CROSS_PAGE_HASH_SCROLL_MS);
  });
}
