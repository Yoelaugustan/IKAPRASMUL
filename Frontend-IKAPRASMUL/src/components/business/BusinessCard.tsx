"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { MapPinIcon } from "@/components/icons";
import type { Business } from "@/types";
import { cn } from "@/lib/utils";
import {
  useHasHydrated,
  useSavedBusinessStore,
} from "@/stores/savedBusinessStore";
import { ROUTES } from "@/constants/routes";
import { industryBadgeClass } from "./industryMeta";

export function BusinessCard({ business }: { business: Business }) {
  const hydrated = useHasHydrated();
  const savedRaw = useSavedBusinessStore((s) => s.saved.includes(business.slug));
  const toggleSaved = useSavedBusinessStore((s) => s.toggle);
  const isSaved = hydrated && savedRaw;

  return (
    <Link
      href={ROUTES.businessDetail(business.slug)}
      aria-label={`View ${business.name}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00396c] focus-visible:ring-offset-2"
    >
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={business.coverImage}
            alt={business.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Save to localStorage — preventDefault so it doesn't navigate. */}
        <button
          type="button"
          aria-pressed={isSaved}
          aria-label={isSaved ? "Remove from saved" : "Save business"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaved(business.slug);
          }}
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/95 text-slate-600 shadow-sm transition-colors hover:text-gold"
        >
          <Bookmark className={cn("size-4", isSaved && "fill-gold text-gold")} />
        </button>

        {/* Logo badge overlapping the image */}
        <div className="absolute -bottom-5 left-4 size-12 overflow-hidden rounded-full border-2 border-white bg-white shadow">
          <Image
            src={business.logo}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-5 pt-7">
        <span
          className={cn(
            "w-fit rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
            industryBadgeClass(business.industry),
          )}
        >
          {business.industry}
        </span>
        <h3 className="mt-2.5 text-[15px] font-bold leading-snug text-slate-900 group-hover:text-primary">
          {business.name}
        </h3>
        <p className="mt-1 text-[13px] text-slate-500">
          {business.founder.name} ({business.founder.class})
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-[13px] text-slate-500">
          <MapPinIcon className="size-3.5 shrink-0 text-gold" />
          {business.location}
        </p>
      </div>
    </Link>
  );
}
