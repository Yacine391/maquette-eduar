#!/usr/bin/env python3
# ── Logo de l'en-tête : « CDG TRANSFERT VTC » recadré, fond transparent ──
# Source : images-src/logo.png (texte doré sur fond noir, grande marge).
# Le logo complet affiché sur 32–40 px de haut rendait le texte illisible
# sur mobile : on garde seulement « CDG / TRANSFERT VTC » (sans la phrase
# d'accroche, trop fine à cette taille), on rend le fond noir transparent
# (alpha = luminosité, couleur dé-prémultipliée) et on écrit les variantes
# AVIF / WebP src/assets/logo-mark-<largeur>.* (1x, 2x, 3x pour ~40 px de
# haut). Déterministe : relancer après un changement du logo source.
# Usage : python3 scripts/optimize-logo.py
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'src' / 'assets'
src = Image.open(ROOT / 'images-src' / 'logo.png').convert('RGB')

# Zone du texte (lignes « CDG » et « TRANSFERT VTC », sans l'accroche)
mask = src.convert('L').point(lambda v: 255 if v > 40 else 0)
x0, y0, x1, _ = mask.getbbox()
y1 = 323 + 1                     # bas de « TRANSFERT VTC » (accroche à partir de y = 351)
PAD = 6
crop = src.crop((x0 - PAD, y0 - PAD, x1 + PAD, y1 + PAD))

# Fond noir → transparent ; légère hausse de luminosité pour le contraste
px = crop.load()
out = Image.new('RGBA', crop.size)
po = out.load()
for y in range(crop.height):
    for x in range(crop.width):
        r, g, b = px[x, y]
        m = max(r, g, b)
        a = min(255, round(max(0, m - 12) * 255 / 170))
        if a == 0:
            po[x, y] = (0, 0, 0, 0)
            continue
        k = 255 / max(m, 1)
        # couleur pleine (dé-prémultipliée), plafonnée à l'or du site
        po[x, y] = (min(255, round(r * k * 0.86)), min(255, round(g * k * 0.86)), min(255, round(b * k * 0.86)), a)

for old in OUT.glob('logo-mark-*'):
    old.unlink()
for w in (192, 384, 576):
    w = min(w, out.width)
    h = round(out.height * w / out.width)
    v = out.resize((w, h), Image.LANCZOS)
    v.save(OUT / f'logo-mark-{w}.avif', quality=70, speed=4)
    v.save(OUT / f'logo-mark-{w}.webp', quality=88, method=6)
print(f'logo-mark : {out.width}×{out.height}')
