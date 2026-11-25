"""Generate Baan Boonthawee logo SVGs: hand-inked stamp mark (noise baked into vector
paths) + outlined Young Serif / Trirong text. Layers are top-level <g id=...> groups
so Illustrator opens them as named layers."""
import io, math, os, sys
from shapely.geometry import box, Point, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely import segmentize
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import uharfbuzz as hb

FONTDIR, OUT, TH_WEIGHT = sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else '500'
INK, PAPER, LAMP = '#1C1A17', '#F5F2EC', '#F7BC4B'

# ---------- hand-drawn wobble ----------
WAVES = [(.55, .31, 1.3, .9), (.37, .62, 4.1, .6), (.83, -.47, 2.2, .45), (-.29, .91, 5.3, .35), (1.4, .2, .7, .25)]
def nfield(x, y, k):
    return sum(a * math.sin(fx * x * (1 + .13 * k) + fy * y * (1 - .11 * k) + p + 2.7 * k) for fx, fy, p, a in WAVES) / 2.6
AMP = .55
def wob(pt):
    x, y = pt
    return (x + AMP * nfield(x, y, 0), y + AMP * nfield(x, y, 1))
def rough(geom):
    geom = segmentize(geom, .45)
    polys = geom.geoms if isinstance(geom, MultiPolygon) else [geom]
    out = []
    for p in polys:
        out.append(Polygon([wob(c) for c in p.exterior.coords], [[wob(c) for c in r.coords] for r in p.interiors]))
    return unary_union(out)

def path_d(geom):
    polys = geom.geoms if isinstance(geom, MultiPolygon) else [geom]
    d = []
    for p in polys:
        for ring in [p.exterior, *p.interiors]:
            c = list(ring.coords)
            d.append('M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in c[:-1]) + 'Z')
    return ' '.join(d)

# ---------- mark geometry (100x100 units) ----------
def arch(cx, bot, w, top):
    r = w / 2
    return unary_union([box(cx - r, top + r, cx + r, bot), Point(cx, top + r).buffer(r, 64)])
outer = box(10, 6, 90, 94)
bites = [Point(10 + 80 * i / 8, y).buffer(3.2, 48) for i in range(9) for y in (6, 94)] + \
        [Point(x, 6 + 88 * j / 9).buffer(3.2, 48) for j in range(10) for x in (10, 90)]
stamp = outer.difference(unary_union(bites))
paper_in = box(17, 13, 83, 87)
frame = stamp.difference(paper_in)
building = unary_union([box(21, 21, 79, 26), box(24, 25, 76, 87.6)])
WIN = [(30, 33, 0), (54, 33, 1), (30, 56, 0), (54, 56, 0)]
wins_unlit = unary_union([box(x, y, x + 16, y + 17) for x, y, l in WIN if not l])
win_lit = box(54, 33, 70, 50)
door = arch(50, 87.6, 12, 80 - 6)  # top of arch at 74 like draft (v-7 from 87, radius 6)

def ring(g, t):
    return g.difference(g.buffer(-t, join_style=2))

S = rough(stamp)
INKG = rough(unary_union([frame, building]).difference(unary_union([wins_unlit, win_lit, door])))
LITG = rough(win_lit)
HOLES = rough(unary_union([wins_unlit, door]))
# one-colour: unlit windows/door become thin outlines, lit window = open hole
MONO = rough(unary_union([frame, building]).difference(unary_union([win_lit, ring(wins_unlit, 1.4), ring(door, 1.4)])))
# reverse (on ink): frame + building in paper colour, inner paper area transparent (= background ink)
REV = INKG
REV_UNLIT = HOLES

def mark_layers(style, tf=''):
    g = []
    if style == 'color':
        g += [f'<g id="paper"{tf}><path fill="{PAPER}" fill-rule="evenodd" d="{path_d(S)}"/></g>',
              f'<g id="ink"{tf}><path fill="{INK}" fill-rule="evenodd" d="{path_d(INKG)}"/></g>',
              f'<g id="light"{tf}><path fill="{LAMP}" d="{path_d(LITG)}"/></g>']
    elif style == 'reverse':
        g += [f'<g id="paper"{tf}><path fill="{PAPER}" fill-rule="evenodd" d="{path_d(REV)}"/></g>',
              f'<g id="light"{tf}><path fill="{LAMP}" d="{path_d(LITG)}"/></g>']
    elif style in ('black', 'white'):
        col = INK if style == 'black' else PAPER
        g += [f'<g id="mark"{tf}><path fill="{col}" fill-rule="evenodd" d="{path_d(MONO)}"/></g>']
    return g

# ---------- text ----------
from fontTools.ttLib import woff2
def load(path):
    f = TTFont(path); buf = io.BytesIO(); f.flavor = None; f.save(buf); data = buf.getvalue()
    return TTFont(io.BytesIO(data)), data
FS = '/node_modules/@fontsource'
YS, YSd = load(f'{FONTDIR}{FS}/young-serif/files/young-serif-latin-400-normal.woff2')
TR, TRd = load(f'{FONTDIR}{FS}/trirong/files/trirong-thai-{TH_WEIGHT}-normal.woff2')
TRL, TRLd = load(f'{FONTDIR}{FS}/trirong/files/trirong-latin-{TH_WEIGHT}-normal.woff2')

def shape(font, data, text):
    face = hb.Face(data); hf = hb.Font(face); buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(hf, buf, {}); return buf.glyph_infos, buf.glyph_positions

def text_path(font, data, text, size, x, y, track=0.0, space_font=None):
    """Return (svg path d, advance width) — text set left at x, baseline y, in mark units."""
    upm = font['head'].unitsPerEm; s = size / upm
    gs = font.getGlyphSet(); order = font.getGlyphOrder()
    infos, poss = shape(font, data, text)
    pen = SVGPathPen(gs); cx = 0.0
    for info, pos in zip(infos, poss):
        name = order[info.codepoint]
        if name == '.notdef' and space_font is not None:  # thai subset has no space
            cx += .25 * upm + track * upm; continue
        tp = TransformPen(pen, (s, 0, 0, -s, x + (cx + pos.x_offset) * s, y - pos.y_offset * s))
        gs[name].draw(tp)
        cx += pos.x_advance + (track * upm if pos.x_advance else 0)
    width = (cx - (track * upm if text else 0)) * s
    return pen.getCommands(), width

def cap_height(font):
    return getattr(font['OS/2'], 'sCapHeight', 0) or font['head'].unitsPerEm * .7

def en_block(lines, size, track):
    out = []
    for ln in lines:
        d, w = text_path(YS, YSd, ln, size, 0, 0, track)
        out.append((d, w))
    return out

def svg(w, h, body, title):
    return (f'<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" '
            f'width="{w*10:.0f}" height="{h*10:.0f}">\n<title>{title}</title>\n' + '\n'.join(body) + '\n</svg>\n')

def build(kind, style):
    tc = {'color': INK, 'black': INK, 'white': PAPER, 'reverse': PAPER}[style]
    if kind == 'mark':
        return svg(100, 100, mark_layers(style), f'Baan Boonthawee mark {style}'), (100, 100)
    if kind == 'vertical':
        F, T, TR_ = 16.7, .14, 11.2
        d_en, w_en = text_path(YS, YSd, 'BAAN BOONTHAWEE', F, 0, 0, T)
        d_th, w_th = text_path(TR, TRd, 'บ้านบุญทวี', TR_, 0, 0, 0)
        W = max(100, w_en) + 8; ox = (W - 100) / 2
        y_en = 100 + 12 + F * .72; y_th = y_en + TR_ * 1.55
        d_en, _ = text_path(YS, YSd, 'BAAN BOONTHAWEE', F, (W - w_en) / 2, y_en, T)
        d_th, _ = text_path(TR, TRd, 'บ้านบุญทวี', TR_, (W - w_th) / 2, y_th, 0)
        H = y_th + TR_ * .55
        body = mark_layers(style, f' transform="translate({ox:.2f},0)"') + \
            [f'<g id="wordmark-en"><path fill="{tc}" d="{d_en}"/></g>', f'<g id="wordmark-th"><path fill="{tc}" d="{d_th}"/></g>']
        return svg(W, H, body, f'Baan Boonthawee vertical {style}'), (W, H)
    if kind == 'horizontal':
        F, T, TR_, gap = 23.3, .14, 14.6, 18.3
        _, w1 = text_path(YS, YSd, 'BAAN', F, 0, 0, T); _, w2 = text_path(YS, YSd, 'BOONTHAWEE', F, 0, 0, T)
        th = 'บ้านบุญทวี อพาร์ทเม้น'
        _, w3 = text_path(TR, TRd, th, TR_, 0, 0, 0, space_font=TRL)
        x0 = 100 + gap; lh = F * 1.32
        blockH = F * .72 + lh + TR_ * 1.6
        top = 50 - blockH / 2
        y1 = top + F * .72; y2 = y1 + lh; y3 = y2 + TR_ * 1.6
        d1, _ = text_path(YS, YSd, 'BAAN', F, x0, y1, T); d2, _ = text_path(YS, YSd, 'BOONTHAWEE', F, x0, y2, T)
        d3, _ = text_path(TR, TRd, th, TR_, x0, y3, 0, space_font=TRL)
        W = x0 + max(w1, w2, w3) + 4; H = 100
        body = mark_layers(style) + [f'<g id="wordmark-en"><path fill="{tc}" d="{d1} {d2}"/></g>',
                                     f'<g id="wordmark-th"><path fill="{tc}" d="{d3}"/></g>']
        return svg(W, H, body, f'Baan Boonthawee horizontal {style}'), (W, H)

os.makedirs(f'{OUT}/svg', exist_ok=True)
names = {'mark': 'A-stamp', 'vertical': 'B-vertical', 'horizontal': 'C-horizontal'}
for kind in ('mark', 'vertical', 'horizontal'):
    for style in ('color', 'reverse', 'black', 'white'):
        s, (w, h) = build(kind, style)
        fn = f'{OUT}/svg/BBT-{names[kind]}-{style}.svg'
        open(fn, 'w').write(s)
        print(fn.split('/')[-1], f'{w:.1f}x{h:.1f}')
