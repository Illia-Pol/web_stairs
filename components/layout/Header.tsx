"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { th } from "@/lib/i18n-header";
import { localeFromPathname, type Locale } from "@/lib/i18n";
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

function getPrimaryNav(locale: "ru" | "en"): NavItem[] {
  const portfolioBase = locale === "en" ? "/en/portfolio" : "/portfolio";

  return [
    {
      label: th("nav_portfolio", locale),
      href: portfolioBase,
      children: [
        { href: `${portfolioBase}/types`, label: th("nav_portfolio_types", locale) },
        { href: `${portfolioBase}/projects`, label: th("nav_portfolio_projects", locale) },
        { href: `${portfolioBase}/master`, label: th("nav_portfolio_master", locale) }
      ]
    },
    {
      label: th("nav_prices", locale),
      href: "/prices",
      children: [
        { href: "/prices/calculator", label: th("nav_prices_calculator", locale) },
        { href: "/prices/tariffs", label: th("nav_prices_tariffs", locale) },
        { href: "/prices/guarantee", label: th("nav_prices_guarantee", locale) }
      ]
    },
    {
      label: th("nav_questions", locale),
      href: "/questions",
      children: [
        { href: "/questions/faq", label: th("nav_questions_faq", locale) },
        { href: "/questions/problems", label: th("nav_questions_problems", locale) }
      ]
    },
    {
      label: th("nav_vlog", locale),
      href: "/vlog",
      children: [
        { href: "/vlog/projects", label: th("nav_vlog_projects", locale) },
        { href: "/vlog/articles", label: th("nav_vlog_articles", locale) },
        { href: "/vlog/process", label: th("nav_vlog_process", locale) }
      ]
    },
    { href: "/contacts", label: th("nav_contacts", locale) }
  ];
}

export function Header({ site, currentLocale }: { site: SiteConfig; currentLocale: "ru" | "en" }) {
  const pathname = usePathname();
  const [uiLocale, setUiLocale] = useState<Locale>(currentLocale);
  const [isCompact, setIsCompact] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const primaryNav = getPrimaryNav(uiLocale);
  const localizedBrandTitle = th("brand_title", uiLocale);
  const homeHref = uiLocale === "en" ? "/en" : "/";
  const contactAnchorHref = uiLocale === "en" ? "/en/#contact" : "/#contact";
  const brandTitle =
    localizedBrandTitle.includes("{{") && localizedBrandTitle.includes("}}")
      ? site.brand.name
      : localizedBrandTitle;

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 36);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!pathname) return;
    setUiLocale(localeFromPathname(pathname));
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 text-ink backdrop-blur transition-all duration-300",
        isCompact ? "bg-[rgba(15,17,19,0.92)]" : "bg-[rgba(15,17,19,0.84)]"
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1120px] items-center justify-between gap-3 px-4 sm:px-6 transition-all duration-300",
          isCompact ? "min-h-[62px] py-1.5" : "min-h-[72px] py-2"
        )}
      >
        <Link href={homeHref} className="flex min-w-0 shrink-0 items-center gap-3">
          <Image
            src={assetPath("/assets/logo.png")}
            alt={brandTitle}
            width={56}
            height={56}
            className={cn(
              "rounded-[10px] object-contain transition-all duration-300",
              isCompact ? "h-12 w-12" : "h-14 w-14"
            )}
          />
          <div className="min-w-0">
            <p
              className={cn(
                "truncate font-heading uppercase leading-none transition-all duration-300",
                isCompact ? "text-[1.05rem] sm:text-[1.2rem]" : "text-[1.12rem] sm:text-[1.3rem]"
              )}
            >
              {brandTitle}
            </p>
            <p
              className={cn(
                "hidden truncate text-[10px] uppercase tracking-[0.12em] text-ink-soft transition-all duration-300 sm:block",
                isCompact ? "max-h-0 -translate-y-1 overflow-hidden opacity-0" : "max-h-6 translate-y-0 opacity-100"
              )}
            >
              {th("brand_subtitle", uiLocale)}
            </p>
          </div>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 text-[0.92rem] text-ink-soft lg:flex">
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative -my-2 py-2">
                <div className="inline-flex items-center gap-1">
                  <Link
                    href={item.href ?? "/"}
                    className="whitespace-nowrap transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                  <span className="text-[10px] text-ink-soft/80">▾</span>
                </div>

                <div className="pointer-events-none absolute left-0 top-full z-20 min-w-[220px] translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-xl border border-white/10 bg-panel/95 p-2 shadow-card">
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
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <ButtonLink href={contactAnchorHref} className="whitespace-nowrap px-3 py-2 text-[11px]">
            {th("cta_send_plan", uiLocale)}
          </ButtonLink>
          <LocaleSwitcher site={site} currentLocale={uiLocale} className="hidden xl:block" />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LocaleSwitcher site={site} currentLocale={uiLocale} compact />
          <button
            type="button"
            aria-label={mobileMenuOpen ? th("menu_close", uiLocale) : th("menu_open", uiLocale)}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 px-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft transition-colors hover:bg-white/5 hover:text-ink"
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={cn(
                  "absolute left-0 top-0 block h-[2px] w-4 rounded bg-current transition-transform duration-200",
                  mobileMenuOpen && "translate-y-[6px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[6px] block h-[2px] w-4 rounded bg-current transition-opacity duration-200",
                  mobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[12px] block h-[2px] w-4 rounded bg-current transition-transform duration-200",
                  mobileMenuOpen && "-translate-y-[6px] -rotate-45"
                )}
              />
            </span>
            <span>{th("menu_label", uiLocale)}</span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 lg:hidden transition-[max-height,opacity] duration-300",
          mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto w-full max-w-[1120px] px-4 pb-4 pt-3 sm:px-6">
          <div className="grid gap-3">
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href ?? "/"}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 text-sm font-semibold uppercase tracking-[0.04em] text-ink transition-colors hover:bg-white/[0.05]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-3">
            <ButtonLink
              href={contactAnchorHref}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-xs"
            >
              {th("cta_send_plan", uiLocale)}
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
