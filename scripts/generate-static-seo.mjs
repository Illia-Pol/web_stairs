import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(ROOT, "out");

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function listSlugsByExt(folder, ext) {
  const fullFolder = path.join(CONTENT_DIR, folder);
  try {
    return fs
      .readdirSync(fullFolder)
      .filter((file) => file.endsWith(ext))
      .map((file) => file.replace(new RegExp(`${ext}$`), ""));
  } catch {
    return [];
  }
}

function normalizeBaseUrl(raw) {
  if (!raw || raw.includes("{{")) return "https://example.com";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw.replace(/\/$/, "");
  return `https://${raw.replace(/\/$/, "")}`;
}

function normalizeBasePath(raw) {
  if (!raw || raw === "/") return "";
  return `/${raw.replace(/^\/+|\/+$/g, "")}`;
}

function joinPath(basePath, route) {
  const normalizedRoute = `/${route.replace(/^\/+|\/+$/g, "")}`;
  const isFile = /\.[a-z0-9]+$/i.test(normalizedRoute);
  const cleanRoute =
    route === "/"
      ? "/"
      : isFile
        ? normalizedRoute
        : `${normalizedRoute}/`;

  if (!basePath) return cleanRoute;
  if (cleanRoute === "/") return `${basePath}/`;
  return `${basePath}${cleanRoute}`;
}

const site = readJson(path.join(CONTENT_DIR, "site.json"), { baseUrl: "https://example.com" });
const baseUrl = normalizeBaseUrl(site.baseUrl);
const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? "");

const staticRoutes = [
  "/",
  "/en",
  "/portfolio",
  "/en/portfolio",
  "/portfolio/types",
  "/en/portfolio/types",
  "/portfolio/projects",
  "/en/portfolio/projects",
  "/portfolio/master",
  "/en/portfolio/master",
  "/prices",
  "/prices/calculator",
  "/prices/tariffs",
  "/prices/tariffs/classic",
  "/prices/tariffs/signature",
  "/prices/guarantee",
  "/questions",
  "/questions/faq",
  "/questions/problems",
  "/vlog",
  "/vlog/projects",
  "/vlog/articles",
  "/vlog/process",
  "/contacts",
  "/privacy"
];

const typeRoutes = listSlugsByExt("types", ".json").map((slug) => `/portfolio/types/${slug}`);
const featureRoutes = listSlugsByExt("features", ".json").map((slug) => `/questions/problems/${slug}`);
const geoRoutes = listSlugsByExt("geo", ".json").map((slug) => `/geo/${slug}`);
const knowledgeRoutes = listSlugsByExt("knowledge", ".md").map((slug) => `/vlog/articles/${slug}`);

const allRoutes = [
  ...new Set([
    ...staticRoutes,
    ...typeRoutes,
    ...featureRoutes,
    ...geoRoutes,
    ...knowledgeRoutes
  ])
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allRoutes
  .map((route) => {
    const fullPath = joinPath(basePath, route);
    return `  <url>\n    <loc>${baseUrl}${fullPath}</loc>\n  </url>`;
  })
  .join("\n")}\n</urlset>\n`;

const robotsTxt = `User-agent: *\nAllow: /\nHost: ${baseUrl}\nSitemap: ${baseUrl}${joinPath(basePath, "/sitemap.xml")}\n`;

function writeSeoFiles(targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "sitemap.xml"), sitemapXml, "utf8");
  fs.writeFileSync(path.join(targetDir, "robots.txt"), robotsTxt, "utf8");
}

writeSeoFiles(PUBLIC_DIR);
if (fs.existsSync(OUT_DIR)) {
  writeSeoFiles(OUT_DIR);
}

console.log(`[seo] Generated sitemap.xml and robots.txt (basePath: ${basePath || "/"})`);
