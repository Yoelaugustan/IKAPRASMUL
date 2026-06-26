"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Article } from "@/types";
import { formatDateUS } from "@/lib/format";
import { ROUTES } from "@/constants/routes";
import { useLang } from "@/components/shared/LanguageProvider";

export function TopStoryCard({ article }: { article: Article }) {
  const { t } = useLang();
  const isNewsletter = article.type === "newsletter";

  const inner = (
    <>
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.08]"
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
          {isNewsletter ? (
            <span className="inline-flex items-center gap-1 font-semibold text-primary">View PDF <ExternalLink className="size-3" /></span>
          ) : (
            <>
              {formatDateUS(article.publishedAt)} • {article.readMinutes}{" "}
              {t.detail.minRead}
            </>
          )}
        </p>
      </div>
    </>
  );

  if (isNewsletter && article.pdfUrl) {
    return (
      <a
        href={article.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full gap-4 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-[transform,box-shadow,border-color] duration-300 ease-expo hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-md active:scale-[0.98] active:shadow-sm"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={ROUTES.articleDetail(article.slug)}
      className="group flex w-full gap-4 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-[transform,box-shadow] hover:shadow-md active:scale-[0.98] active:shadow-sm"
    >
      {inner}
    </Link>
  );
}
