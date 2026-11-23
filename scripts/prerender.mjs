// ── Post-build : pages HTML pré-générées + chargement optimisé ───────
// CDG TRANSFERT VTC — lancé par `npm run build` après les 2 builds Vite :
//   1. vite build                → dist/ (client, gabarit dist/index.html)
//   2. vite build --ssr …        → dist-ssr/entry-server.js
//   3. node scripts/prerender.mjs (ce fichier)
// À partir du gabarit, il écrit une page HTML complète par route (accueil +
// 7 pages services, en FR à la racine et en /en, /ru, /ro — src/routes.js) :
//   • <html lang>, balises <head> SEO de la route (title, description,
//     canonical, hreflang, Open Graph, Twitter, JSON-LD — src/seo/head.js)
//   • HTML de la page (rendu React au build) dans <div id="root">, avec la
//     route en data-lang / data-page (relue à l'hydratation, src/main.jsx)
//   • CSS intégré dans un <style> (aucune requête bloquante)
//   • préchargement des polices du haut de page, selon la langue (sous-
//     ensembles latin, latin-ext, cyrillic) et le type de page
//   • loader inline scripts/app-loader.js à la place du <script type="module">,
//     autorisé par son empreinte sha256 dans la CSP de vercel.json (vérifié
//     par tests/security.test.js) ; il crée le script module via la politique
//     Trusted Types « loader » (seuls /assets/*.js passent).
// Puis il génère sitemap.xml, robots.txt et llms.txt (src/seo/files.js).
// ────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, readdirSync, rmSync, mkdirSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root    = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist    = path.join(root, 'dist')
const ssrDir  = path.join(root, 'dist-ssr')
const fail    = (msg) => { console.error(`prerender : ${msg}`); process.exit(1) }

const { render, headFor, ROUTES, pageFile, sitemapXml, robotsTxt, llmsTxt } =
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

let total = 0
for (const route of ROUTES) {
  const appHtml = render(route)
  const preloads = fontsFor(route)
    .map(f => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`).join('\n    ')
  const html = template
    .replace('<html lang="fr">', `<html lang="${route.lang}">`)
    .replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, () => headFor(route))
    .replace('<style>', () => `${preloads}\n    <style>`)
    .replace('<div id="root"></div>', () =>
      `<div id="root" data-lang="${route.lang}" data-page="${route.page}">${appHtml}</div>`)
  const file = path.join(dist, pageFile(route.lang, route.page))
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, html)
  total += html.length
}

// 5. Fichiers d'indexation
const lastmod = new Date().toISOString().slice(0, 10)
writeFileSync(path.join(dist, 'sitemap.xml'), sitemapXml(lastmod))
writeFileSync(path.join(dist, 'robots.txt'), robotsTxt())
writeFileSync(path.join(dist, 'llms.txt'), llmsTxt())

rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerender : ${ROUTES.length} pages (${(total / 1024).toFixed(0)} Ko au total), CSS intégré (${(css.length / 1024).toFixed(1)} Ko), sitemap.xml, robots.txt, llms.txt`)
