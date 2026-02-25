import Link from "next/link";

import type { SiteConfig } from "@/lib/content/schemas";
import { t } from "@/lib/i18n";

const links = [
  { href: "/about", label: t("О компании") },
  { href: "/process", label: t("Процесс") },
  { href: "/guarantee", label: t("Гарантия") },
  { href: "/after-finishing", label: t("После заливки") },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" }
];

export function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="border-t border-slate-200 bg-[#f8f6f1] pb-20 pt-12 sm:pb-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:grid-cols-[1.3fr_1fr_1fr] sm:px-6">
        <div>
          <p className="font-heading text-2xl uppercase text-coal">{site.brand.name}</p>
          <p className="mt-3 max-w-sm text-sm text-slate-600">{t(site.brand.tagline)}</p>
          <p className="mt-4 text-sm text-slate-600">
            {t("Основатель")}: {site.brand.founder}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{t("Навигация")}</p>
          <ul className="mt-3 space-y-2 text-sm text-coal">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{t("Контакты")}</p>
          <ul className="mt-3 space-y-2 text-sm text-coal">
            <li>
              {t("Телефон")}: <a href={`tel:${site.contacts.phoneMain}`}>{site.contacts.phoneMain}</a>
            </li>
            <li>
              Email: <a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a>
            </li>
            <li>{t("УНП")}: {site.legal.unp}</li>
            <li>{site.contacts.address}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-6xl border-t border-slate-200 px-4 pt-4 text-xs text-slate-500 sm:px-6">
        <p>{t(site.disclaimer)}</p>
      </div>
    </footer>
  );
}
