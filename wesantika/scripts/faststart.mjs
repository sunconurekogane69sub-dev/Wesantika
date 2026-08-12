/**
 * Move `moov` ahead of `mdat` so a video can start playing before it has
 * finished downloading.
 *
 *     node scripts/faststart.mjs
 *
 * There is no ffmpeg on this machine, so re-encoding is off the table — but
 * fast-start does not need one. It is a container-level rearrangement: the movie
 * header goes in front of the media data, and every absolute sample offset
 * inside it is shifted by however far the media data moved. No frame is touched
 * and the file is bit-identical in what it decodes to.
 *
 * Why it matters here: two of the clips ship with `moov` *after* `mdat`, and a
 * browser cannot begin playback until it has parsed `moov`. On a 23.6MB file
 * that means downloading all 23.6MB before the first frame — which looks exactly
 * like the video being broken.
 *
 * What this does NOT fix is size. These are 12-16 Mbps stock originals and only
 * an encoder can bring that down; `npm run media` stays red on the ones that are
 * simply too big.
 *
 * Rewrites in place, keeping a `.orig` copy the first time it touches a file.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "public", "video");

/** Walk the top-level box list. */
function topLevel(buf) {
  const boxes = [];
  let p = 0;
  while (p + 8 <= buf.length) {
    let size = buf.readUInt32BE(p);
    const type = buf.toString("latin1", p + 4, p + 8);
    let header = 8;
    if (size === 1) {
      size = Number(buf.readBigUInt64BE(p + 8));
      header = 16;
    } else if (size === 0) {
      size = buf.length - p;
    }
    if (size < header) break;
    boxes.push({ type, start: p, size, header });
    p += size;
  }
  return boxes;
}

/**
 * Shift every absolute chunk offset inside a moov buffer.
 *
 * `stco` holds 32-bit offsets, `co64` holds 64-bit ones. Both are inside
 * moov/trak/mdia/minf/stbl, but scanning the whole moov for the box headers is
 * equivalent and far less code than walking the tree.
 */
function shiftChunkOffsets(moov, delta) {
  let patched = { stco: 0, co64: 0, entries: 0 };
  let p = 0;
  while (p + 8 <= moov.length) {
    const type = moov.toString("latin1", p + 4, p + 8);

    if (type === "stco" || type === "co64") {
      const count = moov.readUInt32BE(p + 12); // after version+flags
      let q = p + 16;
      for (let i = 0; i < count; i++) {
        if (type === "stco") {
          if (q + 4 > moov.length) break;
          moov.writeUInt32BE(moov.readUInt32BE(q) + delta, q);
          q += 4;
        } else {
          if (q + 8 > moov.length) break;
          moov.writeBigUInt64BE(moov.readBigUInt64BE(q) + BigInt(delta), q);
          q += 8;
        }
        patched.entries++;
      }
      patched[type]++;
    }
    p++; // byte-wise scan: box headers are not guaranteed to be aligned here
  }
  return patched;
}

if (!existsSync(DIR)) {
  console.log("  no public/video directory");
  process.exit(0);
}

let changed = 0;
let already = 0;

for (const name of readdirSync(DIR).filter((f) => /\.mp4$/i.test(f)).sort()) {
  const path = join(DIR, name);
  const buf = readFileSync(path);
  const boxes = topLevel(buf);

  const moov = boxes.find((b) => b.type === "moov");
  const mdat = boxes.find((b) => b.type === "mdat");

  if (!moov || !mdat) {
    console.log(`  skip ${name.padEnd(26)} no moov/mdat at top level`);
    continue;
  }
  if (moov.start < mdat.start) {
    already++;
    console.log(`  ok   ${name.padEnd(26)} already fast-start`);
    continue;
  }
  if (boxes.some((b) => b.type === "moof")) {
    console.log(`  skip ${name.padEnd(26)} fragmented (moof present)`);
    continue;
  }

  // mdat moves forward by exactly the size of moov, so every absolute offset
  // recorded inside moov increases by the same amount.
  const moovBuf = Buffer.from(buf.subarray(moov.start, moov.start + moov.size));
  const patched = shiftChunkOffsets(moovBuf, moov.size);

  // ftyp first, then everything that is not moov or mdat, then moov, then mdat.
  const others = boxes.filter(
    (b) => b.type !== "moov" && b.type !== "mdat" && b.type !== "ftyp",
  );
  const ftyp = boxes.find((b) => b.type === "ftyp");

  const parts = [];
  if (ftyp) parts.push(buf.subarray(ftyp.start, ftyp.start + ftyp.size));
  for (const b of others) parts.push(buf.subarray(b.start, b.start + b.size));
  parts.push(moovBuf);
  parts.push(buf.subarray(mdat.start, mdat.start + mdat.size));

  const out = Buffer.concat(parts);
  if (out.length !== buf.length) {
    console.log(
      `  FAIL ${name.padEnd(26)} size changed ${buf.length} -> ${out.length}; not written`,
    );
    continue;
  }

  const backup = `${path}.orig`;
  if (!existsSync(backup)) copyFileSync(path, backup);
  writeFileSync(path, out);
  changed++;
  console.log(
    `  MOVED ${name.padEnd(25)} moov ${(moov.size / 1024).toFixed(0)}K ahead of mdat, ` +
      `${patched.entries} offsets +${moov.size} (${patched.stco} stco, ${patched.co64} co64)`,
  );
}

console.log(`\n  ${changed} rewritten, ${already} already fast-start`);
