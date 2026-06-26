"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { AlumniEvent } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { formatDate, htmlToText } from "@/lib/format";
import { useLang } from "@/components/shared/LanguageProvider";

// The single "Featured Event" spotlight — a wide two-up card (image + details),
// echoing the business spotlight / featured story treatment.
export function FeaturedEvent({ event }: { event: AlumniEvent }) {
  const { t } = useLang();
  return (
    <Link
      href={ROUTES.eventDetail(event.slug)}
      aria-label={`${t.events.viewDetails} ${event.title}`}
      className="group block overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-300 ease-expo hover:-translate-y-1 hover:shadow-[0_24px_55px_-20px_rgba(0,57,108,0.32)] active:scale-[0.98] active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00396c] focus-visible:ring-offset-2"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[240px]">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-7">
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
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-all group-hover:gap-2.5">
            {t.events.viewDetails} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
