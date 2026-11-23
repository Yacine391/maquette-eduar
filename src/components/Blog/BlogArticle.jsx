// ── Blog : page article (/blog/<categorie>/<article>) ────────────────
// Fil d'Ariane, h1 unique, dates, temps de lecture, chapeau (réponse
// directe), sommaire, image, texte avec encadré « Réservez votre
// chauffeur » au milieu et à la fin, FAQ, articles liés, services liés,
// formulaire de réservation (#booking). Texte : body (module généré).
// ────────────────────────────────────────────────────────────────────
import { BLOG_UI, formatDate } from '../../content/blog/blog'
import { CATEGORY } from '../../content/blog/categories'
import { findPost, relatedPosts } from '../../blog/routes'
import { pagePath } from '../../routes'
import { Breadcrumb, CoverPicture, PostCard, BookCta, ServiceLinks } from './parts'
import Faq from '../Faq'
import BookingModule from '../BookingModule'

export default function BlogArticle({ body: post, lang, t }) {
  const ui = BLOG_UI[lang]
  const cat = CATEGORY[post.category]
  const related = relatedPosts(findPost(post.category, post.slug))
  const crumbs = [
    { label: ui.home, href: pagePath(lang, 'home') },
    { label: ui.blog, href: '/blog' },
    { label: cat.name, href: `/blog/${cat.slug}` },
    { label: post.title, href: post.url },
  ]

  return (
    <>
      <article>
        <header className="pt-36 md:pt-44 px-6">
          <div className="max-w-3xl mx-auto">
            <Breadcrumb items={crumbs} lang={lang} />
            <h1 className="font-serif text-4xl md:text-5xl text-offwhite leading-tight mb-6">{post.title}</h1>
            <p className="text-xs text-silver-dim tracking-wide mb-8">
              {ui.published} <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
              {' · '}{ui.updated} <time dateTime={post.updated}>{formatDate(post.updated, lang)}</time>
              {' · '}{ui.minRead(post.readingTime)}
            </p>
            <div className="prose-blog prose-lead" dangerouslySetInnerHTML={{ __html: post.html[0] }} />
          </div>
        </header>

        <div className="px-6 pb-8">
          <div className="max-w-3xl mx-auto">
            <nav aria-label={ui.toc} className="my-10 border border-divider p-6">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-4">{ui.toc}</p>
              <ol className="space-y-2 text-sm">
                {post.toc.map(h => (
                  <li key={h.id} className={h.level === 3 ? 'pl-5' : ''}>
                    <a href={`#${h.id}`} className="text-silver hover:text-gold transition-colors duration-300">{h.text}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <figure className="mb-10">
              <CoverPicture image={post.image} eager className="w-full h-auto"
                sizes="(min-width: 800px) 768px, calc(100vw - 48px)" />
            </figure>

            <div className="prose-blog" dangerouslySetInnerHTML={{ __html: post.html[1] }} />
            <BookCta lang={lang} />
            <div className="prose-blog" dangerouslySetInnerHTML={{ __html: post.html[2] }} />
            <BookCta lang={lang} />

            {post.tags.length > 0 && (
              <p className="text-xs text-silver-dim mt-8">
                {ui.tags} : {post.tags.join(' · ')}
              </p>
            )}
          </div>
        </div>
      </article>

      {post.faq.length > 0 && <Faq items={post.faq} title={ui.faqTitle} compact />}

      {related.length > 0 && (
        <section className="py-12 md:py-14 px-6 border-t border-divider/60">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-offwhite mb-6">{ui.related}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p => <li key={p.url}><PostCard post={p} heading="h3" /></li>)}
            </ul>
          </div>
        </section>
      )}

      <ServiceLinks slugs={cat.services} lang={lang} title={ui.services} />

      <BookingModule t={t} lang={lang} />
    </>
  )
}
