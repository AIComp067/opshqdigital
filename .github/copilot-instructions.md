# OpsHQ Digital (OHQD) — Copilot Instructions

## What this is
`opshqdigital.com` — **LIVE** business-consulting site (Nick's own brand).
Astro + Tailwind → Azure Static Web Apps, Cloudflare DNS. ~26 pages, low traffic
(single-digit GSC impressions/week), so treat metric swings as noise.

## Stack
- Astro + Tailwind, **npm** (`package-lock.json`)
- Deploy: push to `master` → GitHub Actions → Azure SWA

## Commands
```bash
npm ci
npm run build        # astro build — 28 pages
npm run preview
```

## Conventions
- Commit trailer: `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`
- Purge Cloudflare after deploy before verifying anything.

## Gotchas

**`www.opshqdigital.com` does not resolve — apex only.** The GA4 data stream and all canonical
URLs use `https://opshqdigital.com`. Any script or test that hits `www.` will fail to connect.
Worth fixing in DNS, but until then assume apex.

**The gtag shim must push `arguments`, not a rest-parameter array.** This broke GA4 completely
until 2026-09-01:
```js
function gtag(...args) { dataLayer.push(args); }   // BROKEN — pushes a real Array
function gtag()        { dataLayer.push(arguments); }  // correct
```
`gtag.js` only processes genuine `arguments` objects and silently ignores arrays, so every
`consent` / `js` / `config` call was dropped. Symptom: `gtag/js` loads fine, consent banner
works, and **zero** `/g/collect` beacons ever fire. Google's official snippet is written the
way it is for exactly this reason — do not "modernise" it.

**Consent Mode defaults to denied.** `src/components/CookieConsent.astro` sets
`analytics_storage: 'denied'` and only grants on an explicit Accept. That is intentional —
don't "fix" missing analytics by removing the gate.

**`isBot()` / `navigator.webdriver`.** Automated analytics tests need
`Object.defineProperty(navigator,'webdriver',{get:()=>false})` or they silently return a false
negative.

## Do NOT
- Do not hand-edit `dist/`.
- Do not commit client data — this site is marketing only; CRM data lives elsewhere.
