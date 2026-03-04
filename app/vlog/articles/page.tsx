import Image from "next/image";
import Link from "next/link";

import { assetPath } from "@/lib/paths";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getKnowledgeArticles, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { absoluteUrl, breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/vlog/articles",
  title: `${t("Статьи")} | ${t("Влог")} | ${site.brand.name}`,
  description: t("Раздел статей влога: практические материалы по бетонным лестницам.")
});

export default function VlogArticlesPage() {
  const articles = getKnowledgeArticles();
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Влог"), href: "/vlog" },
    { name: t("Статьи"), href: "/vlog/articles" }
  ];
  const blogIndexSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.brand.name} Blog`,
    description: t("Практические материалы по бетонным лестницам."),
    url: absoluteUrl(site.baseUrl, "/vlog/articles"),
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: t(article.title),
      description: t(article.excerpt),
      url: absoluteUrl(site.baseUrl, `/vlog/articles/${article.slug}`),
      datePublished: article.publishedAt,
      author: {
        "@type": "Person",
        name: site.brand.founder
      }
    }))
  };

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={blogIndexSchema} />

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
              <li className="text-ink">{t("Статьи")}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{t("Влог / Статьи")}</p>
            <h1>{t("Практические материалы по выбору и подготовке")}</h1>
            <p>{t("Разбираем реальные вопросы: стоимость, подготовка проема, выбор формата работ и другие темы, которые важны до старта проекта.")}</p>
          </div>

          <div className="portfolio-story">
            <p>{t("Материалы написаны простым языком и ориентированы на практику. Если тема совпадает с вашей задачей, можно сразу перейти к заявке и обсудить объект.")}</p>
          </div>

          <div className="portfolio-projects-grid">
            {articles.map((article) => (
              <article key={article.slug} className="portfolio-project-card">
                <Link href={`/vlog/articles/${article.slug}`} className="portfolio-project-media relative">
                  <Image
                    src={assetPath(article.coverImage)}
                    alt={t(article.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </Link>
                <div className="portfolio-project-body">
                  <div className="portfolio-project-meta">
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span>{t("Статья")}</span>
                  </div>
                  <h3>{t(article.title)}</h3>
                  <p>{t(article.excerpt)}</p>
                  <strong>{t("Читать статью")}</strong>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="section-accent master-projects-section">
        <Container>
          <div className="portfolio-bottom-cta">
            <p>{t("Если хотите применить рекомендации к вашему объекту, отправьте фото или план проема и получите комментарий по делу.")}</p>
            <Link href="/contacts" className="btn btn-small">
              {t("Перейти к заявке")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
