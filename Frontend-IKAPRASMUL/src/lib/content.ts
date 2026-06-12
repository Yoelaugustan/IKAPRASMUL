// Content accessors — the single seam between the UI and the data source.
//
// Today these resolve from static dummy data (src/data/*). When the .NET backend
// is wired, swap the bodies here to call `apiServer`/`api` (lib/api.ts) without
// touching any page or component. Keep the function signatures stable.

import { IMPACT_STATS } from "@/data/impact";
import { SIGS } from "@/data/sigs";
import { STORIES } from "@/data/stories";
import { BUSINESSES } from "@/data/business";
import { ARTICLES } from "@/data/news";
import { EVENTS } from "@/data/events";
import { FEATURED_ALUMNI } from "@/data/home";
import {
  BOARD_MEMBERS,
  EXECUTIVE_BOARD,
  HISTORY,
  MISSION,
  PURPOSE,
  VISION,
} from "@/data/about";
import type {
  Article,
  Business,
  ImpactStat,
  Sig,
  Story,
  AlumniEvent,
} from "@/types";

// Tiny helper so callers can `await` uniformly (mirrors a real async fetch).
const ok = <T>(data: T): Promise<T> => Promise.resolve(data);

/* ---------- Home ---------- */
export const getImpactStats = (): Promise<ImpactStat[]> => ok(IMPACT_STATS);
export const getFeaturedAlumni = () => ok(FEATURED_ALUMNI);
export const getUpcomingEvent = (): Promise<AlumniEvent | undefined> =>
  ok([...EVENTS].sort((a, b) => a.date.localeCompare(b.date))[0]);

/* ---------- SIG ---------- */
export const getSigs = (): Promise<Sig[]> => ok(SIGS);
export const getSigSpotlight = (): Promise<Sig | undefined> =>
  ok(SIGS.find((s) => s.isSpotlight) ?? SIGS[0]);

/* ---------- Stories ---------- */
export const getStories = (): Promise<Story[]> => ok(STORIES);
export const getFeaturedStories = (): Promise<Story[]> =>
  ok(STORIES.filter((s) => s.isFeatured));
export const getStoryBySlug = (slug: string): Promise<Story | undefined> =>
  ok(STORIES.find((s) => s.slug === slug));
export const getStoryCategoryCounts = (): Promise<
  { category: string; count: number }[]
> => {
  const counts = STORIES.reduce<Record<string, number>>((acc, s) => {
    acc[s.category] = (acc[s.category] ?? 0) + 1;
    return acc;
  }, {});
  return ok(
    Object.entries(counts).map(([category, count]) => ({ category, count })),
  );
};

/* ---------- Business ---------- */
export const getBusinesses = (): Promise<Business[]> => ok(BUSINESSES);
export const getBusinessSpotlight = (): Promise<Business | undefined> =>
  ok(BUSINESSES.find((b) => b.isSpotlight) ?? BUSINESSES[0]);
export const getBusinessBySlug = (
  slug: string,
): Promise<Business | undefined> =>
  ok(BUSINESSES.find((b) => b.slug === slug));
export const getFeaturedBusinesses = (limit = 2): Promise<Business[]> =>
  ok(BUSINESSES.slice(0, limit));

/* ---------- News ---------- */
export const getArticles = (): Promise<Article[]> => ok(ARTICLES);
export const getFeaturedArticle = (): Promise<Article | undefined> =>
  ok(ARTICLES.find((a) => a.isFeatured) ?? ARTICLES[0]);
export const getMostPopularArticles = (limit = 5): Promise<Article[]> =>
  ok([...ARTICLES].sort((a, b) => b.views - a.views).slice(0, limit));
export const getArticleBySlug = (slug: string): Promise<Article | undefined> =>
  ok(ARTICLES.find((a) => a.slug === slug));

/* ---------- About ---------- */
export const getAboutContent = () =>
  ok({
    vision: VISION,
    mission: MISSION,
    purpose: PURPOSE,
    history: HISTORY,
    executiveBoard: EXECUTIVE_BOARD,
    boardMembers: BOARD_MEMBERS,
  });
