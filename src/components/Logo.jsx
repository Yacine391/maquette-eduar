// ── Logo CDG Transfert VTC (AVIF / WebP, 1x-3x) ──────────────────────
// « CDG / TRANSFERT VTC » recadré sur fond transparent, généré par
// scripts/optimize-logo.py (largeurs 192/384/508) : lisible sur mobile
// (le logo complet, avec sa grande marge noire, rendait le texte minuscule).
// ────────────────────────────────────────────────────────────────────
import avif192 from '../assets/logo-mark-192.avif'
import avif384 from '../assets/logo-mark-384.avif'
import avif508 from '../assets/logo-mark-508.avif'
import webp192 from '../assets/logo-mark-192.webp'
import webp384 from '../assets/logo-mark-384.webp'
import webp508 from '../assets/logo-mark-508.webp'

// Dimensions du logo recadré (508 × 113) → ratio réservé par width/height
export default function Logo({ className, sizes = '180px' }) {
  return (
    <picture>
      <source type="image/avif" srcSet={`${avif192} 192w, ${avif384} 384w, ${avif508} 508w`} sizes={sizes} />
      <img
        src={webp384}
        srcSet={`${webp192} 192w, ${webp384} 384w, ${webp508} 508w`}
        sizes={sizes}
        alt="CDG Transfert VTC"
        width="508"
        height="113"
        decoding="async"
        className={className}
      />
    </picture>
  )
}
