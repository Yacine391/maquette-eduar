// ── App — Composition de la page ────────────────────────────────────
// CDG TRANSFERT VTC — site en production (cdgtransfertvtc.fr)
// Une page par route (accueil + 7 pages services) et par langue :
//   Header → <main> (HomePage ou ServicePage) → Footer
// + Mobile (< 768 px) : barre fixe en bas Réserver / Appeler / WhatsApp,
//   masquée quand le formulaire est visible ; tablette et ordinateur :
//   bouton WhatsApp flottant bas-droite (pas de doublon sur mobile)
// ────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { useTranslation } from './hooks/useTranslation'
import Header      from './components/Header'
import Footer      from './components/Footer'
import { whatsappLink, PHONE_E164 } from './constants/contact'
import { hasBooking } from './routes'
import { homeAnchor } from './components/Header'

// Message pré-rempli du bouton WhatsApp flottant
const WHATSAPP_MSG = 'Bonjour je souhaite reserver un transfert avec CDG Transfert VTC'
const SKIP = { fr: 'Aller au contenu', en: 'Skip to content', ru: 'Перейти к содержанию', ro: 'Salt la conținut' }
const BAR = {
  label: { fr: 'Actions rapides', en: 'Quick actions', ru: 'Быстрые действия', ro: 'Acțiuni rapide' },
  book:  { fr: 'Réserver', en: 'Book', ru: 'Заказать', ro: 'Rezervă' },
  call:  { fr: 'Appeler', en: 'Call', ru: 'Позвонить', ro: 'Sună' },
}
const WA_LABEL = { fr: 'Contacter sur WhatsApp', en: 'Contact us on WhatsApp', ru: 'Написать в WhatsApp', ro: 'Contactați-ne pe WhatsApp' }

// route = { lang, page } : écrite au pré-rendu, relue à l'hydratation
// Page  = composant de la page (HomePage ou ServicePage), chargé à part pour
//         que chaque type de page n'embarque que son propre code
// body  = texte de la page service affichée (src/content/services/pages/)
export default function App({ route, Page, body }) {
  const { lang, page } = route
  const { t } = useTranslation(lang)
  const bookingHref = hasBooking(route) ? '#booking' : homeAnchor(lang, 'booking')

  // Barre mobile masquée quand le formulaire est à l'écran (inutile, et
  // elle cacherait le bouton d'envoi) ; transform seul → aucun décalage (CLS)
  const [formVisible, setFormVisible] = useState(false)
  useEffect(() => {
    const el = document.getElementById('booking')
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { rootMargin: '0px 0px -15% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [page])

  return (
    <div className="min-h-screen bg-canvas text-offwhite font-sans overflow-x-hidden pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">

      {/* Lien d'évitement (clavier) : visible seulement au focus */}
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] btn-primary">
        {SKIP[lang]}
      </a>

      {/* Header sticky avec barre info et liens de langue */}
      <Header t={t} lang={lang} route={route} />

      {/* Contenu principal (repère <main> unique) */}
      <main id="contenu">
        <Page slug={page} route={route} body={body} t={t} lang={lang} />
      </main>

      <Footer t={t} lang={lang} route={route} />

      {/* ── Mobile : barre fixe Réserver / Appeler / WhatsApp ── */}
      <nav aria-label={BAR.label[lang]} aria-hidden={formVisible || undefined}
        className={`md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-3 border-t border-divider bg-[#050507]/95
          pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-in-out
          ${formVisible ? 'translate-y-full' : 'translate-y-0'}`}>
        <a href={bookingHref} tabIndex={formVisible ? -1 : undefined}
          className="flex items-center justify-center h-14 bg-gold text-canvas font-sans font-semibold text-xs tracking-[0.15em] uppercase">
          {BAR.book[lang]}
        </a>
        <a href={`tel:${PHONE_E164}`} tabIndex={formVisible ? -1 : undefined}
          className="flex items-center justify-center gap-2 h-14 text-offwhite font-sans font-semibold text-xs tracking-[0.15em] uppercase">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gold" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z"/></svg>
          {BAR.call[lang]}
        </a>
        <a href={whatsappLink(WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" tabIndex={formVisible ? -1 : undefined}
          className="flex items-center justify-center h-14 bg-[#25D366] text-canvas font-sans font-semibold text-xs tracking-[0.1em] uppercase">
          WhatsApp
        </a>
      </nav>

      {/* ── Bouton WhatsApp flottant (tablette et ordinateur) ── */}
      <a
        href={whatsappLink(WHATSAPP_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={WA_LABEL[lang]}
        className="fixed bottom-6 right-5 z-50
          hidden md:flex items-center justify-center
          w-14 h-14 rounded-full
          bg-[#25D366] hover:bg-[#20c05c]
          shadow-[0_4px_20px_rgba(37,211,102,0.4)]
          hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)]
          transition-all duration-300 hover:scale-110
          md:w-14 md:h-14"
      >
        {/* Icône WhatsApp SVG officielle */}
        <svg
          viewBox="0 0 32 32"
          className="w-8 h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.37.627 4.59 1.72 6.513L2.667 29.333l6.972-1.683A13.26 13.26 0 0016.003 29.333C23.37 29.333 29.333 23.364 29.333 16c0-7.364-5.963-13.333-13.33-13.333zm0 24.133a10.8 10.8 0 01-5.498-1.5l-.394-.233-4.14 1.001.986-3.998-.256-.41A10.8 10.8 0 015.2 16c0-5.964 4.839-10.8 10.803-10.8 5.963 0 10.797 4.836 10.797 10.8 0 5.963-4.834 10.8-10.797 10.8zm5.923-8.095c-.326-.163-1.93-.952-2.23-1.061-.298-.11-.515-.163-.732.163-.217.327-.84 1.061-1.031 1.28-.19.217-.38.244-.706.082-.327-.163-1.38-.508-2.63-1.622-.972-.866-1.628-1.935-1.819-2.261-.19-.327-.02-.503.143-.665.147-.146.326-.38.49-.57.163-.19.217-.326.326-.543.11-.217.055-.407-.027-.57-.082-.163-.732-1.763-1.003-2.414-.264-.634-.532-.548-.732-.558-.19-.009-.407-.011-.624-.011-.217 0-.57.082-.868.407-.298.326-1.14 1.114-1.14 2.714s1.168 3.148 1.33 3.365c.163.217 2.298 3.51 5.568 4.922.778.336 1.386.537 1.859.687.781.249 1.493.214 2.055.13.627-.093 1.93-.788 2.203-1.549.272-.76.272-1.413.19-1.549-.08-.135-.298-.217-.624-.38z"/>
        </svg>
      </a>

    </div>
  )
}
