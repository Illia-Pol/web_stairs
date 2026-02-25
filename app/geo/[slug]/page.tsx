import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getGeoBySlug, getGeoPages, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

const site = getSiteConfig();

export function generateStaticParams() {
  return getGeoPages().map((geo) => ({ slug: geo.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const geo = getGeoBySlug(params.slug);

  if (!geo) {
    return createPageMetadata({
      baseUrl: site.baseUrl,
      pathname: "/contacts",
      title: `${t("Город не найден")} | ${site.brand.name}`,
      description: t("Страница города не найдена.")
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/geo/${geo.slug}`,
    title: t(geo.seoTitle),
    description: t(geo.seoDescription)
  });
}

export default function GeoPage({ params }: PageProps) {
  const geo = getGeoBySlug(params.slug);
  if (!geo) notFound();

  const relatedCases = getCases().filter((item) => item.city.toLowerCase() === geo.city.toLowerCase()).slice(0, 4);

  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Контакты"), href: "/contacts" },
    { name: geo.city, href: `/geo/${geo.slug}` }
  ];

  const serviceSchema = serviceJsonLd({
    name: `${site.brand.name} — ${t(geo.city)}`,
    baseUrl: site.baseUrl,
    description: t(geo.description),
    serviceType: t("Бетонные монолитные лестницы"),
    areaServed: t(geo.city)
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <PageHeader
        kicker={t("Гео")}
        title={t(geo.title)}
        description={t(geo.description)}
        actions={
          <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer">
            {t("Отправить план/фото")}
          </ButtonLink>
        }
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Контакты"), href: "/contacts" },
              { label: t(geo.city), href: `/geo/${geo.slug}` }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Локальные условия")}</h2>
              <p className="mt-3 text-sm text-slate-700">{t(geo.transport)}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {geo.proof.map((point) => (
                  <li key={point} className="rounded-lg bg-slate-50 px-3 py-2">
                    {t(point)}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Получить расчет")}</h2>
              <p className="mt-3 text-sm text-slate-700">{t("Отправьте исходные данные и получите ориентир стоимости по вашему городу.")}</p>
              <div className="mt-4">
                <ButtonLink href="/contacts" variant="secondary">
                  {t("Перейти к заявке")}
                </ButtonLink>
              </div>
            </Card>
          </div>

          <Card className="mt-6">
            <h2 className="font-heading text-3xl uppercase text-coal">{t("Кейсы в городе {{CITY}}", { CITY: geo.city })}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {relatedCases.map((item) => (
                <div key={item.slug} className="rounded-lg border border-slate-200 p-3">
                  <h3 className="font-heading text-2xl uppercase text-coal">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.summary}</p>
                  <Link href={`/portfolio/${item.slug}`} className="mt-2 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                    {t("Смотреть кейс")}
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
