/** Shared layout tokens for photo gallery modals (card + horizontal swipe). */

export const galleryOverlayLayoutClass =
  'flex items-center justify-center p-4';

export const galleryCardClass =
  'h-auto min-h-0 w-auto max-w-[95vw] sm:max-w-[88vw] md:max-w-5xl max-h-[92dvh] flex flex-col overflow-hidden min-w-0';

export const galleryBarClass = 'shrink-0';

export const galleryPhotoWrapClass =
  'relative flex w-full min-w-0 items-center justify-center overflow-hidden py-2';

export const galleryTrackClass =
  'flex h-auto w-full overflow-x-auto snap-x snap-mandatory touch-pan-x scroll-smooth overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

export const gallerySlideClass =
  'relative flex w-full shrink-0 flex-[0_0_100%] snap-center items-center justify-center';

export const galleryImageClass =
  'block h-auto w-full max-h-[72vh] select-none rounded-sm object-contain';

export const galleryDialogNavButtonClass =
  'h-8 w-8 rounded-sm hover:bg-neutral-100 active:scale-95';

export const galleryDialogCounterClass =
  'font-mono text-xs tracking-wider text-neutral-500';
