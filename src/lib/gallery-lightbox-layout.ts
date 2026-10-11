/** Shared layout tokens for photo gallery modals (card + horizontal swipe). */

export const galleryOverlayLayoutClass =
  'flex items-center justify-center p-4';

export const galleryCardClass =
  'w-full max-w-6xl h-auto max-h-[95dvh] max-lg:w-[95vw] max-lg:rounded-2xl flex flex-col overflow-hidden min-w-0';

export const galleryBarClass = 'shrink-0';

export const galleryPhotoWrapClass = 'm-0 h-auto w-full relative';

export const galleryTrackClass =
  'flex w-full h-auto overflow-x-auto snap-x snap-mandatory touch-pan-x scroll-smooth overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

export const gallerySlideClass =
  'relative w-full flex-[0_0_100%] h-auto flex snap-center items-center justify-center';

export const galleryImageClass =
  'mx-auto w-full h-auto max-h-[65vh] object-contain md:max-h-[85vh]';
