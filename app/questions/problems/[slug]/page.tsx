import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import {
  getFeatureBySlug,
  getFeatures,
  getSiteConfig,
  getTypeBySlug
} from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

const site = getSiteConfig();

export function generateStaticParams() {
  return getFeatures().map((feature) => ({ slug: feature.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const feature = getFeatureBySlug(params.slug);

  if (!feature) {
    return createPageMetadata({
      baseUrl: site.baseUrl,
      pathname: "/questions/problems",
      title: `${t("Решение не найдено")} | ${site.brand.name}`,
      description: t("Раздел не найден.")
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/questions/problems/${feature.slug}`,
    title: `${t(feature.title)} | ${site.brand.name}`,
    description: t(feature.summary)
  });
}

export default function FeatureDetailPage({ params }: PageProps) {
  const feature = getFeatureBySlug(params.slug);
  if (!feature) notFound();

  const relatedTypes = feature.relatedTypes
    .map((slug) => getTypeBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Вопросы"), href: "/questions" },
    { name: t("Проблемы и решения"), href: "/questions/problems" },
    { name: t(feature.title), href: `/questions/problems/${feature.slug}` }
  ];

  const serviceSchema = serviceJsonLd({
    name: `${site.brand.name} — ${t(feature.title)}`,
    baseUrl: site.baseUrl,
    description: t(feature.summary),
    serviceType: t(feature.title),
    areaServed: site.coverageRegions
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <PageHeader
        kicker={t("Решение")}
        title={t(feature.title)}
        description={t(feature.summary)}
        actions={
          <>
            <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer">
              {t("Получить расчет")}
            </ButtonLink>
            <ButtonLink href="/contacts" variant="ghost" className="border-white/25 text-white hover:bg-white/10">
              {t("Оставить заявку")}
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Вопросы"), href: "/questions" },
              { label: t("Проблемы и решения"), href: "/questions/problems" },
              { label: t(feature.title), href: `/questions/problems/${feature.slug}` }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Проблема")}</h2>
              <p className="mt-3 text-sm text-slate-700">{t(feature.problem)}</p>
            </Card>
            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Решение")}</h2>
              <p className="mt-3 text-sm text-slate-700">{t(feature.solution)}</p>
            </Card>
          </div>

          <Card className="mt-4">
            <h2 className="font-heading text-3xl uppercase text-coal">{t("Что вы получаете")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {feature.benefits.map((benefit) => (
                <li key={benefit} className="rounded-lg bg-slate-50 px-3 py-2">
                  {t(benefit)}
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-3xl uppercase text-coal">{t("Связанные типы лестниц")}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedTypes.map((type) => (
              <Card key={type.slug}>
                <h3 className="font-heading text-2xl uppercase text-coal">{t(type.title)}</h3>
                <p className="mt-2 text-sm text-slate-700">{t(type.shortDescription)}</p>
                <Link href={`/portfolio/types/${type.slug}`} className="mt-3 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                  {t("Открыть тип")}
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
