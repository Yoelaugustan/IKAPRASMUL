"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Story } from "@/types";
import { cn } from "@/lib/utils";
import { StoryDetailModal } from "./StoryDetailModal";

const AUTO_ADVANCE_MS = 6000;

export function FeaturedStory({ stories }: { stories: Story[] }) {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const count = stories.length;

  // Auto-advance: a fresh timer re-arms after every slide change (manual or
  // auto), so it stays in sync with the progress bar. Paused while the detail
  // modal is open.
  useEffect(() => {
    if (count <= 1 || modalOpen) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % count),
      AUTO_ADVANCE_MS,
    );
    return () => clearTimeout(t);
  }, [index, count, modalOpen]);

  if (count === 0) return null;
  const active = stories[Math.min(index, count - 1)];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[15px] font-extrabold uppercase tracking-widest text-[#00396c]">
          FEATURED STORY
        </h2>
        <span className="mt-3 block h-px w-full bg-slate-200" />
      </div>

      <div className="group relative overflow-hidden rounded-2xl bg-[#00396c] shadow-lg">
        {/* Sliding track */}
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {stories.map((story) => (
            <div
              key={story.slug}
              className="flex w-full shrink-0 flex-col md:flex-row"
            >
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="relative aspect-[4/3] w-full shrink-0 md:aspect-auto md:w-5/12"
                tabIndex={story.slug === active.slug ? 0 : -1}
              >
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </button>

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
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    tabIndex={story.slug === active.slug ? 0 : -1}
                    className="inline-flex items-center gap-2 rounded bg-[#c6b273] px-6 py-3 text-[13px] font-bold text-[#0a192f] transition-colors hover:bg-[#b4a05e]"
                  >
                    Read Full Story <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            {/* Prev / next — revealed on hover */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous story"
              className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition hover:bg-black/55 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next story"
              className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition hover:bg-black/55 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 right-8 hidden gap-1.5 md:flex">
              {stories.map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  aria-label={`Go to story ${i + 1}`}
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

            {/* Auto-advance progress */}
            <div className="absolute inset-x-0 bottom-0 h-1 overflow-hidden bg-white/15">
              <div
                key={`${index}-${modalOpen}`}
                className="h-full origin-left bg-[#c6b273] motion-safe:animate-[featured-progress_6000ms_linear_forwards]"
              />
            </div>
          </>
        )}
      </div>

      <StoryDetailModal
        story={active}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
