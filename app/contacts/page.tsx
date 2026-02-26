import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { getGeoPages, getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/contacts",
  title: `${t("Контакты и заявка")} | ${site.brand.name}`,
  description: t("Контакты для расчета бетонной лестницы: телефон, мессенджеры и форма заявки.")
});

export default function ContactsPage() {
  const cities = getGeoPages();
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Контакты"), href: "/contacts" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("Контакты")}
        title={t("Свяжитесь с нами")}
        description={t("Быстрее всего ответим в мессенджере. Для точного расчета приложите план или фото проема.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Контакты"), href: "/contacts" }
            ]}
          />

          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Контактные данные")}</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>{t("Телефон")}: <a href={`tel:${site.contacts.phoneMain}`}>{site.contacts.phoneMain}</a></li>
                <li>Email: <a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a></li>
                <li>{t("Адрес")}: {site.contacts.address}</li>
                <li>{t("Регионы")}: {t(site.coverageRegions)}</li>
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer">
                  Telegram
                </ButtonLink>
                <ButtonLink href={site.messengers.whatsapp} target="_blank" rel="noreferrer" variant="ghost">
                  WhatsApp
                </ButtonLink>
                <ButtonLink href={site.messengers.viber} target="_blank" rel="noreferrer" variant="ghost">
                  Viber
                </ButtonLink>
              </div>

              <p className="mt-4 text-xs text-slate-500">{site.disclaimer}</p>
            </Card>

            <Card className="bg-white">
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Оставить заявку")}</h2>
              <p className="mt-2 text-sm text-slate-600">{t("[TODO: добавить SLA по времени ответа]")}</p>
              <div className="mt-4">
                <LeadForm source="contacts-page" leadEndpoint={site.leadEndpoint} telegramFallback={site.telegramFallback} telegramFallbackMode={site.telegramFallbackMode} />
              </div>
            </Card>
          </div>

          <Card className="mt-6 bg-[#fffaf1]">
            <h2 className="font-heading text-3xl uppercase text-coal">{t("География работ")}</h2>
            <p className="mt-2 text-sm text-slate-600">{t("Городские лендинги публикуются под SEO-запросы и не являются частью основной навигации сайта.")}</p>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm">
              {cities.map((city) => (
                <li key={city.slug} className="rounded-full border border-slate-300 px-3 py-1">
                  {t(city.city)}
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </Section>
    </>
  );
}
