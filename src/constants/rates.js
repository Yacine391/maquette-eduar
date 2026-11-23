// ── Tableau des tarifs ───────────────────────────────────────────────
// Tarifs réels du client, affichés dans la section Tarifs.
// SOURCE UNIQUE : l'estimation du formulaire (priceEstimates ci-dessous)
// est calculée à partir de ce tableau.
// Les pages services, le JSON-LD (offres, priceRange = min / max) et
// llms.txt sont aussi générés à partir de ce tableau. Si un prix change,
// vérifier les FAQ qui citent des prix (tests/seo.test.js les contrôle).
// ────────────────────────────────────────────────────────────────────

export const rateTable = [
  {
    key:  'airport',
    zone: { fr: 'CDG / Orly → Paris', en: 'CDG / Orly → Paris', ru: 'CDG / Орли → Париж', ro: 'CDG / Orly → Paris' },
    business: 99,
    luxe:     170,
    van:      130,
    eco:      65,
  },
  {
    key:  'city',
    zone: { fr: 'Paris Centre-ville', en: 'Paris City Centre', ru: 'Центр Парижа', ro: 'Centrul Parisului' },
    business: 65,
    luxe:     100,
    van:      80,
    eco:      50,
  },
  {
    key:  'beauvais',
    zone: { fr: 'Beauvais / Paris', en: 'Beauvais / Paris', ru: 'Бове / Париж', ro: 'Beauvais / Paris' },
    business: 200,
    luxe:     300,
    van:      250,
    eco:      150,
  },
  {
    key:  'long',
    zone: { fr: 'Longue distance (> 100 km)', en: 'Long distance (> 100 km)', ru: 'Дальние поездки (> 100 км)', ro: 'Distanță lungă (> 100 km)' },
    business: 'Sur devis',
    luxe:     'Sur devis',
    van:      'Sur devis',
    eco:      'Sur devis',
  },
]

// ── Table d'estimation des prix (BookingModule) ──────────────────────
// Calculée à partir de rateTable : vehicleId → zone → prix (€) ou 'Sur devis'.
// Zones : voir src/utils/priceZone.js (CDG et Orly = forfait aéroport unifié).
const row = (key) => rateTable.find(r => r.key === key)

export const priceEstimates = Object.fromEntries(
  ['business', 'luxe', 'van', 'eco'].map(v => [v, {
    cdg:      row('airport')[v],
    orly:     row('airport')[v],
    city:     row('city')[v],
    beauvais: row('beauvais')[v],
    quote:    'Sur devis',
  }])
)
