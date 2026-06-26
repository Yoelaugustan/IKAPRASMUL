"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { AlumniEvent } from "@/types";
import { EVENT_CATEGORIES } from "@/constants/categories";
import { cn } from "@/lib/utils";
import { scrollToElement } from "@/lib/scroll";
import { formatDate } from "@/lib/format";
import { EmptyState } from "@/components/shared/EmptyState";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { useLang } from "@/components/shared/LanguageProvider";
import { FeaturedEvent } from "./FeaturedEvent";
import { EventListCard } from "./EventListCard";
import { EventCalendar } from "./EventCalendar";

const PAGE_SIZE = 9;
const UPCOMING_COUNT = 3;

const dayKey = (iso: string) => (iso || "").slice(0, 10);

export function EventsView({
  featuredEvent,
  events,
}: {
  featuredEvent?: AlumniEvent;
  events: AlumniEvent[];
}) {
  const { t, lang } = useLang();
  const [viewAll, setViewAll] = useState(false);
  const [category, setCategory] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  const todayKey = new Date().toISOString().slice(0, 10);

  const sorted = useMemo(
    () => [...events].sort((a, b) => (a.date || "").localeCompare(b.date || "")),
    [events],
  );

  // Counts per category for the sidebar.
  const counts = useMemo(
    () =>
      EVENT_CATEGORIES.map((c) => ({
        category: c as string,
        count: events.filter((e) => e.category === c).length,
      })),
    [events],
  );

  const scrollToContent = () =>
    requestAnimationFrame(() => scrollToElement(contentRef.current));

  const selectCategory = (cat: string) => {
    setCategory(cat);
    setViewAll(true);
    setSelectedDate(null);
    setPage(1);
    scrollToContent();
  };

  const selectDate = (date: string | null) => {
    setSelectedDate(date);
    setPage(1);
    if (date) scrollToContent();
  };

  const backToFeatured = () => {
    setViewAll(false);
    setCategory("All");
    setSelectedDate(null);
    setPage(1);
    scrollToContent();
  };

  /* ----------------------------- Sidebar ----------------------------- */
  const sidebar = (
    <div className="space-y-6">
      <EventCalendar
        events={events}
        selectedDate={selectedDate}
        onSelectDate={selectDate}
      />
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">
          {t.events.categories}
        </p>
        <ul className="space-y-1">
          {counts.map(({ category: c, count }) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => selectCategory(c)}
                className={cn(
                  "group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                  category === c
                    ? "bg-secondary font-semibold text-primary"
                    : "text-foreground/70 hover:bg-secondary hover:text-primary",
                )}
              >
                <span>{c}</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">{count}</span>
                  <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (events.length === 0) {
    return (
      <EmptyState
        title={t.events.noEventsTitle}
        description={t.events.noEventsDesc}
      />
    );
  }

  /* --------------------------- Main content --------------------------- */
  let main: React.ReactNode;

  if (selectedDate) {
    // Calendar day picked — show every event on that date.
    const dayEvents = sorted.filter((e) => dayKey(e.date) === selectedDate);
    const niceDate = formatDate(`${selectedDate}T00:00:00`);
    main = (
      <div className="min-w-0">
        <SectionHeading
          title={`${t.events.onThisDay} · ${niceDate}`}
          action={
            <button
              type="button"
              onClick={() => selectDate(null)}
              className="inline-flex items-center gap-1 text-[13px] font-bold text-[#c6b273] transition-colors hover:text-[#b4a05e]"
            >
              <X className="size-4" /> {t.events.clearDate}
            </button>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {dayEvents.map((e) => (
            <EventListCard key={e.slug} event={e} />
          ))}
        </div>
      </div>
    );
  } else if (viewAll) {
    // Full, category-filtered, paginated list.
    const filtered =
      category === "All"
        ? sorted
        : sorted.filter((e) => e.category === category);
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    main = (
      <div className="min-w-0">
        <SectionHeading
          title={category === "All" ? t.events.allEvents : category}
          action={
            <button
              type="button"
              onClick={backToFeatured}
              className="inline-flex items-center gap-1 text-[13px] font-bold text-[#c6b273] transition-colors hover:text-[#b4a05e]"
            >
              <ChevronLeft className="size-4" /> {t.events.backToFeatured}
            </button>
          }
        />
        <CategoryTabs
          options={EVENT_CATEGORIES}
          value={category}
          onChange={(c) => {
            setCategory(c);
            setPage(1);
          }}
          className="mb-6"
        />
        {pageItems.length === 0 ? (
          <EmptyState
            title={t.events.noEventsTitle}
            description={t.events.noEventsDesc}
          />
        ) : (
          <>
            <div
              key={`${category}-${currentPage}`}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {pageItems.map((e, i) => (
                <div
                  key={e.slug}
                  className="h-full motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 [animation-fill-mode:both] duration-500"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <EventListCard event={e} />
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPage(p);
                      scrollToContent();
                    }}
                    className={cn(
                      "size-9 rounded-full text-sm font-semibold transition-colors",
                      p === currentPage
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:bg-secondary hover:text-primary",
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  } else {
    // Default — featured event + an upcoming grid with a "view all" link.
    // Future-dated events lead; if there aren't enough to fill the grid, top up
    // with the most recent remaining events so the section always feels full.
    const isFeatured = (e: AlumniEvent) => e.slug === featuredEvent?.slug;
    const upcoming = sorted.filter(
      (e) => dayKey(e.date) >= todayKey && !isFeatured(e),
    );
    const fillers = [...sorted]
      .reverse()
      .filter((e) => !isFeatured(e) && !upcoming.includes(e));
    const grid = [...upcoming, ...fillers].slice(0, UPCOMING_COUNT);

    main = (
      <div className="min-w-0 space-y-12">
        {featuredEvent && (
          <div>
            <SectionHeading title={t.events.featured} />
            <FeaturedEvent event={featuredEvent} />
          </div>
        )}
        <div>
          <SectionHeading
            title={t.events.upcoming}
            action={
              <button
                type="button"
                onClick={() => {
                  setViewAll(true);
                  scrollToContent();
                }}
                className="inline-flex items-center gap-1 text-[13px] font-bold text-[#c6b273] transition-colors hover:text-[#b4a05e]"
              >
                {t.events.viewAll} <ArrowRight className="size-4" />
              </button>
            }
          />
          {grid.length === 0 ? (
            <EmptyState
              title={t.events.noEventsTitle}
              description={t.events.noEventsDesc}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((e, i) => (
                <div
                  key={e.slug}
                  className="h-full motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 [animation-fill-mode:both] duration-500"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <EventListCard event={e} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={contentRef}
      key={lang}
      className="scroll-mt-24 grid gap-x-8 gap-y-12 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 xl:grid-cols-[320px_1fr]"
    >
      {/* Calendar + categories on the left, content on the right — a mirror of
          the Stories layout so the two pages don't read the same. Content stays
          first in the DOM so it leads on mobile, then is placed right on xl. */}
      <div className="min-w-0 xl:col-start-2 xl:row-start-1">{main}</div>
      <div className="xl:col-start-1 xl:row-start-1">{sidebar}</div>
    </div>
  );
}

function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="w-fit">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-primary">
          {title}
        </h2>
        <span className="mt-2 block h-1 w-16 rounded-full bg-gold" />
      </div>
      {action}
    </div>
  );
}
