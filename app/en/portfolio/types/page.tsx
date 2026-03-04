/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig, getTypes } from "@/lib/content/loaders";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { thst } from "@/lib/i18n-home-stair-types";
import { thpt } from "@/lib/i18n-portfolio-types";
import { assetPath } from "@/lib/paths";
import { absoluteUrl, breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();
const LOCALE: Locale = "en";
const tr = (key: Parameters<typeof thpt>[0]) => thpt(key, LOCALE);

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/en/portfolio/types",
  title: `${tr("meta_title")} | ${site.brand.name}`,
  description: tr("meta_description")
});

export default function TypesPageEn() {
  const types = getTypes();
  const visualTypes = [
    {
      href: "/portfolio/types/monolitnaya-lestnitsa",
      icon: "/assets/catalog/catalog-1.png",
      width: 157,
      height: 133,
      alt: thst("type_1_alt", undefined, LOCALE),
      title: thst("type_1_title", undefined, LOCALE),
      description: tr("type_1_desc")
    },
    {
      href: "/portfolio/types/monolitnaya-lestnitsa",
      icon: "/assets/catalog/catalog-2.png",
      width: 157,
      height: 188,
      alt: thst("type_2_alt", undefined, LOCALE),
      title: thst("type_2_title", undefined, LOCALE),
      description: tr("type_2_desc")
    },
    {
      href: "/portfolio/types/p-obraznaya-lestnitsa",
      icon: "/assets/catalog/catalog-3.png",
      width: 185,
      height: 152,
      alt: thst("type_3_alt", undefined, LOCALE),
      title: thst("type_3_title", undefined, LOCALE),
      description: tr("type_3_desc")
    },
    {
      href: "/portfolio/types/monolitnaya-lestnitsa",
      icon: "/assets/catalog/catalog-4.png",
      width: 139,
      height: 162,
      alt: thst("type_4_alt", undefined, LOCALE),
      title: thst("type_4_title", undefined, LOCALE),
      description: tr("type_4_desc")
    },
    {
      href: "/portfolio/types/p-obraznaya-lestnitsa",
      icon: "/assets/catalog/catalog-5.png",
      width: 181,
      height: 157,
      alt: thst("type_5_alt", undefined, LOCALE),
      title: thst("type_5_title", undefined, LOCALE),
      description: tr("type_5_desc")
    },
    {
      href: "/portfolio/types/paryashchaya-lestnitsa",
      icon: "/assets/catalog/catalog-6.png",
      width: 177,
      height: 171,
      alt: thst("type_6_alt", undefined, LOCALE),
      title: thst("type_6_title", undefined, LOCALE),
      description: tr("type_6_desc")
    },
    {
      href: "/portfolio/types/konsolnaya-lestnitsa",
      icon: "/assets/catalog/catalog-7.png",
      width: 109,
      height: 189,
      alt: thst("type_7_alt", undefined, LOCALE),
      title: thst("type_7_title", undefined, LOCALE),
      description: tr("type_7_desc")
    },
    {
      href: "/portfolio/types/monolitnaya-lestnitsa",
      icon: "/assets/catalog/catalog-8.png",
      width: 179,
      height: 102,
      alt: thst("type_8_alt", undefined, LOCALE),
      title: thst("type_8_title", undefined, LOCALE),
      description: tr("type_8_desc")
    }
  ];
  const breadcrumbs = [
    { name: tr("breadcrumb_home"), href: "/en" },
    { name: tr("breadcrumb_portfolio"), href: "/en/portfolio" },
    { name: tr("breadcrumb_current"), href: "/en/portfolio/types" }
  ];
  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: tr("meta_description"),
    serviceType: tr("meta_title"),
    areaServed: site.coverageRegions
  });
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: tr("schema_name"),
    description: tr("schema_description"),
    url: absoluteUrl(site.baseUrl, "/en/portfolio/types"),
    hasPart: types.map((type) => ({
      "@type": "Service",
      name: t(type.title, undefined, LOCALE),
      description: t(type.shortDescription, undefined, LOCALE),
      url: absoluteUrl(site.baseUrl, `/portfolio/types/${type.slug}`)
    }))
  };

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={collectionSchema} />

      <section className="section section-dark" id="types">
        <Container>
          <nav aria-label="Breadcrumbs" className="portfolio-breadcrumbs text-sm text-ink-soft">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/en" className="hover:text-ink">
                  {tr("breadcrumb_home")}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/en/portfolio" className="hover:text-ink">
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
            <p>{tr("story_p_3")}</p>
          </div>

          <div className="portfolio-types-grid">
            {visualTypes.map((type, index) => (
              <Link
                key={type.title}
                href={type.href}
                className="portfolio-type-card"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="portfolio-type-media">
                  <img src={assetPath(type.icon)} alt={type.alt} width={type.width} height={type.height} loading="lazy" decoding="async" />
                </div>
                <div className="portfolio-type-body">
                  <div className="portfolio-type-topline">
                    <span>{tr("card_tag")}</span>
                  </div>
                  <h3>{type.title}</h3>
                  <p>{type.description}</p>
                  <strong>{tr("card_cta")}</strong>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <Section className="section-accent master-projects-section">
        <Container>
          <div className="portfolio-bottom-cta">
            <p>{tr("bottom_note")}</p>
            <Link href="/contacts" className="btn btn-small">
              {tr("bottom_cta")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
