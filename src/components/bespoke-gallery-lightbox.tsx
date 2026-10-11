import { useEffect, useRef, useState, type TouchEvent } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SWIPE_THRESHOLD_PX = 48;

export function BespokeGalleryLightbox({
  open,
  images,
  index: startIndex,
  categoryLabel,
  imageLabels,
  onOpenChange,
}: {
  open: boolean;
  images: string[];
  index: number;
  categoryLabel: string;
  imageLabels?: string[];
  onOpenChange: (open: boolean) => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useRef<number | null>(null);
  const current = images[index];
  const slideLabel = imageLabels?.[index] ?? categoryLabel;

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const step = (delta: number) => {
    if (images.length <= 1) return;
    setIndex(currentIndex => (currentIndex + delta + images.length) % images.length);
  };

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null || images.length <= 1) return;
    const endX = event.changedTouches[0]?.clientX;
    if (endX === undefined) return;
    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    step(delta > 0 ? -1 : 1);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="hardware-overlay" />
        <DialogPrimitive.Content className="hardware-dialog" aria-describedby={undefined}>
          <div className="hardware-bar">
            <DialogPrimitive.Title className="hardware-title">{slideLabel}</DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="icon" className="hardware-close" aria-label="Zamknij galerię">
                <X aria-hidden="true" />
              </Button>
            </DialogPrimitive.Close>
          </div>
          <figure
            className="hardware-photo m-0 flex justify-center"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {current && (
              <img
                key={current}
                src={current}
                alt={slideLabel}
                className="mx-auto block max-h-[85vh] max-w-full object-contain"
                width={1536}
                height={1024}
                draggable={false}
              />
            )}
          </figure>
          {images.length > 1 && (
            <div className="hardware-nav">
              <Button variant="ghost" size="icon" className="hardware-arrow" aria-label="Poprzednie zdjęcie" onClick={() => step(-1)}>
                <ArrowLeft aria-hidden="true" />
              </Button>
              <span className="hardware-counter" aria-live="polite">
                {index + 1} / {images.length}
              </span>
              <Button variant="ghost" size="icon" className="hardware-arrow" aria-label="Następne zdjęcie" onClick={() => step(1)}>
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
