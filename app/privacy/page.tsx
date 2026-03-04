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
    { name: t("Политика конфиденциальности"), href: "/privacy" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <Section className="section-dark">
        <Container>
            <PageTop
            breadcrumbs={[
              { label: t("Главная"), href: "/" },
              { label: t("Политика конфиденциальности"), href: "/privacy" }
            ]}
            kicker={t("Документы")}
            title={t("Политика конфиденциальности")}
            description={t("Настоящая политика описывает, какие данные мы получаем через сайт и как используем их для связи и подготовки расчета.")}
          />

          <article className="guarantee-card">
            <h2>{t("1. Общие положения")}</h2>
            <p>
              {t("Используя формы на сайте, пользователь соглашается с обработкой предоставленных персональных данных в объеме, необходимом для обратной связи, консультации и подготовки коммерческого предложения.")}
            </p>

            <h2 className="mt-5">{t("2. Какие данные собираем")}</h2>
            <p>{t("Мы можем получать имя, номер телефона, город, предпочтительный канал связи, текст заявки, прикрепленные изображения и технические данные обращения (IP-адрес, URL страницы, время отправки формы).")}</p>

            <h2 className="mt-5">{t("3. Цель обработки")}</h2>
            <p>{t("Данные используются для связи с пользователем, предварительного расчета стоимости, согласования технических деталей проекта, заключения и исполнения договора, а также для улучшения качества сервиса.")}</p>

            <h2 className="mt-5">{t("4. Передача и хранение данных")}</h2>
            <p>{t("Мы не передаем персональные данные третьим лицам без законных оснований, за исключением сервисов, необходимых для обработки заявок и связи с клиентом. Данные хранятся в течение срока, необходимого для обработки обращения и выполнения обязательств.")}</p>

            <h2 className="mt-5">{t("5. Права пользователя")}</h2>
            <p>{t("Пользователь вправе запросить уточнение, обновление или удаление предоставленных данных, а также отозвать согласие на обработку, направив обращение по контактам, указанным на сайте.")}</p>

            <h2 className="mt-5">{t("6. Реквизиты оператора")}</h2>
            <p>
              {site.brand.name}, {t("УНП")} {site.legal.unp}, {t("адрес")}: {site.legal.legalAddress}.
            </p>
          </article>
        </Container>
      </Section>
    </>
  );
}
