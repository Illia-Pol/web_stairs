import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "out");

if (!fs.existsSync(OUT_DIR)) {
  console.error("[crawl] out/ not found. Run npm run build first.");
  process.exit(1);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

function pathFromHtmlFile(filePath) {
  const rel = filePath.replace(`${OUT_DIR}${path.sep}`, "").split(path.sep).join("/");
  if (!rel.endsWith(".html")) return null;
  if (rel.startsWith("_next/")) return null;
  if (rel === "404.html") return null;

  if (rel === "index.html") return "/";
  if (rel === "404/index.html") return null;
  if (rel.endsWith("/index.html")) {
    const route = rel.slice(0, -"index.html".length);
    const normalized = route.startsWith("/") ? route : `/${route}`;
    if (normalized === "/404/") return null;
    return normalized;
  }

  const route = `/${rel.replace(/\.html$/i, "")}`;
  const normalized = route.endsWith("/") ? route : `${route}/`;
  if (normalized === "/404/") return null;
  return normalized;
}

function normalizeRoutePath(routePath) {
  if (!routePath) return "/";
  if (routePath === "/") return routePath;
  if (/\.[a-z0-9]+$/i.test(routePath)) return routePath;
  return routePath.endsWith("/") ? routePath : `${routePath}/`;
}

function normalizeHref(fromPath, href) {
  if (!href) return null;
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return null;
  }

  try {
    const asUrl = new URL(href, `https://example.com${fromPath}`);
    return normalizeRoutePath(asUrl.pathname);
  } catch {
    return null;
  }
}

const htmlFiles = walk(OUT_DIR).filter((file) => file.endsWith(".html"));
const pages = htmlFiles
  .map((filePath) => ({
    filePath,
    route: pathFromHtmlFile(filePath)
  }))
  .filter((entry) => Boolean(entry.route));

const pageSet = new Set(pages.map((page) => page.route));
const graph = new Map();

for (const page of pages) {
  const html = fs.readFileSync(page.filePath, "utf8");
  const hrefs = [...html.matchAll(/<a\s[^>]*href="([^"]+)"/gi)].map((match) => match[1]);
  const targets = new Set();

  for (const href of hrefs) {
    const normalized = normalizeHref(page.route, href);
    if (!normalized) continue;
    if (!pageSet.has(normalized)) continue;
    targets.add(normalized);
  }

  graph.set(page.route, targets);
}

const inbound = new Map([...pageSet].map((route) => [route, 0]));
for (const [, targets] of graph) {
  for (const target of targets) {
    inbound.set(target, (inbound.get(target) ?? 0) + 1);
  }
}

const seedRoutes = ["/", "/en/"].filter((route) => pageSet.has(route));
const distance = new Map(seedRoutes.map((route) => [route, 0]));
const queue = [...seedRoutes];

while (queue.length) {
  const current = queue.shift();
  const nextDistance = (distance.get(current) ?? 0) + 1;
  for (const target of graph.get(current) ?? []) {
    if (distance.has(target)) continue;
    distance.set(target, nextDistance);
    queue.push(target);
  }
}

const orphanPages = [...pageSet]
  .filter((route) => !seedRoutes.includes(route) && (inbound.get(route) ?? 0) === 0)
  .sort((a, b) => a.localeCompare(b));

const weakPages = [...pageSet]
  .filter((route) => !seedRoutes.includes(route) && (inbound.get(route) ?? 0) <= 1)
  .sort((a, b) => {
    const diff = (inbound.get(a) ?? 0) - (inbound.get(b) ?? 0);
    if (diff !== 0) return diff;
    return a.localeCompare(b);
  });

const deepPages = [...distance.entries()]
  .filter(([, depth]) => depth > 3)
  .sort((a, b) => b[1] - a[1])
  .map(([route, depth]) => ({ route, depth }));

const topLinked = [...inbound.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .map(([route, count]) => ({ route, count }));

const report = {
  generatedAt: new Date().toISOString(),
  totalPages: pageSet.size,
  entryPoints: seedRoutes,
  orphanPages,
  weakPages,
  deepPages,
  topLinked
};

console.log(JSON.stringify(report, null, 2));
