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
  pathname: "/about",
  title: `${t("О компании")} | ${site.brand.name}`,
  description: t("Кто мы, как работаем и почему нам доверяют сложные проекты бетонных монолитных лестниц.")
});

export default function AboutPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("О компании"), href: "/about" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("О компании")}
        title={site.brand.name}
        description={t("Инженерный подход к бетонным лестницам: от стандартных конфигураций до архитектурно сложных решений.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("О компании"), href: "/about" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Основатель")}</h2>
              <p className="mt-2 text-sm text-slate-700">{site.brand.founder}</p>
              <p className="mt-3 text-sm text-slate-600">{t("[TODO: добавить био, опыт, сертификаты и реальное фото]")}</p>
            </Card>

            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Принципы работы")}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>{t("Честная коммуникация и прозрачная смета.")}</li>
                <li>{t("Контроль ключевых инженерных узлов.")}</li>
                <li>{t("Реалистичные сроки без завышенных обещаний.")}</li>
              </ul>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
