import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { t } from "@/lib/i18n";
import { assetPath } from "@/lib/paths";
import type { SiteConfig } from "@/lib/content/schemas";

const primaryNav = [
  { href: "/standard", label: "Standard" },
  { href: "/signature", label: "Signature" },
  { href: "/types", label: t("Типы") },
  { href: "/features", label: t("Решения") },
  { href: "/portfolio", label: t("Портфолио") },
  { href: "/prices", label: t("Цены") },
  { href: "/knowledge", label: t("База знаний") },
  { href: "/contacts", label: t("Контакты") }
];

export function Header({ site }: { site: SiteConfig }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-coal/95 text-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src={assetPath("/assets/logo.png")}
            alt={site.brand.name}
            width={40}
            height={40}
            className="rounded-lg border border-white/20 object-contain"
          />
          <div className="min-w-0">
            <p className="truncate font-heading text-lg uppercase">{site.brand.name}</p>
            <p className="truncate text-[11px] uppercase tracking-[0.12em] text-slate-400">{t(site.brand.tagline)}</p>
          </div>
        </Link>

        <nav className="hidden flex-wrap items-center gap-4 text-sm text-slate-200 lg:flex">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:block">
          <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer" className="px-4 py-2">
            {t("Отправить план/фото")}
          </ButtonLink>
        </div>
      </div>

      <nav className="scrollbar-none overflow-x-auto border-t border-white/10 lg:hidden">
        <div className="mx-auto flex w-max min-w-full items-center gap-4 px-4 py-3 text-sm text-slate-200">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
