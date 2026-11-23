// ── Tests SEO et contenu (pages pré-rendues, JSON-LD, fichiers d'indexation)
// Lancer : npm test
// Vérifie pour les 32 routes (8 pages × 4 langues) : title ≤ 60 et
// description ≤ 155 uniques, canonical et hreflang réciproques, JSON-LD
// conforme (NAP, zone, horaires, priceRange, offres = tableau des tarifs,
// aucun avis), pages services ≥ 600 mots, prix cités = prix du tableau,
// promesses non confirmées absentes, sitemap / robots.txt / llms.txt.
// ────────────────────────────────────────────────────────────────────
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ROUTES, LANGS, SERVICE_SLUGS, pageUrl } from '../src/routes.js'
import { BUSINESS, DEPARTMENTS } from '../src/constants/business.js'
import { rateTable } from '../src/constants/rates.js'
import { HOME } from '../src/content/home.js'
import { UI } from '../src/content/ui.js'
import { SERVICES } from '../src/content/services/index.js'
import { headFor, pageMeta } from '../src/seo/head.js'
import { jsonLd } from '../src/seo/schema.js'
import { sitemapXml, robotsTxt, llmsTxt, ALLOWED_BOTS } from '../src/seo/files.js'

const COLS = ['business', 'luxe', 'van', 'eco']
const TABLE_PRICES = new Set(rateTable.flatMap(r => COLS.map(c => r[c])).filter(p => typeof p === 'number'))

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
].join('\n')

test('title ≤ 60 caractères et description ≤ 155, uniques sur les 32 pages', () => {
  assert.equal(ROUTES.length, 32)
  const titles = new Set(), descs = new Set()
  for (const route of ROUTES) {
    const { title, description } = pageMeta(route)
    const where = `${route.lang} ${route.page}`
    assert.ok(title.length <= 60, `title trop long (${title.length}) : ${where}`)
    assert.ok(description.length <= 155, `description trop longue (${description.length}) : ${where}`)
    titles.add(title); descs.add(description)
  }
  assert.equal(titles.size, 32, 'titles en double')
  assert.equal(descs.size, 32, 'descriptions en double')
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
  // Disneyland et mise à disposition : sur devis, aucun montant
  for (const slug of ['vtc-disneyland-paris', 'mise-a-disposition-chauffeur']) for (const l of LANGS) {
    const c = SERVICES[slug].i18n[l]
    assert.doesNotMatch(serviceText(c) + c.description, /\d+\s?€|€\s?\d+/, `${slug} (${l}) affiche un prix`)
  }
})

test('aucune promesse en attente de confirmation du client', () => {
  const forbidden = [
    /attente/i, /péage/i, /minutes d.avance/i, /eau offerte/i, /banalis/i,           // FR
    /waiting/i, /\btolls?\b/i, /\bwater\b/i, /unmarked/i,                           // EN
    /ожидани/i, /платн\S* дорог/i, /\bвод[аы]\b/i, /без опознават/i,                          // RU
    /așteptare/i, /taxe de (drum|autostradă)/i, /\bapă\b/i, /nemarcat/i,            // RO
  ]
  for (const re of forbidden) {
    const m = ALL_TEXT.match(re)
    assert.equal(m, null, `mention interdite ${re} : « ${m && ALL_TEXT.slice(Math.max(0, m.index - 40), m.index + 40)} »`)
  }
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
    assert.deepEqual(biz.sameAs, ['https://g.page/r/CfqSDSmBkk6BEBM'])
    const areas = biz.areaServed.map(a => a.name)
    for (const d of DEPARTMENTS) assert.ok(areas.includes(d), `zone ${d}`)
    assert.ok(areas.includes('Beauvais'))
    assert.deepEqual(biz.areaServed.filter(a => a['@type'] === 'Airport').map(a => a.iataCode), ['CDG', 'ORY', 'BVA'])
    assert.ok(graph.some(n => n['@type'] === 'FAQPage'))
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
})

test('sitemap.xml, robots.txt et llms.txt', () => {
  const sitemap = sitemapXml('2026-01-01')
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, 32)
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
})
