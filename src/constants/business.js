// ── Identité de l'entreprise (NAP) — source unique ───────────────────
// Nom, téléphone et zone desservie STRICTEMENT identiques partout : pages,
// pied de page, contact, données structurées (JSON-LD), llms.txt.
// Ils doivent correspondre à la fiche Google (zone desservie, sans adresse
// de rue publique).
// ────────────────────────────────────────────────────────────────────

export const BUSINESS = {
  name:          'CDG TRANSFERT VTC',
  url:           'https://cdgtransfertvtc.fr/',
  phoneE164:     '+33665699678',
  phoneDisplay:  '+33 6 65 69 96 78',
  whatsapp:      '33665699678',
  email:         'cdgtransfertvtc@gmail.com',
  googleProfile: 'https://g.page/r/CfqSDSmBkk6BEBM',
  googleReview:  'https://g.page/r/CfqSDSmBkk6BEBM/review',
  openingHours:  'Mo-Su 00:00-23:59',
}

// Zone desservie : phrase affichée (identique sur toutes les pages d'une langue)
export const AREA = {
  fr: 'Paris, Île-de-France et Beauvais · aéroports CDG, Orly et Beauvais',
  en: 'Paris, Île-de-France and Beauvais · CDG, Orly and Beauvais airports',
  ru: 'Париж, Иль-де-Франс и Бове · аэропорты CDG, Орли и Бове',
  ro: 'Paris, Île-de-France și Beauvais · aeroporturile CDG, Orly și Beauvais',
}

// Départements d'Île-de-France desservis (noms officiels, toutes langues)
export const DEPARTMENTS = [
  'Paris', 'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne',
  "Val-d'Oise", 'Yvelines', 'Essonne', 'Seine-et-Marne',
]

// Aéroports desservis
export const AIRPORTS = [
  { name: 'Aéroport Paris-Charles de Gaulle (CDG)', iataCode: 'CDG' },
  { name: 'Aéroport Paris-Orly (ORY)',              iataCode: 'ORY' },
  { name: 'Aéroport Paris-Beauvais (BVA)',          iataCode: 'BVA' },
]

// ── Identité légale (pages Mentions légales, Confidentialité, CGV) ────
// Affichée uniquement sur les pages légales (obligation LCEN) : l'adresse
// du siège n'est PAS reprise dans les données structurées ni dans le NAP.
// Les informations manquantes sont marquées [À COMPLÉTER] dans les textes.
export const LEGAL_ENTITY = {
  form:    { fr: 'société par actions simplifiée (SAS)', en: 'simplified joint-stock company (SAS)', ru: 'упрощённое акционерное общество (SAS)', ro: 'societate pe acțiuni simplificată (SAS)' },
  siren:   '945 208 445',
  siret:   '945 208 445 00011',
  address: '58 rue de Monceau, 75008 Paris, France',
  host: {
    name:    'Vercel Inc.',
    address: '440 N Barranca Ave #4133, Covina, CA 91723, USA',
    site:    'https://vercel.com',
  },
}
