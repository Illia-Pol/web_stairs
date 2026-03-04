import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/vlog",
  title: `${t("Влог")} | ${site.brand.name}`,
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
              <li className="text-ink">{t("Влог")}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{t("Влог")}</p>
            <h1>{t("Проекты, статьи и процесс работы")}</h1>
            <p>{t("В этом разделе собраны материалы, которые помогают понять подход к проектам и заранее снять ключевые вопросы по объекту.")}</p>
          </div>

          <div className="portfolio-story">
            <p>{t("Если хотите быстро оценить уровень работ, начните с проектов. Если нужно разобраться в деталях до старта, откройте статьи. Для понимания этапов и последовательности — раздел «Процесс».")}</p>
            <p>{t("Материалы построены так, чтобы вы могли принять решение без лишней перегрузки и сразу перейти к следующему шагу.")}</p>
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
            <h2>{t("Как использовать этот раздел")}</h2>
            <ul className="guarantee-list">
              <li>{t("Посмотрите проекты, чтобы оценить визуальный уровень и диапазон задач.")}</li>
              <li>{t("Откройте статьи, если хотите заранее проверить технические нюансы.")}</li>
              <li>{t("Перейдите в процесс, чтобы понять последовательность этапов и точки контроля.")}</li>
            </ul>
          </article>
        </Container>
      </Section>

      <Section className="section-accent master-projects-section">
        <Container>
          <div className="portfolio-bottom-cta">
            <p>{t("Если хотите получить комментарий по вашему объекту, отправьте заявку с планом или фото проема.")}</p>
            <Link href="/contacts" className="btn btn-small">
              {t("Перейти к заявке")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
