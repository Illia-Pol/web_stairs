import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const SEARCH_DIRS = ["app", "components", "lib"];
const CONTENT_DIR = path.join(ROOT, "content");
const RU_PATH = path.join(ROOT, "content", "i18n", "ru.json");
const EN_PATH = path.join(ROOT, "content", "i18n", "en.json");
const NON_TRANSLATABLE_CONTENT_KEYS = new Set([
  "slug",
  "id",
  "coverImage",
  "heroImage",
  "gallery",
  "tags",
  "filters",
  "funnel",
  "publishedAt",
  "year"
]);

function listFiles(dir, matcher) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full, matcher);
    if (entry.isFile() && matcher.test(entry.name)) return [full];
    return [];
  });
}

function collectKeysFromCode(code) {
  const keys = new Set();
  const patterns = [
    /t\(\s*"((?:\\.|[^"\\])*)"/g,
    /t\(\s*'((?:\\.|[^'\\])*)'/g
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(code))) {
      const raw = match[1]
        .replaceAll('\\"', '"')
        .replaceAll("\\'", "'")
        .replaceAll("\\n", "\n");
      if (raw.trim()) keys.add(raw);
    }
  }

  return keys;
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return {};
  }
}

function collectStringsFromUnknown(value, outSet) {
  const shouldSkipValue =
    typeof value === "string" &&
    (value.startsWith("/assets/") ||
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("viber://") ||
      /^[a-z0-9-]+$/i.test(value));

  if (shouldSkipValue) return;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed) outSet.add(trimmed);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectStringsFromUnknown(item, outSet));
    return;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => {
      if (NON_TRANSLATABLE_CONTENT_KEYS.has(key)) return;
      collectStringsFromUnknown(item, outSet);
    });
  }
}

function collectKeysFromContent(contentDir, outSet) {
  const files = listFiles(contentDir, /\.(json|md)$/);

  for (const filePath of files) {
    if (filePath.includes(`${path.sep}content${path.sep}i18n${path.sep}`)) continue;

    if (filePath.endsWith(".json")) {
      const parsed = readJson(filePath);
      collectStringsFromUnknown(parsed, outSet);
      continue;
    }

    if (filePath.endsWith(".md")) {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);
      collectStringsFromUnknown(data, outSet);
    }
  }
}

const files = SEARCH_DIRS.flatMap((dir) => listFiles(path.join(ROOT, dir), /\.(ts|tsx)$/));
const allKeys = new Set();

for (const filePath of files) {
  const code = fs.readFileSync(filePath, "utf8");
  const keys = collectKeysFromCode(code);
  for (const key of keys) allKeys.add(key);
}

collectKeysFromContent(CONTENT_DIR, allKeys);

const sortedKeys = [...allKeys].sort((a, b) => a.localeCompare(b, "ru"));
const currentRu = readJson(RU_PATH);
const currentEn = readJson(EN_PATH);

const ruDict = Object.fromEntries(
  sortedKeys.map((key) => [key, typeof currentRu[key] === "string" ? currentRu[key] : key])
);
const enDict = Object.fromEntries(
  sortedKeys.map((key) => [key, typeof currentEn[key] === "string" ? currentEn[key] : key])
);

fs.mkdirSync(path.dirname(RU_PATH), { recursive: true });
fs.writeFileSync(RU_PATH, `${JSON.stringify(ruDict, null, 2)}\n`, "utf8");
fs.writeFileSync(EN_PATH, `${JSON.stringify(enDict, null, 2)}\n`, "utf8");

console.log(`Extracted ${sortedKeys.length} i18n keys.`);
