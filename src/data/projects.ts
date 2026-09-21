import type { Project } from './types';

/**
 * Title-band, brief and sequencing data for the four project pages.
 * Copy is approved and ported from the design prototype — do not paraphrase.
 */
export const projects: Project[] = [
  {
    slug: 'hania',
    number: '01',
    title: 'Hania',
    discipline: 'robotics',
    year: '2026',
    tools: ['fusion 360', 'machine learning', 'python'],
    repo: {
      label: ['github.com/kat2137/robotic-craftsman'],
      url: 'https://github.com/kat2137/robotic-craftsman',
    },
    standfirst:
      'A robotic hand built to learn hand-sewing — and to ask what gets lost when a skill is captured as data.',
    brief: [
      'Hand-sewing is held in the hand, not in a document. The build starts from that problem: six joint systems tested against each other, then one carried through to a full seventeen-joint hand with tendon runs, a springed return and a printed shell.',
      'The learning half watches reference footage of the stitch and predicts the next needle pose. What it cannot recover — grip pressure, the pause before a knot — is the part of the question worth keeping.',
    ],
    stats: [
      { value: '17', label: 'joints' },
      { value: '06', label: 'joint systems' },
      { value: '03', label: 'tendon groups' },
    ],
    next: 'sviatovid',
    description:
      'A seventeen-joint tendon-driven robotic hand built to learn hand-sewing from reference footage, with rolling-contact finger joints and cast silicone fingertips.',
    card: {
      src: 'hania-cad-render.jpg',
      alt: 'CAD render of the hand assembly',
    },
    wheel: {
      image: 'hania-turntable-poster.jpg',
      alt: 'Render of the full arm assembly',
      scale: 1.5,
      turntable: { name: 'hania', frames: 72, width: 880, height: 585 },
    },
  },
  {
    slug: 'sviatovid',
    number: '02',
    title: 'Sviatovid',
    discipline: 'robotics',
    year: '2025',
    tools: ['raspberry pi 4', 'pca9685', 'mg90s servos', 'fusion 360', 'python'],
    repo: {
      label: ['github.com/kat2137/', 'Googly_eyes_project'],
      url: 'https://github.com/kat2137/Googly_eyes_project',
    },
    standfirst:
      'An interactive robotic system that recognises the people looking at it and looks back — a wearable object that makes the onlooker the one being observed.',
    brief: [
      'Sviatovid is a Slavic deity who faces all four directions at once, all-seeing, watching over the people who pray to him. The object takes that literally: it looks back at whoever looks at it, so the onlooker becomes the observed.',
      'Which turns symbolism into an engineering problem. The eyes have to find a face, track it, and keep tracking as it moves — and all of it has to fit inside something a person can carry.',
    ],
    stats: [
      { value: '02', label: 'axes of movement' },
      { value: '150.74', label: 'housing height, mm' },
      { value: '51.12', label: 'housing depth, mm' },
    ],
    next: 'pneumabra',
    description:
      'A wearable robotic object with four animated eyes that detect and track passers-by, built on a Raspberry Pi with a two-axis servo yoke.',
    card: {
      src: 'sviatovid-bag-in-park-wide.jpg',
      alt: 'The finished leather face bag resting against a railing in a park',
    },
    wheel: {
      image: 'sviatovid-hero-poster.jpg',
      alt: 'Render of the eye mechanism with its two eyeball domes',
      scale: 1.09,
      turntable: { name: 'sviatovid-hero', frames: 72, width: 700, height: 640 },
    },
  },
  {
    slug: 'pneumabra',
    number: '03',
    title: 'PneumaBra',
    discipline: 'interactive material',
    year: '2026',
    tools: ['fusion 360', 'platsil gel 25', 'nodemcu esp32', 'mprls sensor', 'easyeda'],
    repo: {
      label: ['github.com/kat2137/', 'PneumaBra'],
      url: 'https://github.com/kat2137/PneumaBra',
    },
    standfirst:
      'A material that changes its own support — silicone air channels that adjust compression across the hormonal cycle, the working day and physical activity.',
    brief: [
      'A bra is a static object fitted to a body that is not static. Breast volume changes across the hormonal cycle, tissue stiffness changes with it, and the load on the supporting ligaments changes hour by hour with posture and activity. Every woman interviewed described the same mismatch: two sets of bras, or pain for part of every month.',
      'So the support is made adjustable after the garment is finished, by the wearer, without tools — and it has to hold that adjustment. Elastic cannot: it is chosen for a property it then loses. Air can. Two fabric layers with sealed silicone channels between them, inflated and vented to change the compression of the surface.',
    ],
    stats: [
      { value: '04', label: 'users studied in depth' },
      { value: '03', label: 'operating modes' },
      { value: '2 mm', label: 'channel creep over 10 hrs' },
    ],
    next: 'hikego',
    description:
      'A pneumatic support garment: sealed silicone air channels bonded between two fabric layers, inflated and vented to change compression on demand.',
    card: {
      src: 'pneumabra-prototype-lit.jpg',
      alt: 'The inflated channel sample connected to the printed pump housing, lit in blue and green',
    },
    wheel: {
      image: 'pneumabra-hero-poster.jpg',
      alt: 'Render of the spherical control housing with its feed tube',
      scale: 1.28,
      turntable: { name: 'pneumabra-hero', frames: 72, width: 1000, height: 667 },
    },
  },
  {
    slug: 'hikego',
    number: '04',
    title: 'HikeGo',
    discipline: 'software',
    year: '2025',
    tools: ['unity', 'c#', '3d asset pipeline'],
    repo: {
      label: ['github.com/kat2137/', 'sony_scripts'],
      url: 'https://github.com/kat2137/sony_scripts',
    },
    standfirst:
      'A location-based game that turns Sony\u2019s configurable controller, built for accessibility, into a reason to go outside with other people.',
    credit: [
      'brief from sony interactive entertainment · ma collaborative challenge 2025',
      'group project — plot developed collectively · 3d map assets: haiyu',
    ],
    brief: [
      'Sony\u2019s configurable controller is designed so that people who cannot use a standard gamepad can still play. The brief asked what to do with it. The answer was to point it outward: most play on a controller is solitary and indoors, and the same hardware that makes a game reachable can make it social.',
      'My part was the companion app and the controller interactions — not the hardware, which is Sony\u2019s. Mapping a game onto a configurable controller is harder than mapping it to a standard pad: the input layout is not fixed, so the mapping has to stay legible after the hardware is rearranged.',
    ],
    stats: [
      { value: '06', label: 'interaction modes' },
      { value: '05', label: 'signal colours' },
      { value: '01', label: 'companion app' },
    ],
    next: 'tech-pack',
    description:
      'A location-based game and companion app for Sony\u2019s configurable controller, where edge lighting carries meaning that a rearrangeable layout cannot.',
    card: {
      src: 'sony-mode-social-2.png',
      alt: 'The five-module controller mid-initialisation flash, each module lit a different colour',
      fit: 'contain' as const,
    },
    wheel: {
      image: 'sony-mode-social-2.png',
      alt: 'The five-module controller, each module lit a different colour',
      scale: 0.86,
    },
  },
  {
    slug: 'tech-pack',
    number: '05',
    title: 'Tech pack generator',
    discipline: 'tooling',
    year: '2026',
    tools: ['python', 'pydantic', 'pymupdf', 'streamlit'],
    repo: {
      label: ['private \u2014 available', 'on request'],
      url: 'https://github.com/kat2137',
    },
    standfirst:
      'Flat garment drawings in, structured tech packs out \u2014 built on a controlled taxonomy rather than a model that guesses.',
    brief: [
      'A tech pack is what makes a garment manufacturable: construction details, bill of materials, measurements, labelling. It is assembled by hand by someone who already knows what a drawing implies, which is slow and does not scale.',
      'The system takes the drawing, detects what it can, infers what follows, asks for the rest, and stamps every attribute with which of the three it was. What comes out is one structured object that the pages are then views over.',
    ],
    stats: [
      { value: '03', label: 'source stamps' },
      { value: '04', label: 'ML architectures rejected' },
      { value: '06', label: 'phases to build' },
    ],
    next: 'hania',
    description:
      'A tech pack generation system for apparel: vector extraction from Illustrator PDFs, a controlled garment taxonomy, a Pydantic schema with per-attribute source stamps, and a frequency-table suggestion layer.',
  },
];

export const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

export function nextOf(slug: string): Project {
  return bySlug[bySlug[slug].next];
}
