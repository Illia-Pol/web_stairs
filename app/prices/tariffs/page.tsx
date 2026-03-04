import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { absoluteUrl, breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/prices/tariffs",
  title: `${t("Тарифы на бетонные лестницы")} | ${site.brand.name}`,
  description: t("Classic и Signature: чем отличаются форматы работы, для каких задач подходят и как выбрать оптимальный сценарий.")
});

export default function TariffsPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Цены"), href: "/prices" },
    { name: t("Тарифы"), href: "/prices/tariffs" }
  ];

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Форматы работы Classic и Signature для бетонных лестниц: разная глубина проработки под разные типы задач."),
    serviceType: t("Тарифы и форматы работ"),
    areaServed: site.coverageRegions
  });
  const tariffProductsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Product",
        position: 1,
        name: "Classic",
        description: t("Оптимальный формат для большинства частных объектов без потери качества."),
        brand: {
          "@type": "Brand",
          name: site.brand.name
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "BYN",
          availability: "https://schema.org/InStock",
          url: absoluteUrl(site.baseUrl, "/prices/tariffs/classic")
        }
      },
      {
        "@type": "Product",
        position: 2,
        name: "Signature",
        description: t("Формат для сложных и премиальных проектов с расширенной инженерной частью."),
        brand: {
          "@type": "Brand",
          name: site.brand.name
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "BYN",
          availability: "https://schema.org/InStock",
          url: absoluteUrl(site.baseUrl, "/prices/tariffs/signature")
        }
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={tariffProductsSchema} />

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
                <Link href="/prices" className="hover:text-ink">
                  {t("Цены")}
                </Link>
              </li>
              <li>/</li>
              <li className="text-ink">{t("Тарифы")}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{t("Тарифы")}</p>
            <h1>{t("Classic и Signature: два формата одной качественной работы")}</h1>
            <p>{t("Оба формата дают надежный бетонный конструктив. Разница в уровне инженерной детализации, глубине сопровождения и классе проектных задач.")}</p>
          </div>

          <div className="portfolio-story">
            <p>{t("Classic выбирают для рациональных проектов, где геометрия и условия позволяют работать по проверенному процессу с предсказуемой сметой.")}</p>
            <p>{t("Signature нужен для объектов с повышенной сложностью: нестандартные узлы, более высокий класс архитектурных требований, расширенное проектирование и сопровождение.")}</p>
            <p>
              {t("Если вы сравниваете форматы, начните со статьи")}{" "}
              <Link href="/vlog/articles/standart-vs-signature" className="inline-link">
                {t("Classic vs Signature")}
              </Link>{" "}
              {t("и затем посмотрите")}{" "}
              <Link href="/portfolio/projects" className="inline-link">
                {t("реализованные проекты")}
              </Link>
              .
            </p>
          </div>

          <div className="segment-grid">
            <article className="segment-card">
              <h3>Classic</h3>
              <p className="segment-sub">{t("Оптимальный формат для большинства частных объектов без потери качества.")}</p>
              <ul className="guarantee-list">
                <li>{t("Надежная конструкция и строгий контроль геометрии.")}</li>
                <li>{t("Понятный процесс согласования и реализации.")}</li>
                <li>{t("Прогнозируемый бюджет при типовых вводных.")}</li>
                <li>{t("Техническая подготовка под последующую отделку.")}</li>
              </ul>
              <Link href="/prices/tariffs/classic" className="btn btn-small">
                {t("Открыть Classic")}
              </Link>
            </article>

            <article className="segment-card featured">
              <h3>Signature</h3>
              <p className="segment-sub">{t("Формат для сложных и премиальных проектов с расширенной инженерной частью.")}</p>
              <ul className="guarantee-list">
                <li>{t("Сложные геометрии, консольные и парящие решения.")}</li>
                <li>{t("Более детализированная проектная проработка.")}</li>
                <li>{t("Расширенное сопровождение и координация по объекту.")}</li>
                <li>{t("Повышенные требования к точности и визуальному результату.")}</li>
              </ul>
              <Link href="/prices/tariffs/signature" className="btn btn-small">
                {t("Открыть Signature")}
              </Link>
            </article>
          </div>

          <div className="info-grid mt-6">
            <article className="info-card">
              <h3>{t("Как выбрать формат")}</h3>
              <p>{t("Если проект типовой и важна прогнозируемость, начинайте с Classic. Если есть сложные узлы или нестандартные требования, лучше сразу идти в Signature.")}</p>
            </article>
            <article className="info-card">
              <h3>{t("Что всегда остается неизменным")}</h3>
              <p>{t("Техническая корректность конструктива, прозрачная коммуникация по этапам и ответственность за заявленный результат.")}</p>
            </article>
            <article className="info-card">
              <h3>{t("Следующий шаг")}</h3>
              <p>{t("Отправьте исходные данные объекта, и мы подскажем, какой формат будет рациональным именно в вашем случае.")}</p>
            </article>
          </div>
        </Container>
      </Section>

      <Section className="section-accent master-projects-section">
        <Container>
          <div className="portfolio-bottom-cta">
            <p>{t("Нужна помощь с выбором между Classic и Signature? Отправьте план или фото проема, и мы предложим формат с понятной логикой по срокам и бюджету.")}</p>
            <Link href="/contacts" className="btn btn-small">
              {t("Обсудить проект")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
