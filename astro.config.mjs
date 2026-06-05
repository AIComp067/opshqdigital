// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

const SITE = 'https://opshqdigital.com';

/** Pages that have a hero image — used to populate <image:image> sitemap entries. */
const PAGE_IMAGES = {
  [`${SITE}/`]: { url: `${SITE}/images/hero-home.jpg`, caption: 'Business automation dashboard showing lead tracking and AI-powered workflows', title: 'OpsHQ Digital — homepage' },
  [`${SITE}/services/`]: { url: `${SITE}/images/hero-services.jpg`, caption: 'AI Inbox + custom builds for service businesses', title: 'OpsHQ Digital services overview' },
  [`${SITE}/services/ai-inbox/`]: { url: `${SITE}/images/hero-ai.jpg`, caption: 'AI Inbox automation for wedding venues with 5-minute response time', title: 'AI Inbox for wedding venues' },
  [`${SITE}/capabilities/`]: { url: `${SITE}/images/hero-services.jpg`, caption: 'Custom AI, cloud, CRM, and web builds for small business', title: 'OpsHQ Digital capabilities' },
  [`${SITE}/work/transportation-crm/`]: { url: `${SITE}/images/hero-casestudy1.jpg`, caption: 'Transportation company CRM showing lead pipeline with 200+ managed leads and automated follow-ups', title: 'Transportation CRM case study' },
  [`${SITE}/work/content-platform/`]: { url: `${SITE}/images/hero-casestudy2.jpg`, caption: 'Content platform with automated publishing pipeline, SEO analytics, and page-one Google rankings', title: 'Content platform case study' },
  [`${SITE}/work/inquiry-response-automation/`]: { url: `${SITE}/images/hero-casestudy1.jpg`, caption: 'AI-assisted inquiry response automation: 4-hour to 8-minute first reply time', title: 'Charter operator inquiry response automation case study' },
};

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    format: 'directory',
  },

  integrations: [sitemap({
    filter: (page) => !['/404/', '/terms/'].some(path => page.includes(path)),
    serialize(item) {
      const img = PAGE_IMAGES[item.url];
      if (img) item.img = [img];
      return item;
    },
  })],
});