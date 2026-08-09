/**
 * Build the 1200x630 share image from brand assets: a navy-to-brand-blue
 * gradient with the bright logo centred. No text beyond the logo — the title
 * and description come from the page metadata, and baking copy into the image
 * would freeze it in English.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateSync, deflateSync, crc32 } from "node:zlib";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200, H = 630;

/* ---------- PNG in / out ------------------------------------------------- */
function decode(file) {
  const buf = readFileSync(file);
  let p = 8, w = 0, h = 0, ct = 0;
  const idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString("ascii", p + 4, p + 8);
    if (type === "IHDR") { w = buf.readUInt32BE(p + 8); h = buf.readUInt32BE(p + 12); ct = buf[p + 17]; }
    else if (type === "IDAT") idat.push(buf.subarray(p + 8, p + 8 + len));
    else if (type === "IEND") break;
    p += 12 + len;
  }
  const bpp = ct === 6 ? 4 : 3, stride = w * bpp;
  const raw = inflateSync(Buffer.concat(idat));
  const out = Buffer.alloc(h * stride);
  const paeth = (a, b, c) => { const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c); return pa <= pb && pa <= pc ? a : pb <= pc ? b : c; };
  for (let y = 0; y < h; y++) {
    const ft = raw[y * (stride + 1)];
    const src = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0, b = prev ? prev[i] : 0, c = prev && i >= bpp ? prev[i - bpp] : 0;
      let v = src[i];
      if (ft === 1) v += a; else if (ft === 2) v += b;
      else if (ft === 3) v += (a + b) >> 1; else if (ft === 4) v += paeth(a, b, c);
      cur[i] = v & 0xff;
    }
  }
  return { w, h, bpp, data: out };
}

const chunk = (type, body) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(body.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), body]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td) >>> 0);
  return Buffer.concat([len, td, crc]);
};
function encode(w, h, rgba) {
  const stride = w * 4;
  const rows = Buffer.alloc(h * (stride + 1));
  for (let y = 0; y < h; y++) rgba.copy(rows, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr), chunk("IDAT", deflateSync(rows, { level: 9 })), chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** Box-filter resample, alpha-aware. */
function resize(img, tw, th) {
  const out = Buffer.alloc(tw * th * 4);
  const sx = img.w / tw, sy = img.h / th;
  for (let y = 0; y < th; y++) {
    const y0 = Math.floor(y * sy), y1 = Math.max(y0 + 1, Math.floor((y + 1) * sy));
    for (let x = 0; x < tw; x++) {
      const x0 = Math.floor(x * sx), x1 = Math.max(x0 + 1, Math.floor((x + 1) * sx));
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      for (let yy = y0; yy < y1 && yy < img.h; yy++) {
        for (let xx = x0; xx < x1 && xx < img.w; xx++) {
          const o = (yy * img.w + xx) * img.bpp, al = (img.bpp === 4 ? img.data[o + 3] : 255) / 255;
          r += img.data[o] * al; g += img.data[o + 1] * al; b += img.data[o + 2] * al;
          a += (img.bpp === 4 ? img.data[o + 3] : 255); n++;
        }
      }
      const o = (y * tw + x) * 4, aAvg = a / n, norm = aAvg > 0 ? n * (aAvg / 255) : 1;
      out[o] = Math.round(r / norm); out[o + 1] = Math.round(g / norm);
      out[o + 2] = Math.round(b / norm); out[o + 3] = Math.round(aAvg);
    }
  }
  return { w: tw, h: th, bpp: 4, data: out };
}

/* ---------- compose ------------------------------------------------------ */
const NAVY = [0x06, 0x2a, 0x52];
const DEEP = [0x04, 0x1d, 0x38];
const BRAND = [0x0f, 0x84, 0xfd];

const canvas = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    // diagonal ramp, deep navy top-left -> brand-tinted bottom-right
    const t = Math.min(1, (x / W) * 0.75 + (y / H) * 0.45);
    const glow = Math.max(0, 1 - Math.hypot(x / W - 0.78, y / H - 0.85) * 1.7);
    const o = (y * W + x) * 4;
    for (let c = 0; c < 3; c++) {
      const base = DEEP[c] + (NAVY[c] - DEEP[c]) * t;
      canvas[o + c] = Math.round(base + (BRAND[c] - base) * glow * 0.5);
    }
    canvas[o + 3] = 255;
  }
}

const logo = decode(`${ROOT}/public/images/logo-bright.png`);
const targetW = 620;
const small = resize(logo, targetW, Math.round((logo.h / logo.w) * targetW));
const ox = Math.round((W - small.w) / 2), oy = Math.round((H - small.h) / 2) - 10;
for (let y = 0; y < small.h; y++) {
  for (let x = 0; x < small.w; x++) {
    const s = (y * small.w + x) * 4, d = ((y + oy) * W + (x + ox)) * 4;
    const a = small.data[s + 3] / 255;
    for (let c = 0; c < 3; c++) {
      canvas[d + c] = Math.round(small.data[s + c] * a + canvas[d + c] * (1 - a));
    }
  }
}

// brand rule under the logo
const ruleY = oy + small.h + 46, ruleW = 96, ruleH = 5;
for (let y = ruleY; y < ruleY + ruleH; y++) {
  for (let x = Math.round((W - ruleW) / 2); x < Math.round((W + ruleW) / 2); x++) {
    const o = (y * W + x) * 4;
    canvas[o] = BRAND[0]; canvas[o + 1] = BRAND[1]; canvas[o + 2] = BRAND[2];
  }
}

writeFileSync(`${ROOT}/public/images/og.png`, encode(W, H, canvas));
console.log(`  wrote public/images/og.png  ${W}x${H}`);
