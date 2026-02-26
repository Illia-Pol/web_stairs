import Link from "next/link";

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
  pathname: "/questions",
  title: `${t("Вопросы и решения")} | ${site.brand.name}`,
  description: t("Раздел с частыми вопросами и разбором нестандартных проблем по бетонным лестницам.")
});

export default function QuestionsHubPage() {
  const breadcrumbs = [
    { name: t("Главная"), href: "/" },
    { name: t("Вопросы"), href: "/questions" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(site.baseUrl, breadcrumbs)} />

      <PageHeader
        kicker={t("Вопросы")}
        title={t("FAQ и проблемные кейсы")}
        description={t("Собрали ответы на частые вопросы и отдельный раздел с нетипичными проблемами и решениями.")}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: t("Главная"), href: "/" },
              { label: t("Вопросы"), href: "/questions" }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h2 className="font-heading text-3xl uppercase text-coal">FAQ</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Короткие ответы на типовые вопросы по срокам, цене, гарантии и подготовке объекта.")}</p>
              <Link href="/questions/faq" className="mt-4 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                {t("Открыть FAQ")}
              </Link>
            </Card>

            <Card className="bg-[#fffaf1]">
              <h2 className="font-heading text-3xl uppercase text-coal">{t("Проблемы и решения")}</h2>
              <p className="mt-2 text-sm text-slate-700">{t("Разбор нетипичных ситуаций и инженерных рисков до старта работ.")}</p>
              <Link href="/questions/problems" className="mt-4 inline-block text-sm font-semibold text-coal underline-offset-4 hover:underline">
                {t("Смотреть раздел")}
              </Link>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
