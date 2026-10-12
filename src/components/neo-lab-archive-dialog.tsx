import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { galleryTrackClass } from '@/lib/gallery-lightbox-layout';

type NeoLabArchiveGalleryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  images: string[];
  returnFocusRef?: RefObject<HTMLElement | null>;
};

const archiveSlideClass =
  'relative flex w-full flex-[0_0_100%] snap-center items-center justify-center';

export function NeoLabArchiveGalleryDialog({
  open,
  onOpenChange,
  title,
  images,
  returnFocusRef,
}: NeoLabArchiveGalleryDialogProps) {
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
  }, [open, title, scrollToSlide]);

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
        galleryCard
        className="flex h-auto max-h-[92dvh] w-auto max-w-[92vw] flex-col gap-0 overflow-hidden rounded-xl border border-neutral-200/80 bg-white p-3 shadow-2xl sm:max-w-3xl sm:p-5 md:max-w-4xl"
        onCloseAutoFocus={event => {
          event.preventDefault();
          returnFocusRef?.current?.focus({ preventScroll: true });
        }}
      >
        <div className="flex shrink-0 items-center justify-between gap-2 pb-2">
          <DialogTitle
            className="m-0 max-w-[calc(100%-48px)] truncate text-sm font-semibold uppercase tracking-wide text-[#121315] sm:text-base"
          >
            {title}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-sm hover:bg-neutral-100"
              aria-label="Zamknij galerię"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </DialogClose>
        </div>
        <div className="relative my-auto w-full min-w-0">
          <div ref={trackRef} className={galleryTrackClass} onScroll={onTrackScroll}>
            {photos.map((src, i) => (
              <div key={`${title}-${i}-${src}`} className={archiveSlideClass}>
                <div
                  className="relative flex w-full items-center justify-center overflow-hidden rounded-sm bg-neutral-50"
                >
                  <img
                    src={src}
                    alt={`${title} — zdjęcie poglądowe ${i + 1}`}
                    className="mx-auto block h-auto w-auto max-w-full object-contain max-h-[60vh] sm:max-h-[70vh]"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    width={1536}
                    height={1024}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="dialog-navigation flex shrink-0 items-center justify-between pt-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-sm"
            aria-label="Poprzednie zdjęcie"
            onClick={() => stepSlide(-1)}
            disabled={photos.length <= 1}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="font-mono text-xs text-neutral-500">
            {String(slideIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-sm"
            aria-label="Następne zdjęcie"
            onClick={() => stepSlide(1)}
            disabled={photos.length <= 1}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
