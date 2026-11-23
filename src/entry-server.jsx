// ── Rendu serveur (au build) ─────────────────────────────────────────
// CDG TRANSFERT VTC — utilisé uniquement par scripts/prerender.mjs pour
// écrire le HTML de chaque route (contenu, <head> SEO, JSON-LD visibles
// sans JavaScript). Le navigateur « hydrate » ensuite ce HTML.
// ────────────────────────────────────────────────────────────────────
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import HomePage from './components/Pages/HomePage'
import ServicePage from './components/Pages/ServicePage'
import { SERVICE_BODIES } from './content/services/index.js'

export function render(route) {
  const Page = route.page === 'home' ? HomePage : ServicePage
  const body = SERVICE_BODIES[route.page]
  return renderToString(<StrictMode><App route={route} Page={Page} body={body} /></StrictMode>)
}

export { headFor } from './seo/head.js'
export { sitemapXml, robotsTxt, llmsTxt } from './seo/files.js'
export { ROUTES, pageFile } from './routes.js'
