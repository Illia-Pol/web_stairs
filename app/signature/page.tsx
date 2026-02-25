import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/signature",
  title: `${t("Signature лестницы")} | ${site.brand.name}`,
  description: t("Сценарий Signature для сложных инженерных узлов: консольные и парящие лестницы с контролем рисков и качеством исполнения.")
});

export default function SignaturePage() {
  const cases = getCases().filter((item) => item.funnel === "signature").slice(0, 3);

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Signature-сценарий для сложных архитектурных и инженерных решений по бетонным лестницам."),
    serviceType: t("Signature бетонная лестница"),
    areaServed: site.coverageRegions,
    offers: site.pricing.signatureFrom
  });

  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: "Signature", href: "/signature" }
  ];

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker="Signature"
        title={t("Сложное без риска")}
        description={t("Для проектов, где ошибка в лестнице стоит дорого: нестандартные геометрии, консольные решения, сложные узлы опирания и высокая цена переделки.")}
        actions={
          <>
            <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer">
              {t("Обсудить решение")}
            </ButtonLink>
            <ButtonLink href="/types/konsolnaya-lestnitsa" variant="ghost" className="border-white/25 text-white hover:bg-white/10">
              {t("Консольные лестницы")}
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: "Signature", href: "/signature" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white">
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Инженерные узлы")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Проверяем схему опирания и несущую способность до старта работ.")}</p>
            </Card>
            <Card className="bg-white">
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Требования к объекту")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Фиксируем список технических условий к перекрытиям и смежным подрядчикам.")}</p>
            </Card>
            <Card className="bg-white">
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Почему дороже")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Сложные расчеты, более высокая точность и критичность ошибок в реализации.")}</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-4xl uppercase text-coal">{t("Кейсы Signature")}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {cases.map((item) => (
              <Card key={item.slug} className="bg-[#fffaf1]">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{t(item.city)}</p>
                <h3 className="mt-2 font-heading text-2xl uppercase text-coal">{t(item.title)}</h3>
                <p className="mt-2 text-sm text-slate-700">{t(item.summary)}</p>
                <p className="mt-3 text-sm text-slate-600">{t("Ориентир")}: {item.priceBand}</p>
                <Link href={`/portfolio/${item.slug}`} className="mt-3 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                  {t("Открыть кейс")}
                </Link>
              </Card>
            ))}
          </div>

          <Card className="mt-6 bg-coal text-white">
            <h3 className="font-heading text-3xl uppercase">{t("Обсудить нестандартный проект")}</h3>
            <p className="mt-2 text-sm text-slate-300">
              {t("Если объект со сложной геометрией или дизайнерской концепцией, отправьте исходные данные в Telegram для предварительного инженерного разбора.")}
            </p>
            <div className="mt-4">
              <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer">
                {t("Обсудить решение")}
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
