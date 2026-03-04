import { JsonLd } from "@/components/JsonLd";
import { PageBottomCta } from "@/components/page/PageBottomCta";
import { PageNavCards } from "@/components/page/PageNavCards";
import { PageTop } from "@/components/page/PageTop";
import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { t } from "@/lib/i18n";
import { breadcrumbsJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/questions",
  title: `${t("Вопросы и решения")} | ${site.brand.name}`,
  description: t("Раздел с частыми вопросами и разбором нестандартных проблем по бетонным лестницам.")
});

export default function QuestionsHubPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Вопросы"), href: "/questions" }
  ];
  const cards = [
    {
      href: "/questions/faq",
      title: "FAQ",
      text: t("Короткие и понятные ответы на самые частые вопросы перед стартом: сроки, расчет, договор и гарантия."),
      cta: t("Перейти к FAQ")
    },
    {
      href: "/questions/problems",
      title: t("Проблемы и решения"),
      text: t("Разбор реальных рисков: сложные узлы, прозрачность сметы, контроль сроков и согласование на объекте."),
      cta: t("Открыть разборы")
    },
    {
      href: "/contacts",
      title: t("Задать свой вопрос"),
      text: t("Если вашей ситуации нет в разделе, отправьте заявку с фото/планом и получите персональный комментарий."),
      cta: t("Перейти к заявке")
    }
  ];
  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description: t("Раздел с ответами на частые вопросы и разбором нестандартных задач по бетонным лестницам."),
    serviceType: t("Вопросы и решения"),
    areaServed: site.coverageRegions
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
              { label: t("Вопросы"), href: "/questions" }
            ]}
            kicker={t("Вопросы")}
            title={t("FAQ и проблемные кейсы по бетонным лестницам")}
            description={t("Здесь собраны ответы на частые вопросы и практические разборы ситуаций, где важно принять решение до старта работ.")}
            story={[
              t("Раздел помогает быстро понять, какие вводные влияют на стоимость, сроки и технические риски. Сначала можно пройти FAQ, а затем открыть проблемные кейсы по вашей задаче."),
              t("Если ваш объект нестандартный, лучше сразу отправить фото или план: так мы дадим комментарий по существу, а не общий совет.")
            ]}
          />

          <PageNavCards items={cards} columns={3} />

          <article className="guarantee-card mt-6">
            <h2>{t("Что вы получите в этом разделе")}</h2>
            <ul className="guarantee-list">
              <li>{t("Понимание, какие решения подходят именно под ваш проем и планировку.")}</li>
              <li>{t("Прозрачную логику по смете, срокам и зонам ответственности.")}</li>
              <li>{t("Список типовых рисков и способы их закрыть заранее.")}</li>
            </ul>
          </article>
        </Container>
      </Section>

      <PageBottomCta
        text={t("Если нужна консультация по вашему объекту, отправьте заявку: поможем выбрать рабочий сценарий без лишних рисков.")}
        href="/contacts"
        label={t("Оставить заявку")}
      />
    </>
  );
}
