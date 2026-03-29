// ── Contact — Téléphone, email, description ──────────────────────────
// Icônes SVG inline (pas de dépendance externe).
// ────────────────────────────────────────────────────────────────────

export default function Contact({ t }) {
  const items = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
      label: t('contact_phone'),
      value: '+33 1 XX XX XX XX',
      href:  'tel:+33100000000',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
      label: t('contact_email'),
      value: 'contact@cdg-transfert.fr',
      href:  'mailto:contact@cdg-transfert.fr',
    },
  ]

  return (
    <section id="contact" className="py-section px-6">
      <div className="max-w-4xl mx-auto">
        {/* ── Titre ── */}
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Contact</p>
          <h2 className="font-serif text-4xl md:text-5xl text-offwhite">{t('contact_title')}</h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-12 bg-gold/40" />
            <div className="w-1 h-1 rounded-full bg-gold/60" />
            <div className="h-px w-12 bg-gold/40" />
          </div>
        </div>

        {/* ── Description ── */}
        <p className="text-center text-silver text-lg leading-relaxed mb-14 max-w-2xl mx-auto">
          {t('contact_desc')}
        </p>

        {/* ── Cartes contact ── */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {items.map(({ icon, label, value, href }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-4 px-8 py-6 border border-zinc-800
                hover:border-gold/50 transition-all duration-300 group
                bg-zinc-900/40 rounded-sm"
            >
              <span className="text-gold/60 group-hover:text-gold transition-colors duration-300">
                {icon}
              </span>
              <div>
                <p className="text-xs text-silver tracking-widest uppercase mb-1">{label}</p>
                <p className="text-offwhite font-medium group-hover:text-gold transition-colors duration-300">
                  {value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
