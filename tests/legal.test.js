// ── Tests des pages légales (mentions légales, confidentialité, CGV) ──
// Lancer : npm test. Vérifie : 3 pages × 4 langues, contenu obligatoire
// (LCEN, RGPD, CGV confirmées par le client), aucun marqueur restant
// (pas de bandeau « projet »), aucune mention non confirmée, liens du pied de page et
// formulaire (mention d'information), aucun cookie ni script tiers.
// ────────────────────────────────────────────────────────────────────
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { LANGS, LEGAL_SLUGS, ROUTES, pageUrl } from '../src/routes.js'
import { LEGAL, hasTodo } from '../src/content/legal/index.js'
import { LEGAL_UI } from '../src/content/legal/meta.js'
import { BUSINESS, LEGAL_ENTITY } from '../src/constants/business.js'
import { rateTable } from '../src/constants/rates.js'
import { RATE } from '../src/utils/bookingGuard.js'
import { jsonLd } from '../src/seo/schema.js'
import { sitemapXml } from '../src/seo/files.js'
import { FORBIDDEN } from './rules.js'

const text = (slug, lang) => JSON.stringify(LEGAL[slug].body.i18n[lang])
const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')

test('pages légales : 3 pages × 4 langues, routes et sitemap', () => {
  assert.deepEqual(LEGAL_SLUGS, ['mentions-legales', 'confidentialite', 'cgv'])
  const sitemap = sitemapXml('2026-01-01')
  for (const slug of LEGAL_SLUGS) for (const lang of LANGS) {
    assert.ok(ROUTES.some(r => r.page === slug && r.lang === lang), `${slug} ${lang}`)
    assert.ok(sitemap.includes(`<loc>${pageUrl(lang, slug)}</loc>`), `sitemap ${slug} ${lang}`)
    const c = LEGAL[slug].body.i18n[lang]
    assert.ok(c.h1 && c.sections.length >= 5, `${slug} ${lang} : contenu`)
  }
  for (const lang of LANGS.filter(l => l !== 'fr')) assert.ok(LEGAL_UI[lang].authoritative, 'mention « le français fait foi »')
})

test('mentions légales : éditeur, hébergeur, registre VTC, directeur de la publication', () => {
  const t = text('mentions-legales', 'fr')
  for (const s of ['CDG TRANSFERT VTC', 'SASU', '1 000 €', 'RCS Paris 945 208 445', '945 208 445 00011', 'FR00945208445', '58 rue de Monceau, 75008 Paris',
    'Eduard CASIANOV', 'Vercel Inc.', '440 N Barranca Ave', 'https://vercel.com/contact', BUSINESS.phoneDisplay, BUSINESS.email,
    'Directeur de la publication', 'registre des exploitants', 'EVTC075250798', '4 août 2030', 'responsabilité civile professionnelle', 'protection juridique',
    'Propriété intellectuelle', 'Crédits']) assert.ok(t.includes(s), s)
  // Ligne « carte professionnelle » retirée à la demande du client
  for (const lang of LANGS) assert.doesNotMatch(text('mentions-legales', lang), /carte professionnelle|professional card|профессиональн\S* карт|card profesional/i, lang)
  for (const lang of LANGS) assert.ok(text('mentions-legales', lang).includes('EVTC075250798'), lang)
})

test('confidentialité : responsable, finalités, bases légales, durées, droits, CNIL, cookies', () => {
  const t = text('confidentialite', 'fr')
  for (const s of ['Responsable du traitement', '6.1.b', 'EmailJS', 'Vercel', 'API Adresse', 'Data Privacy Framework', 'clauses contractuelles types',
    '1 an', '3 ans', '10 ans', 'un mois', 'CNIL', 'rectification', 'portabilité', 'Cookies et traceurs', RATE.key, 'Décision automatisée'])
    assert.ok(t.includes(s), s)
})

test('CGV : règles confirmées par le client et tarifs du tableau', () => {
  const t = text('cgv', 'fr')
  const h = rateTable.find(r => r.unit === 'hour')
  for (const s of ['réservation préalable', 'péages sont toujours inclus', 'jamais facturé', 'jusqu’à 1 h', 'jusqu’à 24 h', '100 %', 'sièges auto et rehausseurs sont fournis sur demande', 'Durée minimale : 3 heures', '20 km',
    `${h.business} €`, `${h.luxe} €`, `${h.van} €`, `${h.eco} €`, 'facture', 'prix TTC est indiqué avant la course', 'modalités de paiement sont précisées lors de la confirmation', 'droit français']) assert.ok(t.includes(s), s)
  // Médiateur non encore désigné : aucune clause ni nom de médiateur pour l'instant
  for (const lang of LANGS) assert.doesNotMatch(text('cgv', lang), /médiat|mediat|медиатор/i, lang)
})

test('pages légales : plus aucun marqueur, donc pas de bandeau « Projet à valider »', () => {
  for (const slug of LEGAL_SLUGS) {
    assert.equal(hasTodo(LEGAL[slug].body), false, slug)
    for (const lang of LANGS) assert.doesNotMatch(text(slug, lang), /\[À (?:COMPLÉTER|VÉRIFIER)/, `${slug} ${lang}`)
  }
})

test('pages légales : aucune mention non confirmée, prix du tableau uniquement', () => {
  const prices = new Set(rateTable.flatMap(r => ['business', 'luxe', 'van', 'eco'].map(c => r[c])).filter(p => typeof p === 'number'))
  for (const slug of LEGAL_SLUGS) for (const lang of LANGS) {
    const t = text(slug, lang)
    for (const re of FORBIDDEN) assert.doesNotMatch(t, re, `${slug} ${lang} : ${re}`)
    // Le capital social n'est pas un prix
    for (const m of t.replaceAll(LEGAL_ENTITY.capital, '').matchAll(/(?:€\s?(\d+)|(\d+)\s?€)/g)) assert.ok(prices.has(Number(m[1] ?? m[2])), `${slug} ${lang} : prix ${m[0]}`)
  }
})

test('JSON-LD des pages légales : WebPage + fil d’Ariane, sans adresse de rue', () => {
  for (const slug of LEGAL_SLUGS) for (const lang of LANGS) {
    const graph = jsonLd({ lang, page: slug })['@graph']
    assert.ok(graph.some(n => n['@type'] === 'WebPage'))
    assert.ok(graph.some(n => n['@type'] === 'BreadcrumbList'))
    assert.doesNotMatch(JSON.stringify(graph), /streetAddress|Monceau/)
  }
})

test('formulaire : e-mail facultatif, mention d’information et lien vers la politique', () => {
  const form = read('src/components/BookingModule/index.jsx')
  assert.match(form, /Vos données servent uniquement à traiter votre demande de réservation\. En savoir plus :/)
  assert.match(form, /pagePath\(lang, 'confidentialite'\)/)
  assert.doesNotMatch(form, /id="email"[^>]*\brequired\b/, 'e-mail facultatif')
  assert.doesNotMatch(form, /type="checkbox"[^>]*checked|defaultChecked/, 'aucune case pré-cochée')
  assert.match(form, /const \{ client_phone, \.\.\.clientParams \} = templateParams/, 'récapitulatif client sans téléphone')
})

test('après un build : liens légaux dans le pied de page de toutes les pages, aucun traceur', { skip: !existsSync(new URL('../dist/index.html', import.meta.url)) && 'dist/ absent' }, () => {
  for (const r of ROUTES) {
    const file = r.page === 'home' ? (r.lang === 'fr' ? 'index' : r.lang) : `${r.lang === 'fr' ? '' : r.lang + '/'}${r.page}`
    const html = read(`dist/${file}.html`)
    for (const slug of LEGAL_SLUGS) assert.ok(html.includes(`href="${r.lang === 'fr' ? '' : '/' + r.lang}/${slug}"`), `${file} : lien ${slug}`)
    assert.doesNotMatch(html, /google-analytics|googletagmanager|gtag\(|fbq\(|fonts\.googleapis|maps\.google|<iframe/, `${file} : traceur ou ressource tierce`)
  }
  for (const f of ['blog', 'blog/transferts-cdg/valises-vtc-cdg']) assert.ok(read(`dist/${f}.html`).includes('href="/confidentialite"'), f)
})

test('JSON-LD : identité légale (legalName, vatID, taxID) sans adresse du siège', () => {
  const biz = jsonLd({ lang: 'fr', page: 'home' })['@graph'][0]
  assert.equal(biz.legalName, 'CDG TRANSFERT VTC')
  assert.equal(biz.vatID, 'FR00945208445')
  assert.equal(biz.taxID, '945208445')
  assert.doesNotMatch(JSON.stringify(biz), /Monceau|75008/)
})
