import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArticleContent } from "@/components/shared/ArticleContent";
import { CtaBand } from "@/components/shared/CtaBand";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/format";
import { getStories, getStoryBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story not found" };
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [story.coverImage],
      type: "article",
    },
  };
}

export default async function StoryDetailPage({
  params,
}: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  return (
    <>
      <article className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <Link
            href={ROUTES.stories}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Back to Stories
          </Link>

          <Badge className="mt-6 bg-surface text-primary hover:bg-surface">
            {story.category}
          </Badge>
          <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl">
            {story.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage src={story.author.avatar} alt={story.author.name} />
                <AvatarFallback>{story.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium text-foreground">{story.author.name}</p>
                <p className="text-muted-foreground">
                  {story.author.class}
                  {story.author.role ? ` · ${story.author.role}` : ""}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays className="size-4" /> {formatDate(story.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="size-4" /> {story.readMinutes} min read
            </span>
          </div>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={story.coverImage}
              alt={story.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>

          <ArticleContent html={story.body} className="mt-8" />
        </Container>
      </article>

      <CtaBand
        title="Inspired to share your own story?"
        description="Tell us your journey — our editorial team may feature it next."
        buttonLabel="Submit Your Story"
        subject="Submit Your Story"
      />
    </>
  );
}
