// ── Coordonnées de CDG Transfert VTC ─────────────────────────────────
// Raccourcis vers la source unique src/constants/business.js (téléphone /
// WhatsApp du parcours de réservation et du bouton WhatsApp flottant).
// ────────────────────────────────────────────────────────────────────
import { BUSINESS } from './business.js'

export const PHONE_E164      = BUSINESS.phoneE164     // lien tel:
export const PHONE_DISPLAY   = BUSINESS.phoneDisplay  // affichage
export const WHATSAPP_NUMBER = BUSINESS.whatsapp      // wa.me (sans + ni espaces)

// Lien WhatsApp avec un message pré-rempli
export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
