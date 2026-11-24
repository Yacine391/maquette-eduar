// ── Fichiers d'indexation générés au build ───────────────────────────
// sitemap.xml (toutes les pages, toutes les langues, hreflang, + blog :
// liste, catégories non vides, articles — mis à jour à chaque article),
// robots.txt (moteurs + robots d'IA autorisés), llms.txt (résumé pour les
// IA, avec les catégories et articles du blog) et blog/rss.xml.
// Écrits dans dist/ par scripts/prerender.mjs.
// ────────────────────────────────────────────────────────────────────
import { BUSINESS, AREA, DEPARTMENTS } from '../constants/business.js'
import { rateTable, HOURLY } from '../constants/rates.js'
import { vehicles, luggageLabel } from '../constants/vehicles.js'
import { CONDITIONS } from '../content/conditions.js'
import { parisDateTime } from './schema.js'
import { SITE, LANGS, ROUTES, pageUrl, routeUrl, LANG_NAMES } from '../routes.js'
import { SERVICE_LIST } from '../content/services/index.js'
import { BLOG_HOME } from '../content/blog/blog.js'
import { CATEGORIES } from '../content/blog/categories.js'
import { POSTS, BLOG_ROUTES, postsIn, findPost, inSitemap } from '../blog/routes.js'

const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const latest = (posts) => posts.map(p => p.updated).sort().at(-1)

// Pages du blog du sitemap (src/blog/routes.js) ; date = dernière mise à
// jour du contenu
export const blogSitemapRoutes = () => BLOG_ROUTES.filter(inSitemap)
function blogLastmod(route, fallback) {
  if (route.page === 'blog-article') return findPost(route.category, route.slug).updated
  return latest(route.page === 'blog' ? POSTS : postsIn(route.category)) ?? fallback
}

export function sitemapXml(lastmod) {
  const urls = ROUTES.map(({ lang, page }) => {
    const alternates = [
      ...LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${pageUrl(l, page)}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('fr', page)}"/>`,
    ].join('\n')
    return `  <url>\n    <loc>${pageUrl(lang, page)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`
  })
  const blog = blogSitemapRoutes().map(r => `  <url>\n    <loc>${routeUrl(r)}</loc>\n    <lastmod>${blogLastmod(r, lastmod)}</lastmod>\n  </url>`)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${[...urls, ...blog].join('\n')}\n</urlset>\n`
}

// Flux RSS 2.0 du blog (tous les articles, du plus récent au plus ancien)
export function rssXml() {
  const rfc822 = (d) => new Date(parisDateTime(d)).toUTCString()
  const items = POSTS.map(p => `    <item>
      <title>${xml(p.title)}</title>
      <link>${SITE}${p.url}</link>
      <guid isPermaLink="true">${SITE}${p.url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${xml(p.description)}</description>
      <category>${xml(CATEGORIES.find(c => c.slug === p.category).name)}</category>
    </item>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(`${BUSINESS.name} — Blog`)}</title>
    <link>${SITE}/blog</link>
    <description>${xml(BLOG_HOME.description)}</description>
    <language>fr-FR</language>
${POSTS.length ? `    <lastBuildDate>${rfc822(latest(POSTS))}</lastBuildDate>\n` : ''}    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`
}

// Robots explicitement autorisés : moteurs de recherche et robots d'IA
export const ALLOWED_BOTS = ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended']

export function robotsTxt() {
  const groups = ['*', ...ALLOWED_BOTS].map(ua => `User-agent: ${ua}\nAllow: /`)
  return `# ${BUSINESS.name} — tout le site est ouvert aux moteurs de recherche et aux robots d'IA\n\n${groups.join('\n\n')}\n\nSitemap: ${SITE}/sitemap.xml\n`
}

export function llmsTxt() {
  const row = (key) => rateTable.find(r => r.key === key)
  const price = (key) => {
    const r = row(key)
    return ['business', 'luxe', 'van', 'eco'].map(c => {
      const v = vehicles.find(x => x.id === c)
      return `${v.model} ${typeof r[c] === 'number' ? `${r[c]} €${r.unit === 'hour' ? '/h' : ''}` : 'sur devis'}`
    }).join(', ')
  }
  return `# ${BUSINESS.name}

> Chauffeur privé VTC à Paris et en Île-de-France : transferts vers les aéroports Paris-Charles-de-Gaulle (CDG), Orly et Beauvais, les gares parisiennes et Disneyland Paris, mise à disposition avec chauffeur et van pour les groupes. Disponible 24 h/24, 7 j/7.

Réservation par le formulaire du site, par téléphone ou par WhatsApp ; chaque course est confirmée par téléphone ou WhatsApp. Les tarifs sont indicatifs et confirmés avant la course ; aucun paiement en ligne.

## Contact

- Nom : ${BUSINESS.name}
- Téléphone : ${BUSINESS.phoneDisplay} (${BUSINESS.phoneE164})
- WhatsApp : https://wa.me/${BUSINESS.whatsapp}
- E-mail : ${BUSINESS.email}
- Fiche Google : ${BUSINESS.googleProfile}
- Horaires : 24 h/24, 7 j/7
- Zone desservie : ${AREA.fr} (départements : ${DEPARTMENTS.join(', ')})

## Services

${SERVICE_LIST.map(s => `- [${s.i18n.fr.nav}](${pageUrl('fr', s.slug)}) : ${s.i18n.fr.card}`).join('\n')}
- Trajets de plus de 100 km : sur devis

## Tarifs indicatifs (confirmés avant la course)

- CDG ou Orly ↔ Paris : ${price('airport')}
- Paris (trajet dans Paris) : ${price('city')}
- Beauvais ↔ Paris : ${price('beauvais')}
- Mise à disposition, à l'heure : ${price('hourly')} (minimum ${HOURLY.minHours} h ; ${HOURLY.kmPerHour} km inclus par heure réservée, au-delà sur devis)
- Longue distance (plus de 100 km) : sur devis

## Conditions

- ${CONDITIONS.fr.tracking}
- ${CONDITIONS.fr.waiting}
- ${CONDITIONS.fr.cancel}
- ${CONDITIONS.fr.included}
- ${CONDITIONS.fr.childSeats}

## Véhicules

${vehicles.map(v => `- ${v.model} (${v.category}) : ${v.seats} passagers, ${luggageLabel(v, 'fr')}`).join('\n')}

${CONDITIONS.fr.fleet}

## Blog

- [Blog : trajets, aéroports et conseils](${SITE}/blog) (flux RSS : ${SITE}/blog/rss.xml)
${CATEGORIES.map(c => `
### [${c.name}](${SITE}/blog/${c.slug})

${c.description}${postsIn(c.slug).length ? '\n\n' + postsIn(c.slug).map(p => `- [${p.title}](${SITE}${p.url}) : ${p.description}`).join('\n') : ''}`).join('\n')}

## Pages

- [Accueil et réservation](${pageUrl('fr', 'home')})
${LANGS.filter(l => l !== 'fr').map(l => `- [${LANG_NAMES[l]}](${pageUrl(l, 'home')})`).join('\n')}
- [Plan du site](${SITE}/sitemap.xml)
`
}
