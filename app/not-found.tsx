import Link from "next/link";

import { Container, Section } from "@/components/ui/Section";
import { t } from "@/lib/i18n";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="rounded-xl2 border border-slate-200 bg-white p-8 text-center shadow-soft">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">404</p>
          <h1 className="mt-2 font-heading text-4xl uppercase text-coal">{t("Страница не найдена")}</h1>
          <p className="mt-3 text-sm text-slate-600">{t("Проверьте адрес или вернитесь на главную.")}</p>
          <Link href="/" className="mt-5 inline-block rounded-full bg-coal px-5 py-3 text-sm font-semibold text-white">
            {t("На главную")}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
