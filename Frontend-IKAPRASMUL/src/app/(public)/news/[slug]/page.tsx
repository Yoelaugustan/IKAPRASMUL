import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Eye } from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArticleContent } from "@/components/shared/ArticleContent";
import { ArticleCard } from "@/components/news/ArticleCard";
import { ROUTES } from "@/constants/routes";
import { formatCompactNumber, formatDate } from "@/lib/format";
import { getArticles, getArticleBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = (await getArticles())
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  return (
    <article className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <Link
          href={ROUTES.news}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Back to News
        </Link>

        <Badge className="mt-6 bg-surface text-primary hover:bg-surface">
          {article.category}
        </Badge>
        <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl">
          {article.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={article.author.avatar} alt={article.author.name} />
              <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium text-foreground">
              {article.author.name}
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays className="size-4" /> {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4" /> {article.readMinutes} min read
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Eye className="size-4" /> {formatCompactNumber(article.views)} views
          </span>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        <ArticleContent html={article.body} className="mt-8" />

        {related.length > 0 && (
          <section className="mt-16 border-t pt-10">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-primary">
              Related articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}
