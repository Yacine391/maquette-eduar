#!/usr/bin/env python3
# ── Images du blog (AVIF + WebP + image de partage) ──────────────────
# CDG TRANSFERT VTC — à relancer après ajout ou remplacement d'une image :
#   python3 scripts/optimize-blog-images.py
# Source (non déployée) : images-src/blog/<nom>.jpg (photos du client)
# Sorties (commitées) :
#   public/img/blog/<nom>-<largeur>-<empreinte>.avif|webp  (recadrage 16:9)
#   public/img/blog/<nom>-og-<empreinte>.jpg                (partage 1,91:1)
#   content/blog/images.json  (dimensions + URL, lu par scripts/blog/generate.mjs)
# Noms avec empreinte du contenu → cache 1 an immuable (vercel.json, /img/).
# Dans un article : `image: <nom>` dans le frontmatter.
# ────────────────────────────────────────────────────────────────────
import hashlib
import io
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / 'images-src' / 'blog', ROOT / 'public' / 'img' / 'blog'
MANIFEST = ROOT / 'content' / 'blog' / 'images.json'
WIDTHS = (400, 640, 960, 1280)       # cartes (≈ 400 px) → article (≤ 768 px, écrans denses)
AVIF_Q, WEBP_Q, JPEG_Q = 50, 74, 82
# Point de cadrage horizontal / vertical par image (0..1), centre par défaut
FOCUS = {}

def crop(im, aspect, focus):
    fx, fy = focus
    if im.width / im.height > aspect:
        w, h = round(im.height * aspect), im.height
        left, top = round(fx * (im.width - w)), 0
    else:
        w, h = im.width, round(im.width / aspect)
        left, top = 0, round(fy * (im.height - h))
    return im.crop((left, top, left + w, top + h))

def save(img, stem, ext, **opts):
    buf = io.BytesIO()
    img.save(buf, format={'avif': 'AVIF', 'webp': 'WEBP', 'jpg': 'JPEG'}[ext], **opts)
    data = buf.getvalue()
    name = f'{stem}-{hashlib.sha256(data).hexdigest()[:8]}.{ext}'
    (OUT / name).write_bytes(data)
    return f'/img/blog/{name}'

OUT.mkdir(parents=True, exist_ok=True)
for old in OUT.iterdir():
    old.unlink()
manifest = {}
for f in sorted(p for p in SRC.iterdir() if p.suffix.lower() in ('.jpg', '.jpeg', '.png')):
    im = Image.open(f).convert('RGB')
    focus = FOCUS.get(f.stem, (0.5, 0.5))
    wide = crop(im, 16 / 9, focus)
    widths = sorted({w for w in WIDTHS if w < wide.width} | {min(wide.width, WIDTHS[-1])})
    entry = {'width': wide.width, 'height': wide.height, 'avif': [], 'webp': []}
    for w in widths:
        v = wide.resize((w, round(wide.height * w / wide.width)), Image.LANCZOS)
        entry['avif'].append([w, save(v, f'{f.stem}-{w}', 'avif', quality=AVIF_Q, speed=4)])
        entry['webp'].append([w, save(v, f'{f.stem}-{w}', 'webp', quality=WEBP_Q, method=6)])
    og = crop(im, 1.91, focus)
    if og.width > 1200:
        og = og.resize((1200, 628), Image.LANCZOS)
    entry['og'] = {'url': save(og, f'{f.stem}-og', 'jpg', quality=JPEG_Q, optimize=True, progressive=True), 'width': og.width, 'height': og.height}
    manifest[f.stem] = entry
    print(f'{f.name}: {im.width}×{im.height} → 16:9 {wide.width}×{wide.height} {widths}, partage {og.width}×{og.height}')
MANIFEST.parent.mkdir(parents=True, exist_ok=True)
MANIFEST.write_text(json.dumps(manifest, indent=2) + '\n')
