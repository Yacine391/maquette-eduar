// ── Blog : Markdown → modules JS (lancé au build, au test et en dev) ──
// CDG TRANSFERT VTC — lit content/blog/<categorie>/<slug>.md et écrit dans
// src/content/blog/generated/ (ignoré par git) :
//   index.js               métadonnées de tous les articles (listes, sitemap,
//                          RSS, llms.txt) — sans le texte
//   articles/<cat>--<slug>.js  un article complet (chargé sur sa page seulement)
//   articles.js            tous les articles (pré-rendu, JSON-LD, tests)
// Frontmatter : title, description, date, updated, category, tags, image,
// imageAlt, faq (question / answer), lang (fr ; en pour english-guides).
// Calculés : readingTime (200 mots / min), sommaire (h2 / h3 avec ancres),
// chapeau + texte coupé au h2 le plus proche du milieu (encadré « Réservez »).
// Toute erreur de contenu arrête le build avec un message explicite.
// ────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { Marked } from 'marked'
import YAML from 'yaml'
import { CATEGORY } from '../../src/content/blog/categories.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
export const CONTENT_DIR = path.join(ROOT, 'content', 'blog')
const OUT_DIR = path.join(ROOT, 'src', 'content', 'blog', 'generated')
const WORDS_PER_MINUTE = 200

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const words = (s) => s.split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length
const stripHtml = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ')
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

// Ancre lisible : « Temps de trajet à l’aéroport » → temps-de-trajet-a-l-aeroport
export function slugify(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function imageFor(name, alt, images, where) {
  const img = images[name]
  if (!img) throw new Error(`${where} : image « ${name} » absente de content/blog/images.json (lancer python3 scripts/optimize-blog-images.py)`)
  const srcset = (fmt) => img[fmt].map(([w, url]) => `${url} ${w}w`).join(', ')
  return {
    name, alt, width: img.width, height: img.height,
    avif: srcset('avif'), webp: srcset('webp'),
    src: img.webp[img.webp.length - 1][1],
    og: img.og,
  }
}

function parseArticle(file, category, images) {
  const where = path.relative(ROOT, file)
  const fail = (msg) => { throw new Error(`${where} : ${msg}`) }
  const raw = readFileSync(file, 'utf8').replace(/\r\n/g, '\n')
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) fail('frontmatter --- … --- manquant')
  let fm
  try { fm = YAML.parse(m[1]) ?? {} } catch (e) { fail(`frontmatter YAML invalide (mettre entre guillemets les valeurs contenant « : ») — ${e.message.split('\n')[0]}`) }
  const body = m[2]
  const slug = path.basename(file, '.md')
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) || slug === 'page') fail(`nom de fichier invalide « ${slug} » (minuscules, chiffres et tirets)`)

  for (const key of ['title', 'description', 'date', 'category', 'image', 'imageAlt']) {
    if (typeof fm[key] !== 'string' || !fm[key].trim()) fail(`champ « ${key} » manquant ou vide`)
  }
  if (fm.category !== category.slug) fail(`category « ${fm.category} » ≠ dossier « ${category.slug} »`)
  const updated = fm.updated ?? fm.date
  for (const [k, v] of [['date', fm.date], ['updated', updated]]) if (!ISO_DATE.test(v)) fail(`${k} doit être au format AAAA-MM-JJ`)
  if (updated < fm.date) fail('updated est antérieure à date')
  const lang = fm.lang ?? category.lang
  if (lang !== category.lang) fail(`lang « ${lang} » ≠ langue de la catégorie (${category.lang})`)
  const tags = fm.tags ?? []
  if (!Array.isArray(tags) || tags.some(t => typeof t !== 'string')) fail('tags doit être une liste de textes')
  const faq = (fm.faq ?? []).map((f, i) => {
    const q = f?.question ?? f?.q, a = f?.answer ?? f?.a
    if (typeof q !== 'string' || typeof a !== 'string') fail(`faq[${i}] : question et answer obligatoires`)
    return { q: q.trim(), a: a.trim() }
  })

  // Markdown → HTML : ancres sur les titres, images optimisées, tableaux
  // défilants sur mobile, liens externes en rel="noopener"
  const ids = new Set()
  const toc = []
  const marked = new Marked({ gfm: true })
  marked.use({
    renderer: {
      heading(token) {
        const inner = this.parser.parseInline(token.tokens)
        return `<h${token.depth}${token.id ? ` id="${token.id}"` : ''}>${inner}</h${token.depth}>\n`
      },
      link(token) {
        const text = this.parser.parseInline(token.tokens)
        const ext = /^https?:\/\//.test(token.href)
        return `<a href="${esc(token.href)}"${token.title ? ` title="${esc(token.title)}"` : ''}${ext ? ' rel="noopener"' : ''}>${text}</a>`
      },
      image(token) {
        const img = imageFor(token.href, token.text, images, where)
        return `<picture><source type="image/avif" srcset="${img.avif}" sizes="(min-width: 800px) 768px, calc(100vw - 48px)" />`
          + `<img src="${img.src}" srcset="${img.webp}" sizes="(min-width: 800px) 768px, calc(100vw - 48px)" alt="${esc(img.alt)}" width="${img.width}" height="${img.height}" loading="lazy" decoding="async" /></picture>`
      },
    },
  })

  const tokens = marked.lexer(body)
  for (const t of tokens) {
    if (t.type !== 'heading') continue
    if (t.depth === 1) fail('titre de niveau 1 (« # ») interdit : le h1 est le title du frontmatter')
    let id = slugify(t.text.replace(/[*_`[\]]/g, ''))
    while (ids.has(id)) id += '-2'
    ids.add(id)
    t.id = id
    if (t.depth <= 3) toc.push({ id, level: t.depth, text: stripHtml(marked.parseInline(t.text)).replace(/\s+/g, ' ').trim() })
  }

  // Trois parties : chapeau (avant le premier h2, réponse directe affichée
  // sous le h1), puis le texte coupé au h2 le plus proche du milieu
  // (encadré « Réservez votre chauffeur » entre les deux)
  const first = tokens.findIndex(t => t.type === 'heading' && t.depth === 2)
  const blockWords = tokens.map(t => words(t.raw ?? ''))
  const total = blockWords.reduce((a, b) => a + b, 0)
  let cut = -1, best = Infinity, acc = 0
  tokens.forEach((t, i) => {
    if (t.type === 'heading' && t.depth === 2 && i > first && Math.abs(acc - total / 2) < best) { best = Math.abs(acc - total / 2); cut = i }
    acc += blockWords[i]
  })
  if (first <= 0) fail('le texte doit commencer par un chapeau (réponse directe) avant le premier titre « ## »')
  if (cut < 0) fail('au moins deux titres « ## » sont nécessaires (sommaire et encadré au milieu)')
  const part = (list) => { const l = [...list]; l.links = tokens.links; return marked.parser(l) }
  // Tableaux : conteneur défilant sur mobile
  const wrapTables = (h) => h.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>')
  const html = [tokens.slice(0, first), tokens.slice(first, cut), tokens.slice(cut)].map(part).map(wrapTables)
  const wordCount = words(stripHtml(html.join(' ')))

  return {
    slug, category: category.slug, lang,
    url: `/blog/${category.slug}/${slug}`,
    title: fm.title.trim(), description: fm.description.trim(),
    date: fm.date, updated,
    tags, readingTime: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)), wordCount,
    image: imageFor(fm.image, fm.imageAlt.trim(), images, where),
    toc, faq, html,
  }
}

// Lit tous les articles ; dir = dossier des articles (tests : dossier temporaire)
export function loadPosts(dir = CONTENT_DIR) {
  const images = JSON.parse(readFileSync(path.join(CONTENT_DIR, 'images.json'), 'utf8'))
  const posts = []
  if (!existsSync(dir)) return posts
  for (const cat of readdirSync(dir).sort()) {
    const catDir = path.join(dir, cat)
    if (!statSync(catDir).isDirectory()) continue
    const category = CATEGORY[cat]
    if (!category) throw new Error(`content/blog/${cat} : catégorie inconnue (voir src/content/blog/categories.js)`)
    for (const f of readdirSync(catDir).filter(f => f.endsWith('.md')).sort()) posts.push(parseArticle(path.join(catDir, f), category, images))
  }
  // Du plus récent au plus ancien
  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
}

const HEADER = '// Fichier généré par scripts/blog/generate.mjs à partir de content/blog/ — ne pas modifier\n'
const key = (p) => `${p.category}--${p.slug}`

export function generateBlog(dir = process.env.BLOG_DIR ? path.resolve(process.env.BLOG_DIR) : CONTENT_DIR) {
  const posts = loadPosts(dir)
  rmSync(OUT_DIR, { recursive: true, force: true })
  mkdirSync(path.join(OUT_DIR, 'articles'), { recursive: true })
  const meta = posts.map(({ html, toc, faq, ...m }) => ({ ...m, faqCount: faq.length }))
  writeFileSync(path.join(OUT_DIR, 'index.js'), `${HEADER}export const POSTS = ${JSON.stringify(meta, null, 2)}\n`)
  for (const p of posts) writeFileSync(path.join(OUT_DIR, 'articles', `${key(p)}.js`), `${HEADER}export default ${JSON.stringify(p, null, 2)}\n`)
  writeFileSync(path.join(OUT_DIR, 'articles.js'), HEADER
    + posts.map((p, i) => `import a${i} from './articles/${key(p)}.js'\n`).join('')
    + `export const ARTICLES = {\n${posts.map((p, i) => `  '${p.category}/${p.slug}': a${i},\n`).join('')}}\n`)
  return posts
}

// Lancement direct : node scripts/blog/generate.mjs
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const posts = generateBlog()
  console.log(`blog : ${posts.length} article(s) → src/content/blog/generated/`)
  for (const p of posts) console.log(`  ${p.url} (${p.wordCount} mots, ${p.readingTime} min, ${p.toc.length} titres, ${p.faq.length} FAQ)`)
}
