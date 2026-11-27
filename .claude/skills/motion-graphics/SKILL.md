---
name: motion-graphics
description: Motion design and logo animation for any brand — motion-director thinking (timing, easing, choreography, emotion, Disney principles, adapted from LottieFiles) plus hands-on After Effects delivery (storyboard images, comp setup, Graph Editor easing, expressions, ExtendScript presets) and export for reels/TikTok, Lottie, GIF, signage. Uses each brand's CI from brands/(brand)/ci.md. Use whenever the user asks for โมชั่น, ภาพเคลื่อนไหว, motion graphic, logo animation, logo sting, intro/outro, reels/TikTok animation, kinetic type, mascot animation, UI micro-interaction, After Effects help or expressions, Lottie — even if they don't name this skill.
---

# Motion Graphics

Reply in Thai. The user animates in **After Effects** and wants image previews before work starts. Use the brand's CI (`brands/<brand>/ci.md`); if none exists, ask or run `graphic-designer` first.

## Credit budget
- Read **only** the files the routing table points to for the current step; never load a whole folder.
- Don't re-read a file already read in this conversation.
- Motion refs: use `pinterest-ref-scout` (new pins only) and `video_frames.sh` (one tiled image per video), not single frames.
- Storyboards: render at scale 1 to check, scale 2 only for the final file.

## Workflow (⏸ = stop and wait for the user)
1. **Brief ⏸** — ask only what's unknown: piece (sting / intro / reel / signage / sticker), platform + ratio + length + loop, music/BPM, mood, motion refs, deliverable format. Append to `brands/<brand>/brief.md` under "Motion".
2. **Direction ⏸** — decide personality, timing and easing first (principles), then pick a recipe. Present a 6–8 frame storyboard image via `design-board-render`, with this table:
   `| time | frame | movement | easing / graph | sound |`
   Optional (when asked or when timing is the open question): a rough **animatic MP4/GIF** with GSAP — see routing table.
3. **Build** — AE steps (comp, layers, effects, keyframes, influence %, copy-paste expressions). Offer `scripts/ae_logo_presets.jsx` (Blob Bounce, Spin & Snap, Overshoot, Ease-out, Width Wave, Gooey, Boil Line, Film Grain) or write a new ExtendScript from it (ES3: `var`, no arrow/let/const/template strings; wrap in `app.beginUndoGroup`; run via File > Scripts > Run Script File). Say scripts are untested in real AE and ask for the error text if one fails.
4. **Deliver** — export settings; log the recipe and feedback in `brands/<brand>/feedback-log.md`.

## Routing table (read just the row you need)
| Need | File |
|---|---|
| Pick personality, timing, easing fast | `references/principles/reference/timing-easing-tables.md` |
| Map brand emotion → motion | `references/principles/director/emotion-mapping.md`, `director/motion-personality.md` |
| Sequence several elements | `references/principles/director/choreography.md` |
| Squash/stretch, anticipation, follow-through | `references/principles/director/disney-principles.md` |
| Story arc for a 10–30 s piece | `references/principles/director/narrative-structure.md` |
| Which property to animate | `references/principles/reference/property-selection.md` |
| UI micro-interactions (button, loading, success, error) | `references/principles/patterns/state-feedback.md`, `patterns/entrance-exit.md` |
| Looping / ambient (signage, idle) | `references/principles/patterns/ambient-continuous.md` |
| Something feels off | `references/principles/reference/troubleshooting.md`, `reference/quality-checklist.md` |
| Recipes from the user's motion refs (gooey melt, width wave, liquid glass, spin & snap, brand reel) | `references/recipes-from-refs.md` |
| Recipes by logo type (blob bounce, wave reveal, boil line, stamp, kinetic type, character) | `references/recipes-by-logo-type.md` |
| AE setup, Illustrator → AE, easing values, expressions, export | `references/ae-pipeline.md` |
| Reels/campaign structure, grain/lens/color look, sound | `references/campaign-look-sound.md` |
| Rough animatic MP4/GIF of the storyboard (GSAP, frame-exact) | `assets/animatic-template.html` (rules in its header) + `node scripts/animatic.js page.html out.mp4 --gif`; `npm i gsap` in the page folder first; cut logo layers by colour with PIL |
| Rendered MP4/GIF/Lottie via LottieFiles Creator MCP | `references/principles/reference/export-and-render.md` (needs that MCP connected; network may block it) |
| Full LottieFiles quick reference (only if the rows above aren't enough) | `references/principles/quick-reference.md` |

## Rules
- Movement follows the form and brand personality; never a plain fade/zoom.
- Logo sting 1.5–3 s; final hold ≥ 0.6 s.
- Weighted easing: strong ease-out (incoming influence 85–95%) or overshoot; no linear.
- Keep the brand palette; let motion carry the energy.
- Respect platform safe zones (reels: top 250 px, bottom 350 px).

`references/principles/` is © LottieFiles, MIT — see `NOTICE.md` there.
