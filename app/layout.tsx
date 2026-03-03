import type { Metadata } from "next";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/JsonLd";
import { Layout } from "@/components/layout/Layout";
import { getSiteConfig } from "@/lib/content/loaders";
import { getLocale, t } from "@/lib/i18n";
import { withBasePath } from "@/lib/paths";
import { localBusinessJsonLd } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  title: `{{BRAND_NAME}} | ${t("Бетонные монолитные лестницы")}`,
  description: t(
    "Проектирование и изготовление бетонных лестниц в Беларуси: Classic и Signature решения под частные и коммерческие объекты."
  ),
  metadataBase: new URL("https://example.com"),
  icons: {
    icon: [
      { url: withBasePath("/assets/logo.png"), type: "image/png" }
    ],
    shortcut: [withBasePath("/assets/logo.png")],
    apple: [{ url: withBasePath("/assets/logo.png") }]
  },
  openGraph: {
    title: `{{BRAND_NAME}} | ${t("Бетонные монолитные лестницы")}`,
    description: t(
      "Отправьте план/фото и получите ориентир стоимости по проекту. Монолитные, парящие и консольные лестницы."
    ),
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
  const locale = getLocale();
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
    <html lang={locale}>
      <body className="font-body">
        <JsonLd data={localBusinessSchema} />
        <Layout site={site} currentLocale={locale}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
