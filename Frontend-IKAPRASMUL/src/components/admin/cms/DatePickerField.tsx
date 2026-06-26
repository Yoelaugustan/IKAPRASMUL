"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toLocalDate(isoDate: string): Date {
  // Parse as local midnight to avoid timezone shifts
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toIso(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

interface DatePickerFieldProps {
  value: string; // "YYYY-MM-DD" or ""
  onChange: (value: string) => void;
  error?: boolean;
}

export function DatePickerField({ value, onChange, error }: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const selected = value ? toLocalDate(value) : null;

  const [viewYear, setViewYear] = useState(() => (selected ?? today).getFullYear());
  const [viewMonth, setViewMonth] = useState(() => (selected ?? today).getMonth());

  const handleOpenChange = (next: boolean) => {
    if (next) {
      const base = selected ?? today;
      setViewYear(base.getFullYear());
      setViewMonth(base.getMonth());
    }
    setOpen(next);
  };

  const calendarCells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (Date | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const selectDay = (date: Date) => {
    onChange(toIso(date));
    setOpen(false);
  };

  const displayLabel = selected
    ? selected.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "Pick a date…";

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-9 w-full items-center gap-2.5 rounded-md border bg-background px-3 text-sm ring-offset-background transition-colors",
            "hover:border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            selected ? "text-foreground" : "text-muted-foreground",
            error && "border-destructive focus-visible:ring-destructive",
          )}
        >
          <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 text-left">{displayLabel}</span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-0 shadow-xl" align="start">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <button
            type="button"
            onClick={prevMonth}
            className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="text-sm font-semibold text-foreground">
            {MONTHS[viewMonth]} {viewYear}
          </div>
          <button
            type="button"
            onClick={nextMonth}
            className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="p-3">
          {/* Day-of-week labels */}
          <div className="mb-1 grid grid-cols-7">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-1 text-center text-[11px] font-medium text-muted-foreground">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {calendarCells.map((date, i) => {
              if (!date) return <div key={`pad-${i}`} />;
              const isSelected = selected?.getTime() === date.getTime();
              const isToday = today.getTime() === date.getTime();
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => selectDay(date)}
                  className={cn(
                    "mx-auto flex size-8 items-center justify-center rounded-md text-sm transition-colors",
                    isSelected
                      ? "bg-primary font-semibold text-primary-foreground"
                      : isToday
                        ? "border border-primary/30 font-medium text-primary hover:bg-primary/10"
                        : "font-normal text-foreground hover:bg-accent",
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Today shortcut */}
        <div className="border-t px-3 py-2.5">
          <button
            type="button"
            onClick={() => selectDay(today)}
            className="w-full rounded-md py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
          >
            Today — {today.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
