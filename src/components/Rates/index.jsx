// ── Rates — Tableau des tarifs premium ──────────────────────────────
// Tarifs réels (src/constants/rates.js), source du priceRange du JSON-LD.
// Ligne « Mise à disposition, à l'heure » : prix suivis de « /h ».
// Notes : conditions officielles (content/conditions.js).
// Design : tableau sombre avec headers gold, lignes élégantes.
// ────────────────────────────────────────────────────────────────────
import { rateTable, PER_HOUR } from '../../constants/rates'
import { CONDITIONS } from '../../content/conditions'
import { vehicles } from '../../constants/vehicles'

export default function Rates({ t, lang }) {
  const categories = [
    { key: 'rates_business', col: 'business', featured: true },
    { key: 'rates_luxe',     col: 'luxe',     featured: false },
    { key: 'rates_van',      col: 'van',       featured: false },
    { key: 'rates_eco',      col: 'eco',       featured: false },
  ]

  // Modèles pour l'en-tête
  const modelMap = Object.fromEntries(vehicles.map(v => [v.id, v.model.split(' ').slice(-2).join(' ')]))

  return (
    <section id="rates" className="py-section px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Titre ── */}
        <div className="text-center mb-14">
          <p className="section-eyebrow">{{ fr: 'Tarifs', en: 'Rates', ru: 'Тарифы', ro: 'Tarife' }[lang]}</p>
          <h2 className="section-title">{t('rates_title')}</h2>
          <div className="section-divider">
            <div className="h-px w-10 bg-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            <div className="h-px w-10 bg-gold/30" />
          </div>
        </div>

        {/* ── Tableau ── */}
        <div className="border border-divider overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse" role="table" aria-label={t('rates_title')}>

              {/* En-tête */}
              <thead>
                <tr className="bg-canvas-3/80">
                  <th className="text-left py-5 px-6 text-[10px] font-semibold tracking-[0.3em] uppercase text-silver-dim border-b border-divider">
                    {t('rates_zone')}
                  </th>
                  {categories.map(({ key, col, featured }) => (
                    <th
                      key={col}
                      scope="col"
                      className={`py-5 px-4 text-center border-b border-divider transition-colors
                        ${featured ? 'bg-gold/8 border-l border-r border-gold/20' : ''}`}
                    >
                      <p className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-1
                        ${featured ? 'text-gold' : 'text-silver-dim'}`}
                      >
                        {t(key)}
                      </p>
                      <p className="text-[10px] text-silver-dim font-normal normal-case tracking-normal">
                        {modelMap[col]}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rateTable.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-divider last:border-b-0
                      transition-colors duration-200 hover:bg-gold/[0.025] group`}
                  >
                    {/* Zone */}
                    <td className="py-5 px-6 font-sans text-offwhite font-medium">
                      <span className="flex items-center gap-3">
                        <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold flex-shrink-0 transition-colors duration-300" />
                        {row.zone[lang] ?? row.zone.fr}
                      </span>
                    </td>

                    {/* Prix par catégorie */}
                    {categories.map(({ col, featured }) => (
                      <td
                        key={col}
                        className={`py-5 px-4 text-center
                          ${featured ? 'bg-gold/[0.04] border-l border-r border-gold/10' : ''}`}
                      >
                        {typeof row[col] === 'number' ? (
                          <span className={`font-serif text-lg font-semibold
                            ${featured ? 'text-gold' : 'text-offwhite'}`}
                          >
                            {row[col]}
                            <span className="text-sm ml-0.5 font-sans font-normal text-silver-dim">€{row.unit === 'hour' ? PER_HOUR[lang] : ''}</span>
                          </span>
                        ) : (
                          <span className="text-xs italic text-silver-dim">
                            {{ en: 'On quote', ru: 'По запросу', ro: 'La cerere' }[lang] ?? row[col]}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* Notes : conditions officielles */}
        <p className="mt-5 text-[11px] text-silver-dim italic text-center tracking-wide">
          {CONDITIONS[lang].ratesNote}
        </p>
        <p className="mt-2 text-[11px] text-silver-dim italic text-center tracking-wide">
          {CONDITIONS[lang].hourly}
        </p>
      </div>
    </section>
  )
}
