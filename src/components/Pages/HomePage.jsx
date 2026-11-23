// ── Accueil (/, /en, /ru, /ro) ───────────────────────────────────────
// Ordre : Hero → Réservation → Flotte → Nos services → Pourquoi nous →
// Votre avis compte → Tarifs → FAQ → Contact
// ────────────────────────────────────────────────────────────────────
import Hero            from '../Hero'
import BookingModule   from '../BookingModule'
import Fleet           from '../Fleet'
import ServicesSection from '../ServicesSection'
import WhyUs           from '../WhyUs'
import Reviews         from '../Reviews'
import Rates           from '../Rates'
import Faq             from '../Faq'
import Contact         from '../Contact'
import { HOME } from '../../content/home'
import { UI } from '../../content/ui'

const FAQ_EYEBROW = { fr: 'FAQ', en: 'FAQ', ru: 'Вопросы', ro: 'Întrebări' }

export default function HomePage({ t, lang }) {
  return (
    <>
      <Hero t={t} lang={lang} />
      <BookingModule t={t} lang={lang} />
      <Fleet t={t} lang={lang} />
      <ServicesSection lang={lang} />
      <WhyUs lang={lang} />
      <Reviews t={t} lang={lang} />
      <Rates t={t} lang={lang} />
      <Faq items={HOME[lang].faq} title={UI[lang].faqTitle} eyebrow={FAQ_EYEBROW[lang]} />
      <Contact t={t} lang={lang} />
    </>
  )
}
