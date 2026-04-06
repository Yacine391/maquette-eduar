// ── Données véhicules — MAQUETTE ─────────────────────────────────────
// Noms / catégories inspirés de vtcparis-transfert.fr.
// Aucune image propriétaire : fond CSS gradient + emoji placeholder.
// Ordre strict imposé par CLAUDE.md : BUSINESS > Luxe > Van > Éco
// ────────────────────────────────────────────────────────────────────

export const vehicles = [
  {
    id:       'business',
    category: 'BUSINESS',
    model:    'Mercedes Classe E',
    seats:    3,
    luggage:  3,
    gradient: 'from-zinc-900 via-zinc-800 to-neutral-900',
    image:    '/vehicles/mercedes-classe-e.jpg',
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
    image:    '/vehicles/mercedes-classe-s.jpg',
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
    image:    'https://images.unsplash.com/photo-1765461734605-34657fa04db2?auto=format&fit=crop&w=800&q=80',
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
    image:    '/vehicles/tesla-model-y.jpg',
    featured: false,
    description: {
      fr: 'Transfert écologique et moderne avec la Tesla Model Y 100% électrique.',
      en: 'Eco-friendly modern transfer with the fully electric Tesla Model Y.',
      ru: 'Экологичная поездка на полностью электрическом Tesla Model Y.',
      ro: 'Transfer modern și ecologic cu Tesla Model Y 100% electric.',
    },
  },
]
