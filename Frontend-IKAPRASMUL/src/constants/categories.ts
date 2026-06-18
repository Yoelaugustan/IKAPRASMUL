// Editorial taxonomies used across listing pages and the (future) admin CMS.

export const STORY_CATEGORIES = [
  "Founder Stories",
  "Executive Journey",
  "International Alumni",
  "Impact Stories",
] as const;
export type StoryCategory = (typeof STORY_CATEGORIES)[number];

export const NEWS_CATEGORIES = [
  "Campus News",
  "Alumni News",
  "Research & Publications",
  "Industry Trends",
  "Thought Leadership",
  "Newsletter",
] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export const INDUSTRIES = [
  "Retail",
  "Startup",
  "F&B",
  "Consulting",
  "Manufacturing",
  "Services",
  "Creative",
  "Technology",
  "Healthcare",
  "Education",
  "Other",
] as const;
export type Industry = (typeof INDUSTRIES)[number];

// Subjects offered in the "Get in Touch" contact modal. The CTA-driven values
// let us pre-fill the subject when a viewer clicks "Create a SIG" etc.
export const INQUIRY_SUBJECTS = [
  "General Inquiry",
  "Create a SIG",
  "List Your Business",
  "Submit Your Story",
  "Contact Alumni Network",
  "Partnership",
  "Media & Press",
] as const;
export type InquirySubject = (typeof INQUIRY_SUBJECTS)[number];
