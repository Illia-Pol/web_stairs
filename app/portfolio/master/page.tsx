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
  pathname: "/portfolio/master",
  title: `${t("Мастер")} | ${site.brand.name}`,
  description: t("Кто ведет проекты, как устроен контроль качества и почему нам доверяют сложные объекты.")
});

export default function PortfolioMasterPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Портфолио"), href: "/portfolio" },
    { name: t("Мастер"), href: "/portfolio/master" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("Портфолио")}
        title={t("Мастер")}
        description={t("Инженерный подход к бетонным лестницам: от стандартных конфигураций до архитектурно сложных решений.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Портфолио"), href: "/portfolio" },
              { label: t("Мастер"), href: "/portfolio/master" }
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
