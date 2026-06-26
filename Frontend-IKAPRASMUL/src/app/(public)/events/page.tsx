import type { Metadata } from "next";
import { Container } from "@/components/layouts/Container";
import { PageHero } from "@/components/layouts/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { EventsView } from "@/components/events/EventsView";
import { getEvents, getFeaturedEvent } from "@/lib/content";
import { getServerDict } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Reunions, workshops, networking nights, and more — find your next moment to connect with the Prasmul alumni community.",
};

export default async function EventsPage() {
  const [{ t }, events, featuredEvent] = await Promise.all([
    getServerDict(),
    getEvents(),
    getFeaturedEvent(),
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
            <EventsView featuredEvent={featuredEvent} events={events} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
