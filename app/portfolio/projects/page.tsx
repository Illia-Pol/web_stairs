/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getSiteConfig, getTypes } from "@/lib/content/loaders";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { thpp } from "@/lib/i18n-portfolio-projects";
import { assetPath } from "@/lib/paths";
import { absoluteUrl, breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();
const LOCALE: Locale = "ru";
const tr = (key: Parameters<typeof thpp>[0]) => thpp(key, LOCALE);

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/portfolio/projects",
  title: `${tr("meta_title")} | ${site.brand.name}`,
  description: tr("meta_description"),
  image: "/assets/portfolio/portfolio-1.jpg"
});

export default function PortfolioProjectsPage() {
  const cases = getCases();
  const types = getTypes();
  const typeTitleMap = new Map(types.map((item) => [item.slug, t(item.title, undefined, LOCALE)]));
  const breadcrumbs = [
    { name: tr("breadcrumb_home"), href: "/" },
    { name: tr("breadcrumb_portfolio"), href: "/portfolio" },
    { name: tr("breadcrumb_current"), href: "/portfolio/projects" }
  ];
  const featured = cases.slice(0, 4);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: tr("schema_name"),
    description: tr("schema_description"),
    url: absoluteUrl(site.baseUrl, "/portfolio/projects"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: cases.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: t(item.title, undefined, LOCALE),
        url: absoluteUrl(site.baseUrl, `/portfolio/projects#${item.slug}`)
      }))
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={collectionSchema} />

      <Section className="section-dark">
        <Container>
          <nav aria-label="Breadcrumbs" className="portfolio-breadcrumbs text-sm text-ink-soft">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink">
                  {tr("breadcrumb_home")}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/portfolio" className="hover:text-ink">
                  {tr("breadcrumb_portfolio")}
                </Link>
              </li>
              <li>/</li>
              <li className="text-ink">{tr("breadcrumb_current")}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{tr("hero_kicker")}</p>
            <h1>{tr("hero_title")}</h1>
            <p>{tr("hero_description")}</p>
          </div>

          <div className="portfolio-story">
            <p>{tr("story_p_1")}</p>
            <p>{tr("story_p_2")}</p>
          </div>

          <div className="portfolio-photo-grid">
            {featured.map((item, index) => (
              <a key={item.slug} href={`#${item.slug}`} className={`project-card project-card-link ${index % 2 === 1 ? "delay-1" : ""}`.trim()}>
                <div className="project-image">
                  <img src={assetPath(item.coverImage)} alt={tr(`gallery_alt_${index + 1}` as Parameters<typeof thpp>[0])} loading="lazy" />
                </div>
              </a>
            ))}
          </div>

          <div className="section-head mt-8">
            <h2>{tr("cards_title")}</h2>
            <p className="section-note">{tr("cards_note")}</p>
          </div>

          <div className="portfolio-projects-grid">
            {cases.map((item) => (
              <article key={item.slug} id={item.slug} className="portfolio-project-card scroll-mt-28">
                <a href={`#${item.slug}`} className="portfolio-project-media">
                  <img src={assetPath(item.coverImage)} alt={t(item.title, undefined, LOCALE)} loading="lazy" />
                </a>
                <div className="portfolio-project-body">
                  <div className="portfolio-project-meta">
                    <span>{t(item.city, undefined, LOCALE)}</span>
                    <span>•</span>
                    <span>{item.funnel === "signature" ? tr("funnel_signature") : tr("funnel_classic")}</span>
                  </div>
                  <h3>{t(item.title, undefined, LOCALE)}</h3>
                  <p>{t(item.summary, undefined, LOCALE)}</p>
                  <ul>
                    <li>{tr("type_label")}: {typeTitleMap.get(item.type) ?? item.type}</li>
                    <li>{tr("budget_label")}: {item.priceBand}</li>
                    <li>{tr("year_label")}: {item.year}</li>
                  </ul>
                  <strong>{tr("card_cta")}</strong>
                </div>
              </article>
            ))}
          </div>

          <div className="section-head mt-10">
            <h2>{tr("details_title")}</h2>
            <p className="section-note">{tr("details_note")}</p>
          </div>

          <div className="portfolio-details-list">
            {cases.map((item) => (
              <article key={`${item.slug}-details`} className="portfolio-detail-card">
                <h3>{t(item.title, undefined, LOCALE)}</h3>
                <MarkdownContent content={item.content} />
              </article>
            ))}
          </div>

          <div className="portfolio-bottom-cta">
            <p>{tr("final_note")}</p>
            <Link href="/contacts" className="btn btn-small">
              {tr("final_cta")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
