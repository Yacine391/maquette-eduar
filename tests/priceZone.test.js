// ── Tests de l'estimation de prix ────────────────────────────────────
// Lancer : npm test
// Vérifie la zone tarifaire et le prix estimé sur 10 adresses parisiennes,
// les 3 aéroports (CDG, Orly, Beauvais) et des trajets hors grille,
// puis que le priceRange des données structurées = min / max du tableau.
// ────────────────────────────────────────────────────────────────────
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { classifyPlace, detectZone } from '../src/utils/priceZone.js'
import { estimatePrice } from '../src/utils/estimatePrice.js'
import { rateTable } from '../src/constants/rates.js'
import { priceRange, jsonLd } from '../src/seo/schema.js'
import { ROUTES } from '../src/routes.js'

// 10 adresses parisiennes, dont les pièges de l'ancienne détection
// (« saint- », « boulogne », « vincennes », numéro ou code postal > 100,
// « Charles de Gaulle » qui n'est pas l'aéroport)
const PARIS = [
  '15 Rue Saint-Honoré 75001 Paris',
  '120 Rue de Rivoli 75001 Paris',
  'Avenue des Champs-Élysées 75008 Paris',
  'Place Charles de Gaulle 75008 Paris',
  '42 Boulevard Saint-Germain 75005 Paris',
  'Cours de Vincennes 75020 Paris',
  'Bois de Boulogne 75016 Paris',
  '12 Avenue Foch 75116 Paris',
  'Gare de Lyon, Place Louis-Armand 75012 Paris',
  'Paris 8ème',
]

const AIRPORTS = {
  cdg:      ['Aéroport Paris-Charles de Gaulle Terminal 2E 95700 Roissy-en-France', 'CDG Terminal 1'],
  orly:     ['Aéroport de Paris-Orly 94390 Orly', 'Orly Sud'],
  beauvais: ['Aéroport de Paris-Beauvais 60155 Tillé', 'Beauvais'],
}

// Prix attendus, recopiés du tableau des tarifs affiché sur le site
const EXPECTED = {
  business: { cdg: 99,  orly: 99,  beauvais: 200, city: 65 },
  luxe:     { cdg: 170, orly: 170, beauvais: 300, city: 100 },
  van:      { cdg: 130, orly: 130, beauvais: 250, city: 80 },
  eco:      { cdg: 65,  orly: 65,  beauvais: 150, city: 50 },
}

test('les 10 adresses parisiennes sont reconnues comme Paris', () => {
  for (const address of PARIS) assert.equal(classifyPlace(address), 'paris', address)
})

test('les 3 aéroports sont reconnus (avec ou sans code postal)', () => {
  for (const [zone, addresses] of Object.entries(AIRPORTS)) {
    for (const address of addresses) assert.equal(classifyPlace(address), zone, address)
  }
})

test('Paris ↔ aéroport : forfait du tableau, dans les deux sens et pour chaque véhicule', () => {
  for (const paris of PARIS) {
    for (const [zone, [airport]] of Object.entries(AIRPORTS)) {
      for (const [vehicle, prices] of Object.entries(EXPECTED)) {
        assert.equal(estimatePrice(vehicle, paris, airport), prices[zone], `${vehicle} ${paris} → ${airport}`)
        assert.equal(estimatePrice(vehicle, airport, paris), prices[zone], `${vehicle} ${airport} → ${paris}`)
      }
    }
  }
})

test('Paris ↔ Paris : tarif Paris Centre-ville', () => {
  for (let i = 0; i < PARIS.length; i++) {
    const a = PARIS[i], b = PARIS[(i + 1) % PARIS.length]
    for (const [vehicle, prices] of Object.entries(EXPECTED)) {
      assert.equal(estimatePrice(vehicle, a, b), prices.city, `${vehicle} ${a} → ${b}`)
    }
  }
})

test('cas qui se trompaient avant la correction', () => {
  // Avant : 200 € (tarif Beauvais) à cause de « Saint- »
  assert.equal(estimatePrice('business', '15 Rue Saint-Honoré 75001 Paris', 'Tour Eiffel 75007 Paris'), 65)
  // Avant : « Sur devis » à cause du numéro 120
  assert.equal(estimatePrice('business', '120 Rue de Rivoli 75001 Paris', 'Opéra 75009 Paris'), 65)
  // Avant : « Sur devis » à cause du code postal 75008
  assert.equal(estimatePrice('business', 'Avenue des Champs-Élysées 75008 Paris', 'Gare de Lyon 75012 Paris'), 65)
  // Avant : tarif CDG car « Charles de Gaulle » (place de l'Étoile)
  assert.equal(estimatePrice('business', 'Place Charles de Gaulle 75008 Paris', 'Opéra 75009 Paris'), 65)
  // Avant : 200 € (tarif Beauvais) pour Boulogne-Billancourt, absent de la grille
  assert.equal(estimatePrice('business', '3 Rue Jean Jaurès 92100 Boulogne-Billancourt', 'Paris 15e'), 'Sur devis')
})

test('trajets absents de la grille : « Sur devis »', () => {
  const quote = [
    ['3 Rue Jean Jaurès 92100 Boulogne-Billancourt', '15 Rue Saint-Honoré 75001 Paris'],
    ['Château de Versailles 78000 Versailles', AIRPORTS.cdg[0]],
    [AIRPORTS.cdg[0], AIRPORTS.orly[0]],
    ['Avenue Charles de Gaulle 92200 Neuilly-sur-Seine', AIRPORTS.orly[0]],
    ['Disneyland Paris', '15 Rue Saint-Honoré 75001 Paris'],
    ['Paris La Défense', AIRPORTS.cdg[1]],
    ['', AIRPORTS.cdg[0]],
  ]
  for (const [a, b] of quote) {
    assert.equal(detectZone(a, b), 'quote', `${a} → ${b}`)
    assert.equal(estimatePrice('business', a, b), 'Sur devis', `${a} → ${b}`)
  }
})

test('données structurées : priceRange = prix min / max du tableau affiché', () => {
  const prices = rateTable.flatMap(r => ['business', 'luxe', 'van', 'eco'].map(k => r[k]))
    .filter(p => typeof p === 'number')
  const expected = `${Math.min(...prices)} € – ${Math.max(...prices)} €`
  assert.equal(priceRange(), expected)
  assert.equal(expected, '50 € – 300 €')
  // Chaque page (toutes langues) porte le même priceRange dans son JSON-LD
  for (const route of ROUTES) {
    const business = jsonLd(route)['@graph'].find(n => n['@id'].endsWith('/#entreprise'))
    assert.equal(business.priceRange, expected, `${route.lang} ${route.page}`)
  }
})
