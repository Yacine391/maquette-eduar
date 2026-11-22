// ── Logo CDG Transfert VTC (AVIF / WebP, 1x-3x) ──────────────────────
// Variantes générées par scripts/optimize-images.py (largeurs 64/128/192).
// ────────────────────────────────────────────────────────────────────
import avif64 from '../assets/logo-64.avif'
import avif128 from '../assets/logo-128.avif'
import avif192 from '../assets/logo-192.avif'
import webp64 from '../assets/logo-64.webp'
import webp128 from '../assets/logo-128.webp'
import webp192 from '../assets/logo-192.webp'

// Dimensions de l'original (819 × 578) → ratio réservé par width/height
export default function Logo({ className, sizes = '57px' }) {
  return (
    <picture>
      <source type="image/avif" srcSet={`${avif64} 64w, ${avif128} 128w, ${avif192} 192w`} sizes={sizes} />
      <img
        src={webp128}
        srcSet={`${webp64} 64w, ${webp128} 128w, ${webp192} 192w`}
        sizes={sizes}
        alt="CDG Transfert VTC"
        width="819"
        height="578"
        decoding="async"
        className={className}
      />
    </picture>
  )
}
