/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import type { Locale } from "@/lib/i18n";
import { thph } from "@/lib/i18n-portfolio-hub";
import { assetPath } from "@/lib/paths";
import { absoluteUrl, breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();
const LOCALE: Locale = "en";
const tr = (key: Parameters<typeof thph>[0]) => thph(key, LOCALE);

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/en/portfolio",
  title: `${tr("meta_title")} | ${site.brand.name}`,
  description: tr("meta_description"),
  image: "/assets/portfolio/portfolio-1.jpg"
});

export default function PortfolioHubPageEn() {
  const breadcrumbs = [
    { name: tr("breadcrumb_home"), href: "/en" },
    { name: tr("breadcrumb_current"), href: "/en/portfolio" }
  ];
  const gallery = [
    { image: "/assets/portfolio/portfolio-1.jpg", alt: tr("gallery_alt_1") },
    { image: "/assets/portfolio/portfolio-2.jpg", alt: tr("gallery_alt_2") },
    { image: "/assets/portfolio/portfolio-3.jpg", alt: tr("gallery_alt_3") },
    { image: "/assets/portfolio/portfolio-4.jpg", alt: tr("gallery_alt_4") }
  ];
  const navCards = [
    {
      href: "/en/portfolio/types",
      title: tr("card_types_title"),
      text: tr("card_types_text"),
      cta: tr("card_types_cta")
    },
    {
      href: "/en/portfolio/projects",
      title: tr("card_projects_title"),
      text: tr("card_projects_text"),
      cta: tr("card_projects_cta")
    },
    {
      href: "/en/portfolio/master",
      title: tr("card_master_title"),
      text: tr("card_master_text"),
      cta: tr("card_master_cta")
    }
  ];
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: tr("schema_name"),
    description: tr("schema_description"),
    url: absoluteUrl(site.baseUrl, "/en/portfolio"),
    hasPart: gallery.map((item, index) => ({
      "@type": "CreativeWork",
      name: `${tr("schema_name")} ${index + 1}`,
      image: absoluteUrl(site.baseUrl, item.image),
      url: absoluteUrl(site.baseUrl, "/en/portfolio/projects")
    }))
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
                <Link href="/en" className="hover:text-ink">
                  {tr("breadcrumb_home")}
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
            <p>{tr("story_p_3")}</p>
          </div>

          <div className="portfolio-photo-grid">
            {gallery.map((item, index) => (
              <Link key={item.image} href="/en/portfolio/projects" className={`project-card project-card-link ${index % 2 === 1 ? "delay-1" : ""}`.trim()}>
                <div className="project-image">
                  <img src={assetPath(item.image)} alt={item.alt} loading="lazy" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="section-accent master-projects-section">
        <Container>
          <div className="section-head">
            <h2>{tr("next_title")}</h2>
          </div>

          <div className="master-side-grid md:grid-cols-3">
            {navCards.map((card) => (
              <Link key={card.href} href={card.href} className="master-link-card">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <span>{card.cta}</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
