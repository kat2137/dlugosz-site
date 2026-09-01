import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kat2137.github.io',
  base: '/dlugosz-site',
  integrations: [mdx(), sitemap()],
});
