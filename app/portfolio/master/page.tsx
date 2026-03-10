/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import type { Locale } from "@/lib/i18n";
import { thpm } from "@/lib/i18n-portfolio-master";
import { assetPath } from "@/lib/paths";
import { absoluteUrl, breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();
const LOCALE: Locale = "ru";
const tr = (key: Parameters<typeof thpm>[0], tokens?: Record<string, string | number>) =>
  thpm(key, tokens, LOCALE);

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/portfolio/master",
  title: `${tr("meta_title")} | ${site.brand.name}`,
  description: tr("meta_description")
});

export default function PortfolioMasterPage() {
  const breadcrumbs = [
    { name: tr("breadcrumb_home"), href: "/" },
    { name: tr("breadcrumb_portfolio"), href: "/portfolio" },
    { name: tr("breadcrumb_current"), href: "/portfolio/master" }
  ];
  const quickCards = [
    {
      href: "/vlog/process",
      title: tr("card_process_title"),
      text: tr("card_process_text"),
      cta: tr("card_process_cta")
    },
    {
      href: "/prices/guarantee",
      title: tr("card_guarantee_title"),
      text: tr("card_guarantee_text"),
      cta: tr("card_guarantee_cta")
    },
    {
      href: "/contacts",
      title: tr("card_contacts_title"),
      text: tr("card_contacts_text"),
      cta: tr("card_contacts_cta")
    }
  ];
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.brand.founder,
    description: tr("schema_person_description"),
    worksFor: {
      "@type": "ProfessionalService",
      name: site.brand.name,
      url: absoluteUrl(site.baseUrl, "/")
    }
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: tr("schema_page_name"),
    description: tr("schema_page_description"),
    url: absoluteUrl(site.baseUrl, "/portfolio/master")
  };

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={personSchema} />
      <JsonLd data={collectionSchema} />

      <Section className="section-dark">
        <Container>
          <nav aria-label="Breadcrumbs" className="portfolio-breadcrumbs text-sm text-ink-soft">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink">
                  {tr("breadcrumb_home")}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/portfolio" className="hover:text-ink">
                  {tr("breadcrumb_portfolio")}
                </Link>
              </li>
              <li>/</li>
              <li className="text-ink">{tr("breadcrumb_current")}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{tr("hero_kicker")}</p>
            <h1>{tr("hero_title")}</h1>
            <p>{tr("hero_description")}</p>
          </div>

          <div className="portfolio-story">
            <p>{tr("story_p_1")}</p>
            <p>{tr("story_p_2")}</p>
          </div>

          <div className="master-page-grid">
            <article className="master-main-card">
              <div className="master-main-media">
                <img src={assetPath("/assets/master.jpg")} alt={tr("profile_image_alt")} width={1536} height={1024} loading="lazy" decoding="async" />
              </div>
              <div className="master-main-body">
                <h2>{tr("profile_title")}</h2>
                <p className="master-main-lead">
                  {tr("profile_lead", {
                    FOUNDER_NAME: site.brand.founder
                  })}
                </p>
                <ul className="guarantee-list">
                  <li>{tr("profile_point_1")}</li>
                  <li>{tr("profile_point_2")}</li>
                  <li>{tr("profile_point_3")}</li>
                </ul>
                <p className="master-main-lead">{tr("profile_story_note")}</p>
                <Link href="/contacts" className="btn btn-small master-profile-cta">
                  {tr("profile_cta")}
                </Link>
              </div>
            </article>

            <aside>
              <p className="kicker master-side-kicker">{tr("cards_title")}</p>
              <div className="master-side-grid">
                {quickCards.map((card) => (
                  <Link key={card.href} href={card.href} className="master-link-card">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    <span>{card.cta}</span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>

          <div className="info-grid mt-6">
            <article className="guarantee-card">
              <h2>Как устроен личный контроль на проекте</h2>
              <p>
                На каждом объекте есть критические точки, где ошибка приводит к переделкам или потере качества. Поэтому контроль строится не «по
                факту», а заранее: по этапам, узлам и измеримым критериям приемки.
              </p>
              <ul className="guarantee-list">
                <li>Проверка исходных данных и геометрии до запуска этапа</li>
                <li>Контроль армирования, опалубки и ключевых узлов</li>
                <li>Фиксация статуса по этапам и прозрачная коммуникация с заказчиком</li>
                <li>Передача конструктива под отделку с понятными рекомендациями</li>
              </ul>
            </article>
            <article className="guarantee-card">
              <h2>Когда участие мастера особенно критично</h2>
              <p>
                Чем сложнее объект, тем важнее ранняя инженерная проработка и единая ответственность за технические решения. Это особенно актуально для
                нестандартных проемов, консольных узлов и проектов с высокими требованиями к визуальной чистоте.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/prices/tariffs/signature" className="btn btn-small">
                  Signature для сложных задач
                </Link>
                <Link href="/questions/problems/slozhnye-uzly" className="btn btn-ghost btn-small">
                  Разбор сложных узлов
                </Link>
              </div>
            </article>
          </div>

          <article className="guarantee-card mt-6">
            <h2>FAQ о мастере и сопровождении проекта</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                {
                  q: "Кто отвечает за финальную геометрию лестницы?",
                  a: "За результат отвечает мастер проекта: от согласования исходных данных до контроля ключевых этапов на объекте."
                },
                {
                  q: "Можно ли подключиться на этапе, когда объект уже строится?",
                  a: "Да, но лучше делать это как можно раньше, чтобы избежать дорогих корректировок в процессе."
                },
                {
                  q: "Что происходит, если в ходе работ меняются вводные?",
                  a: "Изменения фиксируются, оцениваются по влиянию на сроки и бюджет, после чего принимается согласованное техническое решение."
                },
                {
                  q: "Мастер участвует только в сложных проектах?",
                  a: "Нет. Контроль нужен и в типовых сценариях Classic, и в сложных Signature-объектах, просто глубина сопровождения разная."
                },
                {
                  q: "Можно ли предварительно обсудить проект без выезда?",
                  a: "Да. Первичный разбор делаем по фото/плану, а финальные технические решения подтверждаем по фактическим данным объекта."
                },
                {
                  q: "Где посмотреть примеры реализованных решений?",
                  a: "Откройте раздел проектов и каталог типов: там видно, как технические решения применяются в реальных объектах."
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
    </>
  );
}
