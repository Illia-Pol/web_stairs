/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import type { Locale } from "@/lib/i18n";
import { thpm } from "@/lib/i18n-portfolio-master";
import { assetPath } from "@/lib/paths";
import { absoluteUrl, breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();
const LOCALE: Locale = "en";
const tr = (key: Parameters<typeof thpm>[0], tokens?: Record<string, string | number>) =>
  thpm(key, tokens, LOCALE);

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/en/portfolio/master",
  title: `${tr("meta_title")} | ${site.brand.name}`,
  description: tr("meta_description")
});

export default function PortfolioMasterPageEn() {
  const breadcrumbs = [
    { name: tr("breadcrumb_home"), href: "/en" },
    { name: tr("breadcrumb_portfolio"), href: "/en/portfolio" },
    { name: tr("breadcrumb_current"), href: "/en/portfolio/master" }
  ];
  const quickCards = [
    {
      href: "/vlog/process",
      title: tr("card_process_title"),
      text: tr("card_process_text"),
      cta: tr("card_process_cta")
    },
    {
      href: "/prices/guarantee",
      title: tr("card_guarantee_title"),
      text: tr("card_guarantee_text"),
      cta: tr("card_guarantee_cta")
    },
    {
      href: "/contacts",
      title: tr("card_contacts_title"),
      text: tr("card_contacts_text"),
      cta: tr("card_contacts_cta")
    }
  ];
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.brand.founder,
    description: tr("schema_person_description"),
    worksFor: {
      "@type": "ProfessionalService",
      name: site.brand.name,
      url: absoluteUrl(site.baseUrl, "/")
    }
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: tr("schema_page_name"),
    description: tr("schema_page_description"),
    url: absoluteUrl(site.baseUrl, "/en/portfolio/master")
  };

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={personSchema} />
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
          </div>

          <div className="master-page-grid">
            <article className="master-main-card">
              <div className="master-main-media">
                <img src={assetPath("/assets/master.jpg")} alt={tr("profile_image_alt")} width={1536} height={1024} loading="lazy" decoding="async" />
              </div>
              <div className="master-main-body">
                <h2>{tr("profile_title")}</h2>
                <p className="master-main-lead">
                  {tr("profile_lead", {
                    FOUNDER_NAME: site.brand.founder
                  })}
                </p>
                <ul className="guarantee-list">
                  <li>{tr("profile_point_1")}</li>
                  <li>{tr("profile_point_2")}</li>
                  <li>{tr("profile_point_3")}</li>
                </ul>
                <p className="master-main-lead">{tr("profile_story_note")}</p>
                <Link href="/contacts" className="btn btn-small master-profile-cta">
                  {tr("profile_cta")}
                </Link>
              </div>
            </article>

            <aside>
              <p className="kicker master-side-kicker">{tr("cards_title")}</p>
              <div className="master-side-grid">
                {quickCards.map((card) => (
                  <Link key={card.href} href={card.href} className="master-link-card">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    <span>{card.cta}</span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>

          <div className="info-grid mt-6">
            <article className="guarantee-card">
              <h2>How direct project supervision works</h2>
              <p>
                Every staircase project has critical points where small mistakes create expensive rework. That is why supervision is structured by
                milestones, node checks, and clear acceptance criteria from day one.
              </p>
              <ul className="guarantee-list">
                <li>Input data and opening geometry verification before start</li>
                <li>Control of reinforcement, formwork, and critical structural nodes</li>
                <li>Transparent stage-by-stage communication with the client</li>
                <li>Handover of concrete structure ready for finishing</li>
              </ul>
            </article>
            <article className="guarantee-card">
              <h2>When direct master involvement matters most</h2>
              <p>
                The more complex the object, the more important early engineering decisions become. This is especially true for floating and cantilever
                staircases, non-standard openings, and high-end architectural requirements.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/prices/tariffs/signature" className="btn btn-small">
                  Signature for complex scope
                </Link>
                <Link href="/questions/problems/slozhnye-uzly" className="btn btn-ghost btn-small">
                  Complex node breakdown
                </Link>
              </div>
            </article>
          </div>

          <article className="guarantee-card mt-6">
            <h2>FAQ about the master and project supervision</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                {
                  q: "Who is responsible for final staircase geometry?",
                  a: "The project master is responsible from first technical review to final handover of the concrete structure."
                },
                {
                  q: "Can you join if construction is already in progress?",
                  a: "Yes, but earlier involvement is always better to avoid costly redesign and timeline shifts."
                },
                {
                  q: "What if project inputs change during execution?",
                  a: "Changes are documented, evaluated for budget and timeline impact, and then approved as controlled updates."
                },
                {
                  q: "Is direct supervision only for Signature projects?",
                  a: "No. Both Classic and Signature require supervision, but the depth of engineering control differs."
                },
                {
                  q: "Can we discuss the project remotely first?",
                  a: "Yes. Initial analysis is done from plans/photos, then key decisions are confirmed on verified object data."
                },
                {
                  q: "Where can I see built examples?",
                  a: "Open Projects and Stair Types pages to compare real object constraints and execution quality."
                }
              ].map((faq) => (
                <article key={faq.q} className="info-card">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </article>
              ))}
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
