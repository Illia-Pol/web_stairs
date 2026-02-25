import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getSiteConfig } from "@/lib/content/loaders";
import { breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/portfolio",
  title: `Портфолио бетонных лестниц | ${site.brand.name}`,
  description: "Реальные кейсы бетонных лестниц в Беларуси: Standard и Signature проекты с фото и описанием задачи."
});

export default function PortfolioPage() {
  const cases = getCases();
  const breadcrumbs = [
    { name: "Главная", href: "/" },
    { name: "Портфолио", href: "/portfolio" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker="Кейсы"
        title="Портфолио выполненных объектов"
        description="Собрали проекты по типам лестниц, городам и сценариям. Можно фильтровать Standard / Signature, консоль, парящие и другие категории."
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Портфолио", href: "/portfolio" }
            ]}
          />
          <PortfolioGrid items={cases} heading="Кейсы" />
        </Container>
      </Section>
    </>
  );
}
