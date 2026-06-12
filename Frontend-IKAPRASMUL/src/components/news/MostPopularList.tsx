import Link from "next/link";
import type { Article } from "@/types";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { formatCompactNumber } from "@/lib/format";

// "Most Popular" ranked list (by views).
export function MostPopularList({ articles }: { articles: Article[] }) {
  return (
    <Card className="p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
        Most Popular
      </h3>
      <ol className="mt-4 space-y-4">
        {articles.map((article, i) => (
          <li key={article.slug} className="flex gap-4">
            <span className="text-2xl font-bold tabular-nums text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <Link
                href={ROUTES.article(article.slug)}
                className="text-sm font-medium leading-snug text-foreground hover:text-primary hover:underline"
              >
                {article.title}
              </Link>
              <p className="mt-1 text-xs text-muted-foreground">
                {article.category} · {formatCompactNumber(article.views)} views
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
