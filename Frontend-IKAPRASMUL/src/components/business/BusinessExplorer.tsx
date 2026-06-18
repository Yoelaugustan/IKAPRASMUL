"use client";

import { useMemo, useRef, useState } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";
import { scrollToElement } from "@/lib/scroll";
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
import { useLang } from "@/components/shared/LanguageProvider";
import { INDUSTRY_ICONS } from "./industryMeta";

const INDUSTRY_TABS = ["All", ...INDUSTRIES];
const INDUSTRY_SET = new Set<string>(INDUSTRIES);
const normalizeIndustry = (ind: string) => INDUSTRY_SET.has(ind) ? ind : "Other";
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
  const { t } = useLang();
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
  // Spotlight: the flagged business, else the first listing (undefined if none).
  const spotlight = businesses.find((b) => b.isSpotlight) ?? businesses[0];

  const filtered = useMemo(() => {
    const q = applied.query.trim().toLowerCase();
    return businesses.filter((b) => {
      const ms = !savedOnly || savedSlugs.includes(b.slug);
      const mi = applied.industry === "All" || normalizeIndustry(b.industry) === applied.industry;
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

  const applySearch = () => {
    setApplied({ query, industry, location, founder });
    setSavedOnly(false);
    setViewAll(true);
    setPage(1);
    scrollToPanel();
  };

  const selectIndustry = (value: string) => {
    setIndustry(value);
    setApplied((prev) => ({ ...prev, industry: value }));
    setSavedOnly(false);
    setViewAll(true);
    setPage(1);
    scrollToPanel();
  };

  const {
    ref: tabsRef,
    onMouseDown: onTabsMouseDown,
    wasDragged: tabsWasDragged,
  } = useDragScroll();

  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToPanel = () =>
    requestAnimationFrame(() => scrollToElement(panelRef.current));

  // Page changes land at the top of the results, not the filter bar.
  const goToPage = (p: number) => {
    setPage(p);
    scrollToElement(resultsRef.current);
  };

  const resetFilters = () => {
    setQuery("");
    setIndustry("All");
    setLocation("All");
    setFounder("All");
    setApplied(EMPTY_FILTERS);
    setSavedOnly(false);
  };

  const openViewAll = () => {
    resetFilters();
    setViewAll(true);
    setPage(1);
    scrollToPanel();
  };

  const openSaved = () => {
    resetFilters();
    setSavedOnly(true);
    setViewAll(true);
    setPage(1);
    scrollToPanel();
  };

  const backToFeatured = () => {
    resetFilters();
    setViewAll(false);
    setPage(1);
    scrollToPanel();
  };

  return (
    <div className="pb-16">
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
              placeholder={t.bizList.searchPlaceholder}
              aria-label={t.bizList.searchAria}
              className={cn(fieldClass, "w-full pl-10 pr-4")}
            />
          </div>

          <SelectField
            icon={BriefcaseIcon}
            value={industry}
            onChange={setIndustry}
            allLabel={t.bizList.industryLabel}
            options={INDUSTRIES}
            labels={t.categories.industry}
          />
          <SelectField
            icon={MapPinIcon}
            value={location}
            onChange={setLocation}
            allLabel={t.bizList.locationLabel}
            options={locations}
          />
          <SelectField
            icon={UserIcon}
            value={founder}
            onChange={setFounder}
            allLabel={t.bizList.founderLabel}
            options={founders}
          />

          <button
            type="submit"
            className="h-11 shrink-0 rounded-lg bg-gold px-7 text-sm font-bold text-gold-foreground transition-colors hover:bg-gold-dark"
          >
            {t.bizList.search}
          </button>
        </form>
      </Container>

      {/* ---- Browse by Industry + Featured + Spotlight ---- */}
      <div className="mt-6 bg-slate-50 pb-4">
      <Container className="pt-8">
        <div
          ref={panelRef}
          className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Browse by Industry */}
          <SectionLabel>{t.bizList.browseByIndustry}</SectionLabel>
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
                    {t.categories.industry[tab] ?? tab}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ---- Default: Featured + Spotlight ---- */}
          {!viewAll ? (
            <div
              key="featured"
              className="mt-12 grid gap-8 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 lg:grid-cols-[1fr_340px]"
            >
              <div>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <SectionLabel>{t.bizList.featuredBusinesses}</SectionLabel>
                  <div className="flex items-center gap-4">
                    {hydrated && savedSlugs.length > 0 && (
                      <button
                        type="button"
                        onClick={openSaved}
                        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-500 transition-colors hover:text-gold"
                      >
                        <Bookmark className="size-4" /> {t.bizList.saved} (
                        {savedSlugs.length})
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={openViewAll}
                      className="inline-flex items-center gap-1 text-[13px] font-bold text-gold transition-colors hover:text-gold-dark"
                    >
                      {t.bizList.viewAllBusinesses}{" "}
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
                {featuredBusinesses.length === 0 ? (
                  <EmptyState
                    title={t.bizList.noBusinessesTitle}
                    description={t.bizList.noBusinessesDesc}
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
                    {featuredBusinesses.map((b) => (
                      <BusinessCard key={b.slug} business={b} />
                    ))}
                  </div>
                )}
              </div>

              <BusinessSpotlight business={spotlight} />
            </div>
          ) : (
            /* ---- View all: full-width paginated grid ---- */
            <div
              key="viewall"
              ref={resultsRef}
              className="mt-12 scroll-mt-24 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <SectionLabel>
                  {savedOnly
                    ? t.bizList.savedBusinesses
                    : applied.industry === "All"
                      ? t.bizList.allBusinesses
                      : t.categories.industry[applied.industry] ??
                        applied.industry}
                </SectionLabel>
                <div className="flex items-center gap-4">
                  {hydrated && savedSlugs.length > 0 && !savedOnly && (
                    <button
                      type="button"
                      onClick={openSaved}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-500 transition-colors hover:text-gold"
                    >
                      <Bookmark className="size-4" /> {t.bizList.saved} (
                      {savedSlugs.length})
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={backToFeatured}
                    className="inline-flex items-center gap-1 text-[13px] font-bold text-gold transition-colors hover:text-gold-dark"
                  >
                    <ChevronLeft className="size-4" /> {t.bizList.back}
                  </button>
                </div>
              </div>

              {pageItems.length === 0 ? (
                <EmptyState
                  title={
                    savedOnly
                      ? t.bizList.noSavedTitle
                      : t.bizList.noResultsTitle
                  }
                  description={
                    savedOnly
                      ? t.bizList.noSavedDesc
                      : t.bizList.noResultsDesc
                  }
                />
              ) : (
                <>
                  <div
                    key={`${applied.industry}|${applied.location}|${applied.founder}|${applied.query}|${savedOnly}|${currentPage}`}
                    className="grid grid-cols-2 gap-5 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300 sm:grid-cols-3 lg:grid-cols-4"
                  >
                    {pageItems.map((b) => (
                      <BusinessCard key={b.slug} business={b} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPage={goToPage}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </Container>
      </div>
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
  const { t } = useLang();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav
      aria-label={t.lists.paginationLabel}
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={t.lists.prevPage}
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
        aria-label={t.lists.nextPage}
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
  labels,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
  options: readonly string[];
  /** Optional display-label map (e.g. translated industries). Keys are the
   * canonical option values; values stay English so filtering still works. */
  labels?: Record<string, string>;
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
            {labels?.[o] ?? o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
