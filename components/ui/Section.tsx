import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: SectionProps) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function Section({ children, className }: SectionProps) {
  return <section className={cn("py-14 sm:py-16", className)}>{children}</section>;
}
