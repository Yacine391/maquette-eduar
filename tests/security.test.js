// ── Tests des en-têtes de sécurité (vercel.json) ─────────────────────
// La CSP n'autorise que le loader inline scripts/app-loader.js et le CSS
// intégré, par leurs empreintes sha256 (ni 'unsafe-inline' ni 'unsafe-eval').
// Si le loader change, ce test échoue tant que la CSP de vercel.json n'a pas
// été mise à jour ; l'empreinte du CSS est mise à jour par le build
// (scripts/prerender.mjs) et vérifiée ici si dist/ existe.
// Vérifie aussi : aucun attribut style dans le HTML, liens target="_blank"
// en noopener noreferrer, security.txt valide, page 404 sans JavaScript,
// pas de source map publiée, .env ignoré par git, Dependabot actif.
// ────────────────────────────────────────────────────────────────────
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const vercel = JSON.parse(read('vercel.json'))
const headers = Object.fromEntries(
  vercel.headers.find(h => h.source === '/(.*)').headers.map(h => [h.key.toLowerCase(), h.value])
)

test('la CSP autorise le loader inline par son empreinte sha256', () => {
  const loader = read('scripts/app-loader.js').trim()
  const hash = createHash('sha256').update(loader).digest('base64')
  assert.ok(headers['content-security-policy'].includes(`'sha256-${hash}'`),
    `mettre à jour script-src avec 'sha256-${hash}'`)
})

test('la CSP est stricte et autorise les services réellement utilisés', () => {
  const csp = headers['content-security-policy']
  for (const d of ["default-src 'self'", "'strict-dynamic'", "object-src 'none'", "base-uri 'none'", "form-action 'self'",
    "frame-ancestors 'none'", 'upgrade-insecure-requests', "require-trusted-types-for 'script'", 'trusted-types loader',
    'https://api.emailjs.com', 'https://api-adresse.data.gouv.fr']) {
    assert.ok(csp.includes(d), `directive manquante : ${d}`)
  }
  assert.doesNotMatch(csp, /'unsafe-inline'|'unsafe-eval'|'unsafe-hashes'|\bdata:|\*/, 'source non sûre dans la CSP')
  assert.doesNotMatch(csp.match(/script-src ([^;]+)/)[1], /https:/, 'script-src ne doit pas autoriser tout https:')
  assert.match(csp, /style-src 'sha256-[A-Za-z0-9+/=]{44}';/, 'style-src = une seule empreinte sha256')
})

test('la CSP autorise le CSS intégré par son empreinte (après un build)', { skip: !existsSync(new URL('../dist/index.html', import.meta.url)) && 'dist/ absent' }, () => {
  for (const f of ['dist/index.html', 'dist/404.html', 'dist/blog.html', 'dist/ru/vtc-aeroport-cdg.html']) {
    const html = read(f)
    const styles = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m => m[1])
    assert.equal(styles.length, 1, `${f} : un seul <style>`)
    const hash = createHash('sha256').update(styles[0]).digest('base64')
    assert.ok(headers['content-security-policy'].includes(`style-src 'sha256-${hash}'`), `${f} : relancer npm run build et committer vercel.json`)
    assert.doesNotMatch(html, /\sstyle="/, `${f} : attribut style interdit par la CSP`)
    for (const m of html.matchAll(/<script(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g)) {
      const h = createHash('sha256').update(m[1]).digest('base64')
      assert.ok(headers['content-security-policy'].includes(`'sha256-${h}'`), `${f} : script inline non autorisé`)
    }
  }
  const nf = read('dist/404.html')
  assert.match(nf, /<meta name="robots" content="noindex"/)
  assert.doesNotMatch(nf, /data-entry|<script(?![^>]*ld\+json)/, '404 : aucun JavaScript')
  const maps = (function walk(d) { return readdirSync(d).flatMap(f => { const p = path.join(d, f); return statSync(p).isDirectory() ? walk(p) : [p] }) })('dist').filter(f => f.endsWith('.map'))
  assert.deepEqual(maps, [], 'aucune source map publiée')
  assert.ok(existsSync('dist/.well-known/security.txt'), 'security.txt copié dans dist/')
})

test('en-têtes de sécurité présents', () => {
  assert.equal(headers['strict-transport-security'], 'max-age=63072000; includeSubDomains; preload')
  assert.equal(headers['cross-origin-opener-policy'], 'same-origin')
  assert.equal(headers['x-frame-options'], 'DENY')
  assert.equal(headers['x-content-type-options'], 'nosniff')
  assert.equal(headers['referrer-policy'], 'strict-origin-when-cross-origin')
  assert.equal(headers['cross-origin-resource-policy'], 'same-origin')
  assert.equal(headers['x-permitted-cross-domain-policies'], 'none')
  for (const f of ['camera=()', 'microphone=()', 'geolocation=()', 'payment=()']) assert.ok(headers['permissions-policy'].includes(f), f)
})

test('security.txt : contact, expiration dans moins d’un an, langues', () => {
  const txt = read('public/.well-known/security.txt')
  assert.match(txt, /^Contact: mailto:cdgtransfertvtc@gmail\.com$/m)
  assert.match(txt, /^Preferred-Languages: fr, en$/m)
  assert.match(txt, /^Canonical: https:\/\/cdgtransfertvtc\.fr\/\.well-known\/security\.txt$/m)
  const expires = new Date(txt.match(/^Expires: (.+)$/m)[1])
  const days = (expires - Date.now()) / 864e5
  assert.ok(days > 0, 'security.txt expiré : repousser Expires d’un an')
  assert.ok(days <= 366, 'Expires : un an au plus')
})

test('code : aucun attribut style inline, liens target="_blank" protégés, secrets ignorés par git', () => {
  const files = (function walk(d) { return readdirSync(d).flatMap(f => { const p = path.join(d, f); return statSync(p).isDirectory() ? (f === 'generated' ? [] : walk(p)) : [p] }) })('src').filter(f => f.endsWith('.jsx'))
  for (const f of files) {
    const src = readFileSync(f, 'utf8')
    if (!f.endsWith('Picture.jsx')) assert.doesNotMatch(src, /style=\{\{/, `${f} : attribut style inline (utiliser une classe CSS)`)
    for (const m of src.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(m[0], /rel="noopener noreferrer"/, `${f} : ${m[0]}`)
  }
  assert.match(read('.gitignore'), /^\.env\*$/m)
  assert.match(read('.gitignore'), /^!\.env\.example$/m)
  assert.ok(existsSync('.env.example'))
  assert.match(read('.github/dependabot.yml'), /package-ecosystem: npm[\s\S]*package-ecosystem: github-actions/)
  // Versions exactes (package-lock.json fait foi)
  const pkg = JSON.parse(read('package.json'))
  for (const [k, v] of Object.entries({ ...pkg.dependencies, ...pkg.devDependencies })) assert.match(v, /^\d+\.\d+\.\d+$/, `${k} : version exacte attendue`)
  // Aucune clé secrète côté client : seuls les identifiants publics EmailJS
  const ej = read('src/config/emailjs.js')
  assert.doesNotMatch(ej, /private|secret|accessToken/i)
})
