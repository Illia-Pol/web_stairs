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
const generatedAt = new Date().toISOString();

const pagesRoutes = [
  "/",
  "/en",
  "/contacts",
  "/privacy",
  "/prices",
  "/prices/calculator",
  "/prices/tariffs",
  "/prices/tariffs/classic",
  "/prices/tariffs/signature",
  "/prices/guarantee",
  "/questions",
  "/questions/faq",
  "/questions/problems",
];

const typeRoutes = listSlugsByExt("types", ".json").map((slug) => `/portfolio/types/${slug}`);
const featureRoutes = listSlugsByExt("features", ".json").map((slug) => `/questions/problems/${slug}`);
const geoRoutes = listSlugsByExt("geo", ".json").map((slug) => `/geo/${slug}`);
const knowledgeRoutes = listSlugsByExt("knowledge", ".md").map((slug) => `/vlog/articles/${slug}`);

const portfolioRoutes = [
  "/portfolio",
  "/en/portfolio",
  "/portfolio/types",
  "/en/portfolio/types",
  "/portfolio/master",
  "/en/portfolio/master",
  ...typeRoutes
];

const blogRoutes = [
  "/vlog",
  "/vlog/articles",
  "/vlog/process",
  ...knowledgeRoutes
];

const casesRoutes = [
  "/portfolio/projects",
  "/en/portfolio/projects",
  "/vlog/projects"
];

const seoPagesRoutes = [...pagesRoutes, ...featureRoutes, ...geoRoutes];

const rawSitemapGroups = [
  { file: "sitemap-pages.xml", routes: seoPagesRoutes },
  { file: "sitemap-portfolio.xml", routes: portfolioRoutes },
  { file: "sitemap-blog.xml", routes: blogRoutes },
  { file: "sitemap-cases.xml", routes: casesRoutes }
];
const usedRoutes = new Set();
const sitemapGroups = rawSitemapGroups.map((group) => ({
  ...group,
  routes: group.routes.filter((route) => {
    if (usedRoutes.has(route)) return false;
    usedRoutes.add(route);
    return true;
  })
}));

function buildUrlSetXml(routes) {
  const uniqueRoutes = [...new Set(routes)];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniqueRoutes
    .map((route) => {
      const fullPath = joinPath(basePath, route);
      return `  <url>\n    <loc>${baseUrl}${fullPath}</loc>\n    <lastmod>${generatedAt}</lastmod>\n  </url>`;
    })
    .join("\n")}\n</urlset>\n`;
}

const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapGroups
  .map((route) => {
    const fullPath = joinPath(basePath, `/${route.file}`);
    return `  <sitemap>\n    <loc>${baseUrl}${fullPath}</loc>\n    <lastmod>${generatedAt}</lastmod>\n  </sitemap>`;
  })
  .join("\n")}\n</sitemapindex>\n`;

const robotsTxt = `User-agent: *\nAllow: /\nHost: ${baseUrl}\nSitemap: ${baseUrl}${joinPath(basePath, "/sitemap.xml")}\n`;

function writeSeoFiles(targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  for (const group of sitemapGroups) {
    fs.writeFileSync(path.join(targetDir, group.file), buildUrlSetXml(group.routes), "utf8");
  }
  fs.writeFileSync(path.join(targetDir, "sitemap.xml"), sitemapIndexXml, "utf8");
  fs.writeFileSync(path.join(targetDir, "robots.txt"), robotsTxt, "utf8");
}

writeSeoFiles(PUBLIC_DIR);
if (fs.existsSync(OUT_DIR)) {
  writeSeoFiles(OUT_DIR);
}

console.log(`[seo] Generated sitemap.xml and robots.txt (basePath: ${basePath || "/"})`);
