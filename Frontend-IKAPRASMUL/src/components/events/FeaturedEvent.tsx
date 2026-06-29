"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import type { AlumniEvent } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { formatDate, htmlToText } from "@/lib/format";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/shared/EmptyState";
import { useLang } from "@/components/shared/LanguageProvider";

export function FeaturedEvent({ events }: { events: AlumniEvent[] }) {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const count = events.length;
  const paused = hovering;

  if (count === 0) {
    return (
      <EmptyState
        title={t.events.noEventsTitle}
        description={t.events.noEventsDesc}
      />
    );
  }

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Sliding track */}
      <div
        className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {events.map((event, i) => (
          <div key={event.slug} className="min-w-full grid md:grid-cols-2">
            <Link
              href={ROUTES.eventDetail(event.slug)}
              tabIndex={i === index ? 0 : -1}
              className="relative block aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[280px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            >
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
              />
            </Link>

            <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-8">
              {event.category && (
                <Badge variant="secondary" className="w-fit uppercase tracking-wide">
                  {event.category}
                </Badge>
              )}
              <h3 className="mt-3 text-xl font-bold leading-tight text-primary sm:text-2xl">
                {event.title}
              </h3>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CalendarDays className="size-4 shrink-0 text-gold" />
                  {formatDate(event.date)}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0 text-gold" />
                  {event.location}
                </p>
              </div>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-foreground/75">
                {htmlToText(event.description)}
              </p>
              <Link
                href={ROUTES.eventDetail(event.slug)}
                tabIndex={i === index ? 0 : -1}
                className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-primary transition-all hover:gap-2.5 focus-visible:outline-none focus-visible:underline"
              >
                {t.events.viewDetails} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          {/* Prev / next — visible on mobile, revealed on hover for desktop */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t.events.prevEvent}
            className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-primary/80 text-white shadow-sm backdrop-blur-sm transition hover:bg-primary focus-visible:opacity-100 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t.events.nextEvent}
            className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-primary/80 text-white shadow-sm backdrop-blur-sm transition hover:bg-primary focus-visible:opacity-100 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 right-7 flex gap-1.5">
            {events.map((e, i) => (
              <button
                key={e.slug}
                type="button"
                aria-label={`${t.events.goToEvent} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  i === index
                    ? "bg-primary"
                    : "bg-primary/25 hover:bg-primary/50",
                )}
              />
            ))}
          </div>

          {/* Auto-advance progress bar */}
          <div className="absolute inset-x-0 bottom-0 h-1 overflow-hidden bg-primary/10 motion-reduce:hidden">
            <div
              key={index}
              onAnimationEnd={() => setIndex((i) => (i + 1) % count)}
              style={{ animationPlayState: paused ? "paused" : "running" }}
              className="h-full origin-left bg-gold motion-safe:animate-[featured-progress_6000ms_linear_forwards]"
            />
          </div>
        </>
      )}
    </div>
  );
}
