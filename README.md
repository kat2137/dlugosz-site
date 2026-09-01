# Katarzyna Długosz — portfolio

Static Astro site. Six pages, no database, no CMS, no runtime. Content lives in
git as MDX.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Design tokens

All colour and type lives in `src/styles/global.css`. Changing the palette means
editing that one block.

```
--ground  #E7E3DA   page
--ink     #1E1B16   headings, body
--rule    #CDC7BA   hairlines
--accent  #0B6B58   links, labels, callout leaders
--fill    #9FE2BF   highlights, link hover
--figure  #14201C   dark figure bands
```

Typefaces: Space Grotesk (display), Archivo (body), IBM Plex Mono (metadata).
All free from Google Fonts. If a budget appears, swapping IBM Plex Mono for
Berkeley Mono is the highest-impact upgrade.

## Adding a project

Create `src/content/work/<slug>.mdx`. The frontmatter schema is enforced at
build time in `src/content.config.ts` — a missing or misnamed field fails the
build rather than shipping silently. `order` controls homepage sequence; the
lowest number becomes the full-width lead project.

Keep the four headings — Problem, Constraint, What I built, What broke. The last
one is the differentiator; almost no portfolio has it.

## Images

Put them beside the MDX file and import them so Astro's pipeline generates
AVIF/WebP and responsive srcset:

```mdx
import mechanism from './01-mechanism.jpg';
<Image src={mechanism} alt="Two-axis eye assembly, camera bed removed" />
```

Commit web-sized copies only — 2400px for heroes, 1600px for details. Keep
originals in Drive. Committed RAW files bloat the repo permanently.

## Lab page

Set `GITHUB_USER` (and optionally `GITHUB_TOKEN` for rate limits) in the build
environment. Repos are fetched at build time only. The nightly workflow in
`.github/workflows/nightly.yml` pings a deploy hook so the page stays current —
add `DEPLOY_HOOK_URL` as a repository secret.

If there aren't repos worth pinning yet, remove Lab from the nav array in
`src/components/SiteHeader.astro`. An empty lab page is worse than no lab page.

## Deploying

Cloudflare Pages or Vercel, both free at this scale. Build command `npm run
build`, output directory `dist`. Set the real domain in `astro.config.mjs` —
`site` feeds canonical URLs, the sitemap and JSON-LD, so it must be correct
before launch.

## Before launch

- [ ] Replace every `{/* TODO */}` in `src/content/work/*.mdx`
- [ ] Real numbers in the `metrics` frontmatter — placeholders currently read TBC
- [ ] Photographer and model credits on every project that needs them
- [ ] Clearance check on Robert Wun, Galia Lahav and B Fashion Studio material
- [ ] `public/cv.pdf` added; About page links to it
- [ ] Real GitHub and LinkedIn URLs in the JSON-LD block in `src/layouts/Base.astro`
- [ ] Per-project OG images
