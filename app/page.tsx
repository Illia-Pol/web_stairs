/* eslint-disable @next/next/no-img-element */
import Script from "next/script";

import { JsonLd } from "@/components/JsonLd";
import { getSiteConfig } from "@/lib/content/loaders";
import { assetPath } from "@/lib/paths";
import { createPageMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

const projects = [
  {
    image: "/assets/portfolio/portfolio-1.jpg",
    alt: "Парящая лестница в современном интерьере",
    title: "Парящая лестница в частном доме",
    text: "Минималистичный профиль и точная геометрия под чистовую отделку."
  },
  {
    image: "/assets/portfolio/portfolio-2.jpg",
    alt: "Консольные ступени с подсветкой и чистыми линиями",
    title: "Консольные ступени с подсветкой",
    text: "Скрытые закладные, инженерный расчет узлов и подготовка под дизайнерскую отделку."
  },
  {
    image: "/assets/portfolio/portfolio-4.jpg",
    alt: "Монолитная лестница с широкой площадкой и комфортным подъемом",
    title: "Парящие ступени на боковом косоуре",
    text: "Дизайнерский акцент при лаконичной и надежной конструктивной схеме."
  },
  {
    image: "/assets/portfolio/portfolio-6.jpg",
    alt: "П-образная лестница с разворотом и компактной посадкой",
    title: "П-образная лестница с разворотом",
    text: "Компактная посадка и комфортный шаг для ежедневного использования."
  }
];

const types = [
  {
    icon: "/assets/catalog/catalog-1.png",
    alt: "Прямая одномаршевая лестница",
    title: "Прямая одномаршевая",
    gallery: ["/assets/catalog-gallery/straight/1.jpg", "/assets/catalog-gallery/straight/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-2.png",
    alt: "Г-образная с площадкой",
    title: "Г-образная с площадкой",
    gallery: ["/assets/catalog-gallery/g-shaped-landing/1.jpg", "/assets/catalog-gallery/g-shaped-landing/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-3.png",
    alt: "П-образная с площадкой",
    title: "П-образная с площадкой",
    gallery: ["/assets/catalog-gallery/u-shaped-landing/1.jpg", "/assets/catalog-gallery/u-shaped-landing/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-4.png",
    alt: "Г-образная забежная",
    title: "Г-образная забежная",
    gallery: ["/assets/catalog-gallery/g-shaped-winder/1.jpg", "/assets/catalog-gallery/g-shaped-winder/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-5.png",
    alt: "П-образная забежная",
    title: "П-образная забежная",
    gallery: ["/assets/catalog-gallery/u-shaped-winder/1.jpg", "/assets/catalog-gallery/u-shaped-winder/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-6.png",
    alt: "Полувинтовая",
    title: "Полувинтовая",
    gallery: ["/assets/catalog-gallery/half-spiral/1.jpg", "/assets/catalog-gallery/half-spiral/2.jpg"]
  }
];

const faqItems = [
  {
    id: "faq-1",
    question: "Сколько занимает изготовление лестницы?",
    answer: "Обычно 2-3 дня на объекте после согласования геометрии и готовности к старту работ."
  },
  {
    id: "faq-2",
    question: "Можно ли сделать лестницу при сложном проёме?",
    answer: "Да. Сначала рассчитываем нагрузку и узлы, затем предлагаем рабочую конструктивную схему под ваш объект."
  },
  {
    id: "faq-3",
    question: "Что нужно отправить для предварительного расчета?",
    answer: "Фото/видео проема, высоту между этажами, желаемый тип лестницы и ориентир по срокам."
  },
  {
    id: "faq-4",
    question: "Почему часть ваших объектов встречается на других ресурсах?",
    answer: "Часть работ выполнена как подрядные проекты. По запросу подтверждаем авторство конкретного объекта."
  }
];

const infoLinks = [
  {
    title: "Вопросы и решения",
    text: "Если сомневаетесь в конструкции, сроках или безопасности, начните с этой страницы.",
    href: "/questions"
  },
  {
    title: "FAQ",
    text: "Короткие ответы на самые частые вопросы до звонка и замера.",
    href: "/questions/faq"
  },
  {
    title: "Проблемы и сложные случаи",
    text: "Разбор нестандартных задач: сложные узлы, узкие проемы, высокая цена ошибки.",
    href: "/questions/problems"
  },
  {
    title: "Процесс по объекту",
    text: "Пошагово: от первичных данных и расчета до армирования и сдачи конструкции.",
    href: "/vlog/process"
  },
  {
    title: "Проекты во влоге",
    text: "Больше реальных объектов, деталей узлов и комментариев с площадки.",
    href: "/vlog/projects"
  },
  {
    title: "Статьи",
    text: "Практика по подбору типа лестницы, подготовке проема и формированию бюджета.",
    href: "/vlog/articles"
  }
];

const priceCards = [
  {
    name: "Classic",
    value: site.pricing.standardFrom,
    note: "Рациональные решения с проверенной геометрией и прозрачной сметой."
  },
  {
    name: "Mid",
    value: site.pricing.midRange,
    note: "Индивидуальные задачи средней сложности с усиленным контролем узлов."
  },
  {
    name: "Signature",
    value: site.pricing.signatureFrom,
    note: "Сложные архитектурные объекты: парящие и консольные решения, премиальная проработка."
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
            <p className="kicker">1000+ реализованных лестниц</p>
            <h1>Бетонные лестницы<br />любой сложности</h1>
            <p className="lead">
              Проектируем, армируем и отливаем лестницы под ваш объект: от чистовой геометрии
              до подготовки под отделку. Сложные, парящие, консольные и нестандартные решения.
            </p>
            <div className="hero-cta">
              <a className="btn" href="#contact">Бесплатный замер и консультация</a>
              <a className="btn btn-ghost" href="#projects">Смотреть проекты</a>
            </div>
            <div className="trust-strip">
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

          <aside className="hero-panel reveal-up delay-1">
            <h2>Что получаете</h2>
            <ul>
              <li>Точный расчет за 24 часа</li>
              <li>Прозрачная смета по этапам</li>
              <li>Контроль геометрии и прочности</li>
              <li>Гарантия на конструктив</li>
            </ul>
            <p className="panel-note">Нажмите ниже, чтобы сразу отправить параметры объекта</p>
            <a className="btn full" href="#contact">Отправить проект</a>
          </aside>
        </div>
      </section>

      <section className="section section-dark" id="projects">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">Портфолио</p>
            <h2>Лучшие кейсы с объектов</h2>
            <p className="section-note">Сначала показываем реальный уровень работ: конструктив, геометрия, визуальный результат.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article key={project.title} className={`project-card reveal-up ${index % 2 === 1 ? "delay-1" : ""}`.trim()}>
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
            <p>Смотреть больше реализованных объектов можно в разделе <a className="inline-link" href="/portfolio/projects">Проекты</a> и во <a className="inline-link" href="/vlog/projects">влоге</a>.</p>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="types">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">Типовые решения</p>
            <h2>Классические форматы лестниц</h2>
            <p className="section-note">Кроме сложных кейсов делаем и стандартные рабочие конфигурации для частных домов.</p>
          </div>
          <div className="types-grid">
            {types.map((type, index) => {
              const gallery = type.gallery.map((item) => assetPath(item)).join("|");
              return (
                <article
                  key={type.title}
                  className={`type-card reveal-up ${index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : ""}`.trim()}
                  data-icon={assetPath(type.icon)}
                  data-gallery={gallery}
                >
                  <div className="type-media">
                    <img src={assetPath(type.icon)} alt={type.alt} loading="eager" decoding="sync" />
                    <div className="type-hotspots" role="group" aria-label="Переключение фото">
                      <button className="type-zone" type="button" data-index="1" aria-label="Фото 1" />
                      <button className="type-zone" type="button" data-index="2" aria-label="Фото 2" />
                    </div>
                  </div>
                  <h3>{type.title}</h3>
                  <div className="type-dots" aria-label="Фото типа лестницы">
                    <button className="dot" type="button" data-index="1" aria-label="Фото 1" />
                    <button className="dot" type="button" data-index="2" aria-label="Фото 2" />
                  </div>
                </article>
              );
            })}
          </div>
          <p className="types-note reveal-up">Откройте карточку, чтобы посмотреть реальные фото проектов.</p>
        </div>
      </section>

      <div className="catalog-modal" id="catalog-modal" aria-hidden="true">
        <div className="catalog-modal__backdrop" data-close="true" />
        <div className="catalog-modal__dialog" role="dialog" aria-modal="true" aria-label="Фото лестницы">
          <button className="catalog-modal__close" type="button" data-close="true" aria-label="Закрыть">×</button>
          <div className="catalog-modal__media">
            <button className="catalog-modal__nav" type="button" id="catalog-prev" aria-label="Предыдущее фото">‹</button>
            <img id="catalog-modal-image" src="" alt="Фото проекта лестницы" />
            <button className="catalog-modal__nav" type="button" id="catalog-next" aria-label="Следующее фото">›</button>
          </div>
          <p className="catalog-modal__caption" id="catalog-caption" />
        </div>
      </div>

      <section className="section section-dark" id="prices">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">Ориентиры по цене</p>
            <h2>Сколько стоит лестница и от чего зависит бюджет</h2>
          </div>

          <div className="prices-wrap">
            <article className="calculator-card reveal-up">
              <p className="kicker">Калькулятор</p>
              <h3>Онлайн-оценка по параметрам объекта</h3>
              <p>[TODO: здесь будет интерактивный калькулятор расчета стоимости по типу лестницы и геометрии.]</p>
              <a className="btn btn-small" href="/prices/calculator">Калькулятор (скоро)</a>
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

          <p className="price-footnote reveal-up">На итоговую цену влияют проем, тип конструкции, армирование, подготовка основания и сложность узлов. Детальный расчет — после исходных данных.</p>
        </div>
      </section>

      <section className="section section-dark" id="segments">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">Форматы работы</p>
            <h2>Classic и Signature</h2>
          </div>
          <div className="segment-grid">
            <article className="segment-card reveal-up">
              <h3>Classic</h3>
              <p className="segment-sub">Рациональный подход для типовых и умеренно сложных объектов</p>
              <ul>
                <li>Проверенные конфигурации</li>
                <li>Прозрачная смета</li>
                <li>Оптимальный баланс цены и надежности</li>
              </ul>
            </article>
            <article className="segment-card featured reveal-up delay-1">
              <h3>Signature</h3>
              <p className="segment-sub">Сложные архитектурные решения с повышенной инженерной детализацией</p>
              <ul>
                <li>Консольные и парящие узлы</li>
                <li>Индивидуальная проработка под объект</li>
                <li>Расширенный контроль ключевых этапов</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-accent" id="guarantee">
        <div className="container guarantee-wrap">
          <article className="guarantee-card reveal-up">
            <p className="kicker">Гарантия</p>
            <h2>Договор, ответственность и контроль качества</h2>
            <p>Работаем по договору подряда ИП. До начала работ фиксируем объем, этапы и смету.</p>
            <ul className="guarantee-list">
              <li>Гарантия на конструктив: {site.warrantyTerm}</li>
              <li>Прозрачные этапы и фиксация договоренностей</li>
              <li>Подготовка под отделку: дерево, камень, плитка</li>
              <li>Облицовочные работы не выполняем, но даем корректную подготовку под подрядчика</li>
            </ul>
            <a className="btn btn-small" href="/prices/guarantee">Подробнее о гарантии и договоре</a>
          </article>

          <div className="master-photo-card reveal-up delay-1">
            <div className="master-photo">
              <img src={assetPath("/assets/master.jpg")} alt="Максим Владимирович Соколовский" />
            </div>
            <div className="master-bio">
              <h3>Максим Владимирович Соколовский</h3>
              <p>Инженер‑конструктор. Более 30 лет в профессиональном строительстве и более 15 лет специализации на бетонных лестницах.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="more-info">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">Узнать больше</p>
            <h2>Дополнительная информация по выбору, рискам и процессу</h2>
            <p className="section-note">Если хотите глубже разобраться перед заявкой, начните с нужного раздела.</p>
          </div>

          <div className="info-grid">
            {infoLinks.map((item, index) => (
              <article key={item.title} className={`info-card reveal-up ${index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : ""}`.trim()}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a className="inline-link" href={item.href}>Перейти в раздел</a>
              </article>
            ))}
          </div>

          <div className="section-head faq-compact-head reveal-up">
            <p className="kicker">Короткий FAQ</p>
            <h2>Самые частые вопросы перед заявкой</h2>
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
            <p className="kicker">Заявка</p>
            <h2>Получить расчет и план работ</h2>
            <p>Оставьте контакты и параметры объекта. Мы свяжемся с вами в течение рабочего дня.</p>
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
              <span className="field-label">Ваше имя</span>
              <input type="text" id="name" required />
              <span className="field-error" aria-live="polite" />
            </label>
            <label className="field">
              <span className="field-label">Телефон</span>
              <div className="phone-input-row">
                <select id="phone-code" aria-label="Код страны">
                  <option value="+375" defaultValue="+375">BY +375</option>
                  <option value="+7">RU +7</option>
                  <option value="+48">PL +48</option>
                  <option value="+370">LT +370</option>
                  <option value="+371">LV +371</option>
                </select>
                <input type="tel" id="phone" required inputMode="tel" autoComplete="tel-national" placeholder="29 123-45-67" pattern="[\d\s()\-]{6,20}" title="Укажите номер без кода страны" />
              </div>
              <span className="field-error" aria-live="polite" />
            </label>
            <label className="field">
              <span className="field-label">Город / регион</span>
              <input type="text" id="region" required />
              <span className="field-error" aria-live="polite" />
            </label>
            <label>
              Что нужно сделать
              <textarea id="message" rows={4} placeholder="Тип лестницы, этап строительства, сроки" />
            </label>
            <button type="submit" className="btn full">Отправить заявку</button>
            <p className="form-note">Нажимая кнопку, вы соглашаетесь с <a className="inline-link" href="/privacy">политикой конфиденциальности</a>.</p>
          </form>
        </div>
      </section>

      <Script src={assetPath("/assets/js/home-main.js")} strategy="afterInteractive" />
    </>
  );
}
