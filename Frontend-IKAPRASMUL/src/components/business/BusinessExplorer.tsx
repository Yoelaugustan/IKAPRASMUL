"use client";

import { useMemo, useState } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";
import { ArrowRight, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import {
  BriefcaseIcon,
  MapPinIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";
import type { Business } from "@/types";
import { INDUSTRIES } from "@/constants/categories";
import { Container } from "@/components/layouts/Container";
import { cn } from "@/lib/utils";
import {
  useHasHydrated,
  useSavedBusinessStore,
} from "@/stores/savedBusinessStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BusinessCard } from "./BusinessCard";
import { BusinessSpotlight } from "./BusinessSpotlight";
import { EmptyState } from "@/components/shared/EmptyState";
import { INDUSTRY_ICONS } from "./industryMeta";

const INDUSTRY_TABS = ["All", ...INDUSTRIES];
const fieldClass =
  "h-11 rounded-lg border border-white/10 bg-[#06203f] text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40";

const EMPTY_FILTERS = {
  query: "",
  industry: "All",
  location: "All",
  founder: "All",
};

const FEATURED_COUNT = 8; // curated default grid (shown beside the spotlight)
const PAGE_SIZE = 12; // view-all grid, per page

export function BusinessExplorer({ businesses }: { businesses: Business[] }) {
  // Draft values being edited in the search bar.
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("All");
  const [location, setLocation] = useState("All");
  const [founder, setFounder] = useState("All");
  // Applied filters — only these drive the list. Updated on Search / tab click.
  const [applied, setApplied] = useState(EMPTY_FILTERS);
  // "View all" stage: spotlight hidden, full-width paginated grid.
  const [viewAll, setViewAll] = useState(false);
  const [page, setPage] = useState(1);
  // "Saved" view (browser-local bookmarks).
  const [savedOnly, setSavedOnly] = useState(false);
  const savedSlugs = useSavedBusinessStore((s) => s.saved);
  const hydrated = useHasHydrated();

  const locations = useMemo(
    () => Array.from(new Set(businesses.map((b) => b.location))),
    [businesses],
  );
  const founders = useMemo(
    () => Array.from(new Set(businesses.map((b) => b.founder.name))),
    [businesses],
  );

  // Default stage shows a curated set; view-all shows everything (filtered).
  const featuredBusinesses = businesses.slice(0, FEATURED_COUNT);

  const filtered = useMemo(() => {
    const q = applied.query.trim().toLowerCase();
    return businesses.filter((b) => {
      const ms = !savedOnly || savedSlugs.includes(b.slug);
      const mi = applied.industry === "All" || b.industry === applied.industry;
      const ml = applied.location === "All" || b.location === applied.location;
      const mf = applied.founder === "All" || b.founder.name === applied.founder;
      const mq =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.founder.name.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q);
      return ms && mi && ml && mf && mq;
    });
  }, [businesses, applied, savedOnly, savedSlugs]);

  // Pagination over the filtered set (view-all stage).
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Search button: commit drafts and enter the view-all stage.
  const applySearch = () => {
    setApplied({ query, industry, location, founder });
    setSavedOnly(false);
    setViewAll(true);
    setPage(1);
  };

  // Industry tab: filter + enter view-all (and keep the dropdown in sync).
  const selectIndustry = (value: string) => {
    setIndustry(value);
    setApplied((prev) => ({ ...prev, industry: value }));
    setSavedOnly(false);
    setViewAll(true);
    setPage(1);
  };

  const {
    ref: tabsRef,
    onMouseDown: onTabsMouseDown,
    wasDragged: tabsWasDragged,
  } = useDragScroll();

  const resetFilters = () => {
    setQuery("");
    setIndustry("All");
    setLocation("All");
    setFounder("All");
    setApplied(EMPTY_FILTERS);
    setSavedOnly(false);
  };

  // "View All Businesses": show everything, no filter.
  const openViewAll = () => {
    resetFilters();
    setViewAll(true);
    setPage(1);
  };

  // "Saved": view-all stage limited to bookmarked businesses.
  const openSaved = () => {
    resetFilters();
    setSavedOnly(true);
    setViewAll(true);
    setPage(1);
  };

  // Back to the curated featured + spotlight view.
  const backToFeatured = () => {
    resetFilters();
    setViewAll(false);
    setPage(1);
  };

  return (
    <div className="bg-slate-50 pb-16">
      {/* ---- Search bar (overlaps the hero) ---- */}
      <Container>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            applySearch();
          }}
          className="relative z-10 -mt-10 flex flex-col gap-3 rounded-2xl bg-[#0a2a52] p-4 shadow-2xl ring-1 ring-white/10 lg:flex-row lg:items-center"
        >
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search business, founder, or company"
              aria-label="Search businesses"
              className={cn(fieldClass, "w-full pl-10 pr-4")}
            />
          </div>

          <SelectField
            icon={BriefcaseIcon}
            value={industry}
            onChange={setIndustry}
            allLabel="Industry"
            options={INDUSTRIES}
          />
          <SelectField
            icon={MapPinIcon}
            value={location}
            onChange={setLocation}
            allLabel="Location"
            options={locations}
          />
          <SelectField
            icon={UserIcon}
            value={founder}
            onChange={setFounder}
            allLabel="Founder"
            options={founders}
          />

          <button
            type="submit"
            className="h-11 shrink-0 rounded-lg bg-gold px-7 text-sm font-bold text-gold-foreground transition-colors hover:bg-gold-dark"
          >
            Search
          </button>
        </form>
      </Container>

      {/* ---- Browse by Industry + Featured + Spotlight ---- */}
      <Container className="mt-10">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          {/* Browse by Industry */}
          <SectionLabel>Browse by Industry</SectionLabel>
          <div
            ref={tabsRef}
            onMouseDown={onTabsMouseDown}
            className="mt-5 flex cursor-grab gap-3 overflow-x-auto pb-2 select-none [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
          >
            {INDUSTRY_TABS.map((tab) => {
              const Icon = INDUSTRY_ICONS[tab] ?? BriefcaseIcon;
              const active = applied.industry === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    if (tabsWasDragged()) return;
                    selectIndustry(tab);
                  }}
                  className={cn(
                    "flex w-24 shrink-0 flex-col items-center gap-2 rounded-xl px-3 py-4 text-center transition-colors",
                    active
                      ? "bg-[#0a192f] text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-5",
                      active ? "text-gold" : "text-slate-500",
                    )}
                  />
                  <span className="text-[11px] font-semibold leading-tight">
                    {tab === "All" ? "All Industries" : tab}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ---- Default: Featured + Spotlight ---- */}
          {!viewAll ? (
            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <SectionLabel>Featured Businesses</SectionLabel>
                  <div className="flex items-center gap-4">
                    {hydrated && savedSlugs.length > 0 && (
                      <button
                        type="button"
                        onClick={openSaved}
                        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-500 transition-colors hover:text-gold"
                      >
                        <Bookmark className="size-4" /> Saved ({savedSlugs.length}
                        )
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={openViewAll}
                      className="inline-flex items-center gap-1 text-[13px] font-bold text-gold transition-colors hover:text-gold-dark"
                    >
                      View All Businesses <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
                  {featuredBusinesses.map((b) => (
                    <BusinessCard key={b.slug} business={b} />
                  ))}
                </div>
              </div>

              <BusinessSpotlight />
            </div>
          ) : (
            /* ---- View all: full-width paginated grid ---- */
            <div className="mt-12">
              <div className="mb-6 flex items-center justify-between gap-4">
                <SectionLabel>
                  {savedOnly
                    ? "Saved Businesses"
                    : applied.industry === "All"
                      ? "All Businesses"
                      : applied.industry}
                </SectionLabel>
                <button
                  type="button"
                  onClick={backToFeatured}
                  className="inline-flex items-center gap-1 text-[13px] font-bold text-gold transition-colors hover:text-gold-dark"
                >
                  <ChevronLeft className="size-4" /> Back
                </button>
              </div>

              {pageItems.length === 0 ? (
                <EmptyState
                  title={
                    savedOnly ? "No saved businesses yet" : "No businesses found"
                  }
                  description={
                    savedOnly
                      ? "Tap the bookmark on any business to save it here."
                      : "Try a different search term, industry, or filter."
                  }
                />
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                    {pageItems.map((b) => (
                      <BusinessCard key={b.slug} business={b} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPage={setPage}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPage,
}: {
  currentPage: number;
  totalPages: number;
  onPage: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="grid size-9 place-items-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPage(p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={cn(
            "size-9 rounded-md text-sm font-bold transition-colors",
            p === currentPage
              ? "bg-[#00396c] text-white"
              : "text-slate-600 hover:bg-slate-100",
          )}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="grid size-9 place-items-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-4 w-1 rounded bg-[#0a192f]" />
      <h2 className="text-sm font-bold uppercase tracking-widest text-[#00396c]">
        {children}
      </h2>
    </div>
  );
}

function SelectField({
  icon: Icon,
  value,
  onChange,
  allLabel,
  options,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
  options: readonly string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label={allLabel}
        className={cn(
          "h-11 w-full gap-2 rounded-lg border-white/10 bg-[#06203f] px-3.5 text-sm text-white shadow-none focus-visible:border-gold/50 focus-visible:ring-gold/30 data-[size=default]:h-11 lg:w-44 [&>svg:last-child]:text-white/50",
          value === "All" && "text-white/55",
        )}
      >
        <Icon className="size-4 shrink-0 text-white/50" />
        <SelectValue placeholder={allLabel} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={6}
        className="min-w-[12rem] rounded-xl border-slate-200 shadow-lg"
      >
        <SelectItem value="All">{allLabel}</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
