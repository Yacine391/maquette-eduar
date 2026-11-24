// ── Hero — Section plein écran premium ──────────────────────────────
// CDG TRANSFERT VTC — site en production (cdgtransfertvtc.fr)
// Design : fond multi-couches, titre Cormorant Garamond, stats bar,
// éléments décoratifs dorés animés. Aucun fondu au chargement : le
// contenu est visible dès le premier affichage (HTML pré-généré).
// ────────────────────────────────────────────────────────────────────

// Bandeau sous le hero : uniquement des informations confirmées par le
// client, aucun chiffre inventé. Cohérentes avec le reste du site :
// disponibilité 24/7, flotte (constants/vehicles.js), prix fixe péages
// inclus, suivi des arrivées et 1 h d'attente incluse (content/conditions.js).
const STATS = [
  {
    value: { fr: '24/7', en: '24/7', ru: '24/7', ro: '24/7' },
    label: { fr: 'Disponible 24h/24 – 7j/7', en: 'Available 24 hours a day, 7 days a week', ru: 'Круглосуточно, без выходных', ro: 'Disponibil 24h/24 – 7 zile din 7' },
  },
  {
    value: { fr: 'Mercedes & Tesla', en: 'Mercedes & Tesla', ru: 'Mercedes и Tesla', ro: 'Mercedes & Tesla' },
    label: { fr: 'Classe E, S, V et Tesla', en: 'E-Class, S-Class, V-Class and Tesla', ru: 'E-, S-, V-класс и Tesla', ro: 'Clasa E, S, V și Tesla' },
  },
  {
    value: { fr: 'Prix fixe', en: 'Fixed price', ru: 'Цена заранее', ro: 'Preț fix' },
    label: { fr: 'Péages inclus, confirmé avant la course', en: 'Tolls included, confirmed before the ride', ru: 'Платные дороги включены, цена до поездки', ro: 'Taxe de autostradă incluse, confirmat înainte' },
  },
  {
    value: { fr: 'Suivi de vol', en: 'Flight tracking', ru: 'Следим за рейсом', ro: 'Urmărire zbor' },
    label: { fr: 'Retard jamais facturé, 1 h d’attente incluse', en: 'Delays never charged, 1 h of waiting included', ru: 'Задержка не оплачивается, 1 час ожидания включён', ro: 'Întârzierea nu se facturează, 1 oră de așteptare inclusă' },
  },
]

export default function Hero({ t, lang }) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28">

      {/* ── Fond : multi-couches radial + diagonal ── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Couche base */}
        <div className="absolute inset-0 bg-hero-base" />
        {/* Tache lumineuse dorée haut-droite */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-hero-glow-tr" />
        {/* Tache lumineuse bas-gauche */}
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-hero-glow-bl" />
        {/* Lignes diagonales fines */}
        <div className="absolute inset-0 opacity-[0.035] bg-hero-lines" />
        {/* Masque bas vers le contenu suivant */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-fade-bottom" />
      </div>

      {/* ── Éléments décoratifs dorés ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Ligne verticale gauche */}
        <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        {/* Ligne verticale droite */}
        <div className="absolute right-8 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        {/* Cercle décoratif flottant */}
        <div className="absolute top-1/4 right-[15%] w-32 h-32 rounded-full border border-gold/10 animate-float hidden lg:block" />
        <div className="absolute w-20 h-20 rounded-full border border-gold/15 animate-float hidden lg:block hero-ring-inner" />
      </div>

      {/* ── Contenu principal ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl">

          {/* Eyebrow = H1 SEO (mots-clés : chauffeur privé VTC Paris, CDG, Orly).
              Même style visuel que l'ancien eyebrow : font-sans force la police
              du texte courant (index.css applique font-serif à tous les h1). */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-gold/60" />
            <h1 className="section-eyebrow mb-0 font-sans">{t('hero_h1')}</h1>
          </div>

          {/* Accroche visuelle — Cormorant Garamond ultra-luxe
              (balise <p> : le H1 de la page est l'eyebrow ci-dessus) */}
          <p className="font-serif text-display text-offwhite mb-6">
            {t('hero_headline')
              .split(' ')
              .map((word, i) => (
                <span key={i} className={i % 3 === 2 ? 'italic text-gold' : ''}>
                  {word}{' '}
                </span>
              ))
            }
          </p>

          {/* Sous-titre */}
          <p className="font-sans text-lg md:text-xl text-silver font-light leading-relaxed mb-10 max-w-xl">
            {t('hero_sub')}
          </p>

          {/* CTA group */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="#booking" className="btn-primary">
              {t('hero_cta')}
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#fleet" className="btn-outline py-4 px-8">
              {{ fr: 'Découvrir la flotte', en: 'Discover our fleet', ru: 'Наш автопарк', ro: 'Descoperiți flota' }[lang] ?? 'Découvrir la flotte'}
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="relative z-10 mt-20 md:mt-24 border-t border-divider">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-divider">
            {STATS.map(({ value, label }, i) => (
              <div key={i} className="py-8 px-6 text-center md:text-left group">
                <p className="font-serif text-2xl md:text-3xl font-bold text-gold mb-1 group-hover:text-gold-hover transition-colors duration-300">
                  {value[lang] ?? value.fr}
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
