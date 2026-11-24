# Typography: ฟอนต์อังกฤษและไทย

ไฟล์นี้เป็นคลังฟอนต์แบ่งเป็น 7 สาย แต่ละสายมีคู่ฟอนต์ไทยกับอังกฤษ **เลือกสายจากบรีฟและ ref ของแบรนด์นั้น** ไม่ใช่จากงานก่อนหน้า
ก่อนแนะนำ ให้เลือกสายที่ตรงกับคอนเซ็ปต์ก่อน แล้วค่อยแนะนำ 1 คู่หลักกับ 1 คู่สำรอง ถ้าเป็นแบรนด์เดิม ใช้ฟอนต์ใน `brands/<brand>/ci.md`

แหล่งฟอนต์:
- **[G]** Google Fonts: ฟรี ใช้เชิงพาณิชย์ได้ (OFL)
- **[FS]** Fontshare: ฟรี ใช้เชิงพาณิชย์ได้ แต่ควรอ่านเงื่อนไขของแต่ละฟอนต์
- **[A]** Adobe Fonts: ใช้ได้ถ้ามี Creative Cloud ซิงก์เข้า AI และ AE ได้ทันที แต่ควรเช็กในเว็บ Adobe Fonts ก่อนว่ายังมีอยู่
- ฟอนต์จากแหล่งอื่น ให้บอกผู้ใช้ตรวจลิขสิทธิ์ก่อนใช้กับโลโก้หรืองานเชิงพาณิชย์ทุกครั้ง

## สารบัญ
1. ภาพรวม: ref บอกอะไรเรื่อง type
2. 7 สายฟอนต์พร้อมคู่ไทย-อังกฤษ
3. ชุดแนะนำตั้งต้น
4. กติกาจับคู่ไทยกับอังกฤษ
5. ฟอนต์สำหรับ motion (variable fonts ใน AE)
6. ปัญหาภาษาไทยใน Adobe ที่พบบ่อย

---

## 1. ภาพรวม: ref บอกอะไรเรื่อง type

- ใน ref ไม่มีฟอนต์ไทยเลย แต่โทนชัดเจนว่าเป็น **ไร้หัว (loopless) ทรงเรขาคณิต หนา และตัวชิด**
- wordmark ส่วนใหญ่เป็น **neo-grotesk หนา** (Out Of Order, Nolka, Shadow Studio, SPEELD, Land+Form, HYDRO)
- งานโมชั่นชอบ **ความกว้างที่ยืดสุดขั้ว** (AAAA), **ตัวนุ่มบวม** (lab, vessi, Beyond) และ **condensed หนามาก** (RUN RUN RUN)
- งานแนวกีฬาชอบ **italic เร็ว** กับ **varsity/heritage** (OVVNSTUDIO)
- สิ่งที่โผล่บ้างแต่ไม่บ่อย: soft serif (Brother, Catamark, Running Cult Member) และตัวเขียนมือ (RUNderful, Baht)

## 2. 7 สายฟอนต์

### สาย 1: Bold Neo-Grotesk (หลัก ใช้บ่อยที่สุด)
ref: Out Of Order, Nolka, Shadow Studio, SPEELD STUDIO, HYDRO ENERGY
| | ตัวเลือก |
|---|---|
| EN | Neue Haas Grotesk Display [A], Inter Display / Inter Tight [G], Satoshi [FS], Switzer [FS], Schibsted Grotesk [G] |
| TH | **Anuphan** [G] (ไร้หัว โครงสร้างเข้ากับ grotesk), **LINE Seed Sans TH** (ฟรี ตัวหนาสวย, ตรวจ license), Noto Sans Thai [G], IBM Plex Sans Thai [G] |
| การตั้งค่า | Bold–Black, tracking −10 ถึง −30 (อังกฤษ), ไทยใช้ 0 ถึง −10 |

### สาย 2: Friendly Lowercase (คาเฟ่ / ไลฟ์สไตล์)
ref: commune/coffee, the coffee., the fruit shop, dan studio
| | ตัวเลือก |
|---|---|
| EN | General Sans [FS], DM Sans [G], Satoshi [FS], Instrument Sans [G] |
| TH | Anuphan Medium–SemiBold [G], IBM Plex Sans Thai [G], Prompt Medium [G] |
| การตั้งค่า | ใช้ lowercase ทั้งคำ, น้ำหนัก Medium–Semibold, ลูกเล่นใช้ `.` หรือ `/` ใส่สีเน้น |

### สาย 3: Soft & Blobby (ตัวนุ่มบวม)
ref: lab, vessi, Beyond, LUNCO., the fruit shop
| | ตัวเลือก |
|---|---|
| EN | Bricolage Grotesque ExtraBold [G], Rubik Black [G], Cooper [A, เช็กชื่อในเว็บ], Fraunces Black ที่ตั้งแกน SOFT=100 [G] |
| TH | **Mitr** SemiBold–Bold [G] (มนนุ่ม ไร้หัว), Kanit Black [G], Prompt Black [G] |
| การตั้งค่า | ใช้เป็นจุดเริ่มต้นเท่านั้น งานจริงควรปรับ path ใน Illustrator ให้บวมขึ้น (Offset Path +, Round Corners) จนเป็นฟอร์มเฉพาะของแบรนด์ |

### สาย 4: Wide / Extended (display และ motion ที่ยืดความกว้าง)
ref: AAAA motion, cities, HOPAAL, MAGN8
| | ตัวเลือก |
|---|---|
| EN | **Archivo** [G] (variable แกน wdth 62–125 และ wght 100–900), Acumin Variable [A], Obviously [A], Unbounded [G], Clash Display [FS], Syne ExtraBold [G] |
| TH | **Noto Sans Thai** [G] (เวอร์ชัน variable มีแกนความกว้าง ให้เช็กใน Google Fonts), Kanit Black [G] (ถ้าจะยืด ใช้ Scale X ไม่เกิน 130%) |
| การตั้งค่า | ใช้กับคำสั้น 1–4 ตัวอักษรหรือคำเดียวเท่านั้น ไม่ใช้กับ body text |

### สาย 5: Athletic / Run Club
ref: RUN RUN RUN, 6AM CLUB, OVVNSTUDIO, BANDIT, NERDY.
| | ตัวเลือก |
|---|---|
| EN | Big Shoulders Display Black [G] (condensed แบบป้ายสนาม), Anton [G], Archivo ExtraBold Italic + wdth 125 [G], Obviously Wide Italic [A], Graduate [G] (varsity) |
| TH | **Kanit Black Italic** [G] (มี italic จริง เหมาะกับงานกีฬาที่สุด), Chakra Petch Bold Italic [G] (เหลี่ยม เทคนิคอล), Bai Jamjuree Bold [G] |
| การตั้งค่า | italic เอียงไปข้างหน้า, ใช้ condensed สำหรับโปสเตอร์เต็มหน้า, badge ใช้ตัวพิมพ์ใหญ่ + tracking +50 ถึง +100 สำหรับตัวหนังสือที่วนรอบวง |

### สาย 6: Soft Serif / Accent (ใช้เป็นครั้งคราว)
ref: Brother, Catamark, Running Cult Member, Ayla
| | ตัวเลือก |
|---|---|
| EN | Fraunces [G], Cooper [A], Zodiak [FS], Instrument Serif [G] |
| TH | Pridi [G], Trirong [G], Noto Serif Thai [G] |
| การตั้งค่า | ใช้คู่กับฟอร์มที่หนัก (เช่น serif สีขาววางบน B ก้อนสีโคบอลต์ แบบ Brother) ไม่ควรใช้เดี่ยวๆ |

### สาย 7: ย้อนยุค / วินเทจ (ไทยมีหัว)
ref: ภาพพิมพ์ห่าน maripro, ฉลาก PB, ฝูงห่านพื้นเขียว (ผู้ใช้เลือกสายนี้ในงานซักเสร็จ รอบ 5–6)
| คู่ | อังกฤษ | ไทย | อารมณ์ |
|---|---|---|---|
| F1 | Caprasimo [G] (serif อ้วนนุ่มแบบ Cooper) | Chonburi [G] (มีหัว ตัวหนาแบบป้ายโบราณ) | อบอุ่น เป็นมิตร เข้ากับภาพประกอบ |
| F2 | Courier Prime Bold [G] / Special Elite [G] (หมึกซึม) | Sarabun Bold [G] (มีหัว แบบเอกสารพิมพ์ดีดไทย) | เรียบ กวน มีอารมณ์ขัน |
| F3 | Alfa Slab One [G] (slab หนา) | Taviraj ExtraBold [G] (มีหัว เส้นหนาบาง) | แข็งแรง แบบฉลากสบู่/ผงซักฟอกสมัยก่อน |
| อื่นๆ | Young Serif [G], Fraunces [G] | Trirong [G], Pridi [G] | serif สงบ |
- งานย้อนยุคใช้ไทย **มีหัว** จะเข้ากันกว่าไร้หัว
- ผู้ใช้ **ไม่ชอบ** ฟอนต์สาย 1–3 กับงานภาพประกอบวินเทจ (บอกว่าแข็ง ไม่เข้ากับรูป) และไม่ชอบตัวอักษรเด้งขึ้นลงแบบเล่นๆ

### สายพิเศษ: เขียนมือ
ref: it's a RUNderful LIFE, Baht., SOLTO
- งานโลโก้: แนะนำให้เขียนจริงแล้ว Image Trace ใน Illustrator เพราะจะได้ลายมือเฉพาะ
- งาน mockup หรือ social: EN Gochi Hand [G], Caveat Brush [G]; TH Mali [G], Itim [G], Sriracha [G]

## 3. ชุดตั้งต้น (ใช้เมื่อบรีฟยังไม่ระบุสไตล์)

| ใช้กับ | อังกฤษ | ไทย | เหตุผล |
|---|---|---|---|
| **ชุดหลักของแบรนด์** | Inter Display Bold (ฟรี) / Neue Haas Grotesk Display (Adobe) | Anuphan Bold | ใกล้กับ wordmark ส่วนใหญ่ใน ref ที่สุด ไทยไร้หัวโครงสร้างเข้ากัน |
| **Cafe boonthawee** | General Sans Semibold (lowercase) | Anuphan SemiBold | เป็นมิตรและเรียบ เข้ากับร้านปูน-ไม้ |
| **Water. ดื่มบุญ** | Archivo Bold (wdth 100–112) | Noto Sans Thai Bold | สะอาด ยืดหยุ่น และทำ wave หรือ width motion ได้ |
| **Run club / วิ่ง** | Archivo ExtraBold Italic (wdth 125) / Big Shoulders Display | Kanit Black Italic | เร็ว แรง และมี italic จริงทั้งไทยและอังกฤษ |
| **ตัวนุ่มบวม** | Bricolage Grotesque ExtraBold | Mitr Bold | ใช้เป็นฐานก่อนปั้นเป็นก้อนแบบ lab หรือ vessi |

## 4. กติกาจับคู่ไทยกับอังกฤษ

1. **ไร้หัวคู่กับ sans, มีหัวคู่กับ serif หรือใช้เป็น body text** ส่วนโลโก้ในสไตล์นี้ใช้แบบไร้หัวเกือบทั้งหมด
2. **ปรับความสูงให้เท่ากัน**: ตัวไทยมักดูเล็กกว่าเมื่อตั้งขนาด pt เท่ากัน ให้ขยายไทยประมาณ 105–115% จนความสูงตัวไทยส่วนใหญ่ (เช่น น บ ร) เท่ากับ x-height ของอังกฤษ หรือสูงกว่าเล็กน้อย
3. **น้ำหนักต้องดูเท่ากัน ไม่ใช่เลขเท่ากัน**: ไทยมีหัวและเส้นเยอะ ถ้าอังกฤษใช้ Black ไทยอาจต้องใช้ Bold ให้ตัดสินด้วยตา
4. **Tracking ไทยห้ามติดลบมาก** เพราะสระบนล่างและวรรณยุกต์จะชนกัน ให้ไม่ต่ำกว่า −10
5. **Line height ไทยอย่างน้อย 1.3** (อังกฤษ display ใช้ 0.9–1.05 ได้) ใน lock-up 2 ภาษาจึงต้องเว้นระยะบรรทัดแยกกัน
6. **โลโก้ภาษาไทย**: ควร outline แล้วปรับตัวที่มีหางเอง (ป ฝ ฟ ฬ ญ ฐ) ให้เข้ากับฟอร์มของโลโก้ อย่าใช้ตัวพิมพ์ดิบ

## 5. ฟอนต์สำหรับ motion (variable fonts ใน AE)

- AE เวอร์ชันใหม่รองรับการปรับแกนของ variable font (เช่น wght และ wdth) ใน Properties หรือ Character panel แต่การทำคีย์เฟรมแกนโดยตรงขึ้นกับเวอร์ชัน ให้ผู้ใช้เช็กในเครื่อง ถ้าทำคีย์เฟรมไม่ได้ ใช้วิธีสำรองด้านล่าง
- **วิธีสำรองที่ใช้ได้ทุกเวอร์ชัน** (ใช้ทำแบบ AAAA): แยกตัวอักษรละ layer แล้วคีย์ Scale X (เช่น 60% → 160%) หรือใช้ Text Animator แบบ Scale + Range Selector (Based On: Characters) แล้วเลื่อน Offset ข้อเสียคือเส้นตั้งจะหนาบางผิดสัดส่วน ซึ่งถ้าไม่เกิน ±40% แทบไม่เห็น
- **วิธีที่เนียนที่สุด**: ใน Illustrator ทำตัวอักษรทั้งชุดตั้งแต่ wdth แคบสุดถึงกว้างสุดเป็น path แยก layer แล้วใน AE ใช้ Create Shapes from Vector Layer จากนั้นคัดลอก Path ของแต่ละเฟรมมาเป็นคีย์เฟรม Path เดียวกัน เพื่อ morph ระหว่างกัน (จำนวนจุดต้องเท่ากัน ซึ่ง variable font ทำให้เท่ากันอยู่แล้ว)
- ฟอนต์ variable ที่แนะนำสำหรับ motion: Archivo [G], Bricolage Grotesque [G], Fraunces [G], Acumin Variable [A], Noto Sans Thai [G]

## 6. ปัญหาภาษาไทยใน Adobe และในการเรนเดอร์บอร์ด

| อาการ | ทางแก้ |
|---|---|
| สระหรือวรรณยุกต์ลอยผิดที่ หรือซ้อนกันใน Illustrator | Paragraph panel > เมนู ☰ > เลือก **Adobe World-Ready Paragraph Composer** |
| สระลอยผิดที่ใน After Effects | Preferences > Type > Text Engine > **South Asian and Middle Eastern** แล้วรีสตาร์ท AE |
| ตัดคำไทยผิดที่ | ใส่ line break เอง หรือใช้ zero-width space ระหว่างคำ |
| Animate ทีละตัวอักษรแล้วสระหลุด | ตั้ง Range Selector > Based On เป็น **Words** หรือ outline ข้อความก่อน |
| ตัวอักษรอังกฤษกลายเป็น serif แปลกๆ ในภาพพรีเซนต์ | ฟอนต์ไทยบางตัวในชุด fontsource (เช่น Anuphan, Kanit, Mitr) โหลดเฉพาะไฟล์ thai ให้ใส่ฟอนต์อังกฤษนำหน้าใน font-family เช่น `font-family: DM, Anuphan` |
| ยืดช่องไฟไทยให้กว้างเท่าอังกฤษแล้วอ่านเป็นตัวๆ | อย่ายืด ให้จัดกึ่งกลางหรือปรับขนาดแทน |
| แยกตัวอักษรไทยทีละตัวเพื่อทำเอฟเฟกต์แล้วสระหลุด | แยกด้วย `Intl.Segmenter('th',{granularity:'grapheme'})` ไม่ใช่แยกทีละ character |
