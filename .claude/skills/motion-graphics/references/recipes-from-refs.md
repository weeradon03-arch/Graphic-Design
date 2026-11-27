# Motion recipes G–K (from the user's motion refs: lab, AAAA, SPEELD, ✱ Studio, vessi)

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
