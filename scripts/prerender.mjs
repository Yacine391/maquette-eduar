// ── Post-build : HTML pré-généré + chargement optimisé ───────────────
// CDG TRANSFERT VTC — lancé par `npm run build` après les 2 builds Vite :
//   1. vite build                → dist/ (client)
//   2. vite build --ssr …        → dist-ssr/entry-server.js
//   3. node scripts/prerender.mjs (ce fichier)
// Il modifie dist/index.html :
//   • insère le HTML de la page (rendu React au build) dans <div id="root">
//   • remplace la feuille CSS par un <style> intégré (aucune requête bloquante)
//   • précharge les 3 fichiers de police du haut de page (latin) : Cormorant
//     Garamond (grand titre), son italique (« Votre ») et Montserrat (menu,
//     H1, boutons) — polices variables, une seule requête par style
//   • remplace le <script type="module"> par le loader inline
//     scripts/app-loader.js, autorisé par son empreinte sha256 dans la CSP
//     de vercel.json (le test tests/security.test.js vérifie la correspondance).
//     Le loader crée le <script type="module"> (autorisé par 'strict-dynamic')
//     via la politique Trusted Types « loader » (seuls /assets/*.js passent).
// ────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root    = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist    = path.join(root, 'dist')
const ssrDir  = path.join(root, 'dist-ssr')
const fail    = (msg) => { console.error(`prerender : ${msg}`); process.exit(1) }

let html = readFileSync(path.join(dist, 'index.html'), 'utf8')

// 1. HTML de l'application
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const appHtml = render()
if (!html.includes('<div id="root"></div>')) fail('<div id="root"></div> introuvable')
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

// 2. CSS intégré
const cssTag = html.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
if (!cssTag) fail('feuille CSS introuvable')
const cssFile = path.join(dist, cssTag[1])
let css = readFileSync(cssFile, 'utf8')
// Polices : woff2 uniquement (tous les navigateurs actuels), sans les
// sous-ensembles inutilisés par les 4 langues du site (vietnamien,
// cyrillique étendu). Le russe utilise « cyrillic », le roumain « latin-ext ».
css = css
  .replace(/,\s*url\([^)]+\.woff\)\s*format\(["']woff["']\)/g, '')
  .replace(/@font-face\{[^}]*-(?:vietnamese|cyrillic-ext)-[^}]*\}/g, '')
html = html.replace(cssTag[0], () => `<style>${css}</style>`)
rmSync(cssFile)

// Fichiers de police plus référencés → supprimés de dist/
for (const f of readdirSync(path.join(dist, 'assets'))) {
  if (/\.woff2?$/.test(f) && !css.includes(f)) rmSync(path.join(dist, 'assets', f))
}

// 3. Préchargement des polices du haut de page
const assets = readdirSync(path.join(dist, 'assets'))
const fonts = ['cormorant-garamond-latin-wght-normal', 'cormorant-garamond-latin-wght-italic', 'montserrat-latin-wght-normal']
  .map(stem => assets.find(f => f.startsWith(`${stem}-`) && f.endsWith('.woff2')) ?? fail(`police ${stem} introuvable`))
const preloads = fonts.map(f => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`).join('\n    ')
html = html.replace('<style>', `${preloads}\n    <style>`)
const font = fonts.join(', ')

// 4. Loader inline à la place du script module
const scriptTag = html.match(/<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"><\/script>/)
if (!scriptTag) fail('script module introuvable')
const loader = readFileSync(path.join(root, 'scripts', 'app-loader.js'), 'utf8').trim()
html = html.replace(scriptTag[0], '')
html = html.replace('</body>', `<script data-entry="${scriptTag[1]}">${loader}</script>\n  </body>`)

writeFileSync(path.join(dist, 'index.html'), html)
rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerender : ${(appHtml.length / 1024).toFixed(1)} Ko de HTML, CSS intégré (${(css.length / 1024).toFixed(1)} Ko), polices préchargées : ${font}`)
