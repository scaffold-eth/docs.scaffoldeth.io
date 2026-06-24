import fs from "node:fs";
import { fetchSkills } from "./fetch-skills";
import { generateAgentSkillsIndex } from "./gen-agent-skills-index";

// Runs before `vocs dev` / `vocs build` (see package.json). Fetches the SE-2
// skill pages and builds the agent-skills discovery index, then writes a
// manifest that vocs.config.ts reads synchronously to build the Skills sidebar.
// Vocs v2 generates sitemap.xml / robots.txt / llms.txt natively, so the old
// gen-sitemap step is gone.
const skills = await fetchSkills();
generateAgentSkillsIndex();

const manifest = skills.map((s) => ({ name: s.name, title: s.title }));
fs.writeFileSync(
  "src/skills.generated.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(`✅ Wrote skills manifest (${manifest.length} skills)`);
