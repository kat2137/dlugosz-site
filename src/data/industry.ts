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
