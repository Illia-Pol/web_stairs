import Image from "next/image";
import Link from "next/link";

import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { PriceCards } from "@/components/PriceCards";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import {
  getCases,
  getFaqItems,
  getReviews,
  getSiteConfig,
  getTypes
} from "@/lib/content/loaders";
import { createPageMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = createPageMetadata({
  baseUrl: site.baseUrl,
  pathname: "/",
  title: `${site.brand.name} | Бетонные монолитные лестницы в Беларуси`,
  description:
    "Главная страница-хаб: выберите Standard или Signature сценарий, отправьте план/фото и получите расчет по бетонной лестнице."
});

export default function HomePage() {
  const types = getTypes();
  const cases = getCases();
  const reviews = getReviews();
  const faqItems = getFaqItems().slice(0, 7);

  const serviceSchema = serviceJsonLd({
    name: site.brand.name,
    baseUrl: site.baseUrl,
    description:
      "Проектирование и изготовление бетонных монолитных лестниц в Беларуси по сценариям Standard и Signature.",
    serviceType: "Изготовление бетонных лестниц",
    areaServed: site.coverageRegions,
    offers: `Standard: ${site.pricing.standardFrom}, Mid: ${site.pricing.midRange}, Signature: ${site.pricing.signatureFrom}`
  });

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqJsonLd(faqItems)} />

      <section className="relative overflow-hidden bg-coal text-white">
        <div className="absolute inset-0 opacity-30">
          <Image src="/assets/slider/slider-2.jpeg" alt="Бетонная лестница" fill priority className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-coal/75 via-coal/85 to-coal" />

        <Container className="relative py-20 sm:py-24">
          <p className="text-xs uppercase tracking-[0.18em] text-bronze">Старт в 1 клик</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl uppercase leading-tight sm:text-6xl">
            Бетонные монолитные лестницы под ваш объект
          </h1>
          <p className="mt-5 max-w-2xl text-base text-slate-200 sm:text-lg">
            Выберите формат работы: Standard для рационального решения или Signature для сложных инженерных задач без риска.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/standard" className="min-w-[170px]">
              Standard
            </ButtonLink>
            <ButtonLink href="/signature" variant="secondary" className="min-w-[170px]">
              Signature
            </ButtonLink>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer">
              Отправить план/фото
            </ButtonLink>
            <ButtonLink href={site.messengers.whatsapp} target="_blank" rel="noreferrer" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
              WhatsApp
            </ButtonLink>
            <ButtonLink href={site.messengers.viber} target="_blank" rel="noreferrer" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
              Viber
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {site.heroStats.map((stat) => (
              <Card key={stat.label} className="border-white/20 bg-white/10 p-4 text-white shadow-none backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">{stat.label}</p>
                <p className="mt-2 font-heading text-3xl uppercase">{stat.value}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Card>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Чек-лист для расчета</p>
              <h2 className="mt-2 font-heading text-3xl uppercase text-coal">Что прислать, чтобы получить точный ориентир</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {site.checklist.map((item) => (
                  <li key={item} className="rounded-lg bg-slate-50 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-[#fffaf1]">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Дисклеймер</p>
              <h3 className="mt-2 font-heading text-2xl uppercase text-coal">Важно до старта</h3>
              <p className="mt-3 text-sm text-slate-700">{site.disclaimer}</p>
              <p className="mt-4 text-sm text-slate-600">[TODO: добавить требования к готовности объекта перед выездом]</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Ориентиры цены</p>
          <h2 className="mt-2 font-heading text-4xl uppercase text-coal">Цена без сюрпризов</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">Итоговая стоимость зависит от геометрии, типа конструкции и готовности объекта.</p>
          <div className="mt-6">
            <PriceCards site={site} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <PortfolioGrid items={cases} heading="Витрина портфолио" />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-4xl uppercase text-coal">Standard vs Signature</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Standard</p>
              <h3 className="mt-2 font-heading text-2xl uppercase text-coal">Рациональный выбор</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Прозрачная смета и понятный график.</li>
                <li>Оптимальные конфигурации под частный дом.</li>
                <li>Фокус на надежность и скорость реализации.</li>
              </ul>
              <div className="mt-4">
                <ButtonLink href="/standard" variant="ghost">
                  Перейти в Standard
                </ButtonLink>
              </div>
            </Card>

            <Card className="bg-coal text-white">
              <p className="text-xs uppercase tracking-[0.16em] text-bronze">Signature</p>
              <h3 className="mt-2 font-heading text-2xl uppercase">Сложное без риска</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                <li>Инженерные узлы и нестандартные архитектурные задачи.</li>
                <li>Повышенный контроль геометрии и сопряжений.</li>
                <li>Координация с дизайнером и смежными подрядчиками.</li>
              </ul>
              <div className="mt-4">
                <ButtonLink href="/signature" variant="primary">
                  Перейти в Signature
                </ButtonLink>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Типы лестниц</p>
              <h2 className="mt-2 font-heading text-4xl uppercase text-coal">Выберите тип под ваш объект</h2>
            </div>
            <Link href="/types" className="text-sm font-semibold text-coal underline-offset-4 hover:underline">
              Все типы
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {types.map((type) => (
              <Link
                key={type.slug}
                href={`/types/${type.slug}`}
                className="group rounded-xl2 border border-slate-200 bg-white p-5 shadow-soft transition-transform hover:-translate-y-1"
              >
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                  {type.funnel === "signature" ? "Signature" : "Standard"}
                </p>
                <h3 className="mt-3 font-heading text-2xl uppercase text-coal">{type.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{type.shortDescription}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
            <Card>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Короткий процесс</p>
              <h2 className="mt-2 font-heading text-4xl uppercase text-coal">Как работаем</h2>
              <ol className="mt-4 space-y-2 text-sm text-slate-700">
                {site.processSteps.map((step, index) => (
                  <li key={step} className="rounded-lg bg-slate-50 px-3 py-2">
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="bg-[#fffaf1]">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Мастер / лицо бренда</p>
              <h3 className="mt-2 font-heading text-3xl uppercase text-coal">{site.brand.founder}</h3>
              <p className="mt-3 text-sm text-slate-700">
                [TODO: добавить реальное фото, мини-историю, специализацию и подтвержденные цифры по проектам]
              </p>
              <div className="mt-4 rounded-xl bg-white p-3 text-sm text-slate-600">
                Подход: инженерная дисциплина, честная коммуникация, контроль качества на площадке.
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-heading text-4xl uppercase text-coal">Отзывы</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <Card key={`${review.name}-${review.project}`}>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  {review.city} • {"★".repeat(review.rating)}
                </p>
                <h3 className="mt-2 font-heading text-2xl uppercase text-coal">{review.project}</h3>
                <p className="mt-2 text-sm text-slate-700">{review.text}</p>
                <p className="mt-4 text-xs text-slate-500">{review.name}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-heading text-4xl uppercase text-coal">FAQ</h2>
            <Link href="/faq" className="text-sm font-semibold text-coal underline-offset-4 hover:underline">
              Смотреть все
            </Link>
          </div>
          <div className="mt-5">
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Card className="bg-coal text-white shadow-card">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-bronze">Лид-блок</p>
                <h2 className="mt-2 font-heading text-4xl uppercase">Отправьте план/фото и получите расчет</h2>
                <p className="mt-3 text-sm text-slate-300">
                  Если хотите ускорить процесс, отправьте в мессенджер план, фото проема и высоту между этажами.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer">
                    Telegram
                  </ButtonLink>
                  <ButtonLink href={site.messengers.whatsapp} target="_blank" rel="noreferrer" variant="ghost" className="border-white/25 text-white hover:bg-white/10">
                    WhatsApp
                  </ButtonLink>
                  <ButtonLink href={site.messengers.viber} target="_blank" rel="noreferrer" variant="ghost" className="border-white/25 text-white hover:bg-white/10">
                    Viber
                  </ButtonLink>
                </div>
              </div>

              <div className="rounded-xl bg-white p-4 text-coal">
                <LeadForm source="home-lead" compact />
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
