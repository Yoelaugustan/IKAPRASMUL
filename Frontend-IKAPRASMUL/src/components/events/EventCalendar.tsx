"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AlumniEvent } from "@/types";
import { cn } from "@/lib/utils";
import { useLang } from "@/components/shared/LanguageProvider";

// Local date key (YYYY-MM-DD) taken straight from the ISO string so the day
// never shifts across timezones.
const dayKey = (iso: string) => (iso || "").slice(0, 10);
const monthKey = (y: number, m: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}`;

export function EventCalendar({
  events,
  selectedDate,
  onSelectDate,
}: {
  events: AlumniEvent[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}) {
  const { lang, t } = useLang();
  const locale = lang === "id" ? "id-ID" : "en-GB";

  // Days that have at least one event, by YYYY-MM-DD.
  const eventDays = useMemo(() => {
    const set = new Set<string>();
    for (const e of events) if (e.date) set.add(dayKey(e.date));
    return set;
  }, [events]);

  // Start on the month of the soonest event (or today) so the dots are visible.
  const initial = useMemo(() => {
    const keys = [...eventDays].sort();
    const todayKey = new Date().toISOString().slice(0, 10);
    const next = keys.find((k) => k >= todayKey) ?? keys[0];
    const base = next ? new Date(`${next}T00:00:00`) : new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  }, [eventDays]);

  const [view, setView] = useState(initial);

  const { year, month } = view;
  const monthLabel = new Date(year, month, 1).toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });

  // Monday-first weekday headers (Mon..Sun), localized & short.
  const weekdays = useMemo(() => {
    const ref = new Date(2024, 0, 1); // a Monday
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(ref);
      d.setDate(ref.getDate() + i);
      return d.toLocaleDateString(locale, { weekday: "short" });
    });
  }, [locale]);

  // Grid cells: leading blanks (Monday-first) + each day of the month.
  const cells = useMemo(() => {
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // 0 = Mon
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const list: (number | null)[] = Array(firstWeekday).fill(null);
    for (let d = 1; d <= daysInMonth; d++) list.push(d);
    return list;
  }, [year, month]);

  const todayKey = new Date().toISOString().slice(0, 10);

  const shift = (delta: number) => {
    const d = new Date(year, month + delta, 1);
    setView({ year: d.getFullYear(), month: d.getMonth() });
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold text-primary">{monthLabel}</p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Previous month"
            className="grid size-7 place-items-center rounded-full text-slate-500 transition-colors hover:bg-secondary hover:text-primary"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Next month"
            className="grid size-7 place-items-center rounded-full text-slate-500 transition-colors hover:bg-secondary hover:text-primary"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {weekdays.map((w) => (
          <span
            key={w}
            className="pb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400"
          >
            {w.slice(0, 3)}
          </span>
        ))}

        {cells.map((day, i) => {
          if (day === null) return <span key={`b-${i}`} />;
          const key = `${monthKey(year, month)}-${String(day).padStart(2, "0")}`;
          const hasEvent = eventDays.has(key);
          const isSelected = selectedDate === key;
          const isToday = key === todayKey;

          return (
            <div key={key} className="flex justify-center py-0.5">
              <button
                type="button"
                disabled={!hasEvent}
                onClick={() => onSelectDate(isSelected ? null : key)}
                aria-pressed={isSelected}
                aria-label={`${day}${hasEvent ? " — has events" : ""}`}
                className={cn(
                  "grid size-8 place-items-center rounded-full text-[13px] transition-[background-color,transform]",
                  !hasEvent && "text-slate-400",
                  hasEvent &&
                    !isSelected &&
                    "cursor-pointer bg-primary font-bold text-primary-foreground hover:bg-primary-dark hover:scale-110",
                  isSelected &&
                    "bg-primary-dark font-bold text-primary-foreground shadow-sm ring-2 ring-primary",
                  isToday && !isSelected && !hasEvent && "font-bold text-primary",
                )}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-[11px] text-muted-foreground">
        <span className="grid size-4 place-items-center rounded-full bg-primary motion-safe:animate-pulse" />
        <span>{t.events.hasEvents}</span>
      </div>
    </div>
  );
}
