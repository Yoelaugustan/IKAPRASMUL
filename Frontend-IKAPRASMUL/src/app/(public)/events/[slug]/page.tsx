import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";
import { getEventBySlug } from "@/lib/content";
import { Container } from "@/components/layouts/Container";
import { ArticleContent } from "@/components/shared/ArticleContent";
import { BackButton } from "@/components/shared/BackButton";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/format";
import { getServerDict } from "@/i18n/server";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event not found" };
  return { title: event.title, description: event.description };
}

export default async function EventDetailPage({ params }: Params) {
  const { slug } = await params;
  const [event, { t }] = await Promise.all([
    getEventBySlug(slug),
    getServerDict(),
  ]);
  if (!event) notFound();

  return (
    <article className="pb-20 pt-10">
      <Container className="max-w-3xl">
        <div className="mb-6">
          <BackButton fallback={ROUTES.home} />
        </div>

        <span className="inline-block rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-foreground">
          {t.detail.upcomingEvent}
        </span>

        <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl">
          {event.title}
        </h1>

        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 text-gold" /> {formatDate(event.date)}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="size-4 text-gold" /> {event.location}
          </p>
        </div>

        <Image
          src={event.coverImage}
          alt={event.title}
          width={0}
          height={0}
          priority
          sizes="(min-width: 768px) 720px, 100vw"
          className="mt-6 h-auto w-full rounded-xl"
        />

        <ArticleContent html={event.description} className="mt-6" />

        {event.registerUrl && event.registerUrl !== "#" && (
          <div className="mt-6">
            <Button asChild variant="gold">
              <a
                href={event.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.detail.registerNow}
              </a>
            </Button>
          </div>
        )}

        <div className="mt-10 border-t border-slate-100 pt-6">
          <BackButton fallback={ROUTES.home} dynamicLabel />
        </div>
      </Container>
    </article>
  );
}
