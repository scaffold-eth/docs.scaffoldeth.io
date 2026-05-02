import { defineConfig } from "vocs";
import { fetchSkills } from "./scripts/fetch-skills";
import { generateAgentSkillsIndex } from "./scripts/gen-agent-skills-index";
import { generateSitemap } from "./scripts/gen-sitemap";

const skills = await fetchSkills();
generateSitemap();
generateAgentSkillsIndex();

const skillSidebarItems = skills.map((s) => ({
  text: s.title,
  link: `/build-with-ai/${s.name}`,
}));

const baseUrl = process.env.VERCEL_ENV === "production"
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : `https://${process.env.VERCEL_URL}`;

export default defineConfig({
  title: "🏗 Scaffold-ETH 2 | Docs",
  description: "Open-source toolkit for building dapps",
  logoUrl: "/img/logo.svg",
  iconUrl: "/img/favicon.png",
  baseUrl,
  ogImageUrl: {
    "/": "https://vocs.dev/api/og?logo=%logo&title=%title&description=%description",
  },
  vite: {
    publicDir: "docs/public",
  },
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
  editLink: {
    pattern:
      "https://github.com/scaffold-eth//se-2-docs/edit/main/docs/pages/:path",
    text: "Suggest changes to this page",
  },
});
