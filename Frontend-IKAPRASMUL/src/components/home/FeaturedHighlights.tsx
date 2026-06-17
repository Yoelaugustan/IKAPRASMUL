import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  getFeaturedAlumni,
  getFeaturedBusinesses,
  getUpcomingEvent,
} from "@/lib/content";
import { getServerDict } from "@/i18n/server";
import { EventCard } from "./EventCard";
import { FeaturedAlumniCard } from "./FeaturedAlumniCard";
import { FeaturedBusinessCard } from "./FeaturedBusinessCard";

// "Featured Highlights" — Upcoming Event, Featured Alumni, and two Featured
// Businesses. Server Component: composes the curated home content.
export async function FeaturedHighlights() {
  const [{ t }, event, alumni, businesses] = await Promise.all([
    getServerDict(),
    getUpcomingEvent(),
    getFeaturedAlumni(),
    getFeaturedBusinesses(2),
  ]);

  const hasContent = Boolean(event) || Boolean(alumni) || businesses.length > 0;

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
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {event && <EventCard event={event} />}
            {alumni && <FeaturedAlumniCard alumni={alumni} />}
            {businesses.map((b) => (
              <FeaturedBusinessCard key={b.slug} business={b} />
            ))}
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
