# AE pipeline: setup, timing, expressions, export

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

## 8. Export

| ปลายทาง | วิธีส่งออก | หมายเหตุ |
|---|---|---|
| IG/TikTok reels | Media Encoder > H.264, 1080×1920, 30fps, VBR 2 pass 10–16 Mbps | ใส่ grain ก่อน export, ไม่ต้องกังวลเรื่องไฟล์ใหญ่ |
| ส่งต่อให้ Premiere หรือคนตัดต่อ | ProRes 422 HQ (ถ้ามีพื้น) / ProRes 4444 + Alpha (ถ้าพื้นโปร่ง) | |
| เว็บหรือแอป | **Lottie** ผ่านปลั๊กอิน Bodymovin หรือ LottieFiles | ใช้ได้เฉพาะ shape layer, trim paths และ transform ห้ามใช้ effect (Blur, Turbulent Displace, Displacement Map) |
| GIF | Media Encoder > Animated GIF, ≤ 2 วิ, 480px | palette น้อยของสไตล์นี้ทำให้ GIF ออกมาสวย |
| ป้ายดิจิทัล | MP4 loop ไม่มีรอยต่อ | เฟรมแรกต้องเท่ากับเฟรมสุดท้าย, เช็กด้วยการ preview แบบ loop |
