import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layouts/PageHero";
import { Section } from "@/components/layouts/Section";
import { Container } from "@/components/layouts/Container";
import { StoryCategoryTabs } from "@/components/stories/StoryCategoryTabs";
import { StoriesView } from "@/components/stories/StoriesView";
import { getStories, getStoryCategoryCounts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Alumni Stories",
  description:
    "Stories that inspire — founder journeys, executive paths, international alumni, and impact stories from the Prasmul community.",
};

export default async function StoriesPage() {
  const [stories, counts] = await Promise.all([
    getStories(),
    getStoryCategoryCounts(),
  ]);

  // Up to 3 stories for the featured carousel — prefer flagged ones, then
  // backfill with others so the carousel always has up to 3 slides.
  const flagged = stories.filter((s) => s.isFeatured);
  const featuredStories = [
    ...flagged,
    ...stories.filter((s) => !s.isFeatured),
  ].slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Alumni Stories"
        title={
          <>
            Stories <br />
            <span className="text-[#c6b273]">That Inspire</span>
          </>
        }
        subtitle="Discover the journeys of Prasmul alumni who are leading change, building businesses, and making a global impact."
        backgroundImage="/images/stories/hero-alumni.jpg"
      />

      <Suspense fallback={<div className="h-16 bg-[#002d56]" />}>
        <StoryCategoryTabs />
      </Suspense>

      <Section className="pb-24 pt-16">
        <Container>
          <Suspense fallback={<div className="h-96" />}>
            <StoriesView
              featuredStories={featuredStories}
              stories={stories}
              counts={counts}
            />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
