import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getKnowledgeArticles, getKnowledgeBySlug, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { articleJsonLd, breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

const site = getSiteConfig();

export function generateStaticParams() {
  return getKnowledgeArticles().map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getKnowledgeBySlug(params.slug);

  if (!article) {
    return createPageMetadata({
      baseUrl: site.baseUrl,
      pathname: "/knowledge",
      title: `${t("Статья не найдена")} | ${site.brand.name}`,
      description: t("Материал не найден.")
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/knowledge/${article.slug}`,
    title: `${t(article.title)} | ${site.brand.name}`,
    description: t(article.excerpt),
    image: article.coverImage
  });
}

export default function KnowledgeDetailPage({ params }: PageProps) {
  const article = getKnowledgeBySlug(params.slug);
  if (!article) notFound();

  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("База знаний"), href: "/knowledge" },
    { name: t(article.title), href: `/knowledge/${article.slug}` }
  ];

  const articleSchema = articleJsonLd({
    baseUrl: site.baseUrl,
    slug: article.slug,
    title: t(article.title),
    description: t(article.excerpt),
    image: article.coverImage,
    publishedAt: article.publishedAt,
    authorName: site.brand.founder
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={articleSchema} />

      <PageHeader kicker={t("Статья")} title={t(article.title)} description={t(article.excerpt)} />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("База знаний"), href: "/knowledge" },
              { label: t(article.title), href: `/knowledge/${article.slug}` }
            ]}
          />

          <Card>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{t("Опубликовано")}: {article.publishedAt}</p>
            <div className="mt-4">
              <MarkdownContent content={article.content} />
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
