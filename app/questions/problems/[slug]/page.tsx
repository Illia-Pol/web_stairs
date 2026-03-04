import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
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

      <Section className="section-dark">
        <Container>
          <nav aria-label="Breadcrumbs" className="portfolio-breadcrumbs text-sm text-ink-soft">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink">
                  {t("Главная")}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/questions" className="hover:text-ink">
                  {t("Вопросы")}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/questions/problems" className="hover:text-ink">
                  {t("Проблемы и решения")}
                </Link>
              </li>
              <li>/</li>
              <li className="text-ink">{t(feature.title)}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{t("Решение")}</p>
            <h1>{t(feature.title)}</h1>
            <p>{t(feature.summary)}</p>
          </div>

          <div className="portfolio-story">
            <p>{t("Ниже собрали практический разбор: что обычно вызывает риск на объекте, каким способом закрываем этот риск и какой результат получает заказчик.")}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="guarantee-card">
              <h2>{t("Проблема")}</h2>
              <p>{t(feature.problem)}</p>
            </article>
            <article className="guarantee-card">
              <h2>{t("Решение")}</h2>
              <p>{t(feature.solution)}</p>
            </article>
          </div>

          <article className="guarantee-card mt-4">
            <h2>{t("Что вы получаете")}</h2>
            <ul className="guarantee-list">
              {feature.benefits.map((benefit) => (
                <li key={benefit}>{t(benefit)}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/contacts" className="btn btn-small">
                {t("Оставить заявку")}
              </Link>
              <Link href="/questions/problems" className="btn btn-ghost btn-small">
                {t("К списку решений")}
              </Link>
            </div>
          </article>
        </Container>
      </Section>

      <Section className="section-accent master-projects-section">
        <Container>
          <div className="section-head">
            <h2>{t("Связанные типы лестниц")}</h2>
          </div>
          <div className="master-side-grid md:grid-cols-2">
            {relatedTypes.map((type) => (
              <Link key={type.slug} href={`/portfolio/types/${type.slug}`} className="master-link-card">
                <h3>{t(type.title)}</h3>
                <p>{t(type.shortDescription)}</p>
                <span>{t("Открыть тип")}</span>
              </Link>
            ))}
          </div>

          <div className="portfolio-bottom-cta">
            <p>{t("Нужен комментарий по вашему объекту? Отправьте заявку с планом или фото, и мы предложим рабочий сценарий без лишнего риска.")}</p>
            <Link href="/contacts" className="btn btn-small">
              {t("Перейти к заявке")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
