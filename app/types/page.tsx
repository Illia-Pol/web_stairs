import Image from "next/image";

import { assetPath } from "@/lib/paths";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig, getTypes } from "@/lib/content/loaders";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/types",
  title: `Типы бетонных лестниц | ${site.brand.name}`,
  description: "Каталог типов лестниц: монолитные, парящие, консольные и другие решения для частных и коммерческих объектов."
});

export default function TypesPage() {
  const types = getTypes();
  const breadcrumbs = [
    { name: "Главная", href: "/" },
    { name: "Типы лестниц", href: "/types" }
  ];

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: "Каталог решений по бетонным лестницам для сценариев Standard и Signature.",
    serviceType: "Типы бетонных лестниц",
    areaServed: site.coverageRegions
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <PageHeader
        kicker="Каталог"
        title="Типы бетонных лестниц"
        description="Собрали основные конфигурации для быстрого выбора. Для сложных задач делаем индивидуальный инженерный сценарий."
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Типы", href: "/types" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {types.map((type) => (
              <Card key={type.slug} className="overflow-hidden p-0">
                <div className="relative aspect-[16/10]">
                  <Image src={assetPath(type.heroImage)} alt={type.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    {type.funnel === "signature" ? "Signature" : "Standard"}
                  </p>
                  <h2 className="mt-2 font-heading text-2xl uppercase text-coal">{type.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{type.shortDescription}</p>
                  <p className="mt-3 text-sm text-slate-700">Ориентир: {type.priceHint}</p>
                  <Link href={`/types/${type.slug}`} className="mt-3 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                    Подробнее
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
