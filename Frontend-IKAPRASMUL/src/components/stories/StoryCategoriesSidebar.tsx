"use client";

import { Card } from "@/components/ui/card";
import { ChevronRight, Presentation, Briefcase, Globe, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Map category to icon
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Founder Stories": return Presentation;
    case "Executive Journey": return Briefcase;
    case "International Alumni": return Globe;
    case "Impact Stories": return Heart;
    default: return Presentation;
  }
};

// Story Categories sidebar — clicking a category filters the stories (view-all mode).
export function StoryCategoriesSidebar({
  counts,
  activeCategory,
  onSelect,
}: {
  counts: { category: string; count: number }[];
  activeCategory?: string;
  onSelect?: (category: string) => void;
}) {
  return (
    <Card className="p-6 border border-slate-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] rounded-2xl">
      <h3 className="border-b border-slate-100 pb-4 text-[15px] font-extrabold uppercase tracking-widest text-[#00396c]">
        STORY CATEGORIES
      </h3>
      <ul className="mt-5 space-y-5">
        {counts.map(({ category, count }) => {
          const Icon = getCategoryIcon(category);
          const active = activeCategory === category;
          return (
            <li key={category}>
              <button
                type="button"
                onClick={() => onSelect?.(category)}
                className="group flex w-full cursor-pointer items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full text-white transition-colors",
                      active ? "bg-[#00396c]" : "bg-[#0a192f] group-hover:bg-[#00396c]",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p
                      className={cn(
                        "text-[14px] font-bold transition-colors",
                        active ? "text-[#00396c]" : "text-slate-900 group-hover:text-[#00396c]",
                      )}
                    >
                      {category}
                    </p>
                    <p className="text-[12px] text-slate-500 mt-0.5">
                      {count} Stories
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={cn(
                    "size-4 transition-colors",
                    active ? "text-[#c6b273]" : "text-slate-300 group-hover:text-slate-500",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
