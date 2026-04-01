import type { Metadata } from "next";

import type { FaqItem } from "@/lib/content/schemas";
import { withBasePath } from "@/lib/paths";

const FALLBACK_BASE_URL = "https://example.com";
const BILINGUAL_PATHS = new Set([
  "/",
  "/portfolio",
  "/portfolio/types",
  "/portfolio/projects",
  "/portfolio/master"
]);

function normalizeBaseUrl(baseUrl: string): string {
  if (!baseUrl || baseUrl.includes("{{")) {
    return FALLBACK_BASE_URL;
  }

  const trimmed = baseUrl.trim().replace(/\/+$/g, "");
  if (!trimmed) return FALLBACK_BASE_URL;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return FALLBACK_BASE_URL;
}

function isWebUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function normalizePathname(pathname: string): string {
  if (!pathname) return withBasePath("/");

  if (isWebUrl(pathname)) {
    return pathname;
  }

  const withPrefix = withBasePath(pathname);
  if (withPrefix === "/") return withPrefix;

  const [beforeHash, hash = ""] = withPrefix.split("#");
  const [beforeQuery, query = ""] = beforeHash.split("?");
  const isFile = /\.[a-z0-9]+$/i.test(beforeQuery);
  const normalizedPath = isFile || beforeQuery.endsWith("/") ? beforeQuery : `${beforeQuery}/`;
  const querySuffix = query ? `?${query}` : "";
  const hashSuffix = hash ? `#${hash}` : "";
  return `${normalizedPath}${querySuffix}${hashSuffix}`;
}

function cleanPath(pathname: string): string {
  if (!pathname) return "/";
  const [beforeHash] = pathname.split("#");
  const [beforeQuery] = beforeHash.split("?");
  if (!beforeQuery || beforeQuery === "/") return "/";
  return beforeQuery.replace(/\/+$/g, "") || "/";
}

function toEnPath(ruPath: string): string {
  if (ruPath === "/") return "/en";
  return `/en${ruPath}`;
}

function toRuPath(enPath: string): string {
  if (enPath === "/en") return "/";
  return enPath.replace(/^\/en/, "") || "/";
}

function buildHreflangAlternates(baseUrl: string, pathname: string): Record<string, string> | undefined {
  const clean = cleanPath(pathname);
  const isEn = clean === "/en" || clean.startsWith("/en/");
  const ruCandidate = isEn ? toRuPath(clean) : clean;
  const enCandidate = isEn ? clean : toEnPath(clean);

  if (!BILINGUAL_PATHS.has(ruCandidate)) return undefined;

  const ruUrl = absoluteUrl(baseUrl, ruCandidate);
  const enUrl = absoluteUrl(baseUrl, enCandidate);

  return {
    ru: ruUrl,
    en: enUrl,
    "x-default": ruUrl
  };
}

function organizationNodeId(baseUrl: string): string {
  return `${normalizeBaseUrl(baseUrl)}#organization`;
}

function websiteNodeId(baseUrl: string): string {
  return `${normalizeBaseUrl(baseUrl)}#website`;
}

function trimToLength(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;

  const slice = value.slice(0, maxLength + 1);
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace > Math.floor(maxLength * 0.6)) {
    return slice.slice(0, lastSpace).trim();
  }

  return value.slice(0, maxLength).trim();
}

function normalizeMetaTitle(value: string, isEnglish: boolean): string {
  const base = value.trim();
  const suffix = isEnglish ? " | Custom concrete staircases" : " | Бетонные лестницы под заказ";
  const lower = base.toLowerCase();
  const hasBrandOrTopic =
    lower.includes("betostep") ||
    lower.includes("бетон") ||
    lower.includes("concrete") ||
    lower.includes("stair");
  const shouldAppend = base.length < 42 && !hasBrandOrTopic && !base.includes(suffix);
  const enriched = shouldAppend ? `${base}${suffix}` : base;
  return trimToLength(enriched, 60);
}

function normalizeMetaDescription(value: string, isEnglish: boolean): string {
  const base = value.trim();
  const suffix = isEnglish
    ? " Send your opening plan or photos and get an estimate with timeline."
    : " Отправьте план или фото проема и получите ориентир стоимости и сроков.";
  const enriched = base.length < 120 ? `${base}${suffix}` : base;
  return trimToLength(enriched, 160);
}

function extractSchemaPrice(value?: string): string | undefined {
  if (!value) return undefined;

  const normalized = value.replace(/\s+/g, " ").trim();
  const match = normalized.match(/(\d[\d\s.,]*)/);
  if (!match) return undefined;

  const numeric = match[1].replace(/[^\d.,]/g, "").replace(",", ".");
  const parsed = Number.parseFloat(numeric);
  if (!Number.isFinite(parsed) || parsed <= 0) return undefined;

  return String(parsed);
}

export function absoluteUrl(baseUrl: string, pathname: string): string {
  if (isWebUrl(pathname)) return pathname;
  return new URL(normalizePathname(pathname), normalizeBaseUrl(baseUrl)).toString();
}

export function createPageMetadata({
  baseUrl,
  pathname,
  title,
  description,
  image = "/assets/slider/slider-1.jpeg",
  type = "website"
}: {
  baseUrl: string;
  pathname: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const isEnglish = pathname.startsWith("/en");
  const normalizedTitle = normalizeMetaTitle(title, isEnglish);
  const normalizedDescription = normalizeMetaDescription(description, isEnglish);
  const canonical = absoluteUrl(baseUrl, pathname);
  const ogImage = absoluteUrl(baseUrl, image);
  const ogLocale = isEnglish ? "en_US" : "ru_BY";
  const languageAlternates = buildHreflangAlternates(baseUrl, pathname);

  return {
    title: normalizedTitle,
    description: normalizedDescription,
    alternates: {
      canonical,
      languages: languageAlternates
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: normalizedTitle,
      description: normalizedDescription,
      url: canonical,
      type,
      locale: ogLocale,
      images: [{ url: ogImage }]
    },
    twitter: {
      card: "summary_large_image",
      title: normalizedTitle,
      description: normalizedDescription,
      images: [ogImage]
    }
  };
}

export function websiteJsonLd(params: {
  name: string;
  baseUrl: string;
}) {
  const url = normalizeBaseUrl(params.baseUrl);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteNodeId(params.baseUrl),
    name: params.name,
    url,
    publisher: {
      "@id": organizationNodeId(params.baseUrl)
    },
    inLanguage: ["ru", "en"]
  };
}

export function organizationJsonLd(params: {
  name: string;
  baseUrl: string;
  logo?: string;
  phone: string;
  email: string;
  address: string;
  messengers: {
    telegram: string;
    whatsapp: string;
    viber: string;
  };
}) {
  const sameAs = [params.messengers.telegram, params.messengers.whatsapp, params.messengers.viber].filter(isWebUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationNodeId(params.baseUrl),
    name: params.name,
    url: normalizeBaseUrl(params.baseUrl),
    logo: params.logo ? absoluteUrl(params.baseUrl, params.logo) : undefined,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: params.phone,
      email: params.email,
      contactType: "customer service",
      areaServed: "BY"
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: params.address,
      addressCountry: "BY"
    },
    sameAs
  };
}

export function localBusinessJsonLd(params: {
  name: string;
  baseUrl: string;
  phone: string;
  email: string;
  address: string;
  coverageRegions: string;
  messengers: {
    telegram: string;
    whatsapp: string;
    viber: string;
  };
}) {
  const sameAs = [params.messengers.telegram, params.messengers.whatsapp, params.messengers.viber].filter(isWebUrl);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${normalizeBaseUrl(params.baseUrl)}#local-business`,
    name: params.name,
    url: normalizeBaseUrl(params.baseUrl),
    telephone: params.phone,
    email: params.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: params.address,
      addressCountry: "BY"
    },
    areaServed: params.coverageRegions,
    sameAs,
    parentOrganization: {
      "@id": organizationNodeId(params.baseUrl)
    }
  };
}

export function faqJsonLd(faqItems: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function breadcrumbsJsonLd(baseUrl: string, items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(baseUrl, item.href)
    }))
  };
}

export function serviceJsonLd(params: {
  name: string;
  baseUrl: string;
  description: string;
  serviceType: string;
  areaServed: string;
  offers?: string;
}) {
  const parsedPrice = extractSchemaPrice(params.offers);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.serviceType,
    name: params.name,
    description: params.description,
    areaServed: params.areaServed,
    provider: {
      "@id": `${normalizeBaseUrl(params.baseUrl)}#local-business`
    },
    offers: params.offers && parsedPrice
      ? {
          "@type": "Offer",
          price: parsedPrice,
          priceCurrency: "BYN",
          description: params.offers
        }
      : undefined
  };
}

export function articleJsonLd(params: {
  baseUrl: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  authorName: string;
  publisherName: string;
  publisherLogo?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.title,
    description: params.description,
    image: absoluteUrl(params.baseUrl, params.image),
    datePublished: params.publishedAt,
    dateModified: params.publishedAt,
    url: absoluteUrl(params.baseUrl, `/vlog/articles/${params.slug}`),
    author: {
      "@type": "Person",
      name: params.authorName
    },
    publisher: {
      "@type": "Organization",
      "@id": organizationNodeId(params.baseUrl),
      name: params.publisherName,
      logo: params.publisherLogo
        ? {
            "@type": "ImageObject",
            url: absoluteUrl(params.baseUrl, params.publisherLogo)
          }
        : undefined
    },
    mainEntityOfPage: absoluteUrl(params.baseUrl, `/vlog/articles/${params.slug}`)
  };
}
