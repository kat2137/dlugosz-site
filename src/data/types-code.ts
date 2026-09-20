/** A file in the code viewer: [path relative to the repo root, rail note]. */
export type CodeFile = [path: string, note: string];

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
  groups: CodeGroup[];
}
