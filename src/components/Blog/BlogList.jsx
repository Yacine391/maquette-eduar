// ── Blog : liste des articles (/blog) et pages de catégorie ──────────
// Filtre par catégorie = liens vers /blog/<categorie> (HTML statique, sans
// JavaScript). 12 articles par page (/page/2…). Une catégorie sans article
// affiche son intro et des liens vers les pages services.
// ────────────────────────────────────────────────────────────────────
import { BLOG_HOME, BLOG_UI } from '../../content/blog/blog'
import { CATEGORIES, CATEGORY } from '../../content/blog/categories'
import { POSTS, postsIn, pageCount, pageOf } from '../../blog/routes'
import { pagePath, routePath } from '../../routes'
import { Breadcrumb, PostCard, Pagination, ServiceLinks } from './parts'

export default function BlogList({ route, lang }) {
  const ui = BLOG_UI[lang]
  const cat = route.page === 'blog-category' ? CATEGORY[route.category] : null
  const list = cat ? postsIn(cat.slug) : POSTS
  const num = route.num ?? 1
  const pages = pageCount(list.length)
  const shown = pageOf(list, num)
  const href = (n) => routePath({ ...route, num: n })
  // Filtre : catégories qui ont au moins un article
  const filters = CATEGORIES.filter(c => postsIn(c.slug).length > 0 || c.slug === cat?.slug)
  const chip = (active) => `inline-flex items-center gap-2 px-4 py-2 border text-xs tracking-[0.15em] uppercase transition-colors duration-300
    ${active ? 'border-gold text-gold' : 'border-divider text-silver hover:text-gold hover:border-gold/40'}`

  const crumbs = [{ label: ui.home, href: pagePath(lang, 'home') }, { label: ui.blog, href: '/blog' }]
  if (cat) crumbs.push({ label: cat.name, href: routePath({ ...route, num: 1 }) })

  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={crumbs} lang={lang} />
          <h1 className="font-serif text-4xl md:text-5xl text-offwhite leading-tight mb-6">{cat ? cat.name : BLOG_HOME.h1}</h1>
          <div className="max-w-3xl">
            {(cat ? cat.intro : [BLOG_HOME.intro]).map(p => (
              <p key={p} className="text-silver font-sans font-light leading-relaxed mb-4">{p}</p>
            ))}
          </div>
          {filters.length > 0 && (
            <nav aria-label={ui.categories} className="mt-8">
              <ul className="flex flex-wrap gap-2">
                <li><a href="/blog" lang="fr" aria-current={!cat ? 'page' : undefined} className={chip(!cat)}>{BLOG_UI.fr.allPosts} <span className="text-silver-dim">{POSTS.length}</span></a></li>
                {filters.map(c => (
                  <li key={c.slug}>
                    <a href={`/blog/${c.slug}`} lang={c.lang} hrefLang={c.lang} aria-current={cat?.slug === c.slug ? 'page' : undefined} className={chip(cat?.slug === c.slug)}>
                      {c.short} <span className="text-silver-dim">{postsIn(c.slug).length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>

      <section className="pb-section px-6" aria-label={ui.latest}>
        <div className="max-w-6xl mx-auto">
          {shown.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1re carte : chargée tout de suite ; prioritaire sur /blog, où elle
                  est visible dès l'ouverture (sous l'intro courte) */}
              {shown.map((p, i) => <li key={p.url}><PostCard post={p} eager={i === 0} priority={i === 0 && !cat} /></li>)}
            </ul>
          ) : (
            <p className="text-silver font-sans font-light leading-relaxed border border-divider p-6">{ui.empty}</p>
          )}
          <Pagination num={num} pages={pages} href={href} lang={lang} />
        </div>
      </section>

      {cat && <ServiceLinks slugs={cat.services} lang={lang} title={ui.services} />}
    </>
  )
}
