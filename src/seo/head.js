// ── Balises <head> d'une route (pré-rendu) ───────────────────────────
// title / description uniques, canonical, hreflang réciproques (fr, en, ru,
// ro + x-default = français), Open Graph, Twitter Card, JSON-LD.
// ────────────────────────────────────────────────────────────────────
import { BUSINESS } from '../constants/business.js'
import { SITE, LANGS, pageUrl, OG_LOCALE } from '../routes.js'
import { HOME } from '../content/home.js'
import { SERVICES } from '../content/services/index.js'
import { jsonLd } from './schema.js'

const OG_ALT = {
  fr: 'CDG TRANSFERT VTC — chauffeur privé Paris · CDG · Orly, Mercedes Classe S sur le tarmac',
  en: 'CDG TRANSFERT VTC — private chauffeur Paris · CDG · Orly, Mercedes S-Class on the tarmac',
  ru: 'CDG TRANSFERT VTC — частный водитель Париж · CDG · Орли, Mercedes S-класса на перроне',
  ro: 'CDG TRANSFERT VTC — șofer privat Paris · CDG · Orly, Mercedes Clasa S pe pistă',
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function pageMeta({ lang, page }) {
  return page === 'home' ? HOME[lang] : SERVICES[page].i18n[lang]
}

export function headFor(route) {
  const { lang, page } = route
  const meta = pageMeta(route)
  const url = pageUrl(lang, page)
  const image = `${SITE}/og-image.jpg`
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${pageUrl(l, page)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl('fr', page)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(BUSINESS.name)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    ...LANGS.filter(l => l !== lang).map(l => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`),
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(OG_ALT[lang])}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${esc(OG_ALT[lang])}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(route)).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.join('\n    ')
}
