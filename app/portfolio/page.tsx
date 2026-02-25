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
  pathname: "/portfolio",
  title: `${t("Портфолио бетонных лестниц")} | ${site.brand.name}`,
  description: t("Реальные кейсы бетонных лестниц в Беларуси: Standard и Signature проекты с фото и описанием задачи.")
});

export default function PortfolioPage() {
  const cases = getCases();
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Портфолио"), href: "/portfolio" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("Кейсы")}
        title={t("Портфолио выполненных объектов")}
        description={t("Собрали проекты по типам лестниц, городам и сценариям. Можно фильтровать Standard / Signature, консоль, парящие и другие категории.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Портфолио"), href: "/portfolio" }
            ]}
          />
          <PortfolioGrid items={cases} heading={t("Кейсы")} />
        </Container>
      </Section>
    </>
  );
}
