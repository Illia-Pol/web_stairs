import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getSiteConfig, getTypeBySlug, getTypes } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

const site = getSiteConfig();

export function generateStaticParams() {
  return getTypes().map((type) => ({ slug: type.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const type = getTypeBySlug(params.slug);

  if (!type) {
    return createPageMetadata({
      baseUrl: site.baseUrl,
      pathname: "/portfolio/types",
      title: `${t("Тип лестницы не найден")} | ${site.brand.name}`,
      description: t("Запрашиваемый тип лестницы не найден.")
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/portfolio/types/${type.slug}`,
    title: `${t(type.title)} | ${site.brand.name}`,
    description: t(type.shortDescription),
    image: type.heroImage
  });
}

export default function TypeDetailPage({ params }: PageProps) {
  const type = getTypeBySlug(params.slug);
  if (!type) notFound();

  const relatedCases = getCases().filter((item) => item.type === type.slug).slice(0, 3);
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Портфолио"), href: "/portfolio" },
    { name: t("Типы"), href: "/portfolio/types" },
    { name: type.title, href: `/portfolio/types/${type.slug}` }
  ];

  const serviceSchema = serviceJsonLd({
    name: `${site.brand.name} — ${t(type.title)}`,
    baseUrl: site.baseUrl,
    description: t(type.fullDescription),
    serviceType: t(type.title),
    areaServed: site.coverageRegions,
    offers: type.priceHint
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <PageHeader
        kicker={type.funnel === "signature" ? "Signature" : "Classic"}
        title={t(type.title)}
        description={t(type.fullDescription)}
        actions={
          <>
            <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer">
              {t("Отправить план/фото")}
            </ButtonLink>
            <ButtonLink href="/prices/calculator" variant="ghost" className="border-white/25 text-white hover:bg-white/10">
              {t("Смотреть цены")}
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Портфолио"), href: "/portfolio" },
              { label: t("Типы"), href: "/portfolio/types" },
              { label: type.title, href: `/portfolio/types/${type.slug}` }
            ]}
          />

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Что входит")}</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {type.benefits.map((benefit) => (
                <li key={benefit} className="rounded-lg bg-slate-50 px-3 py-2">
                    {t(benefit)}
                </li>
              ))}
            </ul>
            </Card>

            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Ориентир стоимости")}</h2>
              <p className="mt-3 text-2xl font-semibold text-coal">{type.priceHint}</p>
              <p className="mt-3 text-sm text-slate-700">{t("Точная цена после анализа проема и требований к отделке.")}</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-4xl uppercase text-coal">{t("Связанные кейсы")}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {relatedCases.map((item) => (
              <Card key={item.slug}>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{t(item.city)}</p>
                <h3 className="mt-2 font-heading text-2xl uppercase text-coal">{t(item.title)}</h3>
                <p className="mt-2 text-sm text-slate-700">{t(item.summary)}</p>
                <Link href={`/portfolio/projects#${item.slug}`} className="mt-3 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                  {t("Открыть проект")}
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
