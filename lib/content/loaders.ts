import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

import {
  CaseFrontmatterSchema,
  CaseItemSchema,
  FaqItemSchema,
  FeatureItemSchema,
  GeoItemSchema,
  KnowledgeFrontmatterSchema,
  KnowledgeItemSchema,
  type CaseItem,
  type FaqItem,
  type FeatureItem,
  type GeoItem,
  type KnowledgeItem,
  type ReviewItem,
  type SiteConfig,
  type TypeItem,
  ReviewItemSchema,
  SiteConfigSchema,
  TypeItemSchema
} from "@/lib/content/schemas";

const ROOT_DIR = process.cwd();
const CONTENT_DIR = path.join(ROOT_DIR, "content");

const DEFAULT_SITE: SiteConfig = {
  baseUrl: "https://{{DOMAIN}}",
  brand: {
    name: "{{BRAND_NAME}}",
    tagline: "Бетонные монолитные лестницы в Беларуси",
    founder: "{{FOUNDER_NAME}}"
  },
  contacts: {
    phoneMain: "{{PHONE_MAIN}}",
    email: "{{EMAIL}}",
    address: "{{LEGAL_ADDRESS}}",
    workingHours: "Пн-Сб 09:00-20:00"
  },
  legal: {
    unp: "{{UNP}}",
    legalAddress: "{{LEGAL_ADDRESS}}",
    contractModel: "[TODO: добавить модель договора]"
  },
  messengers: {
    telegram: "#",
    whatsapp: "#",
    viber: "#"
  },
  coverageRegions: "{{COVERAGE_REGIONS}}",
  warrantyTerm: "{{WARRANTY_TERM}}",
  pricing: {
    standardFrom: "{{STANDARD_PRICE_FROM}}",
    midRange: "{{MID_PRICE_RANGE}}",
    signatureFrom: "{{SIGNATURE_PRICE_FROM}}"
  },
  checklist: [],
  processSteps: [],
  disclaimer: "Мы выполняем бетонный конструктив. Облицовку не выполняем.",
  heroStats: []
};

function safeReadFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function listFiles(folderPath: string, ext: string): string[] {
  try {
    return fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(ext))
      .map((file) => path.join(folderPath, file));
  } catch {
    return [];
  }
}

function safeParseJson(raw: string | null, fallback: unknown): unknown {
  if (!raw) return fallback;

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function getSiteConfig(): SiteConfig {
  const filePath = path.join(CONTENT_DIR, "site.json");
  const raw = safeReadFile(filePath);
  const parsed = safeParseJson(raw, DEFAULT_SITE);
  const result = SiteConfigSchema.safeParse(parsed);

  return result.success ? result.data : DEFAULT_SITE;
}

function loadJsonCollection<T>(dirName: string, schema: z.ZodType<T>): T[] {
  const folderPath = path.join(CONTENT_DIR, dirName);
  const filePaths = listFiles(folderPath, ".json");

  return filePaths
    .map((filePath) => {
      const raw = safeReadFile(filePath);
      const parsed = safeParseJson(raw, null);
      const result = schema.safeParse(parsed);
      return result.success ? result.data : null;
    })
    .filter((item): item is T => item !== null);
}

export function getTypes(): TypeItem[] {
  return loadJsonCollection<TypeItem>("types", TypeItemSchema).sort((a, b) => a.title.localeCompare(b.title, "ru"));
}

export function getTypeBySlug(slug: string): TypeItem | null {
  return getTypes().find((item) => item.slug === slug) ?? null;
}

export function getFeatures(): FeatureItem[] {
  return loadJsonCollection<FeatureItem>("features", FeatureItemSchema).sort((a, b) => a.title.localeCompare(b.title, "ru"));
}

export function getFeatureBySlug(slug: string): FeatureItem | null {
  return getFeatures().find((item) => item.slug === slug) ?? null;
}

export function getReviews(): ReviewItem[] {
  const filePath = path.join(CONTENT_DIR, "reviews.json");
  const raw = safeReadFile(filePath);
  const parsed = safeParseJson(raw, []);

  if (!Array.isArray(parsed)) return [];

  return parsed
    .map((item) => {
      const result = ReviewItemSchema.safeParse(item);
      return result.success ? result.data : null;
    })
    .filter((item): item is ReviewItem => item !== null);
}

export function getFaqItems(): FaqItem[] {
  const filePath = path.join(CONTENT_DIR, "faq.json");
  const raw = safeReadFile(filePath);
  const parsed = safeParseJson(raw, []);

  if (!Array.isArray(parsed)) return [];

  return parsed
    .map((item) => {
      const result = FaqItemSchema.safeParse(item);
      return result.success ? result.data : null;
    })
    .filter((item): item is FaqItem => item !== null);
}

function loadMarkdownCollection<T>(
  dirName: string,
  frontmatterSchema: z.ZodType<Omit<T, "content">>
): T[] {
  const folderPath = path.join(CONTENT_DIR, dirName);
  const filePaths = listFiles(folderPath, ".md");

  return filePaths
    .map((filePath) => {
      const raw = safeReadFile(filePath);
      if (!raw) return null;

      const { data, content } = matter(raw);
      const result = frontmatterSchema.safeParse(data);

      if (!result.success) return null;

      return { ...result.data, content } as T;
    })
    .filter((item): item is T => item !== null);
}

export function getCases(): CaseItem[] {
  return loadMarkdownCollection<CaseItem>("cases", CaseFrontmatterSchema)
    .map((item) => {
      const result = CaseItemSchema.safeParse(item);
      return result.success ? result.data : null;
    })
    .filter((item): item is CaseItem => item !== null)
    .sort((a, b) => b.title.localeCompare(a.title, "ru"));
}

export function getCaseBySlug(slug: string): CaseItem | null {
  return getCases().find((item) => item.slug === slug) ?? null;
}

export function getKnowledgeArticles(): KnowledgeItem[] {
  return loadMarkdownCollection<KnowledgeItem>("knowledge", KnowledgeFrontmatterSchema)
    .map((item) => {
      const result = KnowledgeItemSchema.safeParse(item);
      return result.success ? result.data : null;
    })
    .filter((item): item is KnowledgeItem => item !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getKnowledgeBySlug(slug: string): KnowledgeItem | null {
  return getKnowledgeArticles().find((item) => item.slug === slug) ?? null;
}

export function getGeoPages(): GeoItem[] {
  return loadJsonCollection<GeoItem>("geo", GeoItemSchema).sort((a, b) => a.city.localeCompare(b.city, "ru"));
}

export function getGeoBySlug(slug: string): GeoItem | null {
  return getGeoPages().find((item) => item.slug === slug) ?? null;
}

export function getMessengerLinks() {
  const site = getSiteConfig();
  return site.messengers;
}
