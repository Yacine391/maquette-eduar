# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**CDG TRANSFERT VTC** — production website of a real client: private VTC chauffeur in Paris, airport transfers (CDG, Orly, Beauvais). Live at **https://cdgtransfertvtc.fr**.

Pre-rendered multi-page React site, no backend: home + 7 service pages, each in 4 languages (32 URLs — French at the root, then `/en/…`, `/ru/…`, `/ro/…`), plus a blog (`/blog`, 10 categories, Markdown articles). Booking requests are sent by e-mail through EmailJS. Everything shown to visitors must be true: this is no longer a mockup.

## Deployment

- **Vercel deploys `main` automatically** on every push (production, usually live within a minute).
- Work on a branch. Merge / push to `main` only with the owner's explicit approval. No force-push.
- Before merging: `npm test` and `npm run build` must pass. After deploying, check the live site.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **@emailjs/browser** — booking e-mails (loaded on submit only)
- **@fontsource-variable** — self-hosted Cormorant Garamond + Montserrat (variable woff2)
- **marked** + **yaml** (dev dependencies, build time only) — blog Markdown and frontmatter
- Tests: Node built-in test runner (`node --test`), no extra dependency

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server
npm test           # blog generation + unit tests (price estimate, SEO / structured data / content, blog, CSP hash)
npm run build      # production build: vite build + SSR build + scripts/prerender.mjs
npm run check:links  # after a build: every internal link / anchor / image of dist/ resolves
npm run blog       # regenerate src/content/blog/generated/ from content/blog/ (also done by dev / build / test)
npm run preview    # preview the production build (no vercel.json headers, no clean URLs)
python3 scripts/optimize-images.py        # regenerate AVIF/WebP after changing a fleet photo
python3 scripts/optimize-blog-images.py   # regenerate blog images after adding one to images-src/blog/
```

## Build Pipeline (performance)

`npm run build` = `vite build` → `vite build --ssr src/entry-server.jsx` → `node scripts/prerender.mjs`. The `blog-content` Vite plugin (`vite.config.js`) first turns `content/blog/**/*.md` into JS modules (`scripts/blog/generate.mjs`). `prerender.mjs` uses `dist/index.html` as a template and writes **one HTML file per route** (`index.html`, `en.html`, `vtc-aeroport-cdg.html`, `en/vtc-aeroport-cdg.html`…, served without extension by Vercel through `vercel.json`: `redirects` `*.html` → URL without extension (308), `rewrites` URL → `.html` file, `trailingSlash: false`; `cleanUrls` is not used because it would also redirect the Google verification file):
- `<html lang>` and the route's `<head>` (title, description, canonical, hreflang, Open Graph, Twitter, JSON-LD — `src/seo/head.js`) replace the `<!--app-head-->…<!--/app-head-->` placeholder of `index.html`;
- the page HTML is pre-rendered at build time (`renderToString`) with the route in `data-lang` / `data-page` on `#root`, and hydrated in the browser (`hydrateRoot` inside `startTransition`, `src/main.jsx`);
- code splitting: the page-type chunk (`HomePage`, `ServicePage`, `BlogList`, `BlogArticle`) and the page text (`src/content/services/pages/<slug>.js` or the generated article) are loaded before hydration — nothing from the other pages is downloaded; React is in its own `react` chunk (cached across deploys; keeps the « unused JavaScript » audit under its threshold on pages without a form);
- the CSS is inlined in a `<style>` (no render-blocking request; one global stylesheet, `cssCodeSplit: false`, so no lazy chunk tries to preload the deleted CSS file); only woff2 subsets used by FR/EN/RU/RO are kept. Its **sha256 hash is the only `style-src` of the CSP**: `prerender.mjs` rewrites it in `vercel.json` when the CSS changes (commit `vercel.json` after a build); on Vercel (`VERCEL=1`) a stale hash fails the build;
- `dist/404.html`: static not-found page (no JS, `noindex`), served by Vercel with a 404 status;
- the above-the-fold fonts are preloaded per language (latin, + latin-ext for RO, + cyrillic for RU) and page type (Cormorant italic on the home page only);
- the JS entry is loaded by the inline loader `scripts/app-loader.js` (low fetch priority), allowed by its **sha256 hash in the CSP** of `vercel.json`;
- `sitemap.xml` (32 URLs with hreflang alternates + blog), `robots.txt` (search engines and AI crawlers allowed), `llms.txt` and `blog/rss.xml` are generated from `src/seo/files.js`.

Rules:
- Render code must not touch `window` / `document`; values that differ between build time and visit (today's date, current year) are set in `useEffect`.
- Changing `scripts/app-loader.js` changes its hash: update `script-src` in `vercel.json` (`npm test` fails until they match).
- No `style` attribute in rendered HTML (blocked by the CSP): use CSS classes (`src/index.css`, e.g. `bg-hero-base`, `bg-dots-gold`); runtime styles set by React after hydration are fine.
- No opacity-0 entrance animation in the hero, no SVG filters in backgrounds (use pre-rendered tiles), no base64-inlined assets (`assetsInlineLimit: 0`).
- Below-the-fold sections use `content-visibility: auto` (`src/index.css`).
- Non-critical JS is lazy-loaded (EmailJS on submit, gallery on first open).

## Images

- Originals (not deployed): `images-src/vehicles/*.jpg`, `images-src/logo.png`.
- `scripts/optimize-images.py` writes AVIF + WebP variants to `src/assets/` (hashed by Vite, cached 1 year), `sizes.json`, the logo variants, the favicon and the background grain tile.
- Fleet covers are cropped per card layout (`COVERS` in the script, `COVER_LARGE` / `COVER_SMALL` in `Fleet`), reproducing the `object-fit: cover` framing: update both if a cover photo or the card size changes.
- Every `<img>` has `width` / `height`, `srcset` / `sizes`, `loading="lazy"` and `decoding="async"` (nothing above the fold is an image).

## Google Search Console verification

- `public/google9b82adfd484120a1.html` (served at `https://cdgtransfertvtc.fr/google9b82adfd484120a1.html`) verifies the site in Google Search Console. **Never delete, rename or modify it**, even if it looks unused: deleting it would remove the property's verification.
- Its exact content is a single line: `google-site-verification: google9b82adfd484120a1.html`. Vite copies it from `public/` without changes.
- It must be served with a 200 and no redirect: the `*.html` → clean URL redirect in `vercel.json` excludes it. Keep that exception (and do not switch back to `cleanUrls`). `npm test` checks the file and the exception.

## Security Headers (`vercel.json`)

Strict CSP without `'unsafe-inline'` / `'unsafe-eval'` (`script-src` loader hash + `'strict-dynamic'` (+ `'self'` fallback for old browsers), `style-src` = hash of the inlined CSS only, Trusted Types with the single `loader` policy, `connect-src` limited to `api.emailjs.com` and `api-adresse.data.gouv.fr`, `object-src 'none'`, `base-uri 'none'`, `form-action 'self'`, `frame-ancestors 'none'`, `upgrade-insecure-requests`; the JSON-LD `<script type="application/ld+json">` is data, not executed, so it needs no hash), HSTS `includeSubDomains; preload`, COOP `same-origin`, CORP `same-origin`, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, minimal `Permissions-Policy`, `X-Permitted-Cross-Domain-Policies: none`, 1-year immutable cache on `/assets/`. A new third-party service (script, API, font, image host) must be added to the CSP, then checked in a browser (no CSP violation in the console). No third-party script: if one is ever added, it needs Subresource Integrity.

- `public/.well-known/security.txt`: contact, `Expires` (renew every year — `npm test` fails once expired), languages.
- Secrets: none in the repository or in `dist/` (checked with gitleaks). Only the public EmailJS identifiers are allowed client-side (`src/config/emailjs.js`). `.env*` is git-ignored (`.env.example` documents that no variable is needed).
- Dependencies: exact versions in `package.json` (`.npmrc` `save-exact=true`), `package-lock.json` committed, Dependabot weekly (`.github/dependabot.yml`, npm + GitHub Actions). Remaining `npm audit` findings concern only the Vite dev server (fix = Vite major upgrade): never expose `npm run dev` outside localhost.
- External links with `target="_blank"` always have `rel="noopener noreferrer"` (checked by `npm test`).

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

Every page: Header (menu with « Blog »; full menu from 1280 px, burger below; language links → same page in the other language) → `<main>` → Footer (Navigation incl. « Blog », « Nos services » links, NAP block), plus a floating WhatsApp button. Booking links point to `#booking` when the page has the form, otherwise to the home page form (`hasBooking` in `src/routes.js`).

- Home (`/`, `/en`, `/ru`, `/ro`): Hero → Booking → Fleet → Services (8 cards: 7 service pages + « Autre trajet » on quote) → WhyUs → Reviews (« Votre avis compte ») → Rates → FAQ → Contact.
- Service pages (`/vtc-aeroport-cdg`, `/vtc-aeroport-orly`, `/vtc-aeroport-beauvais`, `/vtc-gares-paris`, `/vtc-disneyland-paris`, `/mise-a-disposition-chauffeur`, `/van-7-places-paris`, same slugs under `/en`, `/ru`, `/ro`): breadcrumb → H1 → intro + « Réserver » button (top) → sections (rates from `rateTable`, travel times, meeting point, what is included…) → vehicles → related services → FAQ → « Réserver » (bottom) → Booking form.

- Blog: `/blog` (list, 12 per page, `/blog/page/2`…, filter = links to non-empty categories) → `/blog/<category>` (unique 150–250-word intro, own title / description, paginated) → `/blog/<category>/<article>` (breadcrumb, single h1, published / updated dates, reading time, lead = direct answer, automatic table of contents, cover image, text with a « Réservez votre chauffeur » box in the middle and at the end, FAQ, 3 related articles of the same category, related service pages, booking form).

Fleet order (strict): **BUSINESS** — Mercedes Classe E (featured, gold border, « Recommandé », default category of the booking form; the owner drives it himself) → **Luxe** — Classe S → **Van** — Classe V → **Éco / Électrique** — Tesla (never « Model Y »).

Official capacities (`src/constants/vehicles.js`, label `luggageLabel()`): Classe E and Classe S 3 passengers, 2 large + 2 small suitcases max; Classe V 6 passengers (value to be confirmed by the client), 7 suitcases max; Tesla 4 passengers, 4 suitcases. Beyond: several vehicles, thanks to the network of vetted partner chauffeurs (`PARTNER_FLEET`: 4 Classe S, 4 Classe V, 3 Classe E, 7 Tesla).

## Code Map

```
src/
  routes.js            languages, page slugs, URL ↔ route, output file per route
  entry-server.jsx     build-time render + head / sitemap helpers (used by scripts/prerender.mjs)
  components/          Header, Hero, BookingModule (+ AddressAutocomplete), Fleet,
                       Gallery/Lightbox, WhyUs, Reviews, Rates, Contact, Footer,
                       ServicesSection, ServiceRates, Faq, Picture (+ CoverPicture), Logo
    Pages/             HomePage, ServicePage (one chunk each)
  content/
    conditions.js      official client conditions (waiting, cancellation, included,
                       child seats, partner fleet, hourly hire) — 4 languages
    ui.js              shared labels of the new pages (4 languages)
    home.js            home title / description / FAQ (4 languages)
    services/meta.js   per service: rates rows, vehicle columns, related pages, JSON-LD
                       areas + nav / title / description / card / serviceType (4 languages)
    services/pages/    full text of each service page (4 languages)
    services/index.js  meta + text merged (build, JSON-LD, tests)
  seo/
    head.js            <head> of a route (title, meta, canonical, hreflang, OG, Twitter, JSON-LD)
    schema.js          JSON-LD @graph: TaxiService+LocalBusiness, WebSite, WebPage,
                       Service + Offers (from rateTable), FAQPage, BreadcrumbList
    files.js           sitemap.xml, robots.txt, llms.txt
  constants/
    business.js        NAP single source: name, phone, e-mail, Google profile, hours, area
    translations.js    FR / EN / RU / RO texts (original sections)
    vehicles.js        real fleet + client photos
    rates.js           price table = single source of truth (+ derived priceEstimates,
                       hourly row « Mise à disposition » + HOURLY conditions)
    contact.js         phone / WhatsApp helpers (re-exported from business.js)
    vehiclePhotos.js   AVIF / WebP srcsets of the fleet photos
  content/blog/
    categories.js      the 10 categories (slug, name, lang, title, description, intro, services)
    blog.js            /blog title / intro, blog labels (FR / EN), date format
    link.js            « Blog » menu / footer link (4 languages)
    generated/         (git-ignored) generated by scripts/blog/generate.mjs
  blog/routes.js       blog routes (pagination), related posts, sitemap selection
  components/Blog/     BlogList, BlogArticle, parts (breadcrumb, card, CTA box, pagination)
  config/emailjs.js    EmailJS service, templates, public key
  hooks/               useTranslation, usePriceEstimate
  utils/               priceZone.js (trip → price zone), estimatePrice.js, bookingGuard.js (form validation / anti-spam)
content/blog/          <category>/<slug>.md articles + images.json (blog image manifest)
scripts/               prerender.mjs, app-loader.js, optimize-images.py, optimize-blog-images.py,
                       check-links.mjs, blog/generate.mjs
images-src/            original photos and logo (not deployed); blog/ = blog image originals
tests/                 priceZone.test.js, seo.test.js, blog.test.js, security.test.js, routing.test.js, bookingGuard.test.js,
                       rules.js (forbidden claims shared by the tests)
public/                og-image.jpg (1200×630), logo.png (512×512, JSON-LD logo), img/blog/ (hashed AVIF / WebP / JPEG, cached 1 year),
                       google9b82adfd484120a1.html (Search Console verification — never delete)
index.html             template: charset, viewport, favicon, robots + <!--app-head--> placeholder
```

## Booking Flow

- Form fields: name, e-mail, phone (required: the client is called back by phone / WhatsApp), date (not in the past), time, pickup, drop-off, « Siège enfant / rehausseur (nombre) » (0–4), vehicle (default: BUSINESS / Classe E).
- EmailJS template params (both templates): `client_name`, `client_email`, `client_phone`, `booking_date`, `booking_time`, `pickup`, `dropoff`, `vehicle`, `child_seats`, `price`. No recipient is sent by the code: the « To Email » of each template is set in the EmailJS dashboard (admin template = the business address; client template = `{{client_email}}`).
- Anti-spam / injection (`src/utils/bookingGuard.js`, tested in `tests/bookingGuard.test.js`): strict validation of every field (name letters only 2–80, e-mail ≤ 254, phone 9–15 digits ≤ 20 chars, date + time in the future and ≤ 18 months, addresses 3–200, seats 0–4, known vehicle), `maxLength` on inputs, hidden honeypot field `website` (filled → fake success, nothing sent), minimum 3 s between display and submit, max 3 requests per browser in 10 min (localStorage; beyond → call / WhatsApp), every EmailJS parameter cleaned to plain text (no control chars, `< > { }`, length-limited), EmailJS SDK `blockHeadless: true`. In the EmailJS templates use `{{var}}` (escaped), never `{{{var}}}`. Playwright tests must set `navigator.webdriver` to false (otherwise the SDK refuses to send).
- On submit, EmailJS sends 1) the notification to the business (`ADMIN_TEMPLATE_ID`, mandatory) and 2) a summary to the client (`CLIENT_TEMPLATE_ID`, best effort: its failure must not show an error).
- If the notification fails: fallback message with a `tel:` link and a WhatsApp link pre-filled with the request.
- Success message: « Demande de réservation envoyée ! Nous vous confirmons votre course rapidement par téléphone ou WhatsApp. » — it is a request, not a confirmed booking.
- Recipient addresses and template contents live in the EmailJS dashboard, not in the code.
- **Never send real booking e-mails while testing** without the owner's approval: intercept `api.emailjs.com` in the browser (e.g. Playwright `page.route`).

## Prices

- `src/constants/rates.js` → `rateTable` is the only place where prices are written; the booking estimate is derived from it.
- Hourly hire (« Mise à disposition, à l'heure », row `unit: 'hour'`, shown « 70 €/h »): Classe E 70 €, Classe V 80 €, Classe S 100 €, Tesla 55 € per hour; minimum 3 h; 20 km included per hour booked (5 h → 100 km), any category; beyond: on quote (`HOURLY`). It is also the rate of waiting beyond 1 h. Not computed by the trip form (no duration field).
- Zones (`src/utils/priceZone.js`): Paris ↔ Paris → Paris Centre-ville; Paris ↔ CDG / Orly → airport flat rate; Paris ↔ Beauvais → Beauvais / Paris; anything else → « Sur devis ». Never show a price for a trip that is not in the displayed table.
- Addresses are classified by postal code first (75001–75020, 75116 = Paris), then airport keywords. Add a test in `tests/priceZone.test.js` for every new case.

## Content & SEO Rules (production)

- Only true, verifiable content: no fake reviews, ratings, statistics or invented claims; no « démo / simulé / maquette » wording.
- Structured data is generated from the displayed sources (`src/seo/schema.js`) and must match them: `priceRange` = min – max of `rateTable`, offers = rows of the displayed rate table (hourly hire: `UnitPriceSpecification`, `unitCode` `HUR`, `eligibleQuantity` min 3), FAQPage = displayed FAQ text, `logo` = `public/logo.png`, article dates in full ISO 8601 with the Paris offset (`parisDateTime`, e.g. `2026-11-23T09:00:00+01:00`); no street address; never add `aggregateRating` / `review` markup (all checked by `npm test`).
- NAP (name « CDG TRANSFERT VTC », phone +33 6 65 69 96 78, area) comes only from `src/constants/business.js` and must stay identical to the Google Business Profile.
- Google review button: `https://g.page/r/CfqSDSmBkk6BEBM/review` (direct link, no third-party shortener).
- `hreflang`: `fr`, `en`, `ru`, `ro` + `x-default` (= French), reciprocal on every page; canonical = the page's own URL.
- Every page: unique `<title>` ≤ 60 characters and meta description ≤ 155 (checked by `npm test`); service pages ≥ 600 words per language.
- Service pages: prices only from `rateTable`, always with « tarif indicatif, confirmé avant la course »; trips outside the table (Disneyland, other towns, CDG ↔ Orly, extra mileage of hourly hire) are « sur devis ». Each service page shows the official conditions block (`src/content/conditions.js`).
- **Official client information (allowed, use these exact terms, 4 languages):**
  - Real-time tracking of arrivals (airports and stations): a flight or train delay is never charged, even 4 or 5 hours.
  - Waiting included up to 1 h after landing (or the train's arrival); beyond (baggage, formalities…), charged at the hourly rate of the vehicle category (hourly hire rates). Always write « 1 h » with « attente incluse ».
  - Cancellation free up to 24 h before pick-up; less than 24 h before, the ride is charged 100 %. Always write « 24 h » with « annulation gratuite ».
  - Tolls always included; water on board (« eau offerte » allowed); an invoice for every ride.
  - Child seats and boosters on request, for every vehicle (requested in the booking form).
  - Fleet: the owner drives a Mercedes Classe E; « réseau de chauffeurs partenaires vérifiés » with 4 Classe S, 4 Classe V, 3 Classe E and 7 Tesla → several vehicles possible for groups.
- **Still forbidden (not confirmed — checked by `npm test`, list in `tests/rules.js`):** « 30 minutes d'avance » (systematic early arrival), « véhicule(s) banalisé(s) », « Model Y » (write « Tesla »), unlimited or free waiting beyond 1 h, any other cancellation rule, any review / rating / invented statistic.
- The booking form has no flight / train number field: these details are given when the ride is confirmed by phone or WhatsApp.
- New service page: add the slug to `SERVICE_SLUGS` (`src/routes.js`), its metadata to `src/content/services/meta.js`, its text to `src/content/services/pages/<slug>.js` and `src/content/services/index.js`; sitemap, footer, home cards and JSON-LD follow automatically.
- The « Pourquoi nous choisir » arguments (`WhyUs`) and the highlights bar under the hero (`STATS` in `Hero`) contain only official client information (list above): change them only with the owner's approval.
- Every visible text exists in the 4 languages (FR / EN / RU / RO); `<html lang>` follows the displayed language.
- Accessibility: text contrast ≥ 4.5:1 (`silver-dim` = `#808086` is the darkest allowed grey on the dark backgrounds), single `<main>`, labelled `<nav>`s, native buttons/links (no clickable divs), valid ARIA (address fields use the combobox pattern).
- Target: Lighthouse 100 / 100 / 100 / 100 on mobile and desktop and Agentic Browsing 3/3 (with `llms.txt`), with no failing audit — including `/blog`, categories and articles.
- Vehicle photos are the client's own photos (`public/vehicles/`). Do not copy text or images from other VTC sites.

## Blog

- New article: `content/blog/<category>/<slug>.md` (slug = file name: lowercase, digits, hyphens). Frontmatter: `title` (≤ 60 characters), `description` (≤ 155), `date` / `updated` (`"AAAA-MM-JJ"`), `category` (= folder), `tags`, `image` (name in `content/blog/images.json`), `imageAlt`, `faq` (list of `question` / `answer`), `lang` (fr; en for `english-guides`). `readingTime` and the table of contents are computed.
- Text: 900–1,400 words, 3–5 FAQ questions, at least 2 links to service pages and 2 to other articles (all checked by `npm test`). Start with a lead paragraph (direct answer in the first 2 sentences, shown under the h1), then at least two `##` sections; no `#` (the h1 is the title). Quote frontmatter values that contain « : ». The « Réservez » box goes before the `##` closest to the middle. Internal links as `/vtc-aeroport-cdg`, `/#rates`…; prices only from the rate table with « tarif indicatif, confirmé avant la course ».
- New image: only the client's own photos (no stock images), alt text describing the photo honestly. Put the original in `images-src/blog/<name>.jpg` (framing point in `FOCUS` of the script if needed), run `python3 scripts/optimize-blog-images.py` (deterministic: existing images keep their URLs), commit `public/img/blog/` and `content/blog/images.json`. Images: AVIF + WebP, width / height, lazy except the first. The Classe S interior photos (bottles visible) may be used: water on board is confirmed.
- Publication date = the day the article is published, never backdated.
- Everything else follows automatically at build: list, category, pagination, sitemap (article + its category), RSS, llms.txt, JSON-LD (BlogPosting + BreadcrumbList + FAQPage, author / publisher = the business, no review / rating). `npm test` rejects invalid content (missing field, `#` heading, unknown image or category, bad date, forbidden claims, prices outside the table).
- A category without article is generated (intro + service links) but stays out of the sitemap and of the category filter until its first article.
- Blog pages are in one language (French; English for `english-guides`): hreflang = the page itself + x-default; the language links of the header go to the closest page (`langPath`).
- Code comments: short, in French, describing the production behaviour.
