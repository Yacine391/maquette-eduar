// ── Détection de la zone tarifaire d'un trajet ───────────────────────
// Utilisé par l'estimation de prix du formulaire de réservation.
//
// Principe : chaque adresse (départ, arrivée) est classée séparément en
//   'paris' | 'cdg' | 'orly' | 'beauvais' | 'other'
// puis la paire donne la ligne de la grille des tarifs :
//   Paris ↔ Paris            → 'city'      (Paris Centre-ville)
//   Paris ↔ CDG / Orly       → 'cdg' / 'orly' (forfait aéroport)
//   Paris ↔ Beauvais         → 'beauvais'  (Beauvais / Paris)
//   tout autre trajet        → 'quote'     (Sur devis)
// On ne propose jamais un prix pour un trajet absent de la grille affichée.
//
// Ordre de priorité pour classer une adresse :
//   1. code postal parisien (75001–75020, 75116) → 'paris'
//      (prioritaire : « Place Charles de Gaulle 75008 Paris » est à Paris)
//   2. mots-clés aéroport (CDG / Roissy, Orly, Beauvais / Tillé)
//   3. code postal des aéroports (95700, 94390…)
//   4. autre code postal → 'other' (ex. Boulogne-Billancourt 92100)
//   5. sans code postal : le mot « Paris » → 'paris', sinon 'other'
// ────────────────────────────────────────────────────────────────────

const PARIS_POSTCODE = /\b75(?:0(?:0[1-9]|1\d|20)|116)\b/
const ANY_POSTCODE   = /\b\d{5}\b/

const AIRPORT_POSTCODES = {
  cdg:      ['95700', '95711'],            // Roissy-en-France / Roissy CDG
  orly:     ['94390', '94310', '91550'],   // Orly Aérogare / Orly / Paray-Vieille-Poste
  beauvais: ['60000', '60155'],            // Beauvais / Tillé (aéroport)
}

// Minuscules sans accents, pour comparer les mots-clés
const normalize = (s = '') =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function isCdg(t) {
  if (/\bcdg\b|roissy/.test(t)) return true
  // « Charles de Gaulle » seul est ambigu (place, avenues) : on exige
  // un contexte aéroport
  return /charles[\s-]*de[\s-]*gaulle/.test(t) && /aeroport|airport|terminal|aerogare/.test(t)
}

/** Classe une adresse saisie : 'paris' | 'cdg' | 'orly' | 'beauvais' | 'other' */
export function classifyPlace(address = '') {
  const t = normalize(address).trim()
  if (!t) return 'other'

  if (PARIS_POSTCODE.test(t)) return 'paris'

  if (isCdg(t))                         return 'cdg'
  if (/\borly\b/.test(t))               return 'orly'
  if (/beauvais|\btille\b/.test(t))     return 'beauvais'

  const cp = t.match(ANY_POSTCODE)?.[0]
  if (cp) {
    for (const [zone, codes] of Object.entries(AIRPORT_POSTCODES)) {
      if (codes.includes(cp)) return zone
    }
    return 'other'
  }

  // Sans code postal : « Paris », « Paris 8ème »… (sauf lieux hors Paris
  // qui portent le nom : Disneyland Paris, Paris La Défense)
  if (/disney|defense/.test(t)) return 'other'
  if (/\bparis\b/.test(t))      return 'paris'
  return 'other'
}

/** Zone tarifaire d'un trajet : 'city' | 'cdg' | 'orly' | 'beauvais' | 'quote' */
export function detectZone(pickup = '', dropoff = '') {
  const a = classifyPlace(pickup)
  const b = classifyPlace(dropoff)

  if (a === 'paris' && b === 'paris') return 'city'
  for (const airport of ['cdg', 'orly', 'beauvais']) {
    if ((a === 'paris' && b === airport) || (a === airport && b === 'paris')) return airport
  }
  return 'quote'
}
