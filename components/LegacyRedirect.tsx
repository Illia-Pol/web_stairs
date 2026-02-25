"use client";

import Link from "next/link";
import { useEffect } from "react";

import { t } from "@/lib/i18n";
import { withBasePath } from "@/lib/paths";

type LegacyRedirectProps = {
  to: string;
  title: string;
};

export function LegacyRedirect({ to, title }: LegacyRedirectProps) {
  const target = withBasePath(to);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.replace(target);
    }, 600);

    return () => window.clearTimeout(timer);
  }, [target]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{t("Совместимость URL")}</p>
      <h1 className="mt-2 font-heading text-4xl uppercase text-coal">{t(title)}</h1>
      <p className="mt-3 text-sm text-slate-600">{t("Страница переехала. Сейчас выполнится автоматический переход.")}</p>
      <Link href={to} className="mt-5 inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-coal">
        {t("Перейти сейчас")}
      </Link>
    </div>
  );
}
