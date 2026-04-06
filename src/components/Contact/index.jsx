// ── Contact — Section contact deux colonnes ──────────────────────────
// MAQUETTE CDG TRANSFERT VTC
// Design : layout asymétrique — info à gauche, décoration géométrique
// dorée à droite. Icônes SVG inline accessibles (aria-hidden).
// ────────────────────────────────────────────────────────────────────

export default function Contact({ t }) {
  const items = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
      label:   t('contact_phone'),
      value:   '+33 6 65 69 96 78',
      href:    'tel:+33665699678',
      detail:  { fr: 'Disponible 24h/24', en: 'Available 24/7', ru: 'Доступно 24/7', ro: 'Disponibil 24/24' },
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
      label:  t('contact_email'),
      value:  'contact@cdg-transfert.fr',
      href:   'mailto:contact@cdg-transfert.fr',
      detail: { fr: 'Réponse sous 1h', en: 'Response within 1h', ru: 'Ответ за 1ч', ro: 'Răspuns în 1h' },
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
        </svg>
      ),
      label:  { fr: 'Zone d\'intervention', en: 'Coverage area', ru: 'Зона обслуживания', ro: 'Zonă de acoperire' },
      value:  'Île-de-France',
      href:   '#',
      detail: { fr: 'Paris + tous aéroports', en: 'Paris + all airports', ru: 'Париж + аэропорты', ro: 'Paris + toate aeroporturile' },
    },
  ]

  return (
    <section id="contact" className="py-section px-6 relative overflow-hidden">

      {/* Fond subtle */}
      <div className="absolute inset-0 bg-canvas-2/30" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Colonne gauche : infos ── */}
          <div>
            <p className="section-eyebrow">Contact</p>
            <h2 className="section-title mb-6">{t('contact_title')}</h2>
            <p className="text-silver font-sans font-light leading-relaxed mb-12 max-w-md">
              {t('contact_desc')}
            </p>

            {/* Cartes contact */}
            <div className="space-y-4">
              {items.map(({ icon, label, value, href, detail }) => {
                const l = typeof label === 'string' ? label : label?.fr ?? ''
                const labelText = typeof label === 'object' ? (label[document?.documentElement?.lang] ?? label.fr) : label
                return (
                  <a
                    key={href}
                    href={href}
                    className="flex items-start gap-4 p-5 border border-divider
                      hover:border-gold/30 hover:bg-gold/[0.03]
                      transition-all duration-300 group"
                  >
                    <div className="mt-0.5 p-2 border border-divider group-hover:border-gold/30 text-gold/50 group-hover:text-gold transition-all duration-300 flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-silver-dim mb-0.5 font-sans">
                        {typeof label === 'object' ? label.fr : label}
                      </p>
                      <p className="text-offwhite font-sans font-medium group-hover:text-gold transition-colors duration-300">
                        {value}
                      </p>
                      <p className="text-xs text-silver-dim mt-0.5 font-sans">
                        {typeof detail === 'object' ? detail.fr : detail}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* ── Colonne droite : décoration géométrique ── */}
          <div className="hidden lg:flex items-center justify-center relative min-h-80">
            {/* Composition géométrique gold */}
            <svg viewBox="0 0 400 400" className="w-full max-w-sm opacity-[0.15] text-gold" fill="none" stroke="currentColor">
              {/* Cercles concentriques */}
              <circle cx="200" cy="200" r="180" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="140" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="100" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="60"  strokeWidth="0.5" />
              {/* Croix centrale */}
              <line x1="200" y1="20"  x2="200" y2="380" strokeWidth="0.5" />
              <line x1="20"  y1="200" x2="380" y2="200" strokeWidth="0.5" />
              {/* Diagonales */}
              <line x1="73"  y1="73"  x2="327" y2="327" strokeWidth="0.5" />
              <line x1="327" y1="73"  x2="73"  y2="327" strokeWidth="0.5" />
              {/* Losange */}
              <polygon points="200,40 360,200 200,360 40,200" strokeWidth="1" />
            </svg>
            {/* Texte central */}
            <div className="absolute text-center">
              <p className="font-serif text-5xl font-bold text-gold/60 leading-none">CDG</p>
              <p className="text-[10px] tracking-[0.6em] text-gold/30 uppercase mt-1">Transfert VTC</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
