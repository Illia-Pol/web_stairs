import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

function hasRealValue(value: string | undefined): value is string {
  return Boolean(value && !value.includes("{{") && value.trim());
}

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/prices/guarantee",
  title: `${t("Гарантия и договор")} | ${site.brand.name}`,
  description: t("Договор, гарантийные обязательства и границы ответственности по бетонному конструктиву лестницы.")
});

export default function GuaranteePage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Цены"), href: "/prices" },
    { name: t("Гарантия"), href: "/prices/guarantee" }
  ];

  const contractModel = hasRealValue(site.legal.contractModel)
    ? site.legal.contractModel
    : t("Работаем по договору подряда с фиксированием этапов, стоимости и ответственности сторон.");
  const unp = hasRealValue(site.legal.unp) ? site.legal.unp : t("Уточняется в договоре");
  const legalAddress = hasRealValue(site.legal.legalAddress)
    ? site.legal.legalAddress
    : t("Указывается в реквизитах договора");
  const warrantyTerm = hasRealValue(site.warrantyTerm) ? site.warrantyTerm : t("Срок указывается в договоре");

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

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
                <Link href="/prices" className="hover:text-ink">
                  {t("Цены")}
                </Link>
              </li>
              <li>/</li>
              <li className="text-ink">{t("Гарантия")}</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">{t("Гарантия")}</p>
            <h1>{t("Договор, ответственность и гарантийные обязательства")}</h1>
            <p>{t("До старта работ фиксируем условия в договоре: объем, этапы, сроки, стоимость и границы ответственности.")}</p>
          </div>

          <div className="portfolio-story">
            <p>{t("Мы отвечаем за бетонный конструктив лестницы и корректную подготовку под отделку. Такой подход снижает риски спорных ситуаций и помогает держать проект в управляемых рамках.")}</p>
            <p>{t("Ниже — базовые принципы оформления. Финальные условия всегда привязываем к конкретному объекту и техническому заданию.")}</p>
            <p>
              {t("Чтобы корректно подготовить вводные к договору, посмотрите")}{" "}
              <Link href="/vlog/articles/kak-podgotovit-proem" className="inline-link">
                {t("чек-лист подготовки проема")}
              </Link>{" "}
              {t("и раздел")}{" "}
              <Link href="/questions/faq" className="inline-link">
                FAQ
              </Link>
              .
            </p>
          </div>

          <div className="guarantee-wrap">
            <article className="guarantee-card">
              <h2>{t("Договор и реквизиты")}</h2>
              <p>{contractModel}</p>
              <ul className="guarantee-list">
                <li>{t("УНП")}: {unp}</li>
                <li>{t("Юридический адрес")}: {legalAddress}</li>
                <li>{t("В договоре фиксируются этапы, сроки и стоимость работ.")}</li>
                <li>{t("Изменения по проекту проходят через дополнительное согласование.")}</li>
              </ul>
            </article>

            <article className="guarantee-card">
              <h2>{t("Гарантия на конструктив")}</h2>
              <p>{t("Гарантийный срок")}: <strong>{warrantyTerm}</strong></p>
              <ul className="guarantee-list">
                <li>{t("Гарантия распространяется на монолитный конструктив лестницы.")}</li>
                <li>{t("Действует при соблюдении нормальной эксплуатации конструкции.")}</li>
                <li>{t("Гарантийные случаи рассматриваются в согласованный срок с выездом на объект при необходимости.")}</li>
              </ul>
            </article>
          </div>

          <div className="info-grid mt-6">
            <article className="info-card">
              <h3>{t("Что входит в нашу зону ответственности")}</h3>
              <p>{t("Проектная логика конструктива, корректное исполнение бетонных работ и подготовка основания под дальнейшую отделку.")}</p>
            </article>
            <article className="info-card">
              <h3>{t("Что не входит")}</h3>
              <p>{t("Финишная облицовка деревом, камнем, плиткой и работы сторонних подрядчиков после сдачи бетонного этапа.")}</p>
            </article>
            <article className="info-card">
              <h3>{t("Как проходит взаимодействие")}</h3>
              <p>{t("Сначала фиксируем исходные данные, затем подписываем договор, выполняем этапы с промежуточным контролем и передаем результат по акту.")}</p>
            </article>
          </div>

          <article className="guarantee-card mt-6">
            <h2>Как работает гарантия на практике</h2>
            <p>
              Гарантия эффективна только тогда, когда до старта проекта четко зафиксированы исходные данные, объем работ и критерии приемки. Поэтому мы
              подробно описываем эти пункты в договоре и сопровождаем проект по этапам.
            </p>
            <ul className="guarantee-list">
              <li>Фиксируем границы работ по бетонному конструктиву</li>
              <li>Указываем этапность и контрольные точки качества</li>
              <li>Прописываем порядок изменений и согласований</li>
              <li>Формализуем условия гарантийного обслуживания</li>
            </ul>
          </article>

          <article className="guarantee-card mt-6">
            <h2>FAQ по договору и гарантии</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                {
                  q: "Что считается гарантийным случаем?",
                  a: "Случаи, связанные с бетонным конструктивом при соблюдении условий нормальной эксплуатации и заявленных параметров объекта."
                },
                {
                  q: "Как быстро рассматриваются гарантийные обращения?",
                  a: "Срок рассмотрения согласовывается в договоре. При необходимости организуется выезд на объект для проверки ситуации."
                },
                {
                  q: "Можно ли изменить проект после подписания договора?",
                  a: "Да, но через согласованную процедуру изменений с оценкой влияния на сроки и стоимость."
                },
                {
                  q: "Почему важно фиксировать отделку заранее?",
                  a: "Параметры отделки влияют на геометрию и сопряжения, поэтому их лучше согласовать до старта бетонного этапа."
                },
                {
                  q: "Кто отвечает за финишную облицовку?",
                  a: "Финишную облицовку выполняют профильные подрядчики. Наша зона — бетонный конструктив и подготовка под отделку."
                },
                {
                  q: "Можно ли получить шаблон условий до заявки?",
                  a: "Да. После первичного брифа отправим базовую структуру условий и поясним, какие пункты критичны именно для вашего объекта."
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
            <h2>Почему этот раздел важен до начала работ</h2>
            <p>
              Договор и гарантия — это не формальность, а инструмент управления рисками. Когда параметры проекта зафиксированы заранее, проще
              контролировать сроки, бюджет и качество результата на каждом этапе.
            </p>
            <ul className="guarantee-list">
              <li>Снижается риск спорных трактовок объема работ</li>
              <li>Понятно, какие решения и сроки согласованы сторонами</li>
              <li>Легче управлять изменениями без хаотичных корректировок</li>
              <li>Проще передавать объект на следующие этапы отделки</li>
            </ul>
            <p className="mt-4">
              Если хотите проверить, какой формат работ подойдет под ваш кейс, начните со страницы{" "}
              <Link href="/prices/tariffs" className="inline-link">
                тарифов
              </Link>{" "}
              и отправьте заявку с фото/планом.
            </p>
          </article>
        </Container>
      </Section>

      <Section className="section-accent master-projects-section">
        <Container>
          <div className="portfolio-bottom-cta">
            <p>{t("Если хотите заранее проверить условия под ваш объект, отправьте план или фото проема — подготовим понятный сценарий по договору и этапам.")}</p>
            <Link href="/contacts" className="btn btn-small">
              {t("Отправить заявку")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
