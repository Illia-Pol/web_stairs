import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

const variantMap: Record<ButtonVariant, string> = {
  primary:
    "bg-bronze text-coal hover:bg-[#cfaf7d] shadow-soft border border-bronze/70",
  secondary:
    "bg-coal text-white hover:bg-graphite border border-white/15",
  ghost:
    "bg-transparent text-coal border border-coal/25 hover:bg-coal/5"
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-200",
        variantMap[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-200",
        variantMap[variant],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
