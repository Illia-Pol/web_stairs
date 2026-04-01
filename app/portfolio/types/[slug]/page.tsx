import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageBottomCta } from "@/components/page/PageBottomCta";
import { PageNavCards } from "@/components/page/PageNavCards";
import { PageTop } from "@/components/page/PageTop";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getSiteConfig, getTypeBySlug, getTypes } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { absoluteUrl, breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

const site = getSiteConfig();

export function generateStaticParams() {
  return getTypes().map((type) => ({ slug: type.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const type = getTypeBySlug(params.slug);

  if (!type) {
    return createPageMetadata({
      baseUrl: site.baseUrl,
      pathname: "/portfolio/types",
      title: `${t("Тип лестницы не найден")} | ${site.brand.name}`,
      description: t("Запрашиваемый тип лестницы не найден.")
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/portfolio/types/${type.slug}`,
    title: `${t(type.title)} | ${site.brand.name}`,
    description: t(type.shortDescription),
    image: type.heroImage
  });
}

export default function TypeDetailPage({ params }: PageProps) {
  const type = getTypeBySlug(params.slug);
  if (!type) notFound();

  const relatedCases = getCases().filter((item) => item.type === type.slug).slice(0, 3);
  const otherTypes = getTypes().filter((item) => item.slug !== type.slug).slice(0, 3);

  const typeSpecific: Record<string, {
    whereFits: string;
    whereNotFits: string;
    techNotes: string[];
    faq: Array<{ q: string; a: string }>;
  }> = {
    "monolitnaya-lestnitsa": {
      whereFits:
        "Монолитная лестница — лучший выбор, когда нужен надежный базовый конструктив с прогнозируемой сметой и простой интеграцией в стандартный частный дом.",
      whereNotFits:
        "Если приоритет — визуально «невесомая» архитектура или сложные консольные решения, рациональнее рассматривать Signature-сценарий с расширенной инженерной проработкой.",
      techNotes: [
        "Оптимальна для прямых и поворотных конфигураций с понятной логикой армирования",
        "Хорошо переносит эксплуатационные нагрузки в семейных домах",
        "Дает стабильную геометрию под облицовку деревом, камнем или плиткой",
        "Минимизирует риск скрытых усложнений в процессе реализации"
      ],
      faq: [
        {
          q: "Подходит ли монолитная лестница для дома с детьми?",
          a: "Да. При корректном шаге и ширине марша это один из самых безопасных и практичных вариантов для ежедневного использования."
        },
        {
          q: "Можно ли заранее заложить подсветку?",
          a: "Да. Каналы и точки под свет лучше согласовать до старта опалубки, чтобы не делать доработки после бетонирования."
        }
      ]
    },
    "p-obraznaya-lestnitsa": {
      whereFits:
        "П-образная лестница подходит для домов, где важны комфортный подъем, безопасный разворот и сбалансированное использование площади проема.",
      whereNotFits:
        "Если площадь ограничена критично или нужна максимально легкая визуальная композиция без разворотной площадки, стоит сравнить альтернативные типы.",
      techNotes: [
        "Удобна для регулярной эксплуатации за счет более мягкой траектории движения",
        "Позволяет лучше контролировать угол подъема и глубину проступи",
        "Хорошо работает в семейных объектах с высокой нагрузкой",
        "Чаще всего дает предсказуемый диапазон бюджета в формате Classic"
      ],
      faq: [
        {
          q: "Нужна ли площадка в П-образной лестнице?",
          a: "Не всегда. Возможен вариант с забежными ступенями, но он требует точной проверки удобства и безопасности под конкретный объект."
        },
        {
          q: "Подходит ли П-образная лестница для узкого проема?",
          a: "Да, при грамотной компоновке. На старте проверяем габариты и рекомендуем рабочую схему без потери эргономики."
        }
      ]
    },
    "paryashchaya-lestnitsa": {
      whereFits:
        "Парящая лестница уместна в интерьерах, где важны свет, визуальная легкость и архитектурный акцент при сохранении надежности конструктива.",
      whereNotFits:
        "Для объектов с приоритетом минимального бюджета и максимально быстрых решений обычно рациональнее выбирать классический монолитный формат.",
      techNotes: [
        "Требует аккуратной инженерной проработки узлов опирания",
        "Чувствительна к точности геометрии на всех этапах",
        "Часто требует координации с дизайнером и отделочными подрядчиками",
        "Оптимально реализуется в формате Signature"
      ],
      faq: [
        {
          q: "Насколько парящая лестница надежна в эксплуатации?",
          a: "При правильной инженерной схеме и соблюдении технологии это полноценный рабочий конструктив, а не декоративный элемент."
        },
        {
          q: "Можно ли сочетать парящий вид и практичность?",
          a: "Да, если заранее согласовать шаг, глубину проступи и сценарий использования, а не ориентироваться только на визуальную картинку."
        }
      ]
    },
    "konsolnaya-lestnitsa": {
      whereFits:
        "Консольная лестница подходит для архитектурно сложных проектов, где важен чистый минималистичный силуэт и высокий уровень инженерного контроля.",
      whereNotFits:
        "Если приоритет — быстрый старт и максимально простой бюджетный сценарий, консольный формат обычно избыточен по сложности.",
      techNotes: [
        "Требует проверки несущих возможностей основания и точек опирания",
        "Закладные и армирование критичны для итоговой надежности",
        "Нужна детальная проработка сопряжений с отделкой и стенами",
        "Рекомендуется в Signature как профильный формат"
      ],
      faq: [
        {
          q: "Можно ли сделать консольную лестницу в уже построенном доме?",
          a: "Возможно, но только после проверки несущей схемы и узлов. Иногда требуется усиление конструкций."
        },
        {
          q: "Почему консольные решения дороже?",
          a: "Из-за более высокой инженерной сложности, требований к точности и дополнительной проработки узлов до начала работ."
        }
      ]
    }
  };
  const details = typeSpecific[type.slug] ?? typeSpecific["monolitnaya-lestnitsa"];

  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Портфолио"), href: "/portfolio" },
    { name: t("Типы"), href: "/portfolio/types" },
    { name: type.title, href: `/portfolio/types/${type.slug}` }
  ];

  const serviceSchema = serviceJsonLd({
    name: `${site.brand.name} — ${t(type.title)}`,
    baseUrl: site.baseUrl,
    description: t(type.fullDescription),
    serviceType: t(type.title),
    areaServed: site.coverageRegions,
    offers: type.priceHint
  });
  const typePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t(type.title),
    description: t(type.fullDescription),
    url: absoluteUrl(site.baseUrl, `/portfolio/types/${type.slug}`),
    primaryImageOfPage: absoluteUrl(site.baseUrl, type.heroImage),
    isPartOf: {
      "@type": "CollectionPage",
      name: t("Типы бетонных лестниц"),
      url: absoluteUrl(site.baseUrl, "/portfolio/types")
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={typePageSchema} />

      <Section className="section-dark">
        <Container>
          <PageTop
            breadcrumbs={[
              { label: t("Главная"), href: "/" },
              { label: t("Портфолио"), href: "/portfolio" },
              { label: t("Типы"), href: "/portfolio/types" },
              { label: type.title, href: `/portfolio/types/${type.slug}` }
            ]}
            kicker={type.funnel === "signature" ? "Signature" : "Classic"}
            title={t(type.title)}
            description={t(type.fullDescription)}
            story={[
              t("Ниже собрали ключевые особенности этого типа лестницы и практические кейсы, где такой формат работает лучше всего."),
              t("Для точного расчета под ваш объект отправьте план или фото проема через форму заявки.")
            ]}
          />

          <div className="info-grid md:grid-cols-2">
            <article className="guarantee-card">
              <h2>Где этот тип работает лучше всего</h2>
              <p>{details.whereFits}</p>
              <p className="mt-4">{details.whereNotFits}</p>
            </article>

            <article className="guarantee-card">
              <h2>{t("Что входит")}</h2>
              <ul className="guarantee-list">
                {type.benefits.map((benefit) => (
                  <li key={benefit}>{t(benefit)}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="info-grid md:grid-cols-2 mt-6">
            <article className="guarantee-card">
              <h2>Технические особенности</h2>
              <ul className="guarantee-list">
                {details.techNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">
                По сложным архитектурным задачам сначала смотрим{" "}
                <Link href="/questions/problems/slozhnye-uzly" className="inline-link">
                  разбор сложных узлов
                </Link>
                , затем согласовываем формат реализации.
              </p>
            </article>

            <article className="guarantee-card">
              <h2>{t("Ориентир стоимости")}</h2>
              <p>{type.priceHint}</p>
              <p>{t("Точная цена после анализа проема и требований к отделке.")}</p>
              <ul className="guarantee-list mt-4">
                <li>Итог зависит от высоты, геометрии и выбранного исполнения</li>
                <li>Влияет стадия объекта и готовность проема</li>
                <li>Для Signature-решений нужен отдельный инженерный разбор</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/prices/calculator" className="btn btn-small">
                  {t("Смотреть цены")}
                </Link>
                <Link href="/prices/tariffs" className="btn btn-ghost btn-small">
                  Сравнить тарифы
                </Link>
              </div>
            </article>
          </div>

          <article className="guarantee-card mt-6">
            <h2>FAQ по типу «{t(type.title)}»</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                ...details.faq,
                {
                  q: "Какой минимальный набор данных нужен для точного расчета?",
                  a: "Высота между этажами, фото проема с нескольких ракурсов, желаемый тип лестницы и ориентир по срокам."
                },
                {
                  q: "Можно ли адаптировать этот тип под нестандартный проем?",
                  a: "Да. Мы проверяем геометрию и предлагаем рабочую конфигурацию, которая останется удобной в реальной эксплуатации."
                },
                {
                  q: "Входит ли подготовка под отделку в объем работ?",
                  a: "Да, в рамках бетонного этапа. Финишную облицовку выполняют профильные подрядчики."
                },
                {
                  q: "С чего лучше начать: с калькулятора или с заявки?",
                  a: "Для быстрого ориентира — с калькулятора. Если объект сложный, сразу отправьте заявку и получите разбор по вашему кейсу."
                }
              ].map((faq) => (
                <article key={faq.q} className="info-card">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </article>
              ))}
            </div>
          </article>

          {relatedCases.length ? (
            <>
              <div className="section-head mt-8">
                <h2>{t("Связанные кейсы")}</h2>
              </div>
              <PageNavCards
                items={relatedCases.map((item) => ({
                  href: `/portfolio/projects#${item.slug}`,
                  title: t(item.title),
                  text: t(item.summary),
                  cta: t("Открыть проект")
                }))}
                columns={3}
              />
            </>
          ) : null}

          <article className="guarantee-card mt-6">
            <h2>Сравнить с другими типами</h2>
            <p>Чтобы выбрать конфигурацию без риска, сравните этот тип с альтернативами по бюджету, эргономике и сложности реализации.</p>
            <div className="master-side-grid md:grid-cols-3 mt-4">
              {otherTypes.map((item) => (
                <Link key={item.slug} href={`/portfolio/types/${item.slug}`} className="master-link-card">
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.shortDescription)}</p>
                  <span>Открыть тип</span>
                </Link>
              ))}
            </div>
          </article>
        </Container>
      </Section>

      <PageBottomCta
        text={t("Нужен точный ориентир по типу «{{TYPE}}»? Отправьте план или фото проема и получите комментарий по реализации.", {
          TYPE: t(type.title)
        })}
        href="/contacts"
        label={t("Отправить заявку")}
      />
    </>
  );
}
