// ── Rates — Tableau des tarifs statique ─────────────────────────────
// MAQUETTE : prix fictifs à titre illustratif uniquement.
// ────────────────────────────────────────────────────────────────────
import { rateTable } from '../../constants/rates'

export default function Rates({ t, lang }) {
  const categories = [
    { key: 'rates_business', col: 'business' },
    { key: 'rates_luxe',     col: 'luxe' },
    { key: 'rates_van',      col: 'van' },
    { key: 'rates_eco',      col: 'eco' },
  ]

  return (
    <section id="rates" className="py-section px-6 bg-zinc-950/50">
      <div className="max-w-5xl mx-auto">
        {/* ── Titre ── */}
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Tarifs</p>
          <h2 className="font-serif text-4xl md:text-5xl text-offwhite">{t('rates_title')}</h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-12 bg-gold/40" />
            <div className="w-1 h-1 rounded-full bg-gold/60" />
            <div className="h-px w-12 bg-gold/40" />
          </div>
        </div>

        {/* ── Tableau ── */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            {/* En-tête */}
            <thead>
              <tr className="border-b border-gold/30">
                <th className="text-left py-4 px-4 text-gold text-xs tracking-widest uppercase font-semibold">
                  {t('rates_zone')}
                </th>
                {categories.map(({ key }) => (
                  <th key={key} className="py-4 px-4 text-center text-gold text-xs tracking-widest uppercase font-semibold">
                    {t(key)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rateTable.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-zinc-800/60 transition-colors duration-200 hover:bg-gold/[0.04]
                    ${i % 2 === 0 ? 'bg-zinc-900/20' : 'bg-transparent'}`}
                >
                  {/* Zone */}
                  <td className="py-4 px-4 text-offwhite font-medium">
                    {row.zone[lang] ?? row.zone['fr']}
                  </td>
                  {/* Prix par catégorie */}
                  {categories.map(({ col }) => (
                    <td key={col} className="py-4 px-4 text-center">
                      {typeof row[col] === 'number' ? (
                        <span className="text-offwhite font-semibold">{row[col]} €</span>
                      ) : (
                        <span className="text-silver italic text-xs">
                          {lang === 'en' ? 'On quote' : lang === 'ru' ? 'По запросу' : row[col]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note bas de tableau */}
        <p className="mt-6 text-xs text-silver/50 italic text-center">
          {lang === 'en'
            ? '* Prices shown are indicative and simulated for demo purposes only.'
            : lang === 'ru'
            ? '* Цены указаны в ознакомительных целях и являются симуляцией.'
            : '* Prix indicatifs simulés à titre de démonstration uniquement.'}
        </p>
      </div>
    </section>
  )
}
