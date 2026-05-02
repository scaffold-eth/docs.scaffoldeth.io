import fs from "node:fs";
import path from "node:path";

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

function collectRoutes(dir: string, basePath = ""): string[] {
  const routes: string[] = [];

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
    routes.push(route);
  }

  return routes;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toXml(routes: string[], baseUrl: string): string {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = [...routes]
    .sort()
    .map((route) => {
      const loc = escapeXml(route === "/" ? baseUrl : `${baseUrl}${route}`);
      const priority = route === "/" ? "1.0" : "0.8";
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
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
