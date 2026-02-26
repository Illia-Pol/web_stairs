import type { ReactNode } from "react";

import { Container } from "@/components/ui/Section";

type PageHeaderProps = {
  kicker?: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHeader({ kicker, title, description, actions }: PageHeaderProps) {
  return (
    <section className="bg-coal bg-grain py-16 text-ink sm:py-20">
      <Container>
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h1 className="mt-3 max-w-4xl font-heading text-4xl uppercase leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base text-ink-soft">{description}</p>
        {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
      </Container>
    </section>
  );
}
