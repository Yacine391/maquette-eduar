// ── Tests du blog (contenu, balises, JSON-LD, sitemap, RSS, llms.txt) ─
// Lancer : npm test (génère d'abord src/content/blog/generated/)
// ────────────────────────────────────────────────────────────────────
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { ROUTES, routeUrl } from '../src/routes.js'
import { rateTable } from '../src/constants/rates.js'
import { CATEGORIES } from '../src/content/blog/categories.js'
import { BLOG_HOME, BLOG_UI } from '../src/content/blog/blog.js'
import { POSTS, BLOG_ROUTES, postsIn, pageCount, pageOf, inSitemap } from '../src/blog/routes.js'
import { ARTICLES } from '../src/content/blog/generated/articles.js'
import { headFor, pageMeta } from '../src/seo/head.js'
import { jsonLd } from '../src/seo/schema.js'
import { sitemapXml, rssXml, llmsTxt } from '../src/seo/files.js'
import { loadPosts } from '../scripts/blog/generate.mjs'

const words = (s) => s.split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length
const text = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ')
const TABLE_PRICES = new Set(rateTable.flatMap(r => ['business', 'luxe', 'van', 'eco'].map(c => r[c])).filter(p => typeof p === 'number'))
const SLUGS = ['transferts-cdg', 'transferts-orly', 'transferts-beauvais', 'gares-parisiennes', 'disneyland-paris',
  'tourisme-paris', 'voyages-affaires', 'evenements', 'conseils-voyageurs', 'english-guides']

test('10 catégories : intro unique de 150 à 250 mots, title ≤ 60, description ≤ 155', () => {
  assert.deepEqual(CATEGORIES.map(c => c.slug), SLUGS)
  const intros = new Set()
  for (const c of CATEGORIES) {
    const n = words(c.intro.join(' '))
    assert.ok(n >= 150 && n <= 250, `${c.slug} : intro de ${n} mots`)
    intros.add(c.intro.join(' '))
    assert.equal(c.lang, c.slug === 'english-guides' ? 'en' : 'fr')
    assert.ok(c.services.length >= 1)
  }
  assert.equal(intros.size, 10)
})

test('title ≤ 60 et description ≤ 155, uniques sur tout le site (pages + blog)', () => {
  const all = [...ROUTES, ...BLOG_ROUTES]
  const titles = new Set(), descs = new Set()
  for (const r of all) {
    const { title, description } = pageMeta(r)
    assert.ok(title.length <= 60, `title trop long (${title.length}) : ${routeUrl(r)}`)
    assert.ok(description.length <= 155, `description trop longue (${description.length}) : ${routeUrl(r)}`)
    titles.add(title); descs.add(description)
  }
  assert.equal(titles.size, all.length, 'titles en double')
  assert.equal(descs.size, all.length, 'descriptions en double')
})

test('articles : frontmatter complet, temps de lecture calculé, un seul h1 (aucun dans le texte), sommaire', () => {
  assert.ok(POSTS.length >= 1)
  for (const p of POSTS) {
    const a = ARTICLES[`${p.category}/${p.slug}`]
    for (const k of ['title', 'description', 'date', 'updated', 'category', 'image', 'lang']) assert.ok(a[k], `${p.url} : ${k}`)
    assert.equal(a.lang, p.category === 'english-guides' ? 'en' : 'fr')
    assert.equal(a.readingTime, Math.max(1, Math.round(a.wordCount / 200)))
    assert.doesNotMatch(a.html.join(''), /<h1/)
    assert.ok(a.toc.length >= 2)
    for (const h of a.toc) assert.ok(a.html.join('').includes(`id="${h.id}"`), `ancre ${h.id}`)
    assert.ok(a.image.alt && a.image.width && a.image.height && a.image.avif && a.image.webp)
  }
})

test('article d’exemple : réponse directe, renvoi aux tarifs', () => {
  const a = ARTICLES['transferts-cdg/temps-trajet-cdg-paris-vtc']
  assert.ok(a, 'article d’exemple manquant')
  assert.match(text(a.html[0]), /45 minutes à 1 heure/)
  assert.match(text(a.html.join(' ')), /tarif indicatif, confirmé avant la course/)
})

test('chaque article : 900 à 1 400 mots, 3 à 5 questions, liens vers services et articles, date non future', () => {
  const today = new Date().toISOString().slice(0, 10)
  const SERVICE = /^\/(?:(?:en|ru|ro)\/)?(?:vtc-|van-|mise-a-)/
  for (const a of Object.values(ARTICLES)) {
    assert.ok(a.wordCount >= 900 && a.wordCount <= 1400, `${a.url} : ${a.wordCount} mots`)
    assert.ok(a.faq.length >= 3 && a.faq.length <= 5, `${a.url} : ${a.faq.length} questions`)
    const links = [...a.html.join(' ').matchAll(/href="([^"]+)"/g)].map(m => m[1])
    const services = new Set(links.filter(l => SERVICE.test(l)))
    const articles = new Set(links.filter(l => l.startsWith('/blog/') && l !== a.url))
    assert.ok(services.size >= 2, `${a.url} : ${services.size} lien(s) vers les pages services`)
    if (POSTS.length >= 3) assert.ok(articles.size >= 2, `${a.url} : ${articles.size} lien(s) vers d’autres articles`)
    for (const l of articles) assert.ok(POSTS.some(p => p.url === l), `${a.url} : lien vers un article inexistant ${l}`)
    assert.ok(a.date <= today, `${a.url} : date de publication dans le futur`)
  }
})

test('blog : prix = prix du tableau, aucune mention en attente de confirmation', () => {
  const all = [
    BLOG_HOME.title, BLOG_HOME.description, BLOG_HOME.intro,
    ...Object.values(BLOG_UI).flatMap(ui => Object.values(ui).filter(v => typeof v === 'string')),
    ...CATEGORIES.flatMap(c => [c.name, c.title, c.description, ...c.intro]),
    ...Object.values(ARTICLES).flatMap(a => [a.title, a.description, text(a.html.join(' ')), ...a.faq.flatMap(f => [f.q, f.a])]),
  ].join('\n')
  for (const m of all.matchAll(/(?:€\s?(\d+)|(\d+)\s?€)/g)) assert.ok(TABLE_PRICES.has(Number(m[1] ?? m[2])), `prix hors tableau : ${m[0]}`)
  for (const re of [/attente/i, /péage/i, /minutes d.avance/i, /eau offerte/i, /banalis/i, /suivi de vol/i, /waiting/i, /\btolls?\b/i, /unmarked/i]) {
    const m = all.match(re)
    assert.equal(m, null, `mention interdite ${re} : « ${m && all.slice(Math.max(0, m.index - 40), m.index + 40)} »`)
  }
})

test('JSON-LD article : BlogPosting (auteur et éditeur = l’entreprise), BreadcrumbList, FAQPage, aucun avis', () => {
  for (const p of POSTS) {
    const route = { lang: p.lang, page: 'blog-article', category: p.category, slug: p.slug }
    const graph = jsonLd(route)['@graph']
    assert.doesNotMatch(JSON.stringify(graph), /"Review"|"AggregateRating"|aggregateRating|"review"/)
    const post = graph.find(n => n['@type'] === 'BlogPosting')
    assert.equal(post.headline, p.title)
    assert.equal(post.datePublished, p.date)
    assert.equal(post.dateModified, p.updated)
    assert.equal(post.inLanguage, p.lang)
    assert.ok(post.image.url.startsWith('https://cdgtransfertvtc.fr/img/blog/'))
    for (const who of [post.author, post.publisher]) {
      assert.equal(who['@id'], 'https://cdgtransfertvtc.fr/#entreprise')
      assert.equal(who.name, 'CDG TRANSFERT VTC')
    }
    const crumbs = graph.find(n => n['@type'] === 'BreadcrumbList').itemListElement
    assert.equal(crumbs.length, 4)
    assert.equal(crumbs.at(-1).item, routeUrl(route))
    const faq = graph.find(n => n['@type'] === 'FAQPage')
    assert.equal(Boolean(faq), ARTICLES[`${p.category}/${p.slug}`].faq.length > 0)
    if (faq) assert.equal(faq.mainEntity.length, ARTICLES[`${p.category}/${p.slug}`].faq.length)
  }
})

test('balises : canonical, hreflang de la page, og:type article, pages indexables', () => {
  for (const r of BLOG_ROUTES) {
    const head = headFor(r)
    const url = routeUrl(r)
    assert.ok(head.includes(`<link rel="canonical" href="${url}" />`))
    assert.ok(head.includes(`hreflang="${r.lang}" href="${url}"`))
    assert.ok(head.includes(`hreflang="x-default" href="${url}"`))
    assert.ok(head.includes('application/rss+xml'))
    assert.equal(head.includes('og:type" content="article"'), r.page === 'blog-article')
    assert.ok(head.includes('<meta name="robots" content="index, follow'), url)
    const empty = r.page === 'blog-category' && postsIn(r.category).length === 0
    assert.equal(inSitemap(r), !empty && (r.num ?? 1) === 1, url)
  }
  assert.ok(headFor({ lang: 'en', page: 'blog-category', category: 'english-guides', num: 1 }).includes('hreflang="en"'))
})

test('pagination : 12 articles par page', () => {
  assert.equal(pageCount(0), 1)
  assert.equal(pageCount(12), 1)
  assert.equal(pageCount(13), 2)
  const list = Array.from({ length: 25 }, (_, i) => i)
  assert.deepEqual(pageOf(list, 3), [24])
  assert.equal(pageOf(list, 1).length, 12)
})

test('sitemap, RSS et llms.txt : chaque article ajouté automatiquement', () => {
  const sitemap = sitemapXml('2026-01-01'), rss = rssXml(), llms = llmsTxt()
  assert.ok(sitemap.includes('<loc>https://cdgtransfertvtc.fr/blog</loc>'))
  for (const p of POSTS) {
    const url = `https://cdgtransfertvtc.fr${p.url}`
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), url)
    assert.ok(rss.includes(`<link>${url}</link>`), url)
    assert.ok(llms.includes(`(${url})`), url)
  }
  for (const c of CATEGORIES) {
    const url = `https://cdgtransfertvtc.fr/blog/${c.slug}`
    assert.equal(sitemap.includes(`<loc>${url}</loc>`), postsIn(c.slug).length > 0, url)
    assert.ok(llms.includes(`(${url})`), url)
  }
  assert.equal((rss.match(/<item>/g) ?? []).length, POSTS.length)
  assert.match(rss, /^<\?xml version="1.0" encoding="UTF-8"\?>\n<rss version="2.0"/)
})

test('générateur : refuse un article invalide', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'blog-'))
  const write = (body, fm = {}) => {
    rmSync(path.join(dir, 'transferts-cdg'), { recursive: true, force: true })
    mkdirSync(path.join(dir, 'transferts-cdg'))
    const front = { title: 'T', description: 'D', date: '2026-01-01', category: 'transferts-cdg', image: 'classe-s-tarmac', imageAlt: 'A', ...fm }
    writeFileSync(path.join(dir, 'transferts-cdg', 'essai.md'),
      `---\n${Object.entries(front).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}: "${v}"`).join('\n')}\n---\n${body}`)
  }
  const ok = 'Chapeau.\n\n## Un\n\nTexte.\n\n## Deux\n\nTexte.\n'
  write(ok)
  assert.equal(loadPosts(dir).length, 1)
  write('# Titre\n\n' + ok)
  assert.throws(() => loadPosts(dir), /niveau 1/)
  write(ok, { imageAlt: undefined })
  assert.throws(() => loadPosts(dir), /imageAlt/)
  write(ok, { category: 'transferts-orly' })
  assert.throws(() => loadPosts(dir), /dossier/)
  write(ok, { image: 'inconnue' })
  assert.throws(() => loadPosts(dir), /images\.json/)
  write(ok, { date: '23/11/2026' })
  assert.throws(() => loadPosts(dir), /AAAA-MM-JJ/)
  rmSync(dir, { recursive: true, force: true })
})
