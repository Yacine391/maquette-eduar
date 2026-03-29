// ── Header — Logo + nav + sélecteur de langue ───────────────────────
// MAQUETTE : la navigation "scrolle" vers les ancres de la page.
// Le sélecteur de langue appelle setLang() depuis le hook useTranslation.
// ────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'
import logo from '../../assets/logo.png'

const LANGS = ['FR', 'EN', 'RU']

export default function Header({ t, lang, setLang }) {
  // Sticky avec fond opaque après 60px de scroll
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { key: 'nav_home',    href: '#hero' },
    { key: 'nav_fleet',   href: '#fleet' },
    { key: 'nav_booking', href: '#booking' },
    { key: 'nav_contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-canvas/95 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ── Logo + wordmark ── */}
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="CDG Transfert VTC logo"
            className="h-10 w-auto object-contain"
          />
          <span className="font-serif text-lg font-semibold tracking-widest text-gold group-hover:text-gold-hover transition-colors duration-300">
            CDG TRANSFERT VTC
          </span>
        </a>

        {/* ── Navigation desktop ── */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-sm font-medium tracking-wide text-offwhite/80 hover:text-gold transition-colors duration-300"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        {/* ── Sélecteur de langue + burger ── */}
        <div className="flex items-center gap-4">
          {/* Langue */}
          <div className="flex items-center gap-1">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l.toLowerCase())}
                className={`px-2 py-1 text-xs font-semibold tracking-widest rounded transition-all duration-300
                  ${lang === l.toLowerCase()
                    ? 'bg-gold text-canvas'
                    : 'text-silver hover:text-gold'
                  }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-offwhite transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-offwhite transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-offwhite transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Menu mobile ── */}
      {menuOpen && (
        <div className="md:hidden bg-canvas/98 border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-offwhite/80 hover:text-gold transition-colors duration-300"
            >
              {t(key)}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
