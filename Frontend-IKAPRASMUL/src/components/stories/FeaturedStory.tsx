"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Story } from "@/types";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/shared/EmptyState";
import { StoryDetailModal } from "./StoryDetailModal";

function FeaturedStoryHeader() {
  return (
    <div className="mb-6">
      <h2 className="text-[15px] font-extrabold uppercase tracking-widest text-[#00396c]">
        FEATURED STORY
      </h2>
      <span className="mt-3 block h-px w-full bg-slate-200" />
    </div>
  );
}

export function FeaturedStory({ stories }: { stories: Story[] }) {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const count = stories.length;

  // Auto-advance is driven entirely by the progress bar's CSS animation: when
  // it completes we move to the next slide. Pausing the animation (on hover or
  // while the modal is open) freezes both the bar and the timer in sync, and
  // resumes from where it left off. Reduced-motion users get no auto-rotate.
  const paused = modalOpen || hovering;

  if (count === 0) {
    return (
      <div>
        <FeaturedStoryHeader />
        <EmptyState
          title="No featured story available right now"
          description="Stories couldn't be loaded. Please check back shortly."
        />
      </div>
    );
  }

  const active = stories[Math.min(index, count - 1)];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

  return (
    <div>
      <FeaturedStoryHeader />

      <div
        className="group relative overflow-hidden rounded-2xl bg-[#00396c] shadow-lg"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Sliding track */}
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {stories.map((story) => (
            <div
              key={story.slug}
              className="flex w-full shrink-0 flex-col lg:flex-row"
            >
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="relative aspect-[16/10] w-full shrink-0 lg:aspect-auto lg:w-5/12"
                tabIndex={story.slug === active.slug ? 0 : -1}
              >
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </button>

              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
                <div>
                  <span className="inline-block rounded-full bg-[#c6b273] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0a192f]">
                    {story.category}
                  </span>
                </div>
                <h3 className="mt-5 line-clamp-2 min-h-[2.5em] text-2xl font-bold leading-tight text-white sm:mt-6 sm:text-3xl lg:text-[28px] xl:text-4xl">
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
              className="absolute left-3 top-[28%] grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-white opacity-100 backdrop-blur-sm transition hover:bg-black/55 focus-visible:opacity-100 lg:top-1/2 lg:opacity-0 lg:group-hover:opacity-100"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next story"
              className="absolute right-3 top-[28%] grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-white opacity-100 backdrop-blur-sm transition hover:bg-black/55 focus-visible:opacity-100 lg:top-1/2 lg:opacity-0 lg:group-hover:opacity-100"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 right-8 flex gap-1.5">
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

            {/* Auto-advance progress — the animation IS the timer: it freezes
                when paused and advances the slide when it completes. */}
            <div className="absolute inset-x-0 bottom-0 h-1 overflow-hidden bg-white/15 motion-reduce:hidden">
              <div
                key={index}
                onAnimationEnd={() => setIndex((i) => (i + 1) % count)}
                style={{ animationPlayState: paused ? "paused" : "running" }}
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
