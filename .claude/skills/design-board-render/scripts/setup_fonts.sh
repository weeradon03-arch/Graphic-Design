#!/usr/bin/env bash
# Install the Thai + English fonts used by the design skills into WORKDIR/fonts
# (Fontsource packages from npm: free, OFL-licensed Google Fonts).
# Board HTML files placed in WORKDIR can then load them from fonts/node_modules/@fontsource/...
# Usage: setup_fonts.sh WORKDIR [extra-package ...]
set -euo pipefail
work="${1:?usage: setup_fonts.sh WORKDIR [extra-package ...]}"; shift || true
mkdir -p "$work/fonts"; cd "$work/fonts"
[ -f package.json ] || npm init -y >/dev/null
pkgs=(
  # Thai loopless (ไร้หัว)
  anuphan mitr kanit prompt noto-sans-thai ibm-plex-sans-thai
  # Thai looped (มีหัว) / vintage
  sarabun taviraj trirong pridi chonburi
  # Thai handwriting
  mali itim
  # English sans / display
  dm-sans inter bricolage-grotesque archivo big-shoulders-display
  # English serif / vintage / typewriter
  fraunces caprasimo young-serif alfa-slab-one courier-prime special-elite
)
for p in "${pkgs[@]}" "$@"; do
  if [ -d "node_modules/@fontsource/$p" ]; then continue; fi
  npm i "@fontsource/$p" >/dev/null 2>&1 && echo "ok   $p" || echo "FAIL $p"
done
echo "fonts in $work/fonts/node_modules/@fontsource"
