import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/after-finishing",
  title: `${t("После заливки и подготовка под отделку")} | ${site.brand.name}`,
  description: t("Что делать после устройства монолитной лестницы: подготовка под отделку и взаимодействие с отделочными подрядчиками.")
});

export default function AfterFinishingPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("После заливки"), href: "/after-finishing" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("После заливки")}
        title={t("Подготовка под отделку")}
        description={t("Передаем конструкцию в состоянии, удобном для последующих отделочных работ.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("После заливки"), href: "/after-finishing" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Подготовка")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Контроль геометрии, маркировка критичных узлов, рекомендации по допускам для отделки.")}</p>
            </Card>
            <Card>
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Варианты отделки")}</h2>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                <li>{t("Дерево (массив, шпон, инженерная доска).")}</li>
                <li>{t("Камень или керамогранит.")}</li>
                <li>{t("Комбинированные решения с подсветкой.")}</li>
              </ul>
            </Card>
            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-2xl uppercase text-coal">{t("Важно")}</h2>
              <p className="mt-2 text-sm text-slate-700">{site.disclaimer}</p>
              <p className="mt-2 text-sm text-slate-600">{t("[TODO: добавить список партнерских отделочников, если нужно]")}</p>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
