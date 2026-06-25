import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { EmptyState } from "@/components/shared/EmptyState";
import { getFeaturedHighlights } from "@/lib/content";
import { getServerDict } from "@/i18n/server";
import { EventCard } from "./EventCard";
import { FeaturedAlumniCard } from "./FeaturedAlumniCard";
import { FeaturedBusinessCard } from "./FeaturedBusinessCard";
import { FeaturedStoryCard } from "./FeaturedStoryCard";

// "Featured Highlights" — a curated-but-resilient mix of up to 4 cards. Aims for
// Event · Alumni · Business · Business, backfilling from other content types so
// the grid never shows a gap. Server Component: composes the curated home content.
export async function FeaturedHighlights() {
  const [{ t }, highlights] = await Promise.all([
    getServerDict(),
    getFeaturedHighlights(),
  ]);

  const hasContent = highlights.length > 0;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mb-10 w-fit">
          <h2 className="text-2xl font-semibold uppercase tracking-tight text-primary sm:text-3xl">
            {t.home.featuredHighlights}
          </h2>
          <span className="mt-3 block h-1 w-full rounded-full bg-gold" />
        </div>

        {hasContent ? (
          <Reveal stagger={110} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => {
              switch (h.type) {
                case "event":
                  return <EventCard key={`event-${h.event.slug}`} event={h.event} />;
                case "alumni":
                  return <FeaturedAlumniCard key={`alumni-${h.alumni.slug}`} alumni={h.alumni} />;
                case "business":
                  return <FeaturedBusinessCard key={`business-${h.business.slug}`} business={h.business} />;
                case "story":
                  return <FeaturedStoryCard key={`story-${h.story.slug}`} story={h.story} />;
              }
            })}
          </Reveal>
        ) : (
          <EmptyState
            title={t.home.noHighlightsTitle}
            description={t.home.noHighlightsDesc}
          />
        )}
      </Container>
    </section>
  );
}
