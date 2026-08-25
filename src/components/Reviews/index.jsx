// ── Reviews — Avis Google clients ────────────────────────────────────
// MAQUETTE : avis statiques hardcodés. Quand la fiche Google est créée,
// remplacer GOOGLE_PLACE_ID ci-dessous par le vrai Place ID.
// Lien pour trouver le Place ID : https://developers.google.com/maps/documentation/places/web-service/place-id
// ────────────────────────────────────────────────────────────────────

// ⚠️ REMPLACER PAR LE VRAI PLACE ID GOOGLE UNE FOIS LA FICHE CRÉÉE
const GOOGLE_PLACE_ID   = 'VOTRE_PLACE_ID_ICI'
const GOOGLE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`

// Avis fictifs pour la démo — remplacer par de vrais avis si souhaité
const SAMPLE_REVIEWS = [
  {
    id: 1,
    name: 'Sophie M.',
    avatar: 'SM',
    rating: 5,
    date: 'Mars 2025',
    text: 'Service impeccable pour notre transfert CDG. Le chauffeur était ponctuel, la voiture impeccable. Je recommande vivement pour tous vos déplacements professionnels.',
  },
  {
    id: 2,
    name: 'Thomas B.',
    avatar: 'TB',
    rating: 5,
    date: 'Février 2025',
    text: 'Excellent transfert Orly → Paris La Défense. Confort, ponctualité et discrétion. Notre équipe utilise CDG Transfert VTC pour tous nos voyages d\'affaires.',
  },
  {
    id: 3,
    name: 'Elena V.',
    avatar: 'EV',
    rating: 5,
    date: 'Janvier 2025',
    text: 'Очень профессиональный сервис. Водитель встретил нас в аэропорту с табличкой, помог с багажом. Рекомендую всем русскоязычным клиентам.',
  },
  {
    id: 4,
    name: 'Marc D.',
    avatar: 'MD',
    rating: 5,
    date: 'Décembre 2024',
    text: 'Le van Mercedes Classe V était parfait pour notre groupe de 6. Confortable, spacieux, chauffeur très courtois. Prix transparent, aucune surprise.',
  },
]

// Composant étoiles
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-4 h-4 ${i < count ? 'fill-[#F4B400]' : 'fill-[#333]'}`}
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews({ t }) {
  return (
    <section
      id="avis"
      className="py-24 px-6 bg-[#0D0D10]"
      aria-label="Avis clients"
    >
      <div className="max-w-6xl mx-auto">

        {/* En-tête section */}
        <div className="text-center mb-16">
          {/* Logo Google + badge note globale */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* Icône Google en SVG officielle (4 couleurs) */}
            <svg viewBox="0 0 48 48" className="w-8 h-8" aria-hidden="true">
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
              <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.2 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
              <path fill="#FBBC05" d="M24 46c5.6 0 10.3-1.8 13.7-5l-6.3-5.2C29.6 37.3 27 38 24 38c-6 0-10.6-3.8-12.3-9.1l-7 5.4C7.8 41.4 15.4 46 24 46z"/>
              <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.8 2.3-2.3 4.2-4.3 5.6l6.3 5.2C41.5 36.2 45 31 45 24c0-1.4-.2-2.7-.5-4z"/>
            </svg>
            <h2 className="font-serif text-3xl md:text-4xl text-offwhite">
              {t('reviews_title')}
            </h2>
          </div>

          {/* Note globale */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Stars count={5} />
            <span className="text-[#F4B400] font-bold text-lg">5.0</span>
            <span className="text-silver text-sm">(avis Google)</span>
          </div>

          <p className="text-silver text-lg">{t('reviews_subtitle')}</p>
        </div>

        {/* Grille d'avis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {SAMPLE_REVIEWS.map(review => (
            <article
              key={review.id}
              className="bg-[#141418] border border-[#1E1E24]
                         rounded-2xl p-6
                         hover:border-[#C5A059]/40
                         transition-colors duration-300"
            >
              {/* Auteur + date */}
              <div className="flex items-center gap-3 mb-4">
                {/* Avatar initiales */}
                <div
                  className="w-10 h-10 rounded-full bg-[#C5A059]/20
                              flex items-center justify-center
                              text-[#C5A059] font-bold text-sm flex-shrink-0"
                  aria-hidden="true"
                >
                  {review.avatar}
                </div>
                <div>
                  <p className="text-offwhite font-semibold text-sm leading-tight">
                    {review.name}
                  </p>
                  <p className="text-silver text-xs">{review.date}</p>
                </div>
                {/* Badge vérifié Google */}
                <div className="ml-auto flex items-center gap-1">
                  <svg viewBox="0 0 48 48" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                    <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                    <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.2 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
                    <path fill="#FBBC05" d="M24 46c5.6 0 10.3-1.8 13.7-5l-6.3-5.2C29.6 37.3 27 38 24 38c-6 0-10.6-3.8-12.3-9.1l-7 5.4C7.8 41.4 15.4 46 24 46z"/>
                    <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.8 2.3-2.3 4.2-4.3 5.6l6.3 5.2C41.5 36.2 45 31 45 24c0-1.4-.2-2.7-.5-4z"/>
                  </svg>
                  <span className="text-silver text-xs">{t('reviews_verified')}</span>
                </div>
              </div>

              {/* Étoiles */}
              <Stars count={review.rating} />

              {/* Texte */}
              <p className="mt-3 text-silver text-sm leading-relaxed">
                {review.text}
              </p>
            </article>
          ))}
        </div>

        {/* CTA — laisser un avis */}
        <div className="text-center">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4
                       border border-[#C5A059] text-[#C5A059]
                       rounded-full font-semibold text-sm tracking-wide
                       hover:bg-[#C5A059] hover:text-[#0A0A0C]
                       transition-all duration-300"
          >
            {/* Icône Google petite */}
            <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
              <path fill="currentColor" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
            </svg>
            {t('reviews_cta')}
          </a>
        </div>

      </div>
    </section>
  )
}
