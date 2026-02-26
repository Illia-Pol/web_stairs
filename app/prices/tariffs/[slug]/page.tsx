import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

const site = getSiteConfig();

const tariffConfig = {
  classic: {
    label: "Classic",
    oldFunnel: "standard" as const,
    title: t("Надежная лестница без лишних рисков"),
    description: t("Рациональный формат: удобство, прозрачная смета и понятные сроки для типовых объектов."),
    price: site.pricing.standardFrom,
    cta: t("Отправить план/фото"),
    ctaHint: t("Кейсы Classic")
  },
  signature: {
    label: "Signature",
    oldFunnel: "signature" as const,
    title: t("Сложное без риска"),
    description: t("Формат для сложных инженерных задач: нестандартные узлы, повышенный контроль и высокая точность."),
    price: site.pricing.signatureFrom,
    cta: t("Обсудить решение"),
    ctaHint: t("Кейсы Signature")
  }
};

export function generateStaticParams() {
  return Object.keys(tariffConfig).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tariff = tariffConfig[params.slug as keyof typeof tariffConfig];

  if (!tariff) {
    return createPageMetadata({
      baseUrl: site.baseUrl,
      pathname: "/prices/tariffs",
      title: `${t("Тариф не найден")} | ${site.brand.name}`,
      description: t("Запрашиваемый тариф не найден.")
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/prices/tariffs/${params.slug}`,
    title: `${tariff.label} | ${site.brand.name}`,
    description: tariff.description
  });
}

export default function TariffDetailPage({ params }: PageProps) {
  const tariff = tariffConfig[params.slug as keyof typeof tariffConfig];
  if (!tariff) notFound();

  const cases = getCases().filter((item) => item.funnel === tariff.oldFunnel).slice(0, 3);
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Цены"), href: "/prices" },
    { name: t("Тарифы"), href: "/prices/tariffs" },
    { name: tariff.label, href: `/prices/tariffs/${params.slug}` }
  ];

  const serviceSchema = serviceJsonLd({
    name: `${site.brand.name} — ${tariff.label}`,
    baseUrl: site.baseUrl,
    description: tariff.description,
    serviceType: t("Тариф бетонной лестницы"),
    areaServed: site.coverageRegions,
    offers: tariff.price
  });

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("Тариф")}
        title={tariff.label}
        description={tariff.description}
        actions={
          <>
            <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer">
              {tariff.cta}
            </ButtonLink>
            <ButtonLink href="/portfolio/projects" variant="ghost" className="border-white/25 text-white hover:bg-white/10">
              {t("Смотреть проекты")}
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Цены"), href: "/prices" },
              { label: t("Тарифы"), href: "/prices/tariffs" },
              { label: tariff.label, href: `/prices/tariffs/${params.slug}` }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Подход")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Четкий регламент работ, прозрачная смета и контроль этапов на объекте.")}</p>
            </Card>
            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Ориентир стоимости")}</h2>
              <p className="mt-2 text-2xl font-semibold text-coal">{tariff.price}</p>
              <p className="mt-2 text-sm text-slate-600">{t("Точную смету формируем после анализа исходных данных.")}</p>
            </Card>
            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Следующий шаг")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Отправьте план/фото для первичной оценки и подтверждения подходящего тарифа.")}</p>
              <div className="mt-4">
                <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer">
                  {t("Отправить план/фото")}
                </ButtonLink>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-4xl uppercase text-coal">{tariff.ctaHint}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {cases.map((item) => (
              <Card key={item.slug}>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{t(item.city)}</p>
                <h3 className="mt-2 font-heading text-2xl uppercase text-coal">{t(item.title)}</h3>
                <p className="mt-2 text-sm text-slate-700">{t(item.summary)}</p>
                <Link href={`/portfolio/projects#${item.slug}`} className="mt-3 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                  {t("Открыть проект")}
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
