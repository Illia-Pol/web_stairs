import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageBottomCta } from "@/components/page/PageBottomCta";
import { PageNavCards } from "@/components/page/PageNavCards";
import { PageTop } from "@/components/page/PageTop";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

const site = getSiteConfig();

const tariffConfig = {
  classic: {
    label: "Classic",
    oldFunnel: "standard" as const,
    title: t("Надежная лестница без лишних рисков"),
    description: t("Рациональный формат: удобство, прозрачная смета и понятные сроки для типовых объектов."),
    price: site.pricing.standardFrom,
    cta: t("Отправить план/фото"),
    ctaHint: t("Кейсы Classic"),
    fitFor:
      "Classic подходит для большинства частных домов, где задача — получить технически корректный и надежный конструктив без избыточной инженерной сложности.",
    notFor:
      "Если проект содержит нестандартные архитектурные узлы, высокие требования к визуальной «легкости» или сложную координацию смежников, рациональнее рассматривать Signature.",
    process: [
      "Быстрый бриф и фиксация исходных данных объекта",
      "Рабочий расчет по типовой логике без лишних итераций",
      "Согласование этапов и запуск по прогнозируемому графику",
      "Передача конструктива под финишную отделку"
    ],
    faq: [
      {
        q: "Classic — это «базовый» вариант в ущерб качеству?",
        a: "Нет. Classic — это оптимизированный формат процесса для типовых задач. По качеству и ответственности требования остаются высокими."
      },
      {
        q: "Можно ли перейти в Signature после старта в Classic?",
        a: "Да, если в ходе проработки выявятся сложные узлы или изменятся требования проекта."
      }
    ]
  },
  signature: {
    label: "Signature",
    oldFunnel: "signature" as const,
    title: t("Сложное без риска"),
    description: t("Формат для сложных инженерных задач: нестандартные узлы, повышенный контроль и высокая точность."),
    price: site.pricing.signatureFrom,
    cta: t("Обсудить решение"),
    ctaHint: t("Кейсы Signature"),
    fitFor:
      "Signature выбирают для нестандартных объектов, где важны сложные узлы, детальная инженерная проработка, архитектурный результат и расширенное сопровождение.",
    notFor:
      "Для простых типовых решений Signature может быть избыточным. В таком случае Classic дает более рациональный сценарий по бюджету и срокам.",
    process: [
      "Расширенный бриф с анализом ограничений объекта и требований дизайна",
      "Детальная инженерная проработка критических узлов и сопряжений",
      "Координация с архитектором, дизайнером и смежными подрядчиками",
      "Пошаговое сопровождение реализации с усиленным контролем качества"
    ],
    faq: [
      {
        q: "Почему Signature стоит дороже?",
        a: "Из-за более глубокой инженерной работы, количества согласований и повышенных требований к точности исполнения на объекте."
      },
      {
        q: "Можно ли сразу понять, нужен ли Signature?",
        a: "Да. Обычно это видно уже по фото/плану: сложная геометрия, консольные элементы, нестандартные ограничения и высокие требования к визуалу."
      }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(tariffConfig).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tariff = tariffConfig[params.slug as keyof typeof tariffConfig];

  if (!tariff) {
    return createPageMetadata({
      baseUrl: site.baseUrl,
      pathname: "/prices/tariffs",
      title: `${t("Тариф не найден")} | ${site.brand.name}`,
      description: t("Запрашиваемый тариф не найден.")
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/prices/tariffs/${params.slug}`,
    title: `${tariff.label} ${t("тариф бетонных лестниц")} | ${site.brand.name}`,
    description: tariff.description
  });
}

export default function TariffDetailPage({ params }: PageProps) {
  const tariff = tariffConfig[params.slug as keyof typeof tariffConfig];
  if (!tariff) notFound();

  const cases = getCases().filter((item) => item.funnel === tariff.oldFunnel).slice(0, 3);
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Цены"), href: "/prices" },
    { name: t("Тарифы"), href: "/prices/tariffs" },
    { name: tariff.label, href: `/prices/tariffs/${params.slug}` }
  ];

  const serviceSchema = serviceJsonLd({
    name: `${site.brand.name} — ${tariff.label}`,
    baseUrl: site.baseUrl,
    description: tariff.description,
    serviceType: t("Тариф бетонной лестницы"),
    areaServed: site.coverageRegions,
    offers: tariff.price
  });

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <Section className="section-dark">
        <Container>
          <PageTop
            breadcrumbs={[
              { label: t("Главная"), href: "/" },
              { label: t("Цены"), href: "/prices" },
              { label: t("Тарифы"), href: "/prices/tariffs" },
              { label: tariff.label, href: `/prices/tariffs/${params.slug}` }
            ]}
            kicker={t("Тариф")}
            title={tariff.label}
            description={tariff.description}
            story={[
              t("Оба формата ориентированы на качественный результат. Разница в глубине инженерной проработки, уровне сопровождения и сложности задач."),
              t("Если сомневаетесь в выборе, отправьте исходные данные объекта и мы подскажем рациональный сценарий.")
            ]}
          />

          <div className="portfolio-story">
            <p>
              {t("Для выбора формата на реальных примерах откройте")}{" "}
              <Link href="/portfolio/projects" className="inline-link">
                {t("раздел проектов")}
              </Link>{" "}
              {t("и материал")}{" "}
              <Link href="/vlog/articles/standart-vs-signature" className="inline-link">
                {t("Classic vs Signature")}
              </Link>
              .
            </p>
            <p>{tariff.fitFor}</p>
            <p>{tariff.notFor}</p>
          </div>

          <div className="info-grid">
            <article className="info-card">
              <h3>Ключевая логика тарифа</h3>
              <p>{tariff.fitFor}</p>
            </article>
            <article className="info-card">
              <h3>{t("Ориентир стоимости")}</h3>
              <p>{tariff.price}</p>
              <p>{t("Точную смету формируем после анализа исходных данных.")}</p>
            </article>
            <article className="info-card">
              <h3>{t("Следующий шаг")}</h3>
              <p>{t("Отправьте план/фото для первичной оценки и подтверждения подходящего тарифа.")}</p>
              <Link href="/contacts" className="btn btn-small mt-3">
                {tariff.cta}
              </Link>
            </article>
          </div>

          <div className="info-grid mt-6">
            <article className="guarantee-card">
              <h2>Этапы работы в формате {tariff.label}</h2>
              <ol className="guarantee-list">
                {tariff.process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className="mt-4">
                По каждому этапу заранее фиксируем контрольные точки: что должно быть согласовано, какой результат передается и что нужно для следующего шага.
              </p>
            </article>
            <article className="guarantee-card">
              <h2>Как выбрать между Classic и Signature</h2>
              <ul className="guarantee-list">
                <li>Если задача типовая и важна прогнозируемость — начните с Classic</li>
                <li>Если есть сложные узлы и архитектурные требования — переходите в Signature</li>
                <li>Если сомневаетесь, отправьте план/фото: мы предложим рациональный путь</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/prices/tariffs" className="btn btn-ghost btn-small">
                  Вернуться к сравнению тарифов
                </Link>
                <Link href="/prices/calculator" className="btn btn-small">
                  Открыть калькулятор
                </Link>
              </div>
            </article>
          </div>

          <article className="guarantee-card mt-6">
            <h2>FAQ по тарифу {tariff.label}</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                ...tariff.faq,
                {
                  q: "Финальная цена совпадет с ориентиром на странице?",
                  a: "Ориентир нужен для первичного планирования бюджета. Финальная смета формируется после уточнения параметров объекта и фиксируется в договоре."
                },
                {
                  q: "Что нужно отправить для старта?",
                  a: "Фото/план проема, высоту между этажами, город, желаемый срок запуска и короткое описание задачи."
                },
                {
                  q: "Можно ли работать поэтапно и согласовывать шаги?",
                  a: "Да. Мы ведем проект через согласованные этапы с контрольными точками и понятным статусом работ."
                },
                {
                  q: "Входит ли отделка в тариф?",
                  a: "Нет. В тариф входит бетонный конструктив и подготовка под отделку; финишную облицовку выполняют профильные подрядчики."
                }
              ].map((faq) => (
                <article key={faq.q} className="info-card">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </article>
              ))}
            </div>
          </article>

          {cases.length ? (
            <>
              <div className="section-head mt-8">
                <h2>{tariff.ctaHint}</h2>
              </div>
              <PageNavCards
                items={cases.map((item) => ({
                  href: `/portfolio/projects#${item.slug}`,
                  title: t(item.title),
                  text: t(item.summary),
                  cta: t("Открыть проект")
                }))}
                columns={3}
              />
            </>
          ) : null}
        </Container>
      </Section>

      <PageBottomCta
        text={t("Остались вопросы по тарифу {{TARIFF}}? Отправьте исходные данные, и мы подскажем оптимальный формат под ваш объект.", {
          TARIFF: tariff.label
        })}
        href="/contacts"
        label={t("Перейти к заявке")}
      />
    </>
  );
}
