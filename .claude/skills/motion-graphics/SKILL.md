---
name: motion-graphics
description: Motion design and logo animation for any brand in After Effects — brief interview, storyboard frames as images, step-by-step AE setup (comps, effects, keyframes, Graph Editor easing, expressions), ready-to-run ExtendScript presets, and export specs for reels/TikTok, Lottie, GIF, digital signage. Uses each brand's CI from brands/(brand)/ci.md and motion refs from the user's Pinterest. Use whenever the user asks for โมชั่น, ภาพเคลื่อนไหว, motion graphic, logo animation, logo sting, intro/outro, reels/TikTok animation, kinetic type, mascot animation, After Effects help or expressions, Lottie — even if they don't name this skill.
---

# Motion Graphics

ผู้ใช้ทำโมชั่นใน **After Effects** สกิลนี้ทำงานกับทุกแบรนด์ โดยใช้ CI ของแบรนด์นั้น (`brands/<brand>/ci.md`) ถ้ายังไม่มี CI ให้ทำงานออกแบบด้วยสกิล `graphic-designer` ก่อน หรือถามผู้ใช้

## Workflow (หยุดรอผู้ใช้ทุก ⏸)

### 1 · บรีฟโมชั่น ⏸
ถามเฉพาะข้อที่ยังไม่รู้:
- ชิ้นงานอะไร: logo sting, intro/outro, โพสต์โฆษณา, reels, ป้ายดิจิทัลในร้าน, สติกเกอร์เคลื่อนไหว
- ลงที่ไหน, สัดส่วน (9:16, 1:1, 16:9), ความยาว, ต้อง loop ไหม
- มีเพลงหรือเสียงไหม (BPM, ต้องตัดตามบีต)
- อารมณ์: นุ่มเด้ง, เร็วแรงแบบกีฬา, เรียบหรู, กวน, วินเทจ
- ref โมชั่น: บอร์ดโมชั่นใน Pinterest (ใช้สกิล `pinterest-ref-scout` + `video_frames.sh` ดูทีละเฟรม) หรือคลิปที่ชอบ
- ไฟล์ส่งมอบ: MP4, MOV alpha, Lottie, GIF
บันทึกเพิ่มใน `brands/<brand>/brief.md` หัวข้อ Motion

### 2 · ทิศทางและ storyboard ⏸
- เลือกสูตรจาก `references/motion-playbook.md` ที่ตรงกับฟอร์มของโลโก้และ ref (เช่น gooey, width wave, spin & snap, character pose)
- ทำ **storyboard เป็นภาพ** 6–8 เฟรมด้วยสกิล `design-board-render` (แต่ละเฟรมมีเวลา, การเคลื่อนไหว, easing) และตารางนี้:
```
**Motion: [ชื่อ]** · X วิ · 1080×1920 · 30fps · loop ใช่/ไม่
| เวลา | ภาพ | การเคลื่อนไหว | Easing / Graph | เสียง |
|---|---|---|---|---|
```
- ส่งให้ผู้ใช้เลือกหรือปรับก่อนลงมือ

### 3 · ขั้นตอนใน After Effects
- Pipeline จาก Illustrator: แยก layer ทุกชิ้นที่ขยับ → Import as Composition (Retain Layer Sizes) → Create Shapes from Vector Layer
- ให้ comp settings, layer, effect, คีย์เฟรม, ค่า influence ใน Graph Editor, expression ที่ก๊อปไปวางได้
- ถ้าช่วยประหยัดเวลา ส่ง `scripts/ae_logo_presets.jsx` (8 ปุ่ม: Blob Bounce, Spin & Snap, Overshoot, Ease-out แรง, Width Wave, Gooey, Boil Line, Film Grain) หรือเขียนสคริปต์ใหม่จากฐานนี้: ExtendScript (ES3: `var`, ห้าม arrow function/let/const/template string) ครอบด้วย `app.beginUndoGroup` และบอกให้รันผ่าน File > Scripts > Run Script File
- สคริปต์ยังไม่ได้ทดสอบใน AE จริงทุกเวอร์ชัน ให้บอกผู้ใช้ และขอข้อความ error ถ้ารันไม่ผ่าน

### 4 · ส่งมอบ
- export spec ตาม `references/motion-playbook.md` §8 (Media Encoder, ProRes 4444 alpha, Bodymovin/LottieFiles)
- บันทึกสูตรที่ใช้และ feedback ใน `brands/<brand>/feedback-log.md`

## หลักการ
- ขยับตามบุคลิกของฟอร์มและแบรนด์ ไม่ใช่ fade/zoom เฉยๆ
- logo sting 1.5–3 วินาที ค้างภาพนิ่งตอนจบ ≥ 0.6 วินาที
- easing ต้องมีน้ำหนัก: ease-out แรง (influence 85–95%) หรือ overshoot ห้าม linear
- คง palette ของแบรนด์ ให้การเคลื่อนไหวเป็นตัวสร้างพลัง
- เคารพ safe zone ของแพลตฟอร์ม (reels: บน 250px ล่าง 350px)
