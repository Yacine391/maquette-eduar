// ── Données véhicules ────────────────────────────────────────────────
// Flotte réelle du client. Ordre strict (voir CLAUDE.md) :
// BUSINESS > Luxe > Van > Éco. La Classe E (conduite par le responsable
// lui-même) est mise en avant et choisie par défaut dans le formulaire.
// Capacités officielles du client : `seats` (passagers) et `luggage`
// ({ large, small } = grandes / petites valises, ou { total } valises) ;
// libellé affiché : luggageLabel(vehicle, lang).
//
// PHOTOS : photos réelles de la flotte fournies par le client (originaux dans
// images-src/vehicles/, variantes AVIF/WebP générées par
// scripts/optimize-images.py). Chaque véhicule possède :
//   • `images` → tableau de photos { name, alt } affichées dans la galerie
//                plein écran (clic sur la photo → flèches gauche/droite)
//   • `image`  → photo de couverture affichée sur la carte = images[0]
// Pour changer la photo de couverture : remonter la photo voulue en
// première position du tableau `images`.
// ────────────────────────────────────────────────────────────────────

export const vehicles = [
  {
    id:       'business',
    category: 'BUSINESS',
    model:    'Mercedes Classe E',
    seats:    3,
    luggage:  { large: 2, small: 2 },
    gradient: 'from-zinc-900 via-zinc-800 to-neutral-900',
    // 3 photos client — couverture : la Classe E devant l'Arc de Triomphe
    images: [
      // Couverture recadrée au format de la carte, centrée sur la voiture
      // (point focal défini dans scripts/optimize-images.py → COVERS)
      { name: 'classe-e-1', alt: 'Mercedes Classe E noire devant l\'Arc de Triomphe, Paris' },
      { name: 'classe-e-2', alt: 'Mercedes Classe E devant l\'hôtel San Régis, Paris 8e' },
      { name: 'classe-e-3', alt: 'Mercedes Classe E vue de profil, avenue Montaigne' },
    ],
    featured: true,  // → bordure gold + badge "Recommandé"
    description: {
      fr: 'Notre véhicule de référence, conduit par le responsable de CDG TRANSFERT VTC lui-même : confort et élégance pour tous vos trajets.',
      en: 'Our flagship car, driven by the head of CDG TRANSFERT VTC himself: comfort and elegance for every trip.',
      ru: 'Наш основной автомобиль, за рулём — сам руководитель CDG TRANSFERT VTC: комфорт и элегантность в каждой поездке.',
      ro: 'Vehiculul nostru de referință, condus chiar de responsabilul CDG TRANSFERT VTC: confort și eleganță la fiecare cursă.',
    },
  },
  {
    id:       'luxe',
    category: 'Luxe',
    model:    'Mercedes Classe S',
    seats:    3,
    luggage:  { large: 2, small: 2 },
    gradient: 'from-stone-900 via-zinc-900 to-black',
    // 4 photos client — 2 extérieures + 2 intérieures (demande client)
    images: [
      { name: 'classe-s-1', alt: 'Mercedes Classe S sur le tarmac, portière ouverte' },
      { name: 'classe-s-2', alt: 'Mercedes Classe S vue de face' },
      { name: 'classe-s-3', alt: 'Intérieur Classe S : cuir clair et écrans passagers' },
      { name: 'classe-s-4', alt: 'Intérieur Classe S : sièges arrière et rafraîchissements' },
    ],
    featured: false,
    description: {
      fr: 'L\'excellence absolue. La berline de prestige par excellence.',
      en: 'Absolute excellence. The ultimate prestige sedan.',
      ru: 'Абсолютное превосходство. Престижный лимузин.',
      ro: 'Excelență absolută. Berlina de prestigiu prin excelență.',
    },
  },
  {
    id:       'van',
    category: 'Van',
    model:    'Mercedes Classe V',
    seats:    6,            // à confirmer par le client (7 places au total, chauffeur compris)
    luggage:  { total: 7 },
    gradient: 'from-neutral-900 via-stone-900 to-zinc-900',
    // 4 photos client — 2 extérieures + 2 intérieures (demande client)
    images: [
      { name: 'classe-v-1', alt: 'Mercedes Classe V noire vue de trois quarts avant' },
      { name: 'classe-v-2', alt: 'Mercedes Classe V vue de trois quarts arrière' },
      { name: 'classe-v-3', alt: 'Intérieur Classe V : sièges cuir beige face à face' },
      { name: 'classe-v-4', alt: 'Intérieur Classe V : banquette arrière et accès latéral' },
    ],
    featured: false,
    description: {
      fr: 'Idéal pour les groupes et les familles avec bagages.',
      en: 'Ideal for groups and families with luggage.',
      ru: 'Идеально для групп и семей с багажом.',
      ro: 'Ideal pentru grupuri și familii cu bagaje.',
    },
  },
  {
    id:       'eco',
    category: 'Éco / Électrique',
    model:    'Tesla',
    seats:    4,
    luggage:  { total: 4 },
    gradient: 'from-gray-900 via-zinc-800 to-gray-900',
    // Une seule photo pour l'instant → pas de galerie sur cette carte
    images: [
      { name: 'tesla', alt: 'Rangée de Tesla noires et blanches 100 % électriques, garées le long d’un trottoir' },
    ],
    featured: false,
    description: {
      fr: 'Transfert écologique et moderne en Tesla 100 % électrique.',
      en: 'Eco-friendly, modern transfer in a fully electric Tesla.',
      ru: 'Экологичная и современная поездка на полностью электрической Tesla.',
      ro: 'Transfer modern și ecologic cu Tesla 100 % electrică.',
    },
  },
]

// ── Capacité bagages : libellé par langue ─────────────────────────────
// { large: 2, small: 2 } → « 2 grandes valises + 2 petites » ; { total: 7 } → « 7 valises »
const SUITCASES = {
  fr: (n) => `${n} valise${n > 1 ? 's' : ''}`,
  en: (n) => `${n} suitcase${n > 1 ? 's' : ''}`,
  ru: (n) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'чемодан' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'чемодана' : 'чемоданов'}`,
  ro: (n) => `${n} ${n === 1 ? 'valiză' : 'valize'}`,
}
const LARGE_SMALL = {
  fr: (l, s) => `${l} grandes valises + ${s} petites`,
  en: (l, s) => `${l} large + ${s} small suitcases`,
  ru: (l, s) => `${l} больших + ${s} маленьких чемодана`,
  ro: (l, s) => `${l} valize mari + ${s} mici`,
}
export function luggageLabel(vehicle, lang = 'fr') {
  const { large, small, total } = vehicle.luggage
  return total ? SUITCASES[lang](total) : LARGE_SMALL[lang](large, small)
}

// ── Réseau de chauffeurs partenaires vérifiés (données du client) ─────
// Véhicules disponibles en plus de la Classe E du responsable : plusieurs
// véhicules peuvent être réservés ensemble pour un groupe.
export const PARTNER_FLEET = { luxe: 4, van: 4, business: 3, eco: 7 }
