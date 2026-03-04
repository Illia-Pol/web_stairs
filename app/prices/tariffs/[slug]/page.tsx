import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageBottomCta } from "@/components/page/PageBottomCta";
import { PageNavCards } from "@/components/page/PageNavCards";
import { PageTop } from "@/components/page/PageTop";
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

      <Section className="section-dark">
        <Container>
          <PageTop
            breadcrumbs={[
              { label: t("Главная"), href: "/" },
              { label: t("Цены"), href: "/prices" },
              { label: t("Тарифы"), href: "/prices/tariffs" },
              { label: tariff.label, href: `/prices/tariffs/${params.slug}` }
            ]}
            kicker={t("Тариф")}
            title={tariff.label}
            description={tariff.description}
            story={[
              t("Оба формата ориентированы на качественный результат. Разница в глубине инженерной проработки, уровне сопровождения и сложности задач."),
              t("Если сомневаетесь в выборе, отправьте исходные данные объекта и мы подскажем рациональный сценарий.")
            ]}
          />

          <div className="info-grid">
            <article className="info-card">
              <h3>{t("Подход")}</h3>
              <p>{t("Четкий регламент работ, прозрачная смета и контроль этапов на объекте.")}</p>
            </article>
            <article className="info-card">
              <h3>{t("Ориентир стоимости")}</h3>
              <p>{tariff.price}</p>
              <p>{t("Точную смету формируем после анализа исходных данных.")}</p>
            </article>
            <article className="info-card">
              <h3>{t("Следующий шаг")}</h3>
              <p>{t("Отправьте план/фото для первичной оценки и подтверждения подходящего тарифа.")}</p>
              <Link href="/contacts" className="btn btn-small mt-3">
                {tariff.cta}
              </Link>
            </article>
          </div>

          {cases.length ? (
            <>
              <div className="section-head mt-8">
                <h2>{tariff.ctaHint}</h2>
              </div>
              <PageNavCards
                items={cases.map((item) => ({
                  href: `/portfolio/projects#${item.slug}`,
                  title: t(item.title),
                  text: t(item.summary),
                  cta: t("Открыть проект")
                }))}
                columns={3}
              />
            </>
          ) : null}
        </Container>
      </Section>

      <PageBottomCta
        text={t("Остались вопросы по тарифу {{TARIFF}}? Отправьте исходные данные, и мы подскажем оптимальный формат под ваш объект.", {
          TARIFF: tariff.label
        })}
        href="/contacts"
        label={t("Перейти к заявке")}
      />
    </>
  );
}
