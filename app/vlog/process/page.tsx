import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/vlog/process",
  title: `${t("Процесс работ")} | ${site.brand.name}`,
  description: t("Пошаговый процесс реализации бетонной лестницы: от замера до подготовки под отделку.")
});

export default function ProcessPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Влог"), href: "/vlog" },
    { name: t("Процесс"), href: "/vlog/process" }
  ];
  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Пошаговый процесс реализации бетонной лестницы от сбора данных до подготовки под отделку."),
    serviceType: t("Процесс работ"),
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
              <li>
                <Link href="/vlog" className="hover:text-ink">
                  {t("Влог")}
                </Link>
              </li>
              <li>/</li>
              <li className="text-ink">{t("Процесс")}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{t("Процесс")}</p>
            <h1>{t("Как строится проект по этапам")}</h1>
            <p>{t("Работаем по понятной последовательности, чтобы у заказчика было прозрачное понимание сроков, решений и контрольных точек.")}</p>
          </div>

          <div className="portfolio-story">
            <p>{t("Этапы могут слегка отличаться по объекту, но логика остается одной: сначала фиксируем исходные данные, затем согласовываем решение и только после этого выходим в реализацию.")}</p>
          </div>

          <div className="master-side-grid md:grid-cols-2">
            {site.processSteps.map((step, index) => (
              <article key={step} className="guarantee-card">
                <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">{t("Этап {{INDEX}}", { INDEX: index + 1 })}</p>
                <h2>{t(step)}</h2>
                <p>{t("На этом этапе фиксируем ожидаемый результат, входные данные и критерии перехода к следующему шагу.")}</p>
              </article>
            ))}
          </div>

          <article className="guarantee-card mt-6">
            <h2>{t("Что дает такой процесс")}</h2>
            <ul className="guarantee-list">
              <li>{t("Понятные точки контроля для заказчика и подрядчиков.")}</li>
              <li>{t("Снижение риска переделок из-за неполных вводных.")}</li>
              <li>{t("Прозрачная коммуникация по срокам и зоне ответственности.")}</li>
            </ul>
            <Link href="/contacts" className="btn btn-small">
              {t("Обсудить ваш объект")}
            </Link>
          </article>
        </Container>
      </Section>
    </>
  );
}
