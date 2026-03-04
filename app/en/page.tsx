/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import { HomePricesSection } from "@/components/home/HomePricesSection";
import { JsonLd } from "@/components/JsonLd";
import { LeadCaptureSection } from "@/components/sections/LeadCaptureSection";
import { getSiteConfig } from "@/lib/content/loaders";
import { thg } from "@/lib/i18n-home-guarantee";
import { thh } from "@/lib/i18n-home-hero";
import { thmi } from "@/lib/i18n-home-more-info";
import { thst } from "@/lib/i18n-home-stair-types";
import { thp } from "@/lib/i18n-home-portfolio";
import type { Locale } from "@/lib/i18n";
import { assetPath } from "@/lib/paths";
import { createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();
const LOCALE: Locale = "en";

const trh = (key: Parameters<typeof thh>[0]) => thh(key, LOCALE);
const trmi = (key: Parameters<typeof thmi>[0], tokens?: Record<string, string | number>) => thmi(key, tokens, LOCALE);
const trst = (key: Parameters<typeof thst>[0], tokens?: Record<string, string | number>) => thst(key, tokens, LOCALE);
const trp = (key: Parameters<typeof thp>[0]) => thp(key, LOCALE);
const trg = (key: Parameters<typeof thg>[0], tokens?: Record<string, string | number>) => thg(key, tokens, LOCALE);

const projects = [
  {
    image: "/assets/portfolio/portfolio-1.jpg",
    alt: trp("project_1_alt"),
    title: trp("project_1_title"),
    text: trp("project_1_text")
  },
  {
    image: "/assets/portfolio/portfolio-2.jpg",
    alt: trp("project_2_alt"),
    title: trp("project_2_title"),
    text: trp("project_2_text")
  },
  {
    image: "/assets/portfolio/portfolio-3.jpg",
    alt: trp("project_3_alt"),
    title: trp("project_3_title"),
    text: trp("project_3_text")
  },
  {
    image: "/assets/portfolio/portfolio-4.jpg",
    alt: trp("project_4_alt"),
    title: trp("project_4_title"),
    text: trp("project_4_text")
  },
  {
    image: "/assets/portfolio/portfolio-5.jpg",
    alt: trp("project_5_alt"),
    title: trp("project_5_title"),
    text: trp("project_5_text")
  },
  {
    image: "/assets/portfolio/portfolio-6.jpg",
    alt: trp("project_6_alt"),
    title: trp("project_6_title"),
    text: trp("project_6_text")
  }
];

const types = [
  {
    icon: "/assets/catalog/catalog-1.png",
    width: 157,
    height: 133,
    alt: trst("type_1_alt"),
    title: trst("type_1_title"),
    gallery: ["/assets/catalog-gallery/straight/1.jpg", "/assets/catalog-gallery/straight/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-2.png",
    width: 157,
    height: 188,
    alt: trst("type_2_alt"),
    title: trst("type_2_title"),
    gallery: ["/assets/catalog-gallery/g-shaped-landing/1.jpg", "/assets/catalog-gallery/g-shaped-landing/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-3.png",
    width: 185,
    height: 152,
    alt: trst("type_3_alt"),
    title: trst("type_3_title"),
    gallery: ["/assets/catalog-gallery/u-shaped-landing/1.jpg", "/assets/catalog-gallery/u-shaped-landing/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-4.png",
    width: 139,
    height: 162,
    alt: trst("type_4_alt"),
    title: trst("type_4_title"),
    gallery: ["/assets/catalog-gallery/g-shaped-winder/1.jpg", "/assets/catalog-gallery/g-shaped-winder/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-5.png",
    width: 181,
    height: 157,
    alt: trst("type_5_alt"),
    title: trst("type_5_title"),
    gallery: ["/assets/catalog-gallery/u-shaped-winder/1.jpg", "/assets/catalog-gallery/u-shaped-winder/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-6.png",
    width: 177,
    height: 171,
    alt: trst("type_6_alt"),
    title: trst("type_6_title"),
    gallery: ["/assets/catalog-gallery/half-spiral/1.jpg", "/assets/catalog-gallery/half-spiral/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-7.png",
    width: 109,
    height: 189,
    alt: trst("type_7_alt"),
    title: trst("type_7_title"),
    gallery: ["/assets/catalog-gallery/spiral/1.jpg", "/assets/catalog-gallery/spiral/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-8.png",
    width: 179,
    height: 102,
    alt: trst("type_8_alt"),
    title: trst("type_8_title"),
    gallery: ["/assets/catalog-gallery/porch/1.jpg", "/assets/catalog-gallery/porch/2.jpg"]
  }
];

const infoLinks = [
  {
    title: trmi("info_1_title"),
    text: trmi("info_1_text"),
    href: "/questions"
  },
  {
    title: trmi("info_2_title"),
    text: trmi("info_2_text"),
    href: "/questions/faq"
  },
  {
    title: trmi("info_3_title"),
    text: trmi("info_3_text"),
    href: "/questions/problems"
  },
  {
    title: trmi("info_4_title"),
    text: trmi("info_4_text"),
    href: "/vlog/process"
  },
  {
    title: trmi("info_5_title"),
    text: trmi("info_5_text"),
    href: "/vlog/projects"
  },
  {
    title: trmi("info_6_title"),
    text: trmi("info_6_text"),
    href: "/vlog/articles"
  }
];

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/en",
  title: "Concrete Staircases | Custom Production",
  description: "Design and production of monolithic concrete staircases: floating, cantilever, and custom solutions for private and commercial projects."
});

export default function HomePageEn() {
  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: "Design and production of monolithic concrete staircases: floating, cantilever, and custom solutions for private and commercial projects.",
    serviceType: "Custom concrete staircases",
    areaServed: site.coverageRegions
  });

  return (
    <>
      <JsonLd data={serviceSchema} />

      <section className="hero" id="hero">
        <div className="hero-slider" aria-hidden="true">
          <img src={assetPath("/assets/slider/slider-1.jpeg")} alt="" width={1600} height={586} loading="eager" fetchPriority="high" decoding="async" />
          <img src={assetPath("/assets/slider/slider-2.jpeg")} alt="" width={1600} height={622} loading="lazy" decoding="async" />
          <img src={assetPath("/assets/slider/slider-3.jpeg")} alt="" width={1600} height={666} loading="lazy" decoding="async" />
          <img src={assetPath("/assets/slider/slider-4.jpeg")} alt="" width={1600} height={618} loading="lazy" decoding="async" />
          <img src={assetPath("/assets/slider/slider-5.jpeg")} alt="" width={1600} height={668} loading="lazy" decoding="async" />
        </div>
        <div className="hero-overlay" aria-hidden="true" />

        <div className="container hero-grid">
          <div className="hero-copy reveal-up">
            <p className="kicker">{trh("kicker")}</p>
            <h1>{trh("title_line_1")}<br />{trh("title_line_2")}</h1>
            <p className="lead">{trh("lead")}</p>
            <div className="hero-cta">
              <a className="btn" href="#contact">{trh("cta_primary")}</a>
              <a className="btn btn-ghost" href="#projects">{trh("cta_secondary")}</a>
            </div>
            <div className="trust-strip">
              <div>
                <strong>{trh("stat_1_value")}</strong>
                <span>{trh("stat_1_label")}</span>
              </div>
              <div>
                <strong>{trh("stat_2_value")}</strong>
                <span>{trh("stat_2_label")}</span>
              </div>
              <div>
                <strong>{trh("stat_3_value")}</strong>
                <span>{trh("stat_3_label")}</span>
              </div>
            </div>
          </div>

          <aside className="hero-panel reveal-up delay-1">
            <h2>{trh("panel_title")}</h2>
            <ul>
              <li>{trh("panel_item_1")}</li>
              <li>{trh("panel_item_2")}</li>
              <li>{trh("panel_item_3")}</li>
              <li>{trh("panel_item_4")}</li>
            </ul>
            <p className="panel-note">{trh("panel_note")}</p>
            <a className="btn full" href="#contact">{trh("panel_cta")}</a>
          </aside>
        </div>
      </section>

      <section className="section section-dark" id="projects">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">{trp("section_kicker")}</p>
            <h2>{trp("section_title")}</h2>
            <p className="section-note">{trp("section_note")}</p>
          </div>
          <div className="project-grid project-grid-home">
            {projects.map((project, index) => (
              <article key={project.title} className={`project-card reveal-up ${index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : ""}`.trim()}>
                <div className="project-image">
                  <img src={assetPath(project.image)} alt={project.alt} width={1536} height={1024} loading="lazy" decoding="async" />
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="portfolio-footer reveal-up">
            <p>
              {trp("footer_line_start")}{" "}
              <Link className="inline-link" href="/en/portfolio/projects">{trp("footer_link_projects")}</Link>,{" "}
              {trp("footer_line_middle")}{" "}
              <Link className="inline-link" href="/vlog/projects">{trp("footer_link_vlog")}</Link>{" "}
              {trp("footer_line_end")}{" "}
              <a className="inline-link" href="https://www.instagram.com/betostep?igsh=cGQ0MjBzNzJ6cXlv" target="_blank" rel="noreferrer">{trp("footer_link_instagram")}</a>.
            </p>
          </div>
          <p className="portfolio-auth-note reveal-up">{trp("auth_note")}</p>
        </div>
      </section>

      <section className="section section-dark" id="types">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">{trst("types_kicker")}</p>
            <h2>{trst("types_title")}</h2>
            <p className="section-note">{trst("types_note")}</p>
          </div>
          <div className="types-grid">
            {types.map((type, index) => {
              const gallery = type.gallery.map((item) => assetPath(item)).join("|");
              return (
                <article
                  key={type.title}
                  className="type-card reveal-up"
                  style={{ transitionDelay: `${index * 0.12}s` }}
                  data-icon={assetPath(type.icon)}
                  data-gallery={gallery}
                  data-open-label={trst("open_photo_button")}
                >
                  <div className="type-media">
                    <img src={assetPath(type.icon)} alt={type.alt} width={type.width} height={type.height} loading="lazy" decoding="async" />
                    <div className="type-hotspots" role="group" aria-label={trst("modal_zone_aria")}>
                      <button className="type-zone" type="button" data-index="1" aria-label={trst("modal_photo_1_aria")} />
                      <button className="type-zone" type="button" data-index="2" aria-label={trst("modal_photo_2_aria")} />
                    </div>
                  </div>
                  <h3>{type.title}</h3>
                  <div className="type-dots" aria-label={trst("modal_dot_aria")}>
                    <button className="dot" type="button" data-index="1" aria-label={trst("modal_photo_1_aria")} />
                    <button className="dot" type="button" data-index="2" aria-label={trst("modal_photo_2_aria")} />
                  </div>
                </article>
              );
            })}
          </div>
          <p className="types-note reveal-up">{trst("types_hint")}</p>
        </div>
      </section>

      <div className="catalog-modal" id="catalog-modal" aria-hidden="true">
        <div className="catalog-modal__backdrop" data-close="true" />
        <div className="catalog-modal__dialog" role="dialog" aria-modal="true" aria-label={trst("modal_aria_label")}>
          <button className="catalog-modal__close" type="button" data-close="true" aria-label={trst("modal_close_aria")}>×</button>
          <div className="catalog-modal__media">
            <button className="catalog-modal__nav" type="button" id="catalog-prev" aria-label={trst("modal_prev_aria")}>‹</button>
            <img
              id="catalog-modal-image"
              src={assetPath("/assets/portfolio/portfolio-1.jpg")}
              alt={trst("modal_image_alt")}
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
            />
            <button className="catalog-modal__nav" type="button" id="catalog-next" aria-label={trst("modal_next_aria")}>›</button>
          </div>
          <p className="catalog-modal__caption" id="catalog-caption" />
        </div>
      </div>

      <HomePricesSection locale="en" />

      <section className="section section-accent" id="guarantee">
        <div className="container guarantee-wrap">
          <article className="guarantee-card reveal-up">
            <p className="kicker">{trg("guarantee_kicker")}</p>
            <h2>{trg("guarantee_title")}</h2>
            <p>{trg("guarantee_lead")}</p>
            <ul className="guarantee-list">
              <li>{trg("guarantee_item_1", { WARRANTY_TERM: site.warrantyTerm })}</li>
              <li>{trg("guarantee_item_2")}</li>
              <li>{trg("guarantee_item_3")}</li>
              <li>{trg("guarantee_item_4")}</li>
            </ul>
            <Link className="btn btn-small" href="/prices/guarantee">{trg("guarantee_button")}</Link>
          </article>

          <div className="master-photo-card reveal-up delay-1">
            <div className="master-photo">
              <img src={assetPath("/assets/master.jpg")} alt={trg("master_alt")} width={1536} height={1024} loading="lazy" decoding="async" />
            </div>
            <div className="master-bio">
              <h3>{trg("master_name")}</h3>
              <p>{trg("master_bio")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="more-info">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">{trmi("more_info_kicker")}</p>
            <h2>{trmi("more_info_title")}</h2>
            <p className="section-note">{trmi("more_info_note")}</p>
          </div>

          <div className="info-grid">
            {infoLinks.map((item, index) => (
              <a
                key={item.title}
                className={`info-card info-card-link reveal-up ${index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : ""}`.trim()}
                href={item.href}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <LeadCaptureSection site={site} locale="en" source="home_form_en" />

    </>
  );
}
