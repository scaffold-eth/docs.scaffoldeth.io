import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const SCHEMA_URL = "https://schemas.agentskills.io/discovery/0.2.0/schema.json";
const ROOT_SKILL = "docs/public/SKILL.md";
const SKILLS_DIR = "docs/public/skills";
const OUTPUT = "docs/public/.well-known/agent-skills/index.json";
const PRODUCTION_URL = "https://docs.scaffoldeth.io";

type SkillType = "skill-md" | "archive";

type SkillEntry = {
  name: string;
  type: SkillType;
  description: string;
  url: string;
  digest: string;
};

function resolveBaseUrl(): string {
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return PRODUCTION_URL;
}

function sha256Digest(filePath: string): string {
  const buf = fs.readFileSync(filePath);
  return `sha256:${crypto.createHash("sha256").update(buf).digest("hex")}`;
}

function parseFrontmatter(source: string): Record<string, string> {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1];
  const out: Record<string, string> = {};
  for (const line of body.split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[kv[1]] = value;
  }
  return out;
}

function buildEntry(filePath: string, routePath: string, fallbackName: string, baseUrl: string): SkillEntry | null {
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf8");
  const fm = parseFrontmatter(source);
  const name = (fm.name || fallbackName).toLowerCase();
  const description = fm.description || `${name} skill for Scaffold-ETH 2`;

  return {
    name,
    type: "skill-md",
    description,
    url: `${baseUrl}${routePath}`,
    digest: sha256Digest(filePath),
  };
}

let generated = false;

export function generateAgentSkillsIndex(): void {
  if (generated) return;
  generated = true;

  const baseUrl = resolveBaseUrl();
  const entries: SkillEntry[] = [];

  const root = buildEntry(ROOT_SKILL, "/SKILL.md", "ethereum-app-builder", baseUrl);
  if (root) entries.push(root);

  if (fs.existsSync(SKILLS_DIR)) {
    for (const dir of fs.readdirSync(SKILLS_DIR, { withFileTypes: true })) {
      if (!dir.isDirectory()) continue;
      const skillFile = path.join(SKILLS_DIR, dir.name, "SKILL.md");
      const entry = buildEntry(skillFile, `/skills/${dir.name}/SKILL.md`, dir.name, baseUrl);
      if (entry) entries.push(entry);
    }
  }

  entries.sort((a, b) => a.name.localeCompare(b.name));

  const index = {
    $schema: SCHEMA_URL,
    skills: entries,
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(index, null, 2) + "\n");

  console.log(`✅ Generated agent-skills index with ${entries.length} skills (base: ${baseUrl})`);
}
