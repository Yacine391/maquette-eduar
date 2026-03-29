// ── Fleet — Section flotte (ordre strict CLAUDE.md) ──────────────────
// Ordre : BUSINESS (featured) > Luxe > Van > Éco
// Hover : scale-105 + gold inner glow · 0.3s ease-in-out
// ────────────────────────────────────────────────────────────────────
import { vehicles } from '../../constants/vehicles'

export default function Fleet({ t, lang }) {
  return (
    <section id="fleet" className="py-section px-6">
      <div className="max-w-7xl mx-auto">
        {/* ── Titre ── */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Flotte</p>
          <h2 className="font-serif text-4xl md:text-5xl text-offwhite">{t('fleet_title')}</h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-12 bg-gold/40" />
            <div className="w-1 h-1 rounded-full bg-gold/60" />
            <div className="h-px w-12 bg-gold/40" />
          </div>
        </div>

        {/* ── Grille de cartes ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((v) => (
            <FleetCard key={v.id} vehicle={v} t={t} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Carte individuelle ───────────────────────────────────────────────
function FleetCard({ vehicle, t, lang }) {
  const { category, model, seats, luggage, gradient, featured, description } = vehicle

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-sm
        transition-all duration-300 ease-in-out cursor-pointer group
        ${featured
          ? 'border border-gold shadow-[0_0_20px_rgba(197,160,89,0.15)]'
          : 'border border-zinc-800 hover:border-gold/40'
        }
        hover:scale-105 hover:shadow-[inset_0_0_0_1px_#C5A059,0_8px_32px_rgba(197,160,89,0.12)]
      `}
    >
      {/* ── Badge "Recommandé" ── */}
      {featured && (
        <div className="absolute top-4 right-4 z-10 bg-gold text-canvas text-[10px] font-bold tracking-widest uppercase px-2 py-1">
          {t('fleet_badge')}
        </div>
      )}

      {/* ── Placeholder visuel CSS gradient ── */}
      <div
        className={`h-44 bg-gradient-to-br ${gradient} flex items-center justify-center`}
      >
        {/* Silhouette SVG générique berline */}
        <svg
          viewBox="0 0 120 50"
          className="w-28 opacity-30 text-gold"
          fill="currentColor"
        >
          <path d="M10 35 Q14 20 30 18 L45 14 Q60 10 75 14 L90 18 Q106 20 110 35 L115 35 Q116 38 110 40 L10 40 Q4 38 5 35 Z" />
          <ellipse cx="28" cy="40" rx="8" ry="8" />
          <ellipse cx="92" cy="40" rx="8" ry="8" />
        </svg>
      </div>

      {/* ── Infos ── */}
      <div className={`p-6 flex flex-col flex-1 ${featured ? 'bg-zinc-900/80' : 'bg-zinc-950/60'}`}>
        {/* Catégorie */}
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-1">{category}</p>
        {/* Modèle */}
        <h3 className="font-serif text-xl text-offwhite mb-3">{model}</h3>
        {/* Description */}
        <p className="text-sm text-silver leading-relaxed flex-1 mb-4">
          {description[lang] ?? description['fr']}
        </p>
        {/* Capacités */}
        <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
          <span className="flex items-center gap-1.5 text-xs text-silver">
            {/* Icône passager */}
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-gold/70" fill="currentColor">
              <circle cx="8" cy="4" r="3" />
              <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
            </svg>
            {seats} {t('fleet_seats')}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-silver">
            {/* Icône bagage */}
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-gold/70" fill="currentColor">
              <rect x="4" y="5" width="8" height="9" rx="1" />
              <path d="M6 5V3h4v2" />
            </svg>
            {luggage} {t('fleet_luggage')}
          </span>
        </div>
        {/* CTA secondaire */}
        <a
          href="#booking"
          className={`mt-4 block text-center text-xs font-semibold tracking-widest uppercase py-2.5
            border transition-all duration-300
            ${featured
              ? 'border-gold text-gold hover:bg-gold hover:text-canvas'
              : 'border-zinc-700 text-silver hover:border-gold hover:text-gold'
            }`}
        >
          {lang === 'ru' ? 'Забронировать' : lang === 'en' ? 'Book' : 'Réserver'}
        </a>
      </div>
    </div>
  )
}
