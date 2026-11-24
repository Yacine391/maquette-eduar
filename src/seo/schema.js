// ── Données structurées JSON-LD (schema.org) ─────────────────────────
// Construites à partir des sources uniques : identité (business.js), tarifs
// (rates.js), véhicules (vehicles.js) et contenus (content/). Aucune donnée
// d'avis (Review / AggregateRating) : le site n'affiche pas d'avis.
// Le texte des FAQ est strictement identique au texte affiché.
// Blog : Blog + CollectionPage (listes), BlogPosting (auteur et éditeur =
// l'entreprise, dates ISO 8601 avec fuseau de Paris), BreadcrumbList,
// FAQPage si l'article a une FAQ.
// Logo de l'entreprise : public/logo.png (ImageObject). Mise à disposition :
// offres à l'heure (UnitPriceSpecification, unitCode HUR, minimum 3 h).
// ────────────────────────────────────────────────────────────────────
import { BUSINESS, DEPARTMENTS, AIRPORTS } from '../constants/business.js'
import { rateTable, HOURLY } from '../constants/rates.js'
import { vehicles } from '../constants/vehicles.js'
import { SITE, LANGS, pageUrl, routeUrl, isBlog } from '../routes.js'
import { BLOG_HOME, BLOG_UI } from '../content/blog/blog.js'
import { CATEGORY } from '../content/blog/categories.js'
import { findPost } from '../blog/routes.js'
import { ARTICLES } from '../content/blog/generated/articles.js'
import { HOME } from '../content/home.js'
import { UI } from '../content/ui.js'
import { SERVICES, SERVICE_LIST } from '../content/services/index.js'
import { LEGAL_META } from '../content/legal/meta.js'

const BUSINESS_ID = `${SITE}/#entreprise`
const WEBSITE_ID  = `${SITE}/#website`
const LOGO_ID     = `${SITE}/#logo`
const LOGO = { '@type': 'ImageObject', '@id': LOGO_ID, url: `${SITE}/logo.png`, contentUrl: `${SITE}/logo.png`, width: 512, height: 512, caption: BUSINESS.name }

// Date d'un article (AAAA-MM-JJ) → ISO 8601 complet à 9 h, heure de Paris
// (décalage +01:00 en hiver, +02:00 en été), ex. 2026-11-23T09:00:00+01:00
export function parisDateTime(date, time = '09:00') {
  const utc = new Date(`${date}T${time}:00Z`)
  const name = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Paris', timeZoneName: 'longOffset' })
    .formatToParts(utc).find(p => p.type === 'timeZoneName').value   // « GMT+01:00 »
  const offset = name === 'GMT' ? '+00:00' : name.slice(3)
  return `${date}T${time}:00${offset}`
}
const COLS = ['business', 'luxe', 'van', 'eco']

const DESCRIPTION = {
  fr: 'Chauffeur privé VTC à Paris et en Île-de-France : transferts aéroports CDG, Orly et Beauvais, gares, Disneyland Paris, mise à disposition. Disponible 24h/24, 7j/7.',
  en: 'Private VTC chauffeur in Paris and Île-de-France: CDG, Orly and Beauvais airport transfers, train stations, Disneyland Paris, chauffeur hire by the hour. Available 24/7.',
  ru: 'Частный водитель VTC в Париже и Иль-де-Франс: трансферы в аэропорты CDG, Орли и Бове, на вокзалы, в Диснейленд Париж, водитель на час. Круглосуточно.',
  ro: 'Șofer privat VTC în Paris și Île-de-France: transferuri la aeroporturile CDG, Orly și Beauvais, gări, Disneyland Paris, șofer la dispoziție. Disponibil 24/7.',
}

const LONG_DISTANCE = {
  fr: { name: 'Trajets longue distance (plus de 100 km)', description: 'Trajets de plus de 100 km au départ ou à destination de Paris, sur devis.' },
  en: { name: 'Long-distance trips (over 100 km)', description: 'Trips of more than 100 km from or to Paris, on quote.' },
  ru: { name: 'Дальние поездки (более 100 км)', description: 'Поездки более 100 км из Парижа или в Париж, по запросу.' },
  ro: { name: 'Curse pe distanțe lungi (peste 100 km)', description: 'Curse de peste 100 km din sau spre Paris, la cerere.' },
}

// Prix min / max du tableau → priceRange (ex. « 50 € – 300 € »)
export function priceRange() {
  const prices = rateTable.flatMap(r => COLS.map(c => r[c])).filter(p => typeof p === 'number')
  return `${Math.min(...prices)} € – ${Math.max(...prices)} €`
}

// Zones : 'Paris', 'IDF' (départements), 'Beauvais', 'CDG', 'ORY', 'BVA'
function area(codes) {
  const out = []
  for (const code of codes) {
    if (code === 'Paris') out.push({ '@type': 'City', name: 'Paris' })
    if (code === 'IDF') DEPARTMENTS.filter(d => d !== 'Paris').forEach(name => out.push({ '@type': 'AdministrativeArea', name }))
    if (code === 'Beauvais') out.push({ '@type': 'City', name: 'Beauvais' })
    const airport = AIRPORTS.find(a => a.iataCode === code)
    if (airport) out.push({ '@type': 'Airport', name: airport.name, iataCode: airport.iataCode })
  }
  return out
}
const FULL_AREA = ['Paris', 'IDF', 'Beauvais', 'CDG', 'ORY', 'BVA']

function businessNode(lang) {
  return {
    '@type': ['TaxiService', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: BUSINESS.name,
    url: BUSINESS.url,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    image: `${SITE}/og-image.jpg`,
    logo: LOGO,
    description: DESCRIPTION[lang],
    // Zone desservie sans adresse de rue (comme la fiche Google)
    address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressRegion: 'Île-de-France', addressCountry: 'FR' },
    areaServed: area(FULL_AREA),
    openingHours: BUSINESS.openingHours,
    priceRange: priceRange(),
    sameAs: [BUSINESS.googleProfile],
  }
}

function websiteNode() {
  return { '@type': 'WebSite', '@id': WEBSITE_ID, url: `${SITE}/`, name: BUSINESS.name, inLanguage: LANGS, publisher: { '@id': BUSINESS_ID } }
}

// Offres d'un service : une par ligne du tableau et par catégorie de véhicule.
// Ligne à l'heure : prix unitaire par heure (HUR), quantité minimale 3 h.
function offers(service, lang) {
  const url = pageUrl(lang, service.slug)
  const cols = service.vehicleCols ?? COLS
  return (service.rates ?? []).flatMap(key => {
    const row = rateTable.find(r => r.key === key)
    return cols.filter(c => typeof row[c] === 'number').map(c => {
      const v = vehicles.find(x => x.id === c)
      const offer = {
        '@type': 'Offer',
        name: `${row.zone[lang] ?? row.zone.fr} — ${v.model}`,
        price: String(row[c]),
        priceCurrency: 'EUR',
        description: UI[lang].ratesNote,
        url: `${url}#booking`,
      }
      if (row.unit === 'hour') {
        offer.priceSpecification = {
          '@type': 'UnitPriceSpecification', price: String(row[c]), priceCurrency: 'EUR',
          unitCode: 'HUR', unitText: { fr: 'heure', en: 'hour', ru: 'час', ro: 'oră' }[lang],
        }
        offer.eligibleQuantity = { '@type': 'QuantitativeValue', minValue: HOURLY.minHours, unitCode: 'HUR' }
      }
      return offer
    })
  })
}

function serviceNode(service, lang) {
  const c = service.i18n[lang]
  const url = pageUrl(lang, service.slug)
  const node = {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: c.serviceType,
    serviceType: c.serviceType,
    description: c.description,
    url,
    provider: { '@id': BUSINESS_ID },
    areaServed: area(service.areaServed ?? FULL_AREA),
  }
  const o = offers(service, lang)
  if (o.length) node.offers = o
  return node
}

function faqNode(url, faq) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }
}

function breadcrumbNode(lang, service) {
  const url = pageUrl(lang, service.slug)
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: UI[lang].home, item: pageUrl(lang, 'home') },
      { '@type': 'ListItem', position: 2, name: service.i18n[lang].nav, item: url },
    ],
  }
}

function webpageNode(lang, page, meta, withBreadcrumb) {
  const url = pageUrl(lang, page)
  const node = {
    '@type': 'WebPage', '@id': `${url}#webpage`, url, name: meta.title, description: meta.description,
    inLanguage: lang, isPartOf: { '@id': WEBSITE_ID }, about: { '@id': BUSINESS_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}/og-image.jpg`, width: 1200, height: 630 },
  }
  if (withBreadcrumb) node.breadcrumb = { '@id': `${url}#breadcrumb` }
  return node
}

// ── Blog ─────────────────────────────────────────────────────────────
const BLOG_ID = `${SITE}/blog#blog`
const crumbs = (url, items) => ({
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
})

function blogGraph(route) {
  const { lang, page } = route
  const ui = BLOG_UI[lang]
  const url = routeUrl(route)
  const home = [ui.home, pageUrl(lang, 'home')]
  const blogCrumb = [ui.blog, `${SITE}/blog`]
  const blogNode = {
    '@type': 'Blog', '@id': BLOG_ID, url: `${SITE}/blog`, name: `${BUSINESS.name} — Blog`,
    description: BLOG_HOME.description, inLanguage: 'fr', publisher: { '@id': BUSINESS_ID },
  }
  const page_ = (type, name, description, extra = {}) => ({
    '@type': type, '@id': `${url}#webpage`, url, name, description, inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID }, breadcrumb: { '@id': `${url}#breadcrumb` }, ...extra,
  })

  if (page === 'blog') {
    return [blogNode, page_('CollectionPage', BLOG_HOME.title, BLOG_HOME.description, { mainEntity: { '@id': BLOG_ID } }), crumbs(url, [home, blogCrumb])]
  }
  if (page === 'blog-category') {
    const cat = CATEGORY[route.category]
    return [blogNode, page_('CollectionPage', cat.title, cat.description, { isPartOf: { '@id': BLOG_ID } }),
      crumbs(url, [home, blogCrumb, [cat.name, `${SITE}/blog/${cat.slug}`]])]
  }
  const post = findPost(route.category, route.slug)
  const full = ARTICLES[`${route.category}/${route.slug}`]
  const cat = CATEGORY[post.category]
  const org = { '@id': BUSINESS_ID, name: BUSINESS.name, url: BUSINESS.url, logo: LOGO }
  const graph = [
    blogNode,
    page_('WebPage', post.title, post.description, { primaryImageOfPage: { '@id': `${url}#image` } }),
    {
      '@type': 'BlogPosting', '@id': `${url}#article`, mainEntityOfPage: { '@id': `${url}#webpage` },
      headline: post.title, description: post.description, url,
      image: { '@type': 'ImageObject', '@id': `${url}#image`, url: SITE + post.image.og.url, width: post.image.og.width, height: post.image.og.height, caption: post.image.alt },
      datePublished: parisDateTime(post.date), dateModified: parisDateTime(post.updated), inLanguage: post.lang,
      author: org, publisher: org, isPartOf: { '@id': BLOG_ID },
      articleSection: cat.name, keywords: post.tags.join(', '),
      wordCount: post.wordCount, timeRequired: `PT${post.readingTime}M`,
    },
    crumbs(url, [home, blogCrumb, [cat.name, `${SITE}/blog/${cat.slug}`], [post.title, url]]),
  ]
  if (full.faq.length) graph.push(faqNode(url, full.faq))
  return graph
}

// Graphe JSON-LD complet d'une route
export function jsonLd(route) {
  const { lang, page } = route
  const graph = [businessNode(lang), websiteNode()]
  if (isBlog(route)) return { '@context': 'https://schema.org', '@graph': [...graph, ...blogGraph(route)] }
  if (page === 'home') {
    const url = pageUrl(lang, 'home')
    graph.push(webpageNode(lang, 'home', HOME[lang], false))
    for (const s of SERVICE_LIST) graph.push(serviceNode(s, lang))
    graph.push({
      '@type': 'Service', '@id': `${url}#longue-distance`, name: LONG_DISTANCE[lang].name, serviceType: LONG_DISTANCE[lang].name,
      description: LONG_DISTANCE[lang].description, url: `${url}#rates`, provider: { '@id': BUSINESS_ID }, areaServed: area(FULL_AREA),
    })
    graph.push(faqNode(url, HOME[lang].faq))
  } else if (LEGAL_META[page]) {
    // Page légale : WebPage + fil d'Ariane (ni service, ni FAQ, ni adresse)
    const meta = LEGAL_META[page][lang]
    const url = pageUrl(lang, page)
    graph.push(webpageNode(lang, page, meta, true))
    graph.push({
      '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: UI[lang].home, item: pageUrl(lang, 'home') },
        { '@type': 'ListItem', position: 2, name: meta.nav, item: url },
      ],
    })
  } else {
    const s = SERVICES[page]
    graph.push(webpageNode(lang, page, s.i18n[lang], true))
    graph.push(serviceNode(s, lang))
    graph.push(breadcrumbNode(lang, s))
    graph.push(faqNode(pageUrl(lang, page), s.i18n[lang].faq))
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}
