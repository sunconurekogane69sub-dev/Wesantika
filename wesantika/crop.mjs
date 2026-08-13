import sharp from "sharp";
const OUT = process.env.CLAUDE_JOB_DIR + "/tmp/shots";
for (const [src, name, top, height] of JSON.parse(process.argv[2])) {
  const meta = await sharp(`${OUT}/${src}.png`).metadata();
  const h = Math.min(height, meta.height - top);
  await sharp(`${OUT}/${src}.png`)
    .extract({ left: 0, top, width: meta.width, height: h })
    .toFile(`${OUT}/c-${name}.png`);
  console.log(`  ${name}  ${meta.width}x${h} from y=${top}`);
}
