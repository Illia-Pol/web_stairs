/* eslint-disable @next/next/no-img-element */
import Script from "next/script";

import { JsonLd } from "@/components/JsonLd";
import { assetPath } from "@/lib/paths";
import { createPageMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { getSiteConfig } from "@/lib/content/loaders";

const site = getSiteConfig();

const projects = [
  {
    image: "/assets/portfolio/portfolio-1.jpg",
    alt: "Парящая лестница в современном интерьере",
    title: "Парящая лестница в частном доме",
    text: "Минималистичный профиль, точная геометрия под чистовую отделку."
  },
  {
    image: "/assets/portfolio/portfolio-2.jpg",
    alt: "Консольные ступени с подсветкой и чистыми линиями",
    title: "Консольные ступени с подсветкой",
    text: "Скрытые закладные, инженерный расчет узлов, подготовка под дизайнерскую отделку."
  },
  {
    image: "/assets/portfolio/portfolio-3.jpg",
    alt: "Г-образная лестница с точной геометрией поворота",
    title: "Лестница с забежными ступенями",
    text: "Классический силуэт и максимум комфорта: элегантно, воздушно и удобно — монолит может выглядеть легким."
  },
  {
    image: "/assets/portfolio/portfolio-4.jpg",
    alt: "Монолитная лестница с широкой площадкой и комфортным подъемом",
    title: "Парящие ступени на боковом косоуре",
    text: "Максимум дизайна при самой простой конфигурации лестницы."
  },
  {
    image: "/assets/portfolio/portfolio-5.jpg",
    alt: "Парящий марш на скрытом каркасе с тонким профилем",
    title: "Винтовая лестница в квартире",
    text: "Минимум места, максимум комфорта."
  },
  {
    image: "/assets/portfolio/portfolio-6.jpg",
    alt: "П-образная лестница с разворотом и компактной посадкой",
    title: "П-образная лестница с разворотом",
    text: "Компактная посадка и четкий ритм ступеней."
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
  },
  {
    icon: "/assets/catalog/catalog-7.png",
    alt: "Винтовая",
    title: "Винтовая",
    gallery: ["/assets/catalog-gallery/spiral/1.jpg", "/assets/catalog-gallery/spiral/2.jpg"]
  },
  {
    icon: "/assets/catalog/catalog-8.png",
    alt: "Крыльцо и входная группа",
    title: "Крыльцо / входная группа",
    gallery: ["/assets/catalog-gallery/porch/1.jpg", "/assets/catalog-gallery/porch/2.jpg"]
  }
];

const benefits = [
  { icon: "/assets/icons/ic-6.png", alt: "Надежность", title: "Прочность", text: "Монолитная конструкция рассчитана на долгий срок эксплуатации." },
  { icon: "/assets/icons/ic-7.png", alt: "Экологичность", title: "Экологичность", text: "Бетон безопасен для жилых помещений и не выделяет вредных веществ." },
  { icon: "/assets/icons/ic-8.png", alt: "Звукоизоляция", title: "Тишина", text: "Хорошая звукоизоляция снижает шум при ежедневном использовании." },
  { icon: "/assets/icons/ic-9.png", alt: "Конструктив", title: "Надежный конструктив", text: "Проектируем узлы так, чтобы лестница работала как единая инженерная система." },
  { icon: "/assets/icons/ic-10.png", alt: "Дизайн", title: "Гибкий дизайн", text: "От строгого минимализма до сложной архитектурной пластики." }
];

const faqItems = [
  {
    id: "faq-1",
    question: "Сколько занимает изготовление?",
    answer: "В среднем 2-3 дня на объекте после готовности опалубки и согласованного проекта."
  },
  {
    id: "faq-2",
    question: "Можно ли изготовить монолитную лестницу при деревянных перекрытиях?",
    answer: "Да, возможно, но проект требуется рассчитывать индивидуально. Важно правильно распределить нагрузки и предусмотреть конструктивные узлы — это решается на стадии проекта."
  },
  {
    id: "faq-3",
    question: "Как выглядит путь от пустого пролета до готовой лестницы?",
    answer: "Замер и обсуждение → проект и согласование геометрии → армирование и бетонирование → приемка и рекомендации по отделке."
  },
  {
    id: "faq-4",
    question: "Будет ли бетонная лестница слишком тяжёлой для моего дома и какие требования к основанию?",
    answer: "Мы считаем нагрузку под ваш дом: если основание слабое, усиливаем опоры или меняем схему опирания лестницы, чтобы конструкция была безопасной."
  },
  {
    id: "faq-5",
    question: "Почему ваши объекты встречаются на других сайтах?",
    answer: "Часть проектов выполнялась нами в формате подрядных работ, поэтому фото могут публиковаться на других ресурсах и под другим логотипом. По запросу подтверждаем авторство конкретного объекта."
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
              <a className="btn btn-ghost" href="#types">Смотреть типы лестниц</a>
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
            <h2>Работы, которые продают качество</h2>
          </div>
          <div className="project-grid">
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
            <p>Больше реализованных работ, информации о нашей деятельности и блог — в <a className="inline-link" href="https://www.instagram.com/betostep?igsh=cGQ0MjBzNzJ6cXlv" target="_blank" rel="noreferrer">Instagram</a>.</p>
          </div>
          <p className="portfolio-auth-note reveal-up">Все фото на сайте и в Instagram — реальные объекты, выполненные нашим мастером. Часть работ может встречаться на других ресурсах и под другими логотипами как подрядные проекты. Если хотите проверить конкретный объект, отправьте ссылку или фото — подтвердим, наш это проект или нет.</p>
        </div>
      </section>

      <section className="section section-dark" id="types">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">Каталог</p>
            <h2>Типы лестниц</h2>
          </div>
          <div className="types-grid">
            {types.map((type, index) => {
              const gallery = type.gallery.map((item) => assetPath(item)).join("|");
              return (
                <article
                  key={type.title}
                  className={`type-card reveal-up ${index % 4 === 1 ? "delay-1" : index % 4 === 2 ? "delay-2" : index % 4 === 3 ? "delay-3" : ""}`.trim()}
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
          <p className="types-note types-note-sub reveal-up">Приведенные типы лестниц — это стандартизированные примеры. Каждый конкретный проект реализуется индивидуально под геометрию и задачи объекта.</p>
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

      <section className="section section-accent" id="benefits">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">Почему бетон</p>
            <h2>Преимущества для вашего дома</h2>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <article key={benefit.title} className={`benefit-card reveal-up ${index === 1 ? "delay-1" : index === 2 ? "delay-2" : index === 3 ? "delay-3" : index === 4 ? "delay-4" : ""}`.trim()}>
                <img src={assetPath(benefit.icon)} alt={benefit.alt} loading="eager" decoding="sync" />
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="segments">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">Линейки продукта</p>
            <h2>Две модели внутри одного бренда</h2>
          </div>
          <div className="segment-grid">
            <article className="segment-card reveal-up">
              <h3>Standard</h3>
              <p className="segment-sub">Для тех, кому важен баланс цены и надежности</p>
              <ul>
                <li>Типовые проверенные конфигурации</li>
                <li>Быстрые сроки старта</li>
                <li>Фиксированная логика сметы</li>
                <li>Оптимально для частных домов</li>
              </ul>
            </article>
            <article className="segment-card featured reveal-up delay-1">
              <h3>Signature</h3>
              <p className="segment-sub">Для архитектурно сложных и премиальных проектов</p>
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

      <section className="section section-accent" id="master">
        <div className="container master-wrap reveal-up">
          <div className="master-text">
            <p className="kicker">Ключевое лицо компании</p>
            <h2>Мастер в центре бренда</h2>
            <p>
              Ваше сильнейшее преимущество не только бетон и технология, а опыт мастера, который сделал
              более 1000 лестниц за 15+ лет практики. Мастер в одном лице — персональный гарант результата:
              объясняет решения, показывает кейсы и ведет клиента к сделке.
            </p>
            <ul className="master-points">
              <li>Личный разбор сложных проектов</li>
              <li>Видео-комментарии по каждому кейсу</li>
              <li>Публичный стандарт качества работ</li>
            </ul>
            <a className="btn master-cta" href="#contact">Запросить консультацию мастера</a>
          </div>
          <div className="master-photo-card">
            <div className="master-photo">
              <img src={assetPath("/assets/master.jpg")} alt="Максим Владимирович Соколовский" />
            </div>
            <div className="master-bio">
              <h3>Максим Владимирович Соколовский</h3>
              <p>Инженер‑конструктор. Более 30 лет в профессиональном строительстве: от сложных монолитных конструкций до частной архитектуры. Сегодня концентрируется на бетонных лестницах, доводя геометрию, прочность и внешний вид до инженерного совершенства.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="consult">
        <div className="container consult-wrap reveal-up">
          <div>
            <p className="kicker">Оценка по телефону</p>
            <h2>Мастер сориентирует по стоимости даже по описанию</h2>
            <p className="lead">Позвоните в удобное время, расскажите про объект — получите ориентир по цене, срокам и возможным решениям.</p>
          </div>
          <div className="consult-card">
            <p className="consult-label">Связь с мастером: Максим Владимирович.</p>
            <a className="btn" href="tel:+375296512022">+375 (29) 651 20 22</a>
            <p className="consult-note">Можно прислать фото/план в Telegram, WhatsApp, Viber или Instagram.</p>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="faq">
        <div className="container">
          <div className="section-head reveal-up">
            <p className="kicker">FAQ</p>
            <h2>Частые вопросы клиентов</h2>
          </div>
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <details key={item.id} className={`faq-item reveal-up ${index === 1 || index === 4 ? "delay-1" : index === 2 ? "delay-2" : ""}`.trim()}>
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
