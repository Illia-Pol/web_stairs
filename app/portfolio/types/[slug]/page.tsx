import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageBottomCta } from "@/components/page/PageBottomCta";
import { PageNavCards } from "@/components/page/PageNavCards";
import { PageTop } from "@/components/page/PageTop";
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

      <Section className="section-dark">
        <Container>
          <PageTop
            breadcrumbs={[
              { label: t("Главная"), href: "/" },
              { label: t("Портфолио"), href: "/portfolio" },
              { label: t("Типы"), href: "/portfolio/types" },
              { label: type.title, href: `/portfolio/types/${type.slug}` }
            ]}
            kicker={type.funnel === "signature" ? "Signature" : "Classic"}
            title={t(type.title)}
            description={t(type.fullDescription)}
            story={[
              t("Ниже собрали ключевые особенности этого типа лестницы и практические кейсы, где такой формат работает лучше всего."),
              t("Для точного расчета под ваш объект отправьте план или фото проема через форму заявки.")
            ]}
          />

          <div className="info-grid md:grid-cols-2">
            <article className="guarantee-card">
              <h2>{t("Что входит")}</h2>
              <ul className="guarantee-list">
              {type.benefits.map((benefit) => (
                <li key={benefit}>{t(benefit)}</li>
              ))}
            </ul>
            </article>

            <article className="guarantee-card">
              <h2>{t("Ориентир стоимости")}</h2>
              <p>{type.priceHint}</p>
              <p>{t("Точная цена после анализа проема и требований к отделке.")}</p>
              <Link href="/prices/calculator" className="btn btn-small mt-4">
                {t("Смотреть цены")}
              </Link>
            </article>
          </div>

          {relatedCases.length ? (
            <>
              <div className="section-head mt-8">
                <h2>{t("Связанные кейсы")}</h2>
              </div>
              <PageNavCards
                items={relatedCases.map((item) => ({
                  href: `/portfolio/projects#${item.slug}`,
                  title: t(item.title),
                  text: t(item.summary),
                  cta: t("Открыть проект")
                }))}
                columns={3}
              />
            </>
          ) : null}
        </Container>
      </Section>

      <PageBottomCta
        text={t("Нужен точный ориентир по типу «{{TYPE}}»? Отправьте план или фото проема и получите комментарий по реализации.", {
          TYPE: t(type.title)
        })}
        href="/contacts"
        label={t("Отправить заявку")}
      />
    </>
  );
}
