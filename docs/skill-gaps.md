# ยังขาดอะไร: สิ่งที่สกิลชุดนี้ยังทำไม่ได้ และทางแก้

อัปเดต: 2026-11 · จากงานจริง 2 แบรนด์ (Cafe boonthawee, ซักเสร็จ/Success 6 รอบ)

## ทำได้แล้ว
| ความสามารถ | สกิล |
|---|---|
| ถามบรีฟละเอียดก่อนออกแบบ, ส่งดราฟต์ก่อนทำจริง, เก็บ CI แยกตามแบรนด์ | graphic-designer |
| โลโก้, CI, layout, artwork, คู่สี, ฟอนต์ไทย-อังกฤษ 7 สาย, มาสคอต, เตรียมไฟล์พิมพ์ (ระดับคำแนะนำและร่าง) | graphic-designer |
| ดึง ref จาก Pinterest เฉพาะ pin ใหม่ รวมรูปเป็นแผ่นเดียว แตกเฟรมวิดีโอโมชั่น | pinterest-ref-scout |
| ทำภาพพรีเซนต์ PNG ที่มีฟอนต์ไทยจริง พร้อมเช็กลิสต์ QA | design-board-render |
| หลักคิดโมชั่น (timing, easing, choreography, อารมณ์) + storyboard, After Effects, expression, สคริปต์ | motion-graphics (+ LottieFiles principles) |

## ยังขาด (เรียงตามผลกระทบ)

### 1. วาดภาพประกอบระดับมือจริง
**ปัญหา:** ตัวละครที่วาดด้วยโค้ด SVG ยังหยาบกว่า ref ที่วาดมือ (ห่าน, เป็ด) เหมาะกับร่างและเลือกทิศทางเท่านั้น
**ทางแก้:**
- เชื่อม AI image: Adobe Firefly ผ่าน connector ของ Adobe (ตอนนี้ต่อไม่ติดเพราะ network ของ environment บล็อก host ของ Adobe) หรือใช้ Midjourney/Firefly เองด้วย prompt ที่สกิลเขียนให้
- วาดเองใน Illustrator/Procreate จาก construction notes ที่สกิลให้
- **ต้องทำ:** เปิด network ให้ connector Adobe/Canva/Figma ใน environment settings แล้วให้สกิลเรียกใช้

### 2. Connector เครื่องมือออกแบบ
**ปัญหา:** Adobe, Canva, Figma, logo-maker ติดตั้งไว้แต่ต่อไม่ติด (proxy 403)
**ทางแก้:** เพิ่ม host ของ connector ใน environment network settings หรือใช้ environment ที่ไม่จำกัด network แล้วเพิ่มขั้นตอนในสกิลให้ส่งงานเข้า Illustrator/Photoshop/Canva โดยตรง

### 3. Mockup สมจริง
**ปัญหา:** mockup ตอนนี้วาดด้วย CSS (ป้าย แก้ว ถุง) ดูเป็นกราฟิก ไม่เหมือนภาพถ่าย
**ทางแก้:** เตรียมชุด mockup PSD (smart object) หรือรูปถ่ายเปล่าของร้าน/สินค้าจริงใส่ใน `assets/mockups/` แล้วให้สกิลวางงานลงบนภาพ (perspective transform ด้วย PIL/OpenCV) หรือใช้ Firefly Generative Fill

### 4. ตัวอย่างโมชั่นเป็นวิดีโอ (ทำได้แล้วแบบหยาบ)
**ทำแล้ว:** `motion-graphics/scripts/animatic.js` + `assets/animatic-template.html` ใช้ GSAP เรนเดอร์คลิปตัวอย่าง MP4/GIF แบบตรงเฟรม (ทดสอบกับ SOLTO แล้ว) ยังเป็นแบบหยาบ ใช้ดูจังหวะก่อนเข้า AE
**ทางเลือกใหม่:** LottieFiles Creator MCP (`https://creator.mcp.lottiefiles.com/mcp`) export MP4/GIF/Lottie ได้ แต่ต้องเปิด host นี้ใน environment network ก่อน
**ปัญหา:** ส่งได้แค่ storyboard ภาพนิ่ง ผู้ใช้ยังไม่เห็นการเคลื่อนไหวจริงก่อนเข้า AE
**ทางแก้:** เพิ่มสคริปต์ทำ animatic: animate SVG ด้วย CSS/Web Animations แล้วอัดด้วย Playwright (`recordVideo`) + ffmpeg เป็น MP4/GIF สั้นๆ

### 5. ทดสอบสคริปต์ After Effects จริง
**ปัญหา:** `ae_logo_presets.jsx` ผ่านแค่การตรวจ syntax และ mock ยังไม่เคยรันใน AE
**ทางแก้:** ผู้ใช้ลองรันแล้วส่ง error กลับ, บันทึกเวอร์ชัน AE ที่ใช้ใน README

### 6. ไฟล์ส่งมอบจริง (AI/PDF/EPS) และ CI book
**ปัญหา:** ส่งได้ SVG และ PNG ยังไม่มี PDF CI book หลายหน้า หรือ .ai ที่แยก artboard
**ทางแก้:** เพิ่ม template CI book (HTML → PDF ด้วย Playwright `page.pdf()`) และสคริปต์ export SVG แยกเวอร์ชันโลโก้ทั้งหมด

### 7. ความแม่นของสีงานพิมพ์
**ปัญหา:** ค่า CMYK/Pantone เป็นค่าประมาณจาก HEX
**ทางแก้:** ใช้ ICC profile ของโรงพิมพ์แปลงสี (เช่น Pillow ImageCms + Coated FOGRA39) และยืนยันกับ swatch จริง

### 8. ความจำและการเรียนรู้รสนิยม
**ทำแล้วบางส่วน:** `refs/style-library.md` และ `brands/*/feedback-log.md`
**ยังขาด:** สรุปรูปแบบที่ผู้ใช้ชอบข้ามหลายแบรนด์อัตโนมัติ (เช่น ทุกครั้งที่ปฏิเสธ ให้บันทึกเหตุผลลงหมวด "รสนิยมทั่วไป")

## สิ่งที่ผู้ใช้ช่วยได้
- จัดบอร์ด Pinterest ตามหมวด (ref-layout, ref-color, ref-packaging) และตามแบรนด์
- ส่งรูปถ่ายหน้าร้าน/สินค้าจริงสำหรับทำ mockup
- รันสคริปต์ AE แล้วส่งผลกลับ
- เปิด network ให้ connector Adobe/Canva/Figma
