import type { Business } from "@/types";
import { INDUSTRIES } from "@/constants/categories";
import { Badge } from "@/components/ui/badge";
import { industryBadgeClass } from "@/components/business/industryMeta";
import { Thumb } from "../Thumb";
import type { ResourceConfig } from "../types";

export const businessConfig: ResourceConfig<Business> = {
  name: "Business",
  title: "Alumni Business",
  subtitle: "Alumni-founded businesses featured across the public site.",
  kicker: "Alumni Business",
  searchPlaceholder: "Search businesses…",
  keyField: "slug",
  getLabel: (business) => business.name,
  matches: (business, q) =>
    business.name.toLowerCase().includes(q) ||
    business.founder.name.toLowerCase().includes(q) ||
    business.location.toLowerCase().includes(q) ||
    business.industry.toLowerCase().includes(q),
  columns: [
    {
      header: "Business",
      width: "minmax(0,1.5fr)",
      cell: (business) => (
        <div className="flex min-w-0 items-center gap-3">
          <Thumb src={business.logo} alt={business.name} />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {business.name}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {business.location}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Industry",
      width: "96px",
      cell: (business) => (
        <Badge className={industryBadgeClass(business.industry)}>
          {business.industry}
        </Badge>
      ),
    },
    {
      header: "Founder",
      width: "minmax(0,1fr)",
      cell: (business) => (
        <span className="block truncate text-sm text-foreground">
          {business.founder.name}
        </span>
      ),
    },
    {
      header: "Status",
      width: "104px",
      cell: (business) =>
        business.isSpotlight ? (
          <Badge variant="secondary">★ Spotlight</Badge>
        ) : (
          <span className="text-xs text-muted-foreground">Listed</span>
        ),
    },
  ],
  fields: [
    {
      key: "name",
      label: "Business name",
      type: "text",
      placeholder: "e.g. Puyo Silky Desserts",
    },
    {
      key: "slug",
      label: "Slug",
      type: "text",
      placeholder: "puyo-silky-desserts",
      hint: "Used in the URL.",
    },
    {
      key: "industry",
      label: "Industry",
      type: "select",
      options: INDUSTRIES,
    },
    {
      key: "website",
      label: "Website",
      type: "text",
      placeholder: "https://…",
    },
    { key: "founder.name", label: "Founder name", type: "text" },
    {
      key: "founder.class",
      label: "Founder class",
      type: "text",
      placeholder: "S1 Business '13",
    },
    {
      key: "location",
      label: "Location",
      type: "text",
      placeholder: "Jakarta",
      full: true,
    },
    {
      key: "shortDescription",
      label: "Short description",
      type: "textarea",
      rows: 2,
      full: true,
    },
    {
      key: "description",
      label: "Full description",
      type: "rich",
      full: true,
    },
    { key: "logo", label: "Logo", type: "image" },
    { key: "coverImage", label: "Cover image", type: "image" },
    {
      key: "isSpotlight",
      label: "Spotlight on the business page",
      type: "toggle",
    },
    {
      key: "isFeaturedHome",
      label: "Feature on the home page",
      type: "toggle",
    },
  ],
  blank: () => ({
    slug: "",
    name: "",
    industry: "Other",
    founder: { name: "", class: "" },
    location: "",
    shortDescription: "",
    description: "",
    logo: "",
    coverImage: "",
    website: "",
    isSpotlight: false,
    isFeaturedHome: false,
  }),
};
