#!/usr/bin/env python3
"""Download pins from a scrape_board.js JSON, skipping pins already seen.

Usage:
  python3 download.py board.json OUT_DIR [--seen refs/seen-pins.json] [--board NAME] [--all] [--mark]

- Only pins whose id is not in the seen file are downloaded (use --all to ignore it).
- Images are fetched at 736px wide; videos as mp4 when the scrape found a URL.
- --mark adds the downloaded ids to the seen file. Run it only after you have
  looked at the new pins and written notes into refs/style-library.md.
- Prints the list of new files so the caller knows what to look at.
"""
import argparse, json, os, re, ssl, sys, urllib.request

ap = argparse.ArgumentParser()
ap.add_argument('board_json'); ap.add_argument('out_dir')
ap.add_argument('--seen', default='refs/seen-pins.json')
ap.add_argument('--board', help='board key in the seen file (default: board URL path)')
ap.add_argument('--all', action='store_true'); ap.add_argument('--mark', action='store_true')
a = ap.parse_args()

data = json.load(open(a.board_json))
board = a.board or re.sub(r'^https?://[^/]+', '', data['url'])
seen = json.load(open(a.seen)) if os.path.exists(a.seen) else {}
known = set(seen.get(board, []))

ca = '/root/.ccr/ca-bundle.crt'
ctx = ssl.create_default_context(cafile=ca) if os.path.exists(ca) else ssl.create_default_context()
os.makedirs(a.out_dir, exist_ok=True)

new = [p for p in data['pins'] if a.all or p['id'] not in known]
print(f'{board}: {len(data["pins"])} pins visible, {len(new)} new')
done = []
for p in new:
    try:
        img = re.sub(r'/\d+x/', '/736x/', p['img']) if '/videos/' not in p['img'] else p['img']
        path = os.path.join(a.out_dir, p['id'] + '.jpg')
        with urllib.request.urlopen(img, context=ctx, timeout=40) as r, open(path, 'wb') as f:
            f.write(r.read())
        print('img  ', path)
        if p.get('video'):
            vpath = os.path.join(a.out_dir, p['id'] + '.mp4')
            with urllib.request.urlopen(p['video'], context=ctx, timeout=120) as r, open(vpath, 'wb') as f:
                f.write(r.read())
            print('video', vpath)
        done.append(p['id'])
    except Exception as e:  # keep going; report at the end
        print('FAIL ', p['id'], e, file=sys.stderr)

if a.mark and done:
    seen[board] = sorted(known | set(done))
    os.makedirs(os.path.dirname(a.seen) or '.', exist_ok=True)
    json.dump(seen, open(a.seen, 'w'), indent=1, ensure_ascii=False)
    print(f'marked {len(done)} as seen in {a.seen}')
