import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getFeatures, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/features",
  title: `${t("Решения и преимущества")} | ${site.brand.name}`,
  description: t("Разбираем типовые страхи и решения: прозрачная смета, сложные узлы, сроки и контроль качества.")
});

export default function FeaturesPage() {
  const features = getFeatures();
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Решения"), href: "/features" }
  ];

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Набор сервисных преимуществ и подходов в производстве бетонных лестниц."),
    serviceType: t("Решения по бетонным лестницам"),
    areaServed: site.coverageRegions
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <PageHeader
        kicker={t("Решения")}
        title={t("Ответы на ключевые страхи заказчика")}
        description={t("Собрали основные блоки принятия решения: бюджет, надежность, сроки, технические риски и коммуникация на объекте.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Решения"), href: "/features" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.slug}>
                <h2 className="font-heading text-3xl uppercase text-coal">{t(feature.title)}</h2>
                <p className="mt-2 text-sm text-slate-700">{t(feature.summary)}</p>
                <p className="mt-3 text-sm text-slate-600">{t("Проблема")}: {t(feature.problem)}</p>
                <Link href={`/features/${feature.slug}`} className="mt-3 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                  {t("Смотреть решение")}
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
