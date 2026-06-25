"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Story } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { useLang } from "@/components/shared/LanguageProvider";

export function StoryCard({ story }: { story: Story }) {
  const { t } = useLang();
  return (
    <Link
      href={ROUTES.storyDetail(story.slug)}
      aria-label={`${t.cards.readStoryAria} ${story.title}`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00396c] focus-visible:ring-offset-2"
    >
      <Card className="h-full overflow-hidden p-0 border border-slate-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] rounded-2xl transition-[transform,box-shadow] duration-300 ease-expo group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_45px_-18px_rgba(0,57,108,0.30)]">
        <div className="flex h-full flex-col">
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
            <Image
              src={story.coverImage}
              alt={story.title}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.06]"
            />
            <Badge className="absolute left-3 top-3 bg-[#00396c] text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#00396c]">
              {story.category}
            </Badge>
          </div>
          <div className="flex flex-1 flex-col p-5 md:p-6">
            <h3 className="text-[17px] font-bold leading-snug text-slate-900 group-hover:underline">
              {story.title}
            </h3>
            <div className="mt-3 text-[13px] leading-relaxed text-slate-500">
              <p>{story.author.name} ({story.author.class})</p>
              {story.author.role && <p>{story.author.role}</p>}
            </div>
            <div className="mt-auto pt-6">
              <p className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-900 transition-all group-hover:gap-2 group-hover:text-[#c6b273]">
                {t.cards.readStory} <ArrowRight className="size-4 transition-transform" />
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
