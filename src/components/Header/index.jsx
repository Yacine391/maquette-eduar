// ── Header — Navigation premium avec glassmorphism ───────────────────
// MAQUETTE CDG TRANSFERT VTC
// Design : barre supérieure info + nav principale avec backdrop-blur
// ────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'
import logo from '../../assets/logo.png'

const LANGS = ['FR', 'EN', 'RU']

export default function Header({ t, lang, setLang }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeNav, setActiveNav] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { key: 'nav_home',    href: '#hero',    id: 'hero'    },
    { key: 'nav_fleet',   href: '#fleet',   id: 'fleet'   },
    { key: 'nav_booking', href: '#booking', id: 'booking' },
    { key: 'nav_contact', href: '#contact', id: 'contact' },
  ]

  return (
    <>
      {/* ── Barre info supérieure ── */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'opacity-100'}`}
      >
        <div className="bg-canvas-2/90 border-b border-divider px-6 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6 text-[10px] tracking-widest text-silver-dim uppercase">
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold inline-block" />
                Disponible 24h/24 · 7j/7
              </span>
              <span className="hidden sm:block">+33 1 XX XX XX XX</span>
            </div>
            {/* Sélecteur langue dans la top bar */}
            <div className="flex items-center gap-1">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l.toLowerCase())}
                  className={`px-2.5 py-1 text-[10px] font-semibold tracking-widest transition-all duration-200
                    ${lang === l.toLowerCase()
                      ? 'text-gold border-b border-gold'
                      : 'text-silver-dim hover:text-silver'
                    }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation principale ── */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500
          ${scrolled ? 'top-0' : 'top-[37px]'}
          ${scrolled
            ? 'bg-canvas/90 backdrop-blur-md border-b border-divider shadow-2xl shadow-black/50'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── Logo ── */}
            <a href="#hero" className="flex items-center gap-3 group flex-shrink-0">
              <img src={logo} alt="CDG Transfert VTC" className="h-8 md:h-10 w-auto object-contain" />
              <div className="hidden sm:block">
                <p className="font-serif text-base font-semibold tracking-[0.2em] text-gold group-hover:text-gold-hover transition-colors duration-300 leading-none">
                  CDG TRANSFERT
                </p>
                <p className="text-[9px] tracking-[0.4em] text-silver-dim uppercase mt-0.5">VTC Premium</p>
              </div>
            </a>

            {/* ── Nav desktop ── */}
            <nav className="hidden md:flex items-center gap-8" role="navigation">
              {navLinks.map(({ key, href, id }) => (
                <a
                  key={key}
                  href={href}
                  onClick={() => setActiveNav(id)}
                  className={`relative text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 py-1
                    ${activeNav === id ? 'text-gold' : 'text-silver hover:text-offwhite'}
                    group`}
                >
                  {t(key)}
                  {/* Underline animée */}
                  <span className={`absolute bottom-0 left-0 right-0 h-px bg-gold transition-transform duration-300 origin-left
                    ${activeNav === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  />
                </a>
              ))}
            </nav>

            {/* ── CTA + Burger ── */}
            <div className="flex items-center gap-4">
              <a href="#booking" className="hidden md:inline-flex btn-primary py-2.5 px-6">
                {t('hero_cta')}
              </a>
              {/* Langue desktop (si déjà scrollé et top bar invisible) */}
              {scrolled && (
                <div className="hidden md:flex items-center gap-1 border-l border-divider pl-4">
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l.toLowerCase())}
                      className={`px-2 py-1 text-[10px] font-semibold tracking-widest rounded-sm transition-all duration-200
                        ${lang === l.toLowerCase() ? 'bg-gold text-canvas' : 'text-silver-dim hover:text-silver'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
              {/* Burger mobile */}
              <button
                className="md:hidden p-2 flex flex-col gap-[5px]"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
                aria-expanded={menuOpen}
              >
                <span className={`block w-6 h-0.5 bg-offwhite/80 transition-all duration-300 origin-center
                  ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block w-6 h-0.5 bg-offwhite/80 transition-all duration-300
                  ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-offwhite/80 transition-all duration-300 origin-center
                  ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Menu mobile ── */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden
          ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="bg-canvas-2/98 border-t border-divider px-6 py-6 flex flex-col gap-5">
            {navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-silver hover:text-gold transition-colors duration-300"
              >
                {t(key)}
              </a>
            ))}
            <div className="pt-4 border-t border-divider flex items-center gap-3">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l.toLowerCase()); setMenuOpen(false) }}
                  className={`px-3 py-1.5 text-xs font-semibold tracking-widest transition-all duration-200
                    ${lang === l.toLowerCase() ? 'bg-gold text-canvas' : 'border border-divider text-silver'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
