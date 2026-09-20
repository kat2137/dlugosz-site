/** Content types shared by the four project pages. */

export interface Plate {
  /** Slot id from the design prototype; also the asset stem where one exists. */
  id?: string;
  /** File name inside src/assets/media. Absent = an unfilled image slot. */
  src?: string;
  alt?: string;
  caption?: string;
  /** Shown inside the frame when no image has been supplied yet. */
  placeholder?: string;
  /** PneumaBra only. */
  size?: 'small' | 'large';
  tall?: boolean;
  /** Sony only — YouTube embed URL. */
  video?: string;
}

export interface Group {
  label: string;
  tag: string;
  text: string;
  plates: Plate[];
  /** PneumaBra — render the tensile stiffness chart after the text. */
  chart?: boolean;
  /** PneumaBra — full-bleed plates, natural height. */
  wides?: Plate[];
  /** PneumaBra — 600px 3:2 plates, stacked. */
  pairs?: Plate[];
  /** Sony — render the six-mode table after the text. */
  modes?: boolean;
}

export interface Section {
  title: string;
  meta: string;
  lede: string;
  groups: Group[];
  body1: string;
  body2: string;
  takeaway: string;
  notes?: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Callout {
  label: string;
  /** Rule length in px — tuned per arrow in the design; keep the exact value. */
  rule: number;
  /** Vertical position over the figure, as a percentage. */
  top: string;
  muted?: boolean;
}

export interface Project {
  slug: string;
  /** "01"–"04" — the order the pages run in. */
  number: string;
  title: string;
  /** Longer titles drop to 56px; see .h1--long. */
  longTitle?: boolean;
  discipline: string;
  year: string;
  /** Tools and materials, one per line in the margin stack. */
  tools: string[];
  repo: { label: string[]; url: string };
  standfirst: string;
  /** Sony only. */
  credit?: string[];
  brief: [string, string];
  stats: [Stat, Stat, Stat];
  /** Slug of the next project in the sequence. */
  next: string;
  /** For the work index and page metadata. */
  description: string;
}
