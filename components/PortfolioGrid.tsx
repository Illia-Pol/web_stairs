"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { CaseItem } from "@/lib/content/schemas";

type PortfolioGridProps = {
  items: CaseItem[];
  heading?: string;
};

const defaultFilter = "Все";

export function PortfolioGrid({ items, heading = "Портфолио" }: PortfolioGridProps) {
  const filters = useMemo(() => {
    const allTags = items.flatMap((item) => item.tags);
    const uniq = Array.from(new Set(allTags)).sort((a, b) => a.localeCompare(b, "ru"));
    return [defaultFilter, ...uniq];
  }, [items]);

  const [activeFilter, setActiveFilter] = useState(defaultFilter);

  const filteredItems = useMemo(() => {
    if (activeFilter === defaultFilter) return items;
    return items.filter((item) => item.tags.includes(activeFilter));
  }, [items, activeFilter]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-3xl uppercase text-coal">{heading}</h2>
        <p className="mt-2 text-sm text-slate-600">Фильтр по сценариям: Standard, Signature и типам конструкций.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              activeFilter === filter
                ? "border-coal bg-coal text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredItems.map((item) => (
          <article key={item.slug} className="overflow-hidden rounded-xl2 border border-slate-200 bg-white shadow-soft">
            <Link href={`/portfolio/${item.slug}`}>
              <div className="relative aspect-[16/10]">
                <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
              </div>
            </Link>
            <div className="space-y-3 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
                <span>{item.city}</span>
                <span>•</span>
                <span>{item.funnel === "signature" ? "Signature" : "Standard"}</span>
              </div>
              <h3 className="font-heading text-2xl uppercase text-coal">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.summary}</p>
              <Link href={`/portfolio/${item.slug}`} className="text-sm font-semibold text-coal underline-offset-4 hover:underline">
                Смотреть кейс
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
