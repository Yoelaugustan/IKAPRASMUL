import type { Story } from "@/types";

const LOREM = `<p>Every alumni journey starts with a single decision. For this graduate, it was a conviction that good business and good values are not at odds — and a willingness to start before everything was certain.</p>
<p>Years on, the lessons learned on campus still echo: rigor, humility, and a bias toward building. The path was not linear, but the network of fellow alumni made each turn feel less lonely.</p>
<p>Today, that journey is a story worth sharing — not because the destination is final, but because the road might inspire the next graduate to take their own first step.</p>`;

export const STORIES: Story[] = [
  {
    slug: "from-campus-to-category-leader",
    title: "From Campus to Category Leader",
    excerpt:
      "How one graduate turned a thesis project into a market-defining agritech venture.",
    body: LOREM,
    category: "Founder Stories",
    author: {
      name: "Olivia Hartono",
      class: "MM '10",
      role: "Co-Founder & CEO, Sembada Agritech",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    coverImage: "https://picsum.photos/seed/story-agritech/1200/800",
    publishedAt: "2026-05-20",
    readMinutes: 6,
    isFeatured: true,
  },
  {
    slug: "leading-through-uncertainty",
    title: "Leading Through Uncertainty",
    excerpt:
      "An executive's playbook for steady leadership when the market shifts overnight.",
    body: LOREM,
    category: "Executive Journey",
    author: {
      name: "Sarah Tanudjaja",
      class: "MM '05",
      role: "COO, Nusantara Logistics",
      avatar: "https://i.pravatar.cc/150?img=45",
    },
    coverImage: "https://picsum.photos/seed/story-exec/1200/800",
    publishedAt: "2026-05-08",
    readMinutes: 5,
  },
  {
    slug: "a-prasmul-passport",
    title: "A Prasmul Passport: Building Abroad",
    excerpt:
      "From Jakarta to Singapore to Berlin — an international alumna on carrying community across borders.",
    body: LOREM,
    category: "International Alumni",
    author: {
      name: "Melinda Kusuma",
      class: "S1 '12",
      role: "Product Lead, Berlin",
      avatar: "https://i.pravatar.cc/150?img=27",
    },
    coverImage: "https://picsum.photos/seed/story-intl/1200/800",
    publishedAt: "2026-04-29",
    readMinutes: 7,
  },
  {
    slug: "impact-beyond-profit",
    title: "Impact Beyond Profit",
    excerpt:
      "How a group of alumni built a foundation that has reached 40,000 students.",
    body: LOREM,
    category: "Impact Stories",
    author: {
      name: "Bayu Setiawan",
      class: "S1 '09",
      role: "Founder, Terang Foundation",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    coverImage: "https://picsum.photos/seed/story-impact/1200/800",
    publishedAt: "2026-04-15",
    readMinutes: 6,
  },
  {
    slug: "the-second-act",
    title: "The Second Act",
    excerpt:
      "Leaving a corporate corner office to bet on a first-time founder's dream.",
    body: LOREM,
    category: "Founder Stories",
    author: {
      name: "Rangga Pratama",
      class: "MM '08",
      role: "Founder, Pulih Health",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    coverImage: "https://picsum.photos/seed/story-second/1200/800",
    publishedAt: "2026-03-30",
    readMinutes: 5,
  },
  {
    slug: "mentorship-that-multiplies",
    title: "Mentorship That Multiplies",
    excerpt:
      "An executive on why she mentors — and what the next generation teaches her back.",
    body: LOREM,
    category: "Executive Journey",
    author: {
      name: "Citra Halim",
      class: "MM '07",
      role: "VP People, Garda Capital",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    coverImage: "https://picsum.photos/seed/story-mentor/1200/800",
    publishedAt: "2026-03-12",
    readMinutes: 4,
  },
  {
    slug: "scaling-with-soul",
    title: "Scaling With Soul",
    excerpt:
      "Growing a 500-person company without losing the founding culture.",
    body: LOREM,
    category: "Founder Stories",
    author: {
      name: "Dimas Nugroho",
      class: "S1 '14",
      role: "CEO, Rakit Studio",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    coverImage: "https://picsum.photos/seed/story-scale/1200/800",
    publishedAt: "2026-02-28",
    readMinutes: 6,
  },
  {
    slug: "the-quiet-operator",
    title: "The Quiet Operator",
    excerpt:
      "A CFO on building trust through transparency and disciplined execution.",
    body: LOREM,
    category: "Executive Journey",
    author: {
      name: "Hendra Gunawan",
      class: "MM '06",
      role: "CFO, Nusantara Logistics",
      avatar: "https://i.pravatar.cc/150?img=60",
    },
    coverImage: "https://picsum.photos/seed/story-quiet/1200/800",
    publishedAt: "2026-02-14",
    readMinutes: 5,
  },
  {
    slug: "crossing-continents",
    title: "Crossing Continents",
    excerpt:
      "From Surabaya to San Francisco — an alumna's path through global tech.",
    body: LOREM,
    category: "International Alumni",
    author: {
      name: "Indah Permata",
      class: "S1 '13",
      role: "Staff Engineer, San Francisco",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
    coverImage: "https://picsum.photos/seed/story-cross/1200/800",
    publishedAt: "2026-01-30",
    readMinutes: 7,
  },
  {
    slug: "a-thousand-small-wins",
    title: "A Thousand Small Wins",
    excerpt:
      "How a community health initiative compounded into nationwide change.",
    body: LOREM,
    category: "Impact Stories",
    author: {
      name: "Farah Lestari",
      class: "MM '11",
      role: "Director, Pulih Health",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    coverImage: "https://picsum.photos/seed/story-wins/1200/800",
    publishedAt: "2026-01-18",
    readMinutes: 6,
  },
  {
    slug: "building-the-bench",
    title: "Building the Bench",
    excerpt:
      "A managing director on developing leaders faster than the business grows.",
    body: LOREM,
    category: "Executive Journey",
    author: {
      name: "Joko Santoso",
      class: "MM '04",
      role: "Managing Director, Garda Capital",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    coverImage: "https://picsum.photos/seed/story-bench/1200/800",
    publishedAt: "2025-12-20",
    readMinutes: 5,
  },
  {
    slug: "from-side-project-to-staple",
    title: "From Side Project to Staple",
    excerpt:
      "A weekend experiment that became a household specialty coffee brand.",
    body: LOREM,
    category: "Founder Stories",
    author: {
      name: "Andi Hartanto",
      class: "MM '14",
      role: "Founder, Kopi Prasmul",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    coverImage: "https://picsum.photos/seed/story-side/1200/800",
    publishedAt: "2025-12-05",
    readMinutes: 5,
  },
  {
    slug: "roots-and-routes",
    title: "Roots and Routes",
    excerpt:
      "Carrying Indonesian textiles to global runways — and staying grounded.",
    body: LOREM,
    category: "International Alumni",
    author: {
      name: "Maya Kartika",
      class: "EMBA '09",
      role: "Creative Director, Milan",
      avatar: "https://i.pravatar.cc/150?img=45",
    },
    coverImage: "https://picsum.photos/seed/story-roots/1200/800",
    publishedAt: "2025-11-22",
    readMinutes: 6,
  },
  {
    slug: "the-comeback",
    title: "The Comeback",
    excerpt:
      "After a venture failed, a founder rebuilt — wiser, leaner, and unafraid.",
    body: LOREM,
    category: "Founder Stories",
    author: {
      name: "Rizky Wicaksono",
      class: "MM '12",
      role: "Founder, Tenun Nusantara",
      avatar: "https://i.pravatar.cc/150?img=51",
    },
    coverImage: "https://picsum.photos/seed/story-comeback/1200/800",
    publishedAt: "2025-11-08",
    readMinutes: 6,
  },
];
