---
name: design-board-render
description: Turn design work into presentation images (PNG) — concept boards, grey-scale draft thumbnails, CI sheets, mockups, storyboards — by writing an HTML board with real Thai and English web fonts and rendering it with headless Chromium, then checking every board against a QA checklist before sending. Use whenever design output should be shown as an image file ("ส่งเป็นไฟล์รูป", "ทำตัวอย่างให้ดู", "ส่งดราฟต์", "พรีเซนต์"), and whenever the graphic-designer or motion-graphics skill reaches a draft, develop or storyboard step.
---

# Design Board Render

ผู้ใช้ชอบเห็นงานเป็น **ไฟล์รูป** สกิลนี้สร้างภาพพรีเซนต์จาก HTML + SVG แล้วเรนเดอร์เป็น PNG

## เครื่องมือ
`SC=.claude/skills/design-board-render`
- `scripts/setup_fonts.sh WORKDIR`: ติดตั้งฟอนต์ไทย-อังกฤษ (Fontsource, ฟรี) ลง `WORKDIR/fonts`
- `scripts/render.js BOARD.html OUT_DIR [SCALE] [IDS]`: เรนเดอร์ทุก `<section id>` เป็น PNG
- `assets/board-template.html`: บอร์ดพรีเซนต์ 1600×1000 (งานจริง)
- `assets/draft-template.html`: บอร์ดดราฟต์ขาวดำ 6 ช่องมีเลขให้เลือก
- `references/qa-checklist.md`: ตรวจก่อนส่ง

## ขั้นตอน
1. **เตรียม WORKDIR** ใน scratchpad: `bash $SC/scripts/setup_fonts.sh $WORK` (ครั้งแรกครั้งเดียวต่อเซสชัน ถ้าต้องการฟอนต์อื่นใส่ชื่อแพ็กเกจต่อท้าย)
2. **คัดลอก template** ไปที่ `$WORK/board.html` (ดราฟต์ใช้ draft-template) แล้ว:
   - ใส่ `@font-face` ของฟอนต์แบรนด์ ตามชื่อไฟล์ใน `fonts/node_modules/@fontsource/<font>/files/`
   - ใส่สีแบรนด์ใน `:root` จาก `brands/<brand>/ci.md`
   - หนึ่ง `<section class="board" id="...">` ต่อหนึ่งแผ่น
   - งานกราฟิกเขียนเป็น SVG `<symbol>` ใน `<defs>` แล้วเรียกซ้ำด้วย `<use>` เพื่อแสดงหลายสี/หลายขนาด (ดู `graphic-designer/references/illustration.md`)
   - รูป ref: คัดลอกไฟล์ไว้ใน `$WORK/refs/` แล้วอ้างด้วย path สัมพัทธ์
3. **เรนเดอร์ตรวจ**: `node $SC/scripts/render.js $WORK/board.html $WORK/out 1` แล้วเปิดดู **ทุกแผ่น** ตาม `references/qa-checklist.md` แก้แล้วเรนเดอร์ซ้ำจนผ่าน ถ้ามีแผ่นเดียวที่ต้องดูรายละเอียด ให้ crop ส่วนนั้นด้วย PIL แทนการดูทั้งแผ่นที่ scale 2
4. **เรนเดอร์ส่งจริง**: scale 2 ลงโฟลเดอร์ที่ผู้ใช้เปิดได้ (เช่น `deliverables/<brand>/<round>/`) ตั้งชื่อไฟล์บอกลำดับ แล้วส่งด้วยเครื่องมือส่งไฟล์ (SendUserFile ถ้ามี)
5. **ข้อความสรุปให้ผู้ใช้**: แต่ละแผ่นคืออะไร, แนะนำแบบไหนเพราะอะไร, ข้อจำกัดที่ยังมี, ข้อความที่ใส่เองเป็นตัวอย่าง

## เทคนิคที่ใช้ได้ดี
- เนื้อกระดาษ: คลาส `.grain` (SVG noise + multiply)
- ขอบหยักแบบตัดกระดาษหรือหมึก: `feTurbulence` + `feDisplacementMap` scale 3–6
- ฟองหรือของเหลว (gooey): `feGaussianBlur` + `feColorMatrix` alpha 28 −11 และต้องใส่ `color-interpolation-filters="sRGB"` ไม่งั้นขอบจะมีเส้นเข้ม
- เส้นแรเงาแบบภาพพิมพ์: `<pattern>` เส้นเฉียง + `clip-path` ตามรูปทรง
- สลับสไตล์ตัวละครตัวเดียว: CSS variables บน `<use>`
- Mockup ง่ายๆ (ป้าย แก้ว ถุง) วาดด้วย CSS/SVG ได้ แต่ถ้าต้องสมจริงให้แนะนำ Photoshop smart object หรือ Firefly
- ตัวอักษรไทยแยกทีละตัวต้องใช้ `Intl.Segmenter('th',{granularity:'grapheme'})`
