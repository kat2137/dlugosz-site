/**
 * Industry experience — DISSOLVE. Specification data for the Ripple bikini
 * top (style 03, SS26), transcribed from the tech pack so it renders as real
 * tables rather than screenshots.
 *
 * `null` renders as "tbc". Every null below is a value missing from the
 * source pack — fill them before the page goes live.
 */

/**
 * The sizing system as a structure only — bands by cup groups. Measurements,
 * tolerances and grade increments stay in the tech pack, which is shared on
 * request; the site is public and can be scraped.
 */
export const sizeBands = ['S', 'M', 'L'] as const;
export const cupGroups = ['A/B', 'C/D', 'DD/E', 'F/FF', 'G/GG', 'H/HH'] as const;

/** What a full pack holds, shown blurred: the structure without the numbers. */
export const packPages = [
  { src: 'dissolve-pack-flats.jpg', label: 'Flats' },
  { src: 'dissolve-pack-construction.jpg', label: 'Construction' },
  { src: 'dissolve-pack-materials.jpg', label: 'Inside view · materials' },
  { src: 'dissolve-pack-measurement.jpg', label: 'Points of measure' },
  { src: 'dissolve-pack-sizing.jpg', label: 'Sizing chart' },
  { src: 'dissolve-pack-grade.jpg', label: 'Grade' },
];

export type Feasibility = 'machine' | 'handling' | 'hand';

export const feasibilityLabel: Record<Feasibility, string> = {
  machine: 'automatable',
  handling: 'fabric handling',
  hand: 'needs a hand',
};

export interface Operation {
  op: string;
  machine: string;
  /** ISO 4915 stitch class, where the operation is a stitch. */
  iso?: string;
  feasibility: Feasibility;
  why: string;
}

/**
 * Operation breakdown for the bikini top, in sewing order. Machines and stitch
 * classes follow the finishes written on the callout pages; the feasibility
 * column is an assessment, not a measurement.
 */
export const topOperations: Operation[] = [
  {
    op: 'Cut self, non-stretch lining and binding',
    machine: 'Automatic cutter',
    feasibility: 'handling',
    why: 'The cut is routine; spreading a stretch knit flat without tension is not.',
  },
  {
    op: 'Join cup panels at the overbust seam, bag out with non-stretch lining',
    machine: 'Lockstitch',
    iso: '301',
    feasibility: 'handling',
    why: 'Two plies of different stretch eased onto each other along a curve.',
  },
  {
    op: 'Insert piping into the wave seam',
    machine: 'Overlock, piping foot',
    iso: '504',
    feasibility: 'handling',
    why: 'Piping held in register between two stretch plies through a changing curve.',
  },
  {
    op: 'Line bridge and cradle with non-stretch lining',
    machine: 'Overlock',
    iso: '504',
    feasibility: 'machine',
    why: 'Small, flat, stable pieces — a candidate for a template sewing unit.',
  },
  {
    op: 'Set cups into the cradle, topstitch the breast root',
    machine: 'Lockstitch',
    iso: '301',
    feasibility: 'handling',
    why: 'A convex cup set into a concave cradle: a 3D seam steered across a flat bed.',
  },
  {
    op: 'Join wings at the side seam, topstitch',
    machine: 'Lockstitch',
    iso: '301',
    feasibility: 'machine',
    why: 'Short, nearly straight seam on two plies with fixed geometry.',
  },
  {
    op: 'Make straps from binding fabric, overlock and turn',
    machine: 'Overlock',
    iso: '504',
    feasibility: 'hand',
    why: 'Turning a narrow tube through is manual; a tape folder would remove the step.',
  },
  {
    op: 'Make self-loops for the side seam and the back',
    machine: 'Overlock, cut to length',
    iso: '504',
    feasibility: 'hand',
    why: 'Placing a fingertip-sized fabric part under a binding is beyond current grippers.',
  },
  {
    op: 'Bind the neckline, no elastic',
    machine: 'Coverstitch, binder',
    iso: '406',
    feasibility: 'handling',
    why: 'The folder makes the binding; someone still steers the V at CF.',
  },
  {
    op: 'Bind underarm and underband with natural rubber elastic',
    machine: 'Coverstitch, binder, elastic metering',
    iso: '406',
    feasibility: 'handling',
    why: 'Elastic metering is automatic; steering a tensioned edge around a curve is not.',
  },
  {
    op: 'Attach straps under the neckline binding',
    machine: 'Bartack',
    iso: '304',
    feasibility: 'machine',
    why: 'A programmed bartack cycle; loading the part is the only manual step.',
  },
  {
    op: 'Thread strap sliders and swan hooks; loop elastic through the back sliders',
    machine: 'By hand, then bartack',
    iso: '304',
    feasibility: 'hand',
    why: 'Threading rigid trims onto tape is dexterity work; the bartack that locks them is not.',
  },
  {
    op: 'Fit the CB plastic clip',
    machine: 'By hand',
    feasibility: 'hand',
    why: 'Rigid trim fitted to a soft edge, by feel.',
  },
  {
    op: 'Heat-transfer the care label, left side only',
    machine: 'Heat press',
    feasibility: 'machine',
    why: 'Fixed position, fixed dwell time — already routinely automated.',
  },
];

/** The other four styles in the line. */
export const otherStyles = [
  { src: 'dissolve-short-flats.jpg', title: 'Ripple standard short', n: '01', aspect: '1890/807' },
  { src: 'dissolve-brief-flats.jpg', title: 'Ripple standard brief', n: '02', aspect: '1890/807' },
  { src: 'dissolve-bikini-brief-flats.jpg', title: 'Ripple bikini brief', n: '04', aspect: '1890/807' },
  { src: 'dissolve-swimsuit-flats.jpg', title: 'Ripple swimsuit', n: '05', aspect: '1890/807' },
];
