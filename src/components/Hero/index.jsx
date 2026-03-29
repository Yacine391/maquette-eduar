// ── Hero — Section plein écran premium ──────────────────────────────
// MAQUETTE CDG TRANSFERT VTC
// Design : fond multi-couches, titre Cormorant Garamond, stats bar,
// éléments décoratifs dorés animés.
// ────────────────────────────────────────────────────────────────────

// Stats simulées — chiffres fictifs pour la maquette
const STATS = [
  { value: '15+', label: { fr: "Ans d'expérience", en: 'Years experience', ru: 'Лет опыта' } },
  { value: '50K+', label: { fr: 'Transferts réalisés', en: 'Transfers completed', ru: 'Трансферов' } },
  { value: '98%', label: { fr: 'Taux de satisfaction', en: 'Satisfaction rate', ru: 'Удовлетворённость' } },
  { value: '24/7', label: { fr: 'Disponibilité', en: 'Availability', ru: 'Доступность' } },
]

export default function Hero({ t, lang }) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28">

      {/* ── Fond : multi-couches radial + diagonal ── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Couche base */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, #0d0c0a 0%, #050507 45%, #080610 100%)',
        }} />
        {/* Tache lumineuse dorée haut-droite */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vh]" style={{
          background: 'radial-gradient(ellipse 70% 60% at 80% 10%, rgba(197,160,89,0.07) 0%, transparent 70%)',
        }} />
        {/* Tache lumineuse bas-gauche */}
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh]" style={{
          background: 'radial-gradient(ellipse 60% 50% at 10% 90%, rgba(197,160,89,0.04) 0%, transparent 70%)',
        }} />
        {/* Lignes diagonales fines */}
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #C5A059 0px, #C5A059 1px,
            transparent 1px, transparent 60px
          )`,
        }} />
        {/* Masque bas vers le contenu suivant */}
        <div className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to bottom, transparent, #050507)' }}
        />
      </div>

      {/* ── Éléments décoratifs dorés ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Ligne verticale gauche */}
        <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        {/* Ligne verticale droite */}
        <div className="absolute right-8 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        {/* Cercle décoratif flottant */}
        <div className="absolute top-1/4 right-[15%] w-32 h-32 rounded-full border border-gold/10 animate-float hidden lg:block" />
        <div className="absolute top-1/4 right-[15%] w-20 h-20 rounded-full border border-gold/15 animate-float hidden lg:block"
          style={{ animationDelay: '-2s', top: 'calc(25% + 24px)', right: 'calc(15% + 24px)' }} />
      </div>

      {/* ── Contenu principal ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8 animate-fade-up">
            <div className="h-px w-12 bg-gold/60 animate-line-grow" />
            <p className="section-eyebrow mb-0">CDG TRANSFERT VTC</p>
          </div>

          {/* Titre principal — Cormorant Garamond ultra-luxe */}
          <h1 className="font-serif text-display text-offwhite mb-6 animate-fade-up delay-100">
            {t('hero_headline')
              .split(' ')
              .map((word, i) => (
                <span key={i} className={i % 3 === 2 ? 'italic text-gold' : ''}>
                  {word}{' '}
                </span>
              ))
            }
          </h1>

          {/* Sous-titre */}
          <p className="font-sans text-lg md:text-xl text-silver font-light leading-relaxed mb-10 max-w-xl animate-fade-up delay-200">
            {t('hero_sub')}
          </p>

          {/* CTA group */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up delay-300">
            <a href="#booking" className="btn-primary">
              {t('hero_cta')}
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#fleet" className="btn-outline py-4 px-8">
              {lang === 'ru' ? 'Наш автопарк' : lang === 'en' ? 'Discover our fleet' : 'Découvrir la flotte'}
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="relative z-10 mt-20 md:mt-24 border-t border-divider animate-fade-up delay-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-divider">
            {STATS.map(({ value, label }, i) => (
              <div key={i} className="py-8 px-6 text-center md:text-left group">
                <p className="font-serif text-4xl font-bold text-gold mb-1 group-hover:text-gold-hover transition-colors duration-300">
                  {value}
                </p>
                <p className="text-xs text-silver tracking-wide font-sans">
                  {label[lang] ?? label.fr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Flèche de scroll ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30 animate-float">
        <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
        <svg viewBox="0 0 10 6" className="w-2.5 text-gold" fill="currentColor">
          <path d="M0 0l5 6 5-6z" />
        </svg>
      </div>
    </section>
  )
}
