import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import {
  getFeatureBySlug,
  getFeatures,
  getSiteConfig,
  getTypeBySlug
} from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

const site = getSiteConfig();

export function generateStaticParams() {
  return getFeatures().map((feature) => ({ slug: feature.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const feature = getFeatureBySlug(params.slug);

  if (!feature) {
    return createPageMetadata({
      baseUrl: site.baseUrl,
      pathname: "/questions/problems",
      title: `${t("Решение не найдено")} | ${site.brand.name}`,
      description: t("Раздел не найден.")
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/questions/problems/${feature.slug}`,
    title: `${t(feature.title)} | ${site.brand.name}`,
    description: t(feature.summary)
  });
}

export default function FeatureDetailPage({ params }: PageProps) {
  const feature = getFeatureBySlug(params.slug);
  if (!feature) notFound();

  const relatedFeatures = getFeatures().filter((item) => item.slug !== feature.slug).slice(0, 3);
  const relatedTypes = feature.relatedTypes
    .map((slug) => getTypeBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const problemSpecific: Record<string, {
    whyHappens: string;
    diagnostics: string[];
    prevention: string[];
    faq: Array<{ q: string; a: string }>;
  }> = {
    "chastnyj-dom": {
      whyHappens:
        "Проблемы в частных домах чаще всего появляются, когда лестницу выбирают по картинке, а не по фактической геометрии проема и сценарию ежедневного использования.",
      diagnostics: [
        "Проверяем высоту между чистовыми уровнями, а не только черновые отметки",
        "Смотрим фактическую ширину и глубину зоны марша",
        "Учитываем состав семьи и удобство подъема в повседневной эксплуатации",
        "Согласовываем отделочные допуски до старта бетонного этапа"
      ],
      prevention: [
        "Не выбирать тип лестницы до базовой технической проверки",
        "Фиксировать эргономику до закупки отделочных материалов",
        "Согласовывать критичные узлы со смежниками заранее"
      ],
      faq: [
        {
          q: "Что важнее в частном доме: дизайн или эргономика?",
          a: "Оба фактора важны, но приоритет всегда за безопасной и удобной геометрией. Дизайн корректно реализуется только на устойчивой технической базе."
        },
        {
          q: "Можно ли исправить неудобную лестницу после заливки?",
          a: "Это дорого и часто ограничено конструктивно. Поэтому ключевые параметры нужно согласовать до старта работ."
        }
      ]
    },
    "slozhnye-uzly": {
      whyHappens:
        "Сложные узлы становятся проблемой, когда решение принимается только по визуалу без проверки реальной несущей схемы, опирания и армирования.",
      diagnostics: [
        "Разбираем нагрузки и схему опирания на уровне узлов",
        "Проверяем возможность размещения закладных с учетом стен и перекрытий",
        "Согласовываем технические допуски с финишной архитектурой",
        "Фиксируем порядок работ для исключения конфликтов на площадке"
      ],
      prevention: [
        "Не запускать сложный узел без инженерной проверки",
        "Фиксировать решения в рабочей документации до старта",
        "Проводить промежуточный контроль на критических этапах"
      ],
      faq: [
        {
          q: "Можно ли сделать консольную или парящую лестницу «как на референсе»?",
          a: "Только после адаптации под конкретный объект. Один и тот же визуал может требовать разных инженерных решений в разных домах."
        },
        {
          q: "Зачем так подробно прорабатывать узлы до начала работ?",
          a: "Чтобы исключить переделки, срыв сроков и компромиссы по безопасности или внешнему виду."
        }
      ]
    },
    "sroki-i-kontrol": {
      whyHappens:
        "Сроки чаще срываются не из-за одного большого фактора, а из-за набора мелких несогласованностей: вводные, доступ на объект, смежники, изменения по ходу работ.",
      diagnostics: [
        "Фиксируем календарь этапов и точки подтверждения готовности",
        "Согласовываем роли и ответственность участников проекта",
        "Определяем критичные узлы, которые нельзя менять «на ходу»",
        "Проверяем готовность площадки перед каждым этапом"
      ],
      prevention: [
        "Не начинать этап без подтвержденных вводных",
        "Закладывать буфер на согласование со смежными подрядчиками",
        "Вести прозрачную коммуникацию по статусу работ"
      ],
      faq: [
        {
          q: "Можно ли ускорить проект без потери качества?",
          a: "Да, если заранее подготовлены данные, объект и решения по узлам. Ускорение возможно за счет дисциплины процесса, а не за счет пропуска этапов."
        },
        {
          q: "Как контролировать ход работ удаленно?",
          a: "Через согласованные контрольные точки, фотофиксацию этапов и регулярную отчетность по статусу."
        }
      ]
    },
    "prozrachnaya-smeta": {
      whyHappens:
        "Непрозрачная смета возникает, когда объем работ описан общими фразами без детализации этапов, границ ответственности и условий изменений.",
      diagnostics: [
        "Разбиваем стоимость по этапам и видам работ",
        "Фиксируем, что включено в базовый объем, а что считается допработой",
        "Согласовываем механизм изменений до подписания договора",
        "Проверяем соответствие сметы фактическим вводным"
      ],
      prevention: [
        "Всегда фиксировать этапность и контрольные результаты",
        "Отдельно согласовывать нестандартные узлы и доработки",
        "Не принимать смету без понятной структуры и логики"
      ],
      faq: [
        {
          q: "Почему цена может меняться после первичного расчета?",
          a: "Первичный расчет строится на базовых вводных. После уточнения геометрии, узлов и условий объекта формируется финальная смета."
        },
        {
          q: "Как избежать скрытых доплат?",
          a: "Через подробную фиксацию объема работ, условий изменений и этапности в договоре."
        }
      ]
    }
  };
  const details = problemSpecific[feature.slug] ?? problemSpecific["chastnyj-dom"];

  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Вопросы"), href: "/questions" },
    { name: t("Проблемы и решения"), href: "/questions/problems" },
    { name: t(feature.title), href: `/questions/problems/${feature.slug}` }
  ];

  const serviceSchema = serviceJsonLd({
    name: `${site.brand.name} — ${t(feature.title)}`,
    baseUrl: site.baseUrl,
    description: t(feature.summary),
    serviceType: t(feature.title),
    areaServed: site.coverageRegions
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <Section className="section-dark">
        <Container>
          <nav aria-label="Breadcrumbs" className="portfolio-breadcrumbs text-sm text-ink-soft">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink">
                  {t("Главная")}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/questions" className="hover:text-ink">
                  {t("Вопросы")}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/questions/problems" className="hover:text-ink">
                  {t("Проблемы и решения")}
                </Link>
              </li>
              <li>/</li>
              <li className="text-ink">{t(feature.title)}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{t("Решение")}</p>
            <h1>{t(feature.title)}</h1>
            <p>{t(feature.summary)}</p>
          </div>

          <div className="portfolio-story">
            <p>{t("Ниже собрали практический разбор: что обычно вызывает риск на объекте, каким способом закрываем этот риск и какой результат получает заказчик.")}</p>
            <p>{details.whyHappens}</p>
            {relatedFeatures.length ? (
              <p>
                {t("Смотрите также разборы")}{" "}
                {relatedFeatures.map((item, index) => (
                  <span key={item.slug}>
                    {index > 0 ? t(", ") : null}
                    <Link href={`/questions/problems/${item.slug}`} className="inline-link">
                      {t(item.title)}
                    </Link>
                  </span>
                ))}
                .
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="guarantee-card">
              <h2>{t("Проблема")}</h2>
              <p>{t(feature.problem)}</p>
              <h3 className="mt-5">Диагностика перед стартом</h3>
              <ul className="guarantee-list mt-3">
                {details.diagnostics.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="guarantee-card">
              <h2>{t("Решение")}</h2>
              <p>{t(feature.solution)}</p>
              <h3 className="mt-5">Как избежать повторения риска</h3>
              <ul className="guarantee-list mt-3">
                {details.prevention.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <article className="guarantee-card mt-4">
            <h2>{t("Что вы получаете")}</h2>
            <ul className="guarantee-list">
              {feature.benefits.map((benefit) => (
                <li key={benefit}>{t(benefit)}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/contacts" className="btn btn-small">
                {t("Оставить заявку")}
              </Link>
              <Link href="/questions/problems" className="btn btn-ghost btn-small">
                {t("К списку решений")}
              </Link>
            </div>
          </article>

          <article className="guarantee-card mt-6">
            <h2>FAQ по теме: {t(feature.title)}</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                ...details.faq,
                {
                  q: "Когда лучше поднимать этот вопрос: до расчета или после?",
                  a: "Лучше до расчета. Чем раньше выявляем риск, тем проще и дешевле его закрыть на проектной стадии."
                },
                {
                  q: "Можно ли решить проблему без смены типа лестницы?",
                  a: "Часто да. Но иногда рациональнее выбрать другой тип или формат работ, чтобы сохранить безопасность и сроки."
                },
                {
                  q: "Как понять, что предложенное решение действительно рабочее?",
                  a: "Решение должно быть подтверждено геометрией, узлами и последовательностью этапов, а не только визуальным эскизом."
                },
                {
                  q: "Какие страницы посмотреть после этого разбора?",
                  a: "Откройте подходящие типы лестниц, сравните тарифы и отправьте заявку с фото проема для персонального комментария."
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

      <Section className="section-accent master-projects-section">
        <Container>
          <div className="section-head">
            <h2>{t("Связанные типы лестниц")}</h2>
          </div>
          <div className="master-side-grid md:grid-cols-2">
            {relatedTypes.map((type) => (
              <Link key={type.slug} href={`/portfolio/types/${type.slug}`} className="master-link-card">
                <h3>{t(type.title)}</h3>
                <p>{t(type.shortDescription)}</p>
                <span>{t("Открыть тип")}</span>
              </Link>
            ))}
          </div>

          <div className="portfolio-bottom-cta">
            <p>{t("Нужен комментарий по вашему объекту? Отправьте заявку с планом или фото, и мы предложим рабочий сценарий без лишнего риска.")}</p>
            <Link href="/contacts" className="btn btn-small">
              {t("Перейти к заявке")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
