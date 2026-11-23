// ── Blog : page d'accueil du blog et libellés ────────────────────────
// Le blog est en français (/blog), la catégorie english-guides en anglais.
// Libellés en FR et EN (seules langues des pages du blog) ; le lien
// « Blog » du menu et du pied de page existe dans les 4 langues.
// ────────────────────────────────────────────────────────────────────

export const POSTS_PER_PAGE = 12

// Lien « Blog » du menu / pied de page : src/content/blog/link.js
export { BLOG_LINK } from './link.js'

export const BLOG_HOME = {
  title: 'Blog VTC Paris : aéroports et conseils',
  description: 'Guides pratiques pour vos trajets en VTC à Paris : aéroports CDG, Orly et Beauvais, gares, Disneyland, voyages d’affaires, événements et conseils.',
  h1: 'Blog : trajets, aéroports et conseils à Paris',
  intro: 'Temps de trajet, repères dans les aéroports et les gares, idées de visites, déplacements professionnels : nos guides pratiques pour préparer vos trajets avec chauffeur à Paris et en Île-de-France.',
}

export const BLOG_UI = {
  fr: {
    blog: 'Blog', home: 'Accueil', allPosts: 'Tous les articles', categories: 'Catégories',
    published: 'Publié le', updated: 'Mis à jour le', minRead: (n) => `${n} min de lecture`,
    toc: 'Sommaire', faqTitle: 'Questions fréquentes', related: 'Articles liés',
    services: 'Nos services liés', readMore: 'Lire l’article', latest: 'Derniers articles',
    ctaTitle: 'Réservez votre chauffeur',
    ctaText: 'Aéroport, gare ou trajet dans Paris : obtenez une estimation en ligne, votre course est ensuite confirmée par téléphone ou WhatsApp.',
    ctaBook: 'Réserver en ligne', ctaCall: 'Appeler', ctaWhatsapp: 'WhatsApp',
    empty: 'Aucun article n’est encore publié dans cette catégorie. En attendant, découvrez nos services :',
    pagination: 'Pagination', prev: 'Page précédente', next: 'Page suivante', page: (n) => `Page ${n}`,
    rss: 'Flux RSS du blog', breadcrumb: 'Fil d’Ariane', tags: 'Mots-clés',
    months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  },
  en: {
    blog: 'Blog', home: 'Home', allPosts: 'All articles', categories: 'Categories',
    published: 'Published', updated: 'Updated', minRead: (n) => `${n} min read`,
    toc: 'Contents', faqTitle: 'Frequently asked questions', related: 'Related articles',
    services: 'Related services', readMore: 'Read the article', latest: 'Latest articles',
    ctaTitle: 'Book your chauffeur',
    ctaText: 'Airport, station or trip around Paris: get an online estimate, then your ride is confirmed by phone or WhatsApp.',
    ctaBook: 'Book online', ctaCall: 'Call', ctaWhatsapp: 'WhatsApp',
    empty: 'No article has been published in this category yet. In the meantime, see our services:',
    pagination: 'Pagination', prev: 'Previous page', next: 'Next page', page: (n) => `Page ${n}`,
    rss: 'Blog RSS feed', breadcrumb: 'Breadcrumb', tags: 'Tags',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  },
}

// « 2026-11-23 » → « 23 novembre 2026 » / « 23 November 2026 » (identique
// au build et dans le navigateur : pas d'Intl, pas d'écart à l'hydratation)
export function formatDate(iso, lang) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${BLOG_UI[lang].months[m - 1]} ${y}`
}
