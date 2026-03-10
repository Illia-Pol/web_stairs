import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { LeadCaptureSection } from "@/components/sections/LeadCaptureSection";
import { Container, Section } from "@/components/ui/Section";
import { getGeoPages, getSiteConfig } from "@/lib/content/loaders";
import { t, type Locale } from "@/lib/i18n";
import { thc } from "@/lib/i18n-contacts";
import { breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();
const LOCALE: Locale = "ru";
const tr = (key: Parameters<typeof thc>[0]) => thc(key, LOCALE);

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/contacts",
  title: `${tr("meta_title")} | ${site.brand.name}`,
  description: tr("meta_description")
});

export default function ContactsPage() {
  const cities = getGeoPages();
  const breadcrumbs = [
    { name: tr("breadcrumb_home"), href: "/" },
    { name: tr("breadcrumb_current"), href: "/contacts" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

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
        </Container>
      </Section>

      <LeadCaptureSection site={site} locale={LOCALE} source="contacts_page_form" />
      <Section className="section-dark">
        <Container>
          <article className="guarantee-card">
            <h2>Как получить точный ответ быстрее</h2>
            <p>
              Чтобы получить реалистичный ориентир по стоимости и срокам с первого сообщения, важно прислать базовый технический набор данных. Это
              экономит время и исключает «размытые» оценки.
            </p>
            <ul className="guarantee-list">
              {site.checklist.map((item) => (
                <li key={item}>{t(item, undefined, LOCALE)}</li>
              ))}
            </ul>
            <p className="mt-4">
              Если объект сложный и вы не уверены в типе лестницы, сначала посмотрите{" "}
              <Link href="/portfolio/types" className="inline-link">
                каталог типов
              </Link>
              , затем{" "}
              <Link href="/prices/tariffs" className="inline-link">
                сравнение тарифов Classic и Signature
              </Link>
              .
            </p>
          </article>

          <div className="info-grid mt-6">
            <article className="info-card">
              <h3>Срок ответа на заявку</h3>
              <p>
                Обычно первичный комментарий даем в день обращения. Если вы прикрепили фото/план и параметры проема, сразу отправляем предметный
                ориентир по бюджету и следующему шагу.
              </p>
            </article>
            <article className="info-card">
              <h3>Когда лучше писать в мессенджер</h3>
              <p>
                Если нужен быстрый отклик или нужно отправить больше материалов, удобнее сразу написать в Telegram/WhatsApp и приложить фото объекта.
              </p>
            </article>
            <article className="info-card">
              <h3>Что вы получите после заявки</h3>
              <p>
                Рекомендованный тип лестницы, ориентир по стоимости, комментарий по рискам и понятный сценарий запуска работ по этапам.
              </p>
            </article>
          </div>

          <article className="guarantee-card mt-6">
            <h2>{tr("geo_title")}</h2>
            <p className="section-note">{tr("geo_note")}</p>
            <ul className="contacts-city-list">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/geo/${city.slug}`} className="inline-link">
                    {t(city.city, undefined, LOCALE)}
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          <article className="guarantee-card mt-6">
            <h2>FAQ по заявке</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                {
                  q: "Можно ли отправить заявку без точных размеров?",
                  a: "Да. Для первичного ориентира достаточно фото и примерных параметров, затем мы уточним критичные размеры."
                },
                {
                  q: "Вы работаете только по Беларуси?",
                  a: "Основной фокус — Беларусь. По отдельным проектам рассматриваем соседние регионы при понятной логистике и графике."
                },
                {
                  q: "Что выбрать: Classic или Signature?",
                  a: "Если объект типовой — обычно Classic. Если есть сложные узлы и высокий уровень архитектурных требований — Signature."
                },
                {
                  q: "Можно ли приложить фото прямо в форме?",
                  a: "Да, форма поддерживает прикрепление изображений. Если нужен большой пакет файлов, удобнее отправить в мессенджер."
                },
                {
                  q: "Делаете ли вы финишную облицовку?",
                  a: "Нет. Мы выполняем бетонный конструктив и подготовку под отделку."
                },
                {
                  q: "Какой следующий шаг после отправки?",
                  a: "Вы получаете обратную связь по вашему объекту: ориентир стоимости, комментарии по рискам и предложенный формат запуска."
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
