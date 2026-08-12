/**
 * Media budget.
 *
 *     npm run media
 *
 * Every video in public/video is an autoplaying background. Nobody asked for it,
 * nobody will miss it if it does not arrive, and on a metered connection it costs
 * real money — so it has a budget, and this enforces it.
 *
 * Two things are checked:
 *
 * 1. **Size.** A hero background wants to be under 6MB. The clips dropped into
 *    this project were stock-download originals at 12-16 Mbps; three of the four
 *    page heroes are 19-31MB. `HeroVideo` already refuses to load any of them
 *    below 1024px, so phones pay nothing, but a 31MB desktop background is still
 *    indefensible.
 *
 * 2. **Fast start.** `moov` has to precede `mdat`. Without it a browser cannot
 *    begin playback until the whole file has arrived, which on a 24MB clip means
 *    the poster sits there for a long time and then jumps.
 *
 * This is expected to FAIL until the oversized clips are re-encoded. That is the
 * point: a failing check is a visible problem, and a note in a README is not.
 * There is no ffmpeg on the machine this was built on, so the re-encode has to
 * happen wherever there is one:
 *
 *   ffmpeg -i in.mp4 -an -c:v libx264 -crf 30 -preset slow \
 *          -vf "scale=1920:-2,fps=25" -movflags +faststart out.mp4
 *
 * `-an` matters: these are muted backgrounds, so every byte of audio is waste.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "public", "video");

/** Megabytes. Above this, a background video is doing harm. */
const BUDGET_MB = 6;

if (!existsSync(DIR)) {
  console.log("  no public/video directory — nothing to check");
  process.exit(0);
}

const files = readdirSync(DIR).filter((f) => /\.mp4$/i.test(f));
if (files.length === 0) {
  console.log("  no videos — nothing to check");
  process.exit(0);
}

function inspect(path) {
  const b = readFileSync(path);
  const moov = b.indexOf(Buffer.from("moov", "latin1"));
  const mdat = b.indexOf(Buffer.from("mdat", "latin1"));
  const audio = b.indexOf(Buffer.from("mp4a", "latin1")) > 0;

  let seconds = null;
  const k = b.indexOf(Buffer.from("mvhd", "latin1"));
  if (k > 0) {
    const ver = b[k + 4];
    if (ver === 0) {
      const ts = b.readUInt32BE(k + 16);
      if (ts) seconds = b.readUInt32BE(k + 20) / ts;
    } else {
      const ts = b.readUInt32BE(k + 24);
      if (ts) seconds = Number(b.readBigUInt64BE(k + 28)) / ts;
    }
  }

  return {
    mb: b.length / 1024 / 1024,
    fastStart: moov > 0 && mdat > 0 && moov < mdat,
    audio,
    mbps: seconds ? (b.length * 8) / seconds / 1e6 : null,
  };
}

let failures = 0;
console.log(`Video budget: ${BUDGET_MB}MB, moov before mdat, no audio track\n`);

for (const name of files.sort()) {
  const r = inspect(join(DIR, name));
  const problems = [];
  if (r.mb > BUDGET_MB) problems.push(`${r.mb.toFixed(1)}MB over ${BUDGET_MB}MB`);
  if (!r.fastStart) problems.push("not fast-start");
  if (r.audio) problems.push("carries an audio track");

  if (problems.length) failures++;
  console.log(
    `  ${problems.length ? "FAIL" : "ok  "} ${name.padEnd(26)} ` +
      `${r.mb.toFixed(1).padStart(6)}MB  ` +
      `${r.mbps ? `${r.mbps.toFixed(1)} Mbps` : "  ? Mbps"}` +
      (problems.length ? `   ${problems.join(", ")}` : ""),
  );
}

console.log("");
if (failures) {
  console.error(
    `${failures} of ${files.length} videos are outside budget. See the header of` +
      " this file for the re-encode command.",
  );
  process.exit(1);
}
console.log("All videos within budget.");
