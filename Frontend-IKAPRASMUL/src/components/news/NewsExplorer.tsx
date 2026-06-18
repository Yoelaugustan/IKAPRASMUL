"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { Article } from "@/types";
import { NEWS_CATEGORIES } from "@/constants/categories";
import { cn } from "@/lib/utils";
import { scrollToElement } from "@/lib/scroll";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { useDragScroll } from "@/hooks/useDragScroll";
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
const PAGE_SIZE = 10; // view-all grid, per page (2 columns × 5 rows)
type Sort = "latest" | "oldest" | "popular";

export function NewsExplorer({
  articles,
  featured,
  mostPopular,
}: {
  articles: Article[];
  featured?: Article;
  mostPopular: Article[];
}) {
  const { t } = useLang();
  const [category, setCategory] = useState("All");
  const [draftQuery, setDraftQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [sort, setSort] = useState<Sort>("latest");
  const [viewAll, setViewAll] = useState(false);
  const [page, setPage] = useState(1);

  const {
    ref: tabsRef,
    onMouseDown: onTabsMouseDown,
    wasDragged: tabsWasDragged,
  } = useDragScroll();

  const filteredArticles = useMemo(() => {
    const q = appliedQuery.trim().toLowerCase();
    const filtered = articles.filter((a) => {
      if (!viewAll && a.isFeatured) return false;
      const mc = category === "All" || a.category === category;
      const mq =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q);
      return mc && mq;
    });
    filtered.sort((a, b) => {
      if (sort === "popular") return b.views - a.views;
      if (sort === "oldest") return a.publishedAt.localeCompare(b.publishedAt);
      return b.publishedAt.localeCompare(a.publishedAt);
    });
    return filtered;
  }, [articles, category, appliedQuery, sort, viewAll]);

  const isFiltering = category !== "All" || appliedQuery.trim() !== "";
  const topStories = filteredArticles.slice(0, isFiltering ? 9 : 3);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filteredArticles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // mounted guard skips the scroll on initial render
  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    scrollToElement(panelRef.current);
  }, [category, appliedQuery, viewAll]);

  const goToPage = (p: number) => {
    setPage(p);
    scrollToElement(resultsRef.current);
  };

  const applySearch = () => {
    setAppliedQuery(draftQuery);
    setViewAll(true);
    setPage(1);
  };
  const selectCategory = (tab: string) => {
    setCategory(tab);
    setViewAll(true);
    setPage(1);
  };
  const enterViewAll = () => {
    setViewAll(true);
    setPage(1);
  };
  const backToFeatured = () => {
    setViewAll(false);
    setCategory("All");
    setDraftQuery("");
    setAppliedQuery("");
    setPage(1);
  };

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
                className="flex cursor-grab gap-1 overflow-x-auto pb-1 select-none [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
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
                      {active && (
                        <span className="absolute inset-x-4 bottom-1.5 h-1 rounded-full bg-gold" />
                      )}
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") applySearch();
                    }}
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
                    setSort(v as Sort);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-10 w-32 rounded-lg border-slate-200 text-sm text-slate-700 data-[size=default]:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    sideOffset={6}
                    className="rounded-xl"
                  >
                    <SelectItem value="latest">{t.newsList.sortLatest}</SelectItem>
                    <SelectItem value="oldest">{t.newsList.sortOldest}</SelectItem>
                    <SelectItem value="popular">
                      {t.newsList.sortPopular}
                    </SelectItem>
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
                        title={t.newsList.noArticlesTitle}
                        description={t.newsList.noArticlesDesc}
                      />
                    ) : (
                      <>
                        <div
                          key={`${category}-${currentPage}`}
                          className="grid gap-4 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300 sm:grid-cols-2"
                        >
                          {pageItems.map((a) => (
                            <TopStoryCard key={a.slug} article={a} />
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
                        {topStories.map((a) => (
                          <TopStoryCard key={a.slug} article={a} />
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
