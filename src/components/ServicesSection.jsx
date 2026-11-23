// ── Accueil : « Nos services » (liens vers les 7 pages services) ──────
// CDG TRANSFERT VTC — maillage interne depuis l'accueil.
// ────────────────────────────────────────────────────────────────────
import { UI } from '../content/ui'
import { SERVICE_META_LIST } from '../content/services/meta'
import { pagePath } from '../routes'

export default function ServicesSection({ lang }) {
  const ui = UI[lang]
  return (
    <section id="services" className="py-section px-6" aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-eyebrow">{ui.services}</p>
          <h2 id="services-title" className="section-title">{ui.servicesTitle}</h2>
          <div className="section-divider">
            <div className="h-px w-10 bg-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            <div className="h-px w-10 bg-gold/30" />
          </div>
          <p className="mt-8 text-silver font-sans font-light leading-relaxed max-w-2xl mx-auto">{ui.servicesIntro}</p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-divider border border-divider">
          {SERVICE_META_LIST.map((s) => {
            const c = s.i18n[lang]
            return (
              <li key={s.slug} className="bg-canvas">
                <a href={pagePath(lang, s.slug)} className="group flex flex-col h-full p-7 hover:bg-gold/[0.03] transition-colors duration-300">
                  <h3 className="font-serif text-xl text-offwhite mb-3 group-hover:text-gold transition-colors duration-300">{c.nav}</h3>
                  <p className="text-sm text-silver font-sans font-light leading-relaxed mb-5 flex-1">{c.card}</p>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-gold">
                    {ui.learnMore} <span aria-hidden="true">→</span>
                  </span>
                </a>
              </li>
            )
          })}
          {/* 8e carte : tout autre trajet (longue distance…) sur devis */}
          <li className="bg-canvas">
            <a href="#booking" className="group flex flex-col h-full p-7 hover:bg-gold/[0.03] transition-colors duration-300">
              <h3 className="font-serif text-xl text-offwhite mb-3 group-hover:text-gold transition-colors duration-300">{ui.otherTitle}</h3>
              <p className="text-sm text-silver font-sans font-light leading-relaxed mb-5 flex-1">{ui.otherText}</p>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-gold">
                {ui.otherCta} <span aria-hidden="true">→</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
