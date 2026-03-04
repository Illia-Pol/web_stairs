/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { PageNavCards } from "@/components/page/PageNavCards";
import { PageTop } from "@/components/page/PageTop";
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
          <PageTop
            breadcrumbs={[
              { label: tr("breadcrumb_home"), href: "/en" },
              { label: tr("breadcrumb_current"), href: "/en/portfolio" }
            ]}
            kicker={tr("hero_kicker")}
            title={tr("hero_title")}
            description={tr("hero_description")}
            story={[tr("story_p_1"), tr("story_p_2"), tr("story_p_3")]}
          />

          <div className="portfolio-photo-grid">
            {gallery.map((item, index) => (
              <Link key={item.image} href="/en/portfolio/projects" className={`project-card project-card-link ${index % 2 === 1 ? "delay-1" : ""}`.trim()}>
                <div className="project-image">
                  <img src={assetPath(item.image)} alt={item.alt} width={1536} height={1024} loading="lazy" decoding="async" />
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

          <PageNavCards items={navCards} columns={3} />
        </Container>
      </Section>
    </>
  );
}
