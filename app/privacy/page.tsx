import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
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

      <PageHeader
        kicker="Privacy"
        title={t("Политика конфиденциальности")}
        description={t("Шаблон документа. Замените на юридически корректный текст для вашего бизнеса.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: "Privacy", href: "/privacy" }
            ]}
          />

          <Card>
            <h2 className="font-heading text-3xl uppercase text-coal">{t("1. Общие положения")}</h2>
            <p className="mt-2 text-sm text-slate-700">{t("[TODO: вставить юридически выверенную политику обработки персональных данных]")}</p>

            <h2 className="mt-5 font-heading text-3xl uppercase text-coal">{t("2. Какие данные собираем")}</h2>
            <p className="mt-2 text-sm text-slate-700">{t("Имя, контакт, содержание заявки и технические данные обращения.")}</p>

            <h2 className="mt-5 font-heading text-3xl uppercase text-coal">{t("3. Цель обработки")}</h2>
            <p className="mt-2 text-sm text-slate-700">{t("Подготовка расчета, коммуникация по проекту и исполнение договорных обязательств.")}</p>

            <h2 className="mt-5 font-heading text-3xl uppercase text-coal">{t("4. Реквизиты оператора")}</h2>
            <p className="mt-2 text-sm text-slate-700">
              {site.brand.name}, {t("УНП")} {site.legal.unp}, {t("адрес")}: {site.legal.legalAddress}.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
}
