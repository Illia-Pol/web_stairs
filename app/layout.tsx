import type { Metadata } from "next";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/JsonLd";
import { Layout } from "@/components/layout/Layout";
import { getSiteConfig } from "@/lib/content/loaders";
import { withBasePath } from "@/lib/paths";
import { localBusinessJsonLd } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  title: "{{BRAND_NAME}} | Бетонные монолитные лестницы",
  description:
    "Проектирование и изготовление бетонных лестниц в Беларуси: Standard и Signature решения под частные и коммерческие объекты.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "{{BRAND_NAME}} | Бетонные монолитные лестницы",
    description:
      "Отправьте план/фото и получите ориентир стоимости по проекту. Монолитные, парящие и консольные лестницы.",
    images: [withBasePath("/assets/slider/slider-1.jpeg")],
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const site = getSiteConfig();
  const localBusinessSchema = localBusinessJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    phone: site.contacts.phoneMain,
    email: site.contacts.email,
    address: site.contacts.address,
    coverageRegions: site.coverageRegions,
    messengers: site.messengers
  });

  return (
    <html lang="ru">
      <body className="font-body text-coal">
        <JsonLd data={localBusinessSchema} />
        <Layout site={site}>{children}</Layout>
      </body>
    </html>
  );
}
