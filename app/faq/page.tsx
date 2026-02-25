import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Container, Section } from "@/components/ui/Section";
import { getFaqItems, getSiteConfig } from "@/lib/content/loaders";
import { breadcrumbsJsonLd, createPageMetadata, faqJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/faq",
  title: `FAQ по бетонным лестницам | ${site.brand.name}`,
  description: "Ответы на частые вопросы: сроки, гарантия, стоимость, требования к объекту и зона ответственности."
});

export default function FaqPage() {
  const faqItems = getFaqItems();
  const breadcrumbs = [
    { name: "Главная", href: "/" },
    { name: "FAQ", href: "/faq" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={faqJsonLd(faqItems)} />

      <PageHeader
        kicker="FAQ"
        title="Частые вопросы"
        description="Собрали вопросы, которые чаще всего задают перед стартом проекта."
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "FAQ", href: "/faq" }
            ]}
          />
          <FAQAccordion items={faqItems} />
        </Container>
      </Section>
    </>
  );
}
