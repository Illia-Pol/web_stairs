import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
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
      pathname: "/vlog/articles",
      title: `${t("Статья не найдена")} | ${site.brand.name}`,
      description: t("Материал не найден.")
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/vlog/articles/${article.slug}`,
    title: `${t(article.title)} | ${site.brand.name}`,
    description: t(article.excerpt),
    image: article.coverImage,
    type: "article"
  });
}

export default function VlogArticleDetailPage({ params }: PageProps) {
  const article = getKnowledgeBySlug(params.slug);
  if (!article) notFound();
  const relatedArticles = getKnowledgeArticles().filter((item) => item.slug !== article.slug).slice(0, 3);

  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Влог"), href: "/vlog" },
    { name: t("Статьи"), href: "/vlog/articles" },
    { name: t(article.title), href: `/vlog/articles/${article.slug}` }
  ];

  const articleSchema = articleJsonLd({
    baseUrl: site.baseUrl,
    slug: article.slug,
    title: t(article.title),
    description: t(article.excerpt),
    image: article.coverImage,
    publishedAt: article.publishedAt,
    authorName: site.brand.founder,
    publisherName: site.brand.name,
    publisherLogo: "/assets/logo.png"
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={articleSchema} />

      <Section className="section-dark">
        <Container>
          <nav aria-label="Breadcrumbs" className="portfolio-breadcrumbs text-sm text-ink-soft">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink">
                  {t("Главная")}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/vlog" className="hover:text-ink">
                  {t("Влог")}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/vlog/articles" className="hover:text-ink">
                  {t("Статьи")}
                </Link>
              </li>
              <li>/</li>
              <li className="text-ink">{t(article.title)}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{t("Статья")}</p>
            <h1>{t(article.title)}</h1>
            <p>{t(article.excerpt)}</p>
          </div>

          <article className="guarantee-card">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">
              {t("Опубликовано")}: {article.publishedAt}
            </p>
            <div className="mt-4">
              <MarkdownContent content={article.content} />
            </div>
          </article>
        </Container>
      </Section>

      <Section className="section-accent master-projects-section">
        <Container>
          <div className="section-head">
            <h2>{t("Читайте также")}</h2>
          </div>
          <div className="master-side-grid md:grid-cols-3">
            {relatedArticles.map((item) => (
              <Link key={item.slug} href={`/vlog/articles/${item.slug}`} className="master-link-card">
                <h3>{t(item.title)}</h3>
                <p>{t(item.excerpt)}</p>
                <span>{t("Открыть статью")}</span>
              </Link>
            ))}
          </div>

          <div className="portfolio-bottom-cta">
            <p>{t("Нужна консультация по вашему объекту? Отправьте заявку, и мы предложим рабочий сценарий под ваши вводные.")}</p>
            <Link href="/contacts" className="btn btn-small">
              {t("Оставить заявку")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
