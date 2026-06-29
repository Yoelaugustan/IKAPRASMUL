import type { Business } from "@/types";
import { INDUSTRIES } from "@/constants/categories";
import { Badge } from "@/components/ui/badge";
import { industryBadgeClass } from "@/components/business/industryMeta";
import { Thumb } from "../Thumb";
import type { ResourceConfig } from "../types";
import type { Dictionary } from "@/i18n/dictionaries";

type A = Dictionary["admin"];

export const businessConfig = (a: A): ResourceConfig<Business> => ({
  name: a.nameBusiness,
  title: a.titleBusiness,
  subtitle: a.subtitleBusiness,
  kicker: a.kickerBusiness,
  searchPlaceholder: a.searchBusiness,
  keyField: "slug",
  resourcePath: "business",
  publicPath: "/business",
  slugSource: "name",
  getLabel: (business) => business.name,
  matches: (business, q) =>
    business.name.toLowerCase().includes(q) ||
    business.founder.name.toLowerCase().includes(q) ||
    business.location.toLowerCase().includes(q) ||
    business.industry.toLowerCase().includes(q),
  columns: [
    {
      header: a.colBusiness,
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
      header: a.colIndustry,
      width: "96px",
      cell: (business) => (
        <Badge className={industryBadgeClass(business.industry)}>
          {business.industry}
        </Badge>
      ),
    },
    {
      header: a.colFounder,
      width: "minmax(0,1fr)",
      cell: (business) => (
        <span className="block truncate text-sm text-foreground">
          {business.founder.name}
        </span>
      ),
    },
    {
      header: a.colStatus,
      width: "104px",
      cell: (business) =>
        business.isDraft ? (
          <Badge variant="outline" className="text-muted-foreground">Draft</Badge>
        ) : business.isSpotlight ? (
          <Badge variant="secondary">★ Spotlight</Badge>
        ) : business.isFeatured ? (
          <Badge className="bg-blue-100 text-blue-700">◆ Featured</Badge>
        ) : (
          <span className="text-xs text-muted-foreground">Listed</span>
        ),
    },
  ],
  fields: [
    {
      key: "name",
      label: a.fieldBusinessName,
      type: "text",
      placeholder: "e.g. Puyo Silky Desserts",
      required: true,
    },
    {
      key: "slug",
      label: a.fieldPageUrl,
      type: "text",
      placeholder: "business-page-url",
      hint: a.hintBusinessUrl,
      required: true,
    },
    {
      key: "industry",
      label: a.fieldIndustry,
      type: "select",
      options: INDUSTRIES,
      required: true,
    },
    {
      key: "website",
      label: a.fieldWebsite,
      type: "text",
      placeholder: "https://…",
    },
    { key: "founder.name", label: a.fieldFounderName, type: "text", required: true },
    {
      key: "founder.class",
      label: a.fieldFounderClass,
      type: "text",
      placeholder: "S1 Business '13",
      required: true,
    },
    {
      key: "location",
      label: a.fieldLocation,
      type: "text",
      placeholder: "Jakarta",
      full: true,
      required: true,
    },
    {
      key: "shortDescription",
      label: a.fieldShortDescription,
      type: "textarea",
      rows: 2,
      full: true,
      required: true,
    },
    {
      key: "description",
      label: a.fieldFullDescription,
      type: "rich",
      full: true,
      uploadFolder: "media/business",
    },
    { key: "logo", label: a.fieldLogo, type: "image", uploadFolder: "media/business", required: true },
    { key: "coverImage", label: a.fieldCoverImage, type: "image", uploadFolder: "media/business", required: true },
    {
      key: "isSpotlight",
      label: a.toggleBusinessSpotlight,
      type: "toggle",
      full: true,
    },
    {
      key: "isFeatured",
      label: a.toggleBusinessFeatured,
      type: "toggle",
      full: true,
    },
    {
      key: "isFeaturedHome",
      label: a.toggleBusinessHome,
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
    isFeatured: false,
    isFeaturedHome: false,
    isDraft: false,
  }),
  toggleLimits: { isSpotlight: 1, isFeatured: 8, isFeaturedHome: 1 },
});
