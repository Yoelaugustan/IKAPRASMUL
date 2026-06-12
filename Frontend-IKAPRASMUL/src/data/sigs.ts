import type { Sig } from "@/types";

export const SIGS: Sig[] = [
  {
    id: "pgpm",
    name: "Perkumpulan Civil Prasetiya Mulya (PGPM)",
    category: "Professional",
    shortDescription:
      "Alumni of the Prasetiya Mulya Graduate Program in Management connecting across cohorts.",
    longDescription:
      "The PGPM Network brings together graduates of the flagship management program for peer mentorship, leadership roundtables, and cross-industry collaboration.",
    memberCount: 480,
    coverImage: "https://picsum.photos/seed/pgpm/800/600",
    activities: ["Leadership roundtables", "Mentorship", "Referral circle"],
    lead: { name: "Andreas Wijaya", class: "PGPM '06", role: "Coordinator" },
    icon: "graduation-cap",
  },
  {
    id: "saham-club",
    name: "Saham Club",
    category: "Investing",
    shortDescription:
      "An equities-focused circle sharing research, theses, and portfolio ideas.",
    longDescription:
      "Saham Club members swap equity research, debate investment theses, and run a paper-trading league.",
    memberCount: 274,
    coverImage: "https://picsum.photos/seed/saham/800/600",
    activities: ["Research sharing", "Paper-trading league", "Thesis debates"],
    lead: { name: "Dimas Nugroho", class: "S1 '14", role: "Coordinator" },
    icon: "trending-up",
  },
  {
    id: "branding-club",
    name: "Branding Club",
    category: "Professional",
    shortDescription:
      "Alumni passionate about brand strategy, marketing, and communications.",
    longDescription:
      "The Branding Club connects alumni working in brand management, marketing, and creative communications for knowledge sharing and collaboration.",
    memberCount: 185,
    coverImage: "https://picsum.photos/seed/branding/800/600",
    activities: ["Brand workshops", "Case studies", "Networking events"],
    icon: "palette",
  },
  {
    id: "coaching-club",
    name: "Coaching Club",
    category: "Professional",
    shortDescription:
      "A community of alumni coaches and mentors sharing best practices.",
    longDescription:
      "The Coaching Club brings together certified coaches and mentors among alumni to share techniques, practice peer coaching, and develop leadership capabilities.",
    memberCount: 142,
    coverImage: "https://picsum.photos/seed/coaching/800/600",
    activities: ["Peer coaching", "Certification prep", "Leadership workshops"],
    icon: "message-circle",
  },
  {
    id: "culinary-club",
    name: "Culinary Club",
    category: "Lifestyle",
    shortDescription:
      "Food lovers exploring restaurants, home cooking, and the F&B business.",
    longDescription:
      "The Culinary Club gathers alumni foodies for tasting tours, cooking classes, and conversations with alumni running F&B ventures.",
    memberCount: 198,
    coverImage: "https://picsum.photos/seed/culinary/800/600",
    activities: ["Tasting tours", "Cooking classes", "F&B founder talks"],
    lead: { name: "Farah Lestari", class: "MM '11", role: "Host" },
    icon: "chef-hat",
  },
  {
    id: "cycling-club",
    name: "Cycling Club",
    category: "Lifestyle",
    shortDescription:
      "Road and mountain biking enthusiasts riding together every weekend.",
    longDescription:
      "The Cycling Club organizes weekend group rides, charity cycling events, and bike touring trips for alumni who love two wheels.",
    memberCount: 156,
    coverImage: "https://picsum.photos/seed/cycling/800/600",
    activities: ["Weekend rides", "Charity cycling", "Bike tours"],
    icon: "bike",
  },
  {
    id: "digital-club",
    name: "Digital Club",
    category: "Professional",
    shortDescription:
      "Digital transformation, e-commerce, and tech innovation discussions.",
    longDescription:
      "The Digital Club focuses on digital transformation strategies, e-commerce trends, and technology innovation for business growth.",
    memberCount: 312,
    coverImage: "https://picsum.photos/seed/digital/800/600",
    activities: ["Tech talks", "Digital strategy workshops", "Startup demos"],
    icon: "monitor",
  },
  {
    id: "financial-club",
    name: "Financial Club",
    category: "Professional",
    shortDescription:
      "Markets, personal finance, and investing discussions led by alumni in finance.",
    longDescription:
      "The Financial Club hosts monthly market briefings, personal-finance workshops, and guest sessions with alumni working across banking, asset management, and fintech.",
    memberCount: 526,
    coverImage: "/images/sig/financial-club.jpg",
    activities: ["Market briefings", "Workshops", "Guest sessions"],
    lead: { name: "Rangga Pratama", class: "MM '08", role: "Chair" },
    icon: "landmark",
    isSpotlight: true,
  },
  {
    id: "fintech-club",
    name: "Fintech Club",
    category: "Professional",
    shortDescription:
      "Exploring financial technology innovations and disruptions.",
    longDescription:
      "The Fintech Club brings together alumni in financial technology to discuss innovations, regulatory developments, and startup opportunities.",
    memberCount: 230,
    coverImage: "https://picsum.photos/seed/fintech/800/600",
    activities: ["Fintech demos", "Regulatory updates", "Startup pitches"],
    icon: "smartphone",
  },
  {
    id: "gamers-club",
    name: "Gamers Club",
    category: "Lifestyle",
    shortDescription:
      "Gaming enthusiasts connecting through esports and game nights.",
    longDescription:
      "The Gamers Club organizes esports tournaments, casual game nights, and discussions about the gaming industry.",
    memberCount: 167,
    coverImage: "https://picsum.photos/seed/gaming/800/600",
    activities: ["Esports tournaments", "Game nights", "Industry talks"],
    icon: "gamepad-2",
  },
  {
    id: "health-club",
    name: "Health Club",
    category: "Lifestyle",
    shortDescription:
      "Promoting wellness, fitness, and healthy lifestyles among alumni.",
    longDescription:
      "The Health Club focuses on holistic wellness including fitness challenges, nutrition workshops, and mental health awareness.",
    memberCount: 203,
    coverImage: "https://picsum.photos/seed/health/800/600",
    activities: ["Fitness challenges", "Nutrition workshops", "Wellness talks"],
    icon: "heart-pulse",
  },
  {
    id: "investor-club",
    name: "Investor Club",
    category: "Investing",
    shortDescription:
      "Angel investing, venture capital, and private equity discussions.",
    longDescription:
      "The Investor Club connects alumni interested in angel investing, venture capital, and private equity opportunities.",
    memberCount: 289,
    coverImage: "https://picsum.photos/seed/investor/800/600",
    activities: ["Deal flow sharing", "Pitch sessions", "Portfolio reviews"],
    icon: "piggy-bank",
  },
  {
    id: "leadership-club",
    name: "Leadership Club",
    category: "Professional",
    shortDescription:
      "Developing leadership skills and executive presence among alumni.",
    longDescription:
      "The Leadership Club provides a platform for alumni to develop leadership capabilities through workshops, executive coaching, and peer learning.",
    memberCount: 175,
    coverImage: "https://picsum.photos/seed/leadership/800/600",
    activities: ["Leadership workshops", "Executive coaching", "Case studies"],
    icon: "crown",
  },
  {
    id: "mining-energy-club",
    name: "Mining & Energy Club",
    category: "Industry",
    shortDescription:
      "Alumni in mining, energy, and natural resources sectors.",
    longDescription:
      "The Mining & Energy Club connects alumni working in mining, oil & gas, renewable energy, and natural resources sectors.",
    memberCount: 134,
    coverImage: "https://picsum.photos/seed/mining/800/600",
    activities: ["Industry updates", "Site visits", "Networking dinners"],
    icon: "factory",
  },
  {
    id: "music-club",
    name: "Music Club",
    category: "Lifestyle",
    shortDescription:
      "Music lovers and performers sharing their passion for music.",
    longDescription:
      "The Music Club brings together alumni who love music for jam sessions, concerts, and music appreciation events.",
    memberCount: 145,
    coverImage: "https://picsum.photos/seed/music/800/600",
    activities: ["Jam sessions", "Concert outings", "Music workshops"],
    icon: "music",
  },
  {
    id: "photographer-club",
    name: "Photographer Club",
    category: "Lifestyle",
    shortDescription:
      "Photography enthusiasts sharing tips, techniques, and photo walks.",
    longDescription:
      "The Photographer Club organizes photo walks, workshops, and exhibitions for alumni passionate about photography.",
    memberCount: 178,
    coverImage: "https://picsum.photos/seed/photo/800/600",
    activities: ["Photo walks", "Workshops", "Exhibitions"],
    icon: "camera",
  },
  {
    id: "prasmul-marketplace",
    name: "Prasmul Marketplace",
    category: "Business",
    shortDescription:
      "A marketplace for alumni businesses to connect and collaborate.",
    longDescription:
      "Prasmul Marketplace is a platform where alumni can showcase their businesses, find partners, and access exclusive deals from fellow alumni.",
    memberCount: 320,
    coverImage: "https://picsum.photos/seed/marketplace/800/600",
    activities: ["Business expos", "Partner matching", "Exclusive deals"],
    icon: "store",
  },
  {
    id: "property-club",
    name: "Property Club",
    category: "Industry",
    shortDescription:
      "Real estate and property investment discussions and networking.",
    longDescription:
      "The Property Club connects alumni interested in real estate development, property investment, and urban planning.",
    memberCount: 245,
    coverImage: "https://picsum.photos/seed/property/800/600",
    activities: ["Property tours", "Investment talks", "Developer meetups"],
    icon: "building",
  },
  {
    id: "runners-club",
    name: "Runners Club",
    category: "Lifestyle",
    shortDescription:
      "Weekly runs, race meet-ups, and a community that keeps each other moving.",
    longDescription:
      "Building healthier lives and stronger bonds, one run at a time.",
    memberCount: 312,
    coverImage: "/images/sig/runner-club.png",
    activities: ["Weekly runs", "Race meet-ups", "Charity relays"],
    lead: { name: "Bayu Setiawan", class: "S1 '12", role: "Run Captain" },
    icon: "footprints",
    isSpotlight: true,
  },
  {
    id: "tourism-club",
    name: "Tourism Club",
    category: "Lifestyle",
    shortDescription:
      "Travel enthusiasts exploring destinations and tourism businesses.",
    longDescription:
      "The Tourism Club organizes group trips, travel meetups, and discussions about the tourism and hospitality industry.",
    memberCount: 192,
    coverImage: "https://picsum.photos/seed/tourism/800/600",
    activities: ["Group trips", "Travel meetups", "Industry talks"],
    icon: "plane",
  },
  {
    id: "traders-club",
    name: "Traders Club",
    category: "Investing",
    shortDescription:
      "Active traders sharing strategies, analysis, and market insights.",
    longDescription:
      "The Traders Club connects alumni who actively trade stocks, forex, and commodities for strategy sharing and market analysis.",
    memberCount: 201,
    coverImage: "https://picsum.photos/seed/traders/800/600",
    activities: ["Trading workshops", "Market analysis", "Strategy sharing"],
    icon: "bar-chart-3",
  },
  {
    id: "umkm-koperasi-club",
    name: "UMKM & Koperasi Club",
    category: "Business",
    shortDescription:
      "Supporting small businesses and cooperatives among alumni.",
    longDescription:
      "The UMKM & Koperasi Club supports alumni with small and medium enterprises through mentoring, access to capital, and business development.",
    memberCount: 168,
    coverImage: "https://picsum.photos/seed/umkm/800/600",
    activities: ["Business mentoring", "Capital access", "Co-op networking"],
    icon: "handshake",
  },
  {
    id: "urban-farming-club",
    name: "Urban Farming Club",
    category: "Lifestyle",
    shortDescription:
      "Promoting urban agriculture and sustainable living practices.",
    longDescription:
      "The Urban Farming Club encourages alumni to explore urban agriculture, sustainable food production, and green living.",
    memberCount: 112,
    coverImage: "https://picsum.photos/seed/urbanfarm/800/600",
    activities: ["Farm visits", "Gardening workshops", "Sustainability talks"],
    icon: "sprout",
  },
  {
    id: "writers-club",
    name: "Writers Club",
    category: "Lifestyle",
    shortDescription:
      "Writers, authors, and content creators sharing their craft.",
    longDescription:
      "The Writers Club brings together alumni who write professionally or as a hobby for workshops, book clubs, and publishing discussions.",
    memberCount: 134,
    coverImage: "https://picsum.photos/seed/writers/800/600",
    activities: ["Writing workshops", "Book clubs", "Publishing talks"],
    icon: "pen-tool",
  },
  {
    id: "supply-chain-club",
    name: "Supply Chain Club",
    category: "Professional",
    shortDescription:
      "Supply chain and logistics professionals sharing industry knowledge.",
    longDescription:
      "The Supply Chain Club connects alumni in logistics, procurement, and supply chain management for knowledge sharing and career development.",
    memberCount: 156,
    coverImage: "https://picsum.photos/seed/supplychain/800/600",
    activities: ["Industry talks", "Site visits", "Best practice sharing"],
    icon: "truck",
  },
  {
    id: "ceo-club",
    name: "CEO Club",
    category: "Professional",
    shortDescription:
      "CEOs and top executives networking and sharing leadership insights.",
    longDescription:
      "The CEO Club is an exclusive circle for alumni serving as CEOs and top executives to share leadership insights and build strategic relationships.",
    memberCount: 89,
    coverImage: "https://picsum.photos/seed/ceo/800/600",
    activities: ["Executive roundtables", "Strategic networking", "Mentoring"],
    icon: "briefcase",
  },
  {
    id: "komunitas-alumni-entrepreneur",
    name: "Komunitas Alumni Entrepreneur",
    category: "Business",
    shortDescription:
      "Entrepreneurs building and scaling businesses together.",
    longDescription:
      "Komunitas Alumni Entrepreneur connects alumni entrepreneurs for mentoring, collaboration, and access to resources for business growth.",
    memberCount: 278,
    coverImage: "https://picsum.photos/seed/entrepreneur/800/600",
    activities: ["Pitch nights", "Mentoring circles", "Resource sharing"],
    icon: "rocket",
  },
  {
    id: "komunitas-alumni-marketing",
    name: "Komunitas Alumni Marketing",
    category: "Professional",
    shortDescription:
      "Marketing professionals sharing strategies and industry trends.",
    longDescription:
      "Komunitas Alumni Marketing brings together marketing professionals to discuss the latest strategies, tools, and industry trends.",
    memberCount: 215,
    coverImage: "https://picsum.photos/seed/marketing/800/600",
    activities: ["Marketing talks", "Case studies", "Tool demos"],
    icon: "megaphone",
  },
  {
    id: "komunitas-buzzer",
    name: "Komunitas Buzzer",
    category: "Professional",
    shortDescription:
      "Social media influencers and digital content creators among alumni.",
    longDescription:
      "Komunitas Buzzer connects alumni who are social media influencers and content creators for collaboration and knowledge sharing.",
    memberCount: 143,
    coverImage: "https://picsum.photos/seed/buzzer/800/600",
    activities: ["Content workshops", "Collaboration projects", "Social media strategy"],
    icon: "volume-2",
  },
];
