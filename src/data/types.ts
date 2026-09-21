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
  /**
   * Where the arrowhead lands, as a fraction of the image's width (0 = left
   * edge, 1 = right edge). The rule stretches from there to the label, so the
   * arrow stays on its part at any window width.
   */
  x: number;
  /** Vertical position of the arrow over the figure, as a percentage. */
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
  /** Card image. Omit while a project has no imagery yet. */
  card?: { src: string; alt: string; fit?: 'cover' | 'contain' };
  /**
   * The project's miniature on the homepage wheel. `image` is shown at rest;
   * with a `turntable`, the miniature spins slowly while it sits in the centre.
   * Omit while a project has no imagery yet.
   */
  wheel?: {
    image: string;
    alt: string;
    /** Image width relative to the square tile. Above 1 crops the empty sides. */
    scale: number;
    turntable?: { name: string; frames: number; width: number; height: number };
  };
}
