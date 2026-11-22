// ── Photos de la flotte : variantes AVIF / WebP ──────────────────────
// Générées par scripts/optimize-images.py dans src/assets/vehicles/.
// Vite les importe avec un nom haché (cache navigateur d'un an).
// photo('classe-e-1') → { avif, webp (srcset), src, width, height, largest }
// photo('classe-e-1', { card: 'lg' }) → idem, recadrée pour le gabarit « lg »
// ────────────────────────────────────────────────────────────────────
import sizes from '../assets/vehicles/sizes.json'

const files = import.meta.glob('../assets/vehicles/*.{avif,webp}', { eager: true, query: '?url', import: 'default' })

// card = 'lg' | 'md' | 'sm' | 'xs' → recadrage de couverture pour ce gabarit
// de carte (voir COVERS dans scripts/optimize-images.py)
export function photo(name, { card } = {}) {
  const base = sizes[name]
  if (!base) throw new Error(`Photo inconnue : ${name}`)
  const meta = card ? base.cards?.[card] : base
  if (!meta) throw new Error(`Pas de recadrage « ${card} » pour : ${name}`)
  const stem = card ? `${name}-card-${card}` : name
  const url = (w, ext) => files[`../assets/vehicles/${stem}-${w}.${ext}`]
  const srcset = (ext) => meta.widths.map(w => `${url(w, ext)} ${w}w`).join(', ')
  const largest = meta.widths[meta.widths.length - 1]
  return {
    avif:   srcset('avif'),
    webp:   srcset('webp'),
    src:    url(meta.widths.reduce((a, w) => (Math.abs(w - 640) < Math.abs(a - 640) ? w : a)), 'webp'),
    width:  meta.width,
    height: meta.height,
    largest: { avif: url(largest, 'avif'), webp: url(largest, 'webp') },
    thumb:   { avif: url(meta.widths[0], 'avif'), webp: url(meta.widths[0], 'webp') },
  }
}
