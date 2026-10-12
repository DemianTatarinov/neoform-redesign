import detail from '@/assets/neo-detail.jpg';
import interior from '@/assets/neo-interior.jpg';
import materials from '@/assets/neo-materials.jpg';
import plans from '@/assets/neo-plans.jpg';
import materialDrewnoFornir from '@/assets/MATERIAL /Drewno-Fornir/Drewno-Fornir.webp';
import materialKamienSpiek from '@/assets/MATERIAL /Kamień-Spiek/Kamień-Spiek.webp';
import hardwareBlum from '@/assets/hardware-blum-1.jpg';
import hardwarePeka from '@/assets/hardware-peka-1.jpg';
import pekaWorkshop from '@/assets/TECHNOLOGIA/Peka/Peka4.webp';

const workshopPhotoA =
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80';
const workshopPhotoB =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80';
const workshopPhotoC =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80';

export type NeoLabArchiveGalleryEntry = {
  dialogTitle: string;
  photos: string[];
};

/** Galerie archiwum NEO LAB — zdjęcia poglądowe warsztatów (placeholder + materiały marki). */
export const neoLabArchiveGalleryByTitle: Record<string, NeoLabArchiveGalleryEntry> = {
  KRONOSPAN: {
    dialogTitle: 'Kronospan — Warsztaty',
    photos: [materials, materialDrewnoFornir, detail, workshopPhotoA, interior, plans],
  },
  'FRONT LAB': {
    dialogTitle: 'Front Lab — Warsztaty',
    photos: [detail, plans, interior, workshopPhotoB, materials, materialDrewnoFornir],
  },
  'KAMIEŃ I SPIEK': {
    dialogTitle: 'Kamień i spiek — Warsztaty',
    photos: [materialKamienSpiek, interior, workshopPhotoC, detail, materials, materialKamienSpiek],
  },
  'OKUCIA MEBLOWE': {
    dialogTitle: 'Okucia meblowe — Warsztaty',
    photos: [hardwareBlum, hardwarePeka, pekaWorkshop, workshopPhotoA, workshopPhotoB, hardwareBlum],
  },
};

export function getNeoLabArchiveGallery(title: string): NeoLabArchiveGalleryEntry | undefined {
  return neoLabArchiveGalleryByTitle[title];
}
