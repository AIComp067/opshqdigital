// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://opshqdigital.com',
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    format: 'directory',
  },

  integrations: [sitemap({
    filter: (page) => !['/404/', '/terms/'].some(path => page.includes(path)),
  })],
});