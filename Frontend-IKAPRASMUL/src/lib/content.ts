import "server-only";

import type {
  Article,
  AlumniEvent,
  Business,
  FeaturedAlumni,
  ImpactStat,
  Paginated,
  SigGroup,
  SigSpotlight,
  Story,
} from "@/types";
import { STORY_CATEGORIES } from "@/constants/categories";
import { IMPACT_STATS } from "@/data/impact";

const API_URL = process.env.API_URL ?? "http://localhost:5080";

/* ─── Core fetch ─── */

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

/* ─── Paginated fetch helpers ─── */

function buildQs(params: Record<string, string | number | boolean | null | undefined>): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) qs.set(k, String(v));
  }
  return qs.toString();
}

async function getPaged<T>(
  entity: string,
  params: Record<string, string | number | boolean | null | undefined>,
  tag: string,
): Promise<Paginated<T>> {
  const qs = buildQs(params);
  const fallback: Paginated<T> = { items: [], total: 0, page: 1, pageSize: 10, totalPages: 0 };
  return safeFetch<Paginated<T>>(`/${entity}${qs ? `?${qs}` : ""}`, fallback, tag);
}

// Single item matching a filter — uses pageSize=1
async function fetchOne<T>(
  entity: string,
  filter: Record<string, string | number | boolean>,
  tag: string,
): Promise<T | undefined> {
  const result = await getPaged<T>(entity, { ...filter, pageSize: 1, page: 1 }, tag);
  return result.items[0];
}

// Small curated list matching a filter
async function fetchFiltered<T>(
  entity: string,
  filter: Record<string, string | number | boolean>,
  pageSize: number,
  tag: string,
): Promise<T[]> {
  const result = await getPaged<T>(entity, { ...filter, pageSize, page: 1 }, tag);
  return result.items;
}

// Full-list for complex client-filtered components (calendar, text search, saved bookmarks).
// Cap prevents runaway payloads while keeping client-side filtering practical.
async function fetchAll<T>(entity: string, tag: string, cap = 500): Promise<T[]> {
  const result = await getPaged<T>(entity, { pageSize: cap, page: 1 }, tag);
  return result.items;
}

/* ═══════════════════════════════════════════════════════════════════════
   Public APIs
═══════════════════════════════════════════════════════════════════════ */

/* ─── Impact stats (static) ─── */
export const getImpactStats = async (): Promise<ImpactStat[]> => IMPACT_STATS;

/* ─── SIG ─── */

export const getSigGroups = (): Promise<SigGroup[]> =>
  safeFetch<SigGroup[]>("/sig/groups", [], "sig");

export const getSigSpotlights = (): Promise<SigSpotlight[]> =>
  fetchFiltered<SigSpotlight>("sig/spotlight", {}, 10, "sig");

export const getSigSpotlightById = async (id: string): Promise<SigSpotlight | undefined> =>
  (await getSigSpotlights()).find((s) => s.id === id);

/* ─── Stories ─── */

// Curated sections — small targeted fetches
export const getFeaturedStories = (): Promise<Story[]> =>
  fetchFiltered<Story>("stories", { isFeatured: true }, 4, "stories");

export const getHighlightStories = (): Promise<Story[]> =>
  fetchFiltered<Story>("stories", { isHighlight: true }, 3, "stories");

// Home page "Alumni of the Month" slot — maps isFeaturedHome story → FeaturedAlumni shape
export const getFeaturedAlumni = async (): Promise<FeaturedAlumni | undefined> => {
  const story = await fetchOne<Story>("stories", { isFeaturedHome: true }, "stories");
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

// Server-driven paginated browse — for the StoriesView "view all" mode
export const getStoriesPage = (params: {
  category?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}): Promise<Paginated<Story>> =>
  getPaged<Story>(
    "stories",
    { category: params.category, sort: params.sort, page: params.page ?? 1, pageSize: params.pageSize ?? 9 },
    "stories",
  );

// Category counts — separate fetch (cached) so the sidebar shows accurate totals
export const getStoryCategoryCounts = async (): Promise<{ category: string; count: number }[]> => {
  const all = await fetchAll<Story>("stories", "stories");
  return STORY_CATEGORIES.map((category) => ({
    category,
    count: all.filter((s) => s.category === category).length,
  }));
};

// By slug — for detail pages (no slug endpoint exists server-side yet)
export const getStoryBySlug = async (slug: string): Promise<Story | undefined> =>
  (await fetchAll<Story>("stories", "stories")).find((s) => s.slug === slug);

/* ─── Business ─── */

// Curated sections
export const getBusinessSpotlight = (): Promise<Business | undefined> =>
  fetchOne<Business>("business", { isSpotlight: true }, "business");

export const getBusinessPageFeatured = (): Promise<Business[]> =>
  fetchFiltered<Business>("business", { isFeatured: true }, 8, "business");

// Home page business slot
export const getFeaturedBusinesses = (limit = 1): Promise<Business[]> =>
  fetchFiltered<Business>("business", { isFeaturedHome: true }, limit, "business");

// Full list — for BusinessExplorer. Server handles search/industry/sort; client handles
// secondary location/founder filters, saved bookmarks, and pagination.
export const getBusinesses = async (params?: {
  search?: string;
  industry?: string;
  sort?: string;
}): Promise<Business[]> => {
  const result = await getPaged<Business>(
    "business",
    { ...params, pageSize: 200, page: 1 },
    "business",
  );
  return result.items;
};

export const getBusinessBySlug = async (slug: string): Promise<Business | undefined> =>
  (await fetchAll<Business>("business", "business")).find((b) => b.slug === slug);

/* ─── News ─── */

// Curated sections
export const getFeaturedArticle = (): Promise<Article | undefined> =>
  fetchOne<Article>("news", { isFeatured: true }, "news");

export const getTopStories = (): Promise<Article[]> =>
  fetchFiltered<Article>("news", { isTopStory: true }, 3, "news");

// Home page news slot
export const getFeaturedHomeArticle = (): Promise<Article | undefined> =>
  fetchOne<Article>("news", { isFeaturedHome: true }, "news");

// Server-driven paginated browse — for the NewsExplorer "view all" mode
export const getArticlesPage = (params: {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}): Promise<Paginated<Article>> =>
  getPaged<Article>(
    "news",
    { search: params.search, category: params.category, sort: params.sort,
      page: params.page ?? 1, pageSize: params.pageSize ?? 10 },
    "news",
  );

export const getMostPopularArticles = (limit = 5): Promise<Article[]> =>
  fetchFiltered<Article>("news", { sort: "popular" }, limit, "news");

export const getArticleBySlug = async (slug: string): Promise<Article | undefined> =>
  (await fetchAll<Article>("news", "news")).find((a) => a.slug === slug);

/* ─── Events ─── */

// Curated sections
export const getFeaturedEvents = (): Promise<AlumniEvent[]> =>
  fetchFiltered<AlumniEvent>("events", { isFeatured: true }, 4, "events");

// Home page event slot
export const getUpcomingEvent = (): Promise<AlumniEvent | undefined> =>
  fetchOne<AlumniEvent>("events", { isFeaturedHome: true }, "events");

// Full list — for EventsView calendar and upcoming section (client-side date filtering)
export const getEvents = (): Promise<AlumniEvent[]> =>
  fetchAll<AlumniEvent>("events", "events", 200);

// Server-driven paginated browse — for the EventsView "view all" mode
export const getEventsPage = (params: {
  category?: string;
  sort?: string;
  date?: string;
  page?: number;
  pageSize?: number;
}): Promise<Paginated<AlumniEvent>> =>
  getPaged<AlumniEvent>(
    "events",
    { category: params.category, sort: params.sort, date: params.date,
      page: params.page ?? 1, pageSize: params.pageSize ?? 9 },
    "events",
  );

export const getEventBySlug = async (slug: string): Promise<AlumniEvent | undefined> =>
  (await fetchAll<AlumniEvent>("events", "events")).find((e) => e.slug === slug);

/* ─── Home featured highlights ─── */

export type FeaturedHighlight =
  | { type: "event"; event: AlumniEvent }
  | { type: "alumni"; alumni: FeaturedAlumni }
  | { type: "business"; business: Business }
  | { type: "news"; article: Article };

// Strict 1-1-1-1 grid: each slot is independently flag-driven with no backfill.
export const getFeaturedHighlights = async (): Promise<FeaturedHighlight[]> => {
  const [event, alumni, businesses, article] = await Promise.all([
    getUpcomingEvent(),
    getFeaturedAlumni(),
    getFeaturedBusinesses(1),
    getFeaturedHomeArticle(),
  ]);
  const business = businesses[0] as Business | undefined;

  const highlights: FeaturedHighlight[] = [];
  if (event)    highlights.push({ type: "event",    event });
  if (alumni)   highlights.push({ type: "alumni",   alumni });
  if (business) highlights.push({ type: "business", business });
  if (article)  highlights.push({ type: "news",     article });
  return highlights;
};
