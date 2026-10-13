import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';

type PhotoSwipeGalleryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  images: string[];
  returnFocusRef?: RefObject<HTMLElement | null>;
  imageAltLabel?: string;
};

export function PhotoSwipeGalleryDialog({
  open,
  onOpenChange,
  title,
  images,
  returnFocusRef,
  imageAltLabel = 'Galeria',
}: PhotoSwipeGalleryDialogProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRaf = useRef<number | null>(null);

  const photos = images.length > 0 ? images : [];

  const scrollToSlide = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children.item(index) as HTMLElement | null;
    slide?.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
  }, []);

  useEffect(() => {
    if (!open) return;
    setSlideIndex(0);
    requestAnimationFrame(() => scrollToSlide(0, 'instant'));
  }, [open, title, photos.length, scrollToSlide]);

  const onTrackScroll = () => {
    if (photos.length <= 1) return;
    if (scrollRaf.current !== null) cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const width = track.clientWidth;
      if (width <= 0) return;
      const nextIndex = Math.min(photos.length - 1, Math.max(0, Math.round(track.scrollLeft / width)));
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        lightbox
        onCloseAutoFocus={event => {
          if (!returnFocusRef) return;
          event.preventDefault();
          returnFocusRef.current?.focus({ preventScroll: true });
        }}
      >
        <div className="relative flex h-full min-h-0 w-full flex-1">
          <div className="relative flex h-full w-full items-center justify-center pointer-events-auto">
            <div
              ref={trackRef}
              className="flex h-full w-full overflow-x-auto snap-x snap-mandatory touch-pan-x scroll-smooth overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onScroll={onTrackScroll}
            >
              {photos.map((src, i) => (
                <div
                  key={`${title}-${i}-${src}`}
                  className="relative flex h-full w-full shrink-0 flex-[0_0_100%] snap-center items-center justify-center p-0 sm:p-8"
                >
                  <img
                    src={src}
                    alt={`${imageAltLabel} — ${i + 1}`}
                    className="block h-auto w-auto max-h-[100dvh] max-w-full select-none object-contain transition-transform duration-300 sm:max-h-full"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    width={1536}
                    height={1024}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute top-0 left-0 right-0 z-[60] flex items-center justify-between gap-4 bg-gradient-to-b from-black/60 to-transparent p-4 pointer-events-auto sm:p-6"
          >
            <DialogTitle
              className="m-0 min-w-0 flex-1 truncate pr-2 font-[family-name:var(--font-editorial)] text-lg font-normal uppercase tracking-wider text-white sm:text-2xl"
            >
              {title}
            </DialogTitle>
            <DialogClose
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40 sm:h-12 sm:w-12"
              aria-label="Zamknij galerię"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </DialogClose>
          </div>

          <div
            className="absolute bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-4 rounded-full bg-black/40 px-4 py-2 text-white backdrop-blur-md pointer-events-auto sm:bottom-8 sm:gap-6 sm:px-6 sm:py-3"
          >
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/20 disabled:opacity-40 sm:h-10 sm:w-10"
              aria-label="Poprzednie zdjęcie"
              onClick={() => stepSlide(-1)}
              disabled={photos.length <= 1}
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="font-mono text-[11px] tracking-widest text-white/90 sm:text-xs">
              {String(slideIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/20 disabled:opacity-40 sm:h-10 sm:w-10"
              aria-label="Następne zdjęcie"
              onClick={() => stepSlide(1)}
              disabled={photos.length <= 1}
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
