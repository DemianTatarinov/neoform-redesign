import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';

const hardwareImageClassName =
  'block h-auto w-auto max-h-[calc(100dvh-10.5rem)] max-w-full object-contain select-none touch-pan-x pointer-events-auto sm:max-h-[calc(100dvh-12rem)]';

export function HardwareDialog({ brand, images, onOpenChange }: {
  brand: string | null;
  images: string[];
  onOpenChange: (open: boolean) => void;
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRaf = useRef<number | null>(null);
  const photos = images.map((src, photoIndex) => ({
    src,
    alt: brand ? `${brand} — detal mechanizmu ${photoIndex + 1}` : 'Detal mechanizmu',
  }));

  const scrollToSlide = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth;
    if (width <= 0) return;
    track.scrollTo({ left: index * width, behavior });
  }, []);

  useEffect(() => {
    if (brand === null) return;
    setSlideIndex(0);
    requestAnimationFrame(() => scrollToSlide(0, 'instant'));
  }, [brand, images, scrollToSlide]);

  useEffect(() => {
    if (brand === null) return;
    const onResize = () => scrollToSlide(slideIndex, 'instant');
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [brand, slideIndex, scrollToSlide]);

  const onTrackScroll = () => {
    if (photos.length <= 1) return;
    if (scrollRaf.current !== null) cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const width = track.clientWidth;
      if (width <= 0) return;
      const nextIndex = Math.min(
        photos.length - 1,
        Math.max(0, Math.round(track.scrollLeft / width)),
      );
      if (nextIndex !== slideIndex) setSlideIndex(nextIndex);
    });
  };

  const stepSlide = (delta: number) => {
    if (photos.length <= 1) return;
    const next = (slideIndex + delta + photos.length) % photos.length;
    setSlideIndex(next);
    scrollToSlide(next, 'smooth');
  };

  return (
    <Dialog open={brand !== null} onOpenChange={onOpenChange}>
      <DialogContent lightbox aria-describedby={undefined}>
        <DialogTitle className="sr-only">{brand}</DialogTitle>
        <div className="relative flex h-full min-h-0 w-full flex-1 pointer-events-auto">
          <div
            ref={trackRef}
            className="flex h-full w-full overflow-x-auto snap-x snap-mandatory touch-pan-x scroll-smooth overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={onTrackScroll}
          >
            {photos.map((photo, i) => (
              <div
                key={photo.src}
                className="flex h-full w-full shrink-0 flex-[0_0_100%] snap-center items-center justify-center p-4 sm:p-8"
              >
                <div className="flex max-h-full max-w-full flex-col items-center">
                  <div className="flex w-full shrink-0 items-center justify-between gap-4 pb-3">
                    <p className="m-0 min-w-0 flex-1 truncate pr-2 font-[family-name:var(--font-editorial)] text-lg font-normal uppercase tracking-wider text-white sm:text-2xl">
                      {brand}
                    </p>
                    <DialogClose
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40 sm:h-12 sm:w-12"
                      aria-label="Zamknij galerię"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </DialogClose>
                  </div>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className={hardwareImageClassName}
                    style={{ aspectRatio: 'auto', WebkitUserDrag: 'none' }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />
                  {photos.length > 1 && (
                    <div className="mt-3 flex shrink-0 items-center gap-4 rounded-full bg-black/40 px-4 py-2 text-white backdrop-blur-md sm:mt-4 sm:gap-6 sm:px-6 sm:py-3">
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/20 sm:h-10 sm:w-10"
                        aria-label="Poprzednie zdjęcie"
                        onClick={() => stepSlide(-1)}
                      >
                        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <span
                        className="font-mono text-[11px] tracking-widest text-white/90 sm:text-xs"
                        aria-live={i === slideIndex ? 'polite' : 'off'}
                        aria-label={`Zdjęcie ${i + 1} z ${photos.length}`}
                      >
                        {String(i + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                      </span>
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/20 sm:h-10 sm:w-10"
                        aria-label="Następne zdjęcie"
                        onClick={() => stepSlide(1)}
                      >
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
