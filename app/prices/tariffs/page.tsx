import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/prices/tariffs",
  title: `${t("Тарифы на бетонные лестницы")} | ${site.brand.name}`,
  description: t("Главная страница тарифов: чем отличаются Classic и Signature, когда выбирать каждый формат и почему это влияет на бюджет.")
});

export default function TariffsPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Цены"), href: "/prices" },
    { name: t("Тарифы"), href: "/prices/tariffs" }
  ];

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Сценарии работы по бетонным лестницам: Classic и Signature с разной глубиной инженерной проработки."),
    serviceType: t("Тарифы и форматы работ"),
    areaServed: site.coverageRegions
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <PageHeader
        kicker={t("Тарифы")}
        title={t("Форматы работы: Classic и Signature")}
        description={t("Тарифы нужны, чтобы заранее синхронизировать ожидания по сложности, срокам, уровню контроля и бюджету проекта.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Цены"), href: "/prices" },
              { label: t("Тарифы"), href: "/prices/tariffs" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Зачем деление на тарифы")}</h2>
              <p className="mt-2 text-sm text-slate-700">
                {t("Чтобы не смешивать типовые задачи и сложные инженерные кейсы в одну цену и один процесс.")}
              </p>
            </Card>
            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Что общего")}</h2>
              <p className="mt-2 text-sm text-slate-700">
                {t("В обоих форматах вы получаете монолитный конструктив, прозрачную коммуникацию и подготовку под отделку.")}
              </p>
            </Card>
            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Что разное")}</h2>
              <p className="mt-2 text-sm text-slate-700">
                {t("Разная глубина инженерной проработки, контроль узлов, требования к объекту и уровень риска переделки.")}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Classic</p>
              <h2 className="mt-2 font-heading text-3xl uppercase text-coal">{t("Рациональный формат")}</h2>
              <p className="mt-2 text-sm text-slate-700">
                {t("Для частных домов и типовых геометрий, где важны прогнозируемые сроки и понятная смета.")}
              </p>
              <div className="mt-4">
                <ButtonLink href="/prices/tariffs/classic" variant="ghost">
                  {t("Открыть Classic")}
                </ButtonLink>
              </div>
            </Card>

            <Card className="bg-[#fffaf1]">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Signature</p>
              <h2 className="mt-2 font-heading text-3xl uppercase text-coal">{t("Сложные узлы без риска")}</h2>
              <p className="mt-2 text-sm text-slate-700">
                {t("Для нестандартных конфигураций, консольных решений и проектов с высокой ценой ошибки.")}
              </p>
              <div className="mt-4">
                <ButtonLink href="/prices/tariffs/signature" variant="secondary">
                  {t("Открыть Signature")}
                </ButtonLink>
              </div>
            </Card>
          </div>

          <Card className="mt-5">
            <h3 className="font-heading text-2xl uppercase text-coal">{t("С чего начать")}</h3>
            <p className="mt-2 text-sm text-slate-700">
              {t("Если пока неясно, какой формат подходит, начните с страницы калькулятора и отправьте исходные данные для первичной оценки.")}
            </p>
            <div className="mt-4">
              <ButtonLink href="/prices/calculator">{t("Перейти в калькулятор")}</ButtonLink>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
