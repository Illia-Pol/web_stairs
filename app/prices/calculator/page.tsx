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
