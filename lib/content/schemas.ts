import { z } from "zod";

export const FunnelSchema = z.enum(["standard", "signature"]);

export const SiteConfigSchema = z.object({
  baseUrl: z.string().default("https://betostep.by"),
  brand: z.object({
    name: z.string().default("BETOSTEP"),
    tagline: z.string().default("Бетонные монолитные лестницы в Беларуси"),
    founder: z.string().default("Максим Владимирович Соколовский")
  }),
  contacts: z.object({
    phoneMain: z.string().default("+375296512022"),
    email: z.string().default("monolithic.stair@gmail.com"),
    address: z.string().default("Минск, Беларусь"),
    workingHours: z.string().default("Пн-Сб 09:00-20:00")
  }),
  legal: z.object({
    unp: z.string().default("УНП указывается в договоре"),
    legalAddress: z.string().default("Минск, Беларусь"),
    contractModel: z.string().default("Договор подряда ИП с фиксацией этапов, сроков и стоимости.")
  }),
  messengers: z.object({
    telegram: z.string().default("#"),
    whatsapp: z.string().default("#"),
    viber: z.string().default("#")
  }),
  localeLinks: z.object({
    ru: z.string().default("/"),
    en: z.string().default("/en")
  }),
  leadEndpoint: z.string().default("https://web-stairs.vercel.app/api/lead"),
  telegramFallback: z.object({
    username: z.string().default("Sokolmaxxx"),
    url: z.string().default("https://t.me/Sokolmaxxx")
  }),
  telegramFallbackMode: z.enum(["auto_redirect", "button_only"]).default("auto_redirect"),
  coverageRegions: z.string().default("Минск и область, Брест, Гродно, Гомель, Витебск, Могилев и другие города Беларуси"),
  warrantyTerm: z.string().default("5 лет"),
  pricing: z.object({
    standardFrom: z.string().default("от 2 700 BYN"),
    midRange: z.string().default("3 500–5 500 BYN"),
    signatureFrom: z.string().default("от 6 500 BYN")
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
  priceBand: z.string().default("3 500–5 500 BYN"),
  year: z.string().default("2025"),
  tags: z.array(z.string()).default([]),
  summary: z.string().default("Реализованный проект бетонной лестницы с контролем геометрии и подготовкой под отделку.")
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
  transport: z.string().default("Выезд выполняется по согласованному графику с предварительным подтверждением логистики."),
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
