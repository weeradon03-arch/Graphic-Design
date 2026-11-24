# Motion Playbook: สูตรทำโลโก้ให้ขยับใน After Effects

ผู้ใช้ทำโมชั่นใน **After Effects** สูตรทั้งหมดจึงเขียนเป็นขั้นตอนใน AE
เลือกสูตรตามประเภทฟอร์มของโลโก้ แล้วส่งงานเป็น storyboard, ขั้นตอนใน AE, expression และสคริปต์ (ถ้าช่วยได้)

## สารบัญ
1. ตั้งค่าและ pipeline จาก Illustrator ไป AE
2. Timing และ easing (ค่าใน Graph Editor)
3. Expression ที่ใช้บ่อย
4. สูตรจาก ref โมชั่นของผู้ใช้ (G–K)
5. สูตรพื้นฐานตามประเภทโลโก้ (A–F)
6. Campaign / Reels: sports energy
7. Look: grain, เลนส์, สี
8. Export
9. Sound design

---

## 1. ตั้งค่าและ pipeline จาก Illustrator ไป AE

1. **ใน Illustrator**: outline ตัวหนังสือทั้งหมด, แยกทุกชิ้นที่จะขยับเป็น layer ของตัวเอง (ตัวอักษรละ layer, สัญลักษณ์แยกจาก wordmark, เส้นคลื่นละเส้น), artboard เป็นสี่เหลี่ยม แล้วบันทึกเป็น .ai
2. **Import เข้า AE**: เลือก Import As: **Composition – Retain Layer Sizes**
3. คลิกขวาที่ layer แล้วเลือก **Create > Create Shapes from Vector Layer** เพื่อแปลงเป็น shape layer ที่ morph path ได้, ใช้ trim path ได้ และคมทุกขนาด
4. ตั้ง comp:
   - Logo sting: 1080×1080 หรือ 1920×1080, 30fps (ref ✱ ใช้ 60fps ทำให้หมุนลื่นมาก)
   - Reels: 1080×1920, 30fps
   - Mascot ลายมือ: ทำที่ 24fps แล้วใส่ Posterize Time 12
5. ตั้งพื้นหลังด้วย **Solid** สีจาก palette ห้ามปล่อยพื้นโปร่งใสถ้าจะส่งออกเป็น MP4

## 2. Timing และ easing

| ใช้กับ | ระยะเวลา | Graph Editor (Speed Graph) |
|---|---|---|
| Logo sting เต็ม | 1.5–3.0 วิ | ผสม (ดูแต่ละสูตร) |
| องค์ประกอบเข้าเฟรม | 0.3–0.6 วิ | คีย์แรก Outgoing influence 10–20%, คีย์สุดท้าย Incoming influence **85–95%** (ease-out แรง) |
| เด้ง blob หรือ mascot | 0.4–0.7 วิ | ease-out แรง + **overshoot expression** (§3) |
| ตัวอักษรไล่ทีละตัว | ห่างกัน 1–2 เฟรม | ทุกตัวใช้ ease เดียวกัน, ใช้ Sequence Layers หรือ offset ด้วย expression |
| ค้างตอนจบ | ≥ 0.6 วิ | นิ่งสนิท |
| Loop idle | 2–4 วิต่อรอบ | Easy Ease 33/33 หรือ sine expression |

วิธีลัด: เลือกคีย์ทั้งหมด กด **F9** (Easy Ease) แล้วเข้า Graph Editor ไปดึง influence ของคีย์ปลายทางให้ถึง 90%

หลักแอนิเมชันที่ใช้บ่อยในสไตล์นี้: **squash & stretch, anticipation, overshoot/follow-through, hard cut ตามบีต**

## 3. Expression ที่ใช้บ่อย

**Overshoot / inertial bounce** (วางที่ Scale, Position หรือ Rotation ที่มีคีย์เฟรมแล้ว):
```js
amp = .06; freq = 3; decay = 6;
n = 0;
if (numKeys > 0) { n = nearestKey(time).index; if (key(n).time > time) n--; }
if (n > 0) {
  t = time - key(n).time;
  v = velocityAtTime(key(n).time - thisComp.frameDuration / 10);
  value + v * amp * Math.sin(freq * t * 2 * Math.PI) / Math.exp(decay * t);
} else value;
```

**Squash & stretch ที่รักษาปริมาตรเมื่อเด้ง** (วางที่ Scale):
```js
s = transform.scale[1];          // คีย์เฉพาะแกน Y
x = 10000 / Math.max(s, 1);      // X หดเมื่อ Y ยืด
[x, s];
```

**Wave idle** (Position ของเส้นคลื่น แต่ละเส้นมีจังหวะไม่ตรงกัน):
```js
value + [0, Math.sin(time * 2 + index * .8) * 4];
```

**เส้นสั่นแบบวาดมือ** (Turbulent Displace > Evolution):
```js
posterizeTime(12); time * 720;
```

**Hold ภาพนิ่งตอนจบ** (หยุดทุกอย่างหลังวินาทีที่ 2.4):
```js
t = Math.min(time, 2.4); valueAtTime(t);
```

## 4. สูตรจาก ref โมชั่นของผู้ใช้ (เลือกใช้ตามบรีฟของแบรนด์)

### G. Gooey Melt (จาก ref "lab": ตัวอักษรบวมแล้วละลายรวมกัน)
**ใช้กับ**: wordmark lowercase ตัวนุ่ม, โลโก้ blob, คาเฟ่, แบรนด์สนุกๆ
```
0.0–1.0  wordmark นิ่ง
1.0–2.2  ก้อนวงกลมขาวโตขึ้นจากใต้ตัว l แล้วไหลไปทางขวา ตัวอักษรถูกกลืนเป็นก้อนเดียว
2.2–3.0  ก้อนหดกลับ ตัวอักษรค่อยแยกตัวและคืนรูป
3.0–4.0  นิ่ง
4.0–5.5  ก้อนโผล่ที่ตัวสุดท้าย (b) แล้วคลายกลับ
loop 6 วิ ที่ 24fps
```
**ขั้นตอนใน AE**:
1. สร้าง precomp "GOO" ที่มี wordmark (shape สีขาว) และ shape วงกลมสีขาว 1–3 ลูก คีย์ Position และ Scale ของวงกลมให้ไหลผ่านตัวอักษร
2. ใส่เอฟเฟกต์บน layer GOO ใน comp หลัก ตามลำดับนี้:
   - **Fast Box Blur**: Blur Radius 18–30, Iterations 3, เปิด Repeat Edge Pixels
   - **Levels (Individual Controls)**: ช่อง Alpha ตั้ง Input Black ≈ 110 และ Input White ≈ 140 เพื่อทำขอบให้คมแบบของเหลว
   - **Fill**: สีขาวหรือสีแบรนด์
3. ปรับ Blur Radius: ค่ามากจะเหลวมาก ค่าน้อยจะเหนียวน้อย คีย์ Blur Radius ขึ้นลงได้ด้วย เพื่อให้มีช่วงที่ตัวอักษรคมชัด
4. อย่าให้ก้อนกลืนตัวอักษรนานเกิน 1.2 วิ เพราะคนต้องอ่านชื่อแบรนด์ออก

### H. Width Wave Cascade (จาก ref "AAAA": ความกว้างตัวอักษรไหลเป็นคลื่น + ตัดเปลี่ยนสีพื้น)
**ใช้กับ**: ตัวอักษรเดี่ยว/monogram, intro reels, แบรนด์วิ่งหรือกีฬา (ให้ความรู้สึกเร็ว), ฟอนต์สาย 4 ใน graphic-designer/references/typography.md
```
ตัวอักษรเดียวกันเรียง 5–7 ตัว กว้างสุดอยู่ซ้าย แคบสุดอยู่ขวา
ความกว้างไหลเป็นคลื่นซ้าย→ขวา รอบละ ~1.5 วิ
ทุก 1.5 วิ hard cut เปลี่ยนตัวอักษรและคู่สี เช่น
  เทา #E6E6E6 บน โคบอลต์ #0A4BE8 → ดำ บน เหลือง #FFD60A
  → ชมพู #F59AC8 บน แดงเลือดหมู #4A0004 → เหลืองนีออน #E4FF3A บน ลาเวนเดอร์ #D9D4EC
```
**ขั้นตอนใน AE** (ใช้ได้ทุกเวอร์ชัน):
1. สร้าง text layer ตัวอักษรละ 1 layer เรียงลำดับติดกันใน timeline (หรือใช้ฟังก์ชัน Width Wave ใน `scripts/ae_logo_presets.jsx`)
2. Anchor Point ทุกตัวใช้ expression นี้ เพื่อให้จุดหมุนอยู่ขอบซ้าย:
```js
r = sourceRectAtTime(time, false); [r.left, r.top + r.height / 2];
```
3. Scale ทุกตัวใช้ expression นี้:
```js
freq = .66; amp = 55; base = 105;           // freq = รอบต่อวินาที
phase = (index - thisComp.layer("L1").index) * .9;
sx = base + amp * Math.sin(time * freq * 2 * Math.PI - phase);
[sx, value[1]];
```
4. Position ตั้งแต่ตัวที่ 2 เป็นต้นไป ใช้ expression นี้ เพื่อให้แต่ละตัวต่อท้ายตัวก่อนหน้าเสมอ:
```js
p = thisComp.layer(index - 1);
w = p.sourceRectAtTime(time, false).width * p.transform.scale[0] / 100;
[p.transform.position[0] + w + 4, value[1]];
```
5. ตั้งชื่อตัวแรกว่า "L1" แล้ว parent ทุกตัวเข้ากับ Null เดียว เพื่อจัดกลางทั้งกลุ่ม
6. สำหรับสีพื้น ใช้ Solid แล้วคีย์ Fill color แบบ **Toggle Hold Keyframe** (Ctrl/Cmd + Alt + H) ทุก 1.5 วิ ตัวอักษรก็คีย์สีแบบ Hold ในจังหวะเดียวกัน
7. ถ้าใช้ variable font ที่มีแกน wdth และ AE รองรับการคีย์แกน ให้คีย์แกน wdth แทน Scale X จะได้น้ำหนักเส้นที่ถูกต้องกว่า

### I. Liquid Glass Distortion (จาก ref "SPEELD STUDIO": ก้อนกระจกเหลวไหลผ่านตัวหนังสือ)
**ใช้กับ**: wordmark grotesk นิ่งๆ ที่ต้องการลูกเล่นหรู, สตูดิโอ, น้ำดื่ม (เข้ากับ Water. ดื่มบุญ)
```
0.0–2.0  wordmark นิ่ง พื้นเทาอ่อน
2.0–4.5  ก้อนกระจกเหลวไหลเข้าจากขวาบน ตัวหนังสือที่อยู่ใต้ก้อนบิดและหักเห ขอบก้อนมีสีส้มและฟ้าเหลือบ
4.5–6.0  ก้อนแตกเป็นหยดเล็ก แล้วหายไป
6.0–7.5  นิ่ง → ก้อนมารอบที่ 2 จากซ้ายล่าง → loop
```
**ขั้นตอนใน AE**:
1. สร้าง precomp "LENS" ที่มี shape ก้อน blob สีขาวบนพื้นดำ คีย์ path และ position ให้ไหล (หรือใช้สูตร G ทำให้เป็นก้อนเหลว) แล้วปิดตา (hide) layer นี้ใน comp หลัก
2. บน wordmark ใส่ **Displacement Map**: Displacement Map Layer = LENS (Effects & Masks), Use For Horizontal/Vertical = Luminance, Max Displacement 40–80
3. เพิ่ม **CC Lens** หรือ **Bulge** ให้ตำแหน่งตามก้อน (pick whip ไปที่ Position ของ LENS) เพื่อให้ตัวหนังสือดูโป่งออก
4. ทำขอบสีเหลือบ: duplicate wordmark 3 ชั้น ใส่ **Shift Channels** ให้เหลือแค่ R, G, B ทีละชั้น, ตั้ง blend mode เป็น **Add** แล้วตั้ง Max Displacement แต่ละชั้นต่างกันเล็กน้อย (เช่น 60, 66, 72)
5. ใส่ไฮไลต์ขาว: ใช้ LENS ที่เบลอเล็กน้อย, blend mode Screen, opacity 40%
6. ถ้าต้องการให้ตัวหนังสือดูเป็นเส้นขอบในก้อนแบบใน ref ให้เพิ่ม **Find Edges** บน precomp ที่มาส์กด้วยรูปก้อน

### J. Symbol Spin & Snap (จาก ref "✱ Studio": สัญลักษณ์หมุนเข้า แล้วแตกเป็น lock-up)
**ใช้กับ**: สัญลักษณ์เรขาคณิต (ดอกจัน, ดาว, ดอกไม้แบบ Nolka, หกเหลี่ยม SP✱), logo sting สั้น
```
0.00–0.35  สัญลักษณ์เล็ก Scale 20→120% พร้อม Rotation −90°→+8° (ease-out แรง)
0.35–0.55  เด้งกลับ Scale 100%, Rotation 0° (overshoot expression)
0.55–0.80  สัญลักษณ์แยกครึ่ง: ครึ่งขวาสไลด์ออกแล้วกลายเป็นเส้นตั้ง ครึ่งซ้ายเลื่อนไปตำแหน่ง lock-up
0.70–1.00  wordmark 3 บรรทัดเข้า: Opacity 0→100 และสีจากเทา #808080 เป็นดำ ไล่บรรทัดละ 2 เฟรม
1.00–      ค้างภาพนิ่ง (ใน ref ค้างนานถึง 12 วิ เพราะ sting แบบนี้ต้องการเวลาให้คนอ่านชื่อ)
```
**ขั้นตอนใน AE**: สร้างสัญลักษณ์เป็น shape layer โดยแยกแขนแต่ละแขนเป็น group, คีย์ Scale/Rotation ที่ group ใหญ่, ช่วงแยกครึ่งให้ใช้ Trim Paths หรือคีย์ Path ของแขนด้านขวาให้ยุบเป็นเส้นตั้ง ทำที่ 60fps จะลื่นที่สุด

### K. Brand System Reel (จาก ref "vessi": โชว์ระบบแบรนด์ทั้งชุด)
**ใช้กับ**: เปิดตัวแบรนด์, พรีเซนต์ CI, IG reels ช่วงเปิดร้าน (เหมาะกับ Cafe boonthawee และ Water. ดื่มบุญ)
| เวลา | ฉาก | เทคนิค |
|---|---|---|
| 0–3 วิ | ก้อน blob สีแบรนด์ขยายเต็มเฟรม แล้วหดเป็น symbol | Path morph + Scale overshoot |
| 3–5 วิ | symbol กลายเป็น wordmark ตัวอักษรเลื่อนเข้าทีละตัว | Text slide-up + track mask |
| 5–8 วิ | Type specimen ไล่น้ำหนัก Thin → Black มีลูกศร → ชี้น้ำหนักที่ใช้ | Text ไล่บรรทัดละ 3 เฟรม (ไทยและอังกฤษ) |
| 8–11 วิ | Palette: บล็อกสีสไลด์เข้าเต็มจอทีละสี แสดง HEX | Hard cut ตามบีต |
| 11–15 วิ | Tag ทรงเม็ดยา (pill) สีพาสเทลที่เชื่อมกันแบบ gooey เช่น "New / Collection", "ดื่ม / บุญ" | สูตร G กับ shape ทรง pill |
| 15–20 วิ | ฟุตเทจหรือภาพในกรอบ pill แล้วขยายเต็มจอ | Track matte ทรง pill + Scale |
| 20–24 วิ | Photo grid ของ application (แก้ว ป้าย ขวด) | Grid เลื่อนแบบ parallax |
| 24–26 วิ | ไอคอนเส้นขาวทับฟุตเทจ | Trim Paths draw-on |
| 26–28 วิ | wordmark ปิดท้ายบนพื้นสีแบรนด์ | ค้างภาพนิ่ง |

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

## 6. Campaign / Reels: sports energy (จากบอร์ด running และ photo run)

โครง 15 วิ 9:16:
| เวลา | ภาพ | เทคนิค |
|---|---|---|
| 0.0–1.0 | Hook: รองเท้ากระโดดข้ามกล้อง fisheye | Time Remapping ทำ speed ramp 50%→200% |
| 1.0–6.0 | ตัดเร็วตามบีต 4–6 ช็อต (ฝูงวิ่ง หน้าเหงื่อ ราดน้ำ) | hard cut ตรงบีต + flash ขาว 1 เฟรม |
| 6.0–9.0 | Headline ใหญ่เต็มจอทีละคำ (RUN / ด้วยกัน) | kinetic type ตัดคำละ 6–8 เฟรม, ใช้สูตร H กับคำเดียว |
| 9.0–12.0 | slow-mo กลุ่มเพื่อนหัวเราะ + ไอคอนขาวทับ (ดวงอาทิตย์หยัก, ประกาย, นักวิ่ง) | Pixel Motion Blur + Trim Paths ไอคอน |
| 12.0–15.0 | logo sting (สูตร J หรือ A) + CTA | ค้างภาพนิ่ง |

**Safe zone** สำหรับ reels: เว้นด้านบน 250px และด้านล่าง 350px (จาก 1920) ไว้ให้ UI ของแพลตฟอร์ม

## 7. Look: grain, เลนส์, สี

- **Film grain**: Adjustment Layer + **Add Grain** (Preset: Kodak 5218 หรือปรับ Intensity 0.4–0.7, Size 1.2) หรือ **Noise** 4–8% ถ้าเครื่องช้า
- **Fisheye หรือตัวหนังสือโป่ง** (แบบ ref cities): ใช้ **CC Lens** (Size 80–120, Convergence 30–60) หรือ **Optics Compensation** โดยเลือก Reverse Lens Distortion
- **Motion blur**: เปิดสวิตช์ Motion Blur ของ layer และ comp, Shutter Angle 180–360 ถ้าต้องการให้เบลอแรงแบบภาพวิ่ง
- **สี**: ใช้ Lumetri Color ดันฟ้าให้อิ่ม (HSL Secondary) และให้ไฮไลต์ออกครีม ส่วนงานกราฟิกล้วนให้ใช้สี HEX ตรงๆ ไม่ต้อง grade

## 8. Export

| ปลายทาง | วิธีส่งออก | หมายเหตุ |
|---|---|---|
| IG/TikTok reels | Media Encoder > H.264, 1080×1920, 30fps, VBR 2 pass 10–16 Mbps | ใส่ grain ก่อน export, ไม่ต้องกังวลเรื่องไฟล์ใหญ่ |
| ส่งต่อให้ Premiere หรือคนตัดต่อ | ProRes 422 HQ (ถ้ามีพื้น) / ProRes 4444 + Alpha (ถ้าพื้นโปร่ง) | |
| เว็บหรือแอป | **Lottie** ผ่านปลั๊กอิน Bodymovin หรือ LottieFiles | ใช้ได้เฉพาะ shape layer, trim paths และ transform ห้ามใช้ effect (Blur, Turbulent Displace, Displacement Map) |
| GIF | Media Encoder > Animated GIF, ≤ 2 วิ, 480px | palette น้อยของสไตล์นี้ทำให้ GIF ออกมาสวย |
| ป้ายดิจิทัล | MP4 loop ไม่มีรอยต่อ | เฟรมแรกต้องเท่ากับเฟรมสุดท้าย, เช็กด้วยการ preview แบบ loop |

## 9. Sound design (ถ้าต้องการ)
- Blob และ gooey: เสียง pop หรือ boing นุ่ม + thump ตอนกระแทก
- Wave และ liquid glass: เสียงน้ำ swoosh หรือ bubble
- Spin & snap: เสียง whoosh สั้น + click ตอนล็อก
- Stamp: เสียงกระดาษตบ + เทปฉีก
- Width wave และ campaign: บีต 120–140 BPM ตัดตาม kick
