/* eslint-disable @next/next/no-img-element */
import Script from "next/script";

import { JsonLd } from "@/components/JsonLd";
import { getSiteConfig } from "@/lib/content/loaders";
import { thh } from "@/lib/i18n-home-hero";
import { thm } from "@/lib/i18n-home-main";
import { thst } from "@/lib/i18n-home-stair-types";
import { thp } from "@/lib/i18n-home-portfolio";
import { assetPath } from "@/lib/paths";
import { createPageMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

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

const faqItems = [
  {
    id: "faq-1",
    question: thm("faq_1_question"),
    answer: thm("faq_1_answer")
  },
  {
    id: "faq-2",
    question: thm("faq_2_question"),
    answer: thm("faq_2_answer")
  },
  {
    id: "faq-3",
    question: thm("faq_3_question"),
    answer: thm("faq_3_answer")
  },
  {
    id: "faq-4",
    question: thm("faq_4_question"),
    answer: thm("faq_4_answer")
  }
];

const infoLinks = [
  {
    title: thm("info_1_title"),
    text: thm("info_1_text"),
    href: "/questions"
  },
  {
    title: thm("info_2_title"),
    text: thm("info_2_text"),
    href: "/questions/faq"
  },
  {
    title: thm("info_3_title"),
    text: thm("info_3_text"),
    href: "/questions/problems"
  },
  {
    title: thm("info_4_title"),
    text: thm("info_4_text"),
    href: "/vlog/process"
  },
  {
    title: thm("info_5_title"),
    text: thm("info_5_text"),
    href: "/vlog/projects"
  },
  {
    title: thm("info_6_title"),
    text: thm("info_6_text"),
    href: "/vlog/articles"
  }
];

const priceCards = [
  {
    name: thm("price_classic_name"),
    value: site.pricing.standardFrom,
    note: thm("price_classic_note")
  },
  {
    name: thm("price_mid_name"),
    value: site.pricing.midRange,
    note: thm("price_mid_note")
  },
  {
    name: thm("price_signature_name"),
    value: site.pricing.signatureFrom,
    note: thm("price_signature_note")
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
      <JsonLd data={faqJsonLd(faqItems)} />

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

      <section className="section section-dark" id="prices">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">{thm("prices_kicker")}</p>
            <h2>{thm("prices_title")}</h2>
          </div>

          <div className="prices-wrap">
            <article className="calculator-card reveal-up">
              <p className="kicker">{thm("calculator_kicker")}</p>
              <h3>{thm("calculator_title")}</h3>
              <p>{thm("calculator_note")}</p>
              <a className="btn btn-small" href="/prices/calculator">{thm("calculator_button")}</a>
            </article>

            <div className="price-grid">
              {priceCards.map((card, index) => (
                <article key={card.name} className={`price-card reveal-up ${index === 1 ? "delay-1" : index === 2 ? "delay-2" : ""}`.trim()}>
                  <p className="price-label">{card.name}</p>
                  <p className="price-value">{card.value}</p>
                  <p className="price-note">{card.note}</p>
                </article>
              ))}
            </div>
          </div>

          <p className="price-footnote reveal-up">{thm("prices_footnote")}</p>
        </div>
      </section>

      <section className="section section-dark" id="segments">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">{thm("segments_kicker")}</p>
            <h2>{thm("segments_title")}</h2>
          </div>
          <div className="segment-grid">
            <article className="segment-card reveal-up">
              <h3>{thm("segment_classic_title")}</h3>
              <p className="segment-sub">{thm("segment_classic_subtitle")}</p>
              <ul>
                <li>{thm("segment_classic_item_1")}</li>
                <li>{thm("segment_classic_item_2")}</li>
                <li>{thm("segment_classic_item_3")}</li>
              </ul>
            </article>
            <article className="segment-card featured reveal-up delay-1">
              <h3>{thm("segment_signature_title")}</h3>
              <p className="segment-sub">{thm("segment_signature_subtitle")}</p>
              <ul>
                <li>{thm("segment_signature_item_1")}</li>
                <li>{thm("segment_signature_item_2")}</li>
                <li>{thm("segment_signature_item_3")}</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-accent" id="guarantee">
        <div className="container guarantee-wrap">
          <article className="guarantee-card reveal-up">
            <p className="kicker">{thm("guarantee_kicker")}</p>
            <h2>{thm("guarantee_title")}</h2>
            <p>{thm("guarantee_lead")}</p>
            <ul className="guarantee-list">
              <li>{thm("guarantee_item_1", { WARRANTY_TERM: site.warrantyTerm })}</li>
              <li>{thm("guarantee_item_2")}</li>
              <li>{thm("guarantee_item_3")}</li>
              <li>{thm("guarantee_item_4")}</li>
            </ul>
            <a className="btn btn-small" href="/prices/guarantee">{thm("guarantee_button")}</a>
          </article>

          <div className="master-photo-card reveal-up delay-1">
            <div className="master-photo">
              <img src={assetPath("/assets/master.jpg")} alt={thm("master_alt")} />
            </div>
            <div className="master-bio">
              <h3>{thm("master_name")}</h3>
              <p>{thm("master_bio")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="more-info">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">{thm("more_info_kicker")}</p>
            <h2>{thm("more_info_title")}</h2>
            <p className="section-note">{thm("more_info_note")}</p>
          </div>

          <div className="info-grid">
            {infoLinks.map((item, index) => (
              <article key={item.title} className={`info-card reveal-up ${index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : ""}`.trim()}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a className="inline-link" href={item.href}>{thm("more_info_link_text")}</a>
              </article>
            ))}
          </div>

          <div className="section-head faq-compact-head reveal-up">
            <p className="kicker">{thm("faq_kicker")}</p>
            <h2>{thm("faq_title")}</h2>
          </div>
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <details key={item.id} className={`faq-item reveal-up ${index === 1 ? "delay-1" : index === 2 ? "delay-2" : ""}`.trim()}>
                <summary>{item.question}</summary>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="contact">
        <div className="container contact-grid">
          <div className="reveal-up">
            <p className="kicker">{thm("contact_kicker")}</p>
            <h2>{thm("contact_title")}</h2>
            <p>{thm("contact_text")}</p>
            <div className="contact-links">
              <a id="phone-link" href="tel:+375296512022">+375 (29) 651 20 22</a>
              <a id="telegram-link" href="https://t.me/Sokolmaxxx" target="_blank" rel="noreferrer">Telegram</a>
              <a id="whatsapp-link" href="https://wa.me/375296512022" target="_blank" rel="noreferrer">WhatsApp</a>
              <a id="viber-link" href="viber://chat?number=%2B375296512022">Viber</a>
              <a id="instagram-link" href="https://www.instagram.com/betostep?igsh=cGQ0MjBzNzJ6cXlv" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>

          <form className="lead-form reveal-up delay-1" id="lead-form" noValidate>
            <label className="field">
              <span className="field-label">{thm("form_name")}</span>
              <input type="text" id="name" required />
              <span className="field-error" aria-live="polite" />
            </label>
            <label className="field">
              <span className="field-label">{thm("form_phone")}</span>
              <div className="phone-input-row">
                <select id="phone-code" aria-label="Код страны">
                  <option value="+375" defaultValue="+375">{thm("form_country_by")}</option>
                  <option value="+7">{thm("form_country_ru")}</option>
                  <option value="+48">{thm("form_country_pl")}</option>
                  <option value="+370">{thm("form_country_lt")}</option>
                  <option value="+371">{thm("form_country_lv")}</option>
                </select>
                <input type="tel" id="phone" required inputMode="tel" autoComplete="tel-national" placeholder={thm("form_phone_placeholder")} pattern="[\d\s()\-]{6,20}" title={thm("form_phone_title")} />
              </div>
              <span className="field-error" aria-live="polite" />
            </label>
            <label className="field">
              <span className="field-label">{thm("form_region")}</span>
              <input type="text" id="region" required />
              <span className="field-error" aria-live="polite" />
            </label>
            <label>
              {thm("form_message")}
              <textarea id="message" rows={4} placeholder={thm("form_message_placeholder")} />
            </label>
            <button type="submit" className="btn full">{thm("form_submit")}</button>
            <p className="form-note">{thm("form_policy_prefix")} <a className="inline-link" href="/privacy">{thm("form_policy_link")}</a>.</p>
          </form>
        </div>
      </section>

      <Script src={assetPath("/assets/js/home-main.js")} strategy="afterInteractive" />
    </>
  );
}
