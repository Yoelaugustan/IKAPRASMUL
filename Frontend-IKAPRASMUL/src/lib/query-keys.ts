// Centralized React Query keys. Keep all keys here so invalidation stays consistent.

export const queryKeys = {
  sig: {
    all: ["sig"] as const,
    list: () => [...queryKeys.sig.all, "list"] as const,
  },
  stories: {
    all: ["stories"] as const,
    list: (category?: string) =>
      [...queryKeys.stories.all, "list", category ?? "all"] as const,
    detail: (slug: string) => [...queryKeys.stories.all, "detail", slug] as const,
  },
  business: {
    all: ["business"] as const,
    list: (filters?: Record<string, string | undefined>) =>
      [...queryKeys.business.all, "list", filters ?? {}] as const,
    detail: (slug: string) =>
      [...queryKeys.business.all, "detail", slug] as const,
  },
  news: {
    all: ["news"] as const,
    list: (category?: string) =>
      [...queryKeys.news.all, "list", category ?? "all"] as const,
    detail: (slug: string) => [...queryKeys.news.all, "detail", slug] as const,
  },
  events: {
    all: ["events"] as const,
    upcoming: () => [...queryKeys.events.all, "upcoming"] as const,
  },
  home: {
    all: ["home"] as const,
    impact: () => [...queryKeys.home.all, "impact"] as const,
    highlights: () => [...queryKeys.home.all, "highlights"] as const,
  },
} as const;
