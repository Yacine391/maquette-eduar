// ── Blog : éléments communs (fil d'Ariane, carte, encadré, pagination) ─
// CDG TRANSFERT VTC — pages /blog, /blog/<categorie>, /blog/<cat>/<article>
// ────────────────────────────────────────────────────────────────────
import { BUSINESS } from '../../constants/business'
import { BLOG_UI, formatDate } from '../../content/blog/blog'
import { CATEGORY } from '../../content/blog/categories'
import { SERVICE_META } from '../../content/services/meta'
import { pagePath } from '../../routes'

// Fil d'Ariane : [{ label, href }], le dernier élément est la page courante
export function Breadcrumb({ items, lang }) {
  return (
    <nav aria-label={BLOG_UI[lang].breadcrumb} className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-silver-dim">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">›</span>}
            {i < items.length - 1
              ? <a href={it.href} className="hover:text-gold transition-colors duration-300">{it.label}</a>
              : <span aria-current="page" className="text-gold">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Image d'article : AVIF + WebP, dimensions fixées ; différée sauf la première
// priority : image principale visible au chargement (fetchpriority="high")
export function CoverPicture({ image, sizes, eager = false, priority = false, className = '' }) {
  return (
    <picture>
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <img src={image.src} srcSet={image.webp} sizes={sizes} alt={image.alt}
        width={image.width} height={image.height} fetchpriority={priority ? 'high' : undefined}
        loading={eager ? 'eager' : 'lazy'} decoding="async" className={className} />
    </picture>
  )
}

// Carte d'article (listes, articles liés)
export function PostCard({ post, eager = false, priority = false, heading: H = 'h2' }) {
  const ui = BLOG_UI[post.lang]
  return (
    <article lang={post.lang} className="h-full">
      <a href={post.url} className="group flex flex-col h-full border border-divider bg-canvas hover:border-gold/40 transition-colors duration-300">
        <CoverPicture image={post.image} eager={eager} priority={priority} className="w-full h-auto aspect-video object-cover"
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, calc(100vw - 48px)" />
        <div className="flex flex-col flex-1 p-6">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold mb-3">{CATEGORY[post.category].short}</p>
          <H className="font-serif text-2xl text-offwhite leading-snug mb-3 group-hover:text-gold transition-colors duration-300">{post.title}</H>
          <p className="text-sm text-silver font-sans font-light leading-relaxed mb-5 flex-1">{post.description}</p>
          <p className="text-xs text-silver-dim">
            <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time> · {ui.minRead(post.readingTime)}
          </p>
        </div>
      </a>
    </article>
  )
}

// Encadré « Réservez votre chauffeur » (milieu et fin d'article)
export function BookCta({ lang }) {
  const ui = BLOG_UI[lang]
  return (
    <div className="my-12 border border-gold/40 bg-gold/[0.04] p-6 md:p-8">
      <p className="font-serif text-2xl md:text-3xl text-offwhite mb-3">{ui.ctaTitle}</p>
      <p className="text-silver font-sans font-light leading-relaxed mb-6">{ui.ctaText}</p>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <a href="#booking" className="btn-primary">{ui.ctaBook}</a>
        <a href={`tel:${BUSINESS.phoneE164}`} className="btn-outline">{ui.ctaCall} <span className="whitespace-nowrap">{BUSINESS.phoneDisplay}</span></a>
        <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-outline">{ui.ctaWhatsapp}</a>
      </div>
    </div>
  )
}

// Liens vers les pages services d'une catégorie
export function ServiceLinks({ slugs, lang, title }) {
  return (
    <section className="py-12 md:py-14 px-6 border-t border-divider/60">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-offwhite mb-6">{title}</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {slugs.map(s => {
            const c = SERVICE_META[s].i18n[lang]
            return (
              <li key={s}>
                <a href={pagePath(lang, s)} className="group block h-full border border-divider p-5 hover:border-gold/40 transition-colors duration-300">
                  <span className="block font-serif text-xl text-offwhite group-hover:text-gold transition-colors duration-300 mb-2">{c.nav}</span>
                  <span className="block text-sm text-silver font-sans font-light leading-relaxed">{c.card}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

// Pagination : href(n) → URL de la page n
export function Pagination({ num, pages, href, lang }) {
  if (pages <= 1) return null
  const ui = BLOG_UI[lang]
  const link = 'min-w-10 h-10 px-3 inline-flex items-center justify-center border text-sm transition-colors duration-300'
  return (
    <nav aria-label={ui.pagination} className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {num > 1 && <a href={href(num - 1)} className={`${link} border-divider text-silver hover:text-gold`}>{ui.prev}</a>}
      {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
        n === num
          ? <span key={n} aria-current="page" className={`${link} border-gold text-gold`}>{n}</span>
          : <a key={n} href={href(n)} aria-label={ui.page(n)} className={`${link} border-divider text-silver hover:text-gold`}>{n}</a>
      ))}
      {num < pages && <a href={href(num + 1)} className={`${link} border-divider text-silver hover:text-gold`}>{ui.next}</a>}
    </nav>
  )
}
