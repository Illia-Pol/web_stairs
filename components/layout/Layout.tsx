import type { ReactNode } from "react";

import { CTABox } from "@/components/CTABox";
import { ContactBar } from "@/components/ContactBar";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container, Section } from "@/components/ui/Section";
import type { SiteConfig } from "@/lib/content/schemas";

type LayoutProps = {
  site: SiteConfig;
  currentLocale: "ru" | "en";
  children: ReactNode;
};

export function Layout({ site, currentLocale, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-coal text-ink">
      <Header site={site} />
      <main className="flex-1">{children}</main>
      <Section className="bg-coal pt-0">
        <Container>
          <CTABox site={site} source="global-layout" />
        </Container>
      </Section>
      <Footer site={site} />
      <ContactBar site={site} />
      <LocaleSwitcher site={site} currentLocale={currentLocale} />
    </div>
  );
}
