// ── Tableau des tarifs — MAQUETTE ────────────────────────────────────
// Prix FICTIFS, hardcodés pour la démo. Aucune valeur contractuelle.
// Structure inspirée de vtcparis-transfert.fr (sans copie directe).
// ────────────────────────────────────────────────────────────────────

export const rateTable = [
  {
    zone: { fr: 'CDG / Orly → Paris', en: 'CDG / Orly → Paris', ru: 'CDG / Орли → Париж', ro: 'CDG / Orly → Paris' },
    business: 79,
    luxe:     120,
    van:      110,
    eco:      55,
  },
  {
    zone: { fr: 'Paris Centre-ville', en: 'Paris City Centre', ru: 'Центр Парижа', ro: 'Centrul Parisului' },
    business: 45,
    luxe:     80,
    van:      70,
    eco:      35,
  },
  {
    zone: { fr: 'Versailles / Banlieue proche', en: 'Versailles / Near suburbs', ru: 'Версаль / Пригород', ro: 'Versailles / Suburbii apropiate' },
    business: 95,
    luxe:     150,
    van:      130,
    eco:      70,
  },
  {
    zone: { fr: 'Longue distance (> 100 km)', en: 'Long distance (> 100 km)', ru: 'Дальние поездки (> 100 км)', ro: 'Distanță lungă (> 100 km)' },
    business: 'Sur devis',
    luxe:     'Sur devis',
    van:      'Sur devis',
    eco:      'Sur devis',
  },
]

// ── Table de simulation prix (BookingModule) ─────────────────────────
// Lookup: vehicleId → zone → prix simulé (€)
export const priceSimulator = {
  business: { airport: 79,  city: 45,  suburb: 95,  long: 180 },
  luxe:     { airport: 120, city: 80,  suburb: 150, long: 280 },
  van:      { airport: 110, city: 70,  suburb: 130, long: 240 },
  eco:      { airport: 55,  city: 35,  suburb: 70,  long: 120 },
}
