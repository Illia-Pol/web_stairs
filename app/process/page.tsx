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
  pathname: "/process",
  title: `${t("Процесс работ")} | ${site.brand.name}`,
  description: t("Пошаговый процесс реализации бетонной лестницы: от замера до подготовки под отделку.")
});

export default function ProcessPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Процесс"), href: "/process" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("Процесс")}
        title={t("Как мы реализуем проект")}
        description={t("Согласованный и предсказуемый путь: от сбора исходных данных до передачи конструкции под отделку.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Процесс"), href: "/process" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            {site.processSteps.map((step, index) => (
              <Card key={step}>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{t("Этап {{INDEX}}", { INDEX: index + 1 })}</p>
                <h2 className="mt-2 font-heading text-3xl uppercase text-coal">{t(step)}</h2>
                <p className="mt-2 text-sm text-slate-700">{t("[TODO: добавить фактические сроки и KPI по этапу]")}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
