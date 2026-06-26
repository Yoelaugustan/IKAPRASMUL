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
import { useLang } from "@/components/shared/LanguageProvider";
import { industryBadgeClass } from "./industryMeta";

export function BusinessCard({ business }: { business: Business }) {
  const { t } = useLang();
  const hydrated = useHasHydrated();
  const savedRaw = useSavedBusinessStore((s) => s.saved.includes(business.slug));
  const toggleSaved = useSavedBusinessStore((s) => s.toggle);
  const isSaved = hydrated && savedRaw;

  return (
    <Link
      href={ROUTES.businessDetail(business.slug)}
      aria-label={`${t.cards.viewAria} ${business.name}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-300 ease-expo hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-18px_rgba(0,57,108,0.30)] active:scale-[0.98] active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00396c] focus-visible:ring-offset-2"
    >
      <div className="relative">
        <div className="relative overflow-hidden" style={{ paddingBottom: "62.5%" }}>
          <Image
            src={business.coverImage}
            alt={business.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-700 ease-expo group-hover:scale-[1.06]"
          />
        </div>

        {/* Save to localStorage — preventDefault so it doesn't navigate. */}
        <button
          type="button"
          aria-pressed={isSaved}
          aria-label={isSaved ? t.cards.removeSaved : t.cards.saveBusiness}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaved(business.slug);
          }}
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/95 text-slate-600 shadow-sm transition-[color,transform] hover:text-gold active:scale-75"
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
