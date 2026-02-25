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
      pathname: "/features",
      title: `Решение не найдено | ${site.brand.name}`,
      description: "Раздел не найден."
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/features/${feature.slug}`,
    title: `${feature.title} | ${site.brand.name}`,
    description: feature.summary
  });
}

export default function FeatureDetailPage({ params }: PageProps) {
  const feature = getFeatureBySlug(params.slug);
  if (!feature) notFound();

  const relatedTypes = feature.relatedTypes
    .map((slug) => getTypeBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const breadcrumbs = [
    { name: "Главная", href: "/" },
    { name: "Решения", href: "/features" },
    { name: feature.title, href: `/features/${feature.slug}` }
  ];

  const serviceSchema = serviceJsonLd({
    name: `${site.brand.name} — ${feature.title}`,
    baseUrl: site.baseUrl,
    description: feature.summary,
    serviceType: feature.title,
    areaServed: site.coverageRegions
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <PageHeader
        kicker="Решение"
        title={feature.title}
        description={feature.summary}
        actions={
          <>
            <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer">
              Получить расчет
            </ButtonLink>
            <ButtonLink href="/contacts" variant="ghost" className="border-white/25 text-white hover:bg-white/10">
              Оставить заявку
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Решения", href: "/features" },
              { label: feature.title, href: `/features/${feature.slug}` }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">Проблема</h2>
              <p className="mt-3 text-sm text-slate-700">{feature.problem}</p>
            </Card>
            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-3xl uppercase text-coal">Решение</h2>
              <p className="mt-3 text-sm text-slate-700">{feature.solution}</p>
            </Card>
          </div>

          <Card className="mt-4">
            <h2 className="font-heading text-3xl uppercase text-coal">Что вы получаете</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {feature.benefits.map((benefit) => (
                <li key={benefit} className="rounded-lg bg-slate-50 px-3 py-2">
                  {benefit}
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-3xl uppercase text-coal">Связанные типы лестниц</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedTypes.map((type) => (
              <Card key={type.slug}>
                <h3 className="font-heading text-2xl uppercase text-coal">{type.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{type.shortDescription}</p>
                <Link href={`/types/${type.slug}`} className="mt-3 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                  Открыть тип
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
