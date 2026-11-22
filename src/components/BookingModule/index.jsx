// ── BookingModule — Demande de réservation avec envoi e-mail ─────────
// CDG TRANSFERT VTC — formulaire de réservation du site en production.
// Envoi via EmailJS (emailjs.com), identifiants dans src/config/emailjs.js :
//   1. notification à CDG Transfert VTC (indispensable)
//   2. récapitulatif au client (facultatif : un échec n'annule pas la demande)
// Si la notification échoue : message de secours avec appel et WhatsApp
// (demande pré-remplie).
// ────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { usePriceEstimate } from '../../hooks/usePriceEstimate'
import { estimatePrice } from '../../utils/estimatePrice'
import { vehicles } from '../../constants/vehicles'
import { EMAILJS_CONFIG } from '../../config/emailjs'
import AddressAutocomplete from './AddressAutocomplete'
import { PHONE_E164, PHONE_DISPLAY, whatsappLink } from '../../constants/contact'

// Date du jour au format AAAA-MM-JJ (heure locale) : date minimale du formulaire
const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}
const EMAIL_RE    = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phoneDigits = (s) => s.replace(/\D/g, '')

export default function BookingModule({ t, lang }) {
  const { price, loading, compute, reset } = usePriceEstimate()

  const [form, setForm] = useState({
    name:      '',
    email:     '',
    phone:     '',
    date:      '',
    time:      '',
    pickup:    '',
    dropoff:   '',
    vehicleId: 'business',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending,   setSending]   = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [clientMailOk, setClientMailOk] = useState(true)  // récapitulatif client envoyé ?
  const [errors, setErrors] = useState([])                 // erreurs de saisie
  // Date minimale = aujourd'hui, posée côté navigateur (le HTML pré-généré
  // au build ne doit pas figer la date du build)
  const [minDate, setMinDate] = useState(undefined)
  useEffect(() => setMinDate(todayISO()), [])

  const selectedVehicle = vehicles.find(v => v.id === form.vehicleId)

  // Prix transmis dans la demande : celui affiché, ou calculé si le client
  // n'a pas cliqué sur « Obtenir une estimation »
  const requestPrice = () => {
    const p = price ?? estimatePrice(form.vehicleId, form.pickup, form.dropoff)
    return typeof p === 'number' ? `${p} €` : p
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'vehicleId' || name === 'pickup' || name === 'dropoff') reset()
    setSubmitted(false)
    setConfirmed(false)
    setEmailError(false)
    setErrors([])
  }

  const handleVehicle = (id) => {
    setForm((prev) => ({ ...prev, vehicleId: id }))
    reset()
    setSubmitted(false)
    setConfirmed(false)
  }

  // ── Estimation du prix (départ ET arrivée nécessaires) ──
  const handleEstimate = () => {
    if (!form.vehicleId || !form.pickup || !form.dropoff) return
    setSubmitted(true)
    compute({ vehicleId: form.vehicleId, pickup: form.pickup, dropoff: form.dropoff })
  }

  // ── Vérification des champs avant envoi ──
  const validate = () => {
    const errs = []
    if (!EMAIL_RE.test(form.email.trim()))  errs.push(lbl('errEmail'))
    if (phoneDigits(form.phone).length < 9) errs.push(lbl('errPhone'))
    if (form.date && form.date < todayISO()) errs.push(lbl('errDate'))
    return errs
  }

  // ── Envoi de la demande + e-mails ──
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.date || !form.time || !form.pickup || !form.dropoff) return
    const errs = validate()
    setErrors(errs)
    if (errs.length) return

    setSending(true)
    setEmailError(false)

    const priceLabel = requestPrice()

    const templateParams = {
      client_name:  form.name,
      client_email: form.email,
      client_phone: form.phone || 'Non renseigné',
      booking_date: form.date,
      booking_time: form.time,
      pickup:       form.pickup,
      dropoff:      form.dropoff,
      vehicle:      `${selectedVehicle?.category} — ${selectedVehicle?.model}`,
      price:        priceLabel,
    }

    // EmailJS est chargé seulement à l'envoi (JS différé)
    let emailjs
    try {
      emailjs = (await import('@emailjs/browser')).default
    } catch (err) {
      console.error('EmailJS (chargement) :', err)
      setEmailError(true)   // → message de secours appel / WhatsApp
      setSending(false)
      return
    }

    // 1. Notification à CDG Transfert VTC — indispensable
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.ADMIN_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY,
      )
    } catch (err) {
      console.error('EmailJS (notification) :', err)
      setEmailError(true)   // → message de secours appel / WhatsApp
      setSending(false)
      return
    }

    // 2. Récapitulatif au client — la demande est déjà arrivée : un échec
    //    ici ne doit pas afficher d'erreur (risque de doublon)
    let clientOk = true
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CLIENT_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY,
      )
    } catch (err) {
      console.error('EmailJS (récapitulatif client) :', err)
      clientOk = false
    }
    setClientMailOk(clientOk)
    setConfirmed(true)
    setSending(false)
  }

  // Demande pré-remplie pour WhatsApp (message de secours)
  const whatsappRequest = () => [
    'Bonjour, je souhaite réserver un transfert :',
    `• Nom : ${form.name}`,
    `• Téléphone : ${form.phone}`,
    `• E-mail : ${form.email}`,
    `• Date : ${form.date} à ${form.time}`,
    `• Départ : ${form.pickup}`,
    `• Arrivée : ${form.dropoff}`,
    `• Véhicule : ${selectedVehicle?.category} — ${selectedVehicle?.model}`,
    `• Prix estimé : ${requestPrice()}`,
  ].join('\n')

  const L = {
    coords:   { fr: 'Vos coordonnées',  en: 'Your details',     ru: 'Ваши данные',       ro: 'Datele dvs.'      },
    journey:  { fr: 'Détails du trajet', en: 'Journey details',  ru: 'Детали поездки',    ro: 'Detalii cursă'    },
    name:     { fr: 'Nom complet',       en: 'Full name',        ru: 'Полное имя',         ro: 'Nume complet'     },
    phone:    { fr: 'Téléphone', en: 'Phone', ru: 'Телефон', ro: 'Telefon' },
    estimate: { fr: 'Obtenir une estimation', en: 'Get estimate', ru: 'Оценить стоимость', ro: 'Obțineți estimare' },
    send:     { fr: 'Confirmer la réservation', en: 'Confirm booking', ru: 'Подтвердить', ro: 'Confirmați rezervarea' },
    success:  { fr: 'Demande de réservation envoyée !', en: 'Booking request sent!', ru: 'Заявка на бронирование отправлена!', ro: 'Cererea de rezervare a fost trimisă!' },
    success2: { fr: 'Nous vous confirmons votre course rapidement par téléphone ou WhatsApp.', en: 'We will confirm your ride shortly by phone or WhatsApp.', ru: 'Мы скоро подтвердим вашу поездку по телефону или в WhatsApp.', ro: 'Vă confirmăm cursa în curând prin telefon sau WhatsApp.' },
    success3: { fr: 'Un récapitulatif de votre demande vous a été envoyé par e-mail.', en: 'A summary of your request has been emailed to you.', ru: 'Сводка вашей заявки отправлена вам по электронной почте.', ro: 'Un rezumat al cererii v-a fost trimis pe e-mail.' },
    error:    { fr: "Votre demande n'a pas pu être envoyée. Contactez-nous directement :", en: 'Your request could not be sent. Please contact us directly:', ru: 'Не удалось отправить заявку. Свяжитесь с нами напрямую:', ro: 'Cererea nu a putut fi trimisă. Contactați-ne direct:' },
    call:     { fr: 'Appeler le', en: 'Call', ru: 'Позвонить', ro: 'Sunați la' },
    whatsapp: { fr: 'Envoyer ma demande par WhatsApp', en: 'Send my request via WhatsApp', ru: 'Отправить заявку в WhatsApp', ro: 'Trimiteți cererea pe WhatsApp' },
    errEmail: { fr: 'Adresse e-mail invalide.', en: 'Invalid email address.', ru: 'Неверный адрес эл. почты.', ro: 'Adresă de e-mail invalidă.' },
    errPhone: { fr: 'Numéro de téléphone invalide (nécessaire pour confirmer votre course).', en: 'Invalid phone number (needed to confirm your ride).', ru: 'Неверный номер телефона (нужен для подтверждения поездки).', ro: 'Număr de telefon invalid (necesar pentru confirmarea cursei).' },
    errDate:  { fr: 'La date ne peut pas être dans le passé.', en: 'The date cannot be in the past.', ru: 'Дата не может быть в прошлом.', ro: 'Data nu poate fi în trecut.' },
    newbook:  { fr: 'Nouvelle réservation', en: 'New booking', ru: 'Новое бронирование', ro: 'Rezervare nouă' },
    calc:     { fr: 'Calcul…', en: 'Calculating…', ru: 'Расчёт…', ro: 'Calcul…' },
    sending:  { fr: 'Envoi…', en: 'Sending…', ru: 'Отправка…', ro: 'Trimitere…' },
  }
  const lbl = (key) => L[key]?.[lang] ?? L[key]?.fr ?? ''

  // ── Écran de confirmation ──
  if (confirmed) {
    return (
      <section id="booking" className="py-section px-6 relative">
        <div className="absolute inset-0 bg-canvas-2/50" aria-hidden="true" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="card-glass p-8 md:p-16 text-center">
            <div className="mx-auto mb-8 w-20 h-20 rounded-full border-2 border-gold/60 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-gold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-gold mb-4">{lbl('success')}</h2>
            <p className="text-silver font-sans font-light leading-relaxed mb-2 max-w-md mx-auto">
              {lbl('success2')}
            </p>
            {clientMailOk && (
              <p className="text-silver-dim text-sm font-sans font-light max-w-md mx-auto">{lbl('success3')}</p>
            )}
            <div className="mb-8" />
            <div className="text-left max-w-md mx-auto space-y-2 border border-divider p-6 mb-8">
              <SummaryRow label={form.name} value={`${form.date} · ${form.time}`} />
              <SummaryRow label={form.pickup} value="→" />
              <SummaryRow label={form.dropoff} value="" />
              <SummaryRow label={`${selectedVehicle?.category} — ${selectedVehicle?.model}`} value={typeof price === 'number' ? `${price} €` : (price ?? '')} gold />
            </div>
            <button
              onClick={() => {
                setConfirmed(false)
                setClientMailOk(true)
                setErrors([])
                reset()
                setForm(f => ({ ...f, name: '', email: '', phone: '', date: '', time: '', pickup: '', dropoff: '' }))
              }}
              className="btn-primary"
            >
              {lbl('newbook')}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-section px-6 relative">
      <div className="absolute inset-0 bg-canvas-2/50" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #C5A059 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-eyebrow">Réservation</p>
          <h2 className="section-title">{t('booking_title')}</h2>
          <div className="section-divider">
            <div className="h-px w-10 bg-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            <div className="h-px w-10 bg-gold/30" />
          </div>
        </div>

        <div className="card-glass p-6 md:p-10">
          <form onSubmit={handleSubmit} noValidate>

            {/* ── Coordonnées ── */}
            <fieldset className="mb-8">
              <legend className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold/80 mb-4 pb-2 border-b border-divider w-full">
                {lbl('coords')}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="label-luxury">{lbl('name')} *</label>
                  <input id="name" type="text" name="name" value={form.name} autoComplete="name"
                    onChange={handleChange} placeholder="Jean Dupont" required className="input-luxury" />
                </div>
                <div>
                  <label htmlFor="email" className="label-luxury">Email *</label>
                  <input id="email" type="email" name="email" value={form.email} autoComplete="email" inputMode="email"
                    onChange={handleChange} placeholder="jean@example.com" required className="input-luxury" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="label-luxury">{lbl('phone')} *</label>
                  <input id="phone" type="tel" name="phone" value={form.phone} autoComplete="tel" inputMode="tel"
                    onChange={handleChange} placeholder="+33 6 XX XX XX XX" required className="input-luxury" />
                </div>
              </div>
            </fieldset>

            {/* ── Trajet ── */}
            <fieldset className="mb-8">
              <legend className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold/80 mb-4 pb-2 border-b border-divider w-full">
                {lbl('journey')}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="date" className="label-luxury">{t('booking_date')} *</label>
                  <input id="date" type="date" name="date" value={form.date} min={minDate}
                    onChange={handleChange} required className="input-luxury" />
                </div>
                <div>
                  <label htmlFor="time" className="label-luxury">{t('booking_time')} *</label>
                  <input id="time" type="time" name="time" value={form.time}
                    onChange={handleChange} required className="input-luxury" />
                </div>
                <AddressAutocomplete
                  id="pickup"
                  name="pickup"
                  value={form.pickup}
                  onChange={handleChange}
                  placeholder="Paris 8ème, CDG Terminal 2…"
                  required
                  label={t('booking_pickup')}
                />
                <AddressAutocomplete
                  id="dropoff"
                  name="dropoff"
                  value={form.dropoff}
                  onChange={handleChange}
                  placeholder="CDG T1, Beauvais, Paris…"
                  required
                  label={t('booking_dropoff')}
                />
              </div>
            </fieldset>

            {/* ── Véhicule ── */}
            <div className="mb-8">
              <p id="vehicle-label" className="label-luxury mb-3">{t('booking_vehicle')}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="group" aria-labelledby="vehicle-label">
                {vehicles.map((v) => {
                  const active = form.vehicleId === v.id
                  return (
                    <button key={v.id} type="button" onClick={() => handleVehicle(v.id)}
                      aria-pressed={active}
                      className={`relative p-3 md:p-4 text-left transition-all duration-300 border
                        ${active
                          ? 'border-gold bg-gold/8 shadow-[0_0_20px_rgba(197,160,89,0.12)]'
                          : 'border-divider hover:border-silver-dim bg-canvas-3/40'
                        }`}
                    >
                      {v.featured && (
                        <span className="absolute -top-px right-3 text-[8px] font-bold tracking-widest bg-gold text-canvas px-1.5 py-0.5 uppercase">★</span>
                      )}
                      <div className={`mb-2 transition-colors duration-300 ${active ? 'text-gold' : 'text-silver-dim'}`}>
                        <CarIcon />
                      </div>
                      <p className={`text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-0.5 leading-tight transition-colors duration-300
                        ${active ? 'text-gold' : 'text-silver'}`}>
                        {v.category}
                      </p>
                      <p className="text-xs text-silver-dim truncate">{v.model.replace(/^Mercedes /, '')}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Estimation prix ── */}
            <div className="border-t border-divider pt-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button type="button" onClick={handleEstimate}
                  disabled={loading || !form.pickup || !form.dropoff}
                  className="text-[10px] font-bold tracking-widest uppercase py-3 px-6
                    border border-divider text-silver hover:border-gold/50 hover:text-gold
                    transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? lbl('calc') : lbl('estimate')}
                </button>

                {submitted && !loading && price !== null && (
                  <div className="animate-price-pop">
                    <p className="text-[9px] tracking-widest uppercase text-silver-dim mb-0.5">
                      {t('booking_price_label')}
                    </p>
                    {typeof price === 'number' ? (
                      <p className="font-serif text-4xl font-bold text-gold leading-none">
                        {price} <span className="text-xl text-gold-dim">€</span>
                      </p>
                    ) : (
                      <p className="font-serif text-xl font-semibold text-gold italic">{price}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ── Erreurs de saisie ── */}
            {errors.length > 0 && (
              <div role="alert" className="mb-4 p-4 border border-red-500/40 bg-red-900/20 text-red-400 text-sm space-y-1">
                {errors.map(msg => <p key={msg}>{msg}</p>)}
              </div>
            )}

            {/* ── Échec d'envoi : message de secours appel / WhatsApp ── */}
            {emailError && (
              <div role="alert" className="mb-4 p-4 border border-red-500/40 bg-red-900/20 text-sm">
                <p className="text-red-400 mb-3">{lbl('error')}</p>
                <div className="flex flex-wrap gap-3">
                  <a href={`tel:${PHONE_E164}`} className="btn-outline py-3 px-5">
                    {lbl('call')} <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
                  </a>
                  <a href={whatsappLink(whatsappRequest())} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-5 font-sans font-semibold text-xs tracking-[0.2em] uppercase
                      border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-canvas transition-all duration-300 ease-in-out">
                    {lbl('whatsapp')}
                  </a>
                </div>
              </div>
            )}

            {/* ── Submit ── */}
            <button type="submit"
              disabled={sending || !form.name || !form.email || !form.phone || !form.date || !form.time || !form.pickup || !form.dropoff}
              className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-3.5 h-3.5 border border-canvas/30 border-t-canvas rounded-full animate-spin" />
                    {lbl('sending')}
                  </span>
                : lbl('send')
              }
            </button>

            <p className="mt-4 text-[10px] text-silver-dim italic tracking-wide">
              {t('booking_note')}
            </p>

          </form>
        </div>
      </div>
    </section>
  )
}

function CarIcon() {
  return (
    <svg viewBox="0 0 40 20" className="w-8 h-4" fill="currentColor">
      <path d="M5 14 Q6 8 12 7 L17 5 Q20 4 23 5 L28 7 Q34 8 35 14 L37 14 Q38 16 35 17 L5 17 Q2 16 3 14 Z" opacity="0.8"/>
      <circle cx="10" cy="17" r="3" />
      <circle cx="30" cy="17" r="3" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.5-4.619 3.5-7.327A8.25 8.25 0 003 12c0 2.708 1.556 5.314 3.5 7.327a19.58 19.58 0 002.683 2.282 16.974 16.974 0 001.144.742zM21.75 12a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0zM12 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
    </svg>
  )
}

function FlagIcon() {
  return (
    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
    </svg>
  )
}

function SummaryRow({ label, value, gold }) {
  return (
    <div className="flex justify-between items-baseline gap-2 py-1 border-b border-divider/50 last:border-0">
      <span className={`text-xs font-sans ${gold ? 'text-gold font-semibold' : 'text-silver-dim'}`}>{label}</span>
      {value && <span className={`text-xs font-mono whitespace-nowrap ${gold ? 'text-gold' : 'text-offwhite'}`}>{value}</span>}
    </div>
  )
}
