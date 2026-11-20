// ── Coordonnées de CDG Transfert VTC ─────────────────────────────────
// Source unique pour le téléphone / WhatsApp utilisés dans le parcours de
// réservation (message de secours) et le bouton WhatsApp flottant.
// ────────────────────────────────────────────────────────────────────

export const PHONE_E164      = '+33665699678'        // lien tel:
export const PHONE_DISPLAY   = '06 65 69 96 78'      // affichage
export const WHATSAPP_NUMBER = '33665699678'         // wa.me (sans + ni espaces)

// Lien WhatsApp avec un message pré-rempli
export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
