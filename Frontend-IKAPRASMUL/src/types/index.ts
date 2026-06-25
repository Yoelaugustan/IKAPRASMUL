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

export type SigGroup = {
  id: string;
  name: string;
  image?: string;
  /** Lucide icon key, used as the image placeholder. */
  icon?: string;
};

export interface SigSpotlight {
  id: string;
  name: string;
  image: string;
  description: string;
  isDraft?: boolean;
};

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: StoryCategory;
  author: Person;
  coverImage: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  isFeatured?: boolean;
  /** Pinned to the Highlights carousel on the Stories page (max 3). Mutually exclusive with isFeatured. */
  isHighlight?: boolean;
  /** Controls the Alumni of the Month slot on the home page (max 1 shown). */
  isFeaturedHome?: boolean;
  isDraft?: boolean;
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
  /** Controls the big spotlight card on the business listing page. */
  isSpotlight?: boolean;
  /** Controls the featured business slots on the home page (max 2 shown). */
  isFeaturedHome?: boolean;
  isDraft?: boolean;
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
  /** Pinned to the Top Stories section on the news page (max 3). Independent of isFeatured. */
  isTopStory?: boolean;
  /** 'newsletter' cards open a PDF instead of a slug detail page. */
  type?: "article" | "newsletter";
  pdfUrl?: string;
  isDraft?: boolean;
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

export type Pillar = {
  name: string;
  impact: string;
};

export type HistoryMilestone = {
  year: string;
  title: string;
  description: string;
};

export type BoardMember = {
  name: string;
  role: string;
  photo: string;
  tier: "executive" | "board";
};

export type FeaturedAlumni = Person & {
  slug: string;
  photo: string;
  quote: string;
};
