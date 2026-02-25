import type { MetadataRoute } from "next";

import {
  getCases,
  getFeatures,
  getGeoPages,
  getKnowledgeArticles,
  getSiteConfig,
  getTypes
} from "@/lib/content/loaders";

function safeBaseUrl(raw: string): string {
  if (!raw || raw.includes("{{")) return "https://example.com";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://${raw}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteConfig();
  const baseUrl = safeBaseUrl(site.baseUrl);

  const staticRoutes = [
    "",
    "/standard",
    "/signature",
    "/types",
    "/features",
    "/portfolio",
    "/prices",
    "/process",
    "/guarantee",
    "/after-finishing",
    "/faq",
    "/about",
    "/contacts",
    "/privacy",
    "/knowledge"
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));

  getTypes().forEach((item) => {
    entries.push({
      url: `${baseUrl}/types/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7
    });
  });

  getFeatures().forEach((item) => {
    entries.push({
      url: `${baseUrl}/features/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    });
  });

  getCases().forEach((item) => {
    entries.push({
      url: `${baseUrl}/portfolio/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75
    });
  });

  getKnowledgeArticles().forEach((item) => {
    entries.push({
      url: `${baseUrl}/knowledge/${item.slug}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "monthly",
      priority: 0.65
    });
  });

  getGeoPages().forEach((item) => {
    entries.push({
      url: `${baseUrl}/geo/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6
    });
  });

  return entries;
}
