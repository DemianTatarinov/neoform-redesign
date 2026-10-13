import { neoLabArchive } from '@/lib/neo-lab-content';
import { hardwareGalleriesByBrand } from '@/lib/hardware-gallery';

const neoLabArchiveModules = import.meta.glob<string>('../assets/NEO LAB/**/*.{webp,jpg,jpeg,png}', {
  eager: true,
  import: 'default',
});

export type NeoLabArchiveGalleryEntry = {
  dialogTitle: string;
  photos: string[];
};

const archiveDialogTitles: Record<string, string> = {
  KRONOSPAN: 'Kronospan — Warsztaty',
  'FRONT LAB': 'Front Lab — Warsztaty',
  'KAMIEŃ I SPIEK': 'Kamień i spiek — Warsztaty',
  'OKUCIA MEBLOWE': 'Okucia meblowe — Warsztaty',
};

type ImageEntry = { modulePath: string; url: string };

function extractEventFolder(modulePath: string): string | null {
  const segments = modulePath.split('/');
  for (let i = 0; i < segments.length - 1; i += 1) {
    if (segments[i].trim() !== 'NEO LAB') continue;
    const folder = segments[i + 1];
    return folder?.trim() ? folder : null;
  }
  return null;
}

function folderMatchesArchiveTitle(folderName: string, title: string): boolean {
  const normalized = folderName.toLowerCase();
  switch (title) {
    case 'KRONOSPAN':
      return normalized.includes('kronospan');
    case 'FRONT LAB':
      return normalized.includes('front lab');
    case 'KAMIEŃ I SPIEK':
      return normalized.includes('kamień') || normalized.includes('spiek');
    case 'OKUCIA MEBLOWE':
      return normalized.includes('okucia') || normalized.includes('blum');
    default:
      return false;
  }
}

function sortedUrlsFromModules(title: string): string[] {
  const entries: ImageEntry[] = [];

  for (const [modulePath, url] of Object.entries(neoLabArchiveModules)) {
    if (!url) continue;
    const folder = extractEventFolder(modulePath);
    if (!folder || !folderMatchesArchiveTitle(folder, title)) continue;
    entries.push({ modulePath, url });
  }

  return entries
    .sort((a, b) =>
      a.modulePath.localeCompare(b.modulePath, undefined, { numeric: true, sensitivity: 'base' }),
    )
    .map(entry => entry.url);
}

function hardwareWorkshopFallback(title: string): string[] {
  if (title !== 'OKUCIA MEBLOWE') return [];
  return [
    ...hardwareGalleriesByBrand.Blum,
    ...hardwareGalleriesByBrand.PEKA,
    ...hardwareGalleriesByBrand.Hettich,
  ];
}

function buildPhotosForArchiveTitle(title: string): string[] {
  const fromNeoLab = sortedUrlsFromModules(title);
  if (fromNeoLab.length > 0) return fromNeoLab;
  return hardwareWorkshopFallback(title);
}

/** Galerie archiwum NEO LAB — zdjęcia z folderów `src/assets/NEO LAB/…`. */
export const neoLabArchiveGalleryByTitle: Record<string, NeoLabArchiveGalleryEntry> = Object.fromEntries(
  neoLabArchive.map(item => [
    item.title,
    {
      dialogTitle: archiveDialogTitles[item.title] ?? `${item.title} — Warsztaty`,
      photos: buildPhotosForArchiveTitle(item.title),
    },
  ]),
);

export function getNeoLabArchiveGallery(title: string): NeoLabArchiveGalleryEntry | undefined {
  const entry = neoLabArchiveGalleryByTitle[title];
  if (!entry?.photos.length) return undefined;
  return entry;
}
