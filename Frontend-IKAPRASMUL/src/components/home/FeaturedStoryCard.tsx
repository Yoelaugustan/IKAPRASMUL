import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Story } from "@/types";
import { ROUTES } from "@/constants/routes";
import { getServerDict } from "@/i18n/server";

// Home-grid variant of a story card — matches the Event/Business/Alumni cards
// so the Featured Highlights grid stays visually uniform when a story is used
// to backfill an empty slot.
export async function FeaturedStoryCard({ story }: { story: Story }) {
  const { t } = await getServerDict();
  return (
    <Link
      href={ROUTES.storyDetail(story.slug)}
      className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-md ring-1 ring-border/60 transition-[transform,box-shadow] duration-300 ease-expo hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-18px_rgba(0,57,108,0.30)] active:scale-[0.98] active:shadow-sm"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={story.coverImage}
          alt={story.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.06]"
        />
        <span className="absolute left-3 top-3 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
          {story.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-primary">
          {story.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {story.author.name} ({story.author.class})
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5 group-hover:underline">
          {t.cards.readStory} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
