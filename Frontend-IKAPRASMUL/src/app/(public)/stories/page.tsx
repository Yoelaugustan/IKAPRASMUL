import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layouts/PageHero";
import { Section } from "@/components/layouts/Section";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { StoryCategoryTabs } from "@/components/stories/StoryCategoryTabs";
import { StoriesView } from "@/components/stories/StoriesView";
import {
  getFeaturedStories,
  getHighlightStories,
  getStoriesPage,
  getStoryCategoryCounts,
} from "@/lib/content";
import { getServerDict } from "@/i18n/server";
import type { Paginated, Story } from "@/types";

export const metadata: Metadata = {
  title: "Alumni Stories",
  description:
    "Stories that inspire — founder journeys, executive paths, international alumni, and impact stories from the Prasmul community.",
};

const PAGE_SIZE = 9;
const EMPTY_PAGE: Paginated<Story> = { items: [], total: 0, page: 1, pageSize: PAGE_SIZE, totalPages: 0 };

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; category?: string; page?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const viewAll = sp.view === "all";
  const category = sp.category || undefined;
  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const sort = sp.sort || undefined;

  const [{ t }, featuredStories, highlightStories, counts, pagedStories] = await Promise.all([
    getServerDict(),
    getFeaturedStories(),
    getHighlightStories(),
    getStoryCategoryCounts(),
    viewAll ? getStoriesPage({ category, sort, page, pageSize: PAGE_SIZE }) : Promise.resolve(EMPTY_PAGE),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t.pageHero.storiesEyebrow}
        title={
          <>
            {t.pageHero.storiesTitle1} <br />
            <span className="text-[#c6b273]">{t.pageHero.storiesTitle2}</span>
          </>
        }
        subtitle={t.pageHero.storiesSubtitle}
        backgroundImage="/images/stories/hero-alumni.jpg"
      />

      <Suspense fallback={<div className="h-16 bg-[#002d56]" />}>
        <StoryCategoryTabs />
      </Suspense>

      <Section className="pb-24 pt-16">
        <Container>
          <Reveal>
            <Suspense fallback={<div className="h-96" />}>
              <StoriesView
                featuredStories={featuredStories}
                highlightStories={highlightStories}
                pagedStories={pagedStories}
                counts={counts}
              />
            </Suspense>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
