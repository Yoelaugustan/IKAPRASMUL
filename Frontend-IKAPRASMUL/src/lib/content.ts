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
export const getUpcomingEvent = async (): Promise<AlumniEvent | undefined> => {
  const events = await getEvents();
  return [...events].sort((a, b) => a.date.localeCompare(b.date))[0];
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
