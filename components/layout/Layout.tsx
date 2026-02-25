import type { ReactNode } from "react";

import { CTABox } from "@/components/CTABox";
import { ContactBar } from "@/components/ContactBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container, Section } from "@/components/ui/Section";
import type { SiteConfig } from "@/lib/content/schemas";

type LayoutProps = {
  site: SiteConfig;
  children: ReactNode;
};

export function Layout({ site, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header site={site} />
      <main className="flex-1">{children}</main>
      <Section className="bg-[#f4f2ec] pt-0">
        <Container>
          <CTABox site={site} source="global-layout" />
        </Container>
      </Section>
      <Footer site={site} />
      <ContactBar site={site} />
    </div>
  );
}
