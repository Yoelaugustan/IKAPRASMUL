import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import type { Article } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/format";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="group h-full overflow-hidden p-0">
      <Link href={ROUTES.article(article.slug)} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute left-3 top-3 bg-surface text-primary hover:bg-surface">
            {article.category}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold text-primary group-hover:underline">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-foreground/80">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-center gap-4 pt-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" /> {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" /> {article.readMinutes} min read
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
