// ── Lightbox — Galerie photo plein écran ─────────────────────────────
// CDG TRANSFERT VTC — site en production (cdgtransfertvtc.fr)
//
// Composant réutilisable : affiche les photos d'un véhicule en plein
// écran, avec navigation flèches gauche/droite, miniatures, clavier
// (← → Échap), swipe tactile sur mobile et compteur "2 / 4".
//
// IMPORTANT : le rendu passe par un PORTAL sur <body>. Les cartes de la
// flotte utilisent `hover:scale-[1.02]` (transform), ce qui casserait un
// `position: fixed` rendu à l'intérieur de la carte.
// ────────────────────────────────────────────────────────────────────
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// Libellés multilingues (pas de lib i18n, simple objet JS)
const LABELS = {
  fr: { close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante', of: 'sur' },
  en: { close: 'Close',  prev: 'Previous photo',   next: 'Next photo',     of: 'of' },
  ru: { close: 'Закрыть', prev: 'Предыдущее фото', next: 'Следующее фото', of: 'из' },
  ro: { close: 'Închide', prev: 'Fotografia anterioară', next: 'Fotografia următoare', of: 'din' },
}

export default function Lightbox({ images, startIndex = 0, title, lang = 'fr', onClose }) {
  const [index, setIndex] = useState(startIndex)
  const dialogRef = useRef(null)
  const touchStart = useRef(null)

  const count = images.length
  const l = LABELS[lang] ?? LABELS.fr
  const current = images[index]

  // Navigation circulaire (dernière → première)
  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + count) % count),
    [count],
  )

  // ── Clavier : ← → Échap + piège de focus (Tab reste dans la modale) ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')      { onClose() }
      else if (e.key === 'ArrowRight') { go(1) }
      else if (e.key === 'ArrowLeft')  { go(-1) }
      else if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll('button')
        if (!focusables?.length) return
        const first = focusables[0]
        const last  = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // ── Blocage du scroll de la page tant que la galerie est ouverte ──
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => { document.body.style.overflow = previous }
  }, [])

  // ── Préchargement des photos voisines (navigation instantanée) ──
  useEffect(() => {
    ;[index + 1, index - 1].forEach((i) => {
      const img = images[(i + count) % count]
      if (img) { const preload = new window.Image(); preload.src = img.src }
    })
  }, [index, images, count])

  // ── Swipe tactile (mobile) ──
  const onTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e) => {
    if (!touchStart.current) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    // Seuil 50px + geste majoritairement horizontal (sinon = scroll)
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
    touchStart.current = null
  }

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-[100] flex flex-col bg-canvas animate-fade-in outline-none"
    >
      {/* ── Barre haute : titre + compteur + fermeture ── */}
      <div
        className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <p className="font-serif text-lg sm:text-xl text-offwhite truncate">{title}</p>
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-gold/70 mt-0.5">
            {index + 1} {l.of} {count}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={l.close}
          className="flex-shrink-0 w-11 h-11 flex items-center justify-center
            border border-divider text-silver hover:text-canvas hover:bg-gold hover:border-gold
            transition-all duration-300"
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
            <path d="M2.3 1.3 8 7l5.7-5.7 1 1L9 8l5.7 5.7-1 1L8 9l-5.7 5.7-1-1L7 8 1.3 2.3z" />
          </svg>
        </button>
      </div>

      {/* ── Zone image + flèches (clic sur le fond noir = fermeture) ── */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="max-h-full max-w-full w-auto h-auto object-contain
            animate-fade-in select-none"
          draggable={false}
        />

        {count > 1 && (
          <>
            <Arrow side="left"  label={l.prev} onClick={() => go(-1)} />
            <Arrow side="right" label={l.next} onClick={() => go(1)} />
          </>
        )}
      </div>

      {/* ── Légende + miniatures ── */}
      <div
        className="flex-shrink-0 px-4 sm:px-6 pt-3 pb-5"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-xs sm:text-sm text-silver font-light mb-3">
          {current.alt}
        </p>

        {count > 1 && (
          <div className="flex gap-2 justify-start sm:justify-center overflow-x-auto pb-1 -mx-1 px-1">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${img.alt} (${i + 1} ${l.of} ${count})`}
                aria-current={i === index}
                className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 overflow-hidden border
                  transition-all duration-300
                  ${i === index
                    ? 'border-gold opacity-100'
                    : 'border-divider opacity-50 hover:opacity-90 hover:border-gold/40'}`}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

// ── Flèche de navigation (gauche / droite) ────────────────────────────
function Arrow({ side, label, onClick }) {
  const isLeft = side === 'left'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 z-10
        ${isLeft ? 'left-1 sm:left-4' : 'right-1 sm:right-4'}
        w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center
        border border-gold/30 bg-canvas/70 backdrop-blur-sm text-gold
        hover:bg-gold hover:text-canvas hover:border-gold
        active:scale-95 transition-all duration-300`}
    >
      <svg viewBox="0 0 16 16" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor">
        {isLeft
          ? <path fillRule="evenodd" d="M15 8a.5.5 0 01-.5.5H2.707l3.147 3.146a.5.5 0 01-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 11.708.708L2.707 7.5H14.5A.5.5 0 0115 8z" clipRule="evenodd" />
          : <path fillRule="evenodd" d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z" clipRule="evenodd" />
        }
      </svg>
    </button>
  )
}
