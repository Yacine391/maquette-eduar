// ── Post-build : pages HTML pré-générées + chargement optimisé ───────
// CDG TRANSFERT VTC — lancé par `npm run build` après les 2 builds Vite :
//   1. vite build                → dist/ (client, gabarit dist/index.html)
//   2. vite build --ssr …        → dist-ssr/entry-server.js
//   3. node scripts/prerender.mjs (ce fichier)
// À partir du gabarit, il écrit une page HTML complète par route (accueil +
// 7 pages services, en FR à la racine et en /en, /ru, /ro — src/routes.js ;
// blog : liste, catégories, articles — src/blog/routes.js) :
//   • <html lang>, balises <head> SEO de la route (title, description,
//     canonical, hreflang, Open Graph, Twitter, JSON-LD — src/seo/head.js)
//   • HTML de la page (rendu React au build) dans <div id="root">, avec la
//     route en data-* (relue à l'hydratation, src/main.jsx)
//   • CSS intégré dans un <style> (aucune requête bloquante)
//   • préchargement des polices du haut de page, selon la langue (sous-
//     ensembles latin, latin-ext, cyrillic) et le type de page
//   • loader inline scripts/app-loader.js à la place du <script type="module">,
//     autorisé par son empreinte sha256 dans la CSP de vercel.json (vérifié
//     par tests/security.test.js) ; il crée le script module via la politique
//     Trusted Types « loader » (seuls /assets/*.js passent).
// Puis il génère sitemap.xml, robots.txt, llms.txt et blog/rss.xml
// (src/seo/files.js), et la page 404.html (sans JavaScript, noindex).
// CSP : le <style> intégré est autorisé par son empreinte sha256 dans
// style-src (vercel.json, sans 'unsafe-inline'). Si le CSS change, l'empreinte
// de vercel.json est mise à jour ici (à committer) ; sur Vercel (VERCEL=1),
// une empreinte périmée arrête le build plutôt que de publier un site sans styles.
// ────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, readdirSync, rmSync, mkdirSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { BUSINESS } from '../src/constants/business.js'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root    = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist    = path.join(root, 'dist')
const ssrDir  = path.join(root, 'dist-ssr')
const fail    = (msg) => { console.error(`prerender : ${msg}`); process.exit(1) }

const { render, headFor, ROUTES, BLOG_ROUTES, routeFile, sitemapXml, robotsTxt, llmsTxt, rssXml } =
  await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

let template = readFileSync(path.join(dist, 'index.html'), 'utf8')

// 1. CSS intégré (commun à toutes les pages)
const cssTag = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
if (!cssTag) fail('feuille CSS introuvable')
const cssFile = path.join(dist, cssTag[1])
let css = readFileSync(cssFile, 'utf8')
// Polices : woff2 uniquement (tous les navigateurs actuels), sans les
// sous-ensembles inutilisés par les 4 langues du site (vietnamien,
// cyrillique étendu). Le russe utilise « cyrillic », le roumain « latin-ext ».
css = css
  .replace(/,\s*url\([^)]+\.woff\)\s*format\(["']woff["']\)/g, '')
  .replace(/@font-face\{[^}]*-(?:vietnamese|cyrillic-ext)-[^}]*\}/g, '')
template = template.replace(cssTag[0], () => `<style>${css}</style>`)
rmSync(cssFile)

// Empreinte du CSS intégré → style-src de la CSP (vercel.json)
const cssHash = `'sha256-${createHash('sha256').update(css).digest('base64')}'`
const vercelFile = path.join(root, 'vercel.json')
const vercelText = readFileSync(vercelFile, 'utf8')
const cspStyle = vercelText.match(/style-src ([^;"]+)/)
if (!cspStyle) fail('style-src introuvable dans la CSP de vercel.json')
if (cspStyle[1].trim() !== cssHash) {
  if (process.env.VERCEL) fail(`CSS modifié : style-src de vercel.json doit valoir ${cssHash} (lancer npm run build en local et committer vercel.json)`)
  writeFileSync(vercelFile, vercelText.replace(cspStyle[0], `style-src ${cssHash}`))
  console.warn(`prerender : CSP mise à jour dans vercel.json (style-src ${cssHash}) — à committer`)
}

// Fichiers de police plus référencés → supprimés de dist/
for (const f of readdirSync(path.join(dist, 'assets'))) {
  if (/\.woff2?$/.test(f) && !css.includes(f)) rmSync(path.join(dist, 'assets', f))
}

// 2. Loader inline à la place du script module
const scriptTag = template.match(/<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"><\/script>/)
if (!scriptTag) fail('script module introuvable')
const loader = readFileSync(path.join(root, 'scripts', 'app-loader.js'), 'utf8').trim()
template = template.replace(scriptTag[0], '')
template = template.replace('</body>', `<script data-entry="${scriptTag[1]}">${loader}</script>\n  </body>`)

// 3. Polices à précharger : celles que le navigateur demande pour le haut de
// page (mesuré sur mobile et desktop). Cormorant italique : « Votre » du
// titre de l'accueil uniquement. Sous-ensembles : latin partout, latin-ext
// pour le roumain (ă, ș, ț), cyrillic pour le russe.
const assets = readdirSync(path.join(dist, 'assets'))
const fontFile = (stem) =>
  assets.find(f => f.startsWith(`${stem}-`) && f.endsWith('.woff2')) ?? fail(`police ${stem} introuvable`)
const SUBSETS = { fr: ['latin'], en: ['latin'], ro: ['latin', 'latin-ext'], ru: ['latin', 'cyrillic'] }
function fontsFor({ lang, page }) {
  const families = ['cormorant-garamond-SUB-wght-normal', 'montserrat-SUB-wght-normal']
  if (page === 'home') families.splice(1, 0, 'cormorant-garamond-SUB-wght-italic')
  return SUBSETS[lang].flatMap(sub => families.map(f => fontFile(f.replace('SUB', sub))))
}

// 4. Une page par route
if (!/<!--app-head-->[\s\S]*?<!--\/app-head-->/.test(template)) fail('marqueurs <!--app-head--> introuvables')
if (!template.includes('<div id="root"></div>')) fail('<div id="root"></div> introuvable')
if (!template.includes('<html lang="fr">')) fail('<html lang="fr"> introuvable')

// Route → attributs data-* de #root (lus par src/main.jsx)
const dataAttrs = (route) => Object.entries(route)
  .filter(([, v]) => v !== undefined)
  .map(([k, v]) => `data-${k}="${v}"`).join(' ')

let total = 0
const allRoutes = [...ROUTES, ...BLOG_ROUTES]
for (const route of allRoutes) {
  const appHtml = render(route)
  const preloads = fontsFor(route)
    .map(f => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`).join('\n    ')
  const html = template
    .replace('<html lang="fr">', `<html lang="${route.lang}">`)
    .replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, () => headFor(route))
    .replace('<style>', () => `${preloads}\n    <style>`)
    .replace('<div id="root"></div>', () =>
      `<div id="root" ${dataAttrs(route)}>${appHtml}</div>`)
  const file = path.join(dist, routeFile(route))
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, html)
  total += html.length
}

// 5. Page 404 (servie par Vercel pour toute adresse inconnue, statut 404) :
// HTML statique, sans JavaScript ni information technique, non indexée
const notFound = template
  .replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, () =>
    '<title>Page introuvable | CDG TRANSFERT VTC</title>\n    <meta name="robots" content="noindex" />\n    <meta name="description" content="Cette page n’existe pas ou a été déplacée." />')
  .replace('<style>', () => `${fontsFor({ lang: 'fr', page: '404' }).map(f => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`).join('\n    ')}\n    <style>`)
  .replace(/<script data-entry="[^"]*">[\s\S]*?<\/script>/, '')
  .replace('<div id="root"></div>', () => `<main id="root" class="min-h-screen flex items-center justify-center px-6 py-section">
      <div class="max-w-3xl mx-auto text-center">
        <p class="section-eyebrow">Erreur 404</p>
        <h1 class="section-title">Page introuvable</h1>
        <p class="text-silver font-sans font-light leading-relaxed mb-8">La page demandée n’existe pas ou a été déplacée.</p>
        <p class="mb-10"><a href="/" class="btn-primary">Retour à l’accueil</a></p>
        <ul class="space-y-2 text-sm text-silver font-sans">
          <li lang="en">Page not found — <a href="/en" class="text-gold underline">English home page</a></li>
          <li lang="ru">Страница не найдена — <a href="/ru" class="text-gold underline">главная страница</a></li>
          <li lang="ro">Pagina nu a fost găsită — <a href="/ro" class="text-gold underline">pagina principală</a></li>
          <li><a href="/blog" class="text-gold underline">Blog</a> · <a href="tel:${BUSINESS.phoneE164}" class="text-gold underline">${BUSINESS.phoneDisplay}</a></li>
        </ul>
      </div>
    </main>`)
if (notFound.includes('<script data-entry')) fail('404 : loader non retiré')
writeFileSync(path.join(dist, '404.html'), notFound)

// 6. Fichiers d'indexation
const lastmod = new Date().toISOString().slice(0, 10)
writeFileSync(path.join(dist, 'sitemap.xml'), sitemapXml(lastmod))
writeFileSync(path.join(dist, 'robots.txt'), robotsTxt())
writeFileSync(path.join(dist, 'llms.txt'), llmsTxt())
writeFileSync(path.join(dist, 'blog', 'rss.xml'), rssXml())

rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerender : ${allRoutes.length} pages dont ${BLOG_ROUTES.length} du blog (${(total / 1024).toFixed(0)} Ko au total), CSS intégré (${(css.length / 1024).toFixed(1)} Ko), sitemap.xml, robots.txt, llms.txt, blog/rss.xml`)
