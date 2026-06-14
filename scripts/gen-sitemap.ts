import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const PAGES_DIR = "docs/pages";
const OUTPUT = "docs/public/sitemap.xml";

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

type Route = {
  path: string;
  sourceFile: string;
};

let gitLastmodCache: Map<string, string> | null = null;

function collectRoutes(dir: string, basePath = ""): Route[] {
  const routes: Route[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const { name } = entry;
    if (name.startsWith("_") || name.startsWith(".")) continue;

    const full = path.join(dir, name);

    if (entry.isDirectory()) {
      routes.push(...collectRoutes(full, `${basePath}/${name}`));
      continue;
    }

    if (!/\.(md|mdx)$/.test(name)) continue;

    const bare = name.replace(/\.(md|mdx)$/, "");
    const route = bare === "index" ? basePath || "/" : `${basePath}/${bare}`;
    routes.push({ path: route, sourceFile: full });
  }

  return routes;
}

function getGitLastmods(): Map<string, string> {
  if (gitLastmodCache) return gitLastmodCache;

  gitLastmodCache = new Map();

  try {
    const output = execFileSync("git", ["log", "--format=@@%cI", "--name-only", "--", PAGES_DIR], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });

    let currentDate = "";

    for (const line of output.split(/\r?\n/)) {
      if (line.startsWith("@@")) {
        currentDate = line.slice(2, 12);
        continue;
      }

      if (!currentDate || !line.startsWith(`${PAGES_DIR}/`)) continue;
      if (!gitLastmodCache.has(line)) {
        gitLastmodCache.set(line, currentDate);
      }
    }
  } catch {
    // Vercel builds normally include Git metadata; local archives may not.
  }

  return gitLastmodCache;
}

function getLastmod(sourceFile: string): string {
  const gitDate = getGitLastmods().get(sourceFile);
  if (gitDate) return gitDate;

  return fs.statSync(sourceFile).mtime.toISOString().slice(0, 10);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toXml(routes: Route[], baseUrl: string): string {
  const urls = [...routes]
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((route) => {
      const loc = escapeXml(route.path === "/" ? baseUrl : `${baseUrl}${route.path}`);
      const priority = route.path === "/" ? "1.0" : "0.8";
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${getLastmod(route.sourceFile)}</lastmod>`,
        `    <changefreq>weekly</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

let generated = false;

export function generateSitemap(): void {
  if (generated) return;
  generated = true;

  if (!fs.existsSync(PAGES_DIR)) {
    console.warn(`⚠️  ${PAGES_DIR} not found — skipping sitemap generation`);
    return;
  }

  const baseUrl = resolveBaseUrl();
  const routes = collectRoutes(PAGES_DIR);
  const xml = toXml(routes, baseUrl);

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, xml);

  console.log(`✅ Generated sitemap.xml with ${routes.length} URLs (base: ${baseUrl})`);
}
