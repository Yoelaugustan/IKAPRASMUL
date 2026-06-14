"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/types";
import { formatDateUS } from "@/lib/format";
import { ArticleDetailModal } from "./ArticleDetailModal";

// "Most Popular" ranked list (by views).
export function MostPopularList({
  articles,
  onViewAll,
}: {
  articles: Article[];
  onViewAll?: () => void;
}) {
  const [active, setActive] = useState<Article | null>(null);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#00396c]">
          Most Popular
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-gold hover:text-gold-dark"
        >
          View All <ArrowRight className="size-3.5" />
        </button>
      </div>

      <ol className="space-y-3">
        {articles.map((article, i) => (
          <li key={article.slug}>
            <button
              type="button"
              onClick={() => setActive(article)}
              className="group flex w-full items-center gap-3 text-left"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#0a192f] text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="relative size-11 shrink-0 overflow-hidden rounded-md bg-slate-100">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="line-clamp-1 text-[13px] font-bold text-slate-900 group-hover:text-primary">
                  {article.title}
                </span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">
                  {formatDateUS(article.publishedAt)} • {article.readMinutes} min
                  read
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      {active && (
        <ArticleDetailModal
          article={active}
          open={active !== null}
          onOpenChange={(o) => !o && setActive(null)}
        />
      )}
    </div>
  );
}
