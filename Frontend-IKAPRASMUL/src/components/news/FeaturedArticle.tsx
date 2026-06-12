import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { Article } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/format";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm lg:grid lg:grid-cols-2">
      <Link
        href={ROUTES.article(article.slug)}
        className="relative block aspect-[16/10] lg:aspect-auto"
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-col justify-center p-8 lg:p-10">
        <Badge className="w-fit bg-gold text-gold-foreground hover:bg-gold">
          {article.category}
        </Badge>
        <h3 className="mt-4 text-2xl font-bold leading-snug text-primary">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-foreground/80">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" /> {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" /> {article.readMinutes} min read
          </span>
        </div>
        <Button asChild variant="gold" className="mt-6 w-fit">
          <Link href={ROUTES.article(article.slug)}>
            Read story <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
