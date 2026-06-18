"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Article } from "@/types";
import { formatDateUS } from "@/lib/format";
import { EmptyState } from "@/components/shared/EmptyState";
import { useLang } from "@/components/shared/LanguageProvider";
import { ROUTES } from "@/constants/routes";

export function MostPopularList({
  articles,
  onViewAll,
}: {
  articles: Article[];
  onViewAll?: () => void;
}) {
  const { t } = useLang();
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#00396c]">
          {t.newsList.mostPopular}
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-gold hover:text-gold-dark"
        >
          {t.newsList.viewAll} <ArrowRight className="size-3.5" />
        </button>
      </div>

      {articles.length === 0 ? (
        <EmptyState
          title={t.newsList.noPopularTitle}
          description={t.newsList.noPopularDesc}
          className="py-10"
        />
      ) : (
        <ol className="space-y-3">
          {articles.map((article, i) => {
            const isNewsletter = article.type === "newsletter";
            const href = isNewsletter && article.pdfUrl
              ? article.pdfUrl
              : ROUTES.articleDetail(article.slug);

            const inner = (
              <>
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
                    {isNewsletter ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-primary">View PDF <ExternalLink className="size-3" /></span>
                    ) : (
                      <>
                        {formatDateUS(article.publishedAt)} • {article.readMinutes}{" "}
                        {t.newsList.minRead}
                      </>
                    )}
                  </span>
                </span>
              </>
            );

            return (
              <li key={article.slug}>
                {isNewsletter && article.pdfUrl ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full items-center gap-3 text-left"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="group flex w-full items-center gap-3 text-left"
                  >
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
