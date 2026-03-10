import Link from "next/link";

import { PriceEstimator } from "@/components/home/PriceEstimator";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();
const LOCALE: Locale = "ru";

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/prices/calculator",
  title: `${t("Калькулятор стоимости лестницы")} | ${site.brand.name}`,
  description: t("Калькулятор Classic: ориентир по стоимости типовых конфигураций и объяснение, когда нужен формат Signature.")
});

export default function PricesCalculatorPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Цены"), href: "/prices" },
    { name: t("Калькулятор"), href: "/prices/calculator" }
  ];

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Расчет ориентировочной стоимости бетонной лестницы в формате Classic по типовым конфигурациям."),
    serviceType: t("Калькулятор стоимости бетонной лестницы"),
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
              <li>
                <Link href="/prices" className="hover:text-ink">
                  {t("Цены")}
                </Link>
              </li>
              <li>/</li>
              <li className="text-ink">{t("Калькулятор")}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{t("Калькулятор")}</p>
            <h1>{t("Ориентир стоимости для формата Classic")}</h1>
            <p>{t("Здесь можно быстро оценить типовые конфигурации. Для нестандартных объектов делаем индивидуальный расчет после заявки.")}</p>
          </div>

          <div className="portfolio-story">
            <p>{t("Калькулятор учитывает тип лестницы, тип исполнения и высоту. Итог дает ориентир для планирования бюджета и обсуждения следующего шага.")}</p>
            <p>
              {t("Перед отправкой заявки полезно изучить материалы")}{" "}
              <Link href="/vlog/articles/chto-vliyaet-na-stoimost" className="inline-link">
                {t("что влияет на стоимость")}
              </Link>{" "}
              {t("и")}{" "}
              <Link href="/vlog/articles/standart-vs-signature" className="inline-link">
                {t("Classic vs Signature")}
              </Link>
              .
            </p>
          </div>

          <div className="mt-6">
            <PriceEstimator locale={LOCALE} reveal={false} />
          </div>

          <article className="guarantee-card mt-6">
            <h2>{t("Как читать результат калькулятора")}</h2>
            <ul className="guarantee-list">
              <li>{t("Это предварительный ориентир по исходным параметрам, а не финальная смета.")}</li>
              <li>{t("Точный расчет зависит от замеров, состояния проема и требований к узлам.")}</li>
              <li>{t("Если проект сложный или нестандартный, отправьте заявку для индивидуального расчета.")}</li>
            </ul>
          </article>

          <div className="info-grid mt-6">
            <article className="guarantee-card">
              <h2>Что входит в расчет Classic</h2>
              <p>
                Калькулятор рассчитан на типовые сценарии и помогает быстро понять порядок бюджета. Он учитывает тип лестницы, тип исполнения и высоту,
                но не заменяет инженерный расчет под конкретный объект.
              </p>
              <ul className="guarantee-list">
                <li>Подходит для первичного планирования бюджета</li>
                <li>Показывает реалистичный ориентир по стандартным конфигурациям</li>
                <li>Помогает сравнить варианты до отправки заявки</li>
                <li>Снижает риск ошибочных ожиданий по стоимости</li>
              </ul>
            </article>
            <article className="guarantee-card">
              <h2>Когда нужен Signature-расчет</h2>
              <p>
                Если у объекта сложная геометрия, нестандартные узлы или повышенные требования к архитектурному результату, калькулятор Classic может
                быть недостаточен. В таком случае нужен отдельный инженерный разбор и формат Signature.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/prices/tariffs/signature" className="btn btn-small">
                  Открыть Signature
                </Link>
                <Link href="/questions/problems/slozhnye-uzly" className="btn btn-ghost btn-small">
                  Разбор сложных узлов
                </Link>
              </div>
            </article>
          </div>

          <article className="guarantee-card mt-6">
            <h2>FAQ по калькулятору</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                {
                  q: "Почему итог калькулятора и финальная смета могут отличаться?",
                  a: "Калькулятор дает ориентир по типовым параметрам. Финальная смета учитывает фактические размеры, состояние проема и технические узлы."
                },
                {
                  q: "Можно ли доверять результату как бюджету проекта?",
                  a: "Да, как первичному диапазону. Для договора и планирования этапов нужен уточненный расчет по вашим вводным."
                },
                {
                  q: "Что делать, если не знаю тип лестницы?",
                  a: "Сначала откройте каталог типов, затем вернитесь в калькулятор с выбранным вариантом."
                },
                {
                  q: "Как быстро получить точный расчет после калькулятора?",
                  a: "Отправьте фото/план проема через форму заявки — обычно первичный комментарий даем в день обращения."
                },
                {
                  q: "Подходит ли калькулятор для консольных решений?",
                  a: "Для сложных консольных и парящих узлов нужен Signature-разбор: калькулятор показывает только базовый ориентир."
                },
                {
                  q: "Нужно ли указывать отделку в заявке после калькулятора?",
                  a: "Да. Будущая отделка влияет на геометрию и конечную стоимость, поэтому лучше указать её заранее."
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

      <section className="section section-accent master-projects-section" id="contact">
        <Container>
          <div className="portfolio-bottom-cta">
            <p>{t("Нужен точный расчет под ваш объект? Отправьте план или фото проема, и мы предложим реалистичный сценарий по срокам и бюджету.")}</p>
            <Link href="/contacts" className="btn btn-small">
              {t("Оставить заявку")}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
