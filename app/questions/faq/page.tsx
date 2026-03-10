import Link from "next/link";

import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { getFaqItems, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, faqJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/questions/faq",
  title: `${t("FAQ по бетонным лестницам")} | ${site.brand.name}`,
  description: t("Ответы на частые вопросы: сроки, гарантия, стоимость, требования к объекту и зона ответственности.")
});

export default function FaqPage() {
  const faqItems = getFaqItems();
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Вопросы"), href: "/questions" },
    { name: "FAQ", href: "/questions/faq" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />
      <JsonLd data={faqJsonLd(faqItems)} />

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
              <li className="text-ink">FAQ</li>
            </ol>
          </nav>

          <div className="portfolio-page-head">
            <p className="kicker">FAQ</p>
            <h1>{t("Частые вопросы перед стартом проекта")}</h1>
            <p>{t("Собрали базовые вопросы по срокам, смете, договору и подготовке объекта, чтобы вы быстрее приняли решение.")}</p>
          </div>

          <div className="portfolio-story">
            <p>{t("Ответы в этом разделе дают общий ориентир. Финальные параметры всегда уточняем по фото/плану и фактическим размерам на объекте.")}</p>
            <p>
              Чтобы быстрее найти нужный ответ, начните с вопросов о сроках и смете, затем переходите к техническим ограничениям объекта. Если ваш кейс
              нестандартный, откройте{" "}
              <Link href="/questions/problems" className="inline-link">
                разборы проблем и решений
              </Link>
              .
            </p>
          </div>

          <div className="mt-6">
            <FAQAccordion items={faqItems} />
          </div>

          <article className="guarantee-card mt-6">
            <h2>Что чаще всего влияет на решение до старта работ</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <article className="info-card">
                <h3>Геометрия и удобство</h3>
                <p>
                  Тип лестницы должен соответствовать реальному проему и ежедневному сценарию использования, иначе даже дорогой проект может оказаться
                  неудобным.
                </p>
              </article>
              <article className="info-card">
                <h3>Прозрачность сметы</h3>
                <p>Четкая этапность и понятная структура цены снижают риск неожиданностей в бюджете и сроках.</p>
              </article>
              <article className="info-card">
                <h3>Сложность узлов</h3>
                <p>Для нестандартных решений важна инженерная проверка до старта, чтобы не переносить ошибки на стройплощадку.</p>
              </article>
              <article className="info-card">
                <h3>Координация подрядчиков</h3>
                <p>
                  Лестница влияет на отделку и инженерные работы, поэтому раннее согласование со смежниками почти всегда экономит время и деньги.
                </p>
              </article>
            </div>
          </article>

          <article className="guarantee-card mt-6">
            <h2>Что подготовить до первого разговора</h2>
            <p>
              Чем точнее стартовые данные, тем меньше «плавающих» допущений в расчете и сроках. Даже базовый набор параметров обычно позволяет дать
              предметный ориентир уже на первом этапе.
            </p>
            <ul className="guarantee-list">
              <li>Фото проема и окружающей зоны с нескольких ракурсов</li>
              <li>Высота между этажами и примерные габариты зоны лестницы</li>
              <li>Желаемый тип лестницы или визуальные референсы</li>
              <li>Ожидаемые сроки запуска и готовности объекта</li>
            </ul>
            <p className="mt-4">
              Для сложных задач дополнительно изучите{" "}
              <Link href="/questions/problems/slozhnye-uzly" className="inline-link">
                разбор сложных узлов
              </Link>{" "}
              и{" "}
              <Link href="/prices/tariffs/signature" className="inline-link">
                Signature-формат
              </Link>
              .
            </p>
          </article>

          <div className="info-grid mt-6">
            <article className="info-card">
              <h3>{t("Нужен детальный разбор")}</h3>
              <p>{t("Откройте раздел «Проблемы и решения» для нетипичных сценариев и инженерных нюансов.")}</p>
              <Link href="/questions/problems" className="btn btn-small mt-3">
                {t("Перейти к разборам")}
              </Link>
            </article>
            <article className="info-card">
              <h3>{t("Остался вопрос по вашему объекту")}</h3>
              <p>{t("Отправьте заявку с планом или фото проема, и мы дадим комментарий именно по вашей ситуации.")}</p>
              <Link href="/contacts" className="btn btn-small mt-3">
                {t("Оставить заявку")}
              </Link>
            </article>
            <article className="info-card">
              <h3>{t("Что подготовить заранее")}</h3>
              <p>{t("Высоту, габариты проема, фото с нескольких ракурсов и ваши пожелания по типу лестницы.")}</p>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
