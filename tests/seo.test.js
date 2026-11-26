// ── Tests SEO et contenu (pages pré-rendues, JSON-LD, fichiers d'indexation)
// Lancer : npm test
// Vérifie pour les 32 routes (8 pages × 4 langues) : title ≤ 60 et
// description ≤ 155 uniques, canonical et hreflang réciproques, JSON-LD
// conforme (NAP, zone, horaires, priceRange, logo, offres = tableau des
// tarifs, mise à disposition à l'heure), pages services ≥ 600 mots, prix
// cités = prix du tableau, mentions non confirmées absentes (tests/rules.js),
// conditions officielles et capacités exactes, sitemap / robots / llms.txt.
// ────────────────────────────────────────────────────────────────────
import { test } from 'node:test'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { ROUTES, LANGS, SERVICE_SLUGS, LEGAL_SLUGS, pageUrl } from '../src/routes.js'
import { BUSINESS, DEPARTMENTS } from '../src/constants/business.js'
import { rateTable, HOURLY } from '../src/constants/rates.js'
import { vehicles, luggageLabel, PARTNER_FLEET } from '../src/constants/vehicles.js'
import { CONDITIONS } from '../src/content/conditions.js'
import { FORBIDDEN } from './rules.js'
import { HOME } from '../src/content/home.js'
import { UI } from '../src/content/ui.js'
import { SERVICES } from '../src/content/services/index.js'
import { headFor, pageMeta } from '../src/seo/head.js'
import { jsonLd } from '../src/seo/schema.js'
import { sitemapXml, robotsTxt, llmsTxt, ALLOWED_BOTS, blogSitemapRoutes } from '../src/seo/files.js'

const COLS = ['business', 'luxe', 'van', 'eco']
const TABLE_PRICES = new Set(rateTable.flatMap(r => COLS.map(c => r[c])).filter(p => typeof p === 'number'))
const HOURLY_ROW = rateTable.find(r => r.unit === 'hour')
const HOURLY_PRICES = new Set(COLS.map(c => HOURLY_ROW[c]))

// Sources du site (hors fichiers générés), commentaires retirés : tout texte
// affiché (composants Hero, WhyUs, Rates…, contenus, constantes)
const SOURCES = (function walk(dir) {
  return readdirSync(dir).flatMap(f => {
    const p = path.join(dir, f)
    if (statSync(p).isDirectory()) return f === 'generated' ? [] : walk(p)
    return /\.(js|jsx)$/.test(f) ? [p] : []
  })
})('src').map(f => ({ f, text: readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter(l => !/^\s*\/\//.test(l)).join('\n') }))

// Texte visible d'une page service dans une langue
const serviceText = (c) => [
  c.h1, ...c.intro,
  ...c.sections.flatMap(s => [s.h2, ...(s.paras ?? []), ...(s.list ?? []), ...(s.after ?? []), ...(s.times ?? []).flat()]),
  ...c.faq.flatMap(f => [f.q, f.a]),
].join(' ')
const words = (s) => s.split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length

// Tout le contenu rédigé (accueil, libellés, pages services), toutes langues
const ALL_TEXT = [
  ...LANGS.flatMap(l => [HOME[l].title, HOME[l].description, ...HOME[l].faq.flatMap(f => [f.q, f.a]), ...Object.values(UI[l])]),
  ...SERVICE_SLUGS.flatMap(slug => LANGS.flatMap(l => {
    const c = SERVICES[slug].i18n[l]
    return [c.nav, c.title, c.description, c.card, c.serviceType, serviceText(c)]
  })),
  ...LANGS.flatMap(l => Object.values(CONDITIONS[l])),
].join('\n')

test('title ≤ 60 caractères et description ≤ 155, uniques sur les 44 pages (dont 12 pages légales)', () => {
  assert.equal(ROUTES.length, 44)
  const titles = new Set(), descs = new Set()
  for (const route of ROUTES) {
    const { title, description } = pageMeta(route)
    const where = `${route.lang} ${route.page}`
    assert.ok(title.length <= 60, `title trop long (${title.length}) : ${where}`)
    assert.ok(description.length <= 155, `description trop longue (${description.length}) : ${where}`)
    titles.add(title); descs.add(description)
  }
  assert.equal(titles.size, ROUTES.length, 'titles en double')
  assert.equal(descs.size, ROUTES.length, 'descriptions en double')
})

test('canonical, hreflang réciproques (fr, en, ru, ro, x-default), Open Graph et Twitter', () => {
  for (const route of ROUTES) {
    const head = headFor(route)
    assert.ok(head.includes(`<link rel="canonical" href="${pageUrl(route.lang, route.page)}" />`))
    for (const l of LANGS) assert.ok(head.includes(`hreflang="${l}" href="${pageUrl(l, route.page)}"`), `hreflang ${l} : ${route.lang} ${route.page}`)
    assert.ok(head.includes(`hreflang="x-default" href="${pageUrl('fr', route.page)}"`))
    for (const tag of ['og:title', 'og:description', 'og:url', 'og:image', 'og:locale', 'twitter:card', 'twitter:image'])
      assert.ok(head.includes(tag), `${tag} manquant`)
    assert.ok(head.includes('https://cdgtransfertvtc.fr/og-image.jpg'))
  }
})

test('pages services : au moins 600 mots par langue, 6 questions de FAQ', () => {
  for (const slug of SERVICE_SLUGS) for (const l of LANGS) {
    const c = SERVICES[slug].i18n[l]
    const n = words(serviceText(c))
    assert.ok(n >= 600, `${slug} (${l}) : ${n} mots`)
    assert.ok(c.faq.length >= 6, `${slug} (${l}) : FAQ trop courte`)
  }
})

test('prix cités dans les textes = prix du tableau des tarifs (aucun prix inventé)', () => {
  const found = [...ALL_TEXT.matchAll(/(?:€\s?(\d+)|(\d+)\s?€)/g)].map(m => Number(m[1] ?? m[2]))
  assert.ok(found.length > 0)
  for (const p of found) assert.ok(TABLE_PRICES.has(p), `prix hors tableau : ${p} €`)
  // Disneyland : sur devis, aucun montant
  for (const l of LANGS) {
    const c = SERVICES['vtc-disneyland-paris'].i18n[l]
    assert.doesNotMatch(serviceText(c) + c.description, /\d+\s?€|€\s?\d+/, `vtc-disneyland-paris (${l}) affiche un prix`)
  }
  // Mise à disposition : uniquement les prix à l'heure du tableau
  for (const l of LANGS) {
    const c = SERVICES['mise-a-disposition-chauffeur'].i18n[l]
    for (const m of (serviceText(c) + c.description).matchAll(/(?:€\s?(\d+)|(\d+)\s?€)/g))
      assert.ok(HOURLY_PRICES.has(Number(m[1] ?? m[2])), `mise à disposition (${l}) : ${m[0]} n'est pas un tarif horaire`)
  }
})

test('aucune mention non confirmée par le client (30 min d’avance, banalisé, Model Y…)', () => {
  for (const re of FORBIDDEN) {
    const m = ALL_TEXT.match(re)
    assert.equal(m, null, `mention interdite ${re} : « ${m && ALL_TEXT.slice(Math.max(0, m.index - 40), m.index + 40)} »`)
    for (const { f, text } of SOURCES) assert.doesNotMatch(text, re, `${f} : mention interdite ${re}`)
  }
})

test('conditions officielles : attente 1 h, annulation 24 h, inclus, sièges enfants, flotte', () => {
  const one = { fr: /1 h/, en: /1 hour/, ru: /1 час/, ro: /1 or/ }
  for (const l of LANGS) {
    const c = CONDITIONS[l]
    assert.match(c.waiting, one[l], `attente 1 h (${l})`)
    assert.match(c.cancel, /24/, `annulation 24 h (${l})`)
    assert.match(c.cancel, /100/, `annulation tardive 100 % (${l})`)
    assert.match(c.tracking, /4/, `retard jamais facturé, même 4–5 h (${l})`)
    for (const n of Object.values(PARTNER_FLEET)) assert.ok(c.fleet.includes(String(n)), `flotte partenaire (${l})`)
    assert.match(c.hourly, new RegExp(String(HOURLY.minHours)), `minimum MAD (${l})`)
    assert.match(c.hourly, new RegExp(String(HOURLY.kmPerHour)), `km inclus MAD (${l})`)
  }
  // Partout : « attente incluse » → 1 h ; « annulation gratuite » → 24 h
  for (const m of ALL_TEXT.matchAll(/[^.;]*attente (?:est |est ensuite )?incluse[^.;]*/gi)) assert.match(m[0], /1 h/, m[0])
  for (const m of ALL_TEXT.matchAll(/[^.;]*annulation (?:est )?gratuite[^.;]*/gi)) assert.match(m[0], /24 h/, m[0])
  // FAQ de l'accueil : retard, annulation, inclus, mise à disposition
  for (const l of LANGS) assert.ok(HOME[l].faq.length >= 10, `FAQ accueil (${l})`)
  assert.deepEqual(HOURLY, { minHours: 3, kmPerHour: 20 })
  assert.deepEqual(COLS.map(c => HOURLY_ROW[c]), [70, 100, 80, 55])
})

test('flotte : capacités officielles, Classe E en tête et par défaut', () => {
  const byId = Object.fromEntries(vehicles.map(v => [v.id, v]))
  assert.deepEqual(vehicles.map(v => v.id), ['business', 'luxe', 'van', 'eco'])
  assert.ok(byId.business.featured && byId.business.model === 'Mercedes Classe E')
  for (const id of ['business', 'luxe']) { assert.equal(byId[id].seats, 3); assert.deepEqual(byId[id].luggage, { large: 2, small: 2 }) }
  assert.equal(byId.van.seats, 6); assert.deepEqual(byId.van.luggage, { total: 6 })
  assert.equal(byId.eco.model, 'Tesla'); assert.equal(byId.eco.seats, 4); assert.deepEqual(byId.eco.luggage, { total: 4 })
  assert.equal(luggageLabel(byId.business, 'fr'), '2 grandes valises + 2 petites')
  assert.equal(luggageLabel(byId.van, 'ru'), '6 чемоданов')
  assert.equal(luggageLabel(byId.eco, 'ru'), '4 чемодана')
  // Anciennes capacités absentes des textes (4 langues)
  assert.doesNotMatch(ALL_TEXT, /\b3 (bagages|bags|bagaje)\b|3 мест[а]? багажа|passagers et 3 bagages|4 passengers and 3/, 'ancienne capacité de bagages')
  // Classe V : 6 passagers et 6 bagages maximum (plus de « 7 places » ni « 7 valises »)
  assert.doesNotMatch(ALL_TEXT, /\b7 (valises|bagages|suitcases|bags|valize|bagaje|places|seats|locuri)\b|7 чемодан|7 мест|7-seater|van-7-places/, 'ancienne capacité du van')
  // Formulaire : Classe E par défaut, champ sièges enfant transmis à EmailJS
  const form = readFileSync('src/components/BookingModule/index.jsx', 'utf8')
  assert.match(form, /vehicleId: 'business'/)
  assert.match(form, /child_seats: +form\.childSeats/)
  assert.match(form, /id="childSeats"/)
})

test('NAP : nom, téléphone et zone identiques partout', () => {
  assert.equal(BUSINESS.name, 'CDG TRANSFERT VTC')
  assert.equal(BUSINESS.phoneE164, '+33665699678')
  // Un seul format de téléphone dans les textes
  const phones = [...ALL_TEXT.matchAll(/\+33[\d\s.]{9,14}\d/g)].map(m => m[0])
  for (const p of phones) assert.equal(p, BUSINESS.phoneDisplay)
  for (const route of ROUTES) {
    const biz = jsonLd(route)['@graph'][0]
    assert.equal(biz.name, BUSINESS.name)
    assert.equal(biz.telephone, BUSINESS.phoneE164)
    assert.equal(biz.url, 'https://cdgtransfertvtc.fr/')
  }
})

test('JSON-LD : TaxiService / LocalBusiness conforme, sans adresse de rue ni avis', () => {
  for (const route of ROUTES) {
    const graph = jsonLd(route)['@graph']
    const json = JSON.stringify(graph)
    assert.doesNotMatch(json, /"Review"|"AggregateRating"|aggregateRating|"review"|streetAddress|postalCode/)
    const biz = graph.find(n => n['@id'] === 'https://cdgtransfertvtc.fr/#entreprise')
    assert.deepEqual(biz['@type'], ['TaxiService', 'LocalBusiness'])
    assert.equal(biz.openingHours, 'Mo-Su 00:00-23:59')
    assert.equal(biz.priceRange, '50 € – 300 €')
    assert.equal(biz.logo['@type'], 'ImageObject')
    assert.equal(biz.logo.url, 'https://cdgtransfertvtc.fr/logo.png')
    assert.deepEqual(biz.sameAs, ['https://g.page/r/CfqSDSmBkk6BEBM'])
    const areas = biz.areaServed.map(a => a.name)
    for (const d of DEPARTMENTS) assert.ok(areas.includes(d), `zone ${d}`)
    assert.ok(areas.includes('Beauvais'))
    assert.deepEqual(biz.areaServed.filter(a => a['@type'] === 'Airport').map(a => a.iataCode), ['CDG', 'ORY', 'BVA'])
    if (!LEGAL_SLUGS.includes(route.page)) assert.ok(graph.some(n => n['@type'] === 'FAQPage'))
    if (route.page !== 'home') assert.ok(graph.some(n => n['@type'] === 'BreadcrumbList'), 'BreadcrumbList manquant')
  }
})

test('JSON-LD : offres des services = lignes du tableau affiché', () => {
  for (const slug of SERVICE_SLUGS) {
    const svc = SERVICES[slug]
    const node = jsonLd({ lang: 'fr', page: slug })['@graph'].find(n => n['@type'] === 'Service')
    const expected = (svc.rates ?? []).flatMap(key => {
      const row = rateTable.find(r => r.key === key)
      return (svc.vehicleCols ?? COLS).map(c => String(row[c]))
    })
    assert.deepEqual((node.offers ?? []).map(o => o.price), expected, slug)
    for (const o of node.offers ?? []) assert.equal(o.priceCurrency, 'EUR')
  }
  // Mise à disposition : une offre à l'heure par catégorie (HUR, minimum 3 h)
  const mad = jsonLd({ lang: 'fr', page: 'mise-a-disposition-chauffeur' })['@graph'].find(n => n['@type'] === 'Service')
  assert.equal(mad.offers.length, 4)
  for (const o of mad.offers) {
    assert.equal(o.priceSpecification['@type'], 'UnitPriceSpecification')
    assert.equal(o.priceSpecification.unitCode, 'HUR')
    assert.equal(o.priceSpecification.price, o.price)
    assert.equal(o.eligibleQuantity.minValue, 3)
  }
})

test('sitemap.xml, robots.txt et llms.txt', () => {
  const sitemap = sitemapXml('2026-01-01')
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, ROUTES.length + blogSitemapRoutes().length)
  for (const route of ROUTES) assert.ok(sitemap.includes(`<loc>${pageUrl(route.lang, route.page)}</loc>`))
  const robots = robotsTxt()
  for (const bot of ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended']) {
    assert.ok(ALLOWED_BOTS.includes(bot))
    assert.ok(robots.includes(`User-agent: ${bot}\nAllow: /`), bot)
  }
  assert.doesNotMatch(robots, /Disallow/)
  assert.ok(robots.includes('Sitemap: https://cdgtransfertvtc.fr/sitemap.xml'))
  const llms = llmsTxt()
  assert.ok(llms.startsWith(`# ${BUSINESS.name}`))
  assert.ok(llms.includes(BUSINESS.phoneDisplay))
  for (const slug of SERVICE_SLUGS) assert.ok(llms.includes(pageUrl('fr', slug)), slug)
  for (const k of ['tracking', 'waiting', 'cancel', 'included', 'childSeats', 'fleet']) assert.ok(llms.includes(CONDITIONS.fr[k]), `llms.txt : ${k}`)
  assert.ok(llms.includes('Mercedes Classe E 70 €/h'), 'llms.txt : tarifs à l’heure')
  assert.doesNotMatch(llms, /Model Y/)
})
