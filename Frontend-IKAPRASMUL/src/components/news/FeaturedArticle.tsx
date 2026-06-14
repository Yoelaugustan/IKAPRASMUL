"use client";

import Image from "next/image";
import { useState } from "react";
import type { Article } from "@/types";
import { formatDateUS } from "@/lib/format";
import { ArticleDetailModal } from "./ArticleDetailModal";

export function FeaturedArticle({ article }: { article: Article }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block aspect-[16/11] w-full overflow-hidden rounded-2xl text-left shadow-lg sm:aspect-[16/9]"
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gold">
            {article.category}
          </p>
          <h3 className="mt-2 max-w-xl text-2xl font-bold leading-tight sm:text-3xl">
            {article.title}
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80">
            {article.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/80">
            <span className="flex items-center gap-2">
              {article.author.avatar && (
                <span className="relative size-8 overflow-hidden rounded-full ring-2 ring-white/30">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </span>
              )}
              <span className="leading-tight">
                <span className="block font-semibold text-white">
                  By {article.author.name}
                </span>
                {article.author.role && (
                  <span className="block text-white/60">
                    {article.author.role}
                    {article.author.company ? `, ${article.author.company}` : ""}
                  </span>
                )}
              </span>
            </span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" />
            <span>{formatDateUS(article.publishedAt)}</span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" />
            <span>{article.readMinutes} min read</span>
          </div>
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
