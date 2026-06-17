import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import { getStoryBySlug } from "@/lib/content";
import { Container } from "@/components/layouts/Container";
import { ArticleContent } from "@/components/shared/ArticleContent";
import { BackButton } from "@/components/shared/BackButton";
import { ROUTES } from "@/constants/routes";
import { formatDateUS } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story not found" };
  return { title: story.title, description: story.excerpt };
}

export default async function StoryDetailPage({ params }: Params) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  return (
    <article className="pb-20 pt-10">
      <Container className="max-w-3xl">
        <div className="mb-6">
          <BackButton fallback={ROUTES.stories} />
        </div>

        <span className="inline-block rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-foreground">
          {story.category}
        </span>

        <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl">
          {story.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {story.author.name}
          </span>
          <span>{story.author.class}</span>
          {story.author.role && <span>{story.author.role}</span>}
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" /> {formatDateUS(story.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" /> {story.readMinutes} min read
          </span>
        </div>

        <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
          />
        </div>

        <ArticleContent html={story.body} className="mt-8" />

        <div className="mt-10 border-t border-slate-100 pt-6">
          <BackButton fallback={ROUTES.stories} dynamicLabel />
        </div>
      </Container>
    </article>
  );
}
