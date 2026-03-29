// ── Footer — Premium 3 colonnes ──────────────────────────────────────
// MAQUETTE CDG TRANSFERT VTC
// ────────────────────────────────────────────────────────────────────
import logo from '../../assets/logo.png'

export default function Footer({ t, lang }) {
  const year = new Date().getFullYear()

  const navLinks = [
    { key: 'nav_home',    href: '#hero'    },
    { key: 'nav_fleet',   href: '#fleet'   },
    { key: 'nav_booking', href: '#booking' },
    { key: 'nav_contact', href: '#contact' },
  ]

  const legalText = {
    fr: ['Mentions légales', 'Politique de confidentialité', 'CGV'],
    en: ['Legal notice', 'Privacy policy', 'T&C'],
    ru: ['Правовая информация', 'Конфиденциальность', 'Условия'],
  }

  return (
    <footer className="border-t border-divider">

      {/* ── Corps du footer ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Colonne 1 : Marque */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="CDG Transfert VTC" className="h-9 w-auto opacity-80" />
              <div>
                <p className="font-serif text-sm font-semibold tracking-[0.2em] text-gold leading-none">CDG TRANSFERT</p>
                <p className="text-[9px] tracking-[0.4em] text-silver-dim uppercase mt-0.5">VTC Premium</p>
              </div>
            </div>
            <p className="text-sm text-silver font-sans font-light leading-relaxed">
              {t('contact_desc')}
            </p>
            {/* Ligne gold */}
            <div className="mt-5 h-px w-10 bg-gold/40" />
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-silver-dim mb-5">
              {lang === 'ru' ? 'Навигация' : lang === 'en' ? 'Navigation' : 'Navigation'}
            </p>
            <nav className="space-y-3" role="navigation" aria-label="Footer navigation">
              {navLinks.map(({ key, href }) => (
                <a key={key} href={href}
                  className="flex items-center gap-2 text-sm text-silver hover:text-gold transition-colors duration-300 group"
                >
                  <span className="w-3 h-px bg-silver-dim group-hover:bg-gold group-hover:w-5 transition-all duration-300" />
                  {t(key)}
                </a>
              ))}
            </nav>
          </div>

          {/* Colonne 3 : Contact rapide */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-silver-dim mb-5">
              {lang === 'ru' ? 'Контакты' : lang === 'en' ? 'Contact' : 'Contact rapide'}
            </p>
            <div className="space-y-3">
              <p className="text-sm text-silver font-sans">+33 1 XX XX XX XX</p>
              <p className="text-sm text-silver font-sans">contact@cdg-transfert.fr</p>
              <p className="text-sm text-silver font-sans">Paris, Île-de-France</p>
            </div>
            {/* CTA footer */}
            <a href="#booking" className="inline-block mt-6 btn-primary py-2.5 px-6 text-xs">
              {t('hero_cta')}
            </a>
          </div>
        </div>
      </div>

      {/* ── Barre légale ── */}
      <div className="border-t border-divider">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-silver-dim/50 font-sans">
            © {year} CDG TRANSFERT VTC — {t('footer_rights')}
          </p>
          <div className="flex items-center gap-4">
            {(legalText[lang] ?? legalText.fr).map((item) => (
              <button key={item} className="text-[11px] text-silver-dim/50 hover:text-gold transition-colors duration-300">
                {item}
              </button>
            ))}
          </div>
        </div>
        {/* Note maquette */}
        <div className="pb-3 text-center">
          <p className="text-[10px] italic text-silver-dim/30">{t('footer_mockup')}</p>
        </div>
      </div>

    </footer>
  )
}
