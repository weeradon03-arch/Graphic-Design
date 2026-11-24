/*
  Beer Brand Motion — After Effects logo presets
  ------------------------------------------------
  วิธีใช้: เปิด comp > เลือก layer > File > Scripts > Run Script File... > เลือกไฟล์นี้
  (หรือวางไว้ในโฟลเดอร์ Scripts/ScriptUI Panels แล้วเปิดจากเมนู Window)
  ทุกปุ่มเริ่มแอนิเมชันที่ตำแหน่ง playhead ปัจจุบัน และกด Ctrl/Cmd+Z ย้อนได้ในครั้งเดียว

  ปุ่ม:
    Blob Bounce     — หล่น ยุบ เด้ง (สูตร A)            : layer ใดก็ได้
    Spin & Snap     — หมุนเข้าแล้วล็อก (สูตร J)          : layer ใดก็ได้
    Overshoot       — ใส่ expression เด้งให้ Scale/Position/Rotation ที่มีคีย์อยู่แล้ว
    Ease-out แรง    — ปรับคีย์ทุกตัวของ Scale/Position/Rotation/Opacity เป็น influence 90%
    Width Wave      — ความกว้างไหลเป็นคลื่น (สูตร H)     : เลือกตัวอักษรหลาย layer ที่เรียงติดกัน
    Gooey           — ก้อนเหลวรวมตัว (สูตร G)            : เลือก precomp ที่มีตัวอักษร + วงกลม
    Boil Line       — เส้นสั่นแบบวาดมือ 12fps (สูตร C)
    Film Grain      — เพิ่ม adjustment layer เกรนบนสุดของ comp

  เขียนเป็น ExtendScript (ES3) ยังไม่ได้ทดสอบกับ AE ทุกเวอร์ชัน
  ถ้าเจอ error ให้ส่งข้อความ error กลับมาเพื่อแก้ไข
*/
(function (thisObj) {

    // ---------- helpers ----------
    function getComp() {
        var c = app.project.activeItem;
        if (!(c && c instanceof CompItem)) { alert("เปิด composition ก่อนนะ"); return null; }
        return c;
    }
    function getSel(comp, min) {
        var s = comp.selectedLayers;
        if (s.length < (min || 1)) { alert("เลือก layer อย่างน้อย " + (min || 1) + " อัน"); return null; }
        return s;
    }
    function tr(layer, name) { return layer.property("ADBE Transform Group").property(name); }
    function dims(prop) {
        if (prop.isSpatial) return 1;
        var v = prop.value;
        return (v instanceof Array) ? v.length : 1;
    }
    function vec(prop, x, y) {            // สร้างค่าให้ตรงจำนวนมิติของ property
        var n = (prop.value instanceof Array) ? prop.value.length : 1;
        if (n === 1) return x;
        if (n === 2) return [x, y];
        return [x, y, prop.value[2]];
    }
    function easeAll(prop, inInf, outInf) {
        var d = dims(prop), i, k, easeIn, easeOut;
        for (k = 1; k <= prop.numKeys; k++) {
            easeIn = []; easeOut = [];
            for (i = 0; i < d; i++) {
                easeIn.push(new KeyframeEase(0, inInf));
                easeOut.push(new KeyframeEase(0, outInf));
            }
            prop.setTemporalEaseAtKey(k, easeIn, easeOut);
        }
    }
    function anchorBottom(layer, t) {      // ย้าย anchor ไปขอบล่างกลาง โดยตำแหน่งบนจอไม่เปลี่ยน
        if (!layer.sourceRectAtTime) return;
        var r = layer.sourceRectAtTime(t, false);
        var ap = tr(layer, "ADBE Anchor Point"), pos = tr(layer, "ADBE Position");
        if (ap.numKeys > 0 || pos.numKeys > 0) return;
        var oldA = ap.value, newA = [r.left + r.width / 2, r.top + r.height];
        var sc = tr(layer, "ADBE Scale").value;
        var p = pos.value;
        var dx = (newA[0] - oldA[0]) * sc[0] / 100, dy = (newA[1] - oldA[1]) * sc[1] / 100;
        ap.setValue(oldA.length === 3 ? [newA[0], newA[1], oldA[2]] : newA);
        pos.setValue(p.length === 3 ? [p[0] + dx, p[1] + dy, p[2]] : [p[0] + dx, p[1] + dy]);
    }
    function setFx(fx, name, val) {
        try { fx.property(name).setValue(val); return true; } catch (e) { return false; }
    }
    function run(label, fn) {
        app.beginUndoGroup("Beer Motion: " + label);
        try { fn(); } catch (e) { alert(label + " error:\n" + e.toString() + (e.line ? "\nline " + e.line : "")); }
        app.endUndoGroup();
    }

    var OVERSHOOT =
        "amp = .06; freq = 3; decay = 6;\n" +
        "n = 0;\n" +
        "if (numKeys > 0) { n = nearestKey(time).index; if (key(n).time > time) n--; }\n" +
        "if (n > 0) {\n" +
        "  t = time - key(n).time;\n" +
        "  v = velocityAtTime(key(n).time - thisComp.frameDuration / 10);\n" +
        "  value + v * amp * Math.sin(freq * t * 2 * Math.PI) / Math.exp(decay * t);\n" +
        "} else value;";

    // ---------- presets ----------
    function blobBounce() {
        var comp = getComp(); if (!comp) return;
        var sel = getSel(comp); if (!sel) return;
        var t0 = comp.time, i, L, sc, op;
        for (i = 0; i < sel.length; i++) {
            L = sel[i];
            anchorBottom(L, t0);
            sc = tr(L, "ADBE Scale");
            sc.setValueAtTime(t0,        vec(sc, 0, 0));
            sc.setValueAtTime(t0 + .15,  vec(sc, 85, 120));
            sc.setValueAtTime(t0 + .35,  vec(sc, 125, 75));
            sc.setValueAtTime(t0 + .55,  vec(sc, 96, 105));
            sc.setValueAtTime(t0 + .70,  vec(sc, 100, 100));
            easeAll(sc, 75, 25);
            op = tr(L, "ADBE Opacity");
            op.setValueAtTime(t0, 0); op.setValueAtTime(t0 + 2 * comp.frameDuration, 100);
            t0 += .06;                                       // stagger ถ้าเลือกหลาย layer
        }
    }

    function spinSnap() {
        var comp = getComp(); if (!comp) return;
        var sel = getSel(comp); if (!sel) return;
        var t0 = comp.time, i, sc, rot;
        for (i = 0; i < sel.length; i++) {
            sc = tr(sel[i], "ADBE Scale");
            rot = tr(sel[i], "ADBE Rotate Z");
            sc.setValueAtTime(t0, vec(sc, 20, 20));
            sc.setValueAtTime(t0 + .35, vec(sc, 120, 120));
            sc.setValueAtTime(t0 + .55, vec(sc, 100, 100));
            rot.setValueAtTime(t0, -90);
            rot.setValueAtTime(t0 + .35, 8);
            rot.setValueAtTime(t0 + .55, 0);
            easeAll(sc, 90, 15); easeAll(rot, 90, 15);
        }
    }

    function overshoot() {
        var comp = getComp(); if (!comp) return;
        var sel = getSel(comp); if (!sel) return;
        var names = ["ADBE Scale", "ADBE Position", "ADBE Rotate Z"], i, j, p, count = 0;
        for (i = 0; i < sel.length; i++) for (j = 0; j < names.length; j++) {
            p = tr(sel[i], names[j]);
            if (p && p.numKeys > 0 && p.canSetExpression) {
                try { p.expression = OVERSHOOT; count++; } catch (e) {}
            }
        }
        if (count === 0) alert("ไม่เจอคีย์เฟรมบน Scale/Position/Rotation (Position แบบ Separate Dimensions ไม่รองรับ)");
    }

    function easeOutStrong() {
        var comp = getComp(); if (!comp) return;
        var sel = getSel(comp); if (!sel) return;
        var names = ["ADBE Scale", "ADBE Position", "ADBE Rotate Z", "ADBE Opacity"], i, j, p;
        for (i = 0; i < sel.length; i++) for (j = 0; j < names.length; j++) {
            p = tr(sel[i], names[j]);
            if (p && p.numKeys > 1) easeAll(p, 90, 15);
        }
    }

    function widthWave() {
        var comp = getComp(); if (!comp) return;
        var sel = getSel(comp, 2); if (!sel) return;
        var arr = [], i;
        for (i = 0; i < sel.length; i++) arr.push(sel[i]);
        arr.sort(function (a, b) { return a.index - b.index; });
        for (i = 1; i < arr.length; i++) {
            if (arr[i].index !== arr[i - 1].index + 1) { alert("layer ตัวอักษรต้องเรียงติดกันใน timeline (ตัวซ้ายสุดอยู่บนสุด)"); return; }
        }
        var first = arr[0].index;
        for (i = 0; i < arr.length; i++) {
            var L = arr[i];
            tr(L, "ADBE Anchor Point").expression =
                "r = sourceRectAtTime(time, false);\n[r.left, r.top + r.height / 2];";
            tr(L, "ADBE Scale").expression =
                "freq = .66; amp = 55; base = 105;\n" +
                "phase = (index - " + first + ") * .9;\n" +
                "sx = base + amp * Math.sin(time * freq * 2 * Math.PI - phase);\n" +
                "[sx, value[1]];";
            if (i > 0) {
                tr(L, "ADBE Position").expression =
                    "p = thisComp.layer(index - 1);\n" +
                    "w = p.sourceRectAtTime(time, false).width * p.transform.scale[0] / 100;\n" +
                    "[p.transform.position[0] + w + 4, value[1]];";
            }
        }
        alert("เสร็จแล้ว: ปรับ freq / amp / base ใน expression ของ Scale ได้\nแนะนำ: parent ทุกตัวเข้ากับ Null แล้วเลื่อนจัดกลาง");
    }

    function gooey() {
        var comp = getComp(); if (!comp) return;
        var sel = getSel(comp); if (!sel) return;
        var L = sel[0], fxs = L.property("ADBE Effect Parade"), miss = [];
        var blur = fxs.addProperty("ADBE Box Blur2");                 // Fast Box Blur
        if (!setFx(blur, "Blur Radius", 24)) miss.push("Fast Box Blur > Blur Radius = 24");
        setFx(blur, "Iterations", 3);
        setFx(blur, "Repeat Edge Pixels", 1);
        var lv = fxs.addProperty("ADBE Pro Levels2");                 // Levels (Individual Controls)
        if (!setFx(lv, "Alpha Input Black", 110 / 255)) miss.push("Levels > Alpha Input Black ≈ 110");
        if (!setFx(lv, "Alpha Input White", 140 / 255)) miss.push("Levels > Alpha Input White ≈ 140");
        fxs.addProperty("ADBE Fill");
        if (miss.length) alert("ใส่เอฟเฟกต์แล้ว แต่ตั้งค่าเองต่ออีกนิด:\n- " + miss.join("\n- "));
    }

    function boilLine() {
        var comp = getComp(); if (!comp) return;
        var sel = getSel(comp); if (!sel) return;
        var i, fxs, td;
        for (i = 0; i < sel.length; i++) {
            fxs = sel[i].property("ADBE Effect Parade");
            td = fxs.addProperty("ADBE Turbulent Displace");
            setFx(td, "Amount", 3);
            setFx(td, "Size", 20);
            try { td.property("Evolution").expression = "posterizeTime(12); time * 720;"; } catch (e) {}
            var pt = fxs.addProperty("ADBE Posterize Time");
            setFx(pt, "Frame Rate", 12);
        }
    }

    function filmGrain() {
        var comp = getComp(); if (!comp) return;
        var adj = comp.layers.addSolid([0.5, 0.5, 0.5], "Grain", comp.width, comp.height, comp.pixelAspect, comp.duration);
        adj.adjustmentLayer = true;
        var n = adj.property("ADBE Effect Parade").addProperty("ADBE Noise");
        if (!setFx(n, "Amount of Noise", 6)) alert("ตั้ง Noise > Amount ≈ 6% เอง");
        setFx(n, "Use Color Noise", 0);
        adj.moveToBeginning();
    }

    // ---------- UI ----------
    var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Beer Motion Presets", undefined, { resizeable: true });
    win.orientation = "column"; win.alignChildren = ["fill", "top"]; win.spacing = 6; win.margins = 10;
    function btn(label, tip, fn) {
        var b = win.add("button", undefined, label);
        b.helpTip = tip;
        b.onClick = function () { run(label, fn); };
    }
    btn("Blob Bounce", "หล่น ยุบ เด้ง — เลือก layer แล้วตั้ง playhead จุดเริ่ม", blobBounce);
    btn("Spin & Snap", "หมุนเข้าแล้วล็อก — สำหรับสัญลักษณ์", spinSnap);
    btn("Overshoot", "ใส่ expression เด้งให้คีย์ที่มีอยู่", overshoot);
    btn("Ease-out แรง", "ปรับ influence คีย์ปลายทาง 90%", easeOutStrong);
    btn("Width Wave", "เลือกตัวอักษรหลาย layer ที่เรียงติดกัน", widthWave);
    btn("Gooey", "เลือก precomp ที่มีตัวอักษร + ก้อนวงกลม", gooey);
    btn("Boil Line", "เส้นสั่นแบบวาดมือ 12fps", boilLine);
    btn("Film Grain", "เพิ่ม adjustment layer เกรน", filmGrain);
    if (win instanceof Window) { win.center(); win.show(); } else { win.layout.layout(true); }

})(this);
