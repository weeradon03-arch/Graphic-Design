---
name: pinterest-ref-scout
description: Pull design references from the user's public Pinterest boards cheaply — list boards and pin counts, download only pins not seen before (images and motion videos), tile them into one contact sheet or frame strip, and record what was learned as text in refs/style-library.md so later sessions read notes instead of re-viewing images. Use whenever the user shares a Pinterest link, says they added new refs or pins, asks to "ไปดู ref", "เช็ก pin ใหม่", "ดูบอร์ด", or when the graphic-designer or motion-graphics skill needs a brand's references.
---

# Pinterest Ref Scout

Principle: **look at new pins only, once, then keep text notes.** Reply in Thai.

## Requirements
- Network hosts: `www.pinterest.com`, `pinterest.com`, `i.pinimg.com`, `v1.pinimg.com` (if blocked, request them for the environment; the user approves).
- Playwright + Chromium, Python + Pillow, ffmpeg. Boards must be **public**.
- Logged out, Pinterest shows ~25 newest pins per board; new pins appear first, so they're always visible.

## Steps (`SC=.claude/skills/pinterest-ref-scout/scripts`, temp files in the scratchpad, never in the repo)
1. Boards + counts: `node $SC/scrape_board.js profile https://www.pinterest.com/<user>/ $TMP/profile.json`. Compare with `refs/seen-pins.json`; skip boards whose count didn't change (unless the user says they swapped pins). Skip non-design boards unless asked.
2. Changed boards only: `node $SC/scrape_board.js board <url> $TMP/b.json` then `python3 $SC/download.py $TMP/b.json $TMP/dl/<board> --seen refs/seen-pins.json` (downloads unseen pins only, prints their files).
3. View cheaply: `python3 $SC/contact_sheet.py $TMP/sheet.jpg <new files> --width 260` (use 160–200 when many). Videos: `bash $SC/video_frames.sh f.mp4 $TMP/frames.jpg` (18 frames in one image). Open full-size only for a pin whose detail matters.
4. Write notes in `refs/style-library.md` under that board: what the pin shows (form, color, type, layout, motion) and the usable lesson; update §10 "general taste" if taste shifted. A brand-specific board goes into `brands/<brand>/brief.md` instead.
5. Mark seen after writing notes: rerun step 2's `download.py` with `--mark`.
6. Report briefly: which boards had how many new pins, 3–5 style takeaways, impact on current work.

## Advice for the user's boards
Add pins to existing boards — no need for a new board each time. Create a new board only for a new category (ref-layout, ref-color, ref-packaging) or a new brand. 10–30 curated pins per board beats one mixed board.

## Known limits
Pinterest videos don't play in headless Chromium, so mp4 URLs are read from page data. Pin titles are usually missing logged out. If `scrape_board.js` returns 0 pins, inspect the DOM with Playwright and update the selectors.
