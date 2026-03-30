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
    // Gradient placeholder — pas d'image copyrigthée
    gradient: 'from-zinc-900 via-zinc-800 to-neutral-900',
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
    seats:    7,
    luggage:  7,
    gradient: 'from-neutral-900 via-stone-900 to-zinc-900',
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
    category: 'Éco',
    model:    'Peugeot 508 / Skoda Octavia',
    seats:    3,
    luggage:  2,
    gradient: 'from-gray-900 via-zinc-800 to-gray-900',
    featured: false,
    description: {
      fr: 'Transfert soigné à tarif accessible.',
      en: 'Quality transfer at an affordable rate.',
      ru: 'Качественный трансфер по доступной цене.',
      ro: 'Transfer îngrijit la tarif accesibil.',
    },
  },
]
