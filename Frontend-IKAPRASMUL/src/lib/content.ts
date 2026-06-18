// Content accessors — the single seam between the UI and the data source.
//
// These run on the server (RSC) and read from the .NET backend. Native `fetch`
// is used (not axios) so Next dedupes identical calls within a render and can
// cache/revalidate; the client-side forms use axios via the BFF routes.
//
// Resilience: if the backend is unreachable, fetches degrade to empty/undefined
// instead of throwing, so the page still renders (with "no data" empty states)
// rather than crashing.
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
// Rarely-changing content stays static (no DB): impact stats.
import { IMPACT_STATS } from "@/data/impact";

const API_URL = process.env.API_URL ?? "http://localhost:5080";

/** Fetches content, falling back to `fallback` if the backend is down or errors. */
async function safeFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/api${path}`, {
      // Public content changes rarely and has no CMS yet — cache + revalidate.
      next: { revalidate: 300 },
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    // Backend unreachable — degrade gracefully instead of crashing the page.
    return fallback;
  }
}

/* ---------- Home ---------- */
// Static — impact numbers rarely change and aren't admin-managed.
export const getImpactStats = async (): Promise<ImpactStat[]> => IMPACT_STATS;
export const getEvents = (): Promise<AlumniEvent[]> =>
  safeFetch<AlumniEvent[]>("/events", []);
export const getUpcomingEvent = async (): Promise<AlumniEvent | undefined> => {
  const events = await getEvents();
  return [...events].sort((a, b) => a.date.localeCompare(b.date))[0];
};
export const getEventBySlug = async (
  slug: string,
): Promise<AlumniEvent | undefined> =>
  (await getEvents()).find((e) => e.slug === slug);

/* ---------- SIG ---------- */
// Two independent data sources: the groups grid and the (news-like) spotlight.
export const getSigGroups = (): Promise<SigGroup[]> =>
  safeFetch<SigGroup[]>("/sig/groups", []);
export const getSigSpotlights = (): Promise<SigSpotlight[]> =>
  safeFetch<SigSpotlight[]>("/sig/spotlight", []);
export const getSigSpotlightById = async (
  id: string,
): Promise<SigSpotlight | undefined> =>
  (await getSigSpotlights()).find((s) => s.id === id);

/* ---------- Stories ---------- */
export const getStories = (): Promise<Story[]> => safeFetch<Story[]>("/stories", []);
export const getFeaturedStories = async (): Promise<Story[]> =>
  (await getStories()).filter((s) => s.isFeatured);

// Derives from the first story with isFeaturedHome — independent of isFeatured
// (which controls the stories-page highlights). Admin toggles isFeaturedHome to
// set the Alumni of the Month slot on the home page (max 1).
export const getFeaturedAlumni = async (): Promise<FeaturedAlumni | undefined> => {
  const stories = await getStories();
  const story = stories.find((s) => s.isFeaturedHome);
  if (!story) return undefined;
  return {
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
  // Always return every known category — with a count of 0 when there are no
  // stories (e.g. backend down), so the sidebar still shows all categories.
  return STORY_CATEGORIES.map((category) => ({
    category,
    count: stories.filter((s) => s.category === category).length,
  }));
};

/* ---------- Business ---------- */
export const getBusinesses = (): Promise<Business[]> =>
  safeFetch<Business[]>("/business", []);
export const getBusinessSpotlight = async (): Promise<Business | undefined> => {
  const businesses = await getBusinesses();
  return businesses.find((b) => b.isSpotlight) ?? businesses[0];
};
export const getBusinessBySlug = async (
  slug: string,
): Promise<Business | undefined> =>
  (await getBusinesses()).find((b) => b.slug === slug);
// Returns businesses marked isFeaturedHome — independent of isSpotlight (which
// controls the business-page spotlight card). Admin toggles isFeaturedHome to
// control the home page slots (max 2 shown, matching the 4-card grid).
export const getFeaturedBusinesses = async (limit = 2): Promise<Business[]> =>
  (await getBusinesses()).filter((b) => b.isFeaturedHome).slice(0, limit);

/* ---------- News ---------- */
export const getArticles = (): Promise<Article[]> => safeFetch<Article[]>("/news", []);
export const getFeaturedArticle = async (): Promise<Article | undefined> => {
  const articles = await getArticles();
  return articles.find((a) => a.isFeatured) ?? articles[0];
};
export const getMostPopularArticles = async (limit = 5): Promise<Article[]> =>
  [...(await getArticles())].sort((a, b) => b.views - a.views).slice(0, limit);
export const getArticleBySlug = async (slug: string): Promise<Article | undefined> =>
  (await getArticles()).find((a) => a.slug === slug);

// About-page content (vision/mission, values, pillars, history, governance) is
// static and localized — it lives in the i18n dictionaries (see src/i18n) and
// the governance board data in src/data/about.ts, not here.
