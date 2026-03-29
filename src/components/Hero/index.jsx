// ── Hero — Section plein écran ───────────────────────────────────────
// Fond : CSS gradient (pas d'image copyrigthée). Effet de profondeur
// simulé avec plusieurs couches de gradient radial.
// ────────────────────────────────────────────────────────────────────

export default function Hero({ t }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Fond gradient luxury ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, #1a1508 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 100%, #0d0b06 0%, transparent 60%),
            linear-gradient(160deg, #0f0e0a 0%, #0A0A0C 40%, #080608 100%)
          `,
        }}
      />

      {/* ── Lignes dorées décoratives ── */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              #C5A059 0px, #C5A059 1px,
              transparent 1px, transparent 80px
            )
          `,
        }}
      />

      {/* ── Contenu centré ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p className="text-gold text-sm font-medium tracking-[0.4em] uppercase mb-6 opacity-80">
          CDG TRANSFERT VTC
        </p>

        {/* Titre principal */}
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight text-offwhite mb-8">
          {t('hero_headline')}
        </h1>

        {/* Séparateur doré */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gold/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="h-px w-16 bg-gold/60" />
        </div>

        {/* Sous-titre */}
        <p className="text-silver text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          {t('hero_sub')}
        </p>

        {/* CTA */}
        <a
          href="#booking"
          className="inline-block px-10 py-4 bg-gold text-canvas font-semibold text-sm tracking-widest uppercase
            rounded-none border border-gold
            hover:bg-gold-hover hover:border-gold-hover
            transition-all duration-300 ease-in-out"
        >
          {t('hero_cta')}
        </a>
      </div>

      {/* ── Flèche de scroll ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-12 bg-gold/60" />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-gold">
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </section>
  )
}
