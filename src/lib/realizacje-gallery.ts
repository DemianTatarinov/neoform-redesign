import { categories } from '@/lib/neo-content';

const realizacjeModules = import.meta.glob<string>('../assets/REALIZACJE /**/*.webp', {
  eager: true,
  import: 'default',
});

type RealizacjeImageEntry = { modulePath: string; url: string };

function extractCategoryFolder(modulePath: string): string | null {
  const segments = modulePath.split('/');
  for (let i = 0; i < segments.length - 1; i += 1) {
    if (segments[i].trim() !== 'REALIZACJE') continue;
    const folder = segments[i + 1]?.trim();
    return folder || null;
  }
  return null;
}

function resolveCategoryLabel(folderName: string): string | null {
  const normalizedFolder = folderName.trim();
  return categories.find(category => category.trim() === normalizedFolder) ?? null;
}

function buildRealizacjeGalleriesByCategory(): string[][] {
  const buckets = new Map<string, RealizacjeImageEntry[]>(
    categories.map(category => [category, []]),
  );

  for (const [modulePath, url] of Object.entries(realizacjeModules)) {
    if (!url) continue;
    const folder = extractCategoryFolder(modulePath);
    if (!folder) continue;
    const category = resolveCategoryLabel(folder);
    if (!category) continue;
    buckets.get(category)?.push({ modulePath, url });
  }

  return categories.map(category => {
    const entries = buckets.get(category) ?? [];
    return entries
      .sort((a, b) =>
        a.modulePath.localeCompare(b.modulePath, undefined, { numeric: true, sensitivity: 'base' }),
      )
      .map(entry => entry.url);
  });
}

/** All images per category, aligned with `categories` in neo-content.ts */
export const realizacjeGalleriesByCategory = buildRealizacjeGalleriesByCategory();

const fallbackCoverImage =
  realizacjeGalleriesByCategory.find(images => images.length > 0)?.[0] ?? '';

/** First image per category for portfolio grid covers (fallback when folder is empty). */
export const portfolioCoverImages = realizacjeGalleriesByCategory.map(
  images => images[0] ?? fallbackCoverImage,
);
