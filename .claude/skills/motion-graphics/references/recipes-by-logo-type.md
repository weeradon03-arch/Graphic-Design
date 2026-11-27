# Motion recipes A–F by logo type (blob, wave, mascot, stamp, wordmark, character)

## 5. สูตรพื้นฐานตามประเภทโลโก้

### A. Blob Bounce (ก้อนหนาหรือ monogram บวม แบบ Beyond หรือ Out Of Order)
```
0.00 ก้อนเล็ก Scale 0 ลอยเหนือกลางเฟรม
0.15 หล่นลง (ease-in) ยืดแนวตั้ง Scale X 85 / Y 120
0.35 กระแทกพื้นแล้วยุบ Scale X 125 / Y 75  (anchor อยู่ขอบล่าง)
0.55 เด้งกลับ (overshoot expression)
0.70 wordmark เลื่อนขึ้นจาก track matte ทีละตัว ห่างกัน 1 เฟรม
1.40 ก้อน "หายใจ" Scale 100→103→100 หนึ่งรอบ
1.60 ค้างภาพนิ่ง
```
ทางเลือกแบบ **Morph**: วงกลม → ก้อน blob → ตัวอักษร โดยคัดลอก path จาก Illustrator มาวางเป็นคีย์ของ Path เดียวกัน และใช้ **First Vertex** ให้จุดเริ่มอยู่ตำแหน่งเดียวกันทุกคีย์ เพื่อไม่ให้ morph บิดเบี้ยว

### B. Wave Reveal (สัญลักษณ์คลื่นหรือน้ำ แบบ HYDRO, LDG, หยดน้ำ)
```
0.00–0.60 เส้นคลื่นวาดจากซ้ายไปขวา (Trim Paths End 0→100) ไล่ทีละเส้นห่างกัน 3 เฟรม
0.60–0.90 ช่องว่างระหว่างเส้นเต็มเป็นรูปหยด (mask ขยายขึ้นจากล่าง เหมือนน้ำเต็มแก้ว)
0.90–1.30 คลื่นขยับเล็กน้อยด้วย Wave idle expression แล้วนิ่ง
1.10      wordmark แบบซ้อนบรรทัด slide-up 12px + fade
```

### C. Boil Line Mascot (ลายเส้นมือ แบบ Baht. หรือแก้วมีตา)
- ใส่ **Turbulent Displace** (Amount 2–4, Size 20, Evolution ใช้ expression `posterizeTime(12); time*720`) แล้วตามด้วย **Posterize Time** 12fps จะได้เส้นที่สั่นเหมือนวาดมือ
- ใช้ท่าทางเดียวที่เล่ามุก เช่น แก้วกอดตัวเองแล้วยิ้ม, แก้วเดินเข้าเฟรมแล้วหันมอง, แก้วคว่ำแล้วกาแฟหกกลายเป็นโลโก้
- ให้ตาเป็นตัวเล่าเรื่อง: กะพริบ 2 เฟรม และมองซ้าย-ขวา

### D. Stamp / Sticker Slap (Y2K หรือ streetwear แบบ @bsent)
```
0.00 สติกเกอร์ Scale 160% Rotation −12° Opacity 0
0.12 ตบลง Scale 95% Rotation 3° + กล้องสั่น 2–3 เฟรม (wiggle บน Null กล้อง)
0.25 settle Scale 100% Rotation 0°
     ชิ้นถัดไปตบลงตามจังหวะบีต
```
ทำขอบขาวรอบสติกเกอร์ด้วย Layer Styles > Stroke สีขาว 8–12px

### E. Kinetic Wordmark (grotesk หรือ lowercase แบบ commune/coffee)
- ตัวอักษรเลื่อนขึ้นจาก baseline ผ่าน track matte ทีละตัว ส่วน `/` หรือ `.` เข้ามาเป็นตัวสุดท้ายแบบเด้ง
- **Tracking ยุบ**: Text Animator > Tracking Amount จาก 300 → 0 ใน 0.5 วิ แบบ ease-out แรง
- ตัวจุด `.` ขยายเป็นวงกลมเต็มจอ เพื่อเป็น transition ไปฉากถัดไป

### F. Character Pose (mascot ท่าทาง แบบ Arketyp หรือ silhouette นักวิ่ง MAGN8)
- anticipation: ย่อตัว 4 เฟรม → กระโดดกางแขน (stretch) → ค้างกลางอากาศ 6 เฟรม → ลงพร้อม squash
- **นักวิ่ง frame-by-frame**: วาด silhouette 6–8 ท่าใน Illustrator แบบ ref MAGN8 แล้วเรียงเป็น layer เฟรมละ 2 เฟรม (12fps) เป็น run cycle ที่ใช้เป็นไอคอนหรือ loader ได้
- rig ด้วย **DUIK Angela** หรือ **Puppet Pin** ตัดเงาออกให้แบนเสมอ
