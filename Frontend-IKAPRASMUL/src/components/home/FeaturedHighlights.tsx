import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import {
  getFeaturedAlumni,
  getFeaturedBusinesses,
  getUpcomingEvent,
} from "@/lib/content";
import { EventCard } from "./EventCard";
import { FeaturedAlumniCard } from "./FeaturedAlumniCard";
import { FeaturedBusinessCard } from "./FeaturedBusinessCard";

// "Featured Highlights" — Upcoming Event, Featured Alumni, and two Featured
// Businesses. Server Component: composes the curated home content.
export async function FeaturedHighlights() {
  const [event, alumni, businesses] = await Promise.all([
    getUpcomingEvent(),
    getFeaturedAlumni(),
    getFeaturedBusinesses(2),
  ]);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mb-10 w-fit">
          <h2 className="text-2xl font-semibold uppercase tracking-tight text-primary sm:text-3xl">
            Featured Highlights
          </h2>
          <span className="mt-3 block h-1 w-full rounded-full bg-gold" />
        </div>

        <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {event && <EventCard event={event} />}
          <FeaturedAlumniCard alumni={alumni} />
          {businesses.map((b) => (
            <FeaturedBusinessCard key={b.slug} business={b} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
