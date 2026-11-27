---
name: design-board-render
description: Turn design work into presentation images (PNG) — concept boards, grey-scale draft thumbnails, CI sheets, mockups, storyboards — by writing an HTML board with real Thai and English web fonts and rendering it with headless Chromium, then checking every board against a QA checklist before sending. Use whenever design output should be shown as an image file ("ส่งเป็นไฟล์รูป", "ทำตัวอย่างให้ดู", "ส่งดราฟต์", "พรีเซนต์"), and whenever the graphic-designer or motion-graphics skill reaches a draft, develop or storyboard step.
---

# Design Board Render

The user wants work as **image files**. Build HTML + SVG boards, render to PNG. Reply in Thai.

## Tools (`SC=.claude/skills/design-board-render`)
- `scripts/setup_fonts.sh WORKDIR [pkg…]` — installs Thai + English Fontsource fonts into `WORKDIR/fonts` (once per session)
- `scripts/render.js BOARD.html OUT_DIR [SCALE] [IDS]` — each `<section id>` → PNG; prints WARN for failed fonts/images
- `assets/board-template.html` (1600×1000 presentation) · `assets/draft-template.html` (grey-scale, 6 numbered thumbs)
- `references/qa-checklist.md` — read before every send

## Credit budget
- Render scale 1 and look once per board; to check a detail, crop that area with PIL instead of viewing the whole board at scale 2.
- Re-render only the boards you changed (pass IDS).
- Reuse one WORKDIR and one fonts install per session; reuse SVG `<symbol>`s via `<use>` instead of redrawing.
- Render scale 2 once, for delivery only.

## Steps
1. `bash $SC/scripts/setup_fonts.sh $WORK` (scratchpad).
2. Copy a template to `$WORK/board.html`: add `@font-face` for brand fonts (files in `fonts/node_modules/@fontsource/<font>/files/`; Thai-only files need an English font first in `font-family`), brand colors in `:root` from `brands/<brand>/ci.md`, one `<section class="board" id>` per board, artwork as SVG `<symbol>`s, refs copied to `$WORK/refs/`.
3. `node $SC/scripts/render.js $WORK/board.html $WORK/out 1` → check every board against the QA checklist → fix → re-render.
4. Final: scale 2 into a folder the user can open (e.g. `deliverables/<brand>/<round>/`), numbered descriptive filenames; send with SendUserFile when available.
5. Tell the user what each board is, the recommendation and why, known limits, and which text is placeholder.

## Techniques
- Paper grain: `.grain` class (SVG noise, multiply)
- Cut-paper / ink edges: `feTurbulence` + `feDisplacementMap` scale 3–6
- Gooey: `feGaussianBlur` + `feColorMatrix` alpha `28 -11`, with `color-interpolation-filters="sRGB"` (else dark halos)
- Print hatching: line `<pattern>` + `clip-path`
- One character, many styles: CSS variables through `<use>`
- Thai per-letter effects: split with `Intl.Segmenter('th',{granularity:'grapheme'})`
- Quick mockups (sign, cup, bag) in CSS/SVG; for realism suggest Photoshop smart objects or Firefly
