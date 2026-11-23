// ── Fleet — Flotte premium (ordre strict CLAUDE.md) ──────────────────
// CDG TRANSFERT VTC — site en production (cdgtransfertvtc.fr)
// Design : card cinématique avec gradient, hover scale + gold glow,
// featured card mise en valeur avec taille plus grande.
//
// Photos : chaque véhicule affiche sa photo de couverture. Si plusieurs
// photos existent, la photo devient cliquable et ouvre la galerie plein
// écran (flèches gauche/droite, miniatures, swipe mobile).
// ────────────────────────────────────────────────────────────────────
import { lazy, Suspense, useState } from 'react'
import { vehicles } from '../../constants/vehicles'
import { CoverPicture } from '../Picture'

// Galerie chargée seulement à la première ouverture (JS différé)
const Lightbox = lazy(() => import('../Gallery/Lightbox'))

// Couvertures : un recadrage par gabarit de carte (scripts/optimize-images.py
// → COVERS), choisi par media query ; sizes = largeur réelle de la carte
// (conteneur max 1232 px, grille 12 colonnes, gouttière 20 px, marges 24 px)
const COVER_LARGE = [
  { key: 'lg', media: '(min-width: 1024px)', sizes: '501px' },
  { key: 'md', media: '(min-width: 640px)',  sizes: 'calc(100vw - 48px)' },
  { key: 'xs', media: null,                  sizes: 'calc(100vw - 48px)' },
]
const COVER_SMALL = [
  { key: 'sm', media: '(min-width: 640px)',  sizes: '(min-width: 1024px) 223px, calc((100vw - 88px) / 3)' },
  { key: 'xs', media: null,                  sizes: 'calc(100vw - 48px)' },
]

export default function Fleet({ t, lang }) {
  return (
    <section id="fleet" className="py-section px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Titre ── */}
        <div className="text-center mb-16">
          <p className="section-eyebrow">{{ fr: 'Flotte', en: 'Fleet', ru: 'Автопарк', ro: 'Flotă' }[lang]}</p>
          <h2 className="section-title">{t('fleet_title')}</h2>
          <div className="section-divider">
            <div className="h-px w-10 bg-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            <div className="h-px w-10 bg-gold/30" />
          </div>
        </div>

        {/* ── Layout : featured large + 3 standard ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Featured (BUSINESS) — 5 colonnes sur lg */}
          {vehicles.filter(v => v.featured).map(v => (
            <div key={v.id} className="lg:col-span-5">
              <FleetCard vehicle={v} t={t} lang={lang} large />
            </div>
          ))}

          {/* 3 autres véhicules — 7 colonnes sur lg, grid interne 3 col */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {vehicles.filter(v => !v.featured).map(v => (
              <FleetCard key={v.id} vehicle={v} t={t} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Carte individuelle ────────────────────────────────────────────────
function FleetCard({ vehicle, t, lang, large = false }) {
  const { category, model, seats, luggage, gradient, featured, description } = vehicle

  // ── Galerie photo ──
  const images     = vehicle.images ?? []
  const cover      = images[0]                 // photo de couverture = 1re du tableau
  const hasGallery = images.length > 1         // galerie seulement si ≥ 2 photos
  // Index de la photo ouverte (null = galerie fermée)
  const [openAt, setOpenAt] = useState(null)

  // Galerie disponible → un bouton transparent couvre la photo (sans texte :
  // les pastilles visibles restent à côté, son nom vient de aria-label)
  const galleryLabel = {
    fr: `Voir les ${images.length} photos — ${model}`,
    en: `View the ${images.length} photos — ${model}`,
    ru: `Смотреть фото (${images.length}) — ${model}`,
    ro: `Vezi cele ${images.length} fotografii — ${model}`,
  }[lang] ?? `Voir les ${images.length} photos — ${model}`

  return (
    <article
      className={`relative flex flex-col overflow-hidden group cursor-pointer
        transition-all duration-500 ease-out
        border hover:scale-[1.02]
        ${featured
          ? 'border-gold/40 hover:border-gold hover:shadow-[0_0_40px_rgba(197,160,89,0.12),inset_0_0_0_1px_rgba(197,160,89,0.3)]'
          : 'border-divider hover:border-gold/30 hover:shadow-[0_0_24px_rgba(197,160,89,0.08),inset_0_0_0_1px_rgba(197,160,89,0.15)]'
        }`}
      style={{ height: large ? '100%' : undefined, minHeight: large ? '420px' : '320px' }}
    >
      {/* ── Badge Recommandé ── */}
      {featured && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5
          bg-gold text-canvas text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5">
          <span>★</span>
          {t('fleet_badge')}
        </div>
      )}

      {/* ── Visuel : photo réelle si disponible, sinon gradient CSS ──
          Cliquable (bouton) dès qu'il y a plusieurs photos → galerie. */}
      <div
        className={`relative block w-full bg-gradient-to-br ${gradient} overflow-hidden
          ${large ? 'h-56' : 'h-40'} flex-shrink-0`}
      >
        {/* Photo de couverture */}
        {cover && (
          <CoverPicture
            name={cover.name}
            sources={large ? COVER_LARGE : COVER_SMALL}
            alt={`${model} — CDG Transfert VTC`}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />
        )}
        {/* Gold shimmer on hover */}
        <div className="absolute inset-0 gold-shimmer opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500" />
        {/* Vignette bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20"
          style={{ background: 'linear-gradient(to top, rgba(17,17,21,0.9), transparent)' }}
        />
        {/* Silhouette SVG véhicule — masqué si photo réelle */}
        {!cover && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 160 60"
              className={`${large ? 'w-44' : 'w-32'} opacity-20 text-gold group-hover:opacity-30 transition-opacity duration-500`}
              fill="currentColor"
            >
              {vehicle.id === 'van'
                ? <path d="M8 44 Q10 24 28 22 L38 16 Q60 12 90 14 L118 18 Q138 22 148 38 L152 44 L155 44 Q157 48 150 50 L10 50 Q3 48 4 44 Z" />
                : <path d="M10 44 Q14 26 34 24 L50 18 Q72 13 88 15 L108 18 Q130 24 142 38 L146 44 L150 44 Q152 48 146 50 L10 50 Q4 48 5 44 Z" />
              }
              <ellipse cx={vehicle.id === 'van' ? '38' : '36'} cy="50" rx="10" ry="10" />
              <ellipse cx={vehicle.id === 'van' ? '118' : '120'} cy="50" rx="10" ry="10" />
            </svg>
          </div>
        )}
        {/* Badge électrique */}
        {vehicle.id === 'eco' && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-900/80 border border-emerald-500/40 px-2 py-0.5 text-[8px] font-bold tracking-widest text-emerald-400 uppercase">
            ⚡ 100% Électrique
          </div>
        )}
        {/* Compteur de photos — indique que la photo est cliquable */}
        {hasGallery && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5
            bg-canvas/75 backdrop-blur-sm border border-gold/30 text-gold
            px-2 py-1 text-[9px] font-semibold tracking-widest uppercase
            group-hover:bg-gold group-hover:text-canvas group-hover:border-gold
            transition-all duration-300">
            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
              <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2-.5a.5.5 0 00-.5.5v4.6l2.3-2a.75.75 0 01.98 0l2.1 1.85 1.6-1.3a.75.75 0 01.96.02l1.06.93V4a.5.5 0 00-.5-.5H4z" />
              <circle cx="6" cy="5.5" r="1" />
              <path d="M1 5v7a3 3 0 003 3h8v-1.5H4A1.5 1.5 0 012.5 12V5H1z" />
            </svg>
            {images.length} photos
          </span>
        )}
        {/* Catégorie en overlay */}
        <div className="absolute bottom-3 right-3 text-[9px] font-bold tracking-[0.4em] text-gold/60 uppercase">
          {category}
        </div>
        {/* Bouton d'ouverture de la galerie, au-dessus de toute la photo */}
        {hasGallery && (
          <button
            type="button"
            onClick={() => setOpenAt(0)}
            aria-label={galleryLabel}
            className="absolute inset-0 z-10 w-full h-full cursor-zoom-in"
          />
        )}
      </div>

      {/* ── Galerie plein écran (portal sur <body>) ── */}
      {openAt !== null && (
        <Suspense fallback={null}>
          <Lightbox
            images={images}
            startIndex={openAt}
            title={`${model} — ${category}`}
            lang={lang}
            onClose={() => setOpenAt(null)}
          />
        </Suspense>
      )}

      {/* ── Infos ── */}
      <div className={`flex flex-col flex-1 p-5 ${featured ? 'bg-canvas-3/80' : 'bg-canvas-3/50'}`}>

        {/* Modèle */}
        <h3 className={`font-serif text-offwhite mb-2 ${large ? 'text-2xl' : 'text-lg'}`}>
          {model}
        </h3>

        {/* Description */}
        {large && (
          <p className="text-sm text-silver font-sans font-light leading-relaxed mb-4">
            {description[lang] ?? description.fr}
          </p>
        )}

        {/* Capacités */}
        <div className="flex items-center gap-4 mt-auto pt-3 border-t border-divider">
          <Spec icon="person" value={`${seats} ${t('fleet_seats')}`} />
          <Spec icon="bag" value={`${luggage} ${t('fleet_luggage')}`} />
        </div>

        {/* CTA */}
        <a
          href="#booking"
          className={`mt-4 flex items-center justify-center gap-2 text-[10px] font-semibold tracking-widest uppercase py-3
            border transition-all duration-300
            ${featured
              ? 'border-gold text-gold hover:bg-gold hover:text-canvas'
              : 'border-divider text-silver-dim hover:border-gold/50 hover:text-gold'
            }`}
        >
          {{ fr: 'Réserver ce véhicule', en: 'Book this vehicle', ru: 'Забронировать', ro: 'Rezervați vehiculul' }[lang] ?? 'Réserver ce véhicule'}
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
            <path fillRule="evenodd" d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z" clipRule="evenodd"/>
          </svg>
        </a>
      </div>
    </article>
  )
}

// Spec item inline
function Spec({ icon, value }) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-silver-dim font-sans">
      {icon === 'person'
        ? <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-gold/50" fill="currentColor">
            <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-7 9v-1a7 7 0 0114 0v1H1z"/>
          </svg>
        : <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-gold/50" fill="currentColor">
            <path d="M5 4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V5a1 1 0 00-1-1H5zM3 5a3 3 0 013-3h4a3 3 0 013 3v6a3 3 0 01-3 3H6a3 3 0 01-3-3V5z"/>
          </svg>
      }
      {value}
    </span>
  )
}
