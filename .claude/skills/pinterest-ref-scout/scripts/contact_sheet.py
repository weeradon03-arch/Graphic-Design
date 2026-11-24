#!/usr/bin/env python3
"""Tile images into one contact sheet so many refs can be viewed in a single image.

Usage: python3 contact_sheet.py OUT.jpg IMG [IMG ...] [--cols 5] [--width 260] [--maxh 520]

Smaller --width means fewer tokens when viewing; 260px per tile is enough to read style.
"""
import argparse
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument('out'); ap.add_argument('images', nargs='+')
ap.add_argument('--cols', type=int, default=5); ap.add_argument('--width', type=int, default=260)
ap.add_argument('--maxh', type=int, default=520)
a = ap.parse_args()

w = a.width; tiles = []
for f in a.images:
    try:
        im = Image.open(f).convert('RGB')
    except Exception as e:
        print('skip', f, e); continue
    h = int(im.height * w / im.width)
    tiles.append(im.resize((w, h)).crop((0, 0, w, min(h, a.maxh))))
if not tiles:
    raise SystemExit('no images')
rows = [tiles[i:i + a.cols] for i in range(0, len(tiles), a.cols)]
sheet = Image.new('RGB', (a.cols * (w + 6), sum(max(t.height for t in r) + 6 for r in rows)), 'white')
y = 0
for r in rows:
    for j, t in enumerate(r):
        sheet.paste(t, (j * (w + 6), y))
    y += max(t.height for t in r) + 6
sheet.save(a.out, quality=85)
print(a.out, len(tiles), 'tiles', sheet.size)
