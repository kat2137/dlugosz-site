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
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
  image: {
    // Large source photographs; cap the work Sharp does per build.
    responsiveStyles: false,
  },
});
