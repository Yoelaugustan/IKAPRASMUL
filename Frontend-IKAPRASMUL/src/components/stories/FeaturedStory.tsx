"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Story } from "@/types";
import { cn } from "@/lib/utils";
import { StoryDetailModal } from "./StoryDetailModal";

const AUTO_ADVANCE_MS = 6000;

export function FeaturedStory({ stories }: { stories: Story[] }) {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const count = stories.length;

  // Auto-cycle through the featured stories (paused when only one, or while the
  // detail modal is open).
  useEffect(() => {
    if (count <= 1 || modalOpen) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % count),
      AUTO_ADVANCE_MS,
    );
    return () => clearInterval(id);
  }, [count, modalOpen]);

  if (count === 0) return null;
  const story = stories[Math.min(index, count - 1)];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[15px] font-extrabold uppercase tracking-widest text-[#00396c]">
          FEATURED STORY
        </h2>
        <span className="mt-3 block h-px w-full bg-slate-200" />
      </div>
      <div className="flex flex-col overflow-hidden rounded-2xl bg-[#00396c] shadow-lg md:flex-row">
        {/* Left: Image */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="relative aspect-[4/3] w-full shrink-0 md:aspect-auto md:w-5/12"
        >
          <Image
            key={story.slug}
            src={story.coverImage}
            alt={story.title}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </button>

        {/* Right: Content */}
        <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
          <div>
            <span className="inline-block rounded-full bg-[#c6b273] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0a192f]">
              {story.category}
            </span>
          </div>
          <h3 className="mt-6 line-clamp-2 min-h-[2.5em] text-3xl font-bold leading-tight text-white md:text-4xl">
            {story.title}
          </h3>
          <p className="mt-4 line-clamp-3 min-h-[4.9em] max-w-lg text-[15px] leading-relaxed text-white/80">
            {story.excerpt}
          </p>
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded bg-[#c6b273] px-6 py-3 text-[13px] font-bold text-[#0a192f] transition-colors hover:bg-[#b4a05e]"
            >
              Read Full Story <ArrowRight className="size-4" />
            </button>

            {/* Carousel dots — cycle between the featured stories */}
            {count > 1 && (
              <div className="hidden gap-1.5 md:flex">
                {stories.map((s, i) => (
                  <button
                    key={s.slug}
                    type="button"
                    aria-label={`Show featured story ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "size-2 rounded-full transition-colors",
                      i === index
                        ? "bg-[#c6b273]"
                        : "bg-white/30 hover:bg-white/50",
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <StoryDetailModal
        story={story}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
