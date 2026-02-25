import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getFeatures, getSiteConfig } from "@/lib/content/loaders";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/features",
  title: `Решения и преимущества | ${site.brand.name}`,
  description: "Разбираем типовые страхи и решения: прозрачная смета, сложные узлы, сроки и контроль качества."
});

export default function FeaturesPage() {
  const features = getFeatures();
  const breadcrumbs = [
    { name: "Главная", href: "/" },
    { name: "Решения", href: "/features" }
  ];

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: "Набор сервисных преимуществ и подходов в производстве бетонных лестниц.",
    serviceType: "Решения по бетонным лестницам",
    areaServed: site.coverageRegions
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <PageHeader
        kicker="Решения"
        title="Ответы на ключевые страхи заказчика"
        description="Собрали основные блоки принятия решения: бюджет, надежность, сроки, технические риски и коммуникация на объекте."
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Решения", href: "/features" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.slug}>
                <h2 className="font-heading text-3xl uppercase text-coal">{feature.title}</h2>
                <p className="mt-2 text-sm text-slate-700">{feature.summary}</p>
                <p className="mt-3 text-sm text-slate-600">Проблема: {feature.problem}</p>
                <Link href={`/features/${feature.slug}`} className="mt-3 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                  Смотреть решение
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
