import { useCallback, useEffect, useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  galleryBarClass,
  galleryCardClass,
  galleryImageClass,
  galleryOverlayLayoutClass,
  galleryPhotoWrapClass,
  gallerySlideClass,
  galleryTrackClass,
} from '@/lib/gallery-lightbox-layout';

export function HardwareDialog({ brand, images, onOpenChange }: {
  brand: string | null;
  images: string[];
  onOpenChange: (open: boolean) => void;
}) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRaf = useRef<number | null>(null);
  const photos = images.map((src, photoIndex) => ({
    src,
    alt: brand ? `${brand} — detal mechanizmu ${photoIndex + 1}` : 'Detal mechanizmu',
  }));

  const scrollToSlide = useCallback((slideIndex: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children.item(slideIndex) as HTMLElement | null;
    slide?.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [brand, images]);

  useEffect(() => {
    if (brand === null) return;
    requestAnimationFrame(() => scrollToSlide(0, 'instant'));
  }, [brand, images, scrollToSlide]);

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
      if (nextIndex !== index) setIndex(nextIndex);
    });
  };

  const step = (delta: number) => {
    if (photos.length <= 1) return;
    const next = (index + delta + photos.length) % photos.length;
    setIndex(next);
    scrollToSlide(next, 'smooth');
  };

  return (
    <DialogPrimitive.Root open={brand !== null} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={`hardware-overlay ${galleryOverlayLayoutClass}`} />
        <DialogPrimitive.Content
          className={`hardware-dialog ${galleryCardClass}`}
          aria-describedby={undefined}
        >
          <div className={`hardware-bar ${galleryBarClass}`}>
            <DialogPrimitive.Title className="hardware-title">{brand}</DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="icon" className="hardware-close" aria-label="Zamknij galerię"><X aria-hidden="true" /></Button>
            </DialogPrimitive.Close>
          </div>
          <div className={`hardware-photo ${galleryPhotoWrapClass}`}>
            <div
              ref={trackRef}
              className={galleryTrackClass}
              onScroll={onTrackScroll}
            >
              {photos.map(photo => (
                <div key={photo.src} className={gallerySlideClass}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className={galleryImageClass}
                    decoding="async"
                    width={1536}
                    height={1024}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
          {photos.length > 1 && (
            <div className={`hardware-nav ${galleryBarClass}`}>
              <Button variant="ghost" size="icon" className="hardware-arrow" aria-label="Poprzednie zdjęcie" onClick={() => step(-1)}><ArrowLeft aria-hidden="true" /></Button>
              <span className="hardware-counter" aria-live="polite" aria-label={`Zdjęcie ${index + 1} z ${photos.length}`}>
                {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
              </span>
              <Button variant="ghost" size="icon" className="hardware-arrow" aria-label="Następne zdjęcie" onClick={() => step(1)}><ArrowRight aria-hidden="true" /></Button>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
