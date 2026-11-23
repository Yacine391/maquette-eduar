// ── Pages et langues du site ─────────────────────────────────────────
// Chaque page existe en 4 langues, chacune avec sa propre URL pré-rendue :
//   français à la racine (/, /vtc-aeroport-cdg…), puis /en/…, /ru/…, /ro/…
// scripts/prerender.mjs écrit un fichier HTML par route ; Vercel les sert
// sans extension (cleanUrls dans vercel.json).
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

export const PAGES = ['home', ...SERVICE_SLUGS]

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

// Route d'un chemin d'URL (développement, et repli au chargement)
export function parsePath(pathname = '/') {
  const parts = pathname.replace(/\.html$/, '').split('/').filter(Boolean)
  let lang = 'fr'
  if (LANGS.includes(parts[0]) && parts[0] !== 'fr') lang = parts.shift()
  const page = parts[0] && SERVICE_SLUGS.includes(parts[0]) ? parts[0] : 'home'
  return { lang, page }
}

// Codes de langue / locale
export const OG_LOCALE = { fr: 'fr_FR', en: 'en_GB', ru: 'ru_RU', ro: 'ro_RO' }
export const LANG_NAMES = { fr: 'Français', en: 'English', ru: 'Русский', ro: 'Română' }
