import Image from "next/image";

import { assetPath } from "@/lib/paths";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PageHeader } from "@/components/PageHeader";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/portfolio/projects",
  title: `${t("Проекты")} | ${t("Портфолио")} | ${site.brand.name}`,
  description: t("Примеры проектов бетонных лестниц: фильтры, фото, краткие итоги и описание реализации.")
});

export default function PortfolioProjectsPage() {
  const cases = getCases();
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Портфолио"), href: "/portfolio" },
    { name: t("Проекты"), href: "/portfolio/projects" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("Портфолио")}
        title={t("Проекты")}
        description={t("Здесь собраны примеры выполненных работ. Ниже есть карточки и подробные блоки по каждому проекту.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Портфолио"), href: "/portfolio" },
              { label: t("Проекты"), href: "/portfolio/projects" }
            ]}
          />

          <PortfolioGrid items={cases} heading={t("Витрина проектов")} />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-4xl uppercase text-coal">{t("Подробности по проектам")}</h2>
          <div className="mt-5 space-y-6">
            {cases.map((item) => (
              <Card key={item.slug} id={item.slug} className="scroll-mt-28">
                <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                      {t(item.city)} • {item.funnel === "signature" ? "Signature" : "Classic"}
                    </p>
                    <h3 className="mt-2 font-heading text-3xl uppercase text-coal">{t(item.title)}</h3>
                    <p className="mt-2 text-sm text-slate-600">{t(item.summary)}</p>
                    <div className="mt-4 text-sm text-slate-700">
                      <MarkdownContent content={item.content} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <Image src={assetPath(item.coverImage)} alt={t(item.title)} fill className="object-cover" />
                    </div>
                    <ul className="space-y-2 rounded-xl bg-[#fffaf1] p-4 text-sm text-slate-700">
                      <li>{t("Тип")}: {item.type}</li>
                      <li>{t("Ориентир бюджета")}: {item.priceBand}</li>
                      <li>{t("Год")}: {item.year}</li>
                      <li>{t("Город")}: {t(item.city)}</li>
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
