import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { PageBottomCta } from "@/components/page/PageBottomCta";
import { PageNavCards } from "@/components/page/PageNavCards";
import { PageTop } from "@/components/page/PageTop";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { absoluteUrl, breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

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
  const pricingCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("Цены"),
    description: t("Раздел по стоимости, форматам работ, договору и гарантиям."),
    url: absoluteUrl(site.baseUrl, "/prices"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: cards.map((card, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: card.title,
        url: absoluteUrl(site.baseUrl, card.href)
      }))
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={pricingCollectionSchema} />

      <Section className="section-dark">
        <Container>
          <PageTop
            breadcrumbs={[
              { label: t("Главная"), href: "/" },
              { label: t("Цены"), href: "/prices" }
            ]}
            kicker={t("Цены")}
            title={t("Стоимость, формат работ и условия")}
            description={t("Здесь собраны ориентиры по стоимости, сценарии работы, договорные условия и гарантийные обязательства.")}
            story={[
              t("Цена лестницы зависит от геометрии, типа исполнения, условий на объекте и глубины инженерной проработки. Поэтому на старте даем именно реалистичный ориентир, а финальную смету фиксируем после уточнения исходных данных."),
              t("Раздел построен так, чтобы вы могли быстро выбрать нужный маршрут: посчитать ориентир, сравнить тарифы или проверить условия гарантии и договора.")
            ]}
          />

          <div className="portfolio-story">
            <p>
              {t("Перед финальным расчетом рекомендуем прочитать материалы")}{" "}
              <Link href="/vlog/articles/chto-vliyaet-na-stoimost" className="inline-link">
                {t("что влияет на стоимость")}
              </Link>{" "}
              {t("и")}{" "}
              <Link href="/vlog/articles/kak-podgotovit-proem" className="inline-link">
                {t("как подготовить проем")}
              </Link>
              .
            </p>
          </div>

          <PageNavCards items={cards} columns={3} />

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

      <PageBottomCta
        text={t("Если пока неясно, с чего начать, откройте калькулятор и отправьте заявку с фото проема — подскажем рабочий сценарий под ваш объект.")}
        href="/contacts"
        label={t("Перейти к заявке")}
      />
    </>
  );
}
