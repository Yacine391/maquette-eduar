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
import BlogList from './components/Blog/BlogList'
import BlogArticle from './components/Blog/BlogArticle'
import { SERVICE_BODIES } from './content/services/index.js'
import { ARTICLES } from './content/blog/generated/articles.js'

function pageFor(route) {
  if (route.page === 'home') return [HomePage]
  if (route.page === 'blog' || route.page === 'blog-category') return [BlogList]
  if (route.page === 'blog-article') return [BlogArticle, ARTICLES[`${route.category}/${route.slug}`]]
  return [ServicePage, SERVICE_BODIES[route.page]]
}

export function render(route) {
  const [Page, body] = pageFor(route)
  return renderToString(<StrictMode><App route={route} Page={Page} body={body} /></StrictMode>)
}

export { headFor } from './seo/head.js'
export { sitemapXml, robotsTxt, llmsTxt, rssXml } from './seo/files.js'
export { ROUTES, routeFile } from './routes.js'
export { BLOG_ROUTES } from './blog/routes.js'
