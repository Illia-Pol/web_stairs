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
  pathname: "/portfolio",
  title: `${t("Портфолио")} | ${site.brand.name}`,
  description: t("Хаб портфолио: каталог типов лестниц, примеры проектов и страница мастера.")
});

export default function PortfolioHubPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Портфолио"), href: "/portfolio" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("Портфолио")}
        title={t("Работы, типы и мастер")}
        description={t("Отсюда можно перейти в каталог типов лестниц, посмотреть реализованные проекты и познакомиться с мастером.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Портфолио"), href: "/portfolio" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Типы лестниц")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Каталог конфигураций: монолитные, парящие, консольные и другие решения.")}</p>
              <Link href="/portfolio/types" className="mt-4 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                {t("Открыть каталог")}
              </Link>
            </Card>

            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Проекты")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Подборка реализованных объектов с фото, краткими итогами и фильтрами.")}</p>
              <Link href="/portfolio/projects" className="mt-4 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                {t("Смотреть проекты")}
              </Link>
            </Card>

            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Мастер")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Кто ведет проекты, как устроен контроль качества и подход к сложным объектам.")}</p>
              <Link href="/portfolio/master" className="mt-4 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                {t("Перейти к мастеру")}
              </Link>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
