import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PriceCards } from "@/components/PriceCards";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig, getTypes } from "@/lib/content/loaders";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/prices",
  title: `Цены на бетонные лестницы | ${site.brand.name}`,
  description: "Ориентиры стоимости, примеры смет и факторы, которые влияют на итоговую цену бетонной лестницы."
});

export default function PricesPage() {
  const types = getTypes();
  const breadcrumbs = [
    { name: "Главная", href: "/" },
    { name: "Цены", href: "/prices" }
  ];

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: "Расчет стоимости бетонной лестницы с учетом типа, геометрии и условий площадки.",
    serviceType: "Расчет стоимости бетонной лестницы",
    areaServed: site.coverageRegions,
    offers: `Standard: ${site.pricing.standardFrom}, Mid: ${site.pricing.midRange}, Signature: ${site.pricing.signatureFrom}`
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <PageHeader
        kicker="Цены"
        title="Ориентиры стоимости"
        description="Показываем вилки по типам, примеры смет и факторы стоимости до старта работ."
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Цены", href: "/prices" }
            ]}
          />

          <PriceCards site={site} />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-4xl uppercase text-coal">Вилки по типам</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {types.map((type) => (
              <Card key={type.slug}>
                <h3 className="font-heading text-2xl uppercase text-coal">{type.title}</h3>
                <p className="mt-2 text-sm text-slate-700">Ориентир: {type.priceHint}</p>
                <p className="mt-2 text-sm text-slate-600">{type.shortDescription}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-heading text-4xl uppercase text-coal">3 примера смет</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Card>
              <h3 className="font-heading text-2xl uppercase text-coal">Пример 1</h3>
              <p className="mt-2 text-sm text-slate-700">Тип: Standard</p>
              <p className="text-sm text-slate-700">Итог: {"{{EXAMPLE_ESTIMATE_1}}"}</p>
              <p className="mt-2 text-sm text-slate-600">[TODO: заполнить реальными данными сметы]</p>
            </Card>
            <Card>
              <h3 className="font-heading text-2xl uppercase text-coal">Пример 2</h3>
              <p className="mt-2 text-sm text-slate-700">Тип: Mid</p>
              <p className="text-sm text-slate-700">Итог: {"{{EXAMPLE_ESTIMATE_2}}"}</p>
              <p className="mt-2 text-sm text-slate-600">[TODO: заполнить реальными данными сметы]</p>
            </Card>
            <Card>
              <h3 className="font-heading text-2xl uppercase text-coal">Пример 3</h3>
              <p className="mt-2 text-sm text-slate-700">Тип: Signature</p>
              <p className="text-sm text-slate-700">Итог: {"{{EXAMPLE_ESTIMATE_3}}"}</p>
              <p className="mt-2 text-sm text-slate-600">[TODO: заполнить реальными данными сметы]</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">Что влияет на цену</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Сложность геометрии и тип лестницы.</li>
                <li>Готовность проема и условия на объекте.</li>
                <li>Требования к точности под финишную отделку.</li>
                <li>Срочность и график смежных работ.</li>
              </ul>
            </Card>

            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-3xl uppercase text-coal">Что прислать для расчета</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {site.checklist.map((item) => (
                  <li key={item} className="rounded-lg bg-white px-3 py-2">
                    {item}
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
