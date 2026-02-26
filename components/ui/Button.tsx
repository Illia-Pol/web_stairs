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
    "border border-[#b58f59] bg-gradient-to-br from-bronze to-bronze-deep text-coal shadow-[0_10px_24px_rgba(199,164,106,.32)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(199,164,106,.36)]",
  secondary:
    "border border-white/15 bg-coal text-ink hover:bg-graphite",
  ghost:
    "border border-slate-300 bg-transparent text-coal shadow-none hover:bg-slate-100/70"
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
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
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
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200",
        variantMap[variant],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
