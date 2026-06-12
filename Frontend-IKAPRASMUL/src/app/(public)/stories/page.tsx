import type { Metadata } from "next";
import { PageHero } from "@/components/layouts/PageHero";
import { Section } from "@/components/layouts/Section";
import { StoriesExplorer } from "@/components/stories/StoriesExplorer";
import { StoryCategoriesSidebar } from "@/components/stories/StoryCategoriesSidebar";
import { CtaBand } from "@/components/shared/CtaBand";
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

  return (
    <>
      <PageHero
        eyebrow="Alumni Stories"
        title="Stories That Inspire"
        subtitle="Journeys of founders, executives, and changemakers — alumni turning a shared education into lasting impact."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <StoriesExplorer stories={stories} />
          <aside className="lg:order-last">
            <StoryCategoriesSidebar counts={counts} />
          </aside>
        </div>
      </Section>

      <CtaBand
        title="Have a story worth telling?"
        description="Share your journey and our editorial team may feature it in Alumni Stories."
        buttonLabel="Submit Your Story"
        subject="Submit Your Story"
      />
    </>
  );
}
