// ── Tests de conversion : formulaire (vol / train, passagers, bagages),
// capacité des véhicules, hero, barre mobile, mesure d'audience sans cookie
// Lancer : npm test
// ────────────────────────────────────────────────────────────────────
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { checkBooking, cleanParams } from '../src/utils/bookingGuard.js'
import { capacityAdvice, luggageMax, vehicles } from '../src/constants/vehicles.js'
import { isTravelHub } from '../src/utils/priceZone.js'
import { eventForLink } from '../src/utils/analytics.js'
import { WEB_ANALYTICS } from '../src/config/analytics.js'
import { translations } from '../src/constants/translations.js'
import { LANGS } from '../src/routes.js'
import { LEGAL } from '../src/content/legal/index.js'

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const NOW = new Date('2026-11-24T10:00:00')
const OK = {
  name: 'Jean Dupont', email: '', phone: '+33 6 12 34 56 78', date: '2026-11-25', time: '08:30',
  pickup: 'Paris 75008', dropoff: 'Aéroport CDG Terminal 2', vehicleId: 'business', childSeats: '0',
  passengers: '2', luggage: '3', flightNumber: 'AF 1234',
}
const errs = (patch) => checkBooking({ ...OK, ...patch }, NOW)

test('formulaire : numéro de vol / train facultatif, passagers 1–8, bagages 0–10', () => {
  assert.deepEqual(errs({}), [])
  assert.deepEqual(errs({ flightNumber: '' }), [])
  assert.deepEqual(errs({ flightNumber: 'TGV 6201' }), [])
  assert.deepEqual(errs({ flightNumber: '<b>AF</b>' }), ['errFlight'])
  assert.deepEqual(errs({ flightNumber: 'A'.repeat(21) }), ['errFlight'])
  assert.deepEqual(errs({ passengers: '0' }), ['errInvalid'])
  assert.deepEqual(errs({ passengers: '9' }), ['errInvalid'])
  assert.deepEqual(errs({ luggage: '11' }), ['errInvalid'])
  const p = cleanParams({ flight_number: ' AF {1234}\n ', passengers: '22', luggage: '100' })
  assert.deepEqual(p, { flight_number: 'AF 1234', passengers: '2', luggage: '10' })
})

test('formulaire : champ vol / train proposé pour un aéroport ou une gare', () => {
  for (const a of ['Aéroport CDG Terminal 2E', 'Orly 4', 'Beauvais-Tillé', 'Gare du Nord, 75010 Paris', 'Gare de Lyon', 'Аэропорт Орли', 'Gara de Est'])
    assert.ok(isTravelHub(a), a)
  for (const a of ['12 rue de Rivoli, 75001 Paris', 'Disneyland Paris', 'Versailles'])
    assert.ok(!isTravelHub(a), a)
})

test('capacité : Classe V proposée, puis plusieurs véhicules au-delà de 6 / 6', () => {
  const by = Object.fromEntries(vehicles.map(v => [v.id, v]))
  assert.equal(luggageMax(by.business), 4); assert.equal(luggageMax(by.van), 6); assert.equal(luggageMax(by.eco), 4)
  assert.equal(capacityAdvice('business', 3, 4), null)
  assert.equal(capacityAdvice('business', 4, 2), 'van')
  assert.equal(capacityAdvice('luxe', 2, 5), 'van')
  assert.equal(capacityAdvice('eco', 5, 1), 'van')
  assert.equal(capacityAdvice('van', 6, 6), null)
  assert.equal(capacityAdvice('van', 7, 2), 'several')
  assert.equal(capacityAdvice('business', 8, 0), 'several')
  assert.equal(capacityAdvice('eco', 2, 7), 'several')
})

test('formulaire : nouveaux paramètres EmailJS, WhatsApp de secours et d’accélération, rassurance', () => {
  const form = read('src/components/BookingModule/index.jsx')
  for (const p of ['passengers:   form.passengers', 'luggage:      form.luggage', 'flight_number: flightValue'])
    assert.ok(form.includes(p), p)
  assert.match(form, /Passagers : .* Bagages :/)
  assert.match(form, /Vol \/ train :/)
  assert.match(form, /success: +\{ fr: 'Demande envoyée !'/)
  assert.match(form, /whatsappLink\(whatsappRequest\(lbl\('waIntro'\)\)\)/)
  assert.ok(form.includes("track('Formulaire envoyé'"))
  // Rassurance : informations officielles uniquement + lien Google direct
  for (const s of ['Classe E conduite par le responsable', '1 h d’attente incluse', 'Péages inclus', 'Annulation gratuite jusqu’à 24 h avant', 'Lire les avis Google', 'BUSINESS.googleProfile'])
    assert.ok(form.includes(s), s)
})

test('hero : titre concret dans un seul h1, sous-titre officiel, bouton « Réserver mon trajet »', () => {
  const hero = read('src/components/Hero/index.jsx')
  assert.equal(hero.match(/<h1/g).length, 1)
  assert.ok(hero.includes("t('hero_h1')"))
  for (const l of LANGS) {
    const t = translations[l]
    assert.match(t.hero_h1, /CDG/, l)
    assert.match(t.hero_sub, /1 (h|час)/, l)
    assert.ok(!t.hero_headline, `ancien titre (${l})`)
  }
  assert.equal(translations.fr.hero_h1, 'Votre chauffeur privé VTC pour CDG et Orly')
  assert.equal(translations.fr.hero_sub, 'Prix fixe annoncé avant la course · péages inclus · 1 h d’attente incluse · 24h/24')
  assert.equal(translations.fr.hero_cta, 'Réserver mon trajet')
})

test('mobile : barre Réserver / Appeler / WhatsApp, bouton flottant seulement à partir de 768 px', () => {
  const app = read('src/App.jsx')
  assert.match(app, /md:hidden fixed bottom-0/)
  assert.match(app, /translate-y-full/, 'masquée par transform (pas de CLS)')
  assert.match(app, /IntersectionObserver/)
  assert.match(app, /hidden md:flex items-center justify-center/, 'pas de doublon WhatsApp sur mobile')
})

test('mesure d’audience : sans cookie, événements, CSP et politique de confidentialité cohérentes', () => {
  assert.equal(eventForLink('#booking'), 'Réserver')
  assert.equal(eventForLink('/en#booking'), 'Réserver')
  assert.equal(eventForLink('tel:+33665699678'), 'Appeler')
  assert.equal(eventForLink('https://wa.me/33665699678?text=x'), 'WhatsApp')
  assert.equal(eventForLink('/blog'), null)
  const csp = JSON.parse(read('vercel.json')).headers.flatMap(h => h.headers).find(h => h.key === 'Content-Security-Policy').value
  assert.match(csp, /trusted-types loader analytics/)
  assert.match(csp, /connect-src 'self'/)
  const fr = JSON.stringify(LEGAL.confidentialite.body.i18n.fr)
  if (WEB_ANALYTICS) assert.ok(fr.includes('Vercel Web Analytics') && fr.includes('Mesure d’audience'))
  else assert.ok(!fr.includes('Vercel Web Analytics') && fr.includes('aucun outil de mesure d’audience'), 'politique = ce que fait le site')
  // Aucune bibliothèque d'analyse tierce ni cookie
  const pkg = JSON.parse(read('package.json'))
  assert.ok(!Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).some(d => /analytics|gtag|matomo|plausible/.test(d)))
  assert.doesNotMatch(read('src/utils/analytics.js'), /document\.cookie|localStorage/)
})

test('après un build : un seul h1 par page, barre mobile pré-rendue', { skip: !existsSync(new URL('../dist/index.html', import.meta.url)) && 'dist/ absent' }, () => {
  for (const f of ['index', 'en', 'ru', 'ro', 'vtc-aeroport-cdg', 'cgv', 'blog']) {
    const html = read(`dist/${f}.html`)
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, f)
    assert.ok(html.includes('md:hidden fixed bottom-0'), `${f} : barre mobile`)
  }
})
