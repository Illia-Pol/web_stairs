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
  pathname: "/vlog",
  title: `${t("Влог о бетонных лестницах")} | ${site.brand.name}`,
  description: t("Раздел влога: проекты и статьи по бетонным лестницам.")
});

export default function VlogPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Влог"), href: "/vlog" }
  ];
  const cards = [
    {
      href: "/vlog/projects",
      title: t("Проекты"),
      text: t("Подборка реализованных объектов с фото, задачей и кратким разбором результата."),
      cta: t("Открыть проекты")
    },
    {
      href: "/vlog/articles",
      title: t("Статьи"),
      text: t("Практические материалы по подготовке проема, стоимости и выбору формата работ."),
      cta: t("Открыть статьи")
    },
    {
      href: "/vlog/process",
      title: t("Процесс"),
      text: t("Пошагово показываем, как идет проект от исходных данных до передачи под отделку."),
      cta: t("Смотреть процесс")
    }
  ];
  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Влог по бетонным лестницам: проекты, статьи и рабочий процесс реализации."),
    serviceType: t("Влог"),
    areaServed: site.coverageRegions
  });
  const vlogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("Влог о бетонных лестницах"),
    description: t("Проекты, статьи и процесс работы по бетонным лестницам."),
    url: absoluteUrl(site.baseUrl, "/vlog"),
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
      <JsonLd data={vlogCollectionSchema} />

      <Section className="section-dark">
        <Container>
          <PageTop
            breadcrumbs={[
              { label: t("Главная"), href: "/" },
              { label: t("Влог"), href: "/vlog" }
            ]}
            kicker={t("Влог")}
            title={t("Проекты, статьи и процесс работы")}
            description={t("В этом разделе собраны материалы, которые помогают понять подход к проектам и заранее снять ключевые вопросы по объекту.")}
            story={[
              t("Если хотите быстро оценить уровень работ, начните с проектов. Если нужно разобраться в деталях до старта, откройте статьи. Для понимания этапов и последовательности — раздел «Процесс»."),
              t("Материалы построены так, чтобы вы могли принять решение без лишней перегрузки и сразу перейти к следующему шагу.")
            ]}
          />

          <PageNavCards items={cards} columns={3} />

          <article className="guarantee-card mt-6">
            <h2>{t("Как использовать этот раздел")}</h2>
            <ul className="guarantee-list">
              <li>{t("Посмотрите проекты, чтобы оценить визуальный уровень и диапазон задач.")}</li>
              <li>{t("Откройте статьи, если хотите заранее проверить технические нюансы.")}</li>
              <li>{t("Перейдите в процесс, чтобы понять последовательность этапов и точки контроля.")}</li>
            </ul>
          </article>
        </Container>
      </Section>

      <PageBottomCta
        text={t("Если хотите получить комментарий по вашему объекту, отправьте заявку с планом или фото проема.")}
        href="/contacts"
        label={t("Перейти к заявке")}
      />
    </>
  );
}
