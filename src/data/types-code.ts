/**
 * A file in the code viewer: the path relative to the repo root, the rail
 * note, and optionally the window worth reading — some files are mostly
 * markup in strings, and the listing should open on the logic instead.
 */
export type CodeFile = [path: string, note: string, focus?: CodeFocus];

/** 1-based first line, and how many lines to show. */
export interface CodeFocus {
  from: number;
  lines: number;
  /** What the window is, for the caption. */
  of?: string;
}

export interface CodeGroup {
  /** Directory heading shown in the rail. */
  dir: string;
  files: CodeFile[];
}

export interface CodeRepo {
  /** Repo name as shown at the top of the rail. */
  name: string;
  /** Folder under public/code/ holding the vendored sources. */
  base: string;
  /** Language and stack notes pinned to the bottom of the rail. */
  stack: string[];
  /** Repository on GitHub, so a listing can link to the file itself. */
  github?: string;
  /** Branch the github links point at. */
  branch?: string;
  groups: CodeGroup[];
}
