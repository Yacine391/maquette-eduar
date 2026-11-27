// ── Footer — Premium 4 colonnes ──────────────────────────────────────
// CDG TRANSFERT VTC — site en production (cdgtransfertvtc.fr)
// Marque · Navigation · Nos services (7 pages) · Contact rapide (NAP : nom,
// téléphone, zone — identiques à la fiche Google, src/constants/business.js)
// ────────────────────────────────────────────────────────────────────
import { Fragment, useEffect, useState } from 'react'
import Logo from '../Logo'
import { BUSINESS, AREA } from '../../constants/business'
import { UI } from '../../content/ui'
import { SERVICE_META_LIST } from '../../content/services/meta'
import { pagePath, hasBooking, LEGAL_SLUGS } from '../../routes'
import { LEGAL_META, LEGAL_UI } from '../../content/legal/meta'
import { homeAnchor } from '../Header'
import { BLOG_LINK } from '../../content/blog/link'

export default function Footer({ t, lang, route }) {
  // Année du build dans le HTML pré-généré, mise à jour côté navigateur
  const [year, setYear] = useState(__BUILD_YEAR__)
  useEffect(() => setYear(new Date().getFullYear()), [])
  const ui = UI[lang]
  const bookingHref = hasBooking(route) ? '#booking' : homeAnchor(lang, 'booking')

  const navLinks = [
    { label: t('nav_home'),    href: pagePath(lang, 'home') },
    { label: ui.services,      href: homeAnchor(lang, 'services') },
    { label: t('nav_fleet'),   href: homeAnchor(lang, 'fleet') },
    { label: BLOG_LINK[lang].label, href: BLOG_LINK[lang].href },
    { label: t('nav_booking'), href: bookingHref },
    { label: t('nav_contact'), href: homeAnchor(lang, 'contact') },
  ]


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
              <Logo className="h-10 w-auto" sizes="180px" />
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
            <a href={bookingHref} className="inline-block mt-6 btn-primary py-2.5 px-6 text-xs">
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
          {/* Pages légales (toutes les pages, toutes les langues) */}
          <nav aria-label={LEGAL_UI[lang].legal} className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            {LEGAL_SLUGS.map((slug, i) => (
              <Fragment key={slug}>
                {i > 0 && <span aria-hidden="true" className="text-[11px] text-silver-dim">·</span>}
                <a href={pagePath(lang, slug)} aria-current={route.page === slug ? 'page' : undefined}
                  className="text-[11px] text-silver-dim hover:text-gold underline-offset-4 hover:underline transition-colors duration-300 py-1">
                  {LEGAL_META[slug][lang].nav}
                </a>
              </Fragment>
            ))}
          </nav>
        </div>
      </div>

    </footer>
  )
}
