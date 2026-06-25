import type { Lang } from "./config";

// Single source of truth for all STATIC, hardcoded UI text. Dynamic content from
// the backend (stories, news, businesses, SIG data) is NOT translated here.
//
// `en` is the canonical shape; `id` must mirror it exactly (enforced by the
// `Record<Lang, Dictionary>` type below). To add a string: add it to `en`, then
// add the Indonesian counterpart to `id`.

const en = {
  nav: {
    home: "Home",
    about: "About IKAPRASMUL",
    sig: "SIG",
    stories: "Alumni Stories",
    business: "Alumni Business",
    news: "News & Insight",
  },
  header: {
    login: "Alumni Login",
    contact: "Contact Us",
  },
  footer: {
    brandDesc:
      "The official alumni association of Universitas Prasetiya Mulya, dedicated to fostering lifelong connections and professional growth.",
    contactHeading: "Contact Us",
    followHeading: "Follow Us",
    followText: "Stay connected with IKAPRASMUL",
    newsletterHeading: "Newsletter",
    newsletterText: "Subscribe to our newsletter for the latest updates.",
    rights: "© 2024 IKAPRASMUL. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    admin: "Admin",
  },
  home: {
    heroTitleLine1: "Welcome Home,",
    heroTitleLine2: "Prasmul Alumni",
    connect: "Connect",
    grow: "Grow",
    giveBack: "Give Back",
    heroSubtitle:
      "A digital home connecting alumni, campus, industry, and opportunities throughout every stage of life and career.",
    joinSig: "Join SIG",
    alumniBusiness: "Alumni Business",
    featuredHighlights: "Featured Highlights",
    noHighlightsTitle: "No highlights available right now",
    noHighlightsDesc:
      "Highlights couldn't be loaded. Please check back shortly.",
  },
  impact: {
    title: "Our Impact in Numbers",
    labels: {
      alumni: "Alumni",
      sig: "SIG",
      entrepreneurs: "Entrepreneurs",
      events: "Events",
    } as Record<string, string>,
  },
  about: {
    heroEyebrow: "About IKAPRASMUL",
    heroTitleLine1: "Empowering Alumni.",
    heroTitleLine2: "Enabling Impact.",
    heroSubtitle:
      "IKAPRASMUL is the official alumni association of Universitas Prasetiya Mulya, committed to building a lifelong ecosystem that connects, grows, and empowers alumni to create meaningful impact for Indonesia and the world.",
    ourVision: "Our Vision",
    ourMission: "Our Mission",
    vision:
      "To be a trusted connector of synergy for alumni, students, the alma mater, and the wider community in driving sustainable collective progress.",
    mission: [
      "Empower a strong, collaborative, and mutually supportive alumni network.",
      "Facilitate the growth of alumni entrepreneurship through access to markets, funding, and investor networks.",
      "Strengthen alumni connectivity with the professional world and strategic career opportunities.",
    ],
    valuesTitle: "Values",
    values: ["Character", "Competency", "Connectivity", "Contribution"],
    pillarsTitle: "Strategic Pillars",
    pillarLabel: "Pillar",
    impactLegacy: "Impact & Legacy",
    pillars: [
      {
        name: "Governance & Organizational Efficiency",
        impact:
          "IKA Prasmul is recognized as a credible, professional, transparent, and high-integrity alumni organization.",
      },
      {
        name: "Connectivity & Career Development",
        impact:
          "Prasmul alumni experience the lifetime value of the network and strengthen the alumni reputation in the professional world, both nationally and globally.",
      },
      {
        name: "Strategic Partnership & Entrepreneurship",
        impact:
          "Alumni become catalysts of the entrepreneurial ecosystem and globally competitive strategic partners.",
      },
      {
        name: "Social Contribution & Further Education",
        impact:
          "Alumni deliver real social and educational impact for society, the alma mater, and younger generations.",
      },
      {
        name: "Interest Communities & Alumni Interaction",
        impact:
          "Inclusive and sustainable alumni interest communities are formed, with a sense of belonging rooted across generations.",
      },
    ],
    historyTitle: "Our History",
    history: [
      {
        year: "28 Oktober 1983",
        description:
          "Ikatan Alumni Prasetiya Mulya was first established at Hotel Kemang.",
      },
      {
        year: "1983 – 1986",
        description:
          "IKAPRAMA was led by Mr. Ir. Sukiman Hendrokusumo, MSc (MBA Modular 1986, PT. Pembangunan Jaya).",
      },
      {
        year: "1987 – 1988",
        description:
          "IKAPRAMA was led by Mr. Dr. Sismadi Partodumuljo, MBA (late) (MBA Modular 1987, owner of RS Sukmul).",
      },
      {
        year: "1988 – 1990",
        description:
          "IKAPRAMA was led by Mr. Eddy Sutjipto, MBA (MBA Modular 1988, Director of PT. Wijaya Kusuma Contractors).",
      },
      {
        year: "1990 – 1994",
        description:
          "IKAPRAMA was led by Mr. Max Moein, MBA (MBA Modular 1990).",
      },
      {
        year: "1994 – 1996",
        description:
          "IKAPRAMA was led by Ms. Dinny Sri Roehdiany, MBA (MBA Modular 1989, entrepreneur).",
      },
      {
        year: "1995 – 1997",
        description:
          "IKAPRAMA was led by Capt. Bobby Faisal MBA (MBA Modular 1991).",
      },
      {
        year: "1997 – 2000",
        description:
          "IKAPRAMA was led by Mr. Pulung Peranginangin, MM (MME MS Batch 5, Chairman of PT. Gema Graha Sarana Tbk).",
      },
      {
        year: "2001 – 2005",
        description:
          "IKAPRAMA was led by Mr. Eddy Junaedi Danu, MM (MME MS Batch 10, Director of PT. Indika Energy, Tbk).",
      },
      {
        year: "2005 – 2010",
        description:
          "IKAPRAMA was led by Mr. Djuanda Nugraha Ibrahim, MM (MME MS Batch 16, Director of Human Resources & Organization at PT PLN).",
      },
      {
        year: "2010 – 2015",
        description:
          "IKAPRAMA was led by Mr. Taslim Yunus, MM (MME MS Batch 8 – Vice President of SKK Migas).",
      },
      {
        year: "2015 – 2020",
        description:
          "IKAPRAMA was led by Mr. Dr. Harris Turino, MM (MME MS Batch 10 – CEO of Kleo Beauty Group).",
      },
      {
        year: "2020 – 2025",
        description:
          "IKAPRAMA was led by Mr. Ir. Maspiyono Handoyo, MM (MM SM 10 – Regional Managing Director of PT. Mayora Indah Tbk).",
      },
      {
        year: "2025 – 2029",
        description:
          "IKAPRAMA was renamed to IKA PRASMUL. Led by Mr. Edy Sutrisman, MM (MMSM 47 - President Commissioner of PT Rekayasa Engineering).",
      },
    ],
    governanceTitle: "Governance Structure",
    executiveBoardLabel: "Executive Board",
    boardMembersLabel: "Board Members",
    roles: {
      "President": "President",
      "Vice President 1": "Vice President 1",
      "Vice President 2": "Vice President 2",
      "Vice President 3": "Vice President 3",
      "Vice President 4": "Vice President 4",
      "Secretary General": "Secretary General",
      "Deputy Secretary General 1": "Deputy Secretary General 1",
      "Deputy Secretary General 2": "Deputy Secretary General 2",
      "General Treasurer": "General Treasurer",
      "Head of Protectorate Board": "Head of Protectorate Board",
      "Member of Protectorate Board": "Member of Protectorate Board",
      "Head of Advisory Board": "Head of Advisory Board",
      "Deputy Head of Advisory Board": "Deputy Head of Advisory Board",
      "Advisory Board Member": "Advisory Board Member",
      "Head of Board of Trustees": "Head of Board of Trustees",
      "Deputy Head of Board of Trustees": "Deputy Head of Board of Trustees",
      "Head of Expert Board": "Head of Expert Board",
      "Deputy Head of Expert Board": "Deputy Head of Expert Board",
    } as Record<string, string>,
  },
  pageHero: {
    storiesEyebrow: "Alumni Stories",
    storiesTitle1: "Stories",
    storiesTitle2: "That Inspire",
    storiesSubtitle:
      "Discover the journeys of Prasmul alumni who are leading change, building businesses, and making a global impact.",
    newsEyebrow: "News & Insights",
    newsTitle1: "Insights That",
    newsTitle2: "Move Forward",
    newsSubtitle:
      "Stay informed with the latest news, research, and thought leadership from Prasetiya Mulya and our global alumni community.",
    sigEyebrow: "SIG (Shared Interest Group)",
    sigTitle1: "Connect. Share. Grow.",
    sigTitle2: "Through Shared Interests.",
    sigSubtitle:
      "SIG (Shared Interest Group) is a platform for Prasetiya Mulya alumni to discuss, share, and learn about topics, hobbies, and activities they are passionate about.",
  },
  sig: {
    contactAlumniNetwork: "Contact Alumni Network",
    ourGroups: "Our Shared Interest Groups",
    descP1:
      "Shared Interest Group (SIG) is a platform created for Prasetiya Mulya alumni to discuss, share, and learn about something they are passionate about—whether it's a hobby, social activity, or a specific professional topic.",
    descP2:
      "There are many activities you can do in a SIG, from gatherings, creating webinar materials, social initiatives, knowledge sharing, and more. Even if a SIG wants to organize a large-scale event, it's possible with the support of IKAPRASMUL and the Prasetiya Mulya Alumni Network.",
    ctaTitle: "Interested in joining a SIG?",
    ctaText:
      "Get in touch with the Alumni Network to find the right SIG for you.",
    whatYouCanDo: "What You Can Do in a SIG",
    activities: [
      { title: "Gatherings & Networking", subtitle: "" },
      { title: "Webinars & Knowledge Sharing", subtitle: "" },
      { title: "Social & Community Activities", subtitle: "" },
      { title: "Skill Development & Learning", subtitle: "" },
      { title: "Create Bigger Impact", subtitle: "With Alumni Network Support" },
    ],
    spotlightTitle: "SIG Spotlight",
    noSpotlightTitle: "No spotlight available right now",
    noSpotlightDesc: "Please check back shortly.",
  },
  business: {
    heroEyebrow: "Alumni Business Showcase",
    heroTitle1: "Built By Alumni.",
    heroTitle2: "For Alumni.",
    heroSubtitle:
      "Discover, connect, and collaborate with businesses built by Prasmul alumni across industries and the world.",
    explore: "Explore Businesses",
    listYourBusiness: "List Your Business",
  },
  contact: {
    getInTouch: "Get in Touch",
    close: "Close",
    modalDesc:
      "Contact information and a form to send the alumni network a message.",
    sendAMessage: "Send a Message",
    fullName: "Full Name",
    fullNamePlaceholder: "Alumni Name",
    emailAddress: "Email Address",
    emailPlaceholder: "alumniname@company.com",
    subject: "Subject",
    subjectPlaceholder: "Choose a subject",
    message: "Message",
    messagePlaceholder: "How can we help you today?",
    attachment: "Attachment (optional)",
    addImage: "Add an image - JPG, PNG, or WebP (max 5 MB)",
    selectedImage: "Selected image",
    removeImage: "Remove image",
    attachmentPreview: "Attachment preview",
    sendMessage: "Send Message",
    toastSuccess: "Thanks! Your message has been sent.",
    toastError: "Couldn't send your message. Please try again.",
    imageTypeError: "Please choose a JPG, PNG, or WebP image.",
    imageSizeError: "Image must be 5 MB or smaller.",
    subjects: {
      "General Inquiry": "General Inquiry",
      "Create a SIG": "Create a SIG",
      "List Your Business": "List Your Business",
      "Submit Your Story": "Submit Your Story",
      "Contact Alumni Network": "Contact Alumni Network",
      Others: "Others",
    } as Record<string, string>,
  },
  newsletter: {
    emailLabel: "Email address",
    emailPlaceholder: "Enter your email",
    subscribe: "Subscribe",
    consent: "By subscribing you agree to receive updates. Unsubscribe anytime.",
    successToast: "You're subscribed! Watch your inbox for updates.",
    errorToast: "Something went wrong. Please try again.",
  },
  lists: {
    storiesHighlight: "Stories Highlight",
    viewAllStories: "View All Stories",
    backToFeatured: "Back to Featured",
    allStories: "All Stories",
    noStoriesTitle: "No stories yet",
    noStoriesDesc:
      "There are no stories in this category right now. Check back soon.",
    storyCategoriesTitle: "Story Categories",
    storiesUnit: "Stories",
    shareTitle1: "Share Your",
    shareTitle2: "Story",
    shareSubtitle: "Inspire the Community",
    shareText:
      "Your story can motivate and empower others in the Prasmul alumni network.",
    submitYourStory: "Submit Your Story",
    paginationLabel: "Pagination",
    prevPage: "Previous page",
    nextPage: "Next page",
  },
  categories: {
    story: {
      All: "All Stories",
      "Founder Stories": "Founder Stories",
      "Executive Journey": "Executive Journey",
      "International Alumni": "International Alumni",
      "Impact Stories": "Impact Stories",
    } as Record<string, string>,
    storySub: {
      All: "Explore all",
      "Founder Stories": "Building from the ground up",
      "Executive Journey": "Leading with impact",
      "International Alumni": "Making an impact globally",
      "Impact Stories": "Creating positive change",
    } as Record<string, string>,
    news: {
      All: "All Stories",
      "Campus News": "Campus News",
      "Alumni News": "Alumni News",
      "Research & Publications": "Research & Publications",
      "Industry Trends": "Industry Trends",
      "Thought Leadership": "Thought Leadership",
      Newsletter: "Newsletter",
    } as Record<string, string>,
    industry: {
      All: "All Industries",
      Retail: "Retail",
      Startup: "Startup",
      "F&B": "F&B",
      Consulting: "Consulting",
      Manufacturing: "Manufacturing",
      Services: "Services",
      Creative: "Creative",
      Technology: "Technology",
      Healthcare: "Healthcare",
      Education: "Education",
      Other: "Other",
    } as Record<string, string>,
  },
  bizList: {
    searchPlaceholder: "Search business, founder, or company",
    searchAria: "Search businesses",
    search: "Search",
    industryLabel: "Industry",
    locationLabel: "Location",
    founderLabel: "Founder",
    browseByIndustry: "Browse by Industry",
    featuredBusinesses: "Featured Businesses",
    saved: "Saved",
    viewAllBusinesses: "View All Businesses",
    noBusinessesTitle: "No businesses available right now",
    noBusinessesDesc:
      "Listings couldn't be loaded. Please check back shortly.",
    savedBusinesses: "Saved Businesses",
    allBusinesses: "All Businesses",
    back: "Back",
    noSavedTitle: "No saved businesses yet",
    noSavedDesc: "Tap the bookmark on any business to save it here.",
    noResultsTitle: "No businesses found",
    noResultsDesc: "Try a different search term, industry, or filter.",
    allIndustries: "All Industries",
  },
  newsList: {
    searchPlaceholder: "Search articles, topics, or authors",
    searchAria: "Search news",
    search: "Search",
    sortLatest: "Latest",
    sortOldest: "Oldest",
    sortPopular: "Most Popular",
    allArticles: "All Articles",
    back: "Back",
    noArticlesTitle: "No articles found",
    noArticlesDesc: "Try a different search term or category.",
    featuredStory: "Featured Story",
    noFeaturedTitle: "No featured story available right now",
    noFeaturedDesc:
      "Articles couldn't be loaded. Please check back shortly.",
    topStories: "Top Stories",
    viewAllStories: "View All Stories",
    mostPopular: "Most Popular",
    viewAll: "View All",
    noPopularTitle: "No popular articles right now",
    noPopularDesc: "Please check back shortly.",
    minRead: "min read",
    stayInformedTitle: "Stay Informed",
    stayInformedText:
      "Subscribe to our newsletter and get the latest insights delivered to your inbox.",
    valueProps: [
      {
        title: "Knowledge",
        description: "Curated insights from experts and practitioners",
      },
      { title: "Relevance", description: "Timely topics that matter to you" },
      {
        title: "Impact",
        description: "Ideas that inspire action and create value",
      },
      {
        title: "Community",
        description: "Voices from our global alumni network",
      },
    ],
  },
  detail: {
    upcomingEvent: "Upcoming Event",
    registerNow: "Register Now",
    alumniOfTheMonth: "Alumni Highlight",
    foundedBy: "Founded by",
    visitWebsite: "Visit Website",
    minRead: "min read",
    views: "views",
    by: "By",
    readFullStory: "Read Full Story",
    featuredStory: "Featured Story",
    noFeaturedStoryTitle: "No featured story available right now",
    noFeaturedStoryDesc:
      "Stories couldn't be loaded. Please check back shortly.",
    spotlightTitle: "Alumni Business Spotlight",
    noSpotlightTitle: "No spotlight available right now",
    noSpotlightDesc: "Please check back shortly.",
    founder: "Founder",
    prevStory: "Previous story",
    nextStory: "Next story",
    goToStory: "Go to story",
  },
  cards: {
    readStory: "Read Story",
    viewDetails: "View Details",
    viewDetail: "View Detail",
    learnMore: "Learn More",
    featuredAlumni: "Featured Alumni",
    featuredBusiness: "Featured Business",
    noGroupsTitle: "No interest groups available right now",
    noGroupsDesc: "Groups couldn't be loaded. Please check back shortly.",
    saveBusiness: "Save business",
    removeSaved: "Remove from saved",
    readStoryAria: "Read story:",
    viewAria: "View",
  },
  validation: {
    nameMin: "Please enter your full name.",
    nameMax: "Name is too long.",
    email: "Enter a valid email address.",
    subject: "Please choose a subject.",
    messageMin: "Please write at least 10 characters.",
    messageMax: "Message is too long (2000 characters max).",
    imageMax: "Image is too large.",
    consent: "Please accept to receive emails.",
  },
  common: {
    backTo: "Back to",
    back: "Back",
    loading: "Loading…",
  },
};

export type Dictionary = typeof en;

const id: Dictionary = {
  nav: {
    home: "Beranda",
    about: "Tentang IKAPRASMUL",
    sig: "SIG",
    stories: "Cerita Alumni",
    business: "Bisnis Alumni",
    news: "Berita & Wawasan",
  },
  header: {
    login: "Alumni Login",
    contact: "Hubungi Kami",
  },
  footer: {
    brandDesc:
      "Ikatan alumni resmi Universitas Prasetiya Mulya, yang berdedikasi membangun koneksi seumur hidup dan pertumbuhan profesional.",
    contactHeading: "Hubungi Kami",
    followHeading: "Ikuti Kami",
    followText: "Tetap terhubung dengan IKAPRASMUL",
    newsletterHeading: "Buletin",
    newsletterText: "Berlangganan buletin kami untuk pembaruan terbaru.",
    rights: "© 2024 IKAPRASMUL. Hak cipta dilindungi.",
    privacy: "Kebijakan Privasi",
    terms: "Ketentuan Layanan",
    admin: "Admin",
  },
  home: {
    heroTitleLine1: "Selamat Datang,",
    heroTitleLine2: "Alumni Prasmul",
    connect: "Terhubung",
    grow: "Bertumbuh",
    giveBack: "Berkontribusi",
    heroSubtitle:
      "Rumah digital yang menghubungkan alumni, kampus, industri, dan peluang di setiap tahap kehidupan dan karier.",
    joinSig: "Gabung SIG",
    alumniBusiness: "Bisnis Alumni",
    featuredHighlights: "Sorotan Unggulan",
    noHighlightsTitle: "Belum ada sorotan saat ini",
    noHighlightsDesc:
      "Sorotan tidak dapat dimuat. Silakan periksa kembali sebentar lagi.",
  },
  impact: {
    title: "Dampak Kami dalam Angka",
    labels: {
      alumni: "Alumni",
      sig: "SIG",
      entrepreneurs: "Wirausahawan",
      events: "Acara",
    },
  },
  about: {
    heroEyebrow: "Tentang IKAPRASMUL",
    heroTitleLine1: "Memberdayakan Alumni.",
    heroTitleLine2: "Mewujudkan Dampak.",
    heroSubtitle:
      "IKAPRASMUL adalah ikatan alumni resmi Universitas Prasetiya Mulya, yang berkomitmen membangun ekosistem seumur hidup untuk menghubungkan, menumbuhkan, dan memberdayakan alumni dalam menciptakan dampak bermakna bagi Indonesia dan dunia.",
    ourVision: "Visi Kami",
    ourMission: "Misi Kami",
    vision:
      "Menjadi perekat sinergi yang terpercaya bagi alumni, mahasiswa, almamater, dan masyarakat luas dalam mendorong kemajuan kolektif yang berkelanjutan.",
    mission: [
      "Memberdayakan jejaring alumni yang kuat, kolaboratif, dan saling mendukung.",
      "Memfasilitasi pertumbuhan wirausaha alumni melalui akses pasar, pendanaan, dan jejaring investor.",
      "Memperkuat konektivitas alumni dengan dunia kerja dan peluang profesional strategis.",
    ],
    valuesTitle: "Nilai",
    values: ["Character", "Competency", "Connectivity", "Contribution"],
    pillarsTitle: "Pilar Strategis",
    pillarLabel: "Pilar",
    impactLegacy: "Dampak & Warisan",
    pillars: [
      {
        name: "Tata Kelola & Efisiensi Organisasi",
        impact:
          "IKA Prasmul diakui sebagai organisasi alumni yang kredibel, profesional, transparan, dan berintegritas.",
      },
      {
        name: "Konektivitas & Pengembangan Karier",
        impact:
          "Alumni Prasmul merasakan lifetime value jejaring dan meningkatkan reputasi alumni di dunia profesional, baik nasional maupun global.",
      },
      {
        name: "Kemitraan Strategis & Kewirausahaan",
        impact:
          "Alumni menjadi katalis ekosistem kewirausahaan & mitra strategis yang berdaya saing global.",
      },
      {
        name: "Kontribusi Sosial & Pendidikan Lanjut",
        impact:
          "Alumni memberi dampak sosial & pendidikan nyata bagi masyarakat, almamater, dan generasi muda.",
      },
      {
        name: "Komunitas Minat & Interaksi Alumni",
        impact:
          "Terciptanya komunitas minat alumni inklusif & berkelanjutan, rasa kebersamaan alumni mengakar lintas generasi.",
      },
    ],
    historyTitle: "Sejarah Kami",
    history: [
      {
        year: "28 Oktober 1983",
        description:
          "Ikatan Alumni Prasetiya Mulya pertama kali dibentuk di Hotel Kemang.",
      },
      {
        year: "1983 – 1986",
        description:
          "IKAPRAMA dipimpin oleh Bpk Ir. Sukiman Hendrokusumo, MSc (MBA Modular 1986, PT. Pembangunan Jaya).",
      },
      {
        year: "1987 – 1988",
        description:
          "IKAPRAMA dipimpin oleh Bpk. Dr. Sismadi Partodumuljo, MBA (Alm) (MBA Modular 1987, pemilik RS Sukmul).",
      },
      {
        year: "1988 – 1990",
        description:
          "IKAPRAMA dipimpin oleh Bapak Eddy Sutjipto, MBA (MBA Modular 1988, Direktur PT. Wijaya Kusuma Contractors).",
      },
      {
        year: "1990 – 1994",
        description:
          "IKAPRAMA dipimpin oleh Bapak Max Moein, MBA (MBA Modular 1990).",
      },
      {
        year: "1994 – 1996",
        description:
          "IKAPRAMA dipimpin oleh Ibu Dinny Sri Roehdiany, MBA (MBA Modular 1989, wiraswasta).",
      },
      {
        year: "1995 – 1997",
        description:
          "IKAPRAMA dipimpin oleh Capt. Bobby Faisal MBA (MBA Modular 1991).",
      },
      {
        year: "1997 – 2000",
        description:
          "IKAPRAMA dipimpin oleh Bapak Pulung Peranginangin, MM (MME MS Batch 5, Chairman PT. Gema Graha Sarana Tbk).",
      },
      {
        year: "2001 – 2005",
        description:
          "IKAPRAMA dipimpin oleh Bapak Eddy Junaedi Danu, MM (MME MS Batch 10, Director PT. Indika Energy, Tbk).",
      },
      {
        year: "2005 – 2010",
        description:
          "IKAPRAMA dipimpin oleh Bapak Djuanda Nugraha Ibrahim, MM (MME MS Batch 16, Direktur Sumber Daya Manusia dan Organisasi PT PLN).",
      },
      {
        year: "2010 – 2015",
        description:
          "IKAPRAMA dipimpin oleh Bapak Taslim Yunus, MM (MME MS Batch 8 – Vice President SKK Migas).",
      },
      {
        year: "2015 – 2020",
        description:
          "IKAPRAMA dipimpin oleh Bapak Dr. Harris Turino, MM (MME MS Batch 10 – CEO Kleo Beauty Group).",
      },
      {
        year: "2020 – 2025",
        description:
          "IKAPRAMA dipimpin oleh Bapak Ir. Maspiyono Handoyo, MM (MM SM 10 – Regional Managing Director PT. Mayora Indah Tbk).",
      },
      {
        year: "2025 – 2029",
        description:
          "IKAPRAMA berubah nama menjadi IKA PRASMUL. Dipimpin oleh Bapak Edy Sutrisman, MM (MMSM 47 - Komisaris Utama PT Rekayasa Engineering).",
      },
    ],
    governanceTitle: "Struktur Organisasi",
    executiveBoardLabel: "Dewan Eksekutif",
    boardMembersLabel: "Anggota Dewan",
    roles: {
      "President": "Ketua Umum",
      "Vice President 1": "Wakil Ketua 1",
      "Vice President 2": "Wakil Ketua 2",
      "Vice President 3": "Wakil Ketua 3",
      "Vice President 4": "Wakil Ketua 4",
      "Secretary General": "Sekretaris Jenderal",
      "Deputy Secretary General 1": "Wakil Sekretaris Jenderal 1",
      "Deputy Secretary General 2": "Wakil Sekretaris Jenderal 2",
      "General Treasurer": "Bendahara Umum",
      "Head of Protectorate Board": "Ketua Dewan Pelindung",
      "Member of Protectorate Board": "Anggota Dewan Pelindung",
      "Head of Advisory Board": "Ketua Dewan Penasihat",
      "Deputy Head of Advisory Board": "Wakil Ketua Dewan Penasihat",
      "Advisory Board Member": "Wakil Dewan Penasihat",
      "Head of Board of Trustees": "Ketua Dewan Penyantun",
      "Deputy Head of Board of Trustees": "Wakil Ketua Dewan Penyantun",
      "Head of Expert Board": "Ketua Dewan Pakar",
      "Deputy Head of Expert Board": "Wakil Ketua Dewan Pakar",
    },
  },
  pageHero: {
    storiesEyebrow: "Cerita Alumni",
    storiesTitle1: "Cerita",
    storiesTitle2: "yang Menginspirasi",
    storiesSubtitle:
      "Temukan perjalanan alumni Prasmul yang memimpin perubahan, membangun bisnis, dan menciptakan dampak global.",
    newsEyebrow: "Berita & Wawasan",
    newsTitle1: "Wawasan yang",
    newsTitle2: "Menggerakkan",
    newsSubtitle:
      "Dapatkan informasi terkini berupa berita, riset, dan pemikiran dari Prasetiya Mulya serta komunitas alumni global kami.",
    sigEyebrow: "SIG (Shared Interest Group)",
    sigTitle1: "Terhubung. Berbagi. Bertumbuh.",
    sigTitle2: "Melalui Minat Bersama.",
    sigSubtitle:
      "SIG (Shared Interest Group) adalah wadah bagi alumni Prasetiya Mulya untuk berdiskusi, berbagi, dan belajar tentang topik, hobi, serta kegiatan yang mereka minati.",
  },
  sig: {
    contactAlumniNetwork: "Hubungi Jaringan Alumni",
    ourGroups: "Shared Interest Group Kami",
    descP1:
      "Shared Interest Group (SIG) adalah wadah yang diciptakan bagi alumni Prasetiya Mulya untuk berdiskusi, berbagi, dan belajar tentang hal yang mereka minati—baik itu hobi, kegiatan sosial, maupun topik profesional tertentu.",
    descP2:
      "Ada banyak kegiatan yang bisa kamu lakukan dalam sebuah SIG, mulai dari pertemuan, membuat materi webinar, inisiatif sosial, berbagi pengetahuan, dan lainnya. Bahkan jika sebuah SIG ingin menyelenggarakan acara berskala besar, hal itu dimungkinkan dengan dukungan IKAPRASMUL dan Jaringan Alumni Prasetiya Mulya.",
    ctaTitle: "Tertarik bergabung dengan SIG?",
    ctaText:
      "Hubungi Jaringan Alumni untuk menemukan SIG yang tepat untukmu.",
    whatYouCanDo: "Yang Bisa Kamu Lakukan di SIG",
    activities: [
      { title: "Pertemuan & Jejaring", subtitle: "" },
      { title: "Webinar & Berbagi Pengetahuan", subtitle: "" },
      { title: "Kegiatan Sosial & Komunitas", subtitle: "" },
      { title: "Pengembangan Keterampilan & Pembelajaran", subtitle: "" },
      {
        title: "Menciptakan Dampak Lebih Besar",
        subtitle: "Dengan Dukungan Jaringan Alumni",
      },
    ],
    spotlightTitle: "Sorotan SIG",
    noSpotlightTitle: "Belum ada sorotan saat ini",
    noSpotlightDesc: "Silakan periksa kembali sebentar lagi.",
  },
  business: {
    heroEyebrow: "Etalase Bisnis Alumni",
    heroTitle1: "Dibangun Oleh Alumni.",
    heroTitle2: "Untuk Alumni.",
    heroSubtitle:
      "Temukan, terhubung, dan berkolaborasi dengan bisnis yang dibangun oleh alumni Prasmul di berbagai industri dan seluruh dunia.",
    explore: "Jelajahi Bisnis",
    listYourBusiness: "Daftarkan Bisnis Anda",
  },
  contact: {
    getInTouch: "Hubungi Kami",
    close: "Tutup",
    modalDesc:
      "Informasi kontak dan formulir untuk mengirim pesan ke jaringan alumni.",
    sendAMessage: "Kirim Pesan",
    fullName: "Nama Lengkap",
    fullNamePlaceholder: "Nama Alumni",
    emailAddress: "Alamat Email",
    emailPlaceholder: "namaalumni@perusahaan.com",
    subject: "Subjek",
    subjectPlaceholder: "Pilih subjek",
    message: "Pesan",
    messagePlaceholder: "Ada yang bisa kami bantu hari ini?",
    attachment: "Lampiran (opsional)",
    addImage: "Tambahkan gambar - JPG, PNG, atau WebP (maks 5 MB)",
    selectedImage: "Gambar terpilih",
    removeImage: "Hapus gambar",
    attachmentPreview: "Pratinjau lampiran",
    sendMessage: "Kirim Pesan",
    toastSuccess: "Terima kasih! Pesan Anda telah terkirim.",
    toastError: "Tidak dapat mengirim pesan Anda. Silakan coba lagi.",
    imageTypeError: "Silakan pilih gambar JPG, PNG, atau WebP.",
    imageSizeError: "Ukuran gambar harus 5 MB atau lebih kecil.",
    subjects: {
      "General Inquiry": "Pertanyaan Umum",
      "Create a SIG": "Buat SIG",
      "List Your Business": "Daftarkan Bisnis Anda",
      "Submit Your Story": "Kirim Cerita Anda",
      "Contact Alumni Network": "Hubungi Jaringan Alumni",
      Others: "Lainnya",
    },
  },
  newsletter: {
    emailLabel: "Alamat email",
    emailPlaceholder: "Masukkan email Anda",
    subscribe: "Berlangganan",
    consent:
      "Dengan berlangganan, Anda setuju menerima pembaruan. Berhenti kapan saja.",
    successToast:
      "Anda telah berlangganan! Periksa kotak masuk Anda untuk pembaruan.",
    errorToast: "Terjadi kesalahan. Silakan coba lagi.",
  },
  lists: {
    storiesHighlight: "Sorotan Cerita",
    viewAllStories: "Lihat Semua Cerita",
    backToFeatured: "Kembali ke Unggulan",
    allStories: "Semua Cerita",
    noStoriesTitle: "Belum ada cerita",
    noStoriesDesc:
      "Belum ada cerita di kategori ini saat ini. Periksa kembali nanti.",
    storyCategoriesTitle: "Kategori Cerita",
    storiesUnit: "Cerita",
    shareTitle1: "Bagikan",
    shareTitle2: "Cerita Anda",
    shareSubtitle: "Inspirasi untuk Komunitas",
    shareText:
      "Cerita Anda dapat memotivasi dan memberdayakan orang lain di jaringan alumni Prasmul.",
    submitYourStory: "Kirim Cerita Anda",
    paginationLabel: "Halaman",
    prevPage: "Halaman sebelumnya",
    nextPage: "Halaman berikutnya",
  },
  categories: {
    story: {
      All: "Semua Cerita",
      "Founder Stories": "Cerita Pendiri",
      "Executive Journey": "Perjalanan Eksekutif",
      "International Alumni": "Alumni Internasional",
      "Impact Stories": "Cerita Dampak",
    },
    storySub: {
      All: "Jelajahi semua",
      "Founder Stories": "Membangun dari nol",
      "Executive Journey": "Memimpin dengan dampak",
      "International Alumni": "Berdampak secara global",
      "Impact Stories": "Menciptakan perubahan positif",
    },
    news: {
      All: "Semua Berita",
      "Campus News": "Berita Kampus",
      "Alumni News": "Berita Alumni",
      "Research & Publications": "Riset & Publikasi",
      "Industry Trends": "Tren Industri",
      "Thought Leadership": "Kepemimpinan Pemikiran",
      Newsletter: "Newsletter",
    },
    industry: {
      All: "Semua Industri",
      Retail: "Ritel",
      Startup: "Startup",
      "F&B": "F&B",
      Consulting: "Konsultan",
      Manufacturing: "Manufaktur",
      Services: "Jasa",
      Creative: "Kreatif",
      Technology: "Teknologi",
      Healthcare: "Kesehatan",
      Education: "Pendidikan",
      Other: "Lainnya",
    },
  },
  bizList: {
    searchPlaceholder: "Cari bisnis, pendiri, atau perusahaan",
    searchAria: "Cari bisnis",
    search: "Cari",
    industryLabel: "Industri",
    locationLabel: "Lokasi",
    founderLabel: "Pendiri",
    browseByIndustry: "Telusuri berdasarkan Industri",
    featuredBusinesses: "Bisnis Unggulan",
    saved: "Tersimpan",
    viewAllBusinesses: "Lihat Semua Bisnis",
    noBusinessesTitle: "Belum ada bisnis saat ini",
    noBusinessesDesc:
      "Daftar tidak dapat dimuat. Silakan periksa kembali sebentar lagi.",
    savedBusinesses: "Bisnis Tersimpan",
    allBusinesses: "Semua Bisnis",
    back: "Kembali",
    noSavedTitle: "Belum ada bisnis tersimpan",
    noSavedDesc:
      "Ketuk ikon bookmark pada bisnis mana pun untuk menyimpannya di sini.",
    noResultsTitle: "Tidak ada bisnis ditemukan",
    noResultsDesc: "Coba kata kunci, industri, atau filter lain.",
    allIndustries: "Semua Industri",
  },
  newsList: {
    searchPlaceholder: "Cari artikel, topik, atau penulis",
    searchAria: "Cari berita",
    search: "Cari",
    sortLatest: "Terbaru",
    sortOldest: "Terlama",
    sortPopular: "Terpopuler",
    allArticles: "Semua Artikel",
    back: "Kembali",
    noArticlesTitle: "Tidak ada artikel ditemukan",
    noArticlesDesc: "Coba kata kunci atau kategori lain.",
    featuredStory: "Cerita Unggulan",
    noFeaturedTitle: "Belum ada cerita unggulan saat ini",
    noFeaturedDesc:
      "Artikel tidak dapat dimuat. Silakan periksa kembali sebentar lagi.",
    topStories: "Berita Teratas",
    viewAllStories: "Lihat Semua Berita",
    mostPopular: "Terpopuler",
    viewAll: "Lihat Semua",
    noPopularTitle: "Belum ada artikel populer saat ini",
    noPopularDesc: "Silakan periksa kembali sebentar lagi.",
    minRead: "menit baca",
    stayInformedTitle: "Tetap Terinformasi",
    stayInformedText:
      "Berlangganan buletin kami dan dapatkan wawasan terbaru langsung ke kotak masuk Anda.",
    valueProps: [
      {
        title: "Pengetahuan",
        description: "Wawasan terkurasi dari para ahli dan praktisi",
      },
      { title: "Relevansi", description: "Topik terkini yang penting bagi Anda" },
      {
        title: "Dampak",
        description: "Gagasan yang menginspirasi aksi dan menciptakan nilai",
      },
      {
        title: "Komunitas",
        description: "Suara dari jaringan alumni global kami",
      },
    ],
  },
  detail: {
    upcomingEvent: "Acara Mendatang",
    registerNow: "Daftar Sekarang",
    alumniOfTheMonth: "Alumni Highlight",
    foundedBy: "Didirikan oleh",
    visitWebsite: "Kunjungi Situs",
    minRead: "menit baca",
    views: "dilihat",
    by: "Oleh",
    readFullStory: "Baca Selengkapnya",
    featuredStory: "Cerita Unggulan",
    noFeaturedStoryTitle: "Belum ada cerita unggulan saat ini",
    noFeaturedStoryDesc:
      "Cerita tidak dapat dimuat. Silakan periksa kembali sebentar lagi.",
    spotlightTitle: "Sorotan Bisnis Alumni",
    noSpotlightTitle: "Belum ada sorotan saat ini",
    noSpotlightDesc: "Silakan periksa kembali sebentar lagi.",
    founder: "Pendiri",
    prevStory: "Cerita sebelumnya",
    nextStory: "Cerita berikutnya",
    goToStory: "Ke cerita",
  },
  cards: {
    readStory: "Baca Cerita",
    viewDetails: "Lihat Detail",
    viewDetail: "Lihat Detail",
    learnMore: "Selengkapnya",
    featuredAlumni: "Alumni Unggulan",
    featuredBusiness: "Bisnis Unggulan",
    noGroupsTitle: "Belum ada kelompok minat saat ini",
    noGroupsDesc:
      "Kelompok tidak dapat dimuat. Silakan periksa kembali sebentar lagi.",
    saveBusiness: "Simpan bisnis",
    removeSaved: "Hapus dari tersimpan",
    readStoryAria: "Baca cerita:",
    viewAria: "Lihat",
  },
  validation: {
    nameMin: "Mohon masukkan nama lengkap Anda.",
    nameMax: "Nama terlalu panjang.",
    email: "Masukkan alamat email yang valid.",
    subject: "Mohon pilih subjek.",
    messageMin: "Mohon tulis minimal 10 karakter.",
    messageMax: "Pesan terlalu panjang (maks 2000 karakter).",
    imageMax: "Ukuran gambar terlalu besar.",
    consent: "Mohon setujui untuk menerima email.",
  },
  common: {
    backTo: "Kembali ke",
    back: "Kembali",
    loading: "Memuat…",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { en, id };
