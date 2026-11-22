// ── Rendu serveur (au build) ─────────────────────────────────────────
// CDG TRANSFERT VTC — utilisé uniquement par scripts/prerender.mjs pour
// écrire le HTML de la page dans dist/index.html (contenu visible avant
// le chargement du JavaScript). Le navigateur « hydrate » ensuite ce HTML.
// ────────────────────────────────────────────────────────────────────
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export function render() {
  return renderToString(<StrictMode><App /></StrictMode>)
}
