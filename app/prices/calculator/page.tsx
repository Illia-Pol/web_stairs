import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PriceCards } from "@/components/PriceCards";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig, getTypes } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/prices/calculator",
  title: `${t("Калькулятор стоимости лестницы")} | ${site.brand.name}`,
  description: t("Страница калькулятора-ориентира: примерные диапазоны цены, факторы стоимости и примеры смет. Полноценный калькулятор будет добавлен.")
});

export default function PricesPage() {
  const types = getTypes();
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Цены"), href: "/prices" },
    { name: t("Калькулятор"), href: "/prices/calculator" }
  ];

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Расчет стоимости бетонной лестницы с учетом типа, геометрии и условий площадки."),
    serviceType: t("Расчет стоимости бетонной лестницы"),
    areaServed: site.coverageRegions,
    offers: `Classic: ${site.pricing.standardFrom}, Mid: ${site.pricing.midRange}, Signature: ${site.pricing.signatureFrom}`
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <PageHeader
        kicker={t("Калькулятор")}
        title={t("Калькулятор стоимости (в разработке)")}
        description={t("Пока здесь ориентиры цены и примеры смет. Полноценный интерактивный калькулятор добавим в следующих итерациях.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Цены"), href: "/prices" },
              { label: t("Калькулятор"), href: "/prices/calculator" }
            ]}
          />

          <PriceCards site={site} />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-4xl uppercase text-coal">{t("Вилки по типам")}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {types.map((type) => (
              <Card key={type.slug}>
                <h3 className="font-heading text-2xl uppercase text-coal">{t(type.title)}</h3>
                <p className="mt-2 text-sm text-slate-700">{t("Ориентир")}: {type.priceHint}</p>
                <p className="mt-2 text-sm text-slate-600">{t(type.shortDescription)}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-heading text-4xl uppercase text-coal">{t("3 примера смет")}</h2>
          <p className="mt-3 text-sm text-slate-600">
            {t("Это ориентиры для предварительной оценки. Точный расчет делаем после анализа исходных данных по объекту.")}
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Card>
              <h3 className="font-heading text-2xl uppercase text-coal">{t("Пример 1")}</h3>
              <p className="mt-2 text-sm text-slate-700">{t("Тип")}: Classic</p>
              <p className="text-sm text-slate-700">{t("Итог")}: {"{{EXAMPLE_ESTIMATE_1}}"}</p>
              <p className="mt-2 text-sm text-slate-600">{t("[TODO: заполнить реальными данными сметы]")}</p>
            </Card>
            <Card>
              <h3 className="font-heading text-2xl uppercase text-coal">{t("Пример 2")}</h3>
              <p className="mt-2 text-sm text-slate-700">{t("Тип")}: Mid</p>
              <p className="text-sm text-slate-700">{t("Итог")}: {"{{EXAMPLE_ESTIMATE_2}}"}</p>
              <p className="mt-2 text-sm text-slate-600">{t("[TODO: заполнить реальными данными сметы]")}</p>
            </Card>
            <Card>
              <h3 className="font-heading text-2xl uppercase text-coal">{t("Пример 3")}</h3>
              <p className="mt-2 text-sm text-slate-700">{t("Тип")}: Signature</p>
              <p className="text-sm text-slate-700">{t("Итог")}: {"{{EXAMPLE_ESTIMATE_3}}"}</p>
              <p className="mt-2 text-sm text-slate-600">{t("[TODO: заполнить реальными данными сметы]")}</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Что влияет на цену")}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>{t("Сложность геометрии и тип лестницы.")}</li>
                <li>{t("Готовность проема и условия на объекте.")}</li>
                <li>{t("Требования к точности под финишную отделку.")}</li>
                <li>{t("Срочность и график смежных работ.")}</li>
              </ul>
            </Card>

            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Что прислать для расчета")}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {site.checklist.map((item) => (
                  <li key={item} className="rounded-lg bg-white px-3 py-2">
                    {t(item)}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
