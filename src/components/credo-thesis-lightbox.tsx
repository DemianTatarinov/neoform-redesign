import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  galleryBarClass,
  galleryCardClass,
  galleryImageClass,
  galleryOverlayLayoutClass,
  galleryPhotoWrapClass,
} from '@/lib/gallery-lightbox-layout';

export type CredoThesisImage = { src: string; title: string; index: number };

export function CredoThesisLightbox({
  active,
  onOpenChange,
}: {
  active: CredoThesisImage | null;
  onOpenChange: (open: boolean) => void;
}) {
  const label = active ? `${String(active.index + 1).padStart(2, '0')} — ${active.title}` : '';

  return (
    <DialogPrimitive.Root open={active !== null} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={`hardware-overlay ${galleryOverlayLayoutClass}`} />
        <DialogPrimitive.Content className={`hardware-dialog ${galleryCardClass}`} aria-describedby={undefined}>
          <div className={`hardware-bar ${galleryBarClass}`}>
            <DialogPrimitive.Title className="hardware-title">{label}</DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="icon" className="hardware-close" aria-label="Zamknij podgląd">
                <X aria-hidden="true" />
              </Button>
            </DialogPrimitive.Close>
          </div>
          {active && (
            <figure className={`${galleryPhotoWrapClass} flex justify-center`}>
              <img
                src={active.src}
                alt={active.title}
                className={galleryImageClass}
                width={1536}
                height={1024}
              />
            </figure>
          )}
          {active && (
            <p className={`${galleryBarClass} shrink-0 pt-3 text-center text-sm text-muted-foreground`}>
              <span className="text-[var(--brand)]">{String(active.index + 1).padStart(2, '0')}</span>
              {' '}
              {active.title}
            </p>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
