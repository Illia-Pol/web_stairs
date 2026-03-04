import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

import { ClientEnhancements } from "@/components/ClientEnhancements";
import { JsonLd } from "@/components/JsonLd";
import { Layout } from "@/components/layout/Layout";
import { getSiteConfig } from "@/lib/content/loaders";
import { getLocale, t } from "@/lib/i18n";
import { assetPath, withBasePath } from "@/lib/paths";
import { localBusinessJsonLd } from "@/lib/seo";

import "./globals.css";

const site = getSiteConfig();
const brandName = site.brand.name.includes("{{") ? "BETOSTEP" : site.brand.name;
const metadataBaseUrl =
  site.baseUrl.includes("{{") || !site.baseUrl
    ? "https://example.com"
    : site.baseUrl.startsWith("http://") || site.baseUrl.startsWith("https://")
      ? site.baseUrl
      : `https://${site.baseUrl}`;

export const metadata: Metadata = {
  title: `${brandName} | ${t("Бетонные монолитные лестницы")}`,
  description: t(
    "Проектирование и изготовление бетонных лестниц в Беларуси: Classic и Signature решения под частные и коммерческие объекты."
  ),
  metadataBase: new URL(metadataBaseUrl),
  icons: {
    icon: [
      { url: withBasePath("/assets/logo.png"), type: "image/png" }
    ],
    shortcut: [withBasePath("/assets/logo.png")],
    apple: [{ url: withBasePath("/assets/logo.png") }]
  },
  openGraph: {
    title: `${brandName} | ${t("Бетонные монолитные лестницы")}`,
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
        <Script src={assetPath("/assets/js/home-main.js")} strategy="afterInteractive" />
        <ClientEnhancements />
        <JsonLd data={localBusinessSchema} />
        <Layout site={site} currentLocale={locale}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
