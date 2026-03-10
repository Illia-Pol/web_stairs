import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageBottomCta } from "@/components/page/PageBottomCta";
import { PageTop } from "@/components/page/PageTop";
import { Container, Section } from "@/components/ui/Section";
import { getCases, getGeoBySlug, getGeoPages, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

const site = getSiteConfig();

export function generateStaticParams() {
  return getGeoPages().map((geo) => ({ slug: geo.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const geo = getGeoBySlug(params.slug);

  if (!geo) {
    return createPageMetadata({
      baseUrl: site.baseUrl,
      pathname: "/contacts",
      title: `${t("Город не найден")} | ${site.brand.name}`,
      description: t("Страница города не найдена.")
    });
  }

  return createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: `/geo/${geo.slug}`,
    title: t(geo.seoTitle),
    description: t(geo.seoDescription)
  });
}

export default function GeoPage({ params }: PageProps) {
  const geo = getGeoBySlug(params.slug);
  if (!geo) notFound();

  const relatedCases = getCases().filter((item) => item.city.toLowerCase() === geo.city.toLowerCase()).slice(0, 4);
  const siblingCities = getGeoPages().filter((item) => item.slug !== geo.slug).slice(0, 5);

  const citySpecific: Record<string, {
    profile: string;
    planning: string;
    risks: string[];
    faq: Array<{ q: string; a: string }>;
  }> = {
    brest: {
      profile:
        "В Бресте чаще всего приходят запросы на лестницы для домов с уже частично выполненной отделкой. Здесь особенно важны аккуратная логистика, работа без лишней грязи и точная координация этапов.",
      planning:
        "По Бресту обычно заранее согласовываем окна выезда и последовательность работ с отделочниками. Это позволяет не останавливать параллельные процессы на объекте и избежать лишних переделок.",
      risks: [
        "Недостаточно данных по фактическому проему после черновой стадии",
        "Сдвиг сроков из-за позднего согласования финишной толщины отделки",
        "Конфликт узлов лестницы с инженерными коммуникациями в зоне марша"
      ],
      faq: [
        {
          q: "Работаете ли вы по Брестской области, если объект за городом?",
          a: "Да. Для области заранее фиксируем логистику и график выездов, чтобы сохранить темп работ и прозрачность сметы."
        },
        {
          q: "Можно ли начать расчет только по фото?",
          a: "Да, для первичного ориентира этого достаточно. Для финальной сметы и узлов потребуются размеры и уточнение по отделке."
        }
      ]
    },
    gomel: {
      profile:
        "В Гомеле часто запрашивают лестницы в домах на стадии активной стройки, когда важно быстро принять конструктивное решение и не тормозить смежников.",
      planning:
        "Основной акцент по Гомелю — в раннем согласовании геометрии и последовательности этапов. Это снижает риск срыва графика по отделке и инженерии.",
      risks: [
        "Поздний старт проработки лестницы при уже запущенной отделке",
        "Отсутствие единого решения по уровню чистых полов между этажами",
        "Недооценка требований к армированию на сложных поворотах"
      ],
      faq: [
        {
          q: "Можно ли уложиться в сжатые сроки по Гомелю?",
          a: "Да, если есть полный набор вводных и доступ на объект по графику. Сроки фиксируем по этапам до старта работ."
        },
        {
          q: "С какими типами лестниц чаще работаем в Гомеле?",
          a: "Чаще всего — монолитные и П-образные решения в Classic, реже — парящие и консольные в формате Signature."
        }
      ]
    },
    grodno: {
      profile:
        "Для объектов в Гродно чаще характерны архитектурные запросы с повышенным вниманием к визуальной чистоте узлов и геометрии линии марша.",
      planning:
        "По Гродно особое внимание уделяем этапу подготовки: до начала бетонирования согласовываем требования к финишной отделке и сопряжению со стенами.",
      risks: [
        "Неучтенные допуски при переходе от черновых размеров к чистовым",
        "Конфликты проектных решений с реальными ограничениями проема",
        "Риск видимых дефектов при недостаточном контроле опалубки"
      ],
      faq: [
        {
          q: "Берете ли сложные лестницы в Гродно?",
          a: "Да, в формате Signature: после анализа проема, несущих узлов и требований к итоговому визуальному результату."
        },
        {
          q: "Можно ли заранее понять бюджет по сложному объекту?",
          a: "Да, даем реалистичный диапазон после первичного анализа и уточняем смету после согласования инженерной схемы."
        }
      ]
    },
    mogilev: {
      profile:
        "В Могилеве основной спрос — на надежные и предсказуемые решения для частных домов, где важны контроль бюджета и понятные сроки реализации.",
      planning:
        "Для объектов в Могилеве обычно оптимален пошаговый подход: сначала фиксируем геометрию, затем согласовываем рабочую схему и только после этого запускаем этапы.",
      risks: [
        "Расчет без учета реальной высоты чистых полов",
        "Смещение графика из-за позднего утверждения типа лестницы",
        "Недостаточное внимание к подготовке основания под отделку"
      ],
      faq: [
        {
          q: "Есть ли разница в стоимости для Могилева и Минска?",
          a: "Базовая логика расчета едина. Отличия могут быть в логистике, графике выездов и сложности конкретного объекта."
        },
        {
          q: "Можно ли начать с Classic и перейти в Signature?",
          a: "Да, если в процессе уточнения появятся сложные узлы или повышенные требования к проектированию."
        }
      ]
    },
    vitebsk: {
      profile:
        "По Витебску часто приходят запросы на сочетание практичности и архитектурной выразительности: надежная база + аккуратная подготовка под качественную отделку.",
      planning:
        "Для Витебска ключевой фактор — заранее согласованный календарь работ. Это особенно важно для объектов, где параллельно ведутся отделочные и инженерные этапы.",
      risks: [
        "Неполная фиксация требований к отделке до старта бетонирования",
        "Сложности доступа на объект, влияющие на этапность работ",
        "Риск переделок при отсутствии единой координации подрядчиков"
      ],
      faq: [
        {
          q: "Работаете ли вы с удаленным согласованием по Витебску?",
          a: "Да, первичная часть обсуждения и расчетов проходит дистанционно, а ключевые этапы фиксируются при выезде на объект."
        },
        {
          q: "Можно ли заказать только конструктив без отделки?",
          a: "Да, это наш основной формат: бетонный конструктив и подготовка под финишную облицовку."
        }
      ]
    },
    minsk: {
      profile:
        "По Минску и пригородам чаще всего работаем с проектами, где критичны сроки и координация большого числа подрядчиков на объекте.",
      planning:
        "В Минске легче организовать оперативные выезды и промежуточные проверки, поэтому быстрее закрываются вопросы по геометрии и узлам.",
      risks: [
        "Попытка запускать этапы без утвержденного технического задания",
        "Неполная координация лестницы с освещением и инженерией",
        "Потеря точности при изменениях «на ходу» без перерасчета узлов"
      ],
      faq: [
        {
          q: "Как быстро можно получить первичный расчет по Минску?",
          a: "Обычно в течение суток после получения фото/плана и базовых параметров проема."
        },
        {
          q: "Можно ли согласовать объект полностью дистанционно?",
          a: "Первичную часть — да. Для финального этапа и точной фиксации узлов нужен выезд и проверка фактических размеров."
        }
      ]
    }
  };
  const cityData = citySpecific[geo.slug] ?? citySpecific.minsk;

  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: geo.city, href: `/geo/${geo.slug}` }
  ];

  const serviceSchema = serviceJsonLd({
    name: `${site.brand.name} — ${t(geo.city)}`,
    baseUrl: site.baseUrl,
    description: t(geo.description),
    serviceType: t("Бетонные монолитные лестницы"),
    areaServed: t(geo.city)
  });

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <Section className="section-dark">
        <Container>
          <PageTop
            breadcrumbs={[
              { label: t("Главная"), href: "/" },
              { label: t(geo.city), href: `/geo/${geo.slug}` }
            ]}
            kicker={t("Гео")}
            title={t(geo.title)}
            description={t(geo.description)}
            story={[
              t("Страница адаптирована под локальные условия и особенности выполнения работ в вашем регионе."),
              t("Ниже — практический разбор по городу: что влияет на стоимость, как планируются этапы и какие риски важно закрыть до старта.")
            ]}
          />

          <div className="portfolio-story">
            <p>{cityData.profile}</p>
            <p>{cityData.planning}</p>
            <p>
              Для первичного ориентира откройте{" "}
              <Link href="/prices/calculator" className="inline-link">
                калькулятор Classic
              </Link>{" "}
              и материал{" "}
              <Link href="/vlog/articles/kak-podgotovit-proem" className="inline-link">
                как подготовить проем
              </Link>
              . Для сложных архитектурных задач сравните{" "}
              <Link href="/prices/tariffs" className="inline-link">
                форматы Classic и Signature
              </Link>
              .
            </p>
          </div>

          <div className="info-grid md:grid-cols-2">
            <article className="guarantee-card">
              <h2>{t("Локальные условия")}</h2>
              <p>{t(geo.transport)}</p>
              <ul className="guarantee-list">
                {geo.proof.map((point) => (
                  <li key={point}>{t(point)}</li>
                ))}
              </ul>
            </article>

            <article className="guarantee-card">
              <h2>Что влияет на стоимость в {geo.city}</h2>
              <p>
                На итоговый расчет сильнее всего влияют геометрия проема, тип лестницы, требования к узлам и согласованность этапов с другими
                подрядчиками на объекте.
              </p>
              <ul className="guarantee-list">
                <li>Высота от чистого пола до чистого пола и допустимая длина марша</li>
                <li>Тип исполнения: гладкое дно, обратная ступень, парящее решение</li>
                <li>Стадия объекта и готовность площадки к старту этапа</li>
                <li>Требования к точности под финишную отделку</li>
              </ul>
            </article>
          </div>

          <div className="info-grid md:grid-cols-2 mt-6">
            <article className="guarantee-card">
              <h2>Этапы работы по объекту</h2>
              <ol className="guarantee-list">
                {site.processSteps.map((step) => (
                  <li key={step}>{t(step)}</li>
                ))}
              </ol>
              <p className="mt-4">
                Перед стартом обязательно фиксируем ключевые контрольные точки: геометрию, технические узлы, календарь работ и критерии приемки.
              </p>
            </article>

            <article className="guarantee-card">
              <h2>Типовые риски и как их закрываем</h2>
              <ul className="guarantee-list">
                {cityData.risks.map((risk) => (
                  <li key={risk}>{risk}</li>
                ))}
              </ul>
              <p className="mt-4">
                Для сложных объектов с нестандартной архитектурой рекомендуем сразу идти через{" "}
                <Link href="/prices/tariffs/signature" className="inline-link">
                  Signature
                </Link>
                , чтобы заранее исключить инженерные и сроковые риски.
              </p>
            </article>
          </div>

          <article className="guarantee-card mt-6">
            <h2>Чек-лист перед заявкой по городу {geo.city}</h2>
            <p>
              Чем точнее исходные данные на старте, тем быстрее мы дадим рабочий ориентир по стоимости и срокам. Достаточно базового набора:
            </p>
            <ul className="guarantee-list">
              {site.checklist.map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
            <p className="mt-4">
              Если хотите сначала посмотреть типовые решения, откройте{" "}
              <Link href="/portfolio/types" className="inline-link">
                каталог типов лестниц
              </Link>{" "}
              и{" "}
              <Link href="/questions/problems" className="inline-link">
                раздел проблем и решений
              </Link>
              .
            </p>
          </article>

          <article className="guarantee-card mt-6">
            <h2>FAQ по объектам в {geo.city}</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                ...cityData.faq,
                {
                  q: `Вы работаете только в городе ${geo.city}?`,
                  a: "Работаем по городу и области, а также по другим регионам Беларуси по согласованному графику."
                },
                {
                  q: "Можно ли получить ориентир до выезда на объект?",
                  a: "Да. По фото, плану и базовым размерам даем первичный расчет, затем уточняем его после финальной проверки вводных."
                },
                {
                  q: "Делаете ли вы финишную облицовку?",
                  a: "Мы выполняем бетонный конструктив и подготовку под отделку. Финишная облицовка выполняется профильными подрядчиками."
                },
                {
                  q: "Какой следующий шаг после получения расчета?",
                  a: "Согласовываем формат работ, фиксируем этапы и запускаем проект по договору с понятными контрольными точками."
                }
              ].map((faq) => (
                <article key={faq.q} className="info-card">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="guarantee-card mt-6">
            <h2>Другие города Беларуси</h2>
            <p>
              Если объект находится в другом регионе, откройте соответствующую городскую страницу: там мы отдельно описали логистику, сроки и формат
              взаимодействия.
            </p>
            <div className="master-side-grid md:grid-cols-3 mt-4">
              {siblingCities.map((city) => (
                <Link key={city.slug} href={`/geo/${city.slug}`} className="master-link-card">
                  <h3>{city.city}</h3>
                  <p>{city.description}</p>
                  <span>Открыть страницу города</span>
                </Link>
              ))}
            </div>
          </article>

          <article className="guarantee-card mt-6">
            <h2>{t("Получить расчет")}</h2>
            <p>
              Отправьте исходные данные и получите ориентир стоимости именно для вашего города. В заявке укажите желаемый тип лестницы и удобный канал
              связи.
            </p>
            <Link href="/contacts" className="btn btn-small mt-4">
              {t("Перейти к заявке")}
            </Link>
          </article>

          {relatedCases.length ? (
            <article className="guarantee-card mt-6">
              <h2>{t("Кейсы в городе {{CITY}}", { CITY: geo.city })}</h2>
              <div className="master-side-grid md:grid-cols-2 mt-4">
                {relatedCases.map((item) => (
                  <Link key={item.slug} href={`/portfolio/projects#${item.slug}`} className="master-link-card">
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.summary)}</p>
                    <span>{t("Смотреть проект")}</span>
                  </Link>
                ))}
              </div>
            </article>
          ) : null}
        </Container>
      </Section>

      <PageBottomCta
        text={t("Нужен ориентир по вашему объекту в {{CITY}}? Отправьте план или фото проема и получите расчет с учетом локальных условий.", {
          CITY: geo.city
        })}
        href="/contacts"
        label={t("Оставить заявку")}
      />
    </>
  );
}
