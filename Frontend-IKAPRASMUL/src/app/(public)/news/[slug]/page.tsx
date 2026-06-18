import type { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { CalendarDays, Clock, Eye } from "lucide-react";
import { getArticleBySlug } from "@/lib/content";
import { Container } from "@/components/layouts/Container";
import { ArticleContent } from "@/components/shared/ArticleContent";
import { BackButton } from "@/components/shared/BackButton";
import { ROUTES } from "@/constants/routes";
import { formatCompactNumber, formatDateUS } from "@/lib/format";
import { getServerDict } from "@/i18n/server";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticleDetailPage({ params }: Params) {
  const { slug } = await params;
  const [article, { t }] = await Promise.all([
    getArticleBySlug(slug),
    getServerDict(),
  ]);
  if (!article) notFound();

  if (article.type === "newsletter" && article.pdfUrl) {
    redirect(article.pdfUrl);
  }

  return (
    <article className="pb-20 pt-10">
      <Container className="max-w-3xl">
        <div className="mb-6">
          <BackButton fallback={ROUTES.news} />
        </div>

        <span className="inline-block rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-foreground">
          {article.category}
        </span>

        <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {article.author.name}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" /> {formatDateUS(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" /> {article.readMinutes} {t.detail.minRead}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="size-4" /> {formatCompactNumber(article.views)}{" "}
            {t.detail.views}
          </span>
        </div>

        <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
          />
        </div>

        <ArticleContent html={article.body} className="mt-8" />

        <div className="mt-10 border-t border-slate-100 pt-6">
          <BackButton fallback={ROUTES.news} dynamicLabel />
        </div>
      </Container>
    </article>
  );
}
