import fs from "node:fs";

// public/robots.txt is our canonical file — it carries the Content-Signal line.
// Vocs regenerates robots.txt during a production build and overwrites the copy
// in the build output (on previews it skips generation, so ours is served as-is).
// Copy ours back over whatever vocs produced so our version ships everywhere.
const SOURCE = "public/robots.txt";
const TARGETS = [".vercel/output/static/robots.txt", "dist/public/robots.txt"];

if (!fs.existsSync(SOURCE)) {
  console.log(`• ${SOURCE} missing, leaving build output untouched`);
  process.exit(0);
}

const canonical = fs.readFileSync(SOURCE, "utf8");
let restored = 0;
for (const target of TARGETS) {
  if (!fs.existsSync(target)) continue;
  if (fs.readFileSync(target, "utf8") === canonical) continue; // already ours (preview)
  fs.writeFileSync(target, canonical, "utf8");
  console.log(`✅ ${target}: restored canonical robots.txt`);
  restored++;
}
if (restored === 0) {
  console.log("• robots.txt already canonical (preview) or build output missing");
}
