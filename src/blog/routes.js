// ── Routes du blog (selon les articles publiés) ──────────────────────
// Liste (12 articles par page), 10 catégories (paginées), articles.
// Une catégorie sans article est générée (intro, liens vers les services)
// mais n'apparaît ni dans le sitemap ni dans le filtre des catégories
// jusqu'à son premier article.
// ────────────────────────────────────────────────────────────────────
import { POSTS } from '../content/blog/generated/index.js'
import { CATEGORIES, CATEGORY } from '../content/blog/categories.js'
import { POSTS_PER_PAGE } from '../content/blog/blog.js'

export { POSTS }
export const postsIn = (category) => POSTS.filter(p => p.category === category)
export const pageCount = (n) => Math.max(1, Math.ceil(n / POSTS_PER_PAGE))
export const pageOf = (list, num) => list.slice((num - 1) * POSTS_PER_PAGE, num * POSTS_PER_PAGE)
const range = (n) => Array.from({ length: n }, (_, i) => i + 1)

export const BLOG_ROUTES = [
  ...range(pageCount(POSTS.length)).map(num => ({ lang: 'fr', page: 'blog', num })),
  ...CATEGORIES.flatMap(c => range(pageCount(postsIn(c.slug).length))
    .map(num => ({ lang: c.lang, page: 'blog-category', category: c.slug, num }))),
  ...POSTS.map(p => ({ lang: p.lang, page: 'blog-article', category: p.category, slug: p.slug })),
]

export const findPost = (category, slug) => POSTS.find(p => p.category === category && p.slug === slug)

// Pages du blog listées dans le sitemap : 1re page de la liste et des
// catégories qui ont au moins un article, tous les articles
export const inSitemap = (route) => (route.num ?? 1) === 1
  && (route.page !== 'blog-category' || postsIn(route.category).length > 0)

// Articles liés : même catégorie, les plus récents d'abord (3 au plus)
export const relatedPosts = (post, n = 3) => postsIn(post.category).filter(p => p.slug !== post.slug).slice(0, n)

export { CATEGORIES, CATEGORY }
