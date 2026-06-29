"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { Article, Paginated } from "@/types";
import { NEWS_CATEGORIES } from "@/constants/categories";
import { cn } from "@/lib/utils";
import { scrollToElement } from "@/lib/scroll";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { useDragScroll } from "@/hooks/useDragScroll";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/shared/EmptyState";
import { useLang } from "@/components/shared/LanguageProvider";
import { NewsValueProps } from "./NewsValueProps";
import { FeaturedArticle } from "./FeaturedArticle";
import { TopStoryCard } from "./TopStoryCard";
import { MostPopularList } from "./MostPopularList";
import { StayInformed } from "./StayInformed";
import { NEWS_CATEGORY_ICONS } from "./newsMeta";

const TABS = ["All", ...NEWS_CATEGORIES];
type Sort = "newest" | "oldest" | "popular";

export function NewsExplorer({
  pagedArticles,
  featured,
  topStories,
  mostPopular,
}: {
  /** Server-paginated articles for the "view all" mode. */
  pagedArticles: Paginated<Article>;
  featured?: Article;
  topStories: Article[];
  mostPopular: Article[];
}) {
  const { t } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read current state from URL.
  const viewAll = searchParams.get("view") === "all";
  const category = searchParams.get("category") || "All";
  const sort = (searchParams.get("sort") || "newest") as Sort;
  const appliedSearch = searchParams.get("search") || "";

  // Local draft for the search input — pushed to URL after debounce.
  const [draftQuery, setDraftQuery] = useState(appliedSearch);
  const debouncedQuery = useDebounce(draftQuery, 400);

  // Keep the input in sync when URL search param changes externally (e.g. back button).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setDraftQuery(appliedSearch); }, [appliedSearch]);

  const {
    ref: tabsRef,
    onMouseDown: onTabsMouseDown,
    wasDragged: tabsWasDragged,
  } = useDragScroll();

  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToPanel = () =>
    requestAnimationFrame(() => scrollToElement(panelRef.current));

  // Push URL changes without scrolling.
  const setParams = (
    next: Partial<{ view: string | null; category: string | null; search: string | null; sort: string | null; page: string | null }>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === "" || v === "All") params.delete(k);
      else params.set(k, v);
    }
    // Clear page whenever filter/sort changes.
    if ("category" in next || "search" in next || "sort" in next) params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // After debounce fires, push search to URL. Skip the first render to avoid
  // pushing the initial value (which is already in the URL).
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

  const applySearch = () => {
    setParams({ search: draftQuery, view: "all" });
    scrollToPanel();
  };

  const selectCategory = (tab: string) => {
    setParams({ category: tab, view: "all" });
    scrollToPanel();
  };

  const enterViewAll = () => {
    setParams({ view: "all" });
    scrollToPanel();
  };

  const backToFeatured = () => {
    setDraftQuery("");
    router.push(pathname, { scroll: false });
    scrollToPanel();
  };

  const goToPage = (p: number) => {
    setParams({ page: p > 1 ? String(p) : null });
    scrollToElement(resultsRef.current);
  };

  const { items: pageItems, totalPages, page: currentPage } = pagedArticles;

  return (
    <div className="pb-20">
      <Container>
        <div
          ref={panelRef}
          className="relative z-10 -mt-16 scroll-mt-24 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl"
        >
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div
                ref={tabsRef}
                onMouseDown={onTabsMouseDown}
                className="no-scrollbar flex cursor-grab gap-1 overflow-x-auto pb-1 select-none active:cursor-grabbing"
              >
                {TABS.map((tab) => {
                  const Icon = NEWS_CATEGORY_ICONS[tab];
                  const active = category === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        if (tabsWasDragged()) return;
                        selectCategory(tab);
                      }}
                      className={cn(
                        "relative flex min-w-max flex-col items-center gap-1.5 overflow-hidden rounded-xl px-5 pb-4 pt-3 transition-colors",
                        active
                          ? "bg-[#00396c] text-white shadow-sm"
                          : "text-slate-500 hover:bg-slate-50",
                      )}
                    >
                      {Icon && (
                        <Icon
                          className={cn(
                            "size-5",
                            active ? "text-gold" : "text-slate-400",
                          )}
                        />
                      )}
                      <span className="whitespace-nowrap text-[11px] font-semibold leading-tight">
                        {t.categories.news[tab] ?? tab}
                      </span>
                      <span className={cn(
                        "absolute inset-x-4 bottom-1.5 h-1 origin-center rounded-full bg-gold transition-[transform,opacity] duration-300",
                        active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                      )} />
                    </button>
                  );
                })}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <div className="relative flex-1 xl:w-56 xl:flex-none">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={draftQuery}
                    onChange={(e) => setDraftQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") applySearch(); }}
                    placeholder={t.newsList.searchPlaceholder}
                    aria-label={t.newsList.searchAria}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#00396c] focus:outline-none focus:ring-2 focus:ring-[#00396c]/15"
                  />
                </div>
                <button
                  type="button"
                  onClick={applySearch}
                  className="h-10 shrink-0 rounded-lg bg-[#00396c] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#00305c]"
                >
                  {t.newsList.search}
                </button>
                <Select
                  value={sort}
                  onValueChange={(v) => {
                    setParams({ sort: v, view: "all" });
                  }}
                >
                  <SelectTrigger className="h-auto w-auto gap-1.5 border-0 bg-transparent px-0 shadow-none text-sm font-medium text-slate-500 hover:text-slate-900 focus:ring-0 data-[size=default]:h-auto">
                    <ArrowUpDown className="size-3.5 shrink-0" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={6} className="rounded-xl">
                    <SelectItem value="newest">{t.newsList.sortNewest}</SelectItem>
                    <SelectItem value="oldest">{t.newsList.sortOldest}</SelectItem>
                    <SelectItem value="popular">{t.newsList.sortPopular}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            {!viewAll && (
              <Reveal>
                <NewsValueProps />
              </Reveal>
            )}

            <div
              className={cn(
                "grid gap-10 lg:grid-cols-[1fr_340px]",
                !viewAll && "mt-12",
              )}
            >
              <div ref={resultsRef} className="min-w-0 scroll-mt-24">
                {viewAll ? (
                  <div
                    key="viewall"
                    className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300"
                  >
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <SectionHeading>
                        {category === "All"
                          ? t.newsList.allArticles
                          : t.categories.news[category] ?? category}
                      </SectionHeading>
                      <button
                        type="button"
                        onClick={backToFeatured}
                        className="inline-flex items-center gap-1 text-[13px] font-bold text-gold transition-colors hover:text-gold-dark"
                      >
                        <ChevronLeft className="size-4" /> {t.newsList.back}
                      </button>
                    </div>
                    {pageItems.length === 0 ? (
                      <EmptyState
                        title={
                          appliedSearch.trim()
                            ? `${t.newsList.noResultsFor} "${appliedSearch.trim()}"`
                            : t.newsList.noArticlesTitle
                        }
                        description={t.newsList.noArticlesDesc}
                      />
                    ) : (
                      <>
                        <div
                          key={`${category}-${currentPage}`}
                          className="grid gap-4 sm:grid-cols-2"
                        >
                          {pageItems.map((a, i) => (
                            <div
                              key={a.slug}
                              className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 [animation-fill-mode:both] duration-500"
                              style={{ animationDelay: `${i * 70}ms` }}
                            >
                              <TopStoryCard article={a} />
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
                ) : (
                  <div
                    key="featured"
                    className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300"
                  >
                    <SectionHeading>{t.newsList.featuredStory}</SectionHeading>
                    {featured ? (
                      <div className="mt-5">
                        <FeaturedArticle article={featured} />
                      </div>
                    ) : (
                      <EmptyState
                        title={t.newsList.noFeaturedTitle}
                        description={t.newsList.noFeaturedDesc}
                        className="mt-5"
                      />
                    )}

                    <div className="mt-12 flex items-center justify-between">
                      <SectionHeading>{t.newsList.topStories}</SectionHeading>
                      <button
                        type="button"
                        onClick={enterViewAll}
                        className="inline-flex items-center gap-1 text-[13px] font-bold text-gold transition-colors hover:text-gold-dark"
                      >
                        {t.newsList.viewAllStories}{" "}
                        <ArrowRight className="size-4" />
                      </button>
                    </div>
                    {topStories.length === 0 ? (
                      <EmptyState
                        title={t.newsList.noArticlesTitle}
                        description={t.newsList.noArticlesDesc}
                        className="mt-6"
                      />
                    ) : (
                      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
                        {topStories.map((a, i) => (
                          <div
                            key={a.slug}
                            className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 [animation-fill-mode:both] duration-500"
                            style={{ animationDelay: `${i * 70}ms` }}
                          >
                            <TopStoryCard article={a} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <aside className="space-y-8">
                <StayInformed />
                <MostPopularList
                  articles={mostPopular}
                  onViewAll={enterViewAll}
                />
              </aside>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[15px] font-bold uppercase tracking-widest text-[#00396c]">
      {children}
    </h2>
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
