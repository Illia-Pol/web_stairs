import Link from "next/link";

import type { SiteConfig } from "@/lib/content/schemas";
import { t } from "@/lib/i18n";

const links = [
  { href: "/portfolio", label: t("Портфолио") },
  { href: "/prices", label: t("Цены") },
  { href: "/questions", label: t("Вопросы") },
  { href: "/vlog", label: t("Влог") },
  { href: "/contacts", label: t("Контакты") },
  { href: "/privacy", label: "Privacy" }
];

export function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="border-t border-white/10 bg-[#0b0d10] pb-20 pt-10 text-[#dddbd6] sm:pb-12">
      <div className="mx-auto grid w-full max-w-[1120px] gap-8 px-4 sm:grid-cols-[1.3fr_1fr_1fr] sm:px-6">
        <div>
          <p className="font-heading text-2xl uppercase text-ink">{site.brand.name}</p>
          <p className="mt-3 max-w-sm text-sm text-[#bbb5aa]">{t(site.brand.tagline)}</p>
          <p className="mt-4 text-sm text-[#bbb5aa]">
            {t("Основатель")}: {site.brand.founder}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#bbb5aa]">{t("Навигация")}</p>
          <ul className="mt-3 space-y-2 text-sm text-[#dddbd6]">
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
          <p className="text-xs uppercase tracking-[0.16em] text-[#bbb5aa]">{t("Контакты")}</p>
          <ul className="mt-3 space-y-2 text-sm text-[#dddbd6]">
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

      <div className="mx-auto mt-8 w-full max-w-[1120px] border-t border-white/10 px-4 pt-4 text-xs text-[#bbb5aa] sm:px-6">
        <p>{t(site.disclaimer)}</p>
      </div>
    </footer>
  );
}
