#!/usr/bin/env python3
# ── Génération des images optimisées (AVIF + WebP) ───────────────────
# CDG TRANSFERT VTC — à relancer après ajout ou remplacement d'une photo :
#   python3 scripts/optimize-images.py
# Sources (non déployées) : images-src/vehicles/*.jpg, images-src/logo.png
# Sorties (commitées, importées par Vite → noms hachés, cache 1 an) :
#   src/assets/vehicles/<nom>-<largeur>.avif|webp + sizes.json
#   src/assets/logo-<largeur>.avif|webp, src/assets/favicon-48.png
#   src/assets/grain.webp (texture du fond)
# Nécessite Pillow avec la prise en charge AVIF (Pillow ≥ 11.3).
# ────────────────────────────────────────────────────────────────────
import json
import random
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / 'images-src', ROOT / 'src' / 'assets'
# Largeurs générées (plafonnées à l'original) : 240 / 512 = cartes sur ordinateur
# (223 et 501 px), 640 = mobile (≈ 364 px × 1,75), 800 / 960 = écrans denses + galerie
WIDTHS = (240, 320, 512, 640, 800, 960)
AVIF_Q, WEBP_Q = 48, 72

# Photos de couverture des cartes de la flotte : un recadrage par gabarit de
# carte (sélectionné par <picture media="…"> dans src/components/Fleet), égal
# à la zone qu'affichait object-fit: cover + object-position sur la photo
# entière → même rendu, sans télécharger de pixels masqués.
# Gabarits (largeur/hauteur de la zone photo) : carte BUSINESS 224 px de haut
# → lg 501×224 (2,24), md pleine largeur tablette ≈ 3,2, xs mobile ≈ 1,6 ;
# autres cartes 160 px de haut → sm (≥ 640 px) ≈ 1,4, xs mobile ≈ 2,2.
# (nom: (object-position x/y, {gabarit: (format, largeurs)}))
# ⚠️ À mettre à jour si la photo de couverture (images[0]) d'un véhicule change.
SMALL = {'sm': (1.4, (240, 480)), 'xs': (2.2, (400, 640, 800))}
COVERS = {
    'classe-e-1':    ((0.5, 0.72), {'lg': (2.24, (512, 734)), 'md': (3.2, (512, 734)), 'xs': (1.6, (448, 640, 734))}),
    'classe-s-1':    ((0.5, 0.5), SMALL),
    'classe-v-1':    ((0.5, 0.5), SMALL),
    'tesla-model-y': ((0.5, 0.5), SMALL),
}

def save_variants(im, stem, widths, out_dir):
    for w in widths:
        h = round(im.height * w / im.width)
        v = im.resize((w, h), Image.LANCZOS)
        v.save(out_dir / f'{stem}-{w}.avif', quality=AVIF_Q, speed=4)
        v.save(out_dir / f'{stem}-{w}.webp', quality=WEBP_Q, method=6)

# Photos de la flotte
sizes = {}
vdir = OUT / 'vehicles'
vdir.mkdir(parents=True, exist_ok=True)
for old in vdir.glob('*'):
    if old.suffix in ('.avif', '.webp'):
        old.unlink()
for f in sorted((SRC / 'vehicles').glob('*.jpg')):
    im = Image.open(f).convert('RGB')
    widths = sorted({w for w in WIDTHS if w < im.width} | {min(im.width, WIDTHS[-1])})
    save_variants(im, f.stem, widths, vdir)
    sizes[f.stem] = {'width': im.width, 'height': im.height, 'widths': widths}
    print(f'{f.name}: {im.width}×{im.height} → {widths}')
    if f.stem in COVERS:
        (px, py), crops = COVERS[f.stem]
        sizes[f.stem]['cards'] = {}
        for key, (aspect, card_widths) in crops.items():
            # Zone visible avec object-fit: cover + object-position (px, py)
            if im.width / im.height > aspect:
                cw, ch = round(im.height * aspect), im.height
                left, top = round(px * (im.width - cw)), 0
            else:
                cw, ch = im.width, round(im.width / aspect)
                left, top = 0, round(py * (im.height - ch))
            crop = im.crop((left, top, left + cw, top + ch))
            cwidths = sorted({w for w in card_widths if w < crop.width} | {min(crop.width, card_widths[-1])})
            save_variants(crop, f'{f.stem}-card-{key}', cwidths, vdir)
            sizes[f.stem]['cards'][key] = {'width': crop.width, 'height': crop.height, 'widths': cwidths}
            print(f'   carte {key} {aspect}:1 → {crop.width}×{crop.height} → {cwidths}')
(vdir / 'sizes.json').write_text(json.dumps(sizes, indent=2) + '\n')

# Logo (affiché sur ~40 px de haut → 1x, 2x, 3x)
logo = Image.open(SRC / 'logo.png').convert('RGB')
for old in OUT.glob('logo-*'):
    old.unlink()
save_variants(logo, 'logo', (64, 128, 192), OUT)
print(f'logo: {logo.width}×{logo.height}')

# Favicon 48×48 (logo centré sur fond noir)
fav = Image.new('RGB', (48, 48), (0, 0, 0))
thumb = logo.copy(); thumb.thumbnail((48, 48), Image.LANCZOS)
fav.paste(thumb, ((48 - thumb.width) // 2, (48 - thumb.height) // 2))
fav.save(OUT / 'favicon-48.png', optimize=True)

# Grain du fond : tuile 128×128 pré-calculée. Remplace l'ancien filtre SVG
# feTurbulence (opacité 3 %), identique à l'œil mais très coûteux à
# rastériser (≈ 400 ms au chargement). Même apport lumineux mesuré sur
# l'original : +1 à +5 niveaux sur 255, centré sur +3.
rng = random.Random(2026)
levels = [1] * 7 + [2] * 31 + [3] * 41 + [4] * 18 + [5] * 3
grain = Image.new('RGBA', (128, 128))
grain.putdata([(255, 255, 255, rng.choice(levels)) for _ in range(128 * 128)])
grain.save(OUT / 'grain.webp', lossless=True, method=6)
print(f"grain: {(OUT / 'grain.webp').stat().st_size / 1024:.1f} Ko")
