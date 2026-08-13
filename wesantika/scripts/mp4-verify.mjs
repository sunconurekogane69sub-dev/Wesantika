/**
 * Verify that every chunk offset in an MP4 points inside its own mdat.
 *
 *     node scripts/mp4-verify.mjs
 *
 * This was written for `faststart.mjs`, a pure-Node moov relocator used when no
 * encoder was available on this machine. That script is gone — `npm run video`
 * now passes `-movflags +faststart` to a real ffmpeg — but the check is worth
 * keeping: it is an independent verification that the files in `public/video`
 * are structurally sound, whoever produced them.
 *
 * The original hazard it was built for: that script found `stco` boxes by
 * scanning the moov
 * buffer byte by byte, and four bytes spelling "stco" can occur inside sample
 * tables, track names or free space. A false match would rewrite something that
 * is not an offset table and silently corrupt the file — it would still parse,
 * still report the right duration, and simply fail to decode.
 *
 * So the offsets are checked against the truth: a real box-tree walk down to
 * `moov/trak/mdia/minf/stbl/stco`, and every entry must land inside the mdat
 * payload. Anything outside means the file is broken.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "public", "video");

const CONTAINERS = new Set([
  "moov", "trak", "mdia", "minf", "stbl", "edts", "udta", "mvex",
]);

/** Recursive box walk. Calls back on every box with its absolute range. */
function walk(buf, start, end, depth, visit) {
  let p = start;
  while (p + 8 <= end) {
    let size = buf.readUInt32BE(p);
    const type = buf.toString("latin1", p + 4, p + 8);
    let header = 8;
    if (size === 1) {
      if (p + 16 > end) return;
      size = Number(buf.readBigUInt64BE(p + 8));
      header = 16;
    } else if (size === 0) {
      size = end - p;
    }
    if (size < header || p + size > end) return;

    visit({ type, start: p, size, header, depth });
    if (CONTAINERS.has(type)) {
      walk(buf, p + header, p + size, depth + 1, visit);
    }
    p += size;
  }
}

if (!existsSync(DIR)) {
  console.log("  no public/video directory");
  process.exit(0);
}

let bad = 0;

for (const name of readdirSync(DIR).filter((f) => /\.mp4$/i.test(f)).sort()) {
  const buf = readFileSync(join(DIR, name));

  let mdat = null;
  let moov = null;
  walk(buf, 0, buf.length, 0, (b) => {
    if (b.depth === 0 && b.type === "mdat") mdat = b;
    if (b.depth === 0 && b.type === "moov") moov = b;
  });

  if (!mdat || !moov) {
    console.log(`  ??   ${name.padEnd(26)} no top-level moov/mdat`);
    continue;
  }

  const lo = mdat.start + mdat.header;
  const hi = mdat.start + mdat.size;

  const tables = [];
  walk(buf, moov.start + moov.header, moov.start + moov.size, 1, (b) => {
    if (b.type === "stco" || b.type === "co64") tables.push(b);
  });

  let entries = 0;
  let outside = 0;
  let first = null;
  let last = null;

  for (const t of tables) {
    const count = buf.readUInt32BE(t.start + t.header + 4);
    let q = t.start + t.header + 8;
    for (let i = 0; i < count; i++) {
      const off =
        t.type === "stco"
          ? buf.readUInt32BE(q)
          : Number(buf.readBigUInt64BE(q));
      q += t.type === "stco" ? 4 : 8;
      entries++;
      if (first === null || off < first) first = off;
      if (last === null || off > last) last = off;
      if (off < lo || off >= hi) outside++;
    }
  }

  const ok = outside === 0 && tables.length > 0;
  if (!ok) bad++;
  console.log(
    `  ${ok ? "ok  " : "BAD "} ${name.padEnd(26)} ` +
      `${String(tables.length).padStart(2)} table(s), ${String(entries).padStart(4)} offsets, ` +
      `range ${first}..${last} vs mdat ${lo}..${hi}` +
      (outside ? `   ${outside} OUTSIDE mdat` : ""),
  );
}

console.log("");
if (bad) {
  console.error(`${bad} file(s) have offsets outside their mdat — restore from .orig.`);
  process.exit(1);
}
console.log("All chunk offsets resolve inside their mdat.");
