// ── Registre des pages légales (métadonnées + texte) ──────────────────
// Utilisé au build (pré-rendu, <head>, JSON-LD) et par les tests. Côté
// navigateur, le texte d'une page (pages/<slug>.js) n'est chargé que sur
// cette page ; les libellés (meta.js) servent au pied de page.
// ────────────────────────────────────────────────────────────────────
import { LEGAL_SLUGS } from '../../routes.js'
import { LEGAL_META } from './meta.js'
import mentions from './pages/mentions-legales.js'
import confidentialite from './pages/confidentialite.js'
import cgv from './pages/cgv.js'

export const LEGAL_BODIES = { 'mentions-legales': mentions, confidentialite, cgv }

// Marqueurs d'informations à fournir ou à vérifier par le client
export const TODO_RE = /\[À (?:COMPLÉTER|VÉRIFIER)[^\]]*\]/g
export const hasTodo = (body) => /\[À (?:COMPLÉTER|VÉRIFIER)/.test(JSON.stringify(body))

export const LEGAL = Object.fromEntries(LEGAL_SLUGS.map(slug => [slug, { slug, meta: LEGAL_META[slug], body: LEGAL_BODIES[slug] }]))
