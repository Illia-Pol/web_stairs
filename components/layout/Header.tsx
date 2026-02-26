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
    label: t("Портфолио"),
    href: "/portfolio",
    children: [
      { href: "/portfolio/types", label: t("Типы лестниц") },
      { href: "/portfolio/projects", label: t("Проекты") },
      { href: "/portfolio/master", label: t("Мастер") }
    ]
  },
  {
    label: t("Цены"),
    href: "/prices",
    children: [
      { href: "/prices/calculator", label: t("Калькулятор") },
      { href: "/prices/tariffs", label: t("Тарифы") },
      { href: "/prices/guarantee", label: t("Гарантия и договор") }
    ]
  },
  {
    label: t("Вопросы"),
    href: "/questions",
    children: [
      { href: "/questions/faq", label: "FAQ" },
      { href: "/questions/problems", label: t("Проблемы и решения") }
    ]
  },
  {
    label: t("Влог"),
    href: "/vlog",
    children: [
      { href: "/vlog/projects", label: t("Проекты") },
      { href: "/vlog/articles", label: t("Статьи") },
      { href: "/vlog/process", label: t("Процесс") }
    ]
  },
  { href: "/contacts", label: t("Контакты") }
];

export function Header({ site }: { site: SiteConfig }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-coal/75 text-ink backdrop-blur">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1120px] items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src={assetPath("/assets/logo.png")}
            alt={site.brand.name}
            width={56}
            height={56}
            className="rounded-[10px] object-contain"
          />
          <div className="min-w-0">
            <p className="truncate font-heading text-[1.3rem] uppercase leading-none">{site.brand.name}</p>
            <p className="truncate text-[11px] uppercase tracking-[0.12em] text-ink-soft">{t(site.brand.tagline)}</p>
          </div>
        </Link>

        <nav className="hidden flex-wrap items-center gap-5 text-[0.95rem] text-ink-soft lg:flex">
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <div className="inline-flex items-center gap-1">
                  <Link
                    href={item.href ?? "/"}
                    className="transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                  <span className="text-[10px] text-ink-soft/80">▾</span>
                </div>

                <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 min-w-[220px] translate-y-1 rounded-xl border border-white/10 bg-panel/95 p-2 opacity-0 shadow-card transition-all group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-ink-soft transition-colors hover:bg-white/10 hover:text-ink"
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
                className="transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden sm:block">
          <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer" className="px-4 py-2 text-xs">
            {t("Отправить план/фото")}
          </ButtonLink>
        </div>
      </div>

      <nav className="border-t border-white/10 lg:hidden">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-4 px-4 py-3 text-sm text-ink-soft sm:px-6">
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.label} className="flex flex-wrap items-center gap-2">
                <Link
                  href={item.href ?? "/"}
                  className="whitespace-nowrap transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
                <div className="flex flex-wrap gap-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="rounded-full border border-white/20 px-3 py-1 text-xs text-ink-soft"
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
                className="whitespace-nowrap transition-colors hover:text-ink"
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
