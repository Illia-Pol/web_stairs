import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { t } from "@/lib/i18n";
import { assetPath } from "@/lib/paths";
import type { SiteConfig } from "@/lib/content/schemas";

type NavItem = {
  label: string;
  href?: string;
  children?: Array<{
    href: string;
    label: string;
  }>;
};

const primaryNav: NavItem[] = [
  {
    label: t("Тарифы"),
    children: [
      { href: "/standard", label: "Standard" },
      { href: "/signature", label: "Signature" }
    ]
  },
  {
    label: t("Портфолио"),
    children: [
      { href: "/types", label: t("Типы") },
      { href: "/features", label: t("Решения") },
      { href: "/about", label: t("Мастер") },
      { href: "/faq", label: "FAQ" }
    ]
  },
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
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-slate-400">▾</span>
                </button>

                <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 min-w-[190px] translate-y-1 rounded-xl border border-white/10 bg-coal/95 p-2 opacity-0 shadow-card transition-all group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href ?? "/"}
                className="transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden sm:block">
          <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer" className="px-4 py-2">
            {t("Отправить план/фото")}
          </ButtonLink>
        </div>
      </div>

      <nav className="border-t border-white/10 lg:hidden">
        <div className="mx-auto flex flex-wrap items-center gap-4 px-4 py-3 text-sm text-slate-200">
          {primaryNav.map((item) =>
            item.children ? (
              <details key={item.label} className="group relative">
                <summary className="cursor-pointer list-none whitespace-nowrap transition-colors hover:text-white">
                  {item.label}
                </summary>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-200"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={item.href}
                href={item.href ?? "/"}
                className="whitespace-nowrap transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
