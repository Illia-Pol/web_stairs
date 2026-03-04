import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, "public", "assets");
const TARGET_DIRS = ["slider", "portfolio", "catalog-gallery", "catalog", "calculator"];
const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const OUTPUT_FORMATS = ["webp", "avif"];

function commandExists(command) {
  const result = spawnSync("which", [command], { stdio: "ignore" });
  return result.status === 0;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

function shouldConvert(sourceFile) {
  const ext = path.extname(sourceFile).toLowerCase();
  if (!SOURCE_EXTENSIONS.has(ext)) return false;

  const normalized = sourceFile.toLowerCase();
  if (normalized.endsWith(".webp") || normalized.endsWith(".avif")) return false;
  return true;
}

function isUpToDate(sourceFile, outputFile) {
  if (!fs.existsSync(outputFile)) return false;
  const sourceStat = fs.statSync(sourceFile);
  const outputStat = fs.statSync(outputFile);
  return outputStat.mtimeMs >= sourceStat.mtimeMs;
}

function convertWithSips(sourceFile, outputFormat) {
  const outputFile = sourceFile.replace(/\.[^.]+$/, `.${outputFormat}`);
  if (isUpToDate(sourceFile, outputFile)) return { status: "skipped", outputFile };

  const result = spawnSync("sips", ["-s", "format", outputFormat, sourceFile, "--out", outputFile], {
    stdio: "pipe"
  });

  if (result.status !== 0) {
    return {
      status: "failed",
      outputFile,
      error: result.stderr.toString("utf8").trim() || result.stdout.toString("utf8").trim()
    };
  }

  return { status: "created", outputFile };
}

if (!commandExists("sips")) {
  console.warn("[images] sips is not available. Skipping image variant generation.");
  process.exit(0);
}

let created = 0;
let skipped = 0;
let failed = 0;
const errors = [];

for (const target of TARGET_DIRS) {
  const targetDir = path.join(ASSETS_DIR, target);
  if (!fs.existsSync(targetDir)) continue;

  for (const sourceFile of walk(targetDir)) {
    if (!shouldConvert(sourceFile)) continue;

    for (const format of OUTPUT_FORMATS) {
      const result = convertWithSips(sourceFile, format);
      if (result.status === "created") created += 1;
      if (result.status === "skipped") skipped += 1;
      if (result.status === "failed") {
        failed += 1;
        errors.push({ sourceFile, format, error: result.error });
      }
    }
  }
}

console.log(`[images] done: created=${created}, skipped=${skipped}, failed=${failed}`);
if (errors.length) {
  for (const item of errors.slice(0, 10)) {
    console.warn(`[images] ${item.format} failed for ${item.sourceFile}: ${item.error}`);
  }
  if (errors.length > 10) {
    console.warn(`[images] ... and ${errors.length - 10} more conversion errors`);
  }
}
