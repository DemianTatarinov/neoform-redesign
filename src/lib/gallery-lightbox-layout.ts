/** Shared layout tokens for photo gallery modals (card + horizontal swipe). */

export const galleryOverlayLayoutClass =
  'flex items-center justify-center p-4';

export const galleryCardClass =
  'h-auto min-h-0 w-[min(72rem,95vw)] max-w-[95vw] sm:max-w-[88vw] md:max-w-5xl max-h-[92dvh] flex flex-col overflow-hidden min-w-0';

export const galleryBarClass = 'shrink-0';

export const galleryPhotoWrapClass =
  'relative isolate w-full min-w-0 overflow-hidden p-0 aspect-[4/3]';

export const galleryTrackClass =
  'absolute inset-0 flex h-full w-full overflow-x-auto snap-x snap-mandatory touch-pan-x scroll-smooth overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

export const gallerySlideClass =
  'relative h-full min-w-full w-full flex-none snap-center overflow-hidden';

export const galleryImageClass =
  'absolute inset-0 h-full w-full max-w-none select-none object-cover';

export const galleryDialogNavButtonClass =
  'h-8 w-8 rounded-sm hover:bg-neutral-100 active:scale-95';

export const galleryDialogCounterClass =
  'font-mono text-xs tracking-wider text-neutral-500';
