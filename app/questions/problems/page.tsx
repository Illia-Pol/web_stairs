import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getFeatures, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { absoluteUrl, breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/questions/problems",
  title: `${t("Проблемы и решения")} | ${site.brand.name}`,
  description: t("Разбираем типовые страхи и решения: прозрачная смета, сложные узлы, сроки и контроль качества.")
});

export default function FeaturesPage() {
  const features = getFeatures();
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Вопросы"), href: "/questions" },
    { name: t("Проблемы и решения"), href: "/questions/problems" }
  ];

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Набор сервисных преимуществ и подходов в производстве бетонных лестниц."),
    serviceType: t("Решения по бетонным лестницам"),
    areaServed: site.coverageRegions
  });
  const problemsCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("Проблемы и решения"),
    description: t("Практические разборы рисков и решений до старта работ по бетонной лестнице."),
    url: absoluteUrl(site.baseUrl, "/questions/problems"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: features.map((feature, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: t(feature.title),
        url: absoluteUrl(site.baseUrl, `/questions/problems/${feature.slug}`)
      }))
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={problemsCollectionSchema} />

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
              <li className="text-ink">{t("Проблемы и решения")}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{t("Проблемы и решения")}</p>
            <h1>{t("Разбор ключевых рисков до старта работ")}</h1>
            <p>{t("Каждый материал в этом разделе построен по одной логике: в чем проблема, как ее закрыть и что получает заказчик в результате.")}</p>
          </div>

          <div className="portfolio-story">
            <p>{t("Это не теоретические статьи, а рабочие сценарии для частных объектов. Можно открыть нужную тему и сразу увидеть практический подход к решению.")}</p>
          </div>

          <div className="master-side-grid md:grid-cols-2">
            {features.map((feature) => (
              <Link key={feature.slug} href={`/questions/problems/${feature.slug}`} className="master-link-card problem-link-card">
                <h3>{t(feature.title)}</h3>
                <p>{t(feature.summary)}</p>
                <p className="problem-link-note">{t("Проблема")}: {t(feature.problem)}</p>
                <span>{t("Открыть решение")}</span>
              </Link>
            ))}
          </div>

          <article className="guarantee-card mt-6">
            <h2>{t("Не нашли ваш кейс?")}</h2>
            <p>{t("Опишите задачу в заявке и приложите фото/план. Мы подготовим ориентир по рискам, срокам и формату реализации именно под ваш объект.")}</p>
            <Link href="/contacts" className="btn btn-small mt-4">
              {t("Оставить заявку")}
            </Link>
          </article>
        </Container>
      </Section>
    </>
  );
}
