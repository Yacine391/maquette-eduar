// ── Tableau des tarifs d'une page service ────────────────────────────
// Lignes du tableau principal (src/constants/rates.js) uniquement : aucun
// prix inventé. Mention « tarif indicatif, confirmé avant la course ».
// Orientation : véhicules en lignes quand il y a moins de trajets que de
// véhicules (lisible sur mobile), sinon trajets en lignes.
// ────────────────────────────────────────────────────────────────────
import { rateTable } from '../constants/rates'
import { vehicles } from '../constants/vehicles'
import { UI } from '../content/ui'

const ALL_COLS = ['business', 'luxe', 'van', 'eco']
const TH = 'py-4 px-4 text-[10px] font-semibold tracking-[0.2em] uppercase border-b border-divider'

export default function ServiceRates({ rows, cols = ALL_COLS, lang, t }) {
  const ui = UI[lang]
  const label = { business: t('rates_business'), luxe: t('rates_luxe'), van: t('rates_van'), eco: t('rates_eco') }
  const tripRows = rows.map(key => rateTable.find(r => r.key === key))
  const zone = (row) => row.zone[lang] ?? row.zone.fr
  const price = (row, c) => typeof row[c] === 'number'
    ? <span className="font-serif text-lg font-semibold text-offwhite whitespace-nowrap">{row[c]}<span className="text-sm ml-0.5 font-sans font-normal text-silver-dim">€</span></span>
    : <span className="text-xs italic text-silver-dim">{ui.onQuote}</span>
  const vehicleCell = (c) => (
    <>
      <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gold">{label[c]}</span>
      <span className="block text-xs text-silver-dim font-normal normal-case tracking-normal mt-1">{vehicles.find(v => v.id === c).model}</span>
    </>
  )
  const byVehicle = cols.length > tripRows.length

  return (
    <div className="my-6">
      <div className="border border-divider overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-canvas-3/80">
              <th scope="col" className={`${TH} text-left text-silver-dim`}>{byVehicle ? ui.vehicle : ui.trip}</th>
              {byVehicle
                ? tripRows.map(row => <th key={row.key} scope="col" className={`${TH} text-right text-silver-dim`}>{zone(row)}</th>)
                : cols.map(c => <th key={c} scope="col" className={`${TH} text-right`}>{vehicleCell(c)}</th>)}
            </tr>
          </thead>
          <tbody>
            {byVehicle
              ? cols.map(c => (
                  <tr key={c} className="border-b border-divider last:border-b-0">
                    <th scope="row" className="py-4 px-4 text-left font-normal">{vehicleCell(c)}</th>
                    {tripRows.map(row => <td key={row.key} className="py-4 px-4 text-right">{price(row, c)}</td>)}
                  </tr>
                ))
              : tripRows.map(row => (
                  <tr key={row.key} className="border-b border-divider last:border-b-0">
                    <th scope="row" className="py-4 px-4 text-left font-sans font-medium text-offwhite">{zone(row)}</th>
                    {cols.map(c => <td key={c} className="py-4 px-4 text-right">{price(row, c)}</td>)}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-silver-dim italic">{ui.ratesNote}</p>
    </div>
  )
}
