"use client";

import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { Paginated, Story } from "@/types";
import { cn } from "@/lib/utils";
import { scrollToElement } from "@/lib/scroll";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeaturedStory } from "./FeaturedStory";
import { StoryCard } from "./StoryCard";
import { StoryCategoriesSidebar } from "./StoryCategoriesSidebar";
import { ShareYourStorySidebar } from "./ShareYourStorySidebar";
import { EmptyState } from "@/components/shared/EmptyState";
import { useLang } from "@/components/shared/LanguageProvider";

export function StoriesView({
  featuredStories,
  highlightStories,
  pagedStories,
  counts,
}: {
  featuredStories: Story[];
  /** Admin-curated highlight stories (isHighlight flag). */
  highlightStories: Story[];
  /** Server-paginated stories for the "view all" mode. */
  pagedStories: Paginated<Story>;
  counts: { category: string; count: number }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLang();

  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "newest";
  const viewAll = searchParams.get("view") === "all";

  // Update the query string without scrolling the page.
  const setParams = (next: {
    category?: string | null;
    sort?: string | null;
    view?: string | null;
    page?: number | null;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next.category !== undefined) {
      if (next.category && next.category !== "All")
        params.set("category", next.category);
      else params.delete("category");
    }
    if (next.sort !== undefined) {
      if (next.sort && next.sort !== "newest") params.set("sort", next.sort);
      else params.delete("sort");
    }
    if (next.view !== undefined) {
      if (next.view) params.set("view", next.view);
      else params.delete("view");
    }
    if (next.page !== undefined) {
      if (next.page && next.page > 1) params.set("page", String(next.page));
      else params.delete("page");
    }
    // Reset page when filter/sort changes.
    if (next.category !== undefined || next.sort !== undefined) params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () =>
    requestAnimationFrame(() => scrollToElement(contentRef.current));

  const handleSelectCategory = (cat: string) => {
    setParams({ category: cat, view: "all", page: 1 });
    scrollToContent();
  };

  const goToPage = (p: number) => {
    setParams({ page: p });
    requestAnimationFrame(() => scrollToElement(contentRef.current));
  };

  /* ------------------------- DEFAULT MODE ------------------------- */
  if (!viewAll) {
    const highlights = highlightStories;

    return (
      <div
        ref={contentRef}
        key="featured"
        className="scroll-mt-24 grid gap-x-8 gap-y-12 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 xl:grid-cols-[1fr_320px]"
      >
        {/* Featured — col 1, row 1 */}
        <div className="min-w-0 xl:col-start-1 xl:row-start-1">
          <FeaturedStory stories={featuredStories} />
        </div>

        {/* Highlights — col 1, row 2 */}
        <div className="min-w-0 xl:col-start-1 xl:row-start-2">
          <SectionHeading
            title={t.lists.storiesHighlight}
            action={
              <button
                type="button"
                onClick={() => { setParams({ view: "all", page: 1 }); scrollToContent(); }}
                className="inline-flex items-center gap-1 text-[13px] font-bold text-[#c6b273] transition-colors hover:text-[#b4a05e]"
              >
                {t.lists.viewAllStories} <ArrowRight className="size-4" />
              </button>
            }
          />
          {highlights.length === 0 ? (
            <EmptyState
              title={t.lists.noStoriesTitle}
              description={t.lists.noStoriesDesc}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((s, i) => (
                <div
                  key={s.slug}
                  className="h-full motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 [animation-fill-mode:both] duration-500"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <StoryCard story={s} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Categories — col 2, row 1 (centered vertically) */}
        <div className="xl:col-start-2 xl:row-start-1 xl:self-center">
          <StoryCategoriesSidebar
            counts={counts}
            activeCategory={category}
            onSelect={handleSelectCategory}
          />
        </div>

        {/* Share — col 2, row 2 */}
        <div className="xl:col-start-2 xl:row-start-2">
          <ShareYourStorySidebar />
        </div>
      </div>
    );
  }

  /* ------------------------- VIEW-ALL MODE ------------------------ */
  const pageItems = pagedStories.items;
  const totalPages = pagedStories.totalPages;
  const currentPage = pagedStories.page;
  const heading =
    category === "All"
      ? t.lists.allStories
      : t.categories.story[category] ?? category;

  return (
    <div
      ref={contentRef}
      key="viewall"
      className="scroll-mt-24 grid gap-x-8 gap-y-12 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 xl:grid-cols-[1fr_320px]"
    >
      <div className="min-w-0">
        <SectionHeading
          title={heading}
          action={
            <div className="flex items-center gap-3">
              <Select
                value={sort}
                onValueChange={(v) => { setParams({ sort: v }); scrollToContent(); }}
              >
                <SelectTrigger className="h-auto w-auto gap-1.5 border-0 bg-transparent px-0 shadow-none text-sm font-medium text-muted-foreground hover:text-foreground focus:ring-0">
                  <ArrowUpDown className="size-3.5 shrink-0" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="az">A – Z</SelectItem>
                  <SelectItem value="za">Z – A</SelectItem>
                </SelectContent>
              </Select>
              <button
                type="button"
                onClick={() => { setParams({ view: null, category: null, page: 1 }); scrollToContent(); }}
                className="inline-flex items-center gap-1 text-[13px] font-bold text-[#c6b273] transition-colors hover:text-[#b4a05e]"
              >
                <ChevronLeft className="size-4" /> {t.lists.backToFeatured}
              </button>
            </div>
          }
        />
        {pageItems.length === 0 ? (
          <EmptyState
            title={t.lists.noStoriesTitle}
            description={t.lists.noStoriesDesc}
          />
        ) : (
          <>
            <div
              key={`${category}-${currentPage}`}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {pageItems.map((s, i) => (
                <div
                  key={s.slug}
                  className="h-full motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 [animation-fill-mode:both] duration-500"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <StoryCard story={s} />
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

      <aside className="space-y-8">
        <StoryCategoriesSidebar
          counts={counts}
          activeCategory={category}
          onSelect={handleSelectCategory}
        />
        <ShareYourStorySidebar />
      </aside>
    </div>
  );
}

function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-[15px] font-extrabold uppercase tracking-widest text-[#00396c]">
          {title}
        </h2>
        {action}
      </div>
      <span className="mb-6 block h-px w-full bg-slate-200" />
    </>
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
