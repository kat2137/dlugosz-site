import { toLines } from './highlight';

/**
 * How much of a file the viewer shows.
 *
 * Some sources are mostly markup held in strings — a web UI built by string
 * concatenation on a microcontroller, say — so a file can name the window
 * worth reading and the listing opens there. Anything without one is capped,
 * because a 600-line wall is not read by anybody; the rest is a click away on
 * GitHub either way.
 */
export const CAP = 150;

export interface Window {
  text: string;
  /** 1-based line the excerpt starts at. */
  start: number;
  total: number;
  truncated: boolean;
}

export function excerpt(source: string, focus?: { from: number; lines: number }): Window {
  const all = toLines(source);
  const start = focus ? Math.max(1, focus.from) : 1;
  const count = focus ? focus.lines : CAP;
  const text = all.slice(start - 1, start - 1 + count).join('\n');
  return {
    text,
    start,
    total: all.length,
    truncated: all.length > start - 1 + count || start > 1,
  };
}
