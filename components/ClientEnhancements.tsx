"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __homeMainInitAll?: () => void;
  }
}

export function ClientEnhancements() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const run = () => {
      if (typeof window.__homeMainInitAll === "function") {
        window.__homeMainInitAll();
      } else {
        window.dispatchEvent(new Event("home-main:route-change"));
      }
    };

    const t1 = window.setTimeout(run, 0);
    const t2 = window.setTimeout(run, 180);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
