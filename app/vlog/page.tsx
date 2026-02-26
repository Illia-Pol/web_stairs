import Link from "next/link";

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
  pathname: "/vlog",
  title: `${t("Влог")} | ${site.brand.name}`,
  description: t("Раздел влога: проекты и статьи по бетонным лестницам.")
});

export default function VlogPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Влог"), href: "/vlog" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("Влог")}
        title={t("Проекты и статьи")}
        description={t("Выберите раздел: реальные проекты или полезные статьи по подготовке и выбору решений.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Влог"), href: "/vlog" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Проекты")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Подборка реализованных объектов с фото и пояснением задач.")}</p>
              <Link href="/vlog/projects" className="mt-4 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                {t("Открыть проекты")}
              </Link>
            </Card>
            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Статьи")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Практические материалы: стоимость, подготовка проема, выбор формата работ.")}</p>
              <Link href="/vlog/articles" className="mt-4 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                {t("Открыть статьи")}
              </Link>
            </Card>
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Процесс")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Пошаговый разбор, как идёт объект от замера до передачи под отделку.")}</p>
              <Link href="/vlog/process" className="mt-4 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                {t("Открыть процесс")}
              </Link>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
