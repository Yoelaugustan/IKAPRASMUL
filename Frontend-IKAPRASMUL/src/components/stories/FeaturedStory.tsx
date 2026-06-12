import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Story } from "@/types";
import { ROUTES } from "@/constants/routes";

export function FeaturedStory({ story }: { story: Story }) {
  if (!story) return null;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[15px] font-extrabold uppercase tracking-widest text-[#00396c]">
          FEATURED STORY
        </h2>
        <span className="mt-3 block h-px w-full bg-slate-200" />
      </div>
      <div className="flex flex-col md:flex-row overflow-hidden rounded-2xl bg-[#00396c] shadow-lg">
        {/* Left: Image */}
        <div className="relative aspect-[4/3] w-full md:aspect-auto md:w-5/12 shrink-0">
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Right: Content */}
        <div className="flex flex-1 flex-col p-8 md:p-12 justify-center">
          <div>
            <span className="inline-block rounded-full bg-[#c6b273] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0a192f]">
              {story.category}
            </span>
          </div>
          <h3 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">
            {story.title}
          </h3>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/80">
            {story.excerpt}
          </p>
          <div className="mt-8 flex items-center justify-between">
            <Link
              href={ROUTES.story(story.slug)}
              className="inline-flex items-center gap-2 bg-[#c6b273] px-6 py-3 text-[13px] font-bold text-[#0a192f] transition-colors hover:bg-[#b4a05e] rounded"
            >
              Read Full Story <ArrowRight className="size-4" />
            </Link>
            
            {/* Pagination dots (static for design match) */}
            <div className="flex gap-1.5 hidden md:flex">
              <span className="size-2 rounded-full bg-[#c6b273]" />
              <span className="size-2 rounded-full bg-white/30" />
              <span className="size-2 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
