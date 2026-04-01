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
  const tariffCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("Тарифы на бетонные лестницы"),
    description: t("Сравнение форматов Classic и Signature для бетонных лестниц с переходом на детальные страницы тарифов."),
    url: absoluteUrl(site.baseUrl, "/prices/tariffs"),
    hasPart: [
      {
        "@type": "WebPage",
        name: "Classic",
        description: t("Оптимальный формат для большинства частных объектов без потери качества."),
        url: absoluteUrl(site.baseUrl, "/prices/tariffs/classic")
      },
      {
        "@type": "WebPage",
        name: "Signature",
        description: t("Формат для сложных и премиальных проектов с расширенной инженерной частью."),
        url: absoluteUrl(site.baseUrl, "/prices/tariffs/signature")
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={tariffCatalogSchema} />

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

          <article className="guarantee-card mt-6">
            <h2>Практическое сравнение форматов</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <article className="info-card">
                <h3>Classic</h3>
                <ul className="guarantee-list">
                  <li>Типовые геометрии и предсказуемая смета</li>
                  <li>Быстрый старт при понятных вводных</li>
                  <li>Рациональный сценарий для большинства частных домов</li>
                  <li>Оптимальный баланс цены, сроков и надежности</li>
                </ul>
              </article>
              <article className="info-card">
                <h3>Signature</h3>
                <ul className="guarantee-list">
                  <li>Сложные архитектурные задачи и нестандартные узлы</li>
                  <li>Расширенная инженерная проработка и сопровождение</li>
                  <li>Повышенные требования к точности и визуальному результату</li>
                  <li>Координация со смежными подрядчиками и дизайном</li>
                </ul>
              </article>
            </div>
            <p className="mt-4">
              Если нужно принять решение быстро, откройте{" "}
              <Link href="/prices/calculator" className="inline-link">
                калькулятор Classic
              </Link>
              . Для нетиповых задач лучше сразу отправить заявку с коротким описанием объекта.
            </p>
          </article>

          <article className="guarantee-card mt-6">
            <h2>FAQ по выбору тарифа</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                {
                  q: "Classic означает упрощение качества?",
                  a: "Нет. Разница не в качестве, а в глубине инженерной проработки и уровне сопровождения под сложность проекта."
                },
                {
                  q: "Когда Signature обязателен, а не просто желателен?",
                  a: "Когда есть сложные узлы, нестандартные ограничения проема и высокие архитектурные требования к итоговому результату."
                },
                {
                  q: "Можно ли предварительно понять подходящий тариф по фото?",
                  a: "Да, в большинстве случаев уже по фото и базовым параметрам можно рекомендовать рациональный формат."
                },
                {
                  q: "Можно ли начать в Classic и расширить сопровождение?",
                  a: "Да, если в процессе появятся дополнительные требования. Переход согласовываем до запуска критических этапов."
                },
                {
                  q: "Как тариф влияет на сроки?",
                  a: "Classic обычно быстрее запускается при типовых вводных, Signature требует больше времени на подготовку, но снижает риск ошибок в сложных задачах."
                },
                {
                  q: "Где посмотреть примеры для каждого формата?",
                  a: "В разделе проектов есть кейсы с привязкой к сценариям Classic и Signature."
                }
              ].map((faq) => (
                <article key={faq.q} className="info-card">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </article>
              ))}
            </div>
          </article>
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
