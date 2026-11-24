#!/usr/bin/env node
/*
  Scrape a public Pinterest profile or board with headless Chromium (Playwright).

  Usage:
    node scrape_board.js profile https://www.pinterest.com/<user>/            out.json
    node scrape_board.js board   https://www.pinterest.com/<user>/<board>/    out.json

  profile -> { url, title, boards: [{ path, name, pins, updated }] }
  board   -> { url, title, pins: [{ id, img, alt, video }] }
     id    = Pinterest image hash (stable key used by download.py / seen-pins.json)
     img   = image URL (resize later by replacing /236x/ with /736x/)
     video = direct mp4 URL when the pin is a video (taken from the page data)

  Limits: logged-out Pinterest shows roughly the newest ~25 pins of a board.
  Network hosts needed: www.pinterest.com, i.pinimg.com, v1.pinimg.com
*/
const { chromium } = require('playwright');
const fs = require('fs');

const [mode, url, out] = process.argv.slice(2);
if (!['profile', 'board'].includes(mode) || !url || !out) {
  console.error('usage: node scrape_board.js <profile|board> <url> <out.json>');
  process.exit(2);
}

const hashOf = (u) => { const m = (u || '').match(/([0-9a-f]{32})/); return m ? m[1] : null; };

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 4000 } });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(6000);
  const title = await page.title();

  if (mode === 'profile') {
    const boards = await page.evaluate(() => {
      const seen = new Set(); const res = [];
      for (const a of document.querySelectorAll('a[href]')) {
        const h = a.getAttribute('href');
        if (!/^\/[^/]+\/[^/_][^/]*\/$/.test(h) || seen.has(h)) continue;
        const t = (a.innerText || '').split('\n').map(s => s.trim()).filter(s => s && s !== ',' && s !== '·');
        if (!t.length) continue;
        seen.add(h);
        const pins = (t.find(s => /Pins?$/.test(s)) || '').replace(/\D/g, '');
        res.push({ path: h, name: t[0], pins: pins ? +pins : null, updated: t[t.length - 1] });
      }
      return res;
    });
    fs.writeFileSync(out, JSON.stringify({ url, title, boards }, null, 1));
    console.log(`${title}\n${boards.map(b => `${b.name}\t${b.pins} pins\t${b.path}`).join('\n')}`);
    await browser.close();
    return;
  }

  // board: scroll and accumulate (the grid is virtualised)
  const items = new Map();
  for (let i = 0; i < 30; i++) {
    const got = await page.evaluate(() => [
      ...[...document.querySelectorAll('img')]
        .filter(im => (im.currentSrc || im.src).includes('pinimg.com') && im.naturalWidth > 100 && !(im.currentSrc || im.src).includes('/75x75'))
        .map(im => ({ img: im.currentSrc || im.src, alt: im.alt })),
      ...[...document.querySelectorAll('video')].map(v => ({ img: v.poster, alt: 'video', isVideo: true })),
    ]);
    for (const g of got) {
      const id = (g.img.match(/([0-9a-f]{32})/) || [])[1];
      if (id && !items.has(id)) items.set(id, { id, img: g.img, alt: g.alt, video: null, isVideo: !!g.isVideo });
    }
    await page.mouse.wheel(0, 1500);
    await page.waitForTimeout(1200);
  }

  // video mp4 URLs live in the page's embedded data, keyed by the same hash as the poster
  const html = await page.content();
  const mp4s = [...new Set(html.match(/https:\/\/v1\.pinimg\.com\/videos\/[^"\\\s]+?\.mp4/g) || [])];
  for (const m of mp4s) {
    const id = hashOf(m);
    if (id && items.has(id)) {
      const it = items.get(id);
      if (!it.video || m.includes('720')) it.video = m;   // prefer a 720 rendition
    }
  }

  // drop the profile avatar (it is not a pin)
  const pins = [...items.values()].filter(p => p.alt !== title && !/profile/i.test(p.alt || ''));
  fs.writeFileSync(out, JSON.stringify({ url, title, pins }, null, 1));
  console.log(`${title}\n${pins.length} pins (${pins.filter(p => p.video).length} with video)`);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
