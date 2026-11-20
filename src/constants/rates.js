// ── Tableau des tarifs ───────────────────────────────────────────────
// Tarifs réels communiqués par le client (affichés dans la section Tarifs).
// ⚠️ Si un prix change : mettre à jour "priceRange" dans index.html
//    (min / max de ce tableau) pour que les données structurées restent exactes.
// ────────────────────────────────────────────────────────────────────

export const rateTable = [
  {
    zone: { fr: 'CDG / Orly → Paris', en: 'CDG / Orly → Paris', ru: 'CDG / Орли → Париж', ro: 'CDG / Orly → Paris' },
    business: 99,
    luxe:     170,
    van:      130,
    eco:      65,
  },
  {
    zone: { fr: 'Paris Centre-ville', en: 'Paris City Centre', ru: 'Центр Парижа', ro: 'Centrul Parisului' },
    business: 65,
    luxe:     100,
    van:      80,
    eco:      50,
  },
  {
    zone: { fr: 'Beauvais / Paris', en: 'Beauvais / Paris', ru: 'Бовэ / Париж', ro: 'Beauvais / Paris' },
    business: 200,
    luxe:     300,
    van:      250,
    eco:      150,
  },
  {
    zone: { fr: 'Longue distance (> 100 km)', en: 'Long distance (> 100 km)', ru: 'Дальние поездки (> 100 км)', ro: 'Distanță lungă (> 100 km)' },
    business: 'Sur devis',
    luxe:     'Sur devis',
    van:      'Sur devis',
    eco:      'Sur devis',
  },
]

// ── Table d'estimation des prix (BookingModule) ──────────────────────
// Lookup: vehicleId → zone → prix estimé (€)
// Tarifs alignés sur rateTable — CDG et Orly au même prix (forfait aéroport unifié).
// Beauvais (suburb) est la longue distance banlieue éloignée.
export const priceEstimates = {
  business: { cdg: 99,  orly: 99,  city: 65,  suburb: 200, long: 'Sur devis' },
  luxe:     { cdg: 170, orly: 170, city: 100, suburb: 300, long: 'Sur devis' },
  van:      { cdg: 130, orly: 130, city: 80,  suburb: 250, long: 'Sur devis' },
  eco:      { cdg: 65,  orly: 65,  city: 50,  suburb: 150, long: 'Sur devis' },
}
