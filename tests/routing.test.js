// ── Tests du routage Vercel et du fichier de vérification Google ─────
// vercel.json remplace cleanUrls par des redirects / rewrites : les .html
// sont redirigés vers l'URL sans extension, SAUF le fichier de vérification
// Google Search Console, servi tel quel en 200 (à ne jamais supprimer).
// ────────────────────────────────────────────────────────────────────
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ROUTES } from '../src/routes.js'

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const vercel = JSON.parse(read('vercel.json'))
const GOOGLE = 'google9b82adfd484120a1.html'

// Source « path-to-regexp » de vercel.json → expression régulière (cas utilisés ici)
const toRegex = (source) => new RegExp('^' + source.replace(/:\w+\(/g, '(') + '$')

test('fichier de vérification Google : présent, contenu exact sur une ligne', () => {
  assert.equal(read(`public/${GOOGLE}`), `google-site-verification: ${GOOGLE}`)
})

test('vercel.json : pas de cleanUrls (il redirigerait le fichier Google), sans barre finale', () => {
  assert.ok(!vercel.cleanUrls, 'cleanUrls redirige tous les .html en 308, fichier Google compris')
  assert.equal(vercel.trailingSlash, false)
})

test('redirection des .html vers l’URL propre, sauf le fichier Google', () => {
  const htmlRedirect = vercel.redirects.find(r => r.destination === '/:path')
  assert.ok(htmlRedirect?.permanent)
  const re = toRegex(htmlRedirect.source)
  assert.ok(re.test('/vtc-aeroport-cdg.html'))
  assert.ok(re.test('/en/vtc-aeroport-cdg.html'))
  assert.ok(re.test('/blog/transferts-cdg/temps-trajet-cdg-paris-vtc.html'))
  assert.ok(!re.test(`/${GOOGLE}`), 'le fichier Google ne doit pas être redirigé')
  assert.ok(vercel.redirects.some(r => r.source === '/index.html' && r.destination === '/'))
})

test('réécriture des URL propres vers les fichiers .html (pas les fichiers à extension)', () => {
  const rw = vercel.rewrites.find(r => r.destination === '/:path.html')
  const re = toRegex(rw.source)
  for (const u of ['/en', '/vtc-aeroport-cdg', '/blog', '/blog/transferts-cdg/valises-vtc-cdg']) assert.ok(re.test(u), u)
  for (const u of ['/sitemap.xml', '/robots.txt', '/llms.txt', '/blog/rss.xml', `/${GOOGLE}`, '/assets/x.js']) assert.ok(!re.test(u), u)
})

test('ancienne page van 7 places : redirection 308 vers /van-6-places-paris (4 langues)', () => {
  const fr = vercel.redirects.find(r => r.source === '/van-7-places-paris')
  assert.ok(fr && fr.destination === '/van-6-places-paris' && fr.permanent === true)
  const other = vercel.redirects.find(r => r.source === '/:lang(en|ru|ro)/van-7-places-paris')
  assert.ok(other && other.destination === '/:lang/van-6-places-paris' && other.permanent === true)
  assert.ok(!ROUTES.some(r => r.page === 'van-7-places-paris'))
})
