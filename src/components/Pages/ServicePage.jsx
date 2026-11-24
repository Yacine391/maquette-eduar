// ── Page service (CDG, Orly, Beauvais, gares, Disneyland, mise à
// disposition, van) — métadonnées : src/content/services/meta.js,
// texte : src/content/services/pages/<slug>.js (prop body) ──────────────
// Structure : fil d'Ariane, H1, intro + bouton Réserver (haut), sections
// (tarifs du tableau, temps de trajet, rendez-vous, inclus…), conditions
// officielles (attente, annulation, inclus : content/conditions.js),
// véhicules, services associés, FAQ, appel à réserver (bas) + formulaire.
// ────────────────────────────────────────────────────────────────────
import { SERVICE_META } from '../../content/services/meta'
import { UI } from '../../content/ui'
import { BUSINESS, AREA } from '../../constants/business'
import { vehicles, luggageLabel } from '../../constants/vehicles'
import { CONDITIONS, conditionsList } from '../../content/conditions'
import { pagePath } from '../../routes'
import { homeAnchor } from '../Header'
import ServiceRates from '../ServiceRates'
import Faq from '../Faq'
import BookingModule from '../BookingModule'

const P = ({ children }) => <p className="text-silver font-sans font-light leading-relaxed mb-4">{children}</p>
const H2 = ({ children }) => <h2 className="font-serif text-3xl md:text-4xl text-offwhite mb-6">{children}</h2>

function List({ items }) {
  return (
    <ul className="space-y-3 mb-5">
      {items.map(item => (
        <li key={item} className="flex gap-3 text-silver font-sans font-light leading-relaxed">
          <span className="mt-2.5 w-1.5 h-1.5 rotate-45 bg-gold/70 flex-shrink-0" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Times({ rows, head, ui }) {
  const cols = head ?? [ui.slot, ui.duration]
  return (
    <div className="my-6">
      <div className="border border-divider overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-canvas-3/80">
              {cols.map((h, i) => (
                <th key={h} scope="col" className={`py-4 px-5 text-[10px] font-semibold tracking-[0.3em] uppercase text-silver-dim border-b border-divider ${i ? 'text-right' : 'text-left'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row[0]} className="border-b border-divider last:border-b-0">
                <th scope="row" className="py-4 px-5 text-left font-sans font-medium text-offwhite">{row[0]}</th>
                {row.slice(1).map((cell, i) => (
                  <td key={i} className="py-4 px-5 text-right text-silver font-sans whitespace-nowrap">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-silver-dim italic">{ui.timesNote}</p>
    </div>
  )
}

export default function ServicePage({ slug, body, lang, t }) {
  const svc = SERVICE_META[slug]
  const c = { ...svc.i18n[lang], ...body.i18n[lang] }
  const ui = UI[lang]
  const fleet = svc.vehicleCols ? vehicles.filter(v => svc.vehicleCols.includes(v.id)) : vehicles

  return (
    <>
      {/* ── En-tête de page (au-dessus de la ligne de flottaison) ── */}
      <section className="relative pt-36 md:pt-44 pb-14 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 80% 0%, rgba(197,160,89,0.07) 0%, transparent 70%)' }} />
        <div className="relative max-w-4xl mx-auto">
          <nav aria-label={ui.breadcrumb} className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-silver-dim">
              <li><a href={pagePath(lang, 'home')} className="hover:text-gold transition-colors duration-300">{ui.home}</a></li>
              <li aria-hidden="true">›</li>
              <li><span aria-current="page" className="text-gold">{c.nav}</span></li>
            </ol>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl text-offwhite leading-tight mb-8">{c.h1}</h1>
          {c.intro.map(p => <P key={p}>{p}</P>)}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
            <a href="#booking" className="btn-primary">{ui.bookTrip}</a>
            <a href={`tel:${BUSINESS.phoneE164}`} className="btn-outline">{ui.call} <span className="whitespace-nowrap">{BUSINESS.phoneDisplay}</span></a>
          </div>
          <p className="mt-6 text-xs text-silver-dim tracking-wide">{ui.available} · {AREA[lang]}</p>
        </div>
      </section>

      {/* ── Sections de contenu ── */}
      {c.sections.map((s) => (
        <section key={s.h2} className="py-12 md:py-14 px-6 border-t border-divider/60">
          <div className="max-w-3xl mx-auto">
            <H2>{s.h2}</H2>
            {s.paras?.map(p => <P key={p}>{p}</P>)}
            {s.rates && svc.rates?.length > 0 && <ServiceRates rows={svc.rates} cols={svc.vehicleCols} lang={lang} t={t} />}
            {s.times && <Times rows={s.times} head={s.timesHead === 'trip' ? [ui.trip, ui.duration] : undefined} ui={ui} />}
            {s.list && <List items={s.list} />}
            {s.after?.map(p => <P key={p}>{p}</P>)}
          </div>
        </section>
      ))}

      {/* ── Conditions officielles : attente, annulation, inclus ── */}
      <section className="py-12 md:py-14 px-6 border-t border-divider/60">
        <div className="max-w-3xl mx-auto">
          <H2>{CONDITIONS[lang].title}</H2>
          <List items={conditionsList(lang)} />
        </div>
      </section>

      {/* ── Véhicules ── */}
      <section className="py-12 md:py-14 px-6 border-t border-divider/60">
        <div className="max-w-3xl mx-auto">
          <H2>{ui.vehiclesTitle}</H2>
          <ul className={`grid grid-cols-1 ${fleet.length > 1 ? 'sm:grid-cols-2' : ''} gap-4 mb-6`}>
            {fleet.map(v => (
              <li key={v.id} className="border border-divider p-5">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-1">{v.category}</p>
                <p className="font-serif text-xl text-offwhite mb-2">{v.model}</p>
                <p className="text-sm text-silver font-sans font-light">{v.description[lang] ?? v.description.fr}</p>
                <p className="mt-3 text-xs text-silver-dim">{v.seats} {t('fleet_seats')} · {luggageLabel(v, lang)}</p>
              </li>
            ))}
          </ul>
          <a href={homeAnchor(lang, 'fleet')} className="text-[11px] font-semibold tracking-widest uppercase text-gold hover:text-gold-hover transition-colors duration-300">
            {ui.seeFleet} <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ── Services associés (maillage interne) ── */}
      <section className="py-12 md:py-14 px-6 border-t border-divider/60">
        <div className="max-w-3xl mx-auto">
          <H2>{ui.related}</H2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {svc.related.map(r => {
              const rc = SERVICE_META[r].i18n[lang]
              return (
                <li key={r}>
                  <a href={pagePath(lang, r)} className="group block h-full border border-divider p-5 hover:border-gold/40 transition-colors duration-300">
                    <span className="block font-serif text-xl text-offwhite group-hover:text-gold transition-colors duration-300 mb-2">{rc.nav}</span>
                    <span className="block text-sm text-silver font-sans font-light leading-relaxed">{rc.card}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ── FAQ propre à la page ── */}
      <Faq items={c.faq} title={ui.faqTitle} compact />

      {/* ── Appel à réserver (bas de page) ── */}
      <section className="py-12 md:py-16 px-6 border-t border-divider/60">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-offwhite mb-4">{ui.ctaTitle}</h2>
          <P>{ui.ctaText}</P>
          <a href="#booking" className="btn-primary mt-4">{ui.bookTrip}</a>
        </div>
      </section>

      {/* ── Formulaire de réservation ── */}
      <BookingModule t={t} lang={lang} />
    </>
  )
}
