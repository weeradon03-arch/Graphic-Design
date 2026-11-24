---
name: pinterest-ref-scout
description: Pull design references from the user's public Pinterest boards cheaply — list boards and pin counts, download only pins not seen before (images and motion videos), tile them into one contact sheet or frame strip, and record what was learned as text in refs/style-library.md so later sessions read notes instead of re-viewing images. Use whenever the user shares a Pinterest link, says they added new refs or pins, asks to "ไปดู ref", "เช็ก pin ใหม่", "ดูบอร์ด", or when the graphic-designer or motion-graphics skill needs a brand's references.
---

# Pinterest Ref Scout

ดึง ref จาก Pinterest แบบประหยัดเครดิต หลักคือ **ดูรูปเฉพาะ pin ใหม่ และสรุปเป็นข้อความเก็บไว้** ครั้งต่อไปอ่านข้อความแทนดูรูปซ้ำ

## ก่อนเริ่ม
- ต้องเปิด network ให้ host: `www.pinterest.com`, `pinterest.com`, `i.pinimg.com`, `v1.pinimg.com` ถ้าถูกบล็อกให้ขอเพิ่ม host ใน environment (ผู้ใช้ต้องอนุมัติ)
- ต้องมี Playwright + Chromium, Python Pillow, ffmpeg
- บอร์ดต้องเป็น **public** บอร์ดลับเข้าไม่ได้
- ถ้าไม่ล็อกอิน Pinterest แสดงประมาณ 25 pin ล่าสุดต่อบอร์ด pin ใหม่อยู่บนสุดจึงเห็นเสมอ

## ขั้นตอน
ให้ `SC=.claude/skills/pinterest-ref-scout/scripts` และเก็บไฟล์ชั่วคราวไว้ใน scratchpad ไม่ใช่ใน repo

1. **ดูรายชื่อบอร์ดและจำนวน pin**
   ```bash
   node $SC/scrape_board.js profile https://www.pinterest.com/<user>/ $TMP/profile.json
   ```
   เทียบจำนวน pin กับ `refs/seen-pins.json` บอร์ดที่จำนวนเท่าเดิมไม่ต้องดึง (ยกเว้นผู้ใช้บอกว่าลบแล้วเพิ่ม)

2. **ดึงเฉพาะบอร์ดที่เปลี่ยน**
   ```bash
   node $SC/scrape_board.js board <board-url> $TMP/<board>.json
   python3 $SC/download.py $TMP/<board>.json $TMP/dl/<board> --seen refs/seen-pins.json
   ```
   `download.py` ดาวน์โหลดเฉพาะ pin ที่ไม่อยู่ใน seen-pins และพิมพ์รายชื่อไฟล์ใหม่

3. **ดูแบบประหยัด**
   - รูป: รวมเป็นแผ่นเดียว `python3 $SC/contact_sheet.py $TMP/sheet.jpg <ไฟล์ใหม่...> --width 260` แล้วเปิดดูครั้งเดียว ถ้า pin เยอะให้ลด `--width` เหลือ 160–200
   - วิดีโอโมชั่น: `bash $SC/video_frames.sh <file.mp4> $TMP/frames.jpg` จะได้ 18 เฟรมเรียงในรูปเดียว ใช้ดูจังหวะการเคลื่อนไหว
   - ดูรูปขนาดเต็มเฉพาะ pin ที่ต้องการรายละเอียดจริงๆ

4. **บันทึกเป็นข้อความ** ใน `refs/style-library.md` ในหมวดของบอร์ดนั้น: ชื่อหรือลักษณะ pin, สิ่งที่เห็น (ฟอร์ม/สี/ฟอนต์/การจัดวาง/การเคลื่อนไหว), บทเรียนที่ใช้ได้ และถ้ารสนิยมโดยรวมเปลี่ยน ให้อัปเดตหมวด "รสนิยมทั่วไปของผู้ใช้" ด้วย
   ถ้าเป็นบอร์ดของแบรนด์เฉพาะ ให้บันทึกใน `brands/<brand>/brief.md` ส่วน ref แทน

5. **ทำเครื่องหมายว่าดูแล้ว** หลังจากบันทึกเสร็จ:
   ```bash
   python3 $SC/download.py $TMP/<board>.json $TMP/dl/<board> --seen refs/seen-pins.json --mark
   ```
   (ไฟล์ที่ดาวน์โหลดแล้วจะถูกดาวน์โหลดซ้ำเร็วๆ เพราะเล็ก ส่วน `--mark` จะบันทึก id ลง seen-pins)

6. **รายงานผู้ใช้สั้นๆ**: บอร์ดไหนมี pin ใหม่กี่อัน, สรุปสไตล์ที่เห็น 3–5 ข้อ, มีผลต่องานที่กำลังทำอย่างไร

## คำแนะนำให้ผู้ใช้จัดบอร์ด
- เพิ่ม pin ลงบอร์ดเดิมได้เลย ไม่ต้องสร้างบอร์ดใหม่ทุกครั้ง
- สร้างบอร์ดใหม่เมื่อเป็นหมวดใหม่ (เช่น ref-layout, ref-color, ref-packaging) หรือเป็นแบรนด์ใหม่ (เช่น ref-ซักเสร็จ) จะดูตรงจุดและประหยัดกว่า
- บอร์ดละ 10–30 pin ที่คัดแล้ว ดีกว่าบอร์ดใหญ่ที่ปนกันหลายเรื่อง
- บอร์ดที่ไม่เกี่ยวกับงานออกแบบ (ทรงผม, ห้องนอน) จะไม่ถูกดึง เว้นแต่ผู้ใช้ขอ

## ข้อจำกัดที่รู้แล้ว
- วิดีโอใน Pinterest เล่นใน headless Chromium ไม่ได้ (ไม่มี codec) สคริปต์จึงดึง URL mp4 จากข้อมูลในหน้าแทน
- ชื่อหรือคำอธิบาย pin มักไม่มีเมื่อไม่ล็อกอิน ต้องดูจากรูป
- Pinterest เปลี่ยนโครงหน้าได้ ถ้า scrape_board.js ได้ 0 pin ให้เปิดหน้าด้วย Playwright ดู DOM ใหม่แล้วแก้ selector
