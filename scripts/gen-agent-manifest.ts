import fs from "node:fs";
import path from "node:path";

const OUTPUT = "docs/public/.well-known/agent.json";
const PRODUCTION_URL = "https://docs.scaffoldeth.io";

function resolveBaseUrl(): string {
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return PRODUCTION_URL;
}

let generated = false;

export function generateAgentManifest(): void {
  if (generated) return;
  generated = true;

  const baseUrl = resolveBaseUrl();
  const manifest = {
    name: "Scaffold-ETH 2 Docs",
    description: "AI agent entrypoints for building full-stack Ethereum dapps with Scaffold-ETH 2.",
    homepage_url: baseUrl,
    repository_url: "https://github.com/scaffold-eth/se-2-docs",
    project_repository_url: "https://github.com/scaffold-eth/scaffold-eth-2",
    entrypoints: {
      orchestrator_skill: `${baseUrl}/SKILL.md`,
      docs_index: `${baseUrl}/llms.txt`,
      full_docs_corpus: `${baseUrl}/llms-full.txt`,
      skill_index: `${baseUrl}/.well-known/agent-skills/index.json`,
      build_with_ai: `${baseUrl}/build-with-ai`,
      agents_md_guide: `${baseUrl}/build-with-ai/agents-md`,
      skills_guide: `${baseUrl}/build-with-ai/skills`,
    },
    defaults: {
      scaffold_command: "npx -y create-eth@latest -s foundry <project-name>",
      default_contract_framework: "foundry",
      package_manager: "yarn",
      local_dev_commands: ["yarn chain", "yarn deploy", "yarn start"],
    },
    supported_workflows: [
      "scaffold a new Scaffold-ETH 2 dapp",
      "build Solidity contracts with a Next.js frontend",
      "use AGENTS.md for project-specific coding-agent context",
      "select project-local skills from .agents/skills",
      "add common web3 integrations using Scaffold-ETH 2 patterns",
    ],
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2) + "\n");

  console.log(`✅ Generated agent.json (base: ${baseUrl})`);
}
