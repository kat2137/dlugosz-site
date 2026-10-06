import type { Section } from '../types';

/**
 * DRAFT COPY — written from the portfolio PDF and the tech packs, not part of
 * the design handoff. Read through before launch, especially "Client work".
 *
 * Plates with an `id` and no `src` are empty slots: drop an image into
 * src/assets/media named after the id (any extension) and it appears with no
 * code change.
 */
export const sections: Section[] = [
  {
    title: 'Tech pack gallery',
    meta: 'Garments · hardware',
    lede: 'Specification is the same job whether the part is cut from cloth or printed from resin: say exactly what it is, what it is made of, how it goes together and how it is measured.',
    groups: [
      {
        label: 'Rose bra',
        tag: '26 points of measure',
        text: 'A plunge wire bra with embroidered tulle side cups lined in satin-backed crepe, a single-layer tulle front cup, and satin bonecasing over fluffy wirecasing on every cradle, side and wing seam. Stretch-sensitive points are measured twice, relaxed and stretched, because on a bra the number that matters is the one under tension.',
        plates: [
          { src: 'tp-rose-bra-spec.png', alt: 'Rose bra tech pack page: annotated front and back flats with construction notes', caption: 'Construction page' },
          { src: 'tp-rose-bra-pom.png', alt: 'Rose bra measurement page: 26 points of measure with tolerances, relaxed and stretched values', caption: 'Where it is measured \u2014 the values stay in the pack' },
        ],
      },
      {
        label: 'Sviatovid eye base',
        tag: 'a tech pack for a mechanism',
        text: 'The electronic eye mechanism from Sviatovid, specified like a garment component: composition, colour reference, where it sits \u2014 inside the appliqu\u00e9 face, assembled with M3 and M2 fixings \u2014 and how it is produced. The full sheet adds fully dimensioned orthographic drawings.',
        plates: [
          { src: 'tp-sviatovid-eye-base.png', alt: 'Tech pack page for the electronic eye base: dimensioned orthographic drawings, isometric view, composition and assembly notes', caption: 'Electronic eye base — style 004' },
        ],
      },
    ],
    body1: 'Every pack follows the same order — flats, construction, bill of materials, measurement, sizing, grade — so that whoever picks one up can find the same thing in the same place.',
    body2: 'Hardware gets the same treatment because in a wearable it ends up in the same factory, sewn into the same garment.',
    takeaway: 'A tech pack is an interface between a design and whoever makes it. It is good when it gets no questions back.',
    notes: ['Adobe Illustrator', 'Fusion 360', 'POM · tolerances', 'BOM'],
  },
  {
    title: 'Client work',
    meta: 'Technical design',
    lede: 'Freelance technical design for luxury and independent labels, including Robert Wun, Galia Lahav, Solay, Joelle and CYA: patterns in CLO3D, tech packs, sampling, sourcing and supplier management, and most of the client communication around them.',
    groups: [],
    body1: 'Most of this work is under NDA, so the packs themselves are not published here.',
    body2: 'Selected packs, including CYA\u2019s, are shared on request in a technical portfolio, under a confidentiality agreement.',
    takeaway: 'The day job is turning a designer’s intent into something a factory can make the first time.',
    notes: ['CLO3D', 'Sampling', 'Sourcing', 'Supplier management'],
  },
];
