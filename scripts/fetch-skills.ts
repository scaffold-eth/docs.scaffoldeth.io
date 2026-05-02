import fs from "node:fs";
import path from "node:path";

const SKILLS_DIR = "docs/pages/build-with-ai";
const RAW_SKILLS_DIR = "docs/public/skills";
const RAW_BASE =
  "https://raw.githubusercontent.com/scaffold-eth/scaffold-eth-2/main/.agents/skills";
const GITHUB_API =
  "https://api.github.com/repos/scaffold-eth/scaffold-eth-2/contents/.agents/skills";

export type Skill = {
  name: string;
  title: string;
  shortDesc: string;
};

async function getSkillNames(): Promise<string[]> {
  const res = await fetch(GITHUB_API);
  if (!res.ok) return [];
  const dirs = (await res.json()) as { name: string; type: string }[];
  return dirs.filter((d) => d.type === "dir").map((d) => d.name);
}

async function fetchAndWriteSkill(name: string): Promise<Skill | null> {
  const res = await fetch(`${RAW_BASE}/${name}/SKILL.md`);
  if (!res.ok) return null;

  const raw = await res.text();

  // Extract original frontmatter and body
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n*/);
  const originalFrontmatter = fmMatch ? fmMatch[1] : "";
  const body = raw.replace(/^---[\s\S]*?---\n*/, "");

  // Extract description for Vocs meta
  const descMatch = raw.match(/description:\s*"([^"]+)"/);
  const shortDesc = descMatch
    ? descMatch[1].split(". Use when")[0]
    : `${name} skill for Scaffold-ETH 2`;

  // Vocs frontmatter for page meta, original frontmatter as visible code block
  fs.writeFileSync(
    path.join(SKILLS_DIR, `${name}.md`),
    `---\ntitle: "${name}"\ndescription: "${shortDesc}"\n---\n\n\`\`\`yaml\n---\n${originalFrontmatter}\n---\n\`\`\`\n\n${body}`,
  );

  // Raw, untouched SKILL.md for agent discovery index (/.well-known/agent-skills)
  const rawDir = path.join(RAW_SKILLS_DIR, name);
  fs.mkdirSync(rawDir, { recursive: true });
  fs.writeFileSync(path.join(rawDir, "SKILL.md"), raw);

  return { name, title: name, shortDesc };
}

function writeSkillsOverview(skills: Skill[]) {
  const rows = skills
    .map(
      (s) =>
        `| [**${s.title}**](/build-with-ai/${s.name}) | ${s.shortDesc} |`,
    )
    .join("\n");

  fs.writeFileSync(
    path.join(SKILLS_DIR, "skills.md"),
    `---
title: Skills
description: Reusable AI agent instructions for adding features to Scaffold-ETH 2.
---

# Skills

Skills are markdown files (\`SKILL.md\`) that teach AI agents how to add specific features to your SE-2 project. Each one covers the prerequisites, implementation patterns, common gotchas of smart contracts / frontend, and how the feature connects to SE-2's hooks and components. They live in your project at \`.agents/skills/<name>/SKILL.md\`, and your agent reads them before implementing a feature so it follows proven patterns instead of guessing.

## Available Skills

| Skill | What it does |
|-------|-------------|
${rows}

:::info
The orchestrator skill is hosted at [\`docs.scaffoldeth.io/SKILL.md\`](https://docs.scaffoldeth.io/SKILL.md). This is the entry point AI agents use to scaffold a new SE-2 project.
:::

## Skills vs Extensions

[\`Extensions\`](/extensions) and skills solve different problems. Extensions run at project creation time (\`npx create-eth@latest\`) and add boilerplate files to your project. Skills work anytime during development. Your AI agent reads the skill instructions and adapts the implementation to your existing code, instead of dumping a fixed template.

The plan is to eventually migrate all extensions to skills. Skills are more flexible since the agent can adapt to your existing codebase, and they don't require changes to the CLI scaffolding pipeline.

## Creating your own Skills

Add a \`SKILL.md\` in \`.agents/skills/<your-skill>/\` and reference it in your \`AGENTS.md\` Skills Index.
`,
  );
}

function readExistingSkills(): Skill[] | null {
  // If skills.md already exists, pages were already generated this run
  const skillsFile = path.join(SKILLS_DIR, "skills.md");
  if (!fs.existsSync(skillsFile)) return null;

  // Read sidebar info from existing files
  const files = fs
    .readdirSync(SKILLS_DIR)
    .filter(
      (f) => f.endsWith(".md") && !["skills.md", "agents-md.md"].includes(f),
    );

  if (files.length === 0) return null;

  // Require the raw SKILL.md mirrors to exist too — they feed the agent-skills
  // discovery index. If any are missing, bust the cache and re-fetch.
  const allRawPresent = files.every((f) => {
    const name = f.replace(".md", "");
    return fs.existsSync(path.join(RAW_SKILLS_DIR, name, "SKILL.md"));
  });
  if (!allRawPresent) return null;

  return files.map((f) => {
    const name = f.replace(".md", "");
    return { name, title: name, shortDesc: "" };
  });
}

export async function fetchSkills(): Promise<Skill[]> {
  // Skip fetch if pages already exist (Vocs evaluates config multiple times)
  const existing = readExistingSkills();
  if (existing) return existing;

  try {
    fs.mkdirSync(SKILLS_DIR, { recursive: true });

    const names = await getSkillNames();
    const results = await Promise.all(names.map(fetchAndWriteSkill));
    const skills = results.filter(Boolean) as Skill[];

    if (skills.length > 0) {
      writeSkillsOverview(skills);
      console.log(`✅ Fetched ${skills.length} skills from GitHub`);
    }

    return skills;
  } catch (err) {
    console.warn("⚠️  Failed to fetch skills from GitHub:", err);
    return [];
  }
}
