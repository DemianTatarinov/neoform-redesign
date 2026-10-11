const hardwareModules = import.meta.glob<string>(
  '../assets/TECHNOLOGIA/**/*.{webp,jpg,jpeg,png}',
  { eager: true, import: 'default' },
);

export const hardwareBrandIds = ['Blum', 'PEKA', 'Hettich'] as const;
export type HardwareBrandId = (typeof hardwareBrandIds)[number];

export const hardwareBrandLabels: Record<HardwareBrandId, string> = {
  Blum: 'BLUM',
  PEKA: 'PEKA',
  Hettich: 'HETTICH',
};

type HardwareImageEntry = { modulePath: string; url: string };

function extractBrandFolder(modulePath: string): string | null {
  const segments = modulePath.split('/');
  for (let i = 0; i < segments.length - 1; i += 1) {
    if (segments[i].trim().toUpperCase() !== 'TECHNOLOGIA') continue;
    const folder = segments[i + 1];
    return folder?.trim() ? folder : null;
  }
  return null;
}

function resolveBrandId(folderName: string): HardwareBrandId | null {
  const normalized = folderName.trim().toLowerCase();
  if (normalized === 'blum') return 'Blum';
  if (normalized === 'peka') return 'PEKA';
  if (normalized === 'hettich') return 'Hettich';
  return null;
}

function buildHardwareGalleriesByBrand(): Record<HardwareBrandId, string[]> {
  const buckets = new Map<HardwareBrandId, HardwareImageEntry[]>(
    hardwareBrandIds.map(id => [id, []]),
  );

  for (const [modulePath, url] of Object.entries(hardwareModules)) {
    if (!url) continue;
    const folder = extractBrandFolder(modulePath);
    if (!folder) continue;
    const brandId = resolveBrandId(folder);
    if (!brandId) continue;
    buckets.get(brandId)?.push({ modulePath, url });
  }

  return Object.fromEntries(
    hardwareBrandIds.map(id => [
      id,
      (buckets.get(id) ?? [])
        .sort((a, b) =>
          a.modulePath.localeCompare(b.modulePath, undefined, { numeric: true, sensitivity: 'base' }),
        )
        .map(entry => entry.url),
    ]),
  ) as Record<HardwareBrandId, string[]>;
}

/** Gallery image URLs per hardware brand (Blum, PEKA, Hettich). */
export const hardwareGalleriesByBrand = buildHardwareGalleriesByBrand();
