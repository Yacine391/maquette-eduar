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
// Informations fournies par le client. Affichées sur les pages légales
// (obligation LCEN) ; l'adresse du siège n'est PAS reprise dans les données
// structurées ni dans le NAP (JSON-LD : legalName, vatID, taxID seulement).
export const LEGAL_ENTITY = {
  legalName: 'CDG TRANSFERT VTC',
  form:    { fr: 'société par actions simplifiée unipersonnelle (SASU)', en: 'single-shareholder simplified joint-stock company (SASU)', ru: 'упрощённое акционерное общество с единственным акционером (SASU)', ro: 'societate pe acțiuni simplificată cu asociat unic (SASU)' },
  capital: '1 000 €',
  siren:   '945 208 445',
  siret:   '945 208 445 00011',
  rcs:     'RCS Paris 945 208 445',
  vat:     'FR00945208445',
  address: '58 rue de Monceau, 75008 Paris, France',
  president: 'Eduard CASIANOV',
  // Registre des exploitants de voitures de transport avec chauffeur
  evtc:    'EVTC075250798',
  evtcValidUntil: '2030-08-04',
  host: {
    name:    'Vercel Inc.',
    address: '440 N Barranca Ave #4133, Covina, CA 91723, USA',
    site:    'https://vercel.com',
    contact: 'https://vercel.com/contact',   // formulaire de contact officiel (pas de téléphone public sourcé)
  },
}
