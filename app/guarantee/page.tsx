import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/guarantee",
  title: `Гарантия и договор | ${site.brand.name}`,
  description: "Как оформляется договор, какие гарантии на конструктив и что не входит в зону ответственности."
});

export default function GuaranteePage() {
  const breadcrumbs = [
    { name: "Главная", href: "/" },
    { name: "Гарантия", href: "/guarantee" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker="Гарантия"
        title="Договор и ответственность"
        description="Оформляем отношения прозрачно: договор ИП, гарантия на конструктив и четкие границы работ."
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Гарантия", href: "/guarantee" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">Договор ИП</h2>
              <p className="mt-2 text-sm text-slate-700">{site.legal.contractModel}</p>
              <p className="mt-2 text-sm text-slate-600">УНП: {site.legal.unp}</p>
            </Card>

            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-2xl uppercase text-coal">Гарантия на конструктив</h2>
              <p className="mt-2 text-2xl font-semibold text-coal">{site.warrantyTerm}</p>
              <p className="mt-2 text-sm text-slate-700">Распространяется на монолитную конструкцию при соблюдении условий эксплуатации.</p>
            </Card>

            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">Что не входит</h2>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                <li>Облицовка деревом, камнем, плиткой.</li>
                <li>Работы сторонних подрядчиков.</li>
                <li>Изменения проекта после сдачи без пересогласования.</li>
              </ul>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
