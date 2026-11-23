// ── Footer — Premium 4 colonnes ──────────────────────────────────────
// CDG TRANSFERT VTC — site en production (cdgtransfertvtc.fr)
// Marque · Navigation · Nos services (7 pages) · Contact rapide (NAP : nom,
// téléphone, zone — identiques à la fiche Google, src/constants/business.js)
// ────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import Logo from '../Logo'
import { BUSINESS, AREA } from '../../constants/business'
import { UI } from '../../content/ui'
import { SERVICE_META_LIST } from '../../content/services/meta'
import { pagePath } from '../../routes'
import { homeAnchor } from '../Header'

export default function Footer({ t, lang }) {
  // Année du build dans le HTML pré-généré, mise à jour côté navigateur
  const [year, setYear] = useState(__BUILD_YEAR__)
  useEffect(() => setYear(new Date().getFullYear()), [])
  const ui = UI[lang]

  const navLinks = [
    { label: t('nav_home'),    href: pagePath(lang, 'home') },
    { label: ui.services,      href: homeAnchor(lang, 'services') },
    { label: t('nav_fleet'),   href: homeAnchor(lang, 'fleet') },
    { label: t('nav_booking'), href: '#booking' },
    { label: t('nav_contact'), href: homeAnchor(lang, 'contact') },
  ]

  const legalText = {
    fr: ['Mentions légales', 'Politique de confidentialité', 'CGV'],
    en: ['Legal notice', 'Privacy policy', 'T&C'],
    ru: ['Правовая информация', 'Конфиденциальность', 'Условия'],
    ro: ['Mențiuni legale', 'Confidențialitate', 'T&C'],
  }

  const linkClass = 'flex items-center gap-2 text-sm text-silver hover:text-gold transition-colors duration-300 group'
  const dash = <span className="w-3 h-px bg-silver-dim group-hover:bg-gold group-hover:w-5 transition-all duration-300 flex-shrink-0" />

  return (
    <footer className="border-t border-divider">

      {/* ── Corps du footer ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Colonne 1 : Marque */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Logo className="h-9 w-auto opacity-80" sizes="51px" />
              <div>
                <p className="font-serif text-sm font-semibold tracking-[0.2em] text-gold leading-none">CDG TRANSFERT</p>
                <p className="text-[9px] tracking-[0.4em] text-silver-dim uppercase mt-0.5">VTC Premium</p>
              </div>
            </div>
            <p className="text-sm text-silver font-sans font-light leading-relaxed">
              {t('contact_desc')}
            </p>
            {/* Ligne gold */}
            <div className="mt-5 h-px w-10 bg-gold/40" />
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-silver-dim mb-5">
              {{ ru: 'Навигация', ro: 'Navigare' }[lang] ?? 'Navigation'}
            </p>
            <nav className="space-y-3" aria-label={{ fr: 'Navigation du pied de page', en: 'Footer navigation', ru: 'Навигация в подвале', ro: 'Navigare subsol' }[lang] ?? 'Navigation du pied de page'}>
              {navLinks.map(({ label, href }) => (
                <a key={label} href={href} className={linkClass}>{dash}{label}</a>
              ))}
            </nav>
          </div>

          {/* Colonne 3 : Nos services */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-silver-dim mb-5">
              {ui.footerServices}
            </p>
            <nav className="space-y-3" aria-label={ui.footerServices}>
              {SERVICE_META_LIST.map((s) => (
                <a key={s.slug} href={pagePath(lang, s.slug)} className={linkClass}>{dash}{s.i18n[lang].nav}</a>
              ))}
            </nav>
          </div>

          {/* Colonne 4 : Contact rapide (NAP) */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-silver-dim mb-5">
              {ui.quickContact}
            </p>
            <div className="space-y-3">
              <p className="text-sm text-offwhite font-sans font-medium">{BUSINESS.name}</p>
              <p className="text-sm text-silver font-sans">
                <a href={`tel:${BUSINESS.phoneE164}`} className="hover:text-gold transition-colors duration-300">{BUSINESS.phoneDisplay}</a>
              </p>
              <p className="text-sm text-silver font-sans">
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-gold transition-colors duration-300">{BUSINESS.email}</a>
              </p>
              <p className="text-sm text-silver font-sans">{AREA[lang]}</p>
              <p className="text-sm text-silver font-sans">{ui.available}</p>
            </div>
            {/* CTA footer */}
            <a href="#booking" className="inline-block mt-6 btn-primary py-2.5 px-6 text-xs">
              {t('hero_cta')}
            </a>
          </div>
        </div>
      </div>

      {/* ── Barre légale ── */}
      <div className="border-t border-divider">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-silver-dim font-sans">
            © {year} {BUSINESS.name} — {t('footer_rights')}
          </p>
          <div className="flex items-center gap-4">
            {/* Pages légales à venir : simple texte tant qu'elles n'existent pas
                (pas de faux bouton ni de lien mort) */}
            {(legalText[lang] ?? legalText.fr).map((item) => (
              <span key={item} className="text-[11px] text-silver-dim">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
