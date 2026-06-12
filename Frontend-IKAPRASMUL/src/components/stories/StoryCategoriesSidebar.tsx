import { Card } from "@/components/ui/card";

// Story Categories sidebar with counts (read-only display).
export function StoryCategoriesSidebar({
  counts,
}: {
  counts: { category: string; count: number }[];
}) {
  return (
    <Card className="p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
        Story Categories
      </h3>
      <ul className="mt-4 space-y-1">
        {counts.map(({ category, count }) => (
          <li
            key={category}
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-foreground/80"
          >
            <span>{category}</span>
            <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {count}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
