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
            <p>
              Каждый материал в этом разделе построен как инженерный кейс: исходная проблема, диагностика, рабочее решение, результат и перечень
              действий, которые стоит сделать до запуска работ.
            </p>
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

          <div className="info-grid mt-6">
            <article className="guarantee-card">
              <h2>Как пользоваться разделом</h2>
              <ul className="guarantee-list">
                <li>Сначала выберите проблему, которая ближе всего к вашему объекту</li>
                <li>Проверьте связанные типы лестниц и подходящий тариф</li>
                <li>Подготовьте фото/план по чек-листу и отправьте заявку</li>
                <li>Получите персональный сценарий по срокам, рискам и бюджету</li>
              </ul>
            </article>
            <article className="guarantee-card">
              <h2>Чем этот раздел полезен перед расчетом</h2>
              <p>
                До отправки заявки вы увидите типовые ошибки и сможете избежать их заранее. Это снижает риск переделок, помогает точнее планировать бюджет
                и ускоряет старт работ.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/portfolio/types" className="btn btn-ghost btn-small">
                  Каталог типов лестниц
                </Link>
                <Link href="/prices/tariffs" className="btn btn-small">
                  Сравнить тарифы
                </Link>
              </div>
            </article>
          </div>

          <article className="guarantee-card mt-6">
            <h2>Частые сценарии, с которыми приходят до старта</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <article className="info-card">
                <h3>Неясно, какой тип лестницы выбрать</h3>
                <p>
                  Обычно это вопрос не «вкуса», а геометрии и удобства. Сначала фиксируем фактические параметры, затем подбираем тип без потери
                  эргономики.
                </p>
              </article>
              <article className="info-card">
                <h3>Страх перерасхода бюджета</h3>
                <p>
                  Решается через прозрачную смету и четкую этапность: что включено, что считается изменением и как это влияет на сроки/стоимость.
                </p>
              </article>
              <article className="info-card">
                <h3>Сложные узлы в проекте</h3>
                <p>
                  Здесь критична инженерная проверка до старта. Чем раньше выявляем ограничения, тем меньше риск переделок и срыва графика.
                </p>
              </article>
              <article className="info-card">
                <h3>Нужно уложиться в сроки отделки</h3>
                <p>
                  Важна координация с другими подрядчиками и фиксация контрольных точек. Это позволяет избежать простоев и конфликтов на площадке.
                </p>
              </article>
            </div>
          </article>

          <article className="guarantee-card mt-6">
            <h2>FAQ по разделу «Проблемы и решения»</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                {
                  q: "Этот раздел заменяет личную консультацию?",
                  a: "Нет. Он помогает подготовиться и понять логику решений, а персональный сценарий формируется под ваш объект."
                },
                {
                  q: "Можно ли читать материалы в любом порядке?",
                  a: "Да, но удобнее начать с проблемы, которая ближе к вашей ситуации, и затем перейти к связанным типам и тарифам."
                },
                {
                  q: "Что делать, если мой случай не совпадает ни с одним разбором?",
                  a: "Отправьте заявку с фото/планом. Мы дадим точный комментарий по вашему кейсу и предложим рабочий сценарий."
                },
                {
                  q: "Какие страницы открыть после разборов?",
                  a: "Каталог типов лестниц, тарифы и калькулятор — в этой связке проще принять решение без лишнего риска."
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
