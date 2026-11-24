// ── Balises <head> d'une route (pré-rendu) ───────────────────────────
// title / description uniques, robots, canonical, hreflang, Open Graph,
// Twitter Card, JSON-LD.
// Pages du site : hreflang réciproques (fr, en, ru, ro + x-default = fr).
// Blog : une seule langue par page (fr, ou en pour english-guides) →
// hreflang de la page elle-même + x-default ; og:type article pour les
// articles.
// ────────────────────────────────────────────────────────────────────
import { BUSINESS } from '../constants/business.js'
import { SITE, LANGS, pageUrl, routeUrl, isBlog, OG_LOCALE } from '../routes.js'
import { HOME } from '../content/home.js'
import { SERVICES } from '../content/services/index.js'
import { BLOG_HOME } from '../content/blog/blog.js'
import { CATEGORY } from '../content/blog/categories.js'
import { findPost } from '../blog/routes.js'
import { jsonLd, parisDateTime } from './schema.js'

const OG_ALT = {
  fr: 'CDG TRANSFERT VTC — chauffeur privé Paris · CDG · Orly, Mercedes Classe S sur le tarmac',
  en: 'CDG TRANSFERT VTC — private chauffeur Paris · CDG · Orly, Mercedes S-Class on the tarmac',
  ru: 'CDG TRANSFERT VTC — частный водитель Париж · CDG · Орли, Mercedes S-класса на перроне',
  ro: 'CDG TRANSFERT VTC — șofer privat Paris · CDG · Orly, Mercedes Clasa S pe pistă',
}
export const RSS_URL = `${SITE}/blog/rss.xml`

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// « Titre | CDG Transfert VTC » si le tout tient en 60 caractères
const BRAND = ' | CDG Transfert VTC'
export const withBrand = (title) => (title.length + BRAND.length <= 60 ? title + BRAND : title)

// title / description d'une route
export function pageMeta(route) {
  const { lang, page, num = 1 } = route
  if (page === 'home') return HOME[lang]
  if (!isBlog(route)) return SERVICES[page].i18n[lang]
  if (page === 'blog-article') {
    const post = findPost(route.category, route.slug)
    return { title: withBrand(post.title), description: post.description }
  }
  const base = page === 'blog' ? BLOG_HOME : CATEGORY[route.category]
  if (num === 1) return { title: withBrand(base.title), description: base.description }
  return {
    title: withBrand(`${base.title} – page ${num}`),
    description: `Page ${num} — ${base.description}`.slice(0, 155),
  }
}

export function headFor(route) {
  const { lang, page } = route
  const meta = pageMeta(route)
  const url = routeUrl(route)
  const blog = isBlog(route)
  const post = page === 'blog-article' ? findPost(route.category, route.slug) : null
  const image = post
    ? { url: SITE + post.image.og.url, width: post.image.og.width, height: post.image.og.height, alt: post.image.alt }
    : { url: `${SITE}/og-image.jpg`, width: 1200, height: 630, alt: OG_ALT[lang] }
  const alternates = blog
    ? [[lang, url], ['x-default', url]]
    : [...LANGS.map(l => [l, pageUrl(l, page)]), ['x-default', pageUrl('fr', page)]]

  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    ...alternates.map(([l, href]) => `<link rel="alternate" hreflang="${l}" href="${href}" />`),
    ...(blog ? [`<link rel="alternate" type="application/rss+xml" title="${esc(`${BUSINESS.name} — Blog`)}" href="${RSS_URL}" />`] : []),
    `<meta property="og:type" content="${post ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(BUSINESS.name)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    ...(blog ? [] : LANGS.filter(l => l !== lang).map(l => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`)),
    `<meta property="og:image" content="${image.url}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="${image.width}" />`,
    `<meta property="og:image:height" content="${image.height}" />`,
    `<meta property="og:image:alt" content="${esc(image.alt)}" />`,
    ...(post ? [
      `<meta property="article:published_time" content="${parisDateTime(post.date)}" />`,
      `<meta property="article:modified_time" content="${parisDateTime(post.updated)}" />`,
      `<meta property="article:section" content="${esc(CATEGORY[post.category].name)}" />`,
      ...post.tags.map(tag => `<meta property="article:tag" content="${esc(tag)}" />`),
    ] : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image.url}" />`,
    `<meta name="twitter:image:alt" content="${esc(image.alt)}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(route)).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.join('\n    ')
}
