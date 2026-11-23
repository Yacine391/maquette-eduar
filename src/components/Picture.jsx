// ── <Picture> : image responsive AVIF + WebP ─────────────────────────
// Photos de la flotte (src/constants/vehiclePhotos.js). width/height
// réservent la place (pas de décalage de mise en page) ; chargement
// différé par défaut.
// ────────────────────────────────────────────────────────────────────
import { photo } from '../constants/vehiclePhotos'

export default function Picture({ name, alt, sizes, className, style, loading = 'lazy', thumb = false }) {
  const p = photo(name)
  return (
    <picture>
      <source type="image/avif" srcSet={thumb ? p.thumb.avif : p.avif} sizes={thumb ? undefined : sizes} />
      <source type="image/webp" srcSet={thumb ? p.thumb.webp : p.webp} sizes={thumb ? undefined : sizes} />
      <img
        src={thumb ? p.thumb.webp : p.src}
        alt={alt}
        width={p.width}
        height={p.height}
        loading={loading}
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  )
}

// ── <CoverPicture> : couverture de carte, un recadrage par gabarit ───
// sources = [{ key, media, sizes }] dans l'ordre (media le plus large
// d'abord, dernier = défaut mobile sans media).
export function CoverPicture({ name, sources, alt, className }) {
  const fallback = photo(name, { card: sources[sources.length - 1].key })
  return (
    <picture>
      {sources.flatMap(({ key, media, sizes }) => {
        const p = photo(name, { card: key })
        return [
          <source key={`${key}-avif`} media={media ?? undefined} type="image/avif" srcSet={p.avif} sizes={sizes} />,
          <source key={`${key}-webp`} media={media ?? undefined} type="image/webp" srcSet={p.webp} sizes={sizes} />,
        ]
      })}
      <img
        src={fallback.src}
        alt={alt}
        width={fallback.width}
        height={fallback.height}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  )
}
