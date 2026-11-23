// ── Vérification des liens du site généré (dist/) ────────────────────
// CDG TRANSFERT VTC — node scripts/check-links.mjs (après npm run build)
// Pour chaque page HTML : liens, ancres (#id), images, srcset, canonical,
// hreflang, og:image, url du JSON-LD ; plus les URL de sitemap.xml,
// blog/rss.xml et llms.txt. Les URL internes sont résolues comme sur Vercel (cleanUrls).
// Les liens externes sont listés (non appelés). Code de sortie 1 si un
// lien interne est cassé.
// ────────────────────────────────────────────────────────────────────
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const SITE = 'https://cdgtransfertvtc.fr'
const walk = (d) => readdirSync(d).flatMap(f => statSync(path.join(d, f)).isDirectory() ? walk(path.join(d, f)) : [path.join(d, f)])
const pages = walk(dist).filter(f => f.endsWith('.html'))

// Chemin d'URL → fichier servi (cleanUrls, trailingSlash: false)
function fileFor(urlPath) {
  if (urlPath === '/' ) return path.join(dist, 'index.html')
  const p = path.join(dist, decodeURIComponent(urlPath))
  if (existsSync(p) && statSync(p).isFile()) return p
  if (existsSync(`${p}.html`)) return `${p}.html`
  return null
}
const ids = new Map()
const idsOf = (file) => {
  if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map(m => m[1])))
  return ids.get(file)
}

const broken = [], external = new Set()
let checked = 0
function check(raw, from) {
  if (!raw || raw.startsWith('data:')) return
  let url = raw.replace(/&amp;/g, '&')
  if (/^(tel|mailto):/.test(url)) { external.add(url); return }
  if (/^https?:\/\//.test(url)) {
    if (!url.startsWith(SITE)) { external.add(url.replace(/\?.*$/, '?…')); return }
    url = url.slice(SITE.length) || '/'
  }
  checked++
  const [p, hash] = url.split('#')
  const target = p === '' ? from : fileFor(p.replace(/\?.*$/, ''))
  if (!target) return broken.push(`${path.relative(dist, from)} → ${raw} (page ou fichier introuvable)`)
  if (hash && target.endsWith('.html') && !idsOf(target).has(hash)) broken.push(`${path.relative(dist, from)} → ${raw} (ancre #${hash} absente)`)
}

for (const file of pages) {
  const html = readFileSync(file, 'utf8')
  for (const m of html.matchAll(/\s(?:href|src|content)="([^"]*)"/g)) {
    const v = m[1]
    if (m[0].trimStart().startsWith('content=') && !v.startsWith(SITE)) continue
    check(v, file)
  }
  for (const m of html.matchAll(/\s(?:srcset|srcSet|imagesrcset)="([^"]*)"/g)) for (const part of m[1].split(',')) check(part.trim().split(/\s+/)[0], file)
  // JSON-LD : propriétés url / item (les @id sont des identifiants, pas des liens)
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const visit = (node) => {
      if (Array.isArray(node)) return node.forEach(visit)
      if (!node || typeof node !== 'object') return
      for (const [k, v] of Object.entries(node)) {
        if ((k === 'url' || k === 'item') && typeof v === 'string') check(v, file)
        else if (typeof v === 'object') visit(v)
      }
    }
    visit(JSON.parse(m[1]))
  }
}
for (const [name, re] of [['sitemap.xml', /<(?:loc)>([^<]+)</g], ['blog/rss.xml', /<(?:link|guid[^>]*)>([^<]+)</g], ['llms.txt', /\((https:\/\/cdgtransfertvtc\.fr[^)]*)\)/g]]) {
  const f = path.join(dist, name)
  for (const m of readFileSync(f, 'utf8').matchAll(re)) check(m[1], f)
  for (const m of readFileSync(f, 'utf8').matchAll(/href="([^"]+)"/g)) check(m[1], f)
}

console.log(`${pages.length} pages, ${checked} liens internes vérifiés, ${broken.length} cassé(s)`)
for (const b of broken) console.log('  ✗', b)
console.log(`Liens externes (${external.size}) :\n  ${[...external].sort().join('\n  ')}`)
process.exit(broken.length ? 1 : 0)
