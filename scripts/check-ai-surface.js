import fs from "node:fs";
import path from "node:path";

const DIST_DIR = "docs/dist";
const LLMS_FILE = path.join(DIST_DIR, "llms.txt");
const FULL_LLMS_FILE = path.join(DIST_DIR, "llms-full.txt");
const REQUIRED_PUBLIC_FILES = ["robots.txt", "sitemap.xml", "SKILL.md"];

function fail(message) {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
}

function assertFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`Missing ${filePath}. Run pnpm build before pnpm check:ai-surface.`);
    return false;
  }
  return true;
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function validateLlmsIndex() {
  if (!assertFile(LLMS_FILE)) return;

  const source = read(LLMS_FILE);
  const entries = source.split(/\r?\n/).filter((line) => line.startsWith("- ["));

  if (entries.length === 0) {
    fail("llms.txt does not contain any Markdown link entries.");
    return;
  }

  const badEntries = entries.filter((line) => {
    const match = line.match(/^- \[([^\]]*)\]\(([^)]*)\)/);
    if (!match) return true;

    const title = match[1].trim();
    const href = match[2].trim();
    return (
      title.length < 4 ||
      title.endsWith(" ") ||
      /^(Read a|Wagmi|Write to a Contract with)$/.test(title) ||
      !href.startsWith("/")
    );
  });

  if (badEntries.length > 0) {
    fail(`llms.txt contains malformed entries:\n${badEntries.join("\n")}`);
  }
}

function validateFullCorpus() {
  if (!assertFile(FULL_LLMS_FILE)) return;
  const source = read(FULL_LLMS_FILE);
  if (!source.includes("Scaffold-ETH 2 | Docs")) {
    fail("llms-full.txt is missing the docs title.");
  }
}

function validatePublicFiles() {
  for (const file of REQUIRED_PUBLIC_FILES) {
    assertFile(path.join(DIST_DIR, file));
  }
}

validateLlmsIndex();
validateFullCorpus();
validatePublicFiles();

if (process.exitCode) {
  process.exit();
}

console.log("✅ AI surface checks passed");
