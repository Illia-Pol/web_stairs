import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PriceCards } from "@/components/PriceCards";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getSiteConfig } from "@/lib/content/loaders";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/standard",
  title: `Standard лестницы | ${site.brand.name}`,
  description:
    "Рациональные бетонные лестницы: прозрачная смета, надежный конструктив, понятные сроки и готовность под отделку."
});

export default function StandardPage() {
  const cases = getCases().filter((item) => item.funnel === "standard").slice(0, 3);

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: "Standard-вариант бетонной лестницы с прозрачной сметой и фиксированными этапами.",
    serviceType: "Standard бетонная лестница",
    areaServed: site.coverageRegions,
    offers: site.pricing.standardFrom
  });

  const breadcrumbs = [
    { name: "Главная", href: "/" },
    { name: "Standard", href: "/standard" }
  ];

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker="Standard"
        title="Надежная лестница без лишних рисков"
        description="Фокус на удобстве, долговечности и прозрачной смете. Подходит для частных домов и типовых проектов с четким бюджетом."
        actions={
          <>
            <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer">
              Отправить план/фото
            </ButtonLink>
            <ButtonLink href="/portfolio" variant="ghost" className="border-white/25 text-white hover:bg-white/10">
              Смотреть кейсы
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Standard", href: "/standard" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">Удобство</h2>
              <p className="mt-2 text-sm text-slate-700">Эргономичная геометрия и комфортный подъем на каждый день.</p>
            </Card>
            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">Надежность</h2>
              <p className="mt-2 text-sm text-slate-700">Монолитный конструктив с контролем армирования и бетонирования.</p>
            </Card>
            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">Прозрачность</h2>
              <p className="mt-2 text-sm text-slate-700">Смета по этапам и фиксированные контрольные точки по срокам.</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-4xl uppercase text-coal">Ориентиры цены для Standard</h2>
          <p className="mt-3 text-sm text-slate-600">Подробная разбивка формируется после анализа плана и фото объекта.</p>
          <div className="mt-6">
            <PriceCards site={site} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-heading text-4xl uppercase text-coal">Кейсы Standard</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {cases.map((item) => (
              <Card key={item.slug}>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{item.city}</p>
                <h3 className="mt-2 font-heading text-2xl uppercase text-coal">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{item.summary}</p>
                <Link href={`/portfolio/${item.slug}`} className="mt-3 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                  Открыть кейс
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
