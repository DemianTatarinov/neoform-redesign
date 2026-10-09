import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NeoLabExperience } from '@/components/neo-lab-experience';
import { useEffect, type RefObject } from 'react';

export function NeoLabOverlay({ open, onOpenChange, returnFocus }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocus: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="neo-lab-overlay-backdrop" />
      <DialogPrimitive.Content className="neo-lab-overlay" aria-describedby={undefined}
        onOpenAutoFocus={event => {
          event.preventDefault();
          document.getElementById('neo-lab-overlay-close')?.focus({ preventScroll: true });
        }}
        onCloseAutoFocus={event => {
          event.preventDefault();
          returnFocus.current?.focus({ preventScroll: true });
        }}>
        <div className="neo-lab-overlay-bar">
          <DialogPrimitive.Title className="neo-lab-overlay-title">NEO LAB</DialogPrimitive.Title>
          <DialogPrimitive.Close asChild>
            <Button id="neo-lab-overlay-close" variant="ghost" size="icon" className="neo-lab-overlay-close" aria-label="Zamknij NEO LAB" title="Zamknij NEO LAB"><X aria-hidden="true" /></Button>
          </DialogPrimitive.Close>
        </div>
        <NeoLabExperience />
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>;
}