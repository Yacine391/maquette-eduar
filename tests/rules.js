// ── Règles de contenu partagées par les tests (pas un fichier de test) ──
// Mentions non confirmées par le client : interdites dans tous les textes
// (pages, FAQ, blog, toutes langues). Les conditions officielles (attente
// 1 h, annulation 24 h, péages, eau, facture, sièges enfants) sont, elles,
// autorisées : voir src/content/conditions.js et CLAUDE.md.
// ────────────────────────────────────────────────────────────────────
export const FORBIDDEN = [
  /minutes d.avance/i, /minutes early/i, /за 30 минут/i, /minute (în )?avans/i,   // « 30 minutes d'avance »
  /banalis/i, /unmarked/i, /без опознават/i, /nemarcat/i, /vehicule discrete/i,  // « véhicule banalisé »
  /Model Y/i,                                                                    // écrire « Tesla »
  /attente illimitée/i, /unlimited waiting/i,                                    // attente : 1 h incluse seulement
]
