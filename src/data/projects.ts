import type { Project } from './types';

/**
 * Title-band, brief and sequencing data for the four project pages.
 * Copy is approved and ported from the design prototype — do not paraphrase.
 */
export const projects: Project[] = [
  {
    slug: 'robotic-craftsman',
    number: '01',
    title: 'Robotic Craftsman',
    longTitle: true,
    discipline: 'robotics',
    year: '2026',
    tags: ['robotic arm', 'training pipeline', 'ML'],
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
    next: 'industry-experience',
    description:
      'A seventeen-joint tendon-driven robotic hand built to learn hand-sewing from reference footage, with rolling-contact finger joints and cast silicone fingertips.',
    card: {
      src: 'hania-cad-render.jpg',
      alt: 'CAD render of the hand assembly',
    },
    wheel: {
      image: 'hania-turntable-poster.png',
      alt: 'Render of the full arm assembly',
      scale: 1.5,
      turntable: { name: 'hania', frames: 72, width: 504, height: 672 },
    },
  },
  {
    slug: 'industry-experience',
    number: '02',
    title: 'Industry experience \u2014 DISSOLVE',
    longTitle: true,
    discipline: 'technical design',
    year: '2026',
    tags: ['tech packs', 'grading', 'production specification'],
    tools: ['adobe illustrator', 'clo3d', 'fusion 360'],
    repo: {
      label: ['full tech packs', 'on request'],
      url: '/dlugosz-site/about',
    },
    standfirst:
      'Innovative sizing range and collection for Community Sauna Baths.',
    brief: [
      'DISSOLVE is a brand I work with as technical designer. For Community Sauna Baths it is developing Oxytocin AW27: a swimwear capsule \u2014 short, brief, bikini top, bikini brief and swimsuit \u2014 with an inclusive sizing range. Each style is specified for production: flats, construction callouts, an inside view, a bill of materials, points of measure with tolerances, a sizing chart and a grade.',
      'The bikini top is shown end to end below. Its sizing runs across three bands and six cup groups, eighteen sizes from one pattern, developed in CLO3D and taken through samples and fittings.',
    ],
    stats: [
      { value: '05', label: 'styles specified' },
      { value: '18', label: 'sizes graded, bikini top' },
      { value: '13', label: 'points of measure, bikini top' },
    ],
    next: 'pneumabra',
    description:
      'Technical design for DISSOLVE: Oxytocin AW27, an innovative sizing range and swimwear capsule for Community Sauna Baths, with full tech packs, an eighteen-size bra grade, CLO3D development and fittings, plus selected tech packs and client work.',
    card: {
      src: 'dissolve-top-flats.jpg',
      alt: 'DISSOLVE Ripple bikini top, front and back flats',
      fit: 'contain' as const,
    },
  },
  {
    slug: 'pneumabra',
    number: '03',
    title: 'PneumaBra',
    discipline: 'pneumatic textile system',
    year: '2026',
    tags: ['pcb', 'electronic design', 'ui'],
    tools: ['fusion 360', 'platsil gel 25', 'nodemcu esp8266', 'mprls sensor', 'easyeda'],
    repo: {
      label: ['github.com/kat2137/', 'pneumabra'],
      url: 'https://github.com/kat2137/pneumabra',
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
    next: 'ms-industry-challenge',
    description:
      'A pneumatic support garment: sealed silicone air channels bonded between two fabric layers, inflated and vented to change compression on demand.',
    card: {
      src: 'pneumabra-prototype-lit.jpg',
      alt: 'The inflated channel sample connected to the printed pump housing, lit in blue and green',
    },
    wheel: {
      image: 'pneumabra-hero-poster.png',
      alt: 'Render of the spherical control housing with its feed tube',
      scale: 1.35,
      turntable: { name: 'pneumabra-hero', frames: 72, width: 369, height: 246 },
    },
  },
  {
    slug: 'ms-industry-challenge',
    number: '04',
    title: 'M&S Industry Challenge',
    longTitle: true,
    discipline: 'product development',
    year: '2024',
    tags: ['adjustable underwire', 'sizing', 'winner'],
    tools: ['fusion 360', '3d print', 'clo3d'],
    repo: {
      label: ['winning project,', 'm&s industry challenge'],
      url: '/dlugosz-site/about',
    },
    standfirst:
      'An adjustable cup-size bodysuit for Marks & Spencer \u2014 one garment that covers two sizes, through a 3D-printed underwire.',
    brief: [
      'A bra is fitted to a body that does not stay one size: weight changes, and breast volume changes across the hormonal cycle. The usual answer is more sizes, and more garments bought and discarded as the body moves between them.',
      'Here the size is adjusted in the garment instead. A 3D-printed underwire with ball inserts gives the cup two levels of adjustment, so one bodysuit covers what would otherwise be two sizes \u2014 halving the size range that has to be manufactured. Materials are fully recycled, down to the elastic.',
    ],
    stats: [
      { value: '02', label: 'cup adjustment levels' },
      { value: '\u00bd', label: 'the size range to make' },
      { value: '100%', label: 'recycled materials' },
    ],
    next: 'sviatovid',
    description:
      'Winning project for the M&S Industry Challenge 2024: an adjustable cup-size bodysuit with a 3D-printed adjustable underwire that halves the size range to manufacture.',
    card: {
      src: 'ms-full-cup-size-down.jpg',
      alt: 'The bodysuit on two stands, full cup and sized down',
    },
  },
  {
    slug: 'sviatovid',
    number: '05',
    title: 'Sviatovid',
    discipline: 'robotics',
    year: '2025',
    tags: ['computer vision', 'interactive robot'],
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
    next: 'tech-pack',
    description:
      'A wearable robotic object with four animated eyes that detect and track passers-by, built on a Raspberry Pi with a two-axis servo yoke.',
    card: {
      src: 'sviatovid-bag-in-park-wide.jpg',
      alt: 'The finished leather face bag resting against a railing in a park',
    },
    wheel: {
      image: 'sviatovid-hero-poster.png',
      alt: 'Render of the eye mechanism with its two eyeball domes',
      scale: 1.09,
      turntable: { name: 'sviatovid-hero', frames: 72, width: 361, height: 481 },
    },
  },
  {
    slug: 'hikego',
    /* Hidden for now; the page lives at src/pages/work/_hikego.astro, which Astro does not build. Rename it back and drop this flag to restore. */
    hidden: true,
    number: '\u2014',
    title: 'Hike Go',
    discipline: 'software',
    year: '2025',
    tags: ['hardware demo', 'unity'],
    tools: ['unity', 'c#', '3d asset pipeline'],
    repo: {
      label: ['github.com/kat2137/', 'group_b_project'],
      url: 'https://github.com/kat2137/group_b_project',
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
      { value: '06', label: 'signal colours' },
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
    number: '06',
    title: 'Tech pack generator',
    discipline: 'tooling',
    year: '2026',
    tags: ['factory specification software', 'ML'],
    tools: ['python', 'pydantic', 'pymupdf', 'streamlit'],
    repo: {
      label: ['private \u2014 ask for', 'access'],
      url: '/dlugosz-site/about',
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
    next: 'robotic-craftsman',
    description:
      'A tech pack generation system for apparel: vector extraction from Illustrator PDFs, a controlled garment taxonomy, a Pydantic schema with per-attribute source stamps, and a frequency-table suggestion layer.',
  },
];

export const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

/** What the index lists. */
export const visibleProjects = projects.filter((p) => !p.hidden);

export function nextOf(slug: string): Project {
  return bySlug[bySlug[slug].next];
}
