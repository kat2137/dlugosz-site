import fs from 'node:fs';
import crypto from 'node:crypto';

/**
 * A content hash for a turntable's frames, appended to every frame URL.
 * Frames keep their file names when they are re-rendered, so without this a
 * browser (or GitHub Pages' ten-minute cache) keeps showing the old ones.
 * Reads the first and last frame, which is enough to catch any re-export.
 */
export function turntableVersion(name: string, frames: number): string {
  const dir = new URL(`../../public/turntables/${name}/`, import.meta.url);
  const hash = crypto.createHash('sha1');
  for (const i of [0, frames - 1]) {
    const file = new URL(`${String(i).padStart(3, '0')}.webp`, dir);
    if (fs.existsSync(file)) hash.update(fs.readFileSync(file));
  }
  return hash.digest('hex').slice(0, 10);
}
