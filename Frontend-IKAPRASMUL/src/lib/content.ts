import "server-only";

import type {
  Article,
  Business,
  ImpactStat,
  SigGroup,
  SigSpotlight,
  Story,
  AlumniEvent,
  FeaturedAlumni,
} from "@/types";
import { STORY_CATEGORIES } from "@/constants/categories";
import { IMPACT_STATS } from "@/data/impact";

const API_URL = process.env.API_URL ?? "http://localhost:5080";

async function safeFetch<T>(path: string, fallback: T, tag?: string): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/api${path}`, {
      next: { revalidate: 300, tags: tag ? [tag] : [] },
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

/* ---------- Home ---------- */
export const getImpactStats = async (): Promise<ImpactStat[]> => IMPACT_STATS;
export const getEvents = (): Promise<AlumniEvent[]> =>
  safeFetch<AlumniEvent[]>("/events", [], "events");
// The home page "Upcoming Event" slot: prefer the admin-flagged event
// (isFeaturedHome), then fall back to the soonest upcoming, then the earliest.
export const getUpcomingEvent = async (): Promise<AlumniEvent | undefined> => {
  const events = await getEvents();
  const flagged = events.find((e) => e.isFeaturedHome);
  if (flagged) return flagged;
  const now = new Date().toISOString();
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return sorted.find((e) => e.date >= now) ?? sorted[0];
};
// The admin-curated Featured Event (isFeatured). Falls back to the soonest
// upcoming event, then to the earliest event, so the slot is never empty.
export const getFeaturedEvent = async (): Promise<AlumniEvent | undefined> => {
  const events = await getEvents();
  const flagged = events.find((e) => e.isFeatured);
  if (flagged) return flagged;
  const now = new Date().toISOString();
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return sorted.find((e) => e.date >= now) ?? sorted[0];
};
export const getEventBySlug = async (
  slug: string,
): Promise<AlumniEvent | undefined> =>
  (await getEvents()).find((e) => e.slug === slug);

/* ---------- SIG ---------- */
export const getSigGroups = (): Promise<SigGroup[]> =>
  safeFetch<SigGroup[]>("/sig/groups", [], "sig");
export const getSigSpotlights = (): Promise<SigSpotlight[]> =>
  safeFetch<SigSpotlight[]>("/sig/spotlight", [], "sig");
export const getSigSpotlightById = async (
  id: string,
): Promise<SigSpotlight | undefined> =>
  (await getSigSpotlights()).find((s) => s.id === id);

/* ---------- Stories ---------- */
export const getStories = (): Promise<Story[]> => safeFetch<Story[]>("/stories", [], "stories");
export const getFeaturedStories = async (): Promise<Story[]> =>
  (await getStories()).filter((s) => s.isFeatured);
export const getHighlightStories = async (): Promise<Story[]> =>
  (await getStories()).filter((s) => s.isHighlight);

// isFeaturedHome is a separate flag from isFeatured — controls the home page Alumni slot
export const getFeaturedAlumni = async (): Promise<FeaturedAlumni | undefined> => {
  const stories = await getStories();
  const story = stories.find((s) => s.isFeaturedHome);
  if (!story) return undefined;
  return {
    slug: story.slug,
    name: story.author.name,
    class: story.author.class,
    role: story.author.role,
    photo: story.coverImage,
    quote: story.excerpt,
  };
};
export const getStoryBySlug = async (slug: string): Promise<Story | undefined> =>
  (await getStories()).find((s) => s.slug === slug);
export const getStoryCategoryCounts = async (): Promise<
  { category: string; count: number }[]
> => {
  const stories = await getStories();
  // always returns every category (even 0-count) so the sidebar never collapses
  return STORY_CATEGORIES.map((category) => ({
    category,
    count: stories.filter((s) => s.category === category).length,
  }));
};

/* ---------- Business ---------- */
export const getBusinesses = (): Promise<Business[]> =>
  safeFetch<Business[]>("/business", [], "business");
export const getBusinessSpotlight = async (): Promise<Business | undefined> => {
  const businesses = await getBusinesses();
  return businesses.find((b) => b.isSpotlight) ?? businesses[0];
};
export const getBusinessPageFeatured = async (): Promise<Business[]> => {
  const businesses = await getBusinesses();
  const flagged = businesses.filter((b) => b.isFeatured);
  return flagged.length > 0 ? flagged : businesses.slice(0, 8);
};
export const getBusinessBySlug = async (
  slug: string,
): Promise<Business | undefined> =>
  (await getBusinesses()).find((b) => b.slug === slug);
export const getFeaturedBusinesses = async (limit = 2): Promise<Business[]> =>
  (await getBusinesses()).filter((b) => b.isFeaturedHome).slice(0, limit);

/* ---------- News ---------- */
export const getArticles = (): Promise<Article[]> => safeFetch<Article[]>("/news", [], "news");
export const getFeaturedArticle = async (): Promise<Article | undefined> =>
  (await getArticles()).find((a) => a.isFeatured);
export const getTopStories = async (): Promise<Article[]> =>
  (await getArticles()).filter((a) => a.isTopStory);
export const getMostPopularArticles = async (limit = 5): Promise<Article[]> =>
  [...(await getArticles())].sort((a, b) => b.views - a.views).slice(0, limit);
export const getArticleBySlug = async (slug: string): Promise<Article | undefined> =>
  (await getArticles()).find((a) => a.slug === slug);

/* ---------- Home featured highlights ---------- */
export type FeaturedHighlight =
  | { type: "event"; event: AlumniEvent }
  | { type: "alumni"; alumni: FeaturedAlumni }
  | { type: "business"; business: Business }
  | { type: "story"; story: Story };

// Curated-but-resilient home highlights. Pass 1 aims for the editorial mix
// (event · alumni · business · business) honoring per-type caps; pass 2 relaxes
// those caps to backfill from whatever else is available so the grid always
// fills up to 4 cards instead of leaving a gap. Hard cap: 4.
export const getFeaturedHighlights = async (): Promise<FeaturedHighlight[]> => {
  const [event, alumni, businesses, stories] = await Promise.all([
    getUpcomingEvent(),
    getFeaturedAlumni(),
    getFeaturedBusinesses(4),
    getStories(),
  ]);

  // Home-worthy stories, minus the one already shown as the Alumni card.
  const storyPool = stories.filter(
    (s) => (s.isHighlight || s.isFeatured) && s.slug !== alumni?.slug,
  );

  const pools: Record<string, FeaturedHighlight[]> = {
    event: event ? [{ type: "event", event }] : [],
    alumni: alumni ? [{ type: "alumni", alumni }] : [],
    business: businesses.map((business) => ({ type: "business", business })),
    story: storyPool.map((story) => ({ type: "story", story })),
  };

  const MAX = 4;
  const ORDER = ["event", "alumni", "business", "story"];
  const CAPS: Record<string, number> = { event: 1, alumni: 1, business: 2, story: 2 };

  const picked: FeaturedHighlight[] = [];

  // Pass 1 — balanced mix (per-type caps).
  for (const key of ORDER) {
    for (const item of pools[key].slice(0, CAPS[key])) {
      if (picked.length >= MAX) break;
      picked.push(item);
    }
  }
  // Pass 2 — backfill to 4 from any remaining content.
  for (const key of ORDER) {
    for (const item of pools[key]) {
      if (picked.length >= MAX) break;
      if (!picked.includes(item)) picked.push(item);
    }
  }
  return picked.slice(0, MAX);
};
