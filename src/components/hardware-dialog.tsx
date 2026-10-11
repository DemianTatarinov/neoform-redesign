import { useEffect, useRef, useState, type TouchEvent } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SWIPE_THRESHOLD_PX = 48;

export function HardwareDialog({ brand, images, onOpenChange }: {
  brand: string | null;
  images: string[];
  onOpenChange: (open: boolean) => void;
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const photos = images.map((src, photoIndex) => ({
    src,
    alt: brand ? `${brand} — detal mechanizmu ${photoIndex + 1}` : 'Detal mechanizmu',
  }));

  useEffect(() => { setIndex(0); }, [brand, images]);

  const step = (delta: number) => {
    if (photos.length <= 1) return;
    setIndex(current => (current + delta + photos.length) % photos.length);
  };

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null || photos.length <= 1) return;
    const endX = event.changedTouches[0]?.clientX;
    if (endX === undefined) return;
    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    step(delta > 0 ? -1 : 1);
  };

  const current = photos[index];

  return (
    <DialogPrimitive.Root open={brand !== null} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="hardware-overlay" />
        <DialogPrimitive.Content className="hardware-dialog" aria-describedby={undefined}>
          <div className="hardware-bar">
            <DialogPrimitive.Title className="hardware-title">{brand}</DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="icon" className="hardware-close" aria-label="Zamknij galerię"><X aria-hidden="true" /></Button>
            </DialogPrimitive.Close>
          </div>
          <figure
            className="hardware-photo m-0 flex justify-center"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {current && (
              <img
                key={current.src}
                src={current.src}
                alt={current.alt}
                className="mx-auto block max-h-[85vh] max-w-full object-contain"
                loading="lazy"
                width={1536}
                height={1024}
                draggable={false}
              />
            )}
          </figure>
          {photos.length > 1 && (
            <div className="hardware-nav">
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
