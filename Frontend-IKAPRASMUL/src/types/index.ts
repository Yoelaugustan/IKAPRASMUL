import type {
  Industry,
  NewsCategory,
  StoryCategory,
} from "@/constants/categories";

export type Person = {
  name: string;
  /** Program + graduation class, e.g. "MM '08". */
  class: string;
  role?: string;
  company?: string;
  avatar?: string;
};

export type ImpactStat = {
  key: string;
  label: string;
  value: string;
};

// A SIG group in the "Our Shared Interest Groups" grid — just an image + name.
// The icon is the placeholder shown when there is no image.
export type SigGroup = {
  id: string;
  name: string;
  image?: string;
  /** Lucide icon key, used as the image placeholder. */
  icon?: string;
};

// A SIG Spotlight — a richer, news-like feature (separate from the groups grid).
export type SigSpotlight = {
  id: string;
  name: string;
  image: string;
  description: string;
  category?: string;
  memberCount?: number;
  activities?: string[];
};

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  /** Sanitized HTML / MDX body (dummy plain paragraphs for now). */
  body: string;
  category: StoryCategory;
  author: Person;
  coverImage: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  isFeatured?: boolean;
};

export type Business = {
  slug: string;
  name: string;
  industry: Industry;
  founder: Person;
  location: string;
  shortDescription: string;
  description: string;
  logo: string;
  coverImage: string;
  website?: string;
  isSpotlight?: boolean;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: NewsCategory;
  author: Person;
  coverImage: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  views: number;
  isFeatured?: boolean;
};

export type AlumniEvent = {
  slug: string;
  title: string;
  date: string; // ISO date-time
  location: string;
  coverImage: string;
  description: string;
  registerUrl?: string;
};

export type BoardMember = {
  name: string;
  role: string;
  photo: string;
  tier: "executive" | "board";
};

export type HistoryMilestone = {
  year: string;
  title: string;
  description: string;
};

export type FeaturedAlumni = Person & {
  photo: string;
  quote: string;
};
