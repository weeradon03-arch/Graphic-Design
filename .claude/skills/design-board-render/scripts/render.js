#!/usr/bin/env node
/*
  Render presentation boards: every <section id="..."> in an HTML file becomes one PNG.

  Usage: node render.js BOARD.html OUT_DIR [SCALE=1] [ID1,ID2,...]
    SCALE 1 = quick check (look at it yourself), 2 = final file for the user.
    IDs default to every section with an id. Output: OUT_DIR/<id>.png

  Waits for web fonts and for scripts that run on window 'load' (e.g. text fitting).
*/
const { chromium } = require('playwright');
const path = require('path');

const [file, outDir, scaleArg, idsArg] = process.argv.slice(2);
if (!file || !outDir) { console.error('usage: node render.js BOARD.html OUT_DIR [SCALE] [IDS]'); process.exit(2); }

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: +(scaleArg || 1) });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('requestfailed', r => errors.push('failed: ' + r.url()));
  await page.goto('file://' + path.resolve(file));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  const ids = idsArg ? idsArg.split(',') : await page.$$eval('section[id]', s => s.map(x => x.id));
  const fonts = await page.evaluate(() => [...document.fonts].filter(f => f.status !== 'loaded').map(f => f.family + ':' + f.status));
  for (const id of ids) {
    const el = await page.$('#' + id);
    if (!el) { console.error('missing #' + id); continue; }
    const out = path.join(outDir, id + '.png');
    await el.screenshot({ path: out });
    console.log(out);
  }
  if (fonts.length) console.log('fonts not used/loaded (ok if unused):', fonts.join(', '));
  if (errors.length) console.log('WARN:', errors.join('\n'));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
