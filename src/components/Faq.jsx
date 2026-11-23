// ── FAQ affichée (questions h3 + réponses) ───────────────────────────
// Le même texte alimente le JSON-LD FAQPage (src/seo/schema.js).
// ────────────────────────────────────────────────────────────────────
export default function Faq({ items, title, eyebrow, compact = false }) {
  return (
    <section id="faq" className={compact ? 'py-12 md:py-16 px-6' : 'py-section px-6'} aria-labelledby="faq-title">
      <div className={compact ? 'max-w-3xl mx-auto' : 'max-w-4xl mx-auto'}>
        {compact ? (
          <h2 id="faq-title" className="font-serif text-3xl md:text-4xl text-offwhite mb-8">{title}</h2>
        ) : (
          <div className="text-center mb-14">
            {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
            <h2 id="faq-title" className="section-title">{title}</h2>
            <div className="section-divider">
              <div className="h-px w-10 bg-gold/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
              <div className="h-px w-10 bg-gold/30" />
            </div>
          </div>
        )}
        <div className="divide-y divide-divider border-y border-divider">
          {items.map(({ q, a }) => (
            <div key={q} className="py-6">
              <h3 className="font-serif text-xl md:text-2xl text-offwhite mb-3">{q}</h3>
              <p className="text-silver font-sans font-light leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
