import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getKnowledgeArticles, getKnowledgeBySlug, getSiteConfig } from "@/lib/content/loaders";
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
      title: `Статья не найдена | ${site.brand.name}`,
      description: "Материал не найден."
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/knowledge/${article.slug}`,
    title: `${article.title} | ${site.brand.name}`,
    description: article.excerpt,
    image: article.coverImage
  });
}

export default function KnowledgeDetailPage({ params }: PageProps) {
  const article = getKnowledgeBySlug(params.slug);
  if (!article) notFound();

  const breadcrumbs = [
    { name: "Главная", href: "/" },
    { name: "База знаний", href: "/knowledge" },
    { name: article.title, href: `/knowledge/${article.slug}` }
  ];

  const articleSchema = articleJsonLd({
    baseUrl: site.baseUrl,
    slug: article.slug,
    title: article.title,
    description: article.excerpt,
    image: article.coverImage,
    publishedAt: article.publishedAt,
    authorName: site.brand.founder
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={articleSchema} />

      <PageHeader kicker="Статья" title={article.title} description={article.excerpt} />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "База знаний", href: "/knowledge" },
              { label: article.title, href: `/knowledge/${article.slug}` }
            ]}
          />

          <Card>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Опубликовано: {article.publishedAt}</p>
            <div className="mt-4">
              <MarkdownContent content={article.content} />
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
