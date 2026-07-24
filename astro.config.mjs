// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://socialio.io',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/client-login') && !page.includes('/client-dashboard'),
      // Stamps each URL with the actual build time -- honest proxy for "last modified"
      // since there's no per-page CMS date to draw from.
      /** @param {import('@astrojs/sitemap').SitemapItem} item */
      serialize: (item) => ({ url: item.url, lastmod: new Date().toISOString() }),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
  },
});