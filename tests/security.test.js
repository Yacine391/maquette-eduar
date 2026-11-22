// ── Tests des en-têtes de sécurité (vercel.json) ─────────────────────
// La CSP n'autorise que le loader inline scripts/app-loader.js, par son
// empreinte sha256. Si le loader change, ce test échoue tant que la CSP
// de vercel.json n'a pas été mise à jour avec la nouvelle empreinte.
// ────────────────────────────────────────────────────────────────────
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
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
  for (const d of ["'strict-dynamic'", "object-src 'none'", "base-uri 'none'", "frame-ancestors 'none'",
    "require-trusted-types-for 'script'", 'trusted-types loader', 'https://api.emailjs.com', 'https://api-adresse.data.gouv.fr']) {
    assert.ok(csp.includes(d), `directive manquante : ${d}`)
  }
})

test('en-têtes de sécurité présents', () => {
  assert.equal(headers['strict-transport-security'], 'max-age=63072000; includeSubDomains; preload')
  assert.equal(headers['cross-origin-opener-policy'], 'same-origin')
  assert.equal(headers['x-frame-options'], 'DENY')
  assert.equal(headers['x-content-type-options'], 'nosniff')
  assert.equal(headers['referrer-policy'], 'strict-origin-when-cross-origin')
  assert.ok(headers['permissions-policy'])
})
