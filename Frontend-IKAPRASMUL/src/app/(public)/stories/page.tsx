import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layouts/PageHero";
import { Section } from "@/components/layouts/Section";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { StoryCategoryTabs } from "@/components/stories/StoryCategoryTabs";
import { StoriesView } from "@/components/stories/StoriesView";
import { getHighlightStories, getStories, getStoryCategoryCounts } from "@/lib/content";
import { getServerDict } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Alumni Stories",
  description:
    "Stories that inspire — founder journeys, executive paths, international alumni, and impact stories from the Prasmul community.",
};

export default async function StoriesPage() {
  const [{ t }, stories, highlightStories, counts] = await Promise.all([
    getServerDict(),
    getStories(),
    getHighlightStories(),
    getStoryCategoryCounts(),
  ]);

  // Use all flagged featured stories. If none are flagged, fallback to the latest 4 stories.
  const flagged = stories.filter((s) => s.isFeatured);
  const featuredStories = flagged.length > 0 ? flagged : stories.slice(0, 4);

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
                stories={stories}
                counts={counts}
              />
            </Suspense>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
