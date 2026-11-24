// ── Page légale (mentions légales, confidentialité, CGV) ──────────────
// Texte : src/content/legal/pages/<slug>.js (prop body), le français fait
// foi (note sur les traductions). Liens écrits [texte](url) ; marqueurs
// [À COMPLÉTER : …] / [À VÉRIFIER : …] mis en évidence, avec un bandeau
// « Projet à valider par le client » tant qu'il en reste.
// Structure : fil d'Ariane, H1, date de mise à jour, sections.
// ────────────────────────────────────────────────────────────────────
import { Fragment } from 'react'
import { LEGAL_META, LEGAL_UI, LEGAL_UPDATED } from '../../content/legal/meta'
import { UI } from '../../content/ui'
import { pagePath } from '../../routes'

const TOKEN = /(\[À (?:COMPLÉTER|VÉRIFIER)[^\]]*\]|\[[^\]]+\]\([^)\s]+\))/
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/
const MONTHS = {
  fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  ro: ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'],
}
const formatDate = (iso, lang) => {
  const [y, m, d] = iso.split('-').map(Number)
  return lang === 'en' ? `${d} ${MONTHS.en[m - 1]} ${y}` : `${d} ${MONTHS[lang][m - 1]} ${y}`
}

// Texte avec liens et marqueurs mis en évidence
function Rich({ text }) {
  return text.split(TOKEN).map((part, i) => {
    if (!part) return null
    const link = part.match(LINK)
    if (link) {
      const ext = /^https?:\/\//.test(link[2])
      return <a key={i} href={link[2]} className="text-gold underline underline-offset-4 decoration-gold/50 hover:text-gold-hover transition-colors duration-300"
        {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{link[1]}</a>
    }
    if (part.startsWith('[À ')) return <mark key={i} className="todo-mark">{part}</mark>
    return <Fragment key={i}>{part}</Fragment>
  })
}

const P = ({ text }) => <p className="text-silver font-sans font-light leading-relaxed mb-4"><Rich text={text} /></p>

export default function LegalPage({ slug, body, lang }) {
  const meta = LEGAL_META[slug][lang]
  const c = body.i18n[lang]
  const ui = LEGAL_UI[lang]
  const draft = /\[À (?:COMPLÉTER|VÉRIFIER)/.test(JSON.stringify(c))

  return (
    <article className="pt-36 md:pt-44 pb-section px-6">
      <div className="max-w-3xl mx-auto">
        <nav aria-label={UI[lang].breadcrumb} className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-silver-dim">
            <li><a href={pagePath(lang, 'home')} className="hover:text-gold transition-colors duration-300">{UI[lang].home}</a></li>
            <li aria-hidden="true">›</li>
            <li><span aria-current="page" className="text-gold">{meta.nav}</span></li>
          </ol>
        </nav>

        <h1 className="font-serif text-4xl md:text-5xl text-offwhite leading-tight mb-4">{c.h1}</h1>
        <p className="text-xs text-silver-dim tracking-wide mb-8">
          {ui.updated} : <time dateTime={LEGAL_UPDATED}>{formatDate(LEGAL_UPDATED, lang)}</time>
        </p>

        {draft && (
          <div role="note" className="mb-8 border border-gold/60 bg-gold/10 p-5">
            <p className="font-sans font-semibold text-gold uppercase tracking-[0.15em] text-xs mb-2">{ui.draft}</p>
            <p className="text-sm text-silver font-sans">{ui.draftText}</p>
          </div>
        )}
        {ui.authoritative && <p className="mb-8 text-sm text-silver-dim italic font-sans">{ui.authoritative}</p>}

        {c.intro.map(t => <P key={t} text={t} />)}

        {c.sections.map(s => (
          <section key={s.h2} className="mt-10">
            <h2 className="font-serif text-2xl md:text-3xl text-offwhite mb-4">{s.h2}</h2>
            {s.paras?.map(t => <P key={t} text={t} />)}
            {s.list && (
              <ul className="space-y-3 mb-4">
                {s.list.map(t => (
                  <li key={t} className="flex gap-3 text-silver font-sans font-light leading-relaxed">
                    <span className="mt-2.5 w-1.5 h-1.5 rotate-45 bg-gold/70 flex-shrink-0" aria-hidden="true" />
                    <span><Rich text={t} /></span>
                  </li>
                ))}
              </ul>
            )}
            {s.after?.map(t => <P key={t} text={t} />)}
          </section>
        ))}
      </div>
    </article>
  )
}
