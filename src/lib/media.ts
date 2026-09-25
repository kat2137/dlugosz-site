import type { ImageMetadata } from 'astro';

/**
 * Every file in src/assets/media, keyed by file name, so content data can
 * reference images as plain strings and still go through astro:assets.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/media/*.{jpeg,jpg,png,gif,svg,webp,avif}',
  { eager: true },
);

const byName = new Map<string, ImageMetadata>(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!, mod.default]),
);

export function media(name: string): ImageMetadata {
  const found = byName.get(name);
  if (!found) {
    throw new Error(
      `Missing image "${name}". Add it to src/assets/media/ or fix the reference.`,
    );
  }
  return found;
}

export function hasMedia(name: string): boolean {
  return byName.has(name);
}

/**
 * Every plate has a duotone twin alongside it — <stem>.duo.jpg — which is what
 * shows at rest. The photograph underneath is revealed on hover, so the page
 * reads as a contact sheet that develops where you touch it. Twins are
 * generated, so a missing one is not an error: the plate simply never develops.
 */
export function duoFor(name: string): ImageMetadata | null {
  const stem = name.slice(0, name.lastIndexOf('.'));
  return byName.get(`${stem}.duo.jpg`) ?? null;
}

/**
 * Unfilled plates in the prototype carry only a slot id. Where an asset with
 * that stem exists it is the intended image, so it is wired up here.
 */
export function mediaForSlot(id: string): ImageMetadata | null {
  for (const [name, asset] of byName) {
    if (name.slice(0, name.lastIndexOf('.')) === id) return asset;
  }
  return null;
}
