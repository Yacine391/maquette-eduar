// ── BookingModule — Réservation simulée premium ─────────────────────
// MAQUETTE : AUCUN appel API, AUCUN paiement, AUCUN backend.
// Design : card glassmorphism sombre, inputs avec label flottant,
// sélecteur véhicule visuel, animation price-pop.
// ────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import { usePriceSimulator } from '../../hooks/usePriceSimulator'
import { vehicles } from '../../constants/vehicles'

export default function BookingModule({ t, lang }) {
  const { price, loading, compute, reset } = usePriceSimulator()

  const [form, setForm] = useState({
    date:      '',
    time:      '',
    pickup:    '',
    dropoff:   '',
    vehicleId: 'business',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'vehicleId' || name === 'dropoff') reset()
    setSubmitted(false)
  }

  const handleVehicle = (id) => {
    setForm((prev) => ({ ...prev, vehicleId: id }))
    reset()
    setSubmitted(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.vehicleId || !form.dropoff) return
    setSubmitted(true)
    compute({ vehicleId: form.vehicleId, dropoff: form.dropoff })
  }

  return (
    <section id="booking" className="py-section px-6 relative">

      {/* ── Fond section ── */}
      <div className="absolute inset-0 bg-canvas-2/50" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #C5A059 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── Titre ── */}
        <div className="text-center mb-14">
          <p className="section-eyebrow">Réservation</p>
          <h2 className="section-title">{t('booking_title')}</h2>
          <div className="section-divider">
            <div className="h-px w-10 bg-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            <div className="h-px w-10 bg-gold/30" />
          </div>
        </div>

        {/* ── Card principale ── */}
        <div className="card-glass p-8 md:p-12">

          <form onSubmit={handleSubmit} noValidate>

            {/* ── Grille date / heure / pickup / dropoff ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

              {/* Date */}
              <div>
                <label htmlFor="date" className="label-luxury">{t('booking_date')}</label>
                <input
                  id="date" type="date" name="date"
                  value={form.date} onChange={handleChange}
                  required className="input-luxury"
                  aria-label={t('booking_date')}
                />
              </div>

              {/* Heure */}
              <div>
                <label htmlFor="time" className="label-luxury">{t('booking_time')}</label>
                <input
                  id="time" type="time" name="time"
                  value={form.time} onChange={handleChange}
                  required className="input-luxury"
                  aria-label={t('booking_time')}
                />
              </div>

              {/* Pickup */}
              <div>
                <label htmlFor="pickup" className="label-luxury">{t('booking_pickup')}</label>
                <div className="relative">
                  <input
                    id="pickup" type="text" name="pickup"
                    value={form.pickup} onChange={handleChange}
                    placeholder="Paris 8ème, CDG T2E…"
                    required className="input-luxury pr-10"
                    autoComplete="address-level1"
                    aria-label={t('booking_pickup')}
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.5-4.619 3.5-7.327A8.25 8.25 0 003 12c0 2.708 1.556 5.314 3.5 7.327a19.58 19.58 0 002.683 2.282 16.974 16.974 0 001.144.742zM21.75 12a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0zM12 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Dropoff */}
              <div>
                <label htmlFor="dropoff" className="label-luxury">{t('booking_dropoff')}</label>
                <div className="relative">
                  <input
                    id="dropoff" type="text" name="dropoff"
                    value={form.dropoff} onChange={handleChange}
                    placeholder="Aéroport CDG, Versailles…"
                    required className="input-luxury pr-10"
                    autoComplete="address-level1"
                    aria-label={t('booking_dropoff')}
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ── Sélecteur véhicule ── */}
            <div className="mb-8">
              <p className="label-luxury">{t('booking_vehicle')}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="group" aria-label={t('booking_vehicle')}>
                {vehicles.map((v) => {
                  const active = form.vehicleId === v.id
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleVehicle(v.id)}
                      aria-pressed={active}
                      className={`relative p-4 text-left transition-all duration-300 border
                        ${active
                          ? 'border-gold bg-gold/8 shadow-[0_0_20px_rgba(197,160,89,0.12)]'
                          : 'border-divider hover:border-silver-dim bg-canvas-3/40'
                        }`}
                    >
                      {/* Featured indicator */}
                      {v.featured && (
                        <span className="absolute -top-px right-3 text-[8px] font-bold tracking-widest bg-gold text-canvas px-1.5 py-0.5 uppercase">
                          ★
                        </span>
                      )}
                      {/* Icône silhouette */}
                      <div className={`mb-2 transition-colors duration-300 ${active ? 'text-gold' : 'text-silver-dim'}`}>
                        <CarIcon />
                      </div>
                      <p className={`text-[10px] font-bold tracking-widest uppercase mb-0.5 transition-colors duration-300
                        ${active ? 'text-gold' : 'text-silver'}`}
                      >
                        {v.category}
                      </p>
                      <p className="text-xs text-silver-dim truncate">{v.model.split(' ').slice(0, 2).join(' ')}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Action row ── */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pt-6 border-t border-divider">

              {/* Bouton */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-wait relative overflow-hidden"
              >
                {loading
                  ? <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border border-canvas/30 border-t-canvas rounded-full animate-spin" />
                      {{ fr: 'Calcul…', en: 'Calculating…', ru: 'Расчёт…', ro: 'Calcul…' }[lang] ?? 'Calcul…'}
                    </span>
                  : t('booking_submit')
                }
              </button>

              {/* Prix animé */}
              {price !== null && !loading && submitted && (
                <div className="animate-price-pop">
                  <p className="text-[10px] tracking-widest uppercase text-silver-dim mb-1">
                    {t('booking_price_label')}
                  </p>
                  <p className="font-serif text-5xl font-bold text-gold leading-none">
                    {price} <span className="text-2xl text-gold-dim">€</span>
                  </p>
                </div>
              )}
            </div>

            {/* Note maquette */}
            <p className="mt-5 text-[10px] text-silver-dim/60 italic tracking-wide">
              {t('booking_note')}
            </p>

          </form>
        </div>
      </div>
    </section>
  )
}

// Icône voiture SVG inline légère
function CarIcon() {
  return (
    <svg viewBox="0 0 40 20" className="w-8 h-4" fill="currentColor">
      <path d="M5 14 Q6 8 12 7 L17 5 Q20 4 23 5 L28 7 Q34 8 35 14 L37 14 Q38 16 35 17 L5 17 Q2 16 3 14 Z" opacity="0.8"/>
      <circle cx="10" cy="17" r="3" />
      <circle cx="30" cy="17" r="3" />
    </svg>
  )
}
