#!/usr/bin/env node
/*
  Render a GSAP animatic to MP4 (+ optional GIF), frame-exact.

  The HTML page must build a paused GSAP timeline and expose it as `window.tl`
  (see assets/animatic-template.html). This script seeks the timeline frame by
  frame, screenshots the #stage element, then encodes with ffmpeg — so timing
  is exact regardless of machine speed (no realtime screen recording).

  Usage: node animatic.js PAGE.html OUT.mp4 [--fps 24] [--size 1080] [--gif]

  Needs: Playwright (Chromium), ffmpeg, and gsap installed where the page can
  load it (e.g. `npm i gsap` in the page's folder, referenced as
  node_modules/gsap/dist/gsap.min.js).
*/
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path');

const args = process.argv.slice(2);
const [page, out] = args;
const opt = (k, d) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d; };
const fps = +opt('--fps', 24), size = +opt('--size', 1080), gif = args.includes('--gif');
if (!page || !out) { console.error('usage: node animatic.js PAGE.html OUT.mp4 [--fps 24] [--size 1080] [--gif]'); process.exit(2); }

(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'animatic-'));
  const browser = await chromium.launch();
  const p = await browser.newPage({ viewport: { width: size, height: size } });
  const errors = [];
  p.on('pageerror', e => errors.push(e.message));
  p.on('requestfailed', r => errors.push('failed: ' + r.url()));
  await p.goto('file://' + path.resolve(page));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction(() => window.tl && typeof window.tl.duration === 'function', null, { timeout: 15000 });
  const dur = await p.evaluate(() => { window.tl.pause(0); return window.tl.duration(); });
  const n = Math.round(dur * fps) + 1;
  const stage = await p.$('#stage') || await p.$('body');
  for (let i = 0; i < n; i++) {
    await p.evaluate(([t, f]) => { window.tl.seek(t, false); if (window.onFrame) window.onFrame(t, f); }, [i / fps, i]);
    await stage.screenshot({ path: path.join(tmp, `f${String(i).padStart(5, '0')}.png`) });
  }
  await browser.close();
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(fps), '-i', path.join(tmp, 'f%05d.png'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-movflags', '+faststart', out]);
  console.log(`${out}  ${dur.toFixed(2)}s  ${n} frames @ ${fps}fps`);
  if (gif) {
    const g = out.replace(/\.mp4$/i, '') + '.gif';
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', out, '-vf',
      'fps=12,scale=480:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=64[p];[b][p]paletteuse', g]);
    console.log(g);
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  if (errors.length) console.log('WARN:', errors.join('\n'));
})().catch(e => { console.error(e); process.exit(1); });
