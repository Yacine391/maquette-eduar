// ── Point d'entrée React ─────────────────────────────────────────────
// CDG TRANSFERT VTC — site en production (cdgtransfertvtc.fr)
// En production, chaque page HTML contient déjà son rendu pré-généré
// (scripts/prerender.mjs) et sa route (data-lang / data-page sur #root) :
// on l'hydrate. En développement (vite), la racine est vide : rendu client,
// route déduite de l'URL. Le code du type de page (accueil, page service,
// liste du blog, article) et le texte de la page (page service ou article)
// sont chargés avant l'hydratation.
// ────────────────────────────────────────────────────────────────────
import { StrictMode, startTransition } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { LEGAL_SLUGS } from './routes'
// Polices auto-hébergées, variables (woff2, font-display: swap) : un seul
// fichier par famille et par style couvre toutes les graisses utilisées
import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/montserrat/wght.css'
import './index.css'

const root  = document.getElementById('root')
const data  = root.dataset

// Route de la page : attributs data-* du HTML pré-rendu ; en développement
// (racine vide), déduite de l'URL
async function currentRoute() {
  if (data.lang && data.page) return { lang: data.lang, page: data.page, category: data.category, slug: data.slug, num: data.num ? Number(data.num) : undefined }
  const { parsePath } = await import('./routes')
  return parsePath(location.pathname)
}
const pages    = import.meta.glob('./content/services/pages/*.js')
const legal    = import.meta.glob('./content/legal/pages/*.js')
const articles = import.meta.glob('./content/blog/generated/articles/*.js')

function pageModule({ page }) {
  if (page === 'home') return import('./components/Pages/HomePage')
  if (page === 'blog' || page === 'blog-category') return import('./components/Blog/BlogList')
  if (page === 'blog-article') return import('./components/Blog/BlogArticle')
  if (LEGAL_SLUGS.includes(page)) return import('./components/Pages/LegalPage')
  return import('./components/Pages/ServicePage')
}

async function start() {
  const route = await currentRoute()
  const load = route.page === 'blog-article'
    ? articles[`./content/blog/generated/articles/${route.category}--${route.slug}.js`]
    : pages[`./content/services/pages/${route.page}.js`] ?? legal[`./content/legal/pages/${route.page}.js`]
  const [{ default: Page }, body] = await Promise.all([
    pageModule(route),
    load ? load().then(m => m.default) : undefined,
  ])
  const app  = <StrictMode><App route={route} Page={Page} body={body} /></StrictMode>
  // Hydratation en transition : React la découpe en tranches de ~5 ms et
  // rend la main au navigateur entre deux (pas de longue tâche au chargement)
  if (root.hasChildNodes()) startTransition(() => { hydrateRoot(root, app) })
  else createRoot(root).render(app)
}
start()
