import type { SigSpotlight } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Thumb } from "../Thumb";
import type { ResourceConfig } from "../types";

export const sigSpotlightConfig: ResourceConfig<SigSpotlight> = {
  name: "SIG Spotlight",
  title: "SIG Spotlight",
  subtitle: "Featured SIG activities highlighted on the public site.",
  kicker: "SIG Spotlight",
  searchPlaceholder: "Search spotlights…",
  keyField: "id",
  slugSource: "name",
  slugTarget: "id",
  getLabel: (item) => item.name,
  matches: (item, q) =>
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q),
  columns: [
    {
      header: "Spotlight",
      width: "minmax(0,1fr)",
      cell: (item) => (
        <div className="flex min-w-0 items-center gap-3">
          <Thumb src={item.image} alt={item.name} />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {item.name}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {item.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      width: "86px",
      cell: (item) =>
        item.isDraft ? (
          <Badge variant="outline" className="text-muted-foreground">Draft</Badge>
        ) : (
          <span className="text-xs text-muted-foreground">Published</span>
        ),
    },
  ],
  fields: [
    {
      key: "name",
      label: "Title",
      type: "text",
      placeholder: "Spotlight headline",
      full: true,
    },
    {
      key: "id",
      label: "Page URL",
      type: "text",
      placeholder: "spotlight-page-url",
      hint: "Auto-generated from the title. You can customise it.",
    },
    { key: "image", label: "Cover image", type: "image", full: true },
    {
      key: "description",
      label: "Description",
      type: "rich",
      placeholder: "Describe the activity…",
      full: true,
    },
  ],
  blank: () => ({ id: "", name: "", image: "", description: "", isDraft: false }),
};
