// ── Pages et langues du site ─────────────────────────────────────────
// Chaque page existe en 4 langues, chacune avec sa propre URL pré-rendue :
//   français à la racine (/, /vtc-aeroport-cdg…), puis /en/…, /ru/…, /ro/…
// scripts/prerender.mjs écrit un fichier HTML par route ; Vercel les sert
// sans extension (redirects / rewrites de vercel.json).
// ────────────────────────────────────────────────────────────────────

export const SITE = 'https://cdgtransfertvtc.fr'
export const LANGS = ['fr', 'en', 'ru', 'ro']

// Pages services (même adresse dans chaque langue, sous le préfixe de langue)
export const SERVICE_SLUGS = [
  'vtc-aeroport-cdg',
  'vtc-aeroport-orly',
  'vtc-aeroport-beauvais',
  'vtc-gares-paris',
  'vtc-disneyland-paris',
  'mise-a-disposition-chauffeur',
  'van-7-places-paris',
]

// Pages légales (mentions légales, confidentialité, CGV) : même adresse
// dans chaque langue ; le texte français fait foi (src/content/legal/)
export const LEGAL_SLUGS = ['mentions-legales', 'confidentialite', 'cgv']
export const isLegal = (route) => LEGAL_SLUGS.includes(route.page)

export const PAGES = ['home', ...SERVICE_SLUGS, ...LEGAL_SLUGS]

// Toutes les routes à pré-rendre
export const ROUTES = LANGS.flatMap(lang => PAGES.map(page => ({ lang, page })))

// Chemin d'une page : ('fr','home') → '/', ('en','home') → '/en',
// ('fr','vtc-aeroport-cdg') → '/vtc-aeroport-cdg', ('en', …) → '/en/vtc-aeroport-cdg'
export function pagePath(lang, page) {
  const prefix = lang === 'fr' ? '' : `/${lang}`
  if (page === 'home') return prefix || '/'
  return `${prefix}/${page}`
}

export const pageUrl = (lang, page) => SITE + pagePath(lang, page)

// Fichier écrit dans dist/ pour une route (servi sans extension par Vercel)
export function pageFile(lang, page) {
  const p = pagePath(lang, page)
  return p === '/' ? 'index.html' : `${p.slice(1)}.html`
}

// ── Blog (/blog, /blog/<categorie>, /blog/<categorie>/<article>) ──────
// Routes : { lang, page: 'blog', num } (liste, page num), { page:
// 'blog-category', category, num }, { page: 'blog-article', category, slug }.
// La liste des routes du blog (selon les articles publiés) est dans
// src/blog/routes.js, chargé uniquement au build et sur les pages du blog.
export const isBlog = (route) => route.page.startsWith('blog')
const pageSuffix = (num) => (num > 1 ? `/page/${num}` : '')

// Chemin de n'importe quelle route
export function routePath(route) {
  const { lang, page, category, slug, num } = route
  if (page === 'blog') return `/blog${pageSuffix(num)}`
  if (page === 'blog-category') return `/blog/${category}${pageSuffix(num)}`
  if (page === 'blog-article') return `/blog/${category}/${slug}`
  return pagePath(lang, page)
}
export const routeUrl = (route) => SITE + routePath(route)
export const routeFile = (route) => {
  const p = routePath(route)
  return p === '/' ? 'index.html' : `${p.slice(1)}.html`
}

// Le formulaire de réservation (#booking) est présent sur l'accueil, les
// pages services et les articles ; ailleurs (listes du blog, pages légales),
// les liens « Réserver » mènent au formulaire de l'accueil
export const hasBooking = (route) => route.page !== 'blog' && route.page !== 'blog-category' && !isLegal(route)

// Lien de langue : même page dans l'autre langue ; sur le blog (français,
// guides anglais dans english-guides), page la plus proche de chaque langue
export function langPath(route, lang) {
  if (!isBlog(route)) return pagePath(lang, route.page)
  if (lang === 'fr') return '/blog'
  if (lang === 'en') return '/blog/english-guides'
  return pagePath(lang, 'home')
}

// Route d'un chemin d'URL (développement, et repli au chargement)
export function parsePath(pathname = '/') {
  const parts = pathname.replace(/\.html$/, '').split('/').filter(Boolean)
  if (parts[0] === 'blog') {
    const [, a, b, c] = parts
    if (!a) return { lang: 'fr', page: 'blog', num: 1 }
    if (a === 'page') return { lang: 'fr', page: 'blog', num: Number(b) || 1 }
    const lang = a === 'english-guides' ? 'en' : 'fr'
    if (!b || b === 'page') return { lang, page: 'blog-category', category: a, num: Number(c) || 1 }
    return { lang, page: 'blog-article', category: a, slug: b }
  }
  let lang = 'fr'
  if (LANGS.includes(parts[0]) && parts[0] !== 'fr') lang = parts.shift()
  const page = parts[0] && (SERVICE_SLUGS.includes(parts[0]) || LEGAL_SLUGS.includes(parts[0])) ? parts[0] : 'home'
  return { lang, page }
}

// Codes de langue / locale
export const OG_LOCALE = { fr: 'fr_FR', en: 'en_GB', ru: 'ru_RU', ro: 'ro_RO' }
export const LANG_NAMES = { fr: 'Français', en: 'English', ru: 'Русский', ro: 'Română' }
