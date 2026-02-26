import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/prices",
  title: `${t("Цены, оплата и гарантии")} | ${site.brand.name}`,
  description: t("Главная по стоимости: калькулятор-ориентир, тарифы, условия оплаты, договор и гарантия.")
});

export default function PricesHubPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Цены"), href: "/prices" }
  ];

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Стоимость бетонных лестниц, форматы работ, гарантия и договорные условия."),
    serviceType: t("Цены и условия работ"),
    areaServed: site.coverageRegions,
    offers: `Classic: ${site.pricing.standardFrom}, Signature: ${site.pricing.signatureFrom}`
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <PageHeader
        kicker={t("Цены")}
        title={t("Стоимость и условия")}
        description={t("В этом разделе собраны ориентиры стоимости, форматы тарифов, договор и гарантийные условия.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Цены"), href: "/prices" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Калькулятор")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Страница с примерными вилками стоимости. Интерактивный калькулятор будет добавлен позже.")}</p>
              <Link href="/prices/calculator" className="mt-4 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                {t("Открыть калькулятор")}
              </Link>
            </Card>

            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Тарифы")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Classic и Signature: разный уровень инженерной проработки и контроля.")}</p>
              <Link href="/prices/tariffs" className="mt-4 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                {t("Перейти к тарифам")}
              </Link>
            </Card>

            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Гарантия и договор")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Как оформляется договор ИП, какие гарантии даем и что не входит в зону ответственности.")}</p>
              <Link href="/prices/guarantee" className="mt-4 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                {t("Смотреть условия")}
              </Link>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
