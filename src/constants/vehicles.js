// ── Données véhicules ────────────────────────────────────────────────
// Flotte réelle du client. Ordre strict (voir CLAUDE.md) :
// BUSINESS > Luxe > Van > Éco
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
    luggage:  3,
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
      fr: 'Confort et élégance pour vos déplacements professionnels.',
      en: 'Comfort and elegance for your business travel.',
      ru: 'Комфорт и элегантность для деловых поездок.',
      ro: 'Confort și eleganță pentru deplasările dvs. profesionale.',
    },
  },
  {
    id:       'luxe',
    category: 'Luxe',
    model:    'Mercedes Classe S',
    seats:    3,
    luggage:  3,
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
    seats:    6,
    luggage:  6,
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
    model:    'Tesla Model Y',
    seats:    4,
    luggage:  3,
    gradient: 'from-gray-900 via-zinc-800 to-gray-900',
    // Une seule photo pour l'instant → pas de galerie sur cette carte
    images: [
      { name: 'tesla-model-y', alt: 'Tesla Model Y 100% électrique' },
    ],
    featured: false,
    description: {
      fr: 'Transfert écologique et moderne avec la Tesla Model Y 100% électrique.',
      en: 'Eco-friendly modern transfer with the fully electric Tesla Model Y.',
      ru: 'Экологичная поездка на полностью электрическом Tesla Model Y.',
      ro: 'Transfer modern și ecologic cu Tesla Model Y 100% electric.',
    },
  },
]
