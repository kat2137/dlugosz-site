import type { Section } from '../types';

/**
 * DRAFT COPY — unlike the other four projects, this page was not part of the
 * approved design handoff. Written from the project's own notes; needs a read
 * through before it goes live.
 */
export const sections: Section[] = [
  {
    title: 'The problem',
    meta: 'Apparel · tooling',
    lede: 'A tech pack is the document that makes a garment manufacturable: construction, bill of materials, measurements, labelling. It is assembled by hand, from a drawing, by someone who already knows what the drawing implies.',
    groups: [
      {
        label: 'What the drawing already contains',
        tag: 'not a vision problem',
        text: 'The core problem is not primarily a vision problem — where every element sits is already encoded in the drawing. The work is turning that into a structured object: which elements are present, what each one is, and which of its attributes were observed, inferred or decided by a person.',
        plates: [
          { src: 'tp-labels.jpg', alt: 'A YAML file listing garment drawings, each with its own labels: trouser, harem, gathered at ankle, elasticated waistband; blazer, tailored, lining, three piece sleeve, standing collar',
            caption: 'The controlled vocabulary, built by labelling real drawings one at a time' },
        ],
      },
    ],
    body1: 'Source packs originate in Illustrator, so the drawings arrive as vector PDFs rather than images. That makes extracting the leader-line paths and their coordinates a stronger route than running raster detection over a rendered page.',
    body2: 'Whether those paths are cleanly filterable is the decision gate for the whole pipeline: if they are, a detection model is not needed for the element page at all.',
    takeaway: 'The drawing is already structured data badly stored. The job is to read it, not to look at it.',
  },
  {
    title: 'Schema and taxonomy',
    meta: 'Python · Pydantic',
    lede: 'One controlled taxonomy is the single source of truth. The schema, the training labels and the interface all derive from it, so the three cannot drift apart silently.',
    groups: [
      {
        label: 'Source stamps, per attribute',
        tag: 'observed · inferred · manual',
        text: 'Every attribute carries how it was arrived at, not every garment. Seam type and pocket type vary by location within one garment, so the object holds a list of located elements, each attribute stamped separately. Attributes that are not visible at all — French seams, fusing — are never used as vision labels; they are stored as encoded inference data instead.',
        plates: [
          { src: 'tp-stitch-breakdown.jpg', alt: 'A stitch breakdown table: seam type, area, stitch image, thread type and thread colour per row, with each stitch drawn beside its description',
            caption: 'One row per attribute, each carrying the stitch it specifies and where it was read from' },
        ],
      },
      {
        label: 'Suggestions without a model',
        tag: 'frequency table',
        text: 'Construction finishes are a function of element type, fabric class and garment class. That is a conditional frequency table over annotated packs, not something that needs training — and it stays inspectable, which matters when a suggestion has to be defended to whoever is making the garment.',
        plates: [],
      },
    ],
    body1: 'Four ML architectures were reviewed against the pipeline as it actually stands — Fashionpedia/Attribute-Mask R-CNN, IMAGGarment, Informative Drawings and GarmentCode/StarVector — and all four were rejected, each for a stated reason rather than on feel. Diffusion was ruled out for both line generation and colourway rendering.',
    body2: 'Stitch-type classification was abandoned outright: stitch types are not reliably visible on a flat drawing, so any model trained to find them would be learning noise.',
    takeaway: 'Rejecting four architectures with reasons is the result. The schema is what survived the argument.',
  },
  {
    title: 'What is built, and what is next',
    meta: 'Status',
    lede: 'The taxonomy, the output structure, the models and a demo app exist. The interface is last on purpose — every screen is a view over one structured object, so the object has to be right first.',
    groups: [
      {
        label: 'The order of work',
        tag: 'schema before pages',
        text: 'Fix the live taxonomy bugs and quarantine the deprecated stitch system; hand-parse ten packs against the corrected taxonomy to check the schema can actually express them; run the vector-extraction spike; lock the schema with source stamps and three-way specified / unspecified / not-applicable states; audit the label file against the taxonomy by set difference; then build the corpus, the suggestion layer, and only then the interface.',
        plates: [],
      },
    ],
    body1: 'The code has not yet caught up with the architectural pivot — the stitch-mapping system is deprecated in principle and still present in fact, and the label file has not been audited against the taxonomy, which is the kind of drift that corrupts training data quietly.',
    body2: 'The schema is settled and the extraction runs; what is still being built is the page layer that turns one structured object into the four views a factory reads.',
    takeaway: 'Locking the schema before building any page is the decision the rest of the project rests on.',
  },
];
