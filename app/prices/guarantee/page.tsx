import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/prices/guarantee",
  title: `${t("Гарантия и договор")} | ${site.brand.name}`,
  description: t("Как оформляется договор, какие гарантии на конструктив и что не входит в зону ответственности.")
});

export default function GuaranteePage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Цены"), href: "/prices" },
    { name: t("Гарантия"), href: "/prices/guarantee" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("Гарантия")}
        title={t("Договор и ответственность")}
        description={t("Оформляем отношения прозрачно: договор ИП, гарантия на конструктив и четкие границы работ.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Цены"), href: "/prices" },
              { label: t("Гарантия"), href: "/prices/guarantee" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Договор ИП")}</h2>
              <p className="mt-2 text-sm text-slate-700">{site.legal.contractModel}</p>
              <p className="mt-2 text-sm text-slate-600">{t("УНП")}: {site.legal.unp}</p>
            </Card>

            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Гарантия на конструктив")}</h2>
              <p className="mt-2 text-2xl font-semibold text-coal">{site.warrantyTerm}</p>
              <p className="mt-2 text-sm text-slate-700">{t("Распространяется на монолитную конструкцию при соблюдении условий эксплуатации.")}</p>
            </Card>

            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Что не входит")}</h2>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                <li>{t("Облицовка деревом, камнем, плиткой.")}</li>
                <li>{t("Работы сторонних подрядчиков.")}</li>
                <li>{t("Изменения проекта после сдачи без пересогласования.")}</li>
              </ul>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
