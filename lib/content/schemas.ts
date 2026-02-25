import { z } from "zod";

export const FunnelSchema = z.enum(["standard", "signature"]);

export const SiteConfigSchema = z.object({
  baseUrl: z.string().default("https://{{DOMAIN}}"),
  brand: z.object({
    name: z.string().default("{{BRAND_NAME}}"),
    tagline: z.string().default("Бетонные монолитные лестницы в Беларуси"),
    founder: z.string().default("{{FOUNDER_NAME}}")
  }),
  contacts: z.object({
    phoneMain: z.string().default("{{PHONE_MAIN}}"),
    email: z.string().default("{{EMAIL}}"),
    address: z.string().default("{{LEGAL_ADDRESS}}"),
    workingHours: z.string().default("Пн-Сб 09:00-20:00")
  }),
  legal: z.object({
    unp: z.string().default("{{UNP}}"),
    legalAddress: z.string().default("{{LEGAL_ADDRESS}}"),
    contractModel: z.string().default("[TODO: добавить модель договора]")
  }),
  messengers: z.object({
    telegram: z.string().default("#"),
    whatsapp: z.string().default("#"),
    viber: z.string().default("#")
  }),
  coverageRegions: z.string().default("{{COVERAGE_REGIONS}}"),
  warrantyTerm: z.string().default("{{WARRANTY_TERM}}"),
  pricing: z.object({
    standardFrom: z.string().default("{{STANDARD_PRICE_FROM}}"),
    midRange: z.string().default("{{MID_PRICE_RANGE}}"),
    signatureFrom: z.string().default("{{SIGNATURE_PRICE_FROM}}")
  }),
  checklist: z.array(z.string()).default([]),
  processSteps: z.array(z.string()).default([]),
  disclaimer: z.string().default("Облицовку не выполняем."),
  heroStats: z
    .array(
      z.object({
        label: z.string(),
        value: z.string()
      })
    )
    .default([])
});

export const TypeItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  funnel: FunnelSchema,
  priceHint: z.string(),
  heroImage: z.string().default("/assets/portfolio/portfolio-1.jpg"),
  filters: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([])
});

export const FeatureItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  problem: z.string(),
  solution: z.string(),
  benefits: z.array(z.string()).default([]),
  relatedTypes: z.array(z.string()).default([])
});

export const ReviewItemSchema = z.object({
  name: z.string(),
  city: z.string(),
  project: z.string(),
  text: z.string(),
  rating: z.number().min(1).max(5).default(5)
});

export const FaqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string()
});

export const CaseFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  city: z.string(),
  funnel: FunnelSchema,
  type: z.string(),
  coverImage: z.string().default("/assets/portfolio/portfolio-1.jpg"),
  gallery: z.array(z.string()).default([]),
  priceBand: z.string().default("{{MID_PRICE_RANGE}}"),
  year: z.string().default("{{CASE_YEAR}}"),
  tags: z.array(z.string()).default([]),
  summary: z.string().default("[TODO: добавить описание кейса]")
});

export const CaseItemSchema = CaseFrontmatterSchema.extend({
  content: z.string().default("")
});

export const KnowledgeFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  publishedAt: z.string(),
  coverImage: z.string().default("/assets/slider/slider-1.jpeg"),
  tags: z.array(z.string()).default([])
});

export const KnowledgeItemSchema = KnowledgeFrontmatterSchema.extend({
  content: z.string().default("")
});

export const GeoItemSchema = z.object({
  slug: z.string(),
  city: z.string(),
  title: z.string(),
  description: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string(),
  transport: z.string().default("[TODO: добавить логистику]"),
  proof: z.array(z.string()).default([])
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type TypeItem = z.infer<typeof TypeItemSchema>;
export type FeatureItem = z.infer<typeof FeatureItemSchema>;
export type ReviewItem = z.infer<typeof ReviewItemSchema>;
export type FaqItem = z.infer<typeof FaqItemSchema>;
export type CaseItem = z.infer<typeof CaseItemSchema>;
export type KnowledgeItem = z.infer<typeof KnowledgeItemSchema>;
export type GeoItem = z.infer<typeof GeoItemSchema>;
