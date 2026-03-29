// ── App — Composition de la page ────────────────────────────────────
// MAQUETTE CDG TRANSFERT VTC
// Ordre DOM (CLAUDE.md + section WhyUs ajoutée post-Fleet) :
//   Header → Hero → Booking → Fleet → WhyUs → Rates → Contact → Footer
// ────────────────────────────────────────────────────────────────────
import { useTranslation } from './hooks/useTranslation'
import Header        from './components/Header'
import Hero          from './components/Hero'
import BookingModule from './components/BookingModule'
import Fleet         from './components/Fleet'
import WhyUs         from './components/WhyUs'
import Rates         from './components/Rates'
import Contact       from './components/Contact'
import Footer        from './components/Footer'

export default function App() {
  const { t, lang, setLang } = useTranslation()

  return (
    <div className="min-h-screen bg-canvas text-offwhite font-sans overflow-x-hidden">

      {/* 1 · Header sticky avec barre info */}
      <Header t={t} lang={lang} setLang={setLang} />

      {/* 2 · Hero plein écran + stats bar */}
      <Hero t={t} lang={lang} />

      {/* 3 · Module de réservation ⭐ */}
      <BookingModule t={t} lang={lang} />

      {/* 4 · Flotte (ordre strict CLAUDE.md) */}
      <Fleet t={t} lang={lang} />

      {/* 5 · Pourquoi nous (Trust & Authority — skill recommendation) */}
      <WhyUs lang={lang} />

      {/* 6 · Tarifs */}
      <Rates t={t} lang={lang} />

      {/* 7 · Contact */}
      <Contact t={t} lang={lang} />

      {/* 8 · Footer */}
      <Footer t={t} lang={lang} />

    </div>
  )
}
