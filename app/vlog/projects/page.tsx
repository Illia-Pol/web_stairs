/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getSiteConfig, getTypes } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { assetPath } from "@/lib/paths";
import { absoluteUrl, breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/vlog/projects",
  title: `${t("Проекты")} | ${t("Влог")} | ${site.brand.name}`,
  description: t("Раздел проектов влога: выполненные объекты, фото и фильтрация по типам лестниц.")
});

export default function VlogProjectsPage() {
  const items = getCases();
  const types = getTypes();
  const typeTitleMap = new Map(types.map((item) => [item.slug, t(item.title)]));
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Влог"), href: "/vlog" },
    { name: t("Проекты"), href: "/vlog/projects" }
  ];
  const projectsListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("Реализованные объекты"),
    description: t("Подборка проектов бетонных лестниц с описанием задач и результата."),
    url: absoluteUrl(site.baseUrl, "/vlog/projects"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: t(item.title),
        url: absoluteUrl(site.baseUrl, `/portfolio/projects#${item.slug}`)
      }))
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={projectsListSchema} />

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
                <Link href="/vlog" className="hover:text-ink">
                  {t("Влог")}
                </Link>
              </li>
              <li>/</li>
              <li className="text-ink">{t("Проекты")}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{t("Влог / Проекты")}</p>
            <h1>{t("Реализованные объекты")}</h1>
            <p>{t("Подборка проектов с кратким пояснением исходной задачи, выбранного решения и результата по объекту.")}</p>
          </div>

          <div className="portfolio-story">
            <p>{t("Каждый кейс показывает не только визуал, но и практический контекст: где был основной риск, какое решение приняли и почему именно оно оказалось рабочим.")}</p>
            <p>
              В подборке ниже можно сравнить проекты по типу лестницы, сложности узлов, бюджету и срокам. Это помогает быстрее понять, какой сценарий
              будет реалистичным именно для вашего объекта.
            </p>
          </div>

          <div className="portfolio-projects-grid">
            {items.map((item) => (
              <article key={item.slug} className="portfolio-project-card">
                <Link href={`/portfolio/projects#${item.slug}`} className="portfolio-project-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={assetPath(item.coverImage)} alt={t(item.title)} width={1536} height={1024} loading="lazy" decoding="async" />
                </Link>
                <div className="portfolio-project-body">
                  <div className="portfolio-project-meta">
                    <span>{t(item.city)}</span>
                    <span>•</span>
                    <span>{item.funnel === "signature" ? "Signature" : "Classic"}</span>
                  </div>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.summary)}</p>
                  <ul>
                    <li>{t("Тип")}: {typeTitleMap.get(item.type) ?? item.type}</li>
                    <li>{t("Год")}: {item.year}</li>
                  </ul>
                  <strong>{t("Открыть подробный кейс")}</strong>
                </div>
              </article>
            ))}
          </div>

          <div className="info-grid mt-6">
            <article className="guarantee-card">
              <h2>Как читать проекты с пользой для своего объекта</h2>
              <ul className="guarantee-list">
                <li>Смотрите не только фото, но и исходную задачу проекта</li>
                <li>Сравнивайте тип лестницы с вашей геометрией проема</li>
                <li>Оценивайте уровень сложности узлов и требования к реализации</li>
                <li>Проверяйте, в каком формате выполнен кейс: Classic или Signature</li>
              </ul>
            </article>
            <article className="guarantee-card">
              <h2>Что делать после просмотра кейсов</h2>
              <p>
                Выберите 1-2 наиболее похожих проекта, зафиксируйте их как референс и отправьте заявку с фото/планом. Так мы быстрее дадим точный
                комментарий по реализуемости, бюджету и срокам.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/portfolio/types" className="btn btn-ghost btn-small">
                  Открыть типы лестниц
                </Link>
                <Link href="/contacts" className="btn btn-small">
                  Отправить заявку
                </Link>
              </div>
            </article>
          </div>

          <article className="guarantee-card mt-6">
            <h2>FAQ по разделу проектов</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                {
                  q: "Почему похожий визуально проект может стоить по-разному?",
                  a: "На итог влияют высота, геометрия, стадия объекта, сложность узлов и формат сопровождения, а не только внешний вид."
                },
                {
                  q: "Можно ли выбрать решение только по реализованному кейсу?",
                  a: "Кейс полезен как ориентир, но финальный выбор всегда делается по параметрам вашего конкретного проема."
                },
                {
                  q: "Где посмотреть больше технических разборов?",
                  a: "Откройте раздел «Проблемы и решения» и статьи во влоге — там разобраны ключевые риски и подходы."
                },
                {
                  q: "Как быстро получить комментарий по похожему кейсу?",
                  a: "Отправьте ссылку на интересующий кейс и фото вашего проема через форму заявки, чтобы мы сравнили условия."
                }
              ].map((faq) => (
                <article key={faq.q} className="info-card">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="guarantee-card mt-6">
            <h2>Связанные разделы для полного понимания проекта</h2>
            <p>
              Кейсы дают визуальный и практический ориентир, но финальное решение всегда формируется в связке с техническими страницами. Чтобы принять
              обоснованное решение, рекомендуем пройти по маршруту ниже.
            </p>
            <ul className="guarantee-list">
              <li>
                Сначала открыть{" "}
                <Link href="/portfolio/types" className="inline-link">
                  типы лестниц
                </Link>{" "}
                и выбрать подходящую конфигурацию
              </li>
              <li>
                Затем сравнить{" "}
                <Link href="/prices/tariffs" className="inline-link">
                  форматы Classic и Signature
                </Link>
              </li>
              <li>
                После этого проверить ориентир в{" "}
                <Link href="/prices/calculator" className="inline-link">
                  калькуляторе
                </Link>
              </li>
              <li>И отправить заявку с фото/планом для персонального комментария</li>
            </ul>
          </article>
        </Container>
      </Section>

      <Section className="section-accent master-projects-section">
        <Container>
          <div className="portfolio-bottom-cta">
            <p>{t("Если хотите разобрать ваш объект в похожей логике, отправьте план или фото проема через форму заявки.")}</p>
            <Link href="/contacts" className="btn btn-small">
              {t("Оставить заявку")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
