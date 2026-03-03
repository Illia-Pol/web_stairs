/* eslint-disable @next/next/no-img-element */
import Script from "next/script";

import { HomePricesSection } from "@/components/home/HomePricesSection";
import { JsonLd } from "@/components/JsonLd";
import { getSiteConfig } from "@/lib/content/loaders";
import { thg } from "@/lib/i18n-home-guarantee";
import { thh } from "@/lib/i18n-home-hero";
import { thm } from "@/lib/i18n-home-main";
import { thmi } from "@/lib/i18n-home-more-info";
import { thst } from "@/lib/i18n-home-stair-types";
import { thp } from "@/lib/i18n-home-portfolio";
import type { Locale } from "@/lib/i18n";
import { assetPath } from "@/lib/paths";
import { createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();
const LOCALE: Locale = "en";

const trh = (key: Parameters<typeof thh>[0]) => thh(key, LOCALE);
const trm = (key: Parameters<typeof thm>[0], tokens?: Record<string, string | number>) => thm(key, tokens, LOCALE);
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
    alt: trst("type_1_alt"),
    title: trst("type_1_title"),
    gallery: ["/assets/catalog-gallery/straight/1.jpg", "/assets/catalog-gallery/straight/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-2.png",
    alt: trst("type_2_alt"),
    title: trst("type_2_title"),
    gallery: ["/assets/catalog-gallery/g-shaped-landing/1.jpg", "/assets/catalog-gallery/g-shaped-landing/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-3.png",
    alt: trst("type_3_alt"),
    title: trst("type_3_title"),
    gallery: ["/assets/catalog-gallery/u-shaped-landing/1.jpg", "/assets/catalog-gallery/u-shaped-landing/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-4.png",
    alt: trst("type_4_alt"),
    title: trst("type_4_title"),
    gallery: ["/assets/catalog-gallery/g-shaped-winder/1.jpg", "/assets/catalog-gallery/g-shaped-winder/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-5.png",
    alt: trst("type_5_alt"),
    title: trst("type_5_title"),
    gallery: ["/assets/catalog-gallery/u-shaped-winder/1.jpg", "/assets/catalog-gallery/u-shaped-winder/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-6.png",
    alt: trst("type_6_alt"),
    title: trst("type_6_title"),
    gallery: ["/assets/catalog-gallery/half-spiral/1.jpg", "/assets/catalog-gallery/half-spiral/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-7.png",
    alt: trst("type_7_alt"),
    title: trst("type_7_title"),
    gallery: ["/assets/catalog-gallery/spiral/1.jpg", "/assets/catalog-gallery/spiral/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-8.png",
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
          <img src={assetPath("/assets/slider/slider-1.jpeg")} alt="" />
          <img src={assetPath("/assets/slider/slider-2.jpeg")} alt="" />
          <img src={assetPath("/assets/slider/slider-3.jpeg")} alt="" />
          <img src={assetPath("/assets/slider/slider-4.jpeg")} alt="" />
          <img src={assetPath("/assets/slider/slider-5.jpeg")} alt="" />
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
              {trp("footer_line_start")}{" "}
              <a className="inline-link" href="/portfolio/projects">{trp("footer_link_projects")}</a>,{" "}
              {trp("footer_line_middle")}{" "}
              <a className="inline-link" href="/vlog/projects">{trp("footer_link_vlog")}</a>{" "}
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
                    <img src={assetPath(type.icon)} alt={type.alt} loading="eager" decoding="sync" />
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
            <img id="catalog-modal-image" src="" alt={trst("modal_image_alt")} />
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
            <a className="btn btn-small" href="/prices/guarantee">{trg("guarantee_button")}</a>
          </article>

          <div className="master-photo-card reveal-up delay-1">
            <div className="master-photo">
              <img src={assetPath("/assets/master.jpg")} alt={trg("master_alt")} />
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

      <section className="section section-accent" id="contact">
        <div className="container contact-grid">
          <div className="reveal-up">
            <p className="kicker">{trm("contact_kicker")}</p>
            <h2 className="contact-title">{trm("contact_title")}</h2>
            <p>{trm("contact_text")}</p>
            <div className="contact-links">
              <a id="phone-link" className="btn btn-small contact-link-btn" href="tel:+375296512022">+375 (29) 651 20 22</a>
              <a id="telegram-link" className="btn btn-small contact-link-btn" href="https://t.me/Sokolmaxxx" target="_blank" rel="noreferrer">Telegram</a>
              <a id="whatsapp-link" className="btn btn-small contact-link-btn" href="https://wa.me/375296512022" target="_blank" rel="noreferrer">WhatsApp</a>
              <a id="viber-link" className="btn btn-small contact-link-btn" href="viber://chat?number=%2B375296512022">Viber</a>
              <a id="instagram-link" className="btn btn-small contact-link-btn" href="https://www.instagram.com/betostep?igsh=cGQ0MjBzNzJ6cXlv" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>

          <form
            className="lead-form reveal-up delay-1"
            id="lead-form"
            noValidate
            data-lead-endpoint={site.leadEndpoint}
            data-telegram-fallback-username={site.telegramFallback.username}
            data-telegram-fallback-url={site.telegramFallback.url}
            data-telegram-fallback-mode={site.telegramFallbackMode}
            data-msg-remove-photo-aria={trm("form_msg_remove_photo_aria")}
            data-msg-photo-added={trm("form_msg_photo_added")}
            data-msg-photo-invalid-type={trm("form_msg_photo_invalid_type")}
            data-msg-photo-too-large={trm("form_msg_photo_too_large")}
            data-msg-photo-max-count={trm("form_msg_photo_max_count")}
            data-msg-name-required={trm("form_msg_name_required")}
            data-msg-phone-required={trm("form_msg_phone_required")}
            data-msg-phone-invalid={trm("form_msg_phone_invalid")}
            data-msg-region-required={trm("form_msg_region_required")}
            data-msg-lead-title={trm("form_msg_lead_title")}
            data-msg-lead-name={trm("form_msg_lead_name")}
            data-msg-lead-phone={trm("form_msg_lead_phone")}
            data-msg-lead-region={trm("form_msg_lead_region")}
            data-msg-lead-comment={trm("form_msg_lead_comment")}
            data-msg-lead-files={trm("form_msg_lead_files")}
            data-msg-submit-success={trm("form_msg_submit_success")}
            data-msg-submit-error={trm("form_msg_submit_error")}
            data-msg-submit-fallback-btn={trm("form_msg_submit_fallback_btn")}
            data-msg-submit-copy-btn={trm("form_msg_submit_copy_btn")}
            data-msg-submit-copy-success={trm("form_msg_submit_copy_success")}
            data-msg-submit-sending={trm("form_msg_submit_sending")}
            data-msg-submit-default={trm("form_msg_submit_default")}
          >
            <label className="field">
              <span className="field-label">{trm("form_name")}</span>
              <input type="text" id="name" required />
              <span className="field-error" aria-live="polite" />
            </label>
            <label className="field">
              <span className="field-label">{trm("form_phone")}</span>
              <div className="phone-input-row">
                <select id="phone-code" aria-label="Код страны">
                  <option value="+375" defaultValue="+375">{trm("form_country_by")}</option>
                  <option value="+7">{trm("form_country_ru")}</option>
                  <option value="+48">{trm("form_country_pl")}</option>
                  <option value="+370">{trm("form_country_lt")}</option>
                  <option value="+371">{trm("form_country_lv")}</option>
                </select>
                <input type="tel" id="phone" required inputMode="tel" autoComplete="tel-national" placeholder={trm("form_phone_placeholder")} pattern="[\d\s()\-]{6,20}" title={trm("form_phone_title")} />
              </div>
              <span className="field-error" aria-live="polite" />
            </label>
            <label className="field">
              <span className="field-label">{trm("form_region")}</span>
              <input type="text" id="region" required />
              <span className="field-error" aria-live="polite" />
            </label>
            <label>
              {trm("form_message")}
              <textarea id="message" rows={4} placeholder={trm("form_message_placeholder")} />
            </label>
            <input id="honeypot" className="honeypot-field" type="text" autoComplete="off" tabIndex={-1} aria-hidden="true" />
            <div className="photo-picker-row">
              <input id="photo-files" className="photo-input" type="file" accept="image/*" multiple />
              <button type="button" className="photo-add-tile" id="photo-add-btn" aria-label={trm("form_add_photo_aria")}>
                +
              </button>
              <div className="photo-preview-strip" id="photo-preview-strip" aria-live="polite" />
            </div>
            <p className="photo-picker-note">{trm("form_add_photo_hint")}</p>
            <p className="photo-picker-status" id="photo-picker-status" aria-live="polite" />
            <div className="lead-form-actions">
              <button type="submit" className="btn full">{trm("form_submit")}</button>
            </div>
            <div className="lead-submit-status" id="lead-submit-status" aria-live="polite" />
            <p className="form-note">{trm("form_policy_prefix")} <a className="inline-link" href="/privacy">{trm("form_policy_link")}</a>.</p>
          </form>
        </div>
      </section>

      <Script src={assetPath("/assets/js/home-main.js")} strategy="afterInteractive" />
    </>
  );
}
