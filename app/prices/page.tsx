import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/prices",
  title: `${t("Цены, оплата и гарантии")} | ${site.brand.name}`,
  description: t("Главная по стоимости: калькулятор-ориентир, тарифы, условия оплаты, договор и гарантия.")
});

export default function PricesHubPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Цены"), href: "/prices" }
  ];
  const cards = [
    {
      href: "/prices/calculator",
      title: t("Калькулятор"),
      text: t("Быстрый ориентир стоимости в формате Classic по ключевым параметрам объекта."),
      cta: t("Открыть калькулятор")
    },
    {
      href: "/prices/tariffs",
      title: t("Тарифы"),
      text: t("Разница между Classic и Signature: глубина проработки, уровень сопровождения и формат коммуникации."),
      cta: t("Перейти к тарифам")
    },
    {
      href: "/prices/guarantee",
      title: t("Гарантия и договор"),
      text: t("Что фиксируем в договоре, как формируется ответственность и где границы работ."),
      cta: t("Смотреть условия")
    }
  ];

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Стоимость бетонных лестниц, форматы работ, гарантия и договорные условия."),
    serviceType: t("Цены и условия работ"),
    areaServed: site.coverageRegions,
    offers: `Classic: ${site.pricing.standardFrom}, Signature: ${site.pricing.signatureFrom}`
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
              <li className="text-ink">{t("Цены")}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{t("Цены")}</p>
            <h1>{t("Стоимость, формат работ и условия")}</h1>
            <p>{t("Здесь собраны ориентиры по стоимости, сценарии работы, договорные условия и гарантийные обязательства.")}</p>
          </div>

          <div className="portfolio-story">
            <p>{t("Цена лестницы зависит от геометрии, типа исполнения, условий на объекте и глубины инженерной проработки. Поэтому на старте даем именно реалистичный ориентир, а финальную смету фиксируем после уточнения исходных данных.")}</p>
            <p>{t("Раздел построен так, чтобы вы могли быстро выбрать нужный маршрут: посчитать ориентир, сравнить тарифы или проверить условия гарантии и договора.")}</p>
          </div>

          <div className="master-side-grid md:grid-cols-3">
            {cards.map((card) => (
              <Link key={card.href} href={card.href} className="master-link-card">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <span>{card.cta}</span>
              </Link>
            ))}
          </div>

          <article className="guarantee-card mt-6">
            <h2>{t("Что влияет на итоговую стоимость")}</h2>
            <ul className="guarantee-list">
              <li>{t("Тип лестницы и сложность геометрии маршей/поворотов.")}</li>
              <li>{t("Высота подъема, параметры проема и ограничения площадки.")}</li>
              <li>{t("Выбранный формат работы: Classic или Signature.")}</li>
              <li>{t("Требования к срокам, этапности и координации смежных подрядчиков.")}</li>
            </ul>
            <Link href="/contacts" className="btn btn-small">
              {t("Отправить план/фото для точного ориентира")}
            </Link>
          </article>
        </Container>
      </Section>

      <Section className="section-accent master-projects-section">
        <Container>
          <div className="portfolio-bottom-cta">
            <p>{t("Если пока неясно, с чего начать, откройте калькулятор и отправьте заявку с фото проема — подскажем рабочий сценарий под ваш объект.")}</p>
            <Link href="/contacts" className="btn btn-small">
              {t("Перейти к заявке")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
