import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageBottomCta } from "@/components/page/PageBottomCta";
import { PageTop } from "@/components/page/PageTop";
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

      <Section className="section-dark">
        <Container>
          <PageTop
            breadcrumbs={[
              { label: t("Главная"), href: "/" },
              { label: t(geo.city), href: `/geo/${geo.slug}` }
            ]}
            kicker={t("Гео")}
            title={t(geo.title)}
            description={t(geo.description)}
            story={[
              t("Страница адаптирована под локальные условия и особенности выполнения работ в вашем регионе."),
              t("Для точного ориентира по срокам и стоимости отправьте фото или план проема через форму заявки.")
            ]}
          />

          <div className="info-grid md:grid-cols-2">
            <article className="guarantee-card">
              <h2>{t("Локальные условия")}</h2>
              <p>{t(geo.transport)}</p>
              <ul className="guarantee-list">
                {geo.proof.map((point) => (
                  <li key={point}>{t(point)}</li>
                ))}
              </ul>
            </article>

            <article className="guarantee-card">
              <h2>{t("Получить расчет")}</h2>
              <p>{t("Отправьте исходные данные и получите ориентир стоимости именно для вашего города.")}</p>
              <Link href="/contacts" className="btn btn-small mt-4">
                {t("Перейти к заявке")}
              </Link>
            </article>
          </div>

          {relatedCases.length ? (
            <article className="guarantee-card mt-6">
              <h2>{t("Кейсы в городе {{CITY}}", { CITY: geo.city })}</h2>
              <div className="master-side-grid md:grid-cols-2 mt-4">
                {relatedCases.map((item) => (
                  <Link key={item.slug} href={`/portfolio/projects#${item.slug}`} className="master-link-card">
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.summary)}</p>
                    <span>{t("Смотреть проект")}</span>
                  </Link>
                ))}
              </div>
            </article>
          ) : null}
        </Container>
      </Section>

      <PageBottomCta
        text={t("Нужен ориентир по вашему объекту в {{CITY}}? Отправьте план или фото проема и получите расчет с учетом локальных условий.", {
          CITY: geo.city
        })}
        href="/contacts"
        label={t("Оставить заявку")}
      />
    </>
  );
}
