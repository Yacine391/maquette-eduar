// ── Registre complet des pages services (métadonnées + texte) ─────────
// Utilisé au build (pré-rendu, <head>, JSON-LD, sitemap, llms.txt) et par
// les tests. Côté navigateur, seules les métadonnées (meta.js) sont chargées
// partout ; le texte d'une page (pages/<slug>.js) l'est sur sa page.
// L'ordre de SERVICE_SLUGS (src/routes.js) fixe l'ordre d'affichage.
// ────────────────────────────────────────────────────────────────────
import { SERVICE_SLUGS, LANGS } from '../../routes.js'
import { SERVICE_META } from './meta.js'
import cdg from './pages/vtc-aeroport-cdg.js'
import orly from './pages/vtc-aeroport-orly.js'
import beauvais from './pages/vtc-aeroport-beauvais.js'
import gares from './pages/vtc-gares-paris.js'
import disney from './pages/vtc-disneyland-paris.js'
import disposition from './pages/mise-a-disposition-chauffeur.js'
import van from './pages/van-7-places-paris.js'

export const SERVICE_BODIES = {
  'vtc-aeroport-cdg': cdg,
  'vtc-aeroport-orly': orly,
  'vtc-aeroport-beauvais': beauvais,
  'vtc-gares-paris': gares,
  'vtc-disneyland-paris': disney,
  'mise-a-disposition-chauffeur': disposition,
  'van-7-places-paris': van,
}

// Métadonnées + texte, langue par langue
export const mergeService = (meta, body) => ({
  ...meta,
  i18n: Object.fromEntries(LANGS.map(l => [l, { ...meta.i18n[l], ...body.i18n[l] }])),
})

export const SERVICES = Object.fromEntries(SERVICE_SLUGS.map(slug => [slug, mergeService(SERVICE_META[slug], SERVICE_BODIES[slug])]))
export const SERVICE_LIST = SERVICE_SLUGS.map(slug => SERVICES[slug])
