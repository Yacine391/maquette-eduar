// ── WhyUs — Section "Pourquoi Nous" (Trust & Authority) ─────────────
// MAQUETTE CDG TRANSFERT VTC
// Skill recommendation : Trust & Authority pattern → credentials,
// badges, expert signals. Conversion avant les tarifs.
// ────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: { fr: 'Ponctualité garantie', en: 'Punctuality guaranteed', ru: 'Гарантия пунктуальности', ro: 'Punctualitate garantată' },
    desc: {
      fr: 'Suivi en temps réel, 30 minutes d\'avance systématique. Aucune attente.',
      en: 'Real-time tracking, 30 minutes early every time. Zero waiting.',
      ru: 'Отслеживание в реальном времени, приезд за 30 минут. Никакого ожидания.',
      ro: 'Urmărire în timp real, 30 minute avans sistematic. Nicio așteptare.',
    },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: { fr: 'Discrétion absolue', en: 'Absolute discretion', ru: 'Полная конфиденциальность', ro: 'Discreție absolută' },
    desc: {
      fr: 'Confidentialité professionnelle, véhicules banalisés sur demande.',
      en: 'Professional confidentiality, unmarked vehicles on request.',
      ru: 'Профессиональная конфиденциальность, автомобили без опознавательных знаков.',
      ro: 'Confidențialitate profesională, vehicule discrete la cerere.',
    },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: { fr: 'Excellence & Luxe', en: 'Excellence & Luxury', ru: 'Превосходство и роскошь', ro: 'Excelență & Lux' },
    desc: {
      fr: 'Flotte Mercedes haut de gamme, chauffeurs en tenue soignée, eau minérale offerte.',
      en: 'Premium Mercedes fleet, well-dressed chauffeurs, complimentary mineral water.',
      ru: 'Автопарк Mercedes premium, элегантные водители, бесплатная минеральная вода.',
      ro: 'Flotă Mercedes premium, șoferi în ținută elegantă, apă minerală oferită.',
    },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18-3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6m18 3H3" />
      </svg>
    ),
    title: { fr: 'Tarifs transparents', en: 'Transparent pricing', ru: 'Прозрачные тарифы', ro: 'Tarife transparente' },
    desc: {
      fr: 'Prix fixés à l\'avance, aucune surprise. Facturation électronique immédiate.',
      en: 'Fixed price in advance, no surprises. Instant electronic invoicing.',
      ru: 'Фиксированные цены, никаких сюрпризов. Моментальная электронная фактура.',
      ro: 'Prețuri fixe în avans, nicio surpriză. Facturare electronică imediată.',
    },
  },
]

export default function WhyUs({ lang }) {
  const titleMap = {
    fr: 'Pourquoi Nous Choisir',
    en: 'Why Choose Us',
    ru: 'Почему выбирают нас',
    ro: 'De Ce Să Ne Alegeți',
  }
  const eyebrowMap = {
    fr: 'Notre Engagement',
    en: 'Our Commitment',
    ru: 'Наши обязательства',
    ro: 'Angajamentul Nostru',
  }

  return (
    <section className="py-section px-6 bg-canvas-2/40 relative overflow-hidden">

      {/* Décoration fond */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Titre */}
        <div className="text-center mb-16">
          <p className="section-eyebrow">{eyebrowMap[lang] ?? eyebrowMap.fr}</p>
          <h2 className="section-title">{titleMap[lang] ?? titleMap.fr}</h2>
          <div className="section-divider">
            <div className="h-px w-10 bg-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            <div className="h-px w-10 bg-gold/30" />
          </div>
        </div>

        {/* Grille 4 colonnes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-divider">
          {PILLARS.map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className={`p-8 group hover:bg-gold/[0.03] transition-all duration-300
                ${i < PILLARS.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-divider' : ''}
                ${i === 1 ? 'border-b sm:border-b-0' : ''}
                ${i === 2 ? 'lg:border-b-0 sm:border-b border-b border-divider' : ''}
              `}
            >
              {/* Icône */}
              <div className="text-gold/50 group-hover:text-gold mb-5 transition-colors duration-300">
                {icon}
              </div>
              {/* Titre */}
              <h3 className="font-serif text-xl text-offwhite mb-3 group-hover:text-gold transition-colors duration-300">
                {title[lang] ?? title.fr}
              </h3>
              {/* Description */}
              <p className="text-sm text-silver font-sans font-light leading-relaxed">
                {desc[lang] ?? desc.fr}
              </p>
              {/* Gold line bottom sur hover */}
              <div className="mt-6 h-px w-0 group-hover:w-10 bg-gold transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
