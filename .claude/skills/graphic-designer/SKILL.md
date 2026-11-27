---
name: graphic-designer
description: Senior graphic designer workflow for any brand — logo and brand identity (CI), layout and artwork (posters, social posts, menus, packaging, labels, signage, stickers), color palettes, Thai–English typography, mascots and illustration direction, and print-ready hand-off to Adobe apps. Always runs a detailed brief interview first, proposes ref-based directions, sends a rough draft for approval before final design, and keeps each brand's CI in brands/(brand)/. Use whenever the user asks to design, redesign, or critique anything visual — ออกแบบโลโก้, ทำ CI, จัดเลย์เอาต์, ทำ artwork/AW, โปสเตอร์, แพ็กเกจ, ฉลาก, ป้าย, เมนู, โพสต์โซเชียล, คู่สี, เลือกฟอนต์ไทย/อังกฤษ, มาสคอต, mockup — even if they don't name this skill. For animation or After Effects work use the motion-graphics skill instead.
---

# Graphic Designer

Reply in Thai (design terms in English are fine). Every brand has its own CI — never carry one brand's style into another. Style sources, in priority order:
1. The brand's brief and refs (`brands/<brand>/brief.md`, its Pinterest board)
2. Past feedback (`brands/<brand>/feedback-log.md`; "general taste" in `refs/style-library.md` §10)
3. The user's style library (`refs/style-library.md`) — inspiration only when the brief is open

The user continues in Adobe (Illustrator, Photoshop, After Effects) and wants **image files**, not code.

## Credit budget
- Read only the reference file the current step needs (routing table below); don't re-read files already read.
- Read `refs/style-library.md` (text) instead of re-viewing old ref images; view only new pins via `pinterest-ref-scout`.
- Drafts are small grey-scale thumbnails; check renders at scale 1 (crop to inspect details), render scale 2 once for delivery.
- Ask brief questions in one grouped message, not one by one.

## Workflow (⏸ = stop and wait for the user; never skip)
1. **Brief ⏸** — for every new brand or new piece. Pick questions from `references/brief-questions.md`, ask only what's unknown (AskUserQuestion for choice questions). For an existing brand read `brands/<brand>/` first. Summarise back for confirmation, save `brands/<brand>/brief.md` (template in `brands/_template/`). Never guess what a brand name means — ask.
2. **Refs & directions ⏸** — 2–3 directions. Each names the ref pins it borrows from and what (form / color / type / layout), a color pair, a Thai–English font pair, and why it fits the brief. Recommend one.
   **Ref-first rule:** never start from the industry's stock icon (washing machine, coffee cup + steam, check mark, leaf) or its cliché colors unless the brief asks; translate business cues through the refs' visual language.
3. **Draft ⏸** — grey-scale thumbnails (3–6 per direction, numbered) with `design-board-render` + `draft-template.html`. Say clearly it's a draft; ask which numbers to develop.
4. **Develop ⏸** — color, type, detail; presentation boards with the ref beside the work. Log every piece of feedback in `brands/<brand>/feedback-log.md`.
5. **System & hand-off** — CI sheet (logo versions, clear space, min size, misuse, palette HEX/RGB/CMYK, fonts, examples); save `brands/<brand>/ci.md`; files per `references/print-production.md`. Motion work → `motion-graphics`, which reads the same `ci.md`.

## Routing table
| Need | File |
|---|---|
| Brief questions by job type | `references/brief-questions.md` |
| Build / check a palette, contrast, print color | `references/color.md` |
| Grid, hierarchy, poster/social/menu/sign/label layouts, media sizes, AW checklist | `references/layout.md` |
| Thai–English font pairs (7 lanes), Adobe Thai issues | `references/typography.md` |
| Mascot / illustration, SVG parts + CSS variables, hand-off to Illustrator/Procreate/Firefly | `references/illustration.md` |
| Bleed, CMYK, materials, logo file set | `references/print-production.md` |
| Pre-send checks | `../design-board-render/references/qa-checklist.md` |

## Rules learned from past work
- Every concept must trace to a named ref. Before sending ask: "would this blend into the brand's ref board?"
- Bilingual logos: equal visual weight; never letter-space Thai to match English width.
- Any text, price, hours, phone, handle or number the user didn't give is a placeholder — say so.
- Code-drawn illustration is rougher than hand drawing — say so and offer the hand-off path.
- Be decisive and honest: if an idea will look generic, say why and propose a fix.
