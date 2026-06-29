"use client";

import { useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowUpDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { AlumniEvent, Paginated } from "@/types";
import { EVENT_CATEGORIES } from "@/constants/categories";
import { cn } from "@/lib/utils";
import { scrollToElement } from "@/lib/scroll";
import { formatDate } from "@/lib/format";
import { EmptyState } from "@/components/shared/EmptyState";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLang } from "@/components/shared/LanguageProvider";
import { FeaturedEvent } from "./FeaturedEvent";
import { EventListCard } from "./EventListCard";
import { EventCalendar } from "./EventCalendar";

const UPCOMING_COUNT = 3;
type Sort = "date_asc" | "date_desc" | "newest";

const dayKey = (iso: string) => (iso || "").slice(0, 10);

export function EventsView({
  featuredEvents,
  events,
  pagedEvents,
}: {
  featuredEvents: AlumniEvent[];
  /** Full unfiltered list — used for the calendar and upcoming section. */
  events: AlumniEvent[];
  /** Server-paginated list for the "view all" mode. */
  pagedEvents: Paginated<AlumniEvent>;
}) {
  const { t, lang } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const contentRef = useRef<HTMLDivElement>(null);

  // URL-driven state.
  const viewAll = searchParams.get("view") === "all";
  const category = searchParams.get("category") || "All";
  const sort = (searchParams.get("sort") || "date_asc") as Sort;
  const selectedDate = searchParams.get("date") || null;

  const todayKey = new Date().toISOString().slice(0, 10);

  const sorted = useMemo(
    () => [...events].sort((a, b) => (a.date || "").localeCompare(b.date || "")),
    [events],
  );

  // Initial calendar month: soonest upcoming event, or today.
  const initialMonth = useMemo(() => {
    const todayPrefix = todayKey.slice(0, 10);
    const next = sorted.find((e) => (e.date || "").slice(0, 10) >= todayPrefix);
    const base = next ? new Date(`${(next.date || "").slice(0, 10)}T00:00:00`) : new Date();
    return `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}`;
  }, [sorted, todayKey]);

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

  const setParams = (
    next: Partial<{ view: string | null; category: string | null; sort: string | null; page: string | null; date: string | null }>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === "" || v === "All") params.delete(k);
      else params.set(k, v);
    }
    if ("category" in next || "sort" in next || "date" in next) params.delete("page");
    // date-view and view-all are mutually exclusive.
    if ("date" in next && next.date) params.delete("view");
    if ("view" in next && next.view) params.delete("date");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const selectCategory = (cat: string) => {
    setParams({ category: cat, view: "all", date: null });
    scrollToContent();
  };

  const selectDate = (date: string | null) => {
    setParams({ date });
    if (date) scrollToContent();
  };

  const backToFeatured = () => {
    router.push(pathname, { scroll: false });
    scrollToContent();
  };

  const goToPage = (p: number) => {
    setParams({ page: p > 1 ? String(p) : null });
    scrollToContent();
  };

  /* ----------------------------- Sidebar ----------------------------- */
  const sidebar = (
    <div className="space-y-6">
      <EventCalendar
        initialMonth={initialMonth}
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
                  category === c && viewAll
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
    const niceDate = formatDate(`${selectedDate}T00:00:00`);
    const { items: dayItems } = pagedEvents;
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
        {dayItems.length === 0 ? (
          <EmptyState title={t.events.noEventsTitle} description={t.events.noEventsDesc} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {dayItems.map((e) => (
              <EventListCard key={e.slug} event={e} />
            ))}
          </div>
        )}
      </div>
    );
  } else if (viewAll) {
    const { items: pageItems, totalPages, page: currentPage } = pagedEvents;

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
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <CategoryTabs
            options={EVENT_CATEGORIES}
            value={category}
            onChange={(c) => setParams({ category: c })}
            className="flex-1"
          />
          <Select
            value={sort}
            onValueChange={(v) => setParams({ sort: v })}
          >
            <SelectTrigger className="h-auto w-auto shrink-0 gap-1.5 border-0 bg-transparent px-0 shadow-none text-sm font-medium text-muted-foreground hover:text-foreground focus:ring-0">
              <ArrowUpDown className="size-3.5 shrink-0" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date_asc">{t.events.sortDateAsc ?? "Soonest first"}</SelectItem>
              <SelectItem value="date_desc">{t.events.sortDateDesc ?? "Latest first"}</SelectItem>
              <SelectItem value="newest">{t.events.sortNewest ?? "Recently added"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                    onClick={() => goToPage(p)}
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
    const upcoming = sorted.filter((e) => dayKey(e.date) >= todayKey);
    const fillers = [...sorted].reverse().filter((e) => !upcoming.includes(e));
    const grid = [...upcoming, ...fillers].slice(0, UPCOMING_COUNT);

    main = (
      <div className="min-w-0 space-y-12">
        {featuredEvents.length > 0 && (
          <div>
            <SectionHeading title={t.events.featured} />
            <FeaturedEvent events={featuredEvents} />
          </div>
        )}
        <div>
          <SectionHeading
            title={t.events.upcoming}
            action={
              <button
                type="button"
                onClick={() => { setParams({ view: "all" }); scrollToContent(); }}
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
