import Link from "next/link";

import { Container, Section } from "@/components/ui/Section";

type PageBottomCtaProps = {
  text: string;
  href: string;
  label: string;
};

export function PageBottomCta({ text, href, label }: PageBottomCtaProps) {
  return (
    <Section className="section-accent master-projects-section">
      <Container>
        <div className="portfolio-bottom-cta">
          <p>{text}</p>
          <Link href={href} className="btn btn-small">
            {label}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
