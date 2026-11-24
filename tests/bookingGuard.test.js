// ── Tests du formulaire de réservation : validation, anti-spam, nettoyage
// Lancer : npm test
// ────────────────────────────────────────────────────────────────────
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { checkBooking, cleanText, cleanParams, tooFast, rateLimited, recordSend, RATE, LIMITS } from '../src/utils/bookingGuard.js'

const NOW = new Date('2026-11-24T10:00:00')
const OK = {
  name: 'Jean-Pierre D’Arc', email: 'jean@example.com', phone: '+33 6 12 34 56 78',
  date: '2026-11-25', time: '08:30', pickup: 'Paris 75008', dropoff: 'Aéroport CDG Terminal 2',
  vehicleId: 'business', childSeats: '0',
}
const errs = (patch) => checkBooking({ ...OK, ...patch }, NOW)

test('validation : une demande correcte passe (noms accentués, cyrillique)', () => {
  assert.deepEqual(errs({}), [])
  assert.deepEqual(errs({ name: 'Ионела Попеску' }), [])
  assert.deepEqual(errs({ name: 'Ștefan Ionescu' }), [])
})

test('validation : chaque champ est contrôlé', () => {
  assert.deepEqual(errs({ name: 'A' }), ['errName'])
  assert.deepEqual(errs({ name: '<script>alert(1)</script>' }), ['errName'])
  assert.deepEqual(errs({ name: 'x'.repeat(LIMITS.name + 1) }), ['errName'])
  assert.deepEqual(errs({ email: 'jean@example' }), ['errEmail'])
  assert.deepEqual(errs({ email: 'jean<x>@example.com' }), ['errEmail'])
  assert.deepEqual(errs({ phone: '12345' }), ['errPhone'])
  assert.deepEqual(errs({ phone: '06 12 34 56 78 <b>' }), ['errPhone'])
  assert.deepEqual(errs({ date: '2026-11-24', time: '09:59' }), ['errDate'])   // passé de quelques minutes
  assert.deepEqual(errs({ date: '2026-11-24', time: '10:30' }), [])            // aujourd'hui, plus tard
  assert.deepEqual(errs({ date: '2026-13-40' }), ['errDate'])
  assert.deepEqual(errs({ date: '2029-01-01' }), ['errDateFar'])
  assert.deepEqual(errs({ pickup: 'ab' }), ['errAddr'])
  assert.deepEqual(errs({ dropoff: 'x'.repeat(201) }), ['errAddr'])
  assert.deepEqual(errs({ childSeats: '9' }), ['errInvalid'])
  assert.deepEqual(errs({ vehicleId: 'jet' }), ['errInvalid'])
})

test('nettoyage : texte brut, sans HTML ni caractères de contrôle, longueur limitée', () => {
  assert.equal(cleanText('<b>Jean</b>\n\tDupont\u202E', 80), 'bJean/b Dupont')
  assert.equal(cleanText('{{client_email}}', 80), 'client_email')
  assert.equal(cleanText('x'.repeat(500), LIMITS.address).length, LIMITS.address)
  const p = cleanParams({ client_name: '<img src=x onerror=alert(1)>', pickup: 'Paris\r\n75008', child_seats: '2' })
  assert.doesNotMatch(Object.values(p).join(''), /[<>{}\r\n]/)
  assert.equal(p.pickup, 'Paris 75008')
})

test('anti-spam : délai minimal de 3 s et 3 envois maximum en 10 min', () => {
  assert.equal(tooFast(1000, 2500), true)
  assert.equal(tooFast(1000, 4100), false)
  assert.equal(tooFast(0, 99999), true)
  const mem = new Map()
  const storage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) }
  const t0 = 1_000_000
  for (let i = 0; i < RATE.max; i++) { assert.equal(rateLimited(t0 + i, storage), false); recordSend(t0 + i, storage) }
  assert.equal(rateLimited(t0 + 10, storage), true)
  assert.equal(rateLimited(t0 + RATE.windowMs + 10, storage), false)   // fenêtre écoulée
  assert.equal(rateLimited(t0, null), false)                           // sans stockage : pas de blocage
})

test('formulaire : champ piège, valeurs nettoyées, navigateurs automatisés refusés', () => {
  const form = readFileSync(new URL('../src/components/BookingModule/index.jsx', import.meta.url), 'utf8')
  assert.match(form, /className="hp-field" aria-hidden="true"/)
  assert.match(form, /tabIndex=\{-1\}/)
  assert.match(form, /if \(form\.website\)/)
  assert.match(form, /cleanParams\(\{/)
  assert.match(form, /blockHeadless: true/)
  for (const f of ['name', 'email', 'phone']) assert.match(form, new RegExp(`id="${f}"[^>]*maxLength=\\{LIMITS\\.${f}\\}`))
})
