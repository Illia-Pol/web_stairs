import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl2 border border-slate-300/70 bg-white/95 p-6 shadow-soft backdrop-blur-[1px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
