/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { getCases, getFaqItems, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { assetPath } from "@/lib/paths";
import { createPageMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

const TYPE_CARDS = [
  { title: "Прямая одномаршевая", icon: "/assets/catalog/catalog-1.png" },
  { title: "Г-образная с площадкой", icon: "/assets/catalog/catalog-2.png" },
  { title: "П-образная с площадкой", icon: "/assets/catalog/catalog-3.png" },
  { title: "Г-образная забежная", icon: "/assets/catalog/catalog-4.png" },
  { title: "П-образная забежная", icon: "/assets/catalog/catalog-5.png" },
  { title: "Полувинтовая", icon: "/assets/catalog/catalog-6.png" },
  { title: "Винтовая", icon: "/assets/catalog/catalog-7.png" },
  { title: "Крыльцо / входная группа", icon: "/assets/catalog/catalog-8.png" }
];

const BENEFITS = [
  { icon: "/assets/icons/ic-6.png", title: "Прочность", text: "Монолитная конструкция рассчитана на долгий срок эксплуатации." },
  { icon: "/assets/icons/ic-7.png", title: "Экологичность", text: "Бетон безопасен для жилых помещений и не выделяет вредных веществ." },
  { icon: "/assets/icons/ic-8.png", title: "Тишина", text: "Хорошая звукоизоляция снижает шум при ежедневном использовании." },
  { icon: "/assets/icons/ic-9.png", title: "Надежный конструктив", text: "Проектируем узлы так, чтобы лестница работала как единая инженерная система." },
  { icon: "/assets/icons/ic-10.png", title: "Гибкий дизайн", text: "От строгого минимализма до сложной архитектурной пластики." }
];

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/",
  title: `${site.brand.name} | ${t("Бетонные лестницы любой сложности")}`,
  description: t("Проектируем и изготавливаем бетонные лестницы любой сложности: парящие ступени, консольные решения, частные и коммерческие объекты.")
});

export default function HomePage() {
  const cases = getCases().slice(0, 6);
  const faqItems = getFaqItems().slice(0, 5);

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Проектируем, армируем и отливаем лестницы под ваш объект: от чистовой геометрии до подготовки под отделку."),
    serviceType: t("Производство бетонных лестниц"),
    areaServed: site.coverageRegions,
    offers: `Classic: ${site.pricing.standardFrom}, Signature: ${site.pricing.signatureFrom}`
  });

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqJsonLd(faqItems)} />

      <div className="home-legacy">
        <section className="hl-hero" id="hero">
          <div className="hl-hero-slider" aria-hidden="true">
            <img src={assetPath("/assets/slider/slider-1.jpeg")} alt="" />
            <img src={assetPath("/assets/slider/slider-2.jpeg")} alt="" />
            <img src={assetPath("/assets/slider/slider-3.jpeg")} alt="" />
            <img src={assetPath("/assets/slider/slider-4.jpeg")} alt="" />
            <img src={assetPath("/assets/slider/slider-5.jpeg")} alt="" />
          </div>
          <div className="hl-hero-overlay" aria-hidden="true" />

          <div className="hl-container hl-hero-grid">
            <div className="hl-hero-copy">
              <p className="hl-kicker">1000+ реализованных лестниц</p>
              <h1>Бетонные лестницы любой сложности</h1>
              <p className="hl-lead">
                Проектируем, армируем и отливаем лестницы под ваш объект: от чистовой геометрии до подготовки под отделку.
                Сложные, парящие, консольные и нестандартные решения.
              </p>
              <div className="hl-hero-cta">
                <a className="hl-btn" href="#contact">Бесплатный замер и консультация</a>
                <Link className="hl-btn hl-btn-ghost" href="/portfolio/types">Смотреть типы лестниц</Link>
              </div>
              <div className="hl-trust-strip">
                <div>
                  <strong>15+ лет</strong>
                  <span>практики</span>
                </div>
                <div>
                  <strong>1000+</strong>
                  <span>лестниц</span>
                </div>
                <div>
                  <strong>2-3 дня</strong>
                  <span>монтаж на объекте</span>
                </div>
              </div>
            </div>

            <aside className="hl-hero-panel">
              <h2>Что получаете</h2>
              <ul>
                <li>Точный расчет за 24 часа</li>
                <li>Прозрачная смета по этапам</li>
                <li>Контроль геометрии и прочности</li>
                <li>Гарантия на конструктив</li>
              </ul>
              <p className="hl-panel-note">Нажмите ниже, чтобы сразу отправить параметры объекта</p>
              <a className="hl-btn hl-btn-full" href="#contact">Отправить проект</a>
            </aside>
          </div>
        </section>

        <section className="hl-section hl-section-dark" id="projects">
          <div className="hl-container">
            <div className="hl-section-head">
              <p className="hl-kicker">Портфолио</p>
              <h2>Работы, которые продают качество</h2>
            </div>
            <div className="hl-project-grid">
              {cases.map((item) => (
                <article key={item.slug} className="hl-project-card">
                  <div className="hl-project-image">
                    <img src={assetPath(item.coverImage)} alt={t(item.title)} loading="lazy" />
                  </div>
                  <div className="hl-project-body">
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.summary)}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="hl-portfolio-footer">
              <p>
                Больше реализованных работ и информации о деятельности в
                <a className="hl-inline-link" href="{{INSTAGRAM_URL}}" target="_blank" rel="noreferrer"> Instagram</a>.
              </p>
            </div>
            <p className="hl-portfolio-note">
              Все фото на сайте и в соцсетях — реальные объекты, выполненные нашим мастером.
              [TODO: добавить подтверждающий текст владельца о подрядных кейсах и верификации работ]
            </p>
          </div>
        </section>

        <section className="hl-section" id="types">
          <div className="hl-container">
            <div className="hl-section-head">
              <p className="hl-kicker">Каталог</p>
              <h2>Типы лестниц</h2>
            </div>
            <div className="hl-types-grid">
              {TYPE_CARDS.map((item) => (
                <article key={item.title} className="hl-type-card">
                  <div className="hl-type-media">
                    <img src={assetPath(item.icon)} alt={item.title} loading="lazy" />
                  </div>
                  <h3>{item.title}</h3>
                </article>
              ))}
            </div>
            <p className="hl-types-note">Приведенные типы лестниц — это стандартизированные примеры. Каждый проект реализуется индивидуально.</p>
            <Link href="/portfolio/types" className="hl-inline-link">Перейти в каталог типов</Link>
          </div>
        </section>

        <section className="hl-section hl-section-accent" id="benefits">
          <div className="hl-container">
            <div className="hl-section-head">
              <p className="hl-kicker">Почему бетон</p>
              <h2>Преимущества для вашего дома</h2>
            </div>
            <div className="hl-benefits-grid">
              {BENEFITS.map((item) => (
                <article key={item.title} className="hl-benefit-card">
                  <img src={assetPath(item.icon)} alt={item.title} loading="lazy" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="hl-section" id="segments">
          <div className="hl-container">
            <div className="hl-section-head">
              <p className="hl-kicker">Линейки продукта</p>
              <h2>Две модели внутри одного бренда</h2>
            </div>
            <div className="hl-segment-grid">
              <article className="hl-segment-card">
                <h3>Classic</h3>
                <p className="hl-segment-sub">Для тех, кому важен баланс цены и надежности</p>
                <ul>
                  <li>Типовые проверенные конфигурации</li>
                  <li>Быстрые сроки старта</li>
                  <li>Фиксированная логика сметы</li>
                  <li>Оптимально для частных домов</li>
                </ul>
              </article>
              <article className="hl-segment-card hl-segment-featured">
                <h3>Signature</h3>
                <p className="hl-segment-sub">Для архитектурно сложных и премиальных проектов</p>
                <ul>
                  <li>Индивидуальная инженерная проработка</li>
                  <li>Парящие и консольные решения</li>
                  <li>Работа с дизайнером/архитектором</li>
                  <li>Расширенный контроль качества</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="hl-section hl-section-accent" id="master">
          <div className="hl-container hl-master-wrap">
            <div className="hl-master-text">
              <p className="hl-kicker">Ключевое лицо компании</p>
              <h2>Мастер в центре бренда</h2>
              <p>
                Ваше сильнейшее преимущество — опыт мастера, который сделал более 1000 лестниц за 15+ лет практики.
                Персональный контроль качества на каждом этапе и понятная коммуникация с заказчиком.
              </p>
              <ul className="hl-master-points">
                <li>Личный разбор сложных проектов</li>
                <li>Видео-комментарии по ключевым этапам</li>
                <li>Публичный стандарт качества работ</li>
              </ul>
              <a className="hl-btn" href="#contact">Запросить консультацию мастера</a>
            </div>
            <div className="hl-master-photo-card">
              <div className="hl-master-photo">
                <img src={assetPath("/assets/master.jpg")} alt={site.brand.founder} loading="lazy" />
              </div>
              <div className="hl-master-bio">
                <h3>{site.brand.founder}</h3>
                <p>[TODO: добавить реальную биографию мастера, регалии и подтвержденные факты]</p>
              </div>
            </div>
          </div>
        </section>

        <section className="hl-section" id="consult">
          <div className="hl-container hl-consult-wrap">
            <div>
              <p className="hl-kicker">Оценка по телефону</p>
              <h2>Мастер сориентирует по стоимости даже по описанию</h2>
              <p className="hl-lead">Позвоните в удобное время, расскажите про объект и получите ориентир по цене, срокам и решениям.</p>
            </div>
            <div className="hl-consult-card">
              <p className="hl-consult-label">Связь с мастером: {site.brand.founder}.</p>
              <a className="hl-btn" href={`tel:${site.contacts.phoneMain}`}>{site.contacts.phoneMain}</a>
              <p className="hl-consult-note">Можно прислать фото/план в Telegram, WhatsApp или Viber.</p>
            </div>
          </div>
        </section>

        <section className="hl-section" id="faq">
          <div className="hl-container">
            <div className="hl-section-head">
              <p className="hl-kicker">FAQ</p>
              <h2>Частые вопросы клиентов</h2>
            </div>
            <div className="hl-faq-grid">
              {faqItems.map((item) => (
                <details key={item.id} className="hl-faq-item">
                  <summary>{t(item.question)}</summary>
                  <div className="hl-faq-answer">
                    <p>{t(item.answer)}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="hl-section hl-section-dark" id="contact">
          <div className="hl-container hl-contact-grid">
            <div>
              <p className="hl-kicker">Заявка</p>
              <h2>Получить расчет и план работ</h2>
              <p>Оставьте контакты и параметры объекта. Мы свяжемся с вами в течение рабочего дня.</p>
              <div className="hl-contact-links">
                <a href={`tel:${site.contacts.phoneMain}`}>{site.contacts.phoneMain}</a>
                <a href={site.messengers.telegram} target="_blank" rel="noreferrer">Telegram</a>
                <a href={site.messengers.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                <a href={site.messengers.viber} target="_blank" rel="noreferrer">Viber</a>
              </div>
            </div>

            <div className="hl-contact-form">
              <LeadForm
                source="home-legacy-contact"
                leadEndpoint={site.leadEndpoint}
                telegramFallback={site.telegramFallback}
                telegramFallbackMode={site.telegramFallbackMode}
              />
              <p className="hl-form-note">
                Нажимая кнопку, вы соглашаетесь с
                <Link className="hl-inline-link" href="/privacy"> политикой конфиденциальности</Link>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
