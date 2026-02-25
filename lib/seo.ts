import type { Metadata } from "next";

import type { FaqItem } from "@/lib/content/schemas";

const FALLBACK_BASE_URL = "https://example.com";

function normalizeBaseUrl(baseUrl: string): string {
  if (!baseUrl || baseUrl.includes("{{")) {
    return FALLBACK_BASE_URL;
  }

  if (baseUrl.startsWith("http://") || baseUrl.startsWith("https://")) {
    return baseUrl;
  }

  return FALLBACK_BASE_URL;
}

export function absoluteUrl(baseUrl: string, pathname: string): string {
  return new URL(pathname, normalizeBaseUrl(baseUrl)).toString();
}

export function createPageMetadata({
  baseUrl,
  pathname,
  title,
  description,
  image = "/assets/slider/slider-1.jpeg"
}: {
  baseUrl: string;
  pathname: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const canonical = absoluteUrl(baseUrl, pathname);
  const ogImage = absoluteUrl(baseUrl, image);

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [{ url: ogImage }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    }
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
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
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
    sameAs: [params.messengers.telegram, params.messengers.whatsapp, params.messengers.viber]
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
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.serviceType,
    name: params.name,
    description: params.description,
    areaServed: params.areaServed,
    provider: {
      "@type": "ProfessionalService",
      name: params.name,
      url: normalizeBaseUrl(params.baseUrl)
    },
    offers: params.offers
      ? {
          "@type": "Offer",
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    image: absoluteUrl(params.baseUrl, params.image),
    datePublished: params.publishedAt,
    author: {
      "@type": "Person",
      name: params.authorName
    },
    mainEntityOfPage: absoluteUrl(params.baseUrl, `/knowledge/${params.slug}`)
  };
}
