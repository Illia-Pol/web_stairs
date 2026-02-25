import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl2 border border-slate-200/80 bg-white p-6 shadow-soft",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
