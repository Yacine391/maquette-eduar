// ── BookingModule — Demande de réservation avec envoi e-mail ─────────
// CDG TRANSFERT VTC — formulaire de réservation du site en production.
// Envoi via EmailJS (emailjs.com), identifiants dans src/config/emailjs.js :
//   1. notification à CDG Transfert VTC (indispensable)
//   2. récapitulatif au client (facultatif : un échec n'annule pas la demande)
// Si la notification échoue : message de secours avec appel et WhatsApp
// (demande pré-remplie).
// Catégorie par défaut : BUSINESS (Mercedes Classe E). Champ « Siège enfant
// / rehausseur (nombre) » → paramètre EmailJS `child_seats` (à afficher dans
// les deux templates du tableau de bord EmailJS : {{child_seats}}).
// Passagers / bagages → `passengers` / `luggage` ; si la catégorie choisie
// est trop petite (constants/vehicles.js), message : Classe V ou plusieurs
// véhicules. Numéro de vol ou de train (facultatif, affiché si le départ ou
// l'arrivée est un aéroport ou une gare) → `flight_number`.
// Au-dessus du formulaire : rappel des engagements officiels du client.
// Données minimales (RGPD) : e-mail facultatif (récapitulatif envoyé
// seulement s'il est renseigné, sans le téléphone) ; mention d'information
// et lien vers la politique de confidentialité sous le bouton d'envoi.
// Anti-spam et injections (src/utils/bookingGuard.js) : validation stricte
// de chaque champ, champ piège invisible, délai minimal de 3 s avant envoi,
// 3 demandes maximum par navigateur en 10 min, valeurs nettoyées (texte
// brut, longueur limitée) avant l'envoi à EmailJS ; robots sans interface
// (navigator.webdriver) refusés par le SDK EmailJS (blockHeadless).
// ────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react'
import { usePriceEstimate } from '../../hooks/usePriceEstimate'
import { estimatePrice } from '../../utils/estimatePrice'
import { vehicles, capacityAdvice, luggageLabel } from '../../constants/vehicles'
import { isTravelHub } from '../../utils/priceZone'
import { BUSINESS } from '../../constants/business'
import { track } from '../../utils/analytics'
import { EMAILJS_CONFIG } from '../../config/emailjs'
import AddressAutocomplete from './AddressAutocomplete'
import { PHONE_E164, PHONE_DISPLAY, whatsappLink } from '../../constants/contact'
import { pagePath } from '../../routes'
import { LIMITS, PASSENGERS, LUGGAGE, checkBooking, cleanText, cleanParams, tooFast, rateLimited, recordSend } from '../../utils/bookingGuard'

// Date du jour au format AAAA-MM-JJ (heure locale) : date minimale du formulaire
const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

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
    childSeats: '0',
    passengers: '1',
    luggage:   '1',
    flightNumber: '',
    website:   '',   // champ piège : invisible, rempli seulement par les robots
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
  // Heure d'affichage du formulaire (délai minimal avant envoi)
  const shownAt = useRef(0)
  useEffect(() => { setMinDate(todayISO()); shownAt.current = Date.now() }, [])

  const selectedVehicle = vehicles.find(v => v.id === form.vehicleId)
  // Numéro de vol / train proposé seulement pour un aéroport ou une gare
  const showFlight = isTravelHub(form.pickup) || isTravelHub(form.dropoff)
  const flightValue = showFlight ? form.flightNumber : ''
  // Capacité de la catégorie choisie dépassée → Classe V ou plusieurs véhicules
  const advice = capacityAdvice(form.vehicleId, form.passengers, form.luggage)

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

  // ── Vérification des champs avant envoi (src/utils/bookingGuard.js) ──
  const validate = () => checkBooking({ ...form, flightNumber: flightValue }, new Date()).map(lbl)

  // ── Envoi de la demande + e-mails ──
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.date || !form.time || !form.pickup || !form.dropoff) return
    // Champ piège rempli : robot → confirmation affichée, rien n'est envoyé
    if (form.website) { setConfirmed(true); return }
    const errs = validate()
    if (!errs.length && tooFast(shownAt.current, Date.now())) errs.push(lbl('errFast'))
    setErrors(errs)
    if (errs.length) return
    // Plus de 3 demandes en 10 min depuis ce navigateur : appel / WhatsApp
    if (rateLimited(Date.now())) {
      setErrors([lbl('errLimit')])
      setEmailError(true)
      return
    }

    setSending(true)
    setEmailError(false)

    const priceLabel = requestPrice()

    // Texte brut uniquement, longueurs limitées (aucun HTML venant du visiteur)
    const templateParams = cleanParams({
      client_name:  form.name,
      client_email: form.email,
      client_phone: form.phone,
      booking_date: form.date,
      booking_time: form.time,
      pickup:       form.pickup,
      dropoff:      form.dropoff,
      vehicle:      `${selectedVehicle?.category} — ${selectedVehicle?.model}`,
      child_seats:  form.childSeats,
      passengers:   form.passengers,
      luggage:      form.luggage,
      flight_number: flightValue,
      price:        priceLabel,
    })
    // Options du SDK : clé publique + refus des navigateurs automatisés
    const options = { publicKey: EMAILJS_CONFIG.PUBLIC_KEY, blockHeadless: true }

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
        options,
      )
      recordSend(Date.now())
    } catch (err) {
      console.error('EmailJS (notification) :', err)
      setEmailError(true)   // → message de secours appel / WhatsApp
      setSending(false)
      return
    }

    // 2. Récapitulatif au client, seulement s'il a donné son e-mail — la
    //    demande est déjà arrivée : un échec ici ne doit pas afficher
    //    d'erreur (risque de doublon). Données minimales : pas de téléphone.
    let clientOk = false
    if (templateParams.client_email) {
      const { client_phone, ...clientParams } = templateParams
      try {
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.CLIENT_TEMPLATE_ID,
          clientParams,
          options,
        )
        clientOk = true
      } catch (err) {
        console.error('EmailJS (récapitulatif client) :', err)
      }
    }
    setClientMailOk(clientOk)
    track('Formulaire envoyé', { vehicule: form.vehicleId })
    setConfirmed(true)
    setSending(false)
  }

  // Demande pré-remplie pour WhatsApp (message de secours), valeurs nettoyées
  const c = (v, max) => cleanText(v, max)
  const whatsappRequest = (intro = 'Bonjour, je souhaite réserver un transfert :') => [
    intro,
    `• Nom : ${c(form.name, LIMITS.name)}`,
    `• Téléphone : ${c(form.phone, LIMITS.phone)}`,
    ...(form.email.trim() ? [`• E-mail : ${c(form.email, LIMITS.email)}`] : []),
    `• Date : ${c(form.date, 10)} à ${c(form.time, 5)}`,
    `• Départ : ${c(form.pickup, LIMITS.address)}`,
    `• Arrivée : ${c(form.dropoff, LIMITS.address)}`,
    `• Véhicule : ${selectedVehicle?.category} — ${selectedVehicle?.model}`,
    `• Passagers : ${c(form.passengers, 1)} · Bagages : ${c(form.luggage, 2)}`,
    ...(flightValue.trim() ? [`• Vol / train : ${c(flightValue, LIMITS.flight)}`] : []),
    ...(form.childSeats !== '0' ? [`• Sièges enfant / rehausseurs : ${c(form.childSeats, 1)}`] : []),
    `• Prix estimé : ${requestPrice()}`,
  ].join('\n')

  const L = {
    coords:   { fr: 'Vos coordonnées',  en: 'Your details',     ru: 'Ваши данные',       ro: 'Datele dvs.'      },
    journey:  { fr: 'Détails du trajet', en: 'Journey details',  ru: 'Детали поездки',    ro: 'Detalii cursă'    },
    name:     { fr: 'Nom complet',       en: 'Full name',        ru: 'Полное имя',         ro: 'Nume complet'     },
    phone:    { fr: 'Téléphone', en: 'Phone', ru: 'Телефон', ro: 'Telefon' },
    estimate: { fr: 'Obtenir une estimation', en: 'Get estimate', ru: 'Оценить стоимость', ro: 'Obțineți estimare' },
    send:     { fr: 'Confirmer la réservation', en: 'Confirm booking', ru: 'Подтвердить', ro: 'Confirmați rezervarea' },
    success:  { fr: 'Demande envoyée !', en: 'Request sent!', ru: 'Заявка отправлена!', ro: 'Cerere trimisă!' },
    waFast:   { fr: 'Accélérer la confirmation sur WhatsApp', en: 'Speed up confirmation on WhatsApp', ru: 'Ускорить подтверждение в WhatsApp', ro: 'Grăbiți confirmarea pe WhatsApp' },
    waIntro:  { fr: 'Bonjour, je viens d’envoyer une demande de réservation sur le site :', en: 'Hello, I have just sent a booking request on the website:', ru: 'Здравствуйте, я только что отправил(а) заявку на сайте:', ro: 'Bună ziua, tocmai am trimis o cerere de rezervare pe site:' },
    passengers:{ fr: 'Nombre de passagers', en: 'Number of passengers', ru: 'Количество пассажиров', ro: 'Număr de pasageri' },
    luggage:  { fr: 'Nombre de bagages', en: 'Number of bags', ru: 'Количество багажа', ro: 'Număr de bagaje' },
    flight:   { fr: 'Numéro de vol ou de train', en: 'Flight or train number', ru: 'Номер рейса или поезда', ro: 'Număr de zbor sau de tren' },
    flightHelp:{ fr: 'Nous suivons votre arrivée en temps réel : un retard n’est jamais facturé.', en: 'We track your arrival in real time: a delay is never charged.', ru: 'Мы отслеживаем ваше прибытие в реальном времени: задержка никогда не оплачивается.', ro: 'Urmărim sosirea dvs. în timp real: întârzierea nu se facturează niciodată.' },
    errFlight:{ fr: 'Numéro de vol ou de train invalide (lettres, chiffres, 20 caractères maximum).', en: 'Invalid flight or train number (letters and digits, 20 characters maximum).', ru: 'Неверный номер рейса или поезда (буквы и цифры, не более 20 символов).', ro: 'Număr de zbor sau de tren invalid (litere și cifre, maximum 20 de caractere).' },
    paxShort: { fr: 'Passagers · bagages', en: 'Passengers · bags', ru: 'Пассажиры · багаж', ro: 'Pasageri · bagaje' },
    flightShort:{ fr: 'Vol / train', en: 'Flight / train', ru: 'Рейс / поезд', ro: 'Zbor / tren' },
    chooseVan:{ fr: 'Choisir la Classe V', en: 'Choose the V-Class', ru: 'Выбрать V-класс', ro: 'Alegeți Clasa V' },
    success2: { fr: 'Nous vous confirmons votre course rapidement par téléphone ou WhatsApp.', en: 'We will confirm your ride shortly by phone or WhatsApp.', ru: 'Мы скоро подтвердим вашу поездку по телефону или в WhatsApp.', ro: 'Vă confirmăm cursa în curând prin telefon sau WhatsApp.' },
    success3: { fr: 'Un récapitulatif de votre demande vous a été envoyé par e-mail.', en: 'A summary of your request has been emailed to you.', ru: 'Сводка вашей заявки отправлена вам по электронной почте.', ro: 'Un rezumat al cererii v-a fost trimis pe e-mail.' },
    error:    { fr: "Votre demande n'a pas pu être envoyée. Contactez-nous directement :", en: 'Your request could not be sent. Please contact us directly:', ru: 'Не удалось отправить заявку. Свяжитесь с нами напрямую:', ro: 'Cererea nu a putut fi trimisă. Contactați-ne direct:' },
    call:     { fr: 'Appeler le', en: 'Call', ru: 'Позвонить', ro: 'Sunați la' },
    whatsapp: { fr: 'Envoyer ma demande par WhatsApp', en: 'Send my request via WhatsApp', ru: 'Отправить заявку в WhatsApp', ro: 'Trimiteți cererea pe WhatsApp' },
    errEmail: { fr: 'Adresse e-mail invalide.', en: 'Invalid email address.', ru: 'Неверный адрес эл. почты.', ro: 'Adresă de e-mail invalidă.' },
    errPhone: { fr: 'Numéro de téléphone invalide (nécessaire pour confirmer votre course).', en: 'Invalid phone number (needed to confirm your ride).', ru: 'Неверный номер телефона (нужен для подтверждения поездки).', ro: 'Număr de telefon invalid (necesar pentru confirmarea cursei).' },
    errDate:  { fr: 'La date et l’heure doivent être dans le futur.', en: 'The date and time must be in the future.', ru: 'Дата и время должны быть в будущем.', ro: 'Data și ora trebuie să fie în viitor.' },
    errDateFar:{ fr: 'La date ne peut pas dépasser 18 mois.', en: 'The date cannot be more than 18 months ahead.', ru: 'Дата не может быть позже чем через 18 месяцев.', ro: 'Data nu poate depăși 18 luni.' },
    errName:  { fr: 'Nom invalide (lettres, espaces, apostrophes et tirets, 2 à 80 caractères).', en: 'Invalid name (letters, spaces, apostrophes and hyphens, 2 to 80 characters).', ru: 'Неверное имя (буквы, пробелы, апострофы и дефисы, от 2 до 80 символов).', ro: 'Nume invalid (litere, spații, apostrofuri și cratime, 2–80 de caractere).' },
    errAddr:  { fr: 'Adresses de départ et d’arrivée : 3 à 200 caractères.', en: 'Pick-up and destination addresses: 3 to 200 characters.', ru: 'Адреса отправления и назначения: от 3 до 200 символов.', ro: 'Adresele de plecare și de destinație: 3–200 de caractere.' },
    errFast:  { fr: 'Merci de vérifier votre demande quelques secondes avant de l’envoyer.', en: 'Please take a few seconds to check your request before sending it.', ru: 'Пожалуйста, проверьте заявку несколько секунд перед отправкой.', ro: 'Vă rugăm să verificați cererea câteva secunde înainte de a o trimite.' },
    errLimit: { fr: 'Plusieurs demandes ont déjà été envoyées depuis cet appareil. Pour une nouvelle demande, appelez-nous ou écrivez-nous sur WhatsApp.', en: 'Several requests have already been sent from this device. For a new request, please call us or send a WhatsApp message.', ru: 'С этого устройства уже отправлено несколько заявок. Для новой заявки позвоните нам или напишите в WhatsApp.', ro: 'Din acest dispozitiv au fost deja trimise mai multe cereri. Pentru o cerere nouă, sunați-ne sau scrieți-ne pe WhatsApp.' },
    errInvalid:{ fr: 'Un champ contient une valeur invalide.', en: 'A field contains an invalid value.', ru: 'Одно из полей содержит недопустимое значение.', ro: 'Un câmp conține o valoare invalidă.' },
    optional: { fr: 'facultatif', en: 'optional', ru: 'необязательно', ro: 'opțional' },
    privacy:  { fr: 'Vos données servent uniquement à traiter votre demande de réservation. En savoir plus :', en: 'Your data is used only to process your booking request. Learn more:', ru: 'Ваши данные используются только для обработки заявки на бронирование. Подробнее:', ro: 'Datele dumneavoastră sunt folosite doar pentru a procesa cererea de rezervare. Aflați mai multe:' },
    privacyLink: { fr: 'politique de confidentialité', en: 'privacy policy', ru: 'политика конфиденциальности', ro: 'politica de confidențialitate' },
    hp:       { fr: 'Ne pas remplir ce champ', en: 'Do not fill in this field', ru: 'Не заполняйте это поле', ro: 'Nu completați acest câmp' },
    newbook:  { fr: 'Nouvelle réservation', en: 'New booking', ru: 'Новое бронирование', ro: 'Rezervare nouă' },
    calc:     { fr: 'Calcul…', en: 'Calculating…', ru: 'Расчёт…', ro: 'Calcul…' },
    sending:  { fr: 'Envoi…', en: 'Sending…', ru: 'Отправка…', ro: 'Trimitere…' },
    seats:    { fr: 'Siège enfant / rehausseur (nombre)', en: 'Child seat / booster (number)', ru: 'Детское кресло / бустер (количество)', ro: 'Scaun copil / înălțător (număr)' },
    seatsNone:{ fr: 'Aucun', en: 'None', ru: 'Не нужно', ro: 'Niciunul' },
    seatsShort:{ fr: 'Sièges enfant / rehausseurs', en: 'Child seats / boosters', ru: 'Детские кресла / бустеры', ro: 'Scaune copil / înălțătoare' },
  }
  const lbl = (key) => L[key]?.[lang] ?? L[key]?.fr ?? ''

  // Message de capacité (4 langues), valeurs officielles de vehicles.js
  const van = vehicles.find(v => v.id === 'van')
  const adviceText = () => {
    const v = selectedVehicle
    const cap = { fr: `${v.model} : ${v.seats} passagers et ${luggageLabel(v, 'fr')} maximum.`, en: `${v.model}: ${v.seats} passengers and ${luggageLabel(v, 'en')} maximum.`, ru: `${v.model}: не более ${v.seats} пассажиров и ${luggageLabel(v, 'ru')}.`, ro: `${v.model}: maximum ${v.seats} pasageri și ${luggageLabel(v, 'ro')}.` }[lang]
    const more = advice === 'van'
      ? { fr: `Le van ${van.model} accueille jusqu’à ${van.seats} passagers et ${luggageLabel(van, 'fr')}. Sur demande, nous organisons aussi plusieurs véhicules.`, en: `The ${van.model} van takes up to ${van.seats} passengers and ${luggageLabel(van, 'en')}. On request, we can also arrange several vehicles.`, ru: `Минивэн ${van.model} вмещает до ${van.seats} пассажиров и ${luggageLabel(van, 'ru')}. По запросу мы также организуем несколько автомобилей.`, ro: `Van-ul ${van.model} primește până la ${van.seats} pasageri și ${luggageLabel(van, 'ro')}. La cerere, organizăm și mai multe vehicule.` }[lang]
      : { fr: 'Sur demande, nous organisons plusieurs véhicules grâce à notre réseau de chauffeurs partenaires vérifiés : envoyez votre demande, nous vous rappelons pour l’organiser.', en: 'On request, we arrange several vehicles through our network of vetted partner chauffeurs: send your request and we will call you back to organise it.', ru: 'По запросу мы организуем несколько автомобилей благодаря сети проверенных водителей-партнёров: отправьте заявку, и мы перезвоним вам, чтобы всё организовать.', ro: 'La cerere, organizăm mai multe vehicule prin rețeaua noastră de șoferi parteneri verificați: trimiteți cererea, vă sunăm înapoi pentru organizare.' }[lang]
    return `${cap} ${more}`
  }

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
            {/* WhatsApp : la demande pré-remplie, pour une confirmation plus rapide */}
            <a href={whatsappLink(whatsappRequest(lbl('waIntro')))} target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 py-3 px-5 font-sans font-semibold text-xs tracking-[0.2em] uppercase
                bg-[#25D366] text-canvas hover:bg-[#20c05c] transition-all duration-300 ease-in-out">
              {lbl('waFast')}
            </a>
            <div className="mb-8" />
            <div className="text-left max-w-md mx-auto space-y-2 border border-divider p-6 mb-8">
              <SummaryRow label={form.name} value={`${form.date} · ${form.time}`} />
              <SummaryRow label={form.pickup} value="→" />
              <SummaryRow label={form.dropoff} value="" />
              <SummaryRow label={lbl('paxShort')} value={`${form.passengers} · ${form.luggage}`} />
              {flightValue.trim() && <SummaryRow label={lbl('flightShort')} value={flightValue.trim()} />}
              {form.childSeats !== '0' && <SummaryRow label={lbl('seatsShort')} value={form.childSeats} />}
              <SummaryRow label={`${selectedVehicle?.category} — ${selectedVehicle?.model}`} value={requestPrice() ?? ''} gold />
            </div>
            <button
              onClick={() => {
                setConfirmed(false)
                setClientMailOk(true)
                setErrors([])
                reset()
                setForm(f => ({ ...f, name: '', email: '', phone: '', date: '', time: '', pickup: '', dropoff: '', childSeats: '0', passengers: '1', luggage: '1', flightNumber: '' }))
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
      <div className="absolute inset-0 opacity-[0.03] bg-dots-gold" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-eyebrow">{{ fr: 'Réservation', en: 'Booking', ru: 'Бронирование', ro: 'Rezervare' }[lang]}</p>
          <h2 className="section-title">{t('booking_title')}</h2>
          <div className="section-divider">
            <div className="h-px w-10 bg-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            <div className="h-px w-10 bg-gold/30" />
          </div>
        </div>

        <Reassurance lang={lang} />

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
                  <input id="name" type="text" name="name" value={form.name} autoComplete="name" maxLength={LIMITS.name}
                    onChange={handleChange} placeholder="Jean Dupont" required className="input-luxury" />
                </div>
                <div>
                  <label htmlFor="email" className="label-luxury">Email <span className="normal-case tracking-normal">({lbl('optional')})</span></label>
                  <input id="email" type="email" name="email" value={form.email} autoComplete="email" inputMode="email" maxLength={LIMITS.email}
                    onChange={handleChange} placeholder="jean@example.com" className="input-luxury" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="label-luxury">{lbl('phone')} *</label>
                  <input id="phone" type="tel" name="phone" value={form.phone} autoComplete="tel" inputMode="tel" maxLength={LIMITS.phone}
                    onChange={handleChange} placeholder="+33 6 XX XX XX XX" required className="input-luxury" />
                </div>
                {/* Champ piège anti-robots : hors écran, ignoré par le clavier
                    et les lecteurs d'écran ; un humain ne le remplit jamais */}
                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="website">{lbl('hp')}</label>
                  <input id="website" type="text" name="website" value={form.website}
                    onChange={handleChange} tabIndex={-1} autoComplete="off" />
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
                  maxLength={LIMITS.address}
                  label={t('booking_pickup')}
                />
                <AddressAutocomplete
                  id="dropoff"
                  name="dropoff"
                  value={form.dropoff}
                  onChange={handleChange}
                  placeholder="CDG T1, Beauvais, Paris…"
                  required
                  maxLength={LIMITS.address}
                  label={t('booking_dropoff')}
                />
                {/* Vol ou train : seulement pour un aéroport ou une gare */}
                {showFlight && (
                  <div className="sm:col-span-2">
                    <label htmlFor="flightNumber" className="label-luxury">{lbl('flight')} <span className="normal-case tracking-normal">({lbl('optional')})</span></label>
                    <input id="flightNumber" type="text" name="flightNumber" value={form.flightNumber} maxLength={LIMITS.flight}
                      autoComplete="off" autoCapitalize="characters" spellCheck={false} aria-describedby="flight-help"
                      onChange={handleChange} placeholder="AF 1234 / TGV 6201" className="input-luxury" />
                    <p id="flight-help" className="mt-1.5 text-[11px] text-silver-dim">{lbl('flightHelp')}</p>
                  </div>
                )}
                <div>
                  <label htmlFor="passengers" className="label-luxury">{lbl('passengers')}</label>
                  <select id="passengers" name="passengers" value={form.passengers}
                    onChange={handleChange} className="input-luxury">
                    {PASSENGERS.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="luggage" className="label-luxury">{lbl('luggage')}</label>
                  <select id="luggage" name="luggage" value={form.luggage}
                    onChange={handleChange} className="input-luxury">
                    {LUGGAGE.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="childSeats" className="label-luxury">{lbl('seats')}</label>
                  <select id="childSeats" name="childSeats" value={form.childSeats}
                    onChange={handleChange} className="input-luxury">
                    {['0', '1', '2', '3', '4'].map(n => (
                      <option key={n} value={n}>{n === '0' ? lbl('seatsNone') : n}</option>
                    ))}
                  </select>
                </div>
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
              {/* Capacité dépassée : Classe V ou plusieurs véhicules */}
              <div role="status" aria-live="polite">
                {advice && (
                  <div className="mt-4 p-4 border border-gold/40 bg-gold/5 text-sm text-offwhite leading-relaxed">
                    <p>{adviceText()}</p>
                    {advice === 'van' && (
                      <button type="button" onClick={() => handleVehicle('van')} className="btn-outline mt-3 py-2.5 px-5">
                        {lbl('chooseVan')}
                      </button>
                    )}
                  </div>
                )}
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
              disabled={sending || !form.name || !form.phone || !form.date || !form.time || !form.pickup || !form.dropoff}
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
            {/* Information RGPD (art. 13) : finalité + lien vers la politique */}
            <p className="mt-2 text-[11px] text-silver-dim tracking-wide">
              {lbl('privacy')}{' '}
              <a href={pagePath(lang, 'confidentialite')} className="text-gold underline underline-offset-2 hover:text-gold-hover transition-colors duration-300">{lbl('privacyLink')}</a>
            </p>

          </form>
        </div>
      </div>
    </section>
  )
}

// ── Rassurance au-dessus du formulaire : informations officielles du
//    client uniquement (flotte, conditions), lien vers la fiche Google ──
const TRUST = {
  fleet: {
    fr: 'Mercedes Classe E conduite par le responsable, Classe S, Classe V et Tesla',
    en: 'Mercedes E-Class driven by the owner, S-Class, V-Class and Tesla',
    ru: 'Mercedes E-класса (за рулём — сам владелец), S-класс, V-класс и Tesla',
    ro: 'Mercedes Clasa E condus de proprietar, Clasa S, Clasa V și Tesla',
  },
  items: {
    fr: ['Suivi de vol en temps réel', '1 h d’attente incluse', 'Péages inclus', 'Annulation gratuite jusqu’à 24 h avant', 'Une facture pour chaque course'],
    en: ['Real-time flight tracking', '1 h of waiting included', 'Tolls included', 'Free cancellation up to 24 h before', 'An invoice for every ride'],
    ru: ['Отслеживание рейса в реальном времени', '1 час ожидания включён', 'Платные дороги включены', 'Бесплатная отмена не позднее чем за 24 часа', 'Счёт за каждую поездку'],
    ro: ['Urmărirea zborului în timp real', '1 h de așteptare inclusă', 'Taxe de autostradă incluse', 'Anulare gratuită cu până la 24 h înainte', 'Factură pentru fiecare cursă'],
  },
  reviews: { fr: 'Lire les avis Google', en: 'Read our Google reviews', ru: 'Читать отзывы в Google', ro: 'Citiți recenziile Google' },
  label: { fr: 'Nos engagements', en: 'Our commitments', ru: 'Наши обязательства', ro: 'Angajamentele noastre' },
}

function Reassurance({ lang }) {
  return (
    <div className="mb-6 border border-divider bg-canvas-3/40 p-5 md:p-6">
      <p className="text-sm text-offwhite font-sans mb-3">
        <span className="text-gold font-semibold">{TRUST.label[lang]} · </span>{TRUST.fleet[lang]}
      </p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-silver font-sans" aria-label={TRUST.label[lang]}>
        {TRUST.items[lang].map(item => (
          <li key={item} className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-gold flex-shrink-0" aria-hidden="true">
              <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
      <a href={BUSINESS.googleProfile} target="_blank" rel="noopener noreferrer"
        className="mt-4 inline-block text-xs text-gold underline underline-offset-2 hover:text-gold-hover transition-colors duration-300">
        {TRUST.reviews[lang]} →
      </a>
    </div>
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
