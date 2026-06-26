"use client";

import { useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Story } from "@/types";
import { cn } from "@/lib/utils";
import { scrollToElement } from "@/lib/scroll";
import { FeaturedStory } from "./FeaturedStory";
import { StoryCard } from "./StoryCard";
import { StoryCategoriesSidebar } from "./StoryCategoriesSidebar";
import { ShareYourStorySidebar } from "./ShareYourStorySidebar";
import { EmptyState } from "@/components/shared/EmptyState";
import { useLang } from "@/components/shared/LanguageProvider";

const PAGE_SIZE = 9;
const HIGHLIGHT_COUNT = 3;

export function StoriesView({
  featuredStories,
  highlightStories,
  stories,
  counts,
}: {
  featuredStories: Story[];
  /** Admin-curated highlight stories (isHighlight flag). Falls back to the first 3 non-featured stories when empty. */
  highlightStories: Story[];
  stories: Story[];
  counts: { category: string; count: number }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLang();

  const category = searchParams.get("category") || "All";
  const viewAll = searchParams.get("view") === "all";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

  const filtered = useMemo(
    () =>
      category === "All"
        ? stories
        : stories.filter((s) => s.category === category),
    [stories, category],
  );

  // Update the query string without scrolling the page.
  const setParams = (next: {
    category?: string | null;
    view?: string | null;
    page?: number | null;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next.category !== undefined) {
      if (next.category && next.category !== "All")
        params.set("category", next.category);
      else params.delete("category");
    }
    if (next.view !== undefined) {
      if (next.view) params.set("view", next.view);
      else params.delete("view");
    }
    if (next.page !== undefined) {
      if (next.page && next.page > 1) params.set("page", String(next.page));
      else params.delete("page");
    }
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
    // Highlights are NOT category-filtered — the category tabs only apply in the
    // view-all stage. Use admin-curated isHighlight stories; fall back to the
    // first HIGHLIGHT_COUNT non-featured stories when none are flagged.
    const featuredSlugs = new Set(featuredStories.map((s) => s.slug));
    const highlights =
      highlightStories.length > 0
        ? highlightStories
        : stories.filter((s) => !featuredSlugs.has(s.slug)).slice(0, HIGHLIGHT_COUNT);

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
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);
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
            <button
              type="button"
              onClick={() => { setParams({ view: null, category: null, page: 1 }); scrollToContent(); }}
              className="inline-flex items-center gap-1 text-[13px] font-bold text-[#c6b273] transition-colors hover:text-[#b4a05e]"
            >
              <ChevronLeft className="size-4" /> {t.lists.backToFeatured}
            </button>
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
