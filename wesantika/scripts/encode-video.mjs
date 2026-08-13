/**
 * Re-encode the hero clips to the budget `npm run media` enforces.
 *
 *     node scripts/encode-video.mjs            # encode everything over budget
 *     node scripts/encode-video.mjs --all      # encode everything, in budget or not
 *     node scripts/encode-video.mjs --dry      # print the plan, touch nothing
 *
 * ---------------------------------------------------------------------------
 * Why these clips were 87MB in the first place
 *
 * They are stock footage, delivered at delivery-master settings: 2560x1440 at
 * 30fps and 12-16 Mbps. That is a specification for a clip somebody is going to
 * *grade and cut*, not one that loops behind a headline. Every one of these
 * sits under a 55-78% black scrim, at most 1672px wide, with white type over
 * it — roughly the least demanding thing you can ask a codec to carry.
 *
 * `home-hero.mp4` proves the point: 1280x720 at 1.2 Mbps, 3.1MB, and nobody has
 * ever remarked on it.
 *
 * So the fix is not clever. It is 1920 wide, 25fps, and a CRF that suits a
 * scrimmed background rather than a master.
 * ---------------------------------------------------------------------------
 *
 * Choices worth defending:
 *
 *  - **CRF 30, preset slow.** Constant quality, not constant bitrate: an easy
 *    frame costs nothing and a hard one gets what it needs. `slow` buys about
 *    10% at no runtime cost, because this runs once.
 *  - **No upscaling.** `min(1920,iw)` leaves the two 720p clips at 720p rather
 *    than inventing detail and paying for it.
 *  - **25fps only where the source is above it.** Resampling 23.98 -> 25 lands
 *    every 25th frame on a duplicate and shows as judder on a slow pan, which
 *    is precisely what these clips are. Leave those alone.
 *  - **`-an`.** `work-hero.mp4` shipped a 128kbps stereo track for a video that
 *    is `muted` in the markup and can never be unmuted by anyone.
 *  - **`-map 0:v:0`.** `ai-panel.mp4` also carries a `tmcd` timecode stream.
 *  - **`+faststart`.** moov ahead of mdat, so playback starts on the first
 *    packets instead of after the whole file. This is what `scripts/faststart.mjs`
 *    was hand-rolling in pure Node when no encoder was available; with ffmpeg
 *    here it is one flag, and it is done at encode time rather than by rewriting
 *    chunk offsets afterwards.
 *  - **yuv420p + High profile, level 4.0.** The universally decodable corner.
 *
 * Originals are moved aside to `<name>.mp4.orig` before anything is written, and
 * `.gitignore` keeps those out of the repo. Nothing here is destructive on a
 * second run: a file that already has an `.orig` beside it is encoded from that
 * original, not from the previous encode, so quality never compounds.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, renameSync, statSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "public", "video");
const BUDGET = 6 * 1024 * 1024;

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry");
const ALL = args.has("--all");

/** ffmpeg-static is a devDependency; it ships the binary for this platform. */
let FFMPEG;
try {
  FFMPEG = (await import("ffmpeg-static")).default;
} catch {
  console.error(
    "ffmpeg-static is not installed. `npm i -D ffmpeg-static`, then re-run.",
  );
  process.exit(1);
}
if (!FFMPEG || !existsSync(FFMPEG)) {
  console.error(`ffmpeg binary missing at ${FFMPEG}`);
  process.exit(1);
}

const mb = (n) => (n / 1048576).toFixed(1) + "MB";

/** Pull width and frame rate out of ffmpeg's stderr banner. */
function probe(file) {
  let out = "";
  try {
    execFileSync(FFMPEG, ["-i", file], { stdio: ["ignore", "ignore", "pipe"] });
  } catch (error) {
    out = String(error.stderr ?? "");
  }
  const stream = out.match(/Stream #\d+:\d+.*Video:.*/)?.[0] ?? "";
  const size = stream.match(/, (\d{2,5})x(\d{2,5})/);
  const fps = stream.match(/, ([\d.]+) fps/);
  const duration = out.match(/Duration: (\d+):(\d+):([\d.]+)/);
  return {
    width: size ? Number(size[1]) : 0,
    height: size ? Number(size[2]) : 0,
    fps: fps ? Number(fps[1]) : 0,
    seconds: duration
      ? Number(duration[1]) * 3600 + Number(duration[2]) * 60 + Number(duration[3])
      : 0,
    hasAudio: /Stream #\d+:\d+.*Audio:/.test(out),
  };
}

const files = readdirSync(DIR)
  .filter((f) => /\.mp4$/i.test(f))
  .sort();

let before = 0;
let after = 0;
let encoded = 0;

for (const name of files) {
  const target = join(DIR, name);
  const backup = `${target}.orig`;

  // Encode from the untouched original when one exists, so re-running this
  // never stacks a lossy pass on top of a lossy pass.
  const source = existsSync(backup) ? backup : target;
  const startBytes = statSync(target).size;
  before += startBytes;

  const info = probe(source);

  // Under budget is not sufficient on its own: `work-hero.mp4` is 2.5MB and
  // still fails `npm run media`, because it carries a stereo audio track for a
  // video the markup mutes and offers no control to unmute.
  if (!ALL && startBytes <= BUDGET && !info.hasAudio && source === target) {
    after += startBytes;
    console.log(`  skip ${name.padEnd(26)} ${mb(startBytes).padStart(7)}  already in budget`);
    continue;
  }
  const filters = [`scale='min(1920,iw)':-2`];
  // Only ever reduce. See the note at the top on 23.98 -> 25 judder.
  if (info.fps > 25.5) filters.push("fps=25");

  const tmp = join(DIR, `.tmp-${name}`);
  const cmd = [
    "-y",
    "-i", source,
    "-map", "0:v:0",          // video only — drops audio and timecode streams
    "-an",
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "30",
    "-profile:v", "high",
    "-level", "4.0",
    "-pix_fmt", "yuv420p",
    "-vf", filters.join(","),
    "-movflags", "+faststart",
    tmp,
  ];

  if (DRY) {
    console.log(`  plan ${name.padEnd(26)} ${mb(startBytes).padStart(7)}  ` +
      `${info.width}x${info.height} @${info.fps}fps ${info.seconds.toFixed(1)}s  ->  ${filters.join(",")}`);
    after += startBytes;
    continue;
  }

  process.stdout.write(`  ...  ${name.padEnd(26)} ${mb(startBytes).padStart(7)}  encoding`);
  execFileSync(FFMPEG, cmd, { stdio: ["ignore", "ignore", "pipe"] });

  if (!existsSync(backup)) renameSync(target, backup);
  else unlinkSync(target);
  renameSync(tmp, target);

  const endBytes = statSync(target).size;
  after += endBytes;
  encoded++;
  const cut = ((1 - endBytes / startBytes) * 100).toFixed(0);
  process.stdout.write(
    `\r  ok   ${name.padEnd(26)} ${mb(startBytes).padStart(7)} -> ${mb(endBytes).padStart(7)}  ` +
      `(-${cut}%)${" ".repeat(12)}\n`,
  );
}

console.log("");
console.log(
  `${encoded} encoded.  ${mb(before)} -> ${mb(after)}  ` +
    `(-${((1 - after / before) * 100).toFixed(0)}%)`,
);
if (!DRY) console.log("Run `npm run media` to check the result against the budget.");
