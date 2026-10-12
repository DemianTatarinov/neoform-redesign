export const CONTACT_HASH = 'kontakt';
export const HOME_HASH_SCROLL_DELAY_MS = 125;

const SCROLL_TARGET_STORAGE_KEY = 'neoform-scroll-target';
const SCROLL_CONTACT_FLAG = 'contact';

export function isDocumentReloadNavigation(): boolean {
  if (typeof performance === 'undefined') return false;
  const entries = performance.getEntriesByType?.('navigation');
  if (entries?.length) {
    return (entries[0] as PerformanceNavigationTiming).type === 'reload';
  }
  const legacy = performance as Performance & { navigation?: { type: number } };
  return legacy.navigation?.type === 1;
}

export function resolveHashScrollTarget(hashId: string): HTMLElement | null {
  const id = hashId.replace(/^#/, '');
  if (!id || id === SCROLL_CONTACT_FLAG || id === CONTACT_HASH) {
    return document.querySelector<HTMLElement>('.contact-footer');
  }
  return document.getElementById(id);
}

export function scrollToHashTarget(hashId: string, behavior: ScrollBehavior = 'smooth') {
  const target = resolveHashScrollTarget(hashId);
  if (!target) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({
    behavior: reduced ? 'auto' : behavior,
    block: 'start',
  });
}

export function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth') {
  scrollToHashTarget(id, behavior);
}

export function scrollToContactSection(behavior: ScrollBehavior = 'smooth') {
  scrollToHashTarget(CONTACT_HASH, behavior);
}

/** @deprecated Use navigate({ to: '/', hash }) and `useHomeHashScroll` on the home route. */
export function queueScrollToSection(sectionId: string) {
  try {
    sessionStorage.setItem(SCROLL_TARGET_STORAGE_KEY, sectionId);
  } catch {
    // ignore
  }
}

/** @deprecated Use navigate({ to: '/', hash: CONTACT_HASH }). */
export function queueScrollToContact() {
  queueScrollToSection(SCROLL_CONTACT_FLAG);
}

/** @deprecated Replaced by hash URL + `useHomeHashScroll`. */
export function consumeQueuedScrollTarget() {
  try {
    const id = sessionStorage.getItem(SCROLL_TARGET_STORAGE_KEY);
    if (!id) return;
    sessionStorage.removeItem(SCROLL_TARGET_STORAGE_KEY);
    if (isDocumentReloadNavigation()) return;
    window.setTimeout(() => {
      scrollToHashTarget(id === SCROLL_CONTACT_FLAG ? CONTACT_HASH : id, 'auto');
    }, HOME_HASH_SCROLL_DELAY_MS);
  } catch {
    // ignore
  }
}
