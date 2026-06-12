"use client";

import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import type { AlumniEvent } from "@/types";
import { formatDate } from "@/lib/format";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function EventCard({ event }: { event: AlumniEvent }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        className="group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-card shadow-md ring-1 ring-border/60 transition-shadow hover:shadow-lg"
        onClick={() => setOpen(true)}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
            Upcoming Event
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold leading-snug text-primary">
            {event.title}
          </h3>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4 shrink-0 text-gold" />
            {formatDate(event.date)} • {event.location}
          </p>
          <button
            className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary hover:gap-2.5 hover:underline"
            onClick={(e) => { e.stopPropagation(); setOpen(true); }}
          >
            Register Now <ArrowRight className="size-4" />
          </button>
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              sizes="512px"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
              Upcoming Event
            </span>
          </div>
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-xl text-primary">{event.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-2.5">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="size-4 shrink-0 text-gold" />
                {formatDate(event.date)}
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-gold" />
                {event.location}
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-foreground/80">
              {event.description}
            </p>
            <div className="mt-6">
              <Button asChild variant="gold" className="w-full">
                <a href={event.registerUrl ?? "#"}>Register Now</a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
