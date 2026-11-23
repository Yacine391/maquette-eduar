// ── Fichiers d'indexation générés au build ───────────────────────────
// sitemap.xml (toutes les pages, toutes les langues, hreflang), robots.txt
// (moteurs + robots d'IA autorisés) et llms.txt (résumé pour les IA).
// Écrits dans dist/ par scripts/prerender.mjs.
// ────────────────────────────────────────────────────────────────────
import { BUSINESS, AREA, DEPARTMENTS } from '../constants/business.js'
import { rateTable } from '../constants/rates.js'
import { vehicles } from '../constants/vehicles.js'
import { SITE, LANGS, ROUTES, pageUrl, LANG_NAMES } from '../routes.js'
import { SERVICE_LIST } from '../content/services/index.js'

export function sitemapXml(lastmod) {
  const urls = ROUTES.map(({ lang, page }) => {
    const alternates = [
      ...LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${pageUrl(l, page)}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('fr', page)}"/>`,
    ].join('\n')
    return `  <url>\n    <loc>${pageUrl(lang, page)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
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
    return ['eco', 'business', 'van', 'luxe'].map(c => {
      const v = vehicles.find(x => x.id === c)
      return `${v.model} ${typeof r[c] === 'number' ? `${r[c]} €` : 'sur devis'}`
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
- Longue distance (plus de 100 km) : sur devis

## Véhicules

${vehicles.map(v => `- ${v.model} (${v.category}) : ${v.seats} passagers, ${v.luggage} bagages`).join('\n')}

## Pages

- [Accueil et réservation](${pageUrl('fr', 'home')})
${LANGS.filter(l => l !== 'fr').map(l => `- [${LANG_NAMES[l]}](${pageUrl(l, 'home')})`).join('\n')}
- [Plan du site](${SITE}/sitemap.xml)
`
}
