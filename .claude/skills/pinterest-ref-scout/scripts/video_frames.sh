#!/usr/bin/env bash
# Turn a motion ref video into one tiled image of evenly spaced frames,
# so the motion can be read frame by frame in a single view.
# Usage: video_frames.sh IN.mp4 OUT.jpg [COLS=6] [ROWS=3] [TILE_WIDTH=220]
set -euo pipefail
in="$1"; out="$2"; cols="${3:-6}"; rows="${4:-3}"; tw="${5:-220}"
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
n=$((cols * rows))
fps=$(python3 -c "print($n/float('$dur'))")
ffmpeg -v error -y -i "$in" -vf "fps=${fps},scale=${tw}:-1,tile=${cols}x${rows}" -frames:v 1 "$out"
info=$(ffprobe -v error -show_entries stream=width,height,r_frame_rate -of csv=p=0 "$in" | head -1)
echo "$out  duration=${dur}s  stream=${info}  frames=${n}"
