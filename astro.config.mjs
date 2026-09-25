// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Deployed as a GitHub Pages project site at kat2137.github.io/dlugosz-site.
 * If the site moves to a custom domain, set `site` to it and drop `base`.
 */
export default defineConfig({
  site: 'https://kat2137.github.io',
  base: '/dlugosz-site',

  /**
   * The project was renamed from Hania to Robotic Craftsman after the first
   * deploy, so the old address is out in the world. Astro writes a redirecting
   * page for each of these in a static build.
   */
  redirects: {
    // The destination is not base-prefixed for us, so it carries the base.
    '/work/hania': '/dlugosz-site/work/robotic-craftsman',
  },
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
  image: {
    // Large source photographs; cap the work Sharp does per build.
    responsiveStyles: false,
  },
});
