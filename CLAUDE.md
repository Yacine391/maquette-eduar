# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**CDG TRANSFERT VTC** — production website of a real client: private VTC chauffeur in Paris, airport transfers (CDG, Orly, Beauvais). Live at **https://cdgtransfertvtc.fr**.

Single-page React site, no backend. Booking requests are sent by e-mail through EmailJS. Everything shown to visitors must be true: this is no longer a mockup.

## Deployment

- **Vercel deploys `main` automatically** on every push (production, usually live within a minute).
- Work on a branch. Merge / push to `main` only with the owner's explicit approval. No force-push.
- Before merging: `npm test` and `npm run build` must pass. After deploying, check the live site.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **@emailjs/browser** — booking e-mails (loaded on submit only)
- **@fontsource-variable** — self-hosted Cormorant Garamond + Montserrat (variable woff2)
- Tests: Node built-in test runner (`node --test`), no extra dependency

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server
npm test           # unit tests (price estimate, structured data, CSP hash)
npm run build      # production build: vite build + SSR build + scripts/prerender.mjs
npm run preview    # preview the production build (no vercel.json headers)
python3 scripts/optimize-images.py   # regenerate AVIF/WebP after changing a photo
```

## Build Pipeline (performance)

`npm run build` = `vite build` → `vite build --ssr src/entry-server.jsx` → `node scripts/prerender.mjs`, which rewrites `dist/index.html`:
- the page HTML is pre-rendered at build time (`renderToString`) and hydrated in the browser (`hydrateRoot` inside `startTransition`, `src/main.jsx`);
- the CSS is inlined in a `<style>` (no render-blocking request); only woff2 subsets used by FR/EN/RU/RO are kept;
- the 3 above-the-fold font files (latin) are preloaded;
- the JS entry is loaded by the inline loader `scripts/app-loader.js` (low fetch priority), allowed by its **sha256 hash in the CSP** of `vercel.json`.

Rules:
- Render code must not touch `window` / `document`; values that differ between build time and visit (today's date, current year) are set in `useEffect`.
- Changing `scripts/app-loader.js` changes its hash: update `script-src` in `vercel.json` (`npm test` fails until they match).
- No opacity-0 entrance animation in the hero, no SVG filters in backgrounds (use pre-rendered tiles), no base64-inlined assets (`assetsInlineLimit: 0`).
- Below-the-fold sections use `content-visibility: auto` (`src/index.css`).
- Non-critical JS is lazy-loaded (EmailJS on submit, gallery on first open).

## Images

- Originals (not deployed): `images-src/vehicles/*.jpg`, `images-src/logo.png`.
- `scripts/optimize-images.py` writes AVIF + WebP variants to `src/assets/` (hashed by Vite, cached 1 year), `sizes.json`, the logo variants, the favicon and the background grain tile.
- Fleet covers are cropped per card layout (`COVERS` in the script, `COVER_LARGE` / `COVER_SMALL` in `Fleet`), reproducing the `object-fit: cover` framing: update both if a cover photo or the card size changes.
- Every `<img>` has `width` / `height`, `srcset` / `sizes`, `loading="lazy"` and `decoding="async"` (nothing above the fold is an image).

## Security Headers (`vercel.json`)

Strict CSP (`script-src` hash + `'strict-dynamic'`, Trusted Types with the single `loader` policy, `connect-src` limited to `api.emailjs.com` and `api-adresse.data.gouv.fr`, `frame-ancestors 'none'`), HSTS `includeSubDomains; preload`, COOP `same-origin`, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, 1-year immutable cache on `/assets/`. A new third-party service (script, API, font, image host) must be added to the CSP, then checked in a browser (no CSP violation in the console).

## Design System (enforce strictly)

| Token | Value |
|---|---|
| Canvas / Background | `#0A0A0C` (Onyx Deep) |
| Accent / CTA | `#C5A059` (Bronze Champagne) |
| Accent hover | `#D6B471` |
| Primary text | `#F4F4F6` (Off-White) |
| Secondary text | `#8E8E93` (Matte Silver) |
| Title font | **Cormorant Garamond** (serif) |
| Body / UI font | **Montserrat** (sans-serif) |

Generous spacing between sections. Buttons transition to `#D6B471` on hover, `0.3s ease-in-out`. Fleet cards: `hover:scale-105` + inner gold glow.

## Page Architecture (DOM order)

Header → Hero → Booking → Fleet → WhyUs → Reviews (« Votre avis compte ») → Rates → Contact → Footer, plus a floating WhatsApp button.

Fleet order (strict): **BUSINESS** — Mercedes Classe E (featured, gold border, « Recommandé ») → **Luxe** — Classe S → **Van** — Classe V → **Éco / Électrique** — Tesla Model Y.

## Code Map

```
src/
  entry-server.jsx     build-time render (used by scripts/prerender.mjs)
  components/          Header, Hero, BookingModule (+ AddressAutocomplete), Fleet,
                       Gallery/Lightbox, WhyUs, Reviews, Rates, Contact, Footer,
                       Picture (+ CoverPicture), Logo
  constants/
    translations.js    FR / EN / RU / RO texts
    vehicles.js        real fleet + client photos (public/vehicles/)
    rates.js           price table = single source of truth (+ derived priceEstimates)
    contact.js         phone / WhatsApp (single source)
    vehiclePhotos.js   AVIF / WebP srcsets of the fleet photos
  config/emailjs.js    EmailJS service, templates, public key
  hooks/               useTranslation, usePriceEstimate
  utils/               priceZone.js (trip → price zone), estimatePrice.js
scripts/               prerender.mjs, app-loader.js, optimize-images.py
images-src/            original photos and logo (not deployed)
tests/                 priceZone.test.js, security.test.js
public/                og-image.jpg (1200×630), sitemap.xml, robots.txt
index.html             SEO meta, Open Graph, hreflang, JSON-LD (TaxiService + LocalBusiness)
```

## Booking Flow

- Form fields: name, e-mail, phone (required: the client is called back by phone / WhatsApp), date (not in the past), time, pickup, drop-off, vehicle.
- On submit, EmailJS sends 1) the notification to the business (`ADMIN_TEMPLATE_ID`, mandatory) and 2) a summary to the client (`CLIENT_TEMPLATE_ID`, best effort: its failure must not show an error).
- If the notification fails: fallback message with a `tel:` link and a WhatsApp link pre-filled with the request.
- Success message: « Demande de réservation envoyée ! Nous vous confirmons votre course rapidement par téléphone ou WhatsApp. » — it is a request, not a confirmed booking.
- Recipient addresses and template contents live in the EmailJS dashboard, not in the code.
- **Never send real booking e-mails while testing** without the owner's approval: intercept `api.emailjs.com` in the browser (e.g. Playwright `page.route`).

## Prices

- `src/constants/rates.js` → `rateTable` is the only place where prices are written; the booking estimate is derived from it.
- Zones (`src/utils/priceZone.js`): Paris ↔ Paris → Paris Centre-ville; Paris ↔ CDG / Orly → airport flat rate; Paris ↔ Beauvais → Beauvais / Paris; anything else → « Sur devis ». Never show a price for a trip that is not in the displayed table.
- Addresses are classified by postal code first (75001–75020, 75116 = Paris), then airport keywords. Add a test in `tests/priceZone.test.js` for every new case.

## Content & SEO Rules (production)

- Only true, verifiable content: no fake reviews, ratings, statistics or invented claims; no « démo / simulé / maquette » wording.
- Structured data must match exactly what is displayed: `priceRange` = min – max of `rateTable` (checked by `npm test`); never add `aggregateRating` / `review` markup.
- Google review button: `https://g.page/r/CfqSDSmBkk6BEBM/review` (direct link, no third-party shortener).
- `hreflang`: only `fr` + `x-default` until real `/en/` pages exist.
- **Pending client confirmation — do not modify without the owner's approval:** the « Pourquoi nous choisir » arguments (`WhyUs`) and the highlights bar under the hero (`STATS` in `Hero`).
- Every visible text exists in the 4 languages (FR / EN / RU / RO); `<html lang>` follows the displayed language.
- Accessibility: text contrast ≥ 4.5:1 (`silver-dim` = `#808086` is the darkest allowed grey on the dark backgrounds), single `<main>`, labelled `<nav>`s, native buttons/links (no clickable divs), valid ARIA (address fields use the combobox pattern).
- Target: Lighthouse 100 / 100 / 100 / 100 on mobile and desktop and Agentic Browsing 2/2, with no failing audit.
- Vehicle photos are the client's own photos (`public/vehicles/`). Do not copy text or images from other VTC sites.
- Code comments: short, in French, describing the production behaviour.
