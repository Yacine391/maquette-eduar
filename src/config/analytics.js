// ── Mesure d'audience : Vercel Web Analytics (sans cookie) ──────────────
// Désactivée tant que Web Analytics n'est pas activé dans le projet Vercel
// (Project → Analytics → Enable) : sinon /_vercel/insights/script.js répond
// 404 (erreur console, mesures perdues). Une fois activé : passer à true.
// Ce drapeau pilote aussi la section « Mesure d'audience » de la politique
// de confidentialité (src/content/legal/pages/confidentialite.js).
// Événements personnalisés (Réserver, Appeler, WhatsApp, Formulaire envoyé) :
// visibles dans le tableau de bord Vercel avec l'offre Pro ou Enterprise.
// ────────────────────────────────────────────────────────────────────
export const WEB_ANALYTICS = false
export const ANALYTICS_SCRIPT = '/_vercel/insights/script.js'
