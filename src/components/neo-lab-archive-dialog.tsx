import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import interior from '@/assets/neo-interior.jpg';
import materials from '@/assets/neo-materials.jpg';
import plans from '@/assets/neo-plans.jpg';
import detail from '@/assets/neo-detail.jpg';
import blum from '@/assets/hardware-blum-1.jpg';
import peka from '@/assets/hardware-peka-1.jpg';

const photographs = [materials, plans, detail, interior, blum, peka];

export function NeoLabArchiveDialog({ title, photoOffset, onClose, returnFocus }: {
  title: string;
  photoOffset: number;
  onClose: () => void;
  returnFocus: HTMLElement | null;
}) {
  return <DialogPrimitive.Root open onOpenChange={open => { if (!open) onClose(); }}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="hardware-overlay" />
      <DialogPrimitive.Content className="lab-archive-dialog" aria-describedby={undefined}
        onCloseAutoFocus={event => { event.preventDefault(); returnFocus?.focus({ preventScroll: true }); }}>
        <div className="hardware-bar">
          <DialogPrimitive.Title className="lab-archive-dialog-title">{title}</DialogPrimitive.Title>
          <DialogPrimitive.Close asChild><Button variant="ghost" size="icon" className="hardware-close" aria-label="Zamknij galerię"><X aria-hidden="true" /></Button></DialogPrimitive.Close>
        </div>
        <div className="lab-archive-photo-grid">{photographs.map((_, index) => {
          const src = photographs[(index + photoOffset) % photographs.length];
          return <img key={index} src={src} alt={`${title} — zdjęcie poglądowe ${index + 1}`} width={1024} height={768} loading="lazy" />;
        })}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>;
}