// ── Données véhicules ────────────────────────────────────────────────
// Flotte réelle du client. Ordre strict (voir CLAUDE.md) :
// BUSINESS > Luxe > Van > Éco
//
// PHOTOS : ce sont les photos réelles de la flotte fournies par le client
// (fichiers dans /public/vehicles/). Chaque véhicule possède :
//   • `images` → tableau de photos { src, alt } affichées dans la galerie
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
      // `position` = recadrage de la vignette sur la carte (la voiture est
      // dans la moitié basse de la photo → on descend le cadrage)
      { src: '/vehicles/classe-e-1.jpg', alt: 'Mercedes Classe E noire devant l\'Arc de Triomphe, Paris', position: '50% 72%' },
      { src: '/vehicles/classe-e-2.jpg', alt: 'Mercedes Classe E devant l\'hôtel San Régis, Paris 8e' },
      { src: '/vehicles/classe-e-3.jpg', alt: 'Mercedes Classe E vue de profil, avenue Montaigne' },
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
      { src: '/vehicles/classe-s-1.jpg', alt: 'Mercedes Classe S sur le tarmac, portière ouverte' },
      { src: '/vehicles/classe-s-2.jpg', alt: 'Mercedes Classe S vue de face' },
      { src: '/vehicles/classe-s-3.jpg', alt: 'Intérieur Classe S : cuir clair et écrans passagers' },
      { src: '/vehicles/classe-s-4.jpg', alt: 'Intérieur Classe S : sièges arrière et rafraîchissements' },
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
      { src: '/vehicles/classe-v-1.jpg', alt: 'Mercedes Classe V noire vue de trois quarts avant' },
      { src: '/vehicles/classe-v-2.jpg', alt: 'Mercedes Classe V vue de trois quarts arrière' },
      { src: '/vehicles/classe-v-3.jpg', alt: 'Intérieur Classe V : sièges cuir beige face à face' },
      { src: '/vehicles/classe-v-4.jpg', alt: 'Intérieur Classe V : banquette arrière et accès latéral' },
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
      { src: '/vehicles/tesla-model-y.jpg', alt: 'Tesla Model Y 100% électrique' },
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
