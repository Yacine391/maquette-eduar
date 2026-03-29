// ── App — Composition de la page ────────────────────────────────────
// MAQUETTE CDG TRANSFERT VTC
// Ordre DOM strict (CLAUDE.md) :
//   Header → Hero → BookingModule → Fleet → Rates → Contact → Footer
// Le hook useTranslation est géré ici et passé en props à chaque composant.
// ────────────────────────────────────────────────────────────────────
import { useTranslation } from './hooks/useTranslation'
import Header       from './components/Header'
import Hero         from './components/Hero'
import BookingModule from './components/BookingModule'
import Fleet        from './components/Fleet'
import Rates        from './components/Rates'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

export default function App() {
  const { t, lang, setLang } = useTranslation()

  return (
    <div className="min-h-screen bg-canvas text-offwhite font-sans">
      {/* 1 · Header sticky */}
      <Header t={t} lang={lang} setLang={setLang} />

      {/* 2 · Hero plein écran */}
      <Hero t={t} lang={lang} />

      {/* 3 · Module de réservation (priorité absolue) */}
      <BookingModule t={t} lang={lang} />

      {/* 4 · Flotte */}
      <Fleet t={t} lang={lang} />

      {/* 5 · Tarifs */}
      <Rates t={t} lang={lang} />

      {/* 6 · Contact */}
      <Contact t={t} lang={lang} />

      {/* 7 · Footer */}
      <Footer t={t} lang={lang} />
    </div>
  )
}
