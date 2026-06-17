import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Story } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";

export function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      href={ROUTES.storyDetail(story.slug)}
      aria-label={`Read story: ${story.title}`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00396c] focus-visible:ring-offset-2"
    >
      <Card className="h-full overflow-hidden p-0 border border-slate-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] rounded-2xl">
        <div className="flex h-full flex-col">
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
            <Image
              src={story.coverImage}
              alt={story.title}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
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
              <p className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-900 transition-colors group-hover:text-[#c6b273]">
                Read Story <ArrowRight className="size-4" />
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
