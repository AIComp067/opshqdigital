// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

const SITE = 'https://opshqdigital.com';

/** Pages that have a hero image — used to populate <image:image> sitemap entries. */
const PAGE_IMAGES = {
  [`${SITE}/`]: { url: `${SITE}/images/hero-home.jpg`, caption: 'Business automation dashboard showing lead tracking and AI-powered workflows', title: 'OpsHQ Digital — homepage' },
  [`${SITE}/services/`]: { url: `${SITE}/images/hero-services.jpg`, caption: 'Technology services including CRM, AI automation, web development, and cloud infrastructure', title: 'OpsHQ Digital services overview' },
  [`${SITE}/services/ai/`]: { url: `${SITE}/images/hero-ai.jpg`, caption: 'AI-powered automation workflow with intelligent email agents and lead routing', title: 'AI agents and intelligent automation' },
  [`${SITE}/services/cloud/`]: { url: `${SITE}/images/hero-cloud.jpg`, caption: 'Cloud infrastructure dashboard with monitoring, CI/CD pipelines, and security controls', title: 'Cloud infrastructure and DevOps' },
  [`${SITE}/services/crm/`]: { url: `${SITE}/images/hero-crm.jpg`, caption: 'Custom CRM dashboard with lead tracking pipeline and automated follow-up system', title: 'Custom CRM development for small business' },
  [`${SITE}/services/web/`]: { url: `${SITE}/images/hero-web.jpg`, caption: 'Modern website design with fast load times and SEO-optimized architecture', title: 'Website development that generates leads' },
  [`${SITE}/work/transportation-crm/`]: { url: `${SITE}/images/hero-casestudy1.jpg`, caption: 'Transportation company CRM showing lead pipeline with 200+ managed leads and automated follow-ups', title: 'Transportation CRM case study' },
  [`${SITE}/work/content-platform/`]: { url: `${SITE}/images/hero-casestudy2.jpg`, caption: 'Content platform with automated publishing pipeline, SEO analytics, and page-one Google rankings', title: 'Content platform case study' },
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