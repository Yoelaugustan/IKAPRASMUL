"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { AlumniEvent } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/format";
import { useLang } from "@/components/shared/LanguageProvider";

// Grid card for the events listing — mirrors StoryCard's shape with the shared
// branded lift + cinematic image zoom.
export function EventListCard({ event }: { event: AlumniEvent }) {
  const { t } = useLang();
  return (
    <Link
      href={ROUTES.eventDetail(event.slug)}
      aria-label={`${t.events.viewDetails} ${event.title}`}
      className="group block h-full rounded-2xl transition-transform duration-300 ease-expo active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00396c] focus-visible:ring-offset-2"
    >
      <Card className="h-full overflow-hidden rounded-2xl border border-slate-100/80 p-0 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-[transform,box-shadow] duration-300 ease-expo group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_45px_-18px_rgba(0,57,108,0.30)]">
        <div className="flex h-full flex-col">
          <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.06]"
            />
            {event.category && (
              <Badge className="absolute left-3 top-3 bg-[#00396c] text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#00396c]">
                {event.category}
              </Badge>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-gold">
              <CalendarDays className="size-3.5 shrink-0" />
              {formatDate(event.date)}
            </p>
            <h3 className="mt-2 text-[16px] font-bold leading-snug text-slate-900 group-hover:text-primary">
              {event.title}
            </h3>
            <p className="mt-auto flex items-center gap-1.5 pt-4 text-[13px] text-slate-500">
              <MapPin className="size-3.5 shrink-0 text-gold" />
              {event.location}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
