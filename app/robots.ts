import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/lib/content/loaders";

function safeBaseUrl(raw: string): string {
  if (!raw || raw.includes("{{")) return "https://example.com";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://${raw}`;
}

export default function robots(): MetadataRoute.Robots {
  const site = getSiteConfig();
  const baseUrl = safeBaseUrl(site.baseUrl);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}
