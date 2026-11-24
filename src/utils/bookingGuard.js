// ── Formulaire de réservation : validation, anti-spam, nettoyage ──────
// Fonctions pures (sans React), utilisées par BookingModule et les tests
// (tests/bookingGuard.test.js).
//   • checkBooking : validation stricte de chaque champ → clés d'erreur
//     (libellés dans BookingModule, 4 langues)
//   • tooFast : envoi moins de 3 s après l'affichage du formulaire (robot)
//   • rateLimited / recordSend : 3 demandes maximum par navigateur en 10 min
//     (localStorage ; sans stockage disponible, pas de limite côté client)
//   • cleanText / cleanParams : texte brut uniquement avant l'envoi à
//     EmailJS — caractères de contrôle, < > { } et caractères de direction
//     retirés, espaces réduits, longueur limitée.
// ────────────────────────────────────────────────────────────────────

export const LIMITS = { name: 80, email: 254, phone: 20, address: 200 }
export const MIN_DELAY_MS = 3000
export const RATE = { max: 3, windowMs: 10 * 60 * 1000, key: 'cdgtv-booking-sends' }
const MAX_AHEAD_MS = 548 * 24 * 3600 * 1000   // 18 mois

const NAME_RE  = /^[\p{L}\p{M}][\p{L}\p{M}'’. -]*$/u
const EMAIL_RE = /^[^\s@<>"'(),;:\\[\]]+@[^\s@<>"'(),;:\\[\]]+\.[^\s@<>"'(),;:\\[\]]{2,}$/
const PHONE_RE = /^\+?[\d\s().-]+$/
const VEHICLES = ['business', 'luxe', 'van', 'eco']
const SEATS    = ['0', '1', '2', '3', '4']

// Texte brut, une ligne, longueur limitée
export function cleanText(value, max) {
  return String(value ?? '')
    .normalize('NFC')
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u2028-\u202E\u2066-\u2069\uFEFF]/g, ' ')
    .replace(/[<>{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

// Paramètres envoyés à EmailJS : chaque valeur nettoyée selon son champ
const PARAM_MAX = {
  client_name: LIMITS.name, client_email: LIMITS.email, client_phone: LIMITS.phone,
  booking_date: 10, booking_time: 5, pickup: LIMITS.address, dropoff: LIMITS.address,
  vehicle: 60, child_seats: 1, price: 20,
}
export function cleanParams(params) {
  return Object.fromEntries(Object.entries(params).map(([k, v]) => [k, cleanText(v, PARAM_MAX[k] ?? 200)]))
}

// Validation : liste de clés d'erreur (vide si tout est correct)
export function checkBooking(form, now = new Date()) {
  const errs = []
  const name = cleanText(form.name, 200)
  if (name.length < 2 || name.length > LIMITS.name || !NAME_RE.test(name)) errs.push('errName')

  // E-mail facultatif : vérifié seulement s'il est renseigné
  const email = String(form.email ?? '').trim()
  if (email && (email.length > LIMITS.email || !EMAIL_RE.test(email))) errs.push('errEmail')

  const phone = String(form.phone ?? '').trim()
  const digits = phone.replace(/\D/g, '').length
  if (phone.length > LIMITS.phone || !PHONE_RE.test(phone) || digits < 9 || digits > 15) errs.push('errPhone')

  const okFormat = /^\d{4}-\d{2}-\d{2}$/.test(form.date ?? '') && /^\d{2}:\d{2}$/.test(form.time ?? '')
  const when = okFormat ? new Date(`${form.date}T${form.time}`) : null   // heure locale du visiteur
  if (!when || Number.isNaN(when.getTime()) || when <= now) errs.push('errDate')
  else if (when - now > MAX_AHEAD_MS) errs.push('errDateFar')

  for (const a of [form.pickup, form.dropoff]) {
    const t = cleanText(a, 400)
    if (t.length < 3 || t.length > LIMITS.address) { errs.push('errAddr'); break }
  }

  if (!VEHICLES.includes(form.vehicleId) || !SEATS.includes(form.childSeats)) errs.push('errInvalid')
  return errs
}

// Envoi trop rapide après l'affichage du formulaire
export const tooFast = (shownAt, now) => !shownAt || now - shownAt < MIN_DELAY_MS

// Limite d'envois par navigateur
function readSends(now, storage) {
  try {
    const list = JSON.parse(storage.getItem(RATE.key) ?? '[]')
    return Array.isArray(list) ? list.filter(t => typeof t === 'number' && now - t < RATE.windowMs) : []
  } catch { return [] }
}
const store = () => { try { return globalThis.localStorage ?? null } catch { return null } }

export function rateLimited(now, storage = store()) {
  if (!storage) return false
  return readSends(now, storage).length >= RATE.max
}

export function recordSend(now, storage = store()) {
  if (!storage) return
  try { storage.setItem(RATE.key, JSON.stringify([...readSends(now, storage), now])) } catch { /* stockage indisponible */ }
}
