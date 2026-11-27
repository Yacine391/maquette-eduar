// ── Mesure d'audience sans cookie (Vercel Web Analytics) ────────────────
// Rien n'est chargé ni envoyé si WEB_ANALYTICS est false (src/config/analytics.js).
// Sinon, après l'hydratation : script /_vercel/insights/script.js (même
// origine, aucun cookie ni stockage local) chargé via la politique Trusted
// Types « analytics » (CSP de vercel.json), puis événements :
//   • « Réserver »  : clic sur un lien vers le formulaire (#booking)
//   • « Appeler »   : clic sur un lien tel:
//   • « WhatsApp »  : clic sur un lien wa.me
//   • « Formulaire envoyé » : notification EmailJS réussie (BookingModule)
// Aucune donnée saisie dans le formulaire n'est transmise.
// ────────────────────────────────────────────────────────────────────
import { WEB_ANALYTICS, ANALYTICS_SCRIPT } from '../config/analytics.js'

const enabled = () => WEB_ANALYTICS && typeof window !== 'undefined'

// File d'attente : les appels faits avant le chargement du script sont rejoués
function queue() {
  if (!window.va) window.va = function va(...args) { (window.vaq = window.vaq || []).push(args) }
}

export function track(name, data) {
  if (!enabled()) return
  queue()
  window.va('event', data ? { name, data } : { name })
}

// Nom d'événement d'un lien cliqué (délégation : tous les liens du site)
export function eventForLink(href = '') {
  if (href.startsWith('tel:')) return 'Appeler'
  if (/^https:\/\/wa\.me\//.test(href)) return 'WhatsApp'
  if (/#booking$/.test(href)) return 'Réserver'
  return null
}

export function initAnalytics() {
  if (!enabled() || document.querySelector(`script[src="${ANALYTICS_SCRIPT}"]`)) return
  queue()
  const ok = (u) => (u === ANALYTICS_SCRIPT ? u : null)
  const policy = window.trustedTypes ? window.trustedTypes.createPolicy('analytics', { createScriptURL: ok }) : { createScriptURL: ok }
  const s = document.createElement('script')
  s.defer = true
  s.dataset.sdkn = 'cdgtv'
  s.src = policy.createScriptURL(ANALYTICS_SCRIPT)
  document.head.appendChild(s)
  document.addEventListener('click', (e) => {
    const a = e.target instanceof Element ? e.target.closest('a[href]') : null
    const name = a && eventForLink(a.getAttribute('href'))
    if (name) track(name)
  }, { capture: true, passive: true })
}
