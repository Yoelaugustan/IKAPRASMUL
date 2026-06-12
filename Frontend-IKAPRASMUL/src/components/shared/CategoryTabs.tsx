"use client";

import { cn } from "@/lib/utils";

// Lightweight pill tab row used to filter listings by category/industry.
// Controlled — the parent owns the active value and the filtering.
export function CategoryTabs({
  options,
  value,
  onChange,
  className,
}: {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const all = ["All", ...options];
  return (
    <div
      role="tablist"
      aria-label="Filter by category"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {all.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground/70 hover:border-primary/40 hover:text-primary",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
