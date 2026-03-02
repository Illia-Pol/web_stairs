import type { ReactNode } from "react";

import { ContactBar } from "@/components/ContactBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { SiteConfig } from "@/lib/content/schemas";

type LayoutProps = {
  site: SiteConfig;
  currentLocale: "ru" | "en";
  children: ReactNode;
};

export function Layout({ site, currentLocale, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-coal text-ink">
      <Header site={site} currentLocale={currentLocale} />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
      <ContactBar site={site} />
    </div>
  );
}
