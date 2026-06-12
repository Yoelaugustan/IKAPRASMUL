"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Article } from "@/types";
import { NEWS_CATEGORIES } from "@/constants/categories";
import { Input } from "@/components/ui/input";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { EmptyState } from "@/components/shared/EmptyState";
import { ArticleCard } from "./ArticleCard";

// "Top Stories" explorer: search + category tabs over the article set, newest
// first.
export function NewsExplorer({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles
      .filter((a) => {
        const matchCategory = category === "All" || a.category === category;
        const matchQuery =
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q);
        return matchCategory && matchQuery;
      })
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [articles, query, category]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryTabs
          options={NEWS_CATEGORIES}
          value={category}
          onChange={setCategory}
        />
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news"
            className="pl-9"
            aria-label="Search news"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No articles found"
          description="Try a different search term or category."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
