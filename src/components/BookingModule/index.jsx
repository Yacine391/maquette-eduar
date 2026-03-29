// ── BookingModule — Formulaire de réservation simulé ────────────────
// MAQUETTE : AUCUN appel API, AUCUN paiement, AUCUN backend.
// Le prix affiché est calculé par une table hardcodée (usePriceSimulator).
// ────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import { usePriceSimulator } from '../../hooks/usePriceSimulator'
import { vehicles } from '../../constants/vehicles'

export default function BookingModule({ t, lang }) {
  const { price, loading, compute, reset } = usePriceSimulator()

  // État du formulaire
  const [form, setForm] = useState({
    date:      '',
    time:      '',
    pickup:    '',
    dropoff:   '',
    vehicleId: 'business',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Réinitialise le prix si le véhicule ou la destination change
    if (name === 'vehicleId' || name === 'dropoff') reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.vehicleId || !form.dropoff) return
    compute({ vehicleId: form.vehicleId, dropoff: form.dropoff })
  }

  const inputClass = `
    w-full bg-zinc-900/80 border border-zinc-700 text-offwhite text-sm
    px-4 py-3 rounded-sm outline-none
    focus:border-gold focus:ring-1 focus:ring-gold/40
    transition-all duration-200 placeholder:text-silver/50
  `

  const labelClass = 'block text-xs font-medium tracking-widest uppercase text-silver mb-1.5'

  return (
    <section id="booking" className="py-section px-6 bg-zinc-950/60">
      <div className="max-w-4xl mx-auto">
        {/* ── Titre ── */}
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Réservation</p>
          <h2 className="font-serif text-4xl md:text-5xl text-offwhite">{t('booking_title')}</h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-12 bg-gold/40" />
            <div className="w-1 h-1 rounded-full bg-gold/60" />
            <div className="h-px w-12 bg-gold/40" />
          </div>
        </div>

        {/* ── Formulaire ── */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 rounded-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className={labelClass}>{t('booking_date')}</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            {/* Heure */}
            <div>
              <label className={labelClass}>{t('booking_time')}</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            {/* Pickup */}
            <div>
              <label className={labelClass}>{t('booking_pickup')}</label>
              <input
                type="text"
                name="pickup"
                value={form.pickup}
                onChange={handleChange}
                placeholder="Ex: Paris 8ème, CDG Terminal 2E…"
                className={inputClass}
                required
              />
            </div>

            {/* Dropoff */}
            <div>
              <label className={labelClass}>{t('booking_dropoff')}</label>
              <input
                type="text"
                name="dropoff"
                value={form.dropoff}
                onChange={handleChange}
                placeholder="Ex: Aéroport CDG, Versailles…"
                className={inputClass}
                required
              />
            </div>

            {/* Catégorie véhicule — pleine largeur */}
            <div className="md:col-span-2">
              <label className={labelClass}>{t('booking_vehicle')}</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {vehicles.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => { setForm((p) => ({ ...p, vehicleId: v.id })); reset() }}
                    className={`p-3 border text-left transition-all duration-300 rounded-sm
                      ${form.vehicleId === v.id
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-zinc-700 text-silver hover:border-gold/50 hover:text-offwhite'
                      }`}
                  >
                    <div className="text-xs font-bold tracking-widest uppercase">{v.category}</div>
                    <div className="text-xs mt-0.5 opacity-70">{v.model}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bouton submit ── */}
          <div className="mt-8 flex flex-col md:flex-row items-center gap-6">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-gold text-canvas font-semibold text-sm tracking-widest uppercase
                border border-gold hover:bg-gold-hover hover:border-gold-hover
                disabled:opacity-50 disabled:cursor-wait
                transition-all duration-300 ease-in-out rounded-sm"
            >
              {loading ? '…' : t('booking_submit')}
            </button>

            {/* ── Résultat prix animé ── */}
            {price !== null && !loading && (
              <div className="animate-price-reveal text-center md:text-left">
                <p className="text-xs text-silver tracking-widest uppercase">{t('booking_price_label')}</p>
                <p className="text-4xl font-serif font-bold text-gold mt-1">
                  {price} €
                </p>
              </div>
            )}
          </div>

          {/* ── Note maquette ── */}
          <p className="mt-6 text-xs text-silver/50 italic">{t('booking_note')}</p>
        </form>
      </div>
    </section>
  )
}
