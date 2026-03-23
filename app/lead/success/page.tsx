import Link from "next/link";
import Script from "next/script";

import { Container, Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/content/loaders";
import { createPageMetadata } from "@/lib/seo";

const site = getSiteConfig();

export const metadata = {
  ...createPageMetadata({
    baseUrl: site.baseUrl,
    pathname: "/lead/success",
    title: "Заявка отправлена",
    description: "Спасибо за заявку. Мы получили данные и свяжемся с вами в ближайшее время."
  }),
  robots: {
    index: false,
    follow: false
  }
};

export default function LeadSuccessPage() {
  return (
    <>
      <Script id="lead-success-events" strategy="afterInteractive">
        {`
          if (typeof window !== "undefined") {
            if (typeof window.gtag === "function") {
              window.gtag("event", "generate_lead", {
                event_category: "lead",
                event_label: "lead_success_page"
              });
            }
            if (typeof window.ym === "function") {
              window.ym(107147477, "reachGoal", "lead_success");
            }
          }
        `}
      </Script>

      <Section className="section-dark lead-success-page">
        <Container>
          <div className="lead-success-wrap">
            <article className="guarantee-card lead-success-card">
              <div className="lead-success-badge" aria-hidden="true">
                <span>✓</span>
              </div>
              <h1 className="kicker lead-success-kicker">Заявка отправлена</h1>

              <div className="lead-success-points">
                <div className="info-card">
                  <h2>Что дальше</h2>
                  <p>Проверим вводные, оценим реалистичный сценарий по бюджету и срокам и вернемся с предметным комментарием по вашему объекту.</p>
                </div>
                <div className="info-card">
                  <h2>Как ускорить ответ</h2>
                  <p>Если есть еще фото, видео или план проема, отправьте их в мессенджер. Так мы быстрее дадим точный комментарий.</p>
                </div>
              </div>

              <div className="lead-success-actions">
                <Link href="/contacts" className="btn btn-small">
                  Вернуться к контактам
                </Link>
                <Link href="/" className="btn btn-ghost btn-small">
                  На главную
                </Link>
                <a href={site.messengers.telegram} target="_blank" rel="noreferrer" className="btn btn-ghost btn-small">
                  Написать в Telegram
                </a>
              </div>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
