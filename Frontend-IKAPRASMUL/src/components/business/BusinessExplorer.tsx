"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDragScroll } from "@/hooks/useDragScroll";
import { useDebounce } from "@/hooks/useDebounce";
import { scrollToElement } from "@/lib/scroll";
import { ArrowRight, ArrowUpDown, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
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
const fieldClass =
  "h-11 rounded-lg border border-white/10 bg-[#06203f] text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40";

const PAGE_SIZE = 12;
type Sort = "newest" | "az" | "za";

export function BusinessExplorer({
  businesses,
  featuredBusinesses,
  spotlight,
}: {
  /** Server-filtered list (by search/industry/sort from URL params). */
  businesses: Business[];
  /** Admin-curated featured businesses (isFeatured flag). */
  featuredBusinesses: Business[];
  /** Spotlight business — fetched separately so it's always available. */
  spotlight?: Business;
}) {
  const { t } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL-driven state.
  const viewAll = searchParams.get("view") === "all";
  const urlIndustry = searchParams.get("industry") || "All";
  const urlSearch = searchParams.get("search") || "";
  const urlSort = (searchParams.get("sort") || "newest") as Sort;

  // Draft state for the search form — applied on submit or Search button.
  const [draftQuery, setDraftQuery] = useState(urlSearch);
  const [draftIndustry, setDraftIndustry] = useState(urlIndustry);
  const debouncedQuery = useDebounce(draftQuery, 400);

  // Keep form fields in sync when URL changes (e.g., industry tab click).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setDraftIndustry(urlIndustry); }, [urlIndustry]);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setDraftQuery(urlSearch); }, [urlSearch]);

  // Client-side secondary filters (not in URL — location/founder/saved).
  const [location, setLocation] = useState("All");
  const [founder, setFounder] = useState("All");
  const [savedOnly, setSavedOnly] = useState(false);
  const [page, setPage] = useState(1);
  const savedSlugs = useSavedBusinessStore((s) => s.saved);
  const hydrated = useHasHydrated();

  // Debounce fires: push search query to URL.
  const isFirstDebounce = useRef(true);
  useEffect(() => {
    if (isFirstDebounce.current) { isFirstDebounce.current = false; return; }
    const params = new URLSearchParams(window.location.search);
    if (debouncedQuery) params.set("search", debouncedQuery);
    else params.delete("search");
    params.set("view", "all");
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const setParams = (
    next: Partial<{ view: string | null; search: string | null; industry: string | null; sort: string | null }>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === "" || v === "All" || v === "newest") params.delete(k);
      else params.set(k, v);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const locations = useMemo(
    () => Array.from(new Set(businesses.map((b) => b.location))),
    [businesses],
  );
  const founders = useMemo(
    () => Array.from(new Set(businesses.map((b) => b.founder.name))),
    [businesses],
  );

  // Client-side secondary filtering over the server-filtered set.
  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const ms = !savedOnly || savedSlugs.includes(b.slug);
      const ml = location === "All" || b.location === location;
      const mf = founder === "All" || b.founder.name === founder;
      return ms && ml && mf;
    });
  }, [businesses, savedOnly, location, founder, savedSlugs]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const {
    ref: tabsRef,
    onMouseDown: onTabsMouseDown,
    wasDragged: tabsWasDragged,
  } = useDragScroll();

  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToPanel = () =>
    requestAnimationFrame(() => scrollToElement(panelRef.current));

  const goToPage = (p: number) => {
    setPage(p);
    scrollToElement(resultsRef.current);
  };

  const applySearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (draftQuery.trim()) params.set("search", draftQuery.trim()); else params.delete("search");
    if (draftIndustry && draftIndustry !== "All") params.set("industry", draftIndustry); else params.delete("industry");
    params.set("view", "all");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setLocation("All");
    setFounder("All");
    setSavedOnly(false);
    setPage(1);
    scrollToPanel();
  };

  const selectIndustry = (value: string) => {
    setDraftIndustry(value);
    setParams({ industry: value, view: "all" });
    setLocation("All");
    setFounder("All");
    setSavedOnly(false);
    setPage(1);
    scrollToPanel();
  };

  const resetFilters = () => {
    setDraftQuery("");
    setDraftIndustry("All");
    setLocation("All");
    setFounder("All");
    setSavedOnly(false);
  };

  const openViewAll = () => {
    resetFilters();
    setParams({ view: "all" });
    setPage(1);
    scrollToPanel();
  };

  const openSaved = () => {
    resetFilters();
    setSavedOnly(true);
    setParams({ view: "all" });
    setPage(1);
    scrollToPanel();
  };

  const backToFeatured = () => {
    resetFilters();
    router.push(pathname, { scroll: false });
    setPage(1);
    scrollToPanel();
  };

  return (
    <div className="flow-root bg-slate-50">
      {/* ---- Search bar (overlaps the hero) ---- */}
      <Container>
        <form
          onSubmit={(e) => { e.preventDefault(); applySearch(); }}
          className="relative z-10 -mt-10 flex flex-col gap-3 rounded-2xl bg-[#0a2a52] p-4 shadow-2xl ring-1 ring-white/10 lg:flex-row lg:items-center"
        >
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
            <input
              value={draftQuery}
              onChange={(e) => setDraftQuery(e.target.value)}
              placeholder={t.bizList.searchPlaceholder}
              aria-label={t.bizList.searchAria}
              className={cn(fieldClass, "w-full pl-10 pr-4")}
            />
          </div>

          <SelectField
            icon={BriefcaseIcon}
            value={draftIndustry}
            onChange={setDraftIndustry}
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
      <div className="bg-slate-50 pb-8">
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
            className="no-scrollbar mt-5 flex cursor-grab gap-3 overflow-x-auto pb-2 select-none active:cursor-grabbing"
          >
            {INDUSTRY_TABS.map((tab) => {
              const Icon = INDUSTRY_ICONS[tab] ?? BriefcaseIcon;
              const active = urlIndustry === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    if (tabsWasDragged()) return;
                    selectIndustry(tab);
                  }}
                  className={cn(
                    "relative flex w-24 shrink-0 flex-col items-center gap-2 rounded-xl px-3 py-4 text-center transition-colors",
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
                  <span className={cn(
                    "absolute inset-x-3 bottom-1.5 h-0.5 origin-center rounded-full bg-gold transition-[transform,opacity] duration-300",
                    active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                  )} />
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
                    {featuredBusinesses.map((b, i) => (
                      <div
                        key={b.slug}
                        className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 [animation-fill-mode:both] duration-500"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <BusinessCard business={b} />
                      </div>
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
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <SectionLabel>
                  {savedOnly
                    ? t.bizList.savedBusinesses
                    : urlIndustry === "All"
                      ? t.bizList.allBusinesses
                      : t.categories.industry[urlIndustry] ?? urlIndustry}
                </SectionLabel>
                <div className="flex items-center gap-3">
                  <Select
                    value={urlSort}
                    onValueChange={(v) => setParams({ sort: v })}
                  >
                    <SelectTrigger className="h-auto w-auto gap-1.5 border-0 bg-transparent px-0 shadow-none text-sm font-medium text-slate-500 hover:text-slate-900 focus:ring-0">
                      <ArrowUpDown className="size-3.5 shrink-0" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{t.admin?.sortNewest ?? "Newest"}</SelectItem>
                      <SelectItem value="az">{t.admin?.sortAZ ?? "A – Z"}</SelectItem>
                      <SelectItem value="za">{t.admin?.sortZA ?? "Z – A"}</SelectItem>
                    </SelectContent>
                  </Select>
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
                    key={`${urlIndustry}|${location}|${founder}|${urlSearch}|${savedOnly}|${currentPage}`}
                    className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
                  >
                    {pageItems.map((b, i) => (
                      <div
                        key={b.slug}
                        className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 [animation-fill-mode:both] duration-500"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <BusinessCard business={b} />
                      </div>
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
