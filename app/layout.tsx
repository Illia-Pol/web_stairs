import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

import { ClientEnhancements } from "@/components/ClientEnhancements";
import { JsonLd } from "@/components/JsonLd";
import { Layout } from "@/components/layout/Layout";
import { getSiteConfig } from "@/lib/content/loaders";
import { getLocale, t } from "@/lib/i18n";
import { assetPath, withBasePath } from "@/lib/paths";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

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
  title: `${brandName} | ${t("Бетонные монолитные лестницы под заказ")}`,
  description: t(
    "Проектируем и изготавливаем бетонные лестницы в Беларуси: Classic и Signature решения для частных и коммерческих объектов. Отправьте план или фото и получите расчет."
  ),
  metadataBase: new URL(metadataBaseUrl),
  alternates: {
    canonical: withBasePath("/")
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: [
      { url: withBasePath("/assets/logo.png"), type: "image/png" }
    ],
    shortcut: [withBasePath("/assets/logo.png")],
    apple: [{ url: withBasePath("/assets/logo.png") }]
  },
  openGraph: {
    title: `${brandName} | ${t("Бетонные монолитные лестницы под заказ")}`,
    description: t(
      "Проектируем и изготавливаем бетонные лестницы в Беларуси: Classic и Signature решения для частных и коммерческих объектов. Отправьте план или фото и получите расчет."
    ),
    images: [withBasePath("/assets/slider/slider-1.jpeg")],
    type: "website",
    locale: "ru_BY",
    siteName: brandName,
    url: withBasePath("/")
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandName} | ${t("Бетонные монолитные лестницы под заказ")}`,
    description: t(
      "Проектируем и изготавливаем бетонные лестницы в Беларуси: Classic и Signature решения для частных и коммерческих объектов. Отправьте план или фото и получите расчет."
    ),
    images: [withBasePath("/assets/slider/slider-1.jpeg")]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = getLocale();
  const websiteSchema = websiteJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl
  });
  const organizationSchema = organizationJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    logo: "/assets/logo.png",
    phone: site.contacts.phoneMain,
    email: site.contacts.email,
    address: site.contacts.address,
    messengers: site.messengers
  });
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PQL2WVYLV2"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PQL2WVYLV2');
          `}
        </Script>
        <Script src={assetPath("/assets/js/home-main.js")} strategy="afterInteractive" />
        <ClientEnhancements />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <Layout site={site} currentLocale={locale}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
