import { useEffect, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import blum1 from '@/assets/hardware-blum-1.jpg';
import blum2 from '@/assets/hardware-blum-2.jpg';
import blum3 from '@/assets/hardware-blum-3.jpg';
import peka1 from '@/assets/hardware-peka-1.jpg';
import peka2 from '@/assets/hardware-peka-2.jpg';
import peka3 from '@/assets/hardware-peka-3.jpg';
import hettich1 from '@/assets/hardware-hettich-1.jpg';
import hettich2 from '@/assets/hardware-hettich-2.jpg';
import hettich3 from '@/assets/hardware-hettich-3.jpg';

const galleries: Record<string, { src: string; alt: string }[]> = {
  Blum: [
    { src: blum1, alt: 'Ukryty zawias Blum — detal mechanizmu' },
    { src: blum2, alt: 'System prowadnic Blum — detal mechanizmu' },
    { src: blum3, alt: 'Mechanizm podnoszenia Blum — detal mechanizmu' },
  ],
  PEKA: [
    { src: peka1, alt: 'System szuflad PEKA — detal mechanizmu' },
    { src: peka2, alt: 'Mechanizm drzwi kieszeniowych PEKA — detal mechanizmu' },
    { src: peka3, alt: 'Prowadnica PEKA — detal mechanizmu' },
  ],
  Hettich: [
    { src: hettich1, alt: 'Zawias Hettich — detal mechanizmu' },
    { src: hettich2, alt: 'System bezuchwytowy Hettich — detal mechanizmu' },
    { src: hettich3, alt: 'Prowadnica Hettich — detal mechanizmu' },
  ],
};

export function HardwareDialog({ brand, onOpenChange }: {
  brand: string | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [index, setIndex] = useState(0);
  const photos = brand ? galleries[brand] ?? [] : [];

  useEffect(() => { setIndex(0); }, [brand]);

  const step = (delta: number) => setIndex(current => (current + delta + photos.length) % photos.length);
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
          <figure className="hardware-photo">
            {current && <img key={current.src} src={current.src} alt={current.alt} loading="lazy" width={1024} height={1024} />}
          </figure>
          <div className="hardware-nav">
            <Button variant="ghost" size="icon" className="hardware-arrow" aria-label="Poprzednie zdjęcie" onClick={() => step(-1)}><ArrowLeft aria-hidden="true" /></Button>
            <span className="hardware-counter" aria-label={`Zdjęcie ${index + 1} z ${photos.length}`}>{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
            <Button variant="ghost" size="icon" className="hardware-arrow" aria-label="Następne zdjęcie" onClick={() => step(1)}><ArrowRight aria-hidden="true" /></Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
