// ── Reviews — « Votre avis compte » ─────────────────────────────────
// Section sobre invitant les clients à laisser un avis Google.
// Aucun avis ni note affichés sur le site : seul un bouton renvoie
// directement vers la page « Laisser un avis » de la fiche Google.
// ────────────────────────────────────────────────────────────────────

// Lien officiel « Laisser un avis » de la fiche Google de CDG Transfert VTC
const GOOGLE_REVIEW_URL = 'https://g.page/r/CfqSDSmBkk6BEBM/review'

export default function Reviews({ t }) {
  return (
    <section
      id="avis"
      className="py-section px-6"
      aria-labelledby="reviews-title"
    >
      <div className="max-w-3xl mx-auto text-center">

        {/* Titre */}
        <h2 id="reviews-title" className="section-title">
          {t('reviews_title')}
        </h2>
        <div className="section-divider">
          <div className="h-px w-10 bg-gold/30" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
          <div className="h-px w-10 bg-gold/30" />
        </div>

        {/* Texte d'invitation */}
        <p className="mt-8 text-silver text-base md:text-lg font-light leading-relaxed">
          {t('reviews_subtitle')}
        </p>

        {/* CTA — laisser un avis Google */}
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline mt-10"
        >
          {/* Icône Google (monochrome) */}
          <svg viewBox="0 0 48 48" className="w-4 h-4" aria-hidden="true">
            <path fill="currentColor" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
          </svg>
          {t('reviews_cta')}
        </a>

      </div>
    </section>
  )
}
