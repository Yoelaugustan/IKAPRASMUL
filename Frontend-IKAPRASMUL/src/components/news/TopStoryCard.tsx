"use client";

import Image from "next/image";
import { useState } from "react";
import type { Article } from "@/types";
import { formatDateUS } from "@/lib/format";
import { ArticleDetailModal } from "./ArticleDetailModal";

export function TopStoryCard({ article }: { article: Article }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full gap-4 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-md"
      >
        <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gold">
            {article.category}
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-primary">
            {article.title}
          </h3>
          <p className="mt-2 text-[11px] text-muted-foreground">
            {formatDateUS(article.publishedAt)} • {article.readMinutes} min read
          </p>
        </div>
      </button>

      <ArticleDetailModal
        article={article}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
