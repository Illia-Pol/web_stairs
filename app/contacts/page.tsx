import Link from "next/link";
import Script from "next/script";

import { JsonLd } from "@/components/JsonLd";
import { LeadCaptureSection } from "@/components/sections/LeadCaptureSection";
import { Container, Section } from "@/components/ui/Section";
import { getGeoPages, getSiteConfig } from "@/lib/content/loaders";
import { t, type Locale } from "@/lib/i18n";
import { thc } from "@/lib/i18n-contacts";
import { assetPath } from "@/lib/paths";
import { breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();
const LOCALE: Locale = "ru";
const tr = (key: Parameters<typeof thc>[0]) => thc(key, LOCALE);

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/contacts",
  title: `${tr("meta_title")} | ${site.brand.name}`,
  description: tr("meta_description")
});

export default function ContactsPage() {
  const cities = getGeoPages();
  const breadcrumbs = [
    { name: tr("breadcrumb_home"), href: "/" },
    { name: tr("breadcrumb_current"), href: "/contacts" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

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
        </Container>
      </Section>

      <LeadCaptureSection site={site} locale={LOCALE} source="contacts_page_form" />
      <Section className="section-dark">
        <Container>
          <article className="guarantee-card">
            <h2>{tr("geo_title")}</h2>
            <p className="section-note">{tr("geo_note")}</p>
            <ul className="contacts-city-list">
              {cities.map((city) => (
                <li key={city.slug}>
                  {t(city.city, undefined, LOCALE)}
                </li>
              ))}
            </ul>
          </article>
        </Container>
      </Section>
      <Script src={assetPath("/assets/js/home-main.js")} strategy="afterInteractive" />
    </>
  );
}
