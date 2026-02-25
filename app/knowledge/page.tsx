import Image from "next/image";

import { assetPath } from "@/lib/paths";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getKnowledgeArticles, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/knowledge",
  title: `${t("База знаний по лестницам")} | ${site.brand.name}`,
  description: t("Статьи по подготовке проема, расчету стоимости и выбору формата проекта бетонной лестницы.")
});

export default function KnowledgePage() {
  const articles = getKnowledgeArticles();
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("База знаний"), href: "/knowledge" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker="Knowledge"
        title={t("База знаний")}
        description={t("Публикуем практические материалы, которые помогают подготовить объект и избежать ошибок до начала работ.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("База знаний"), href: "/knowledge" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.slug} className="overflow-hidden p-0">
                <div className="relative aspect-[16/10]">
                  <Image src={assetPath(article.coverImage)} alt={t(article.title)} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{article.publishedAt}</p>
                  <h2 className="mt-2 font-heading text-2xl uppercase text-coal">{t(article.title)}</h2>
                  <p className="mt-2 text-sm text-slate-700">{t(article.excerpt)}</p>
                  <Link href={`/knowledge/${article.slug}`} className="mt-3 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                    {t("Читать статью")}
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
