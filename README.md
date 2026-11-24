# Graphic Design Skills

ชุดสกิลสำหรับ Claude ให้ทำงานเป็นนักออกแบบกราฟิกและ motion designer ได้กับทุกแบรนด์ แต่ละแบรนด์มี CI ของตัวเอง ไม่ล็อกสไตล์

## สกิล
| สกิล | ทำอะไร |
|---|---|
| [`graphic-designer`](.claude/skills/graphic-designer/SKILL.md) | สกิลหลัก: ถามบรีฟ → ref และทิศทาง → ดราฟต์ → ทำจริง → CI และไฟล์ส่งมอบ ครอบคลุมโลโก้, CI, layout, artwork, คู่สี, ฟอนต์ไทย-อังกฤษ, มาสคอต, งานพิมพ์ |
| [`motion-graphics`](.claude/skills/motion-graphics/SKILL.md) | logo animation และโมชั่นใน After Effects: บรีฟ, storyboard, ขั้นตอน AE, expression, สคริปต์ `.jsx`, export |
| [`pinterest-ref-scout`](.claude/skills/pinterest-ref-scout/SKILL.md) | ดึง ref จาก Pinterest เฉพาะ pin ใหม่ สรุปเป็นข้อความเพื่อประหยัดเครดิต |
| [`design-board-render`](.claude/skills/design-board-render/SKILL.md) | ทำภาพพรีเซนต์ PNG (คอนเซ็ปต์, ดราฟต์, CI sheet, storyboard) พร้อมเช็กลิสต์ QA |

## โครง repo
```
.claude/skills/          สกิลทั้ง 4 ตัว
brands/_template/        แม่แบบ brief / ci / feedback-log
brands/<brand>/          ข้อมูลของแต่ละแบรนด์ (เริ่มด้วย cafe-boonthawee, success-laundry)
refs/style-library.md    คลังสไตล์จาก Pinterest ของผู้ใช้ (ข้อความ)
refs/seen-pins.json      pin ที่ดูแล้ว ใช้หา pin ใหม่
docs/skill-gaps.md       สิ่งที่ยังขาดและแผนต่อไป
```

## วิธีใช้
- เปิด repo นี้ใน Claude Code (หรือเซสชันบนเว็บที่ผูก repo นี้) สกิลใน `.claude/skills/` จะถูกโหลดอัตโนมัติ
- สั่งงานออกแบบตามปกติ เช่น "ออกแบบโลโก้ร้าน..." Claude จะถามบรีฟก่อนเสมอ
- เพิ่ม ref: เพิ่ม pin ในบอร์ด Pinterest เดิมได้เลย แล้วบอก "ไปเช็ก pin ใหม่"

## สิ่งที่ environment ต้องมี
- Network: `www.pinterest.com`, `pinterest.com`, `i.pinimg.com`, `v1.pinimg.com` และ npm registry (ติดตั้งฟอนต์)
- เครื่องมือ: Node + Playwright (Chromium), Python 3 + Pillow, ffmpeg
- ฟอนต์ทั้งหมดเป็น Google Fonts ผ่าน Fontsource (ฟรี, OFL) ติดตั้งด้วย `design-board-render/scripts/setup_fonts.sh`
