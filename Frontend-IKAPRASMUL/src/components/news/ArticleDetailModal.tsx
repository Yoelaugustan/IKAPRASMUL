"use client";

import Image from "next/image";
import { CalendarDays, Clock, Eye } from "lucide-react";
import type { Article } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArticleContent } from "@/components/shared/ArticleContent";
import { formatCompactNumber, formatDateUS } from "@/lib/format";

export function ArticleDetailModal({
  article,
  open,
  onOpenChange,
}: {
  article: Article;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl gap-0 overflow-y-auto p-0">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="640px"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-foreground">
            {article.category}
          </span>
        </div>
        <div className="p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl leading-snug text-primary">
              {article.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {article.author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" /> {formatDateUS(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {article.readMinutes} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="size-4" /> {formatCompactNumber(article.views)} views
            </span>
          </div>
          <ArticleContent html={article.body} className="mt-6 text-[15px]" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
