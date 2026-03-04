/* eslint-disable @next/next/no-img-element */
import Script from "next/script";

import { HomePricesSection } from "@/components/home/HomePricesSection";
import { JsonLd } from "@/components/JsonLd";
import { LeadCaptureSection } from "@/components/sections/LeadCaptureSection";
import { getSiteConfig } from "@/lib/content/loaders";
import { thg } from "@/lib/i18n-home-guarantee";
import { thh } from "@/lib/i18n-home-hero";
import { thmi } from "@/lib/i18n-home-more-info";
import { thst } from "@/lib/i18n-home-stair-types";
import { thp } from "@/lib/i18n-home-portfolio";
import { assetPath } from "@/lib/paths";
import { createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

const projects = [
  {
    image: "/assets/portfolio/portfolio-1.jpg",
    alt: thp("project_1_alt"),
    title: thp("project_1_title"),
    text: thp("project_1_text")
  },
  {
    image: "/assets/portfolio/portfolio-2.jpg",
    alt: thp("project_2_alt"),
    title: thp("project_2_title"),
    text: thp("project_2_text")
  },
  {
    image: "/assets/portfolio/portfolio-3.jpg",
    alt: thp("project_3_alt"),
    title: thp("project_3_title"),
    text: thp("project_3_text")
  },
  {
    image: "/assets/portfolio/portfolio-4.jpg",
    alt: thp("project_4_alt"),
    title: thp("project_4_title"),
    text: thp("project_4_text")
  },
  {
    image: "/assets/portfolio/portfolio-5.jpg",
    alt: thp("project_5_alt"),
    title: thp("project_5_title"),
    text: thp("project_5_text")
  },
  {
    image: "/assets/portfolio/portfolio-6.jpg",
    alt: thp("project_6_alt"),
    title: thp("project_6_title"),
    text: thp("project_6_text")
  }
];

const types = [
  {
    icon: "/assets/catalog/catalog-1.png",
    alt: thst("type_1_alt"),
    title: thst("type_1_title"),
    gallery: ["/assets/catalog-gallery/straight/1.jpg", "/assets/catalog-gallery/straight/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-2.png",
    alt: thst("type_2_alt"),
    title: thst("type_2_title"),
    gallery: ["/assets/catalog-gallery/g-shaped-landing/1.jpg", "/assets/catalog-gallery/g-shaped-landing/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-3.png",
    alt: thst("type_3_alt"),
    title: thst("type_3_title"),
    gallery: ["/assets/catalog-gallery/u-shaped-landing/1.jpg", "/assets/catalog-gallery/u-shaped-landing/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-4.png",
    alt: thst("type_4_alt"),
    title: thst("type_4_title"),
    gallery: ["/assets/catalog-gallery/g-shaped-winder/1.jpg", "/assets/catalog-gallery/g-shaped-winder/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-5.png",
    alt: thst("type_5_alt"),
    title: thst("type_5_title"),
    gallery: ["/assets/catalog-gallery/u-shaped-winder/1.jpg", "/assets/catalog-gallery/u-shaped-winder/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-6.png",
    alt: thst("type_6_alt"),
    title: thst("type_6_title"),
    gallery: ["/assets/catalog-gallery/half-spiral/1.jpg", "/assets/catalog-gallery/half-spiral/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-7.png",
    alt: thst("type_7_alt"),
    title: thst("type_7_title"),
    gallery: ["/assets/catalog-gallery/spiral/1.jpg", "/assets/catalog-gallery/spiral/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-8.png",
    alt: thst("type_8_alt"),
    title: thst("type_8_title"),
    gallery: ["/assets/catalog-gallery/porch/1.jpg", "/assets/catalog-gallery/porch/2.jpg"]
  }
];

const infoLinks = [
  {
    title: thmi("info_1_title"),
    text: thmi("info_1_text"),
    href: "/questions"
  },
  {
    title: thmi("info_2_title"),
    text: thmi("info_2_text"),
    href: "/questions/faq"
  },
  {
    title: thmi("info_3_title"),
    text: thmi("info_3_text"),
    href: "/questions/problems"
  },
  {
    title: thmi("info_4_title"),
    text: thmi("info_4_text"),
    href: "/vlog/process"
  },
  {
    title: thmi("info_5_title"),
    text: thmi("info_5_text"),
    href: "/vlog/projects"
  },
  {
    title: thmi("info_6_title"),
    text: thmi("info_6_text"),
    href: "/vlog/articles"
  }
];

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/",
  title: "Бетонные Лестницы | Индивидуальное производство",
  description: "Проектируем и изготавливаем бетонные лестницы любой сложности: парящие ступени, консольные решения, частные и коммерческие объекты."
});

export default function HomePage() {
  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: "Проектируем и изготавливаем бетонные лестницы любой сложности: парящие ступени, консольные решения, частные и коммерческие объекты.",
    serviceType: "Бетонные лестницы под заказ",
    areaServed: site.coverageRegions
  });

  return (
    <>
      <JsonLd data={serviceSchema} />

      <section className="hero" id="hero">
        <div className="hero-slider" aria-hidden="true">
          <img src={assetPath("/assets/slider/slider-1.jpeg")} alt="" />
          <img src={assetPath("/assets/slider/slider-2.jpeg")} alt="" />
          <img src={assetPath("/assets/slider/slider-3.jpeg")} alt="" />
          <img src={assetPath("/assets/slider/slider-4.jpeg")} alt="" />
          <img src={assetPath("/assets/slider/slider-5.jpeg")} alt="" />
        </div>
        <div className="hero-overlay" aria-hidden="true" />

        <div className="container hero-grid">
          <div className="hero-copy reveal-up">
            <p className="kicker">{thh("kicker")}</p>
            <h1>{thh("title_line_1")}<br />{thh("title_line_2")}</h1>
            <p className="lead">{thh("lead")}</p>
            <div className="hero-cta">
              <a className="btn" href="#contact">{thh("cta_primary")}</a>
              <a className="btn btn-ghost" href="#projects">{thh("cta_secondary")}</a>
            </div>
            <div className="trust-strip">
              <div>
                <strong>{thh("stat_1_value")}</strong>
                <span>{thh("stat_1_label")}</span>
              </div>
              <div>
                <strong>{thh("stat_2_value")}</strong>
                <span>{thh("stat_2_label")}</span>
              </div>
              <div>
                <strong>{thh("stat_3_value")}</strong>
                <span>{thh("stat_3_label")}</span>
              </div>
            </div>
          </div>

          <aside className="hero-panel reveal-up delay-1">
            <h2>{thh("panel_title")}</h2>
            <ul>
              <li>{thh("panel_item_1")}</li>
              <li>{thh("panel_item_2")}</li>
              <li>{thh("panel_item_3")}</li>
              <li>{thh("panel_item_4")}</li>
            </ul>
            <p className="panel-note">{thh("panel_note")}</p>
            <a className="btn full" href="#contact">{thh("panel_cta")}</a>
          </aside>
        </div>
      </section>

      <section className="section section-dark" id="projects">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">{thp("section_kicker")}</p>
            <h2>{thp("section_title")}</h2>
            <p className="section-note">{thp("section_note")}</p>
          </div>
          <div className="project-grid project-grid-home">
            {projects.map((project, index) => (
              <article key={project.title} className={`project-card reveal-up ${index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : ""}`.trim()}>
                <div className="project-image">
                  <img src={assetPath(project.image)} alt={project.alt} loading="lazy" />
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
              {thp("footer_line_start")}{" "}
              <a className="inline-link" href="/portfolio/projects">{thp("footer_link_projects")}</a>,{" "}
              {thp("footer_line_middle")}{" "}
              <a className="inline-link" href="/vlog/projects">{thp("footer_link_vlog")}</a>{" "}
              {thp("footer_line_end")}{" "}
              <a className="inline-link" href="https://www.instagram.com/betostep?igsh=cGQ0MjBzNzJ6cXlv" target="_blank" rel="noreferrer">{thp("footer_link_instagram")}</a>.
            </p>
          </div>
          <p className="portfolio-auth-note reveal-up">{thp("auth_note")}</p>
        </div>
      </section>

      <section className="section section-dark" id="types">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">{thst("types_kicker")}</p>
            <h2>{thst("types_title")}</h2>
            <p className="section-note">{thst("types_note")}</p>
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
                  data-open-label={thst("open_photo_button")}
                >
                  <div className="type-media">
                    <img src={assetPath(type.icon)} alt={type.alt} loading="eager" decoding="sync" />
                    <div className="type-hotspots" role="group" aria-label={thst("modal_zone_aria")}>
                      <button className="type-zone" type="button" data-index="1" aria-label={thst("modal_photo_1_aria")} />
                      <button className="type-zone" type="button" data-index="2" aria-label={thst("modal_photo_2_aria")} />
                    </div>
                  </div>
                  <h3>{type.title}</h3>
                  <div className="type-dots" aria-label={thst("modal_dot_aria")}>
                    <button className="dot" type="button" data-index="1" aria-label={thst("modal_photo_1_aria")} />
                    <button className="dot" type="button" data-index="2" aria-label={thst("modal_photo_2_aria")} />
                  </div>
                </article>
              );
            })}
          </div>
          <p className="types-note reveal-up">{thst("types_hint")}</p>
        </div>
      </section>

      <div className="catalog-modal" id="catalog-modal" aria-hidden="true">
        <div className="catalog-modal__backdrop" data-close="true" />
        <div className="catalog-modal__dialog" role="dialog" aria-modal="true" aria-label={thst("modal_aria_label")}>
          <button className="catalog-modal__close" type="button" data-close="true" aria-label={thst("modal_close_aria")}>×</button>
          <div className="catalog-modal__media">
            <button className="catalog-modal__nav" type="button" id="catalog-prev" aria-label={thst("modal_prev_aria")}>‹</button>
            <img id="catalog-modal-image" src="" alt={thst("modal_image_alt")} />
            <button className="catalog-modal__nav" type="button" id="catalog-next" aria-label={thst("modal_next_aria")}>›</button>
          </div>
          <p className="catalog-modal__caption" id="catalog-caption" />
        </div>
      </div>

      <HomePricesSection locale="ru" />

      <section className="section section-accent" id="guarantee">
        <div className="container guarantee-wrap">
          <article className="guarantee-card reveal-up">
            <p className="kicker">{thg("guarantee_kicker")}</p>
            <h2>{thg("guarantee_title")}</h2>
            <p>{thg("guarantee_lead")}</p>
            <ul className="guarantee-list">
              <li>{thg("guarantee_item_1", { WARRANTY_TERM: site.warrantyTerm })}</li>
              <li>{thg("guarantee_item_2")}</li>
              <li>{thg("guarantee_item_3")}</li>
              <li>{thg("guarantee_item_4")}</li>
            </ul>
            <a className="btn btn-small" href="/prices/guarantee">{thg("guarantee_button")}</a>
          </article>

          <div className="master-photo-card reveal-up delay-1">
            <div className="master-photo">
              <img src={assetPath("/assets/master.jpg")} alt={thg("master_alt")} />
            </div>
            <div className="master-bio">
              <h3>{thg("master_name")}</h3>
              <p>{thg("master_bio")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="more-info">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">{thmi("more_info_kicker")}</p>
            <h2>{thmi("more_info_title")}</h2>
            <p className="section-note">{thmi("more_info_note")}</p>
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
      <LeadCaptureSection site={site} locale="ru" source="home_form" />

      <Script src={assetPath("/assets/js/home-main.js")} strategy="afterInteractive" />
    </>
  );
}
