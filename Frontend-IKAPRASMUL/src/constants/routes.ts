// Centralized route table. Never hardcode paths in components — import from here.

export const ROUTES = {
  home: "/",
  about: "/about",
  sig: "/sig",
  stories: "/stories",
  business: "/business",
  news: "/news",

  // Dynamic content detail pages
  storyDetail: (slug: string) => `/stories/${slug}`,
  businessDetail: (slug: string) => `/business/${slug}`,
  articleDetail: (slug: string) => `/news/${slug}`,
  eventDetail: (slug: string) => `/events/${slug}`,
  sigDetail: (id: string) => `/sig/${id}`,
  featuredAlumni: "/featured-alumni",

  // Admin sign-in (no public registration)
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  // Admin CMS
  admin: "/admin",
  adminSig: "/admin/sig",
  adminStories: "/admin/stories",
  adminNews: "/admin/news",
  adminBusiness: "/admin/business",
  adminEvents: "/admin/events",
  adminAbout: "/admin/about",
  adminHome: "/admin/home",
  adminInquiries: "/admin/inquiries",
  adminNewsletter: "/admin/newsletter",
} as const;

export const MAIN_NAV = [
  { label: "Home", href: ROUTES.home },
  { label: "About IKAPRASMUL", href: ROUTES.about },
  { label: "SIG", href: ROUTES.sig },
  { label: "Alumni Stories", href: ROUTES.stories },
  { label: "Alumni Business", href: ROUTES.business },
  { label: "News & Insight", href: ROUTES.news },
] as const;
