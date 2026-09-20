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
 * Unfilled plates in the prototype carry only a slot id. Where an asset with
 * that stem exists it is the intended image, so it is wired up here.
 */
export function mediaForSlot(id: string): ImageMetadata | null {
  for (const [name, asset] of byName) {
    if (name.slice(0, name.lastIndexOf('.')) === id) return asset;
  }
  return null;
}
