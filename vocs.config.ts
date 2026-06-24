import { defineConfig, McpSource } from "vocs/config";
import fs from "node:fs";

// Skill sidebar entries come from a manifest written by scripts/generate.ts
// (fetch-skills) before dev/build, so config evaluation stays synchronous —
// no top-level await, which v2's Vite/Waku config loading doesn't want.
type SkillEntry = { name: string; title: string };
let skills: SkillEntry[] = [];
try {
  skills = JSON.parse(fs.readFileSync("src/skills.generated.json", "utf8"));
} catch {
  // manifest not generated yet — sidebar omits skill pages this run
}
const skillSidebarItems = skills.map((s) => ({
  text: s.title,
  link: `/build-with-ai/${s.name}`,
}));

const baseUrl =
  process.env.VERCEL_ENV === "production" &&
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://docs.scaffoldeth.io";

export default defineConfig({
  title: "🏗 Scaffold-ETH 2 | Docs",
  description: "Open-source toolkit for building dapps",
  logoUrl: "/img/logo.svg",
  iconUrl: "/img/favicon.png",
  baseUrl,
  ogImageUrl:
    "https://vocs.dev/api/og?logo=%logo&title=%title&description=%description",
  // v2's Shiki bundle is strict: an unknown fence language fails the build
  // (v1 silently fell back to plaintext). Skill pages fetched from the SE-2 repo
  // use `env` fences — alias them to bash, and let anything else degrade to text.
  codeHighlight: {
    langAlias: { env: "bash" },
    fallbackLanguage: "text",
  },
  // Native v2 MCP server at /api/mcp — exposes the docs + SE-2 source to AI clients.
  mcp: {
    enabled: true,
    sources: [
      McpSource.github({
        name: "scaffold-eth-2",
        repo: "scaffold-eth/scaffold-eth-2",
      }),
    ],
  },
  editLink: {
    link: "https://github.com/scaffold-eth/docs.scaffoldeth.io/edit/main/src/pages/:path",
  },
  // Replaces the redirects that lived in vercel.json (now native to Vocs v2).
  redirects: [
    { source: "/quick-start", destination: "/quick-start/installation" },
    {
      source: "/recipes",
      destination: "/recipes/GetCurrentBalanceFromAccount",
    },
    { source: "/deploying", destination: "/deploying/deploy-smart-contracts" },
  ],
  sidebar: [
    {
      text: "🏗️ Welcome to Scaffold-ETH 2",
      link: "/",
    },
    {
      text: "🚀 Quick Start",
      items: [
        {
          text: "Installation",
          link: "/quick-start/installation",
        },
        {
          text: "Environment",
          link: "/quick-start/environment",
        },
      ],
    },
    {
      text: "⚙ Components",
      items: [
        {
          text: "Overview",
          link: "/components",
        },
        {
          text: "Address",
          link: "/components/Address",
        },
        {
          text: "AddressInput",
          link: "/components/AddressInput",
        },
        {
          text: "Balance",
          link: "/components/Balance",
        },
        {
          text: "BlockieAvatar",
          link: "/components/BlockieAvatar",
        },
        {
          text: "EtherInput",
          link: "/components/EtherInput",
        },
        {
          text: "BaseInput",
          link: "/components/BaseInput",
        },
        {
          text: "IntegerInput",
          link: "/components/IntegerInput",
        },
        {
          text: "RainbowKitCustomConnectButton",
          link: "/components/RainbowKitCustomConnectButton",
        },
      ],
    },
    {
      text: "🪝 Hooks",
      items: [
        {
          text: "Overview",
          link: "/hooks",
        },
        {
          text: "useScaffoldReadContract",
          link: "/hooks/useScaffoldReadContract",
        },
        {
          text: "useScaffoldWriteContract",
          link: "/hooks/useScaffoldWriteContract",
        },
        {
          text: "useScaffoldWatchContractEvent",
          link: "/hooks/useScaffoldWatchContractEvent",
        },
        {
          text: "useScaffoldEventHistory",
          link: "/hooks/useScaffoldEventHistory",
        },
        {
          text: "useDeployedContractInfo",
          link: "/hooks/useDeployedContractInfo",
        },
        {
          text: "useScaffoldContract",
          link: "/hooks/useScaffoldContract",
        },
        {
          text: "useTransactor",
          link: "/hooks/useTransactor",
        },
      ],
    },
    {
      text: "📡 External Contracts",
      link: "/external-contracts",
    },
    {
      text: "🧪 Recipes",
      items: [
        {
          text: "Get Current Balance From Account",
          link: "/recipes/GetCurrentBalanceFromAccount",
        },
        {
          text: "Write To Contract Write Async Button",
          link: "/recipes/WriteToContractWriteAsyncButton",
        },
        {
          text: "Read Uint From Contract",
          link: "/recipes/ReadUintFromContract",
        },
        {
          text: "Wagmi Contract Write With Feedback",
          link: "/recipes/WagmiContractWriteWithFeedback",
        },
        {
          text: "Add Custom Chain",
          link: "/recipes/add-custom-chain",
        },
      ],
    },
    {
      text: "🛳 Deploying",
      items: [
        {
          text: "Deploy Smart Contracts",
          link: "/deploying/deploy-smart-contracts",
        },
        {
          text: "Deploy Next.js App",
          link: "/deploying/deploy-nextjs-app",
        },
      ],
    },
    {
      text: "✅ Disable Type & Linting Error Checks",
      link: "/disable-type-linting-error-checks",
    },
    {
      text: "🔌 Extensions",
      items: [
        {
          text: "Overview",
          link: "/extensions",
        },
        {
          text: "How to Install",
          link: "/extensions/howToInstall",
        },
        {
          text: "Create Extensions",
          link: "/extensions/createExtensions",
        },
      ],
    },
    {
      text: "🤖 Build with AI",
      items: [
        {
          text: "Overview",
          link: "/build-with-ai",
        },
        {
          text: "AGENTS.md",
          link: "/build-with-ai/agents-md",
        },
        {
          text: "Skills",
          link: "/build-with-ai/skills",
          items: skillSidebarItems,
        },
      ],
    },
    {
      text: "🙏 Contributing",
      items: [
        {
          text: "Overview",
          link: "/contributing",
        },
        {
          text: "Issues",
          link: "/contributing/Issues",
        },
        {
          text: "Pull Requests",
          link: "/contributing/pullRequests",
        },
      ],
    },
  ],
});
