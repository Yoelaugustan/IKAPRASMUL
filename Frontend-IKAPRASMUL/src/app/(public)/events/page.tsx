import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layouts/Container";
import { PageHero } from "@/components/layouts/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { EventsView } from "@/components/events/EventsView";
import { getEvents, getEventsPage, getFeaturedEvents } from "@/lib/content";
import { getServerDict } from "@/i18n/server";
import type { AlumniEvent, Paginated } from "@/types";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Reunions, workshops, networking nights, and more — find your next moment to connect with the Prasmul alumni community.",
};

const PAGE_SIZE = 9;
const EMPTY_PAGE: Paginated<AlumniEvent> = { items: [], total: 0, page: 1, pageSize: PAGE_SIZE, totalPages: 0 };

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; category?: string; sort?: string; page?: string; date?: string }>;
}) {
  const sp = await searchParams;
  const viewAll = sp.view === "all";
  const category = sp.category || undefined;
  const sort = sp.sort || undefined;
  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const date = sp.date || undefined;

  const [{ t }, events, featuredEvents, pagedEvents] = await Promise.all([
    getServerDict(),
    getEvents(),
    getFeaturedEvents(),
    viewAll
      ? getEventsPage({ category, sort, page, pageSize: PAGE_SIZE })
      : date
        ? getEventsPage({ date, page, pageSize: PAGE_SIZE })
        : Promise.resolve(EMPTY_PAGE),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t.events.eyebrow}
        title={
          <>
            {t.events.title1}
            <br />
            <span className="text-gold">{t.events.title2}</span>
          </>
        }
        subtitle={t.events.subtitle}
        backgroundImage="/images/events/event-hero.jpg"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <Suspense fallback={<div className="h-96" />}>
              <EventsView
                featuredEvents={featuredEvents}
                events={events}
                pagedEvents={pagedEvents}
              />
            </Suspense>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
