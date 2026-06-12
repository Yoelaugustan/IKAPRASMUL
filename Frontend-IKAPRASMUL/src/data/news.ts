import type { Article } from "@/types";

const BODY = `<p>The Prasmul alumni community continues to grow in reach and impact. This update captures the latest from across the network — on campus, in industry, and around the world.</p>
<p>As always, these stories are authored and curated by the IKAPRASMUL editorial team. To contribute a tip or suggest coverage, reach out through the Contact form.</p>`;

export const ARTICLES: Article[] = [
  {
    slug: "campus-opens-innovation-hub",
    title: "Campus Opens New Innovation Hub for Student Founders",
    excerpt:
      "A 2,000 sqm space dedicated to prototyping, mentorship, and alumni-student collaboration.",
    body: BODY,
    category: "Campus News",
    author: {
      name: "Editorial Team",
      class: "IKAPRASMUL",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    coverImage: "https://picsum.photos/seed/news-hub/1200/800",
    publishedAt: "2026-06-02",
    readMinutes: 4,
    views: 4820,
    isFeatured: true,
  },
  {
    slug: "alumni-named-to-forbes-list",
    title: "Three Alumni Named to Regional Forbes 30 Under 30",
    excerpt:
      "Recognizing alumni breaking ground in technology, sustainability, and the creative economy.",
    body: BODY,
    category: "Alumni News",
    author: {
      name: "Editorial Team",
      class: "IKAPRASMUL",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    coverImage: "https://picsum.photos/seed/news-forbes/1200/800",
    publishedAt: "2026-05-26",
    readMinutes: 3,
    views: 6310,
  },
  {
    slug: "research-sme-resilience",
    title: "New Research: What Makes Indonesian SMEs Resilient",
    excerpt:
      "Faculty and alumni co-author a study on small-business survival through economic shocks.",
    body: BODY,
    category: "Research & Publications",
    author: {
      name: "Editorial Team",
      class: "IKAPRASMUL",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    coverImage: "https://picsum.photos/seed/news-research/1200/800",
    publishedAt: "2026-05-18",
    readMinutes: 8,
    views: 2140,
  },
  {
    slug: "industry-trends-ai-adoption",
    title: "Industry Trends: AI Adoption Among Alumni-Led Firms",
    excerpt:
      "A snapshot of how alumni businesses are putting AI to work — and where they're cautious.",
    body: BODY,
    category: "Industry Trends",
    author: {
      name: "Editorial Team",
      class: "IKAPRASMUL",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    coverImage: "https://picsum.photos/seed/news-ai/1200/800",
    publishedAt: "2026-05-10",
    readMinutes: 6,
    views: 5275,
  },
  {
    slug: "thought-leadership-purpose",
    title: "Thought Leadership: Building Companies With Purpose",
    excerpt:
      "An alumni founder argues that purpose is a competitive advantage, not a tagline.",
    body: BODY,
    category: "Thought Leadership",
    author: {
      name: "Olivia Hartono",
      class: "MM '10",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    coverImage: "https://picsum.photos/seed/news-purpose/1200/800",
    publishedAt: "2026-04-30",
    readMinutes: 5,
    views: 3890,
  },
  {
    slug: "alumni-giving-record",
    title: "Alumni Giving Reaches Record High This Year",
    excerpt:
      "Scholarships funded by alumni donations doubled, supporting 300 new students.",
    body: BODY,
    category: "Alumni News",
    author: {
      name: "Editorial Team",
      class: "IKAPRASMUL",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    coverImage: "https://picsum.photos/seed/news-giving/1200/800",
    publishedAt: "2026-04-22",
    readMinutes: 3,
    views: 2980,
  },
];
