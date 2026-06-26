import type { SigSpotlight } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Thumb } from "../Thumb";
import { htmlToText } from "@/lib/format";
import type { ResourceConfig } from "../types";
import type { Dictionary } from "@/i18n/dictionaries";

type A = Dictionary["admin"];

export const sigSpotlightConfig = (a: A): ResourceConfig<SigSpotlight> => ({
  name: a.nameSigSpotlight,
  title: a.titleSigSpotlight,
  subtitle: a.subtitleSigSpotlight,
  kicker: a.titleSigSpotlight,
  searchPlaceholder: a.searchSigSpotlight,
  keyField: "id",
  resourcePath: "sig/spotlight",
  publicPath: "/sig",
  slugSource: "name",
  slugTarget: "id",
  getLabel: (item) => item.name,
  matches: (item, q) =>
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q),
  columns: [
    {
      header: a.colSpotlight,
      width: "minmax(0,1fr)",
      cell: (item) => (
        <div className="flex min-w-0 items-center gap-3">
          <Thumb src={item.image} alt={item.name} />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {item.name}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {htmlToText(item.description)}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: a.colStatus,
      width: "104px",
      cell: (item) =>
        item.isDraft ? (
          <Badge variant="outline" className="text-muted-foreground">Draft</Badge>
        ) : item.isSpotlight ? (
          <Badge className="bg-amber-100 text-amber-700">★ Spotlight</Badge>
        ) : (
          <span className="text-xs text-muted-foreground">Published</span>
        ),
    },
  ],
  fields: [
    {
      key: "name",
      label: a.fieldTitle,
      type: "text",
      placeholder: "Spotlight headline",
      full: true,
      required: true,
    },
    {
      key: "id",
      label: a.fieldPageUrl,
      type: "text",
      placeholder: "spotlight-page-url",
      hint: a.hintPageUrl,
      required: true,
    },
    { key: "image", label: a.fieldCoverImage, type: "image", full: true, required: true, uploadFolder: "media/sig" },
    {
      key: "description",
      label: a.fieldDescription,
      type: "rich",
      placeholder: "Describe the activity…",
      full: true,
      required: true,
      uploadFolder: "media/sig",
    },
    {
      key: "isSpotlight",
      label: a.toggleSigSpotlight,
      type: "toggle",
      full: true,
    },
  ],
  blank: () => ({ id: "", name: "", image: "", description: "", isSpotlight: false, isDraft: false }),
  toggleLimits: { isSpotlight: 2 },
});
