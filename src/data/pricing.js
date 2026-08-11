// Single source of truth for OpsHQ Digital pricing.
// Referenced by /pricing/ (display) and /tools/roi-estimator/ (estimate math).
// Edit prices here and both stay in sync.

export const BASE = {
  label: 'Website + Hosting',
  tagline: 'Your site, hosted, monitored, and optimized — T1 Opstimization included.',
  setup: 50,
  monthly: 25,
  includes: [
    'Fast, secure website hosting — SSL, backups, uptime monitoring',
    'On-page SEO + AI-search optimization (schema, llms.txt, sitemap, IndexNow)',
    'Contact form wired to your inbox + basic analytics',
    'T1 Opstimization — one premium AI optimization pass per month',
    'Monthly performance snapshot',
  ],
};

// Ladder order. Estimator fields: lift (extra monthly leads, %), inbox (5-min response capture),
// boost (multiplier on modeled results), core (headline driver), adIncluded (ad budget baked in).
export const ADDONS = [
  {
    id: 't2_opstim', label: 'Priority Optimization (T2)', monthly: 25, setup: 25,
    desc: 'Hands-on monthly tuning + premium AI models — squeezes more out of everything you run.',
    lift: 0, inbox: false, boost: 0.10,
  },
  {
    id: 'content_seo', label: 'Content & SEO Engine', monthly: 25, setup: 60,
    desc: 'AI-assisted, human-approved posts + technical SEO so you rank locally and in AI search.',
    lift: 0.15, inbox: false, boost: 0,
  },
  {
    id: 'ai_inbox', label: 'AI Inbox — 5-Minute Lead Response', monthly: 25, setup: 90, core: true,
    desc: 'Answers every lead in your voice within 5 minutes, human-approved. Includes ROI / ROAS / ROAI reporting.',
    lift: 0, inbox: true, boost: 0,
  },
  {
    id: 'social', label: 'Social Auto-Posting', monthly: 15, setup: 30,
    desc: 'Consistent presence on Facebook + X, auto-published from your content.',
    lift: 0.08, inbox: false, boost: 0,
  },
  {
    id: 'sem', label: 'Google Ads / SEM', monthly: 59, setup: 90, adIncluded: true,
    desc: 'Managed Google Ads — includes a $30/mo starter ad budget. Fastest way to more leads.',
    lift: 0.25, inbox: false, boost: 0,
  },
];

// Popular starting points (base + these add-on ids). Totals computed at render.
export const BUNDLES = [
  { name: 'Get Found', addonIds: ['content_seo'], blurb: 'A site that ranks + a steady stream of content.' },
  { name: 'Never Miss a Lead', addonIds: ['ai_inbox'], blurb: 'Answer every inquiry in 5 minutes, with ROI reporting.', featured: true },
  { name: 'Full Growth', addonIds: ['ai_inbox', 'content_seo', 'social'], blurb: 'Capture leads, rank, and stay visible everywhere.' },
];
