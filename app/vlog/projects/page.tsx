import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/vlog/projects",
  title: `${t("Проекты")} | ${t("Влог")} | ${site.brand.name}`,
  description: t("Раздел проектов влога: выполненные объекты, фото и фильтрация по типам лестниц.")
});

export default function VlogProjectsPage() {
  const items = getCases();
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Влог"), href: "/vlog" },
    { name: t("Проекты"), href: "/vlog/projects" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("Влог")}
        title={t("Проекты")}
        description={t("Реализованные лестницы: кейсы по сценариям Classic и Signature, с акцентом на задачу и результат.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Влог"), href: "/vlog" },
              { label: t("Проекты"), href: "/vlog/projects" }
            ]}
          />
          <PortfolioGrid items={items} heading={t("Проекты")} />
        </Container>
      </Section>
    </>
  );
}
