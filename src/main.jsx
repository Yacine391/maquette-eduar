// ── Point d'entrée React ─────────────────────────────────────────────
// CDG TRANSFERT VTC — site en production (cdgtransfertvtc.fr)
// En production, chaque page HTML contient déjà son rendu pré-généré
// (scripts/prerender.mjs) et sa route (data-lang / data-page sur #root) :
// on l'hydrate. En développement (vite), la racine est vide : rendu client,
// route déduite de l'URL. Le code du type de page (accueil ou page service)
// et, sur une page service, son texte sont chargés avant l'hydratation.
// ────────────────────────────────────────────────────────────────────
import { StrictMode, startTransition } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { parsePath } from './routes'
// Polices auto-hébergées, variables (woff2, font-display: swap) : un seul
// fichier par famille et par style couvre toutes les graisses utilisées
import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/montserrat/wght.css'
import './index.css'

const root  = document.getElementById('root')
const { lang, page } = root.dataset
const route = lang && page ? { lang, page } : parsePath(location.pathname)
const pages = import.meta.glob('./content/services/pages/*.js')

async function start() {
  const load = pages[`./content/services/pages/${route.page}.js`]
  const [{ default: Page }, body] = await Promise.all([
    route.page === 'home' ? import('./components/Pages/HomePage') : import('./components/Pages/ServicePage'),
    load ? load().then(m => m.default) : undefined,
  ])
  const app  = <StrictMode><App route={route} Page={Page} body={body} /></StrictMode>
  // Hydratation en transition : React la découpe en tranches de ~5 ms et
  // rend la main au navigateur entre deux (pas de longue tâche au chargement)
  if (root.hasChildNodes()) startTransition(() => { hydrateRoot(root, app) })
  else createRoot(root).render(app)
}
start()
