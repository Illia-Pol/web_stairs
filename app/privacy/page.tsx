import { JsonLd } from "@/components/JsonLd";
import { PageTop } from "@/components/page/PageTop";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/privacy",
  title: `${t("Политика конфиденциальности")} | ${site.brand.name}`,
  description: t("Правила обработки персональных данных и использования контактной формы.")
});

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: "Privacy", href: "/privacy" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <Section className="section-dark">
        <Container>
          <PageTop
            breadcrumbs={[
              { label: t("Главная"), href: "/" },
              { label: "Privacy", href: "/privacy" }
            ]}
            kicker="Privacy"
            title={t("Политика конфиденциальности")}
            description={t("Ниже размещен базовый шаблон. Перед публикацией замените его на юридически корректный текст для вашей деятельности.")}
          />

          <article className="guarantee-card">
            <h2>{t("1. Общие положения")}</h2>
            <p>{t("[TODO: вставить юридически выверенную политику обработки персональных данных]")}</p>

            <h2 className="mt-5">{t("2. Какие данные собираем")}</h2>
            <p>{t("Имя, контактные данные, содержание заявки и технические данные обращения.")}</p>

            <h2 className="mt-5">{t("3. Цель обработки")}</h2>
            <p>{t("Подготовка расчета, обратная связь по проекту и исполнение договорных обязательств.")}</p>

            <h2 className="mt-5">{t("4. Реквизиты оператора")}</h2>
            <p>
              {site.brand.name}, {t("УНП")} {site.legal.unp}, {t("адрес")}: {site.legal.legalAddress}.
            </p>
          </article>
        </Container>
      </Section>
    </>
  );
}
