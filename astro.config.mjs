import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO: when dlugosz.com is registered, set `site` to it and DELETE `base`
  // entirely — a custom domain serves from the root.
  site: 'https://kat2137.github.io',
  base: '/dlugosz-site',
  integrations: [mdx(), sitemap()],
});
