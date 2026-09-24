# dlugosz-site

Portfolio site for Katarzyna Długosz — four project pages built from the
`Portfolio_website_UI_mockups` design handoff.

Astro, static output, no client framework. Deployed to GitHub Pages.

```bash
npm install
npm run dev      # http://localhost:4321/dlugosz-site
npm run build    # -> dist/
npm run preview
npm run check    # astro check (TypeScript + template diagnostics)
```

## Routes

| Route              | Project                                      |
| ------------------ | -------------------------------------------- |
| `/`                | Project wheel — five miniatures, link to Lab |
| `/work/hania`      | Hania — robotics · 2026                      |
| `/work/sviatovid`  | Sviatovid — robotics · 2025                  |
| `/work/pneumabra`  | PneumaBra — interactive material · 2026      |
| `/work/hikego`     | HikeGo — software · 2025                     |
| `/work/tech-pack`  | Tech pack generator — tooling · 2026         |
| `/lab`             | Public repositories, fetched from GitHub     |

## Layout of the source

```
src/
  data/
    projects.ts            title band, brief, stats and page sequence
    sections/*.ts          the contents accordion for each page
    repos.ts               code-viewer file lists
    types.ts, types-code.ts
  components/              the shared page system
    sony/                  signal table, command-layer diagram, modes table
    pneumabra/             tensile stiffness chart
  layouts/
    Base.astro             document shell, fonts, SEO, JSON-LD
    ProjectPage.astro      nav + title band + slot + next band
  lib/
    highlight.ts           code-viewer tokeniser (build and browser)
    media.ts               image lookup by file name
    paths.ts               base-path-aware URLs
  styles/global.css        design tokens and every component class
  assets/media/            imagery, processed by astro:assets
public/
  code/<repo>/             vendored repo sources for the code viewers
  turntables/<name>/       scroll-scrubbed turntable frames, 000.webp …
```

**All project copy is approved text from the handoff and was ported
verbatim** — extracted from the prototype rather than retyped. Edit it in
`src/data/`, not in the templates.

Design tokens live once, at the top of `src/styles/global.css`. The accent
colour, the ink tints and the page geometry are all variables; change them
there rather than in components.

## How the pieces work

**Bands.** Every content row is a `<Band>`: a 150px margin column for the
figure number and its label, a 1fr content column, 40px apart. Below ~900px the
margin column stacks above the content.

**Contents accordion.** Plain `<details>`/`<summary>` — no JavaScript, keyboard
accessible, first section open. The `+`/`−` marker and the title opacity come
from `[open]` in CSS.

**Code viewer.** Repo sources are vendored under `public/code/` so they are
served as static files. The file shown first is rendered at build time as plain
numbered lines, so the panel has content before any JavaScript runs; on load the
browser fetches that file and highlights it in place, and every later file is
fetched on click and cached. Build and browser share one tokeniser
(`src/lib/highlight.ts`), so the two paths produce identical markup.

To refresh the code from GitHub, replace the files under
`public/code/<repo>/` and update the file lists in `src/data/repos.ts`.

**Images.** `astro:assets` generates WebP at several widths for everything in
`src/assets/media`. Animated GIFs would be flattened by that pipeline; put any
new ones in `public/media/` and they are referenced directly.

**Turntables.** The Hania hero and Sviatovid fig. 04 rotate with scroll rather
than autoplaying (`src/components/Turntable.astro`). Each is a folder of 72
frames under `public/turntables/`, fetched only once the figure is near the
viewport; one full revolution maps onto the figure's passage through the
screen, starting from frame 0. Frame 0 is also saved as a poster in
`src/assets/media/*-turntable-poster.jpg`, which is all that shows without
JavaScript or with reduced motion requested.

To replace one, export the new turntable, cut it into numbered WebP frames at
the size given in the page's `turntable` prop, and replace the poster.

Turntable frames are transparent cut-outs, so they sit on the page and overlap
on the homepage wheel without a box. All three were cut from GIF exports, whose
256-colour dither shows as a fine grain at this size; re-cutting them from the
original video exports would remove it. `hania-cutout.png` and
`sviatovid-cutout.png` are clean cut-outs of the high-resolution renders, kept
for anywhere a still is wanted.

**SEO.** Per-page title, description, canonical, Open Graph and a generated
social image; `CreativeWork` JSON-LD on each project and `ProfilePage` on the
index; `@astrojs/sitemap` writes `sitemap-index.xml`, linked from
`public/robots.txt`.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes to
GitHub Pages. Enable Pages with **Source: GitHub Actions** in the repository
settings once.

`astro.config.mjs` is set for a project site at
`kat2137.github.io/dlugosz-site`. On a custom domain, set `site` to it and
remove `base` — every internal link goes through `src/lib/paths.ts`, so nothing
else needs touching.

## The lab route

`/lab` lists public repositories for `kat2137`, fetched from the GitHub API at
build time and rebuilt nightly by the deploy workflow, so it stays current
without anyone editing the site. Forks, archived repos and the site's own repo
are filtered out.

Private or not-yet-public work goes in the `MANUAL` array in
`src/lib/github.ts` — those entries render without a link and carry a
`private` tag. The tech pack generator is listed that way.

If GitHub is unreachable or rate-limits the build, the page falls back to the
manual entries and logs a warning rather than failing the build. In Actions the
workflow passes `GITHUB_TOKEN`, which lifts the unauthenticated limit.

## Decisions worth a second look

0. **The tech pack generator page is draft.** It was not in the design
   handoff, so its copy was written from the project's own notes and needs a
   read through before launch, and it has no figures — the hero and the section
   plates render as placeholder frames until imagery arrives.
   Copy lives in `src/data/sections/tech-pack.ts`.

1. **PneumaBra's "next" link.** The prototype sends PneumaBra back to
   Sviatovid, which breaks the 01 → 02 → 03 → 04 sequence. It is wired to Sony
   here (`next` in `src/data/projects.ts`). Change it back if that was intended.

2. **Six plates were wired up by id.** These carried only a slot id in the
   prototype, but an asset with the same stem exists and the captions match, so
   they are now live: `arm-cad`, `arm-tests`, `arm-tip-grip`, `arm-tip-cad`,
   `arm-wrist-ref`, `arm-elbow`. Worth a visual check.

3. **Seven plates are still empty**, with no matching asset anywhere in the
   bundle. They render as a dashed frame carrying the placeholder text from the
   design: `elec-board`, `elec-sch`, `elec-bench` (Hania, Electronics) and
   `train-mot-seq`, `train-mot-hand`, `train-mot-plot` (Hania, Training). Drop
   images into `src/assets/media/` named after the slot id and they will appear
   with no code change.

4. **Lab and About** are in the nav in the design but have no routes yet, so
   they render dimmed and non-interactive rather than as dead links.

5. **The homepage is a project wheel** (`src/components/ProjectWheel.astro`).
   Five miniatures on a ring; clicking a side one, the arrows, the keyboard
   arrows or a swipe turns it to the centre, where it spins slowly and its
   description fades in below. Clicking the centred one opens the project.
   Spin speed is the `SPIN` constant at the top of the component — every 2nd
   turntable frame at 6 fps, about six seconds a revolution.
   Miniatures are set per project under `wheel` in `src/data/projects.ts`;
   `scale` crops the empty sides of a wide render so each object reads at a
   similar size. HikeGo has no turntable yet and sits still; the tech pack
   generator has no imagery and shows a numbered placeholder tile.

6. **PneumaBra's hero fills the column.** `HeroFigure` takes a `gutter` prop —
   250px by default, which is the label margin the design reserves. PneumaBra
   passes `gutter={0}`, so the figure spans the full content width and the
   callout labels sit over the image on a scrim. The other three keep the
   gutter.

7. **Hania's hero** is a hand-tuned 639 × 425 in the prototype, inside a 660px
   column. It is reproduced as `width: 100%` with that aspect ratio, so it fills
   the column. The callout arrows are unaffected — they are positioned against
   the wrapper, not the image.

## Not carried over

`support.js` and `image-slot.js` were prototype runtime only, as the handoff
notes. The `.dc.html` review chrome — the `9a`/`11a` badges and the
notes above each page card — is not part of the site.
