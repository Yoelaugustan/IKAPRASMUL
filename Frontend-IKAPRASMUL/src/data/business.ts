import type { Business } from "@/types";

const DESC = `<p>Founded by an alumnus who saw a gap the market kept ignoring, this venture pairs disciplined operations with a clear sense of purpose. What began as a small team has grown into a trusted brand serving customers across the region.</p>
<p>The company stays close to the Prasmul community — hiring alumni, mentoring student teams, and partnering with fellow alumni businesses.</p>`;

export const BUSINESSES: Business[] = [
  {
    slug: "kopi-prasmul",
    name: "Kopi Prasmul",
    industry: "F&B",
    founder: { name: "Farah Lestari", class: "MM '11" },
    location: "Jakarta, Indonesia",
    shortDescription:
      "Brewing quality coffee, building meaningful connections.",
    description: DESC,
    logo: "https://picsum.photos/seed/logo-kopi/200/200",
    coverImage: "/images/home/business-kopi.jpg",
    website: "#",
    isSpotlight: true,
  },
  {
    slug: "business-analyst-strategy",
    name: "Business Analyst - Strategy",
    industry: "Consulting",
    founder: { name: "PT Maju Bersama Global", class: "MM '09" },
    location: "Jakarta, Indonesia",
    shortDescription: "PT Maju Bersama Global",
    description: DESC,
    logo: "https://picsum.photos/seed/logo-maju/200/200",
    coverImage: "/images/home/business-analyst.jpg",
    website: "#",
  },
  {
    slug: "garda-capital",
    name: "Garda Capital",
    industry: "Consulting",
    founder: { name: "Rangga Pratama", class: "MM '08" },
    location: "Jakarta, Indonesia",
    shortDescription:
      "Advisory and growth capital for founder-led businesses across Southeast Asia.",
    description: DESC,
    logo: "https://picsum.photos/seed/logo-garda/200/200",
    coverImage: "https://picsum.photos/seed/biz-garda/1200/800",
    website: "#",
  },
  {
    slug: "tenun-nusantara",
    name: "Tenun Nusantara",
    industry: "Retail",
    founder: { name: "Indah Permata", class: "S1 '13" },
    location: "Yogyakarta, Indonesia",
    shortDescription:
      "A modern label bringing handwoven Indonesian textiles to a global audience.",
    description: DESC,
    logo: "https://picsum.photos/seed/logo-tenun/200/200",
    coverImage: "https://picsum.photos/seed/biz-tenun/1200/800",
    website: "#",
  },
  {
    slug: "pulih-health",
    name: "Pulih Health",
    industry: "Healthcare",
    founder: { name: "Rangga Pratama", class: "MM '08" },
    location: "Surabaya, Indonesia",
    shortDescription:
      "Accessible mental-health care delivered through clinics and a telehealth app.",
    description: DESC,
    logo: "https://picsum.photos/seed/logo-pulih/200/200",
    coverImage: "https://picsum.photos/seed/biz-pulih/1200/800",
    website: "#",
  },
  {
    slug: "rakit-studio",
    name: "Rakit Studio",
    industry: "Creative",
    founder: { name: "Dimas Nugroho", class: "S1 '14" },
    location: "Jakarta, Indonesia",
    shortDescription:
      "A brand and product design studio behind some of the country's fastest-growing apps.",
    description: DESC,
    logo: "https://picsum.photos/seed/logo-rakit/200/200",
    coverImage: "https://picsum.photos/seed/biz-rakit/1200/800",
    website: "#",
  },
];
