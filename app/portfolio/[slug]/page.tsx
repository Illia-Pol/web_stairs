import type { Metadata } from "next";
import Image from "next/image";

import { assetPath } from "@/lib/paths";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getCaseBySlug, getCases, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

const site = getSiteConfig();

export function generateStaticParams() {
  return getCases().map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getCaseBySlug(params.slug);

  if (!item) {
    return createPageMetadata({
      baseUrl: site.baseUrl,
      pathname: "/portfolio",
      title: `${t("Кейс не найден")} | ${site.brand.name}`,
      description: t("Кейс не найден.")
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/portfolio/${item.slug}`,
    title: `${t(item.title)} | ${t("Портфолио")} ${site.brand.name}`,
    description: t(item.summary),
    image: item.coverImage
  });
}

export default function PortfolioDetailPage({ params }: PageProps) {
  const item = getCaseBySlug(params.slug);
  if (!item) notFound();

  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Портфолио"), href: "/portfolio" },
    { name: t(item.title), href: `/portfolio/${item.slug}` }
  ];

  const serviceSchema = serviceJsonLd({
    name: `${site.brand.name} — ${t("кейс")} ${t(item.title)}`,
    baseUrl: site.baseUrl,
    description: t(item.summary),
    serviceType: t(item.title),
    areaServed: site.coverageRegions,
    offers: item.priceBand
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <PageHeader kicker={item.funnel === "signature" ? "Signature" : "Standard"} title={t(item.title)} description={t(item.summary)} />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Портфолио"), href: "/portfolio" },
              { label: t(item.title), href: `/portfolio/${item.slug}` }
            ]}
          />

          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <Card>
              <MarkdownContent content={item.content} />
            </Card>

            <Card className="bg-[#fffaf1]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{t("Параметры кейса")}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>{t("Город")}: {t(item.city)}</li>
                <li>{t("Сценарий")}: {item.funnel === "signature" ? "Signature" : "Standard"}</li>
                <li>{t("Ориентир бюджета")}: {item.priceBand}</li>
                <li>{t("Год")}: {item.year}</li>
              </ul>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {item.gallery.map((image) => (
              <div key={image} className="relative aspect-[16/10] overflow-hidden rounded-xl2 border border-slate-200 bg-white">
                <Image src={assetPath(image)} alt={t(item.title)} fill className="object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
