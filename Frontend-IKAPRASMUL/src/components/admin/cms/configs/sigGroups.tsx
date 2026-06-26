import type { SigGroup } from "@/types";
import { Thumb } from "../Thumb";
import type { ResourceConfig } from "../types";
import type { Dictionary } from "@/i18n/dictionaries";

type A = Dictionary["admin"];

export const sigGroupsConfig = (a: A): ResourceConfig<SigGroup> => ({
  name: a.nameSigGroup,
  title: a.titleSigGroups,
  subtitle: a.subtitleSigGroups,
  searchPlaceholder: a.searchSigGroups,
  keyField: "id",
  resourcePath: "sig/groups",
  publicPath: "/sig",
  getLabel: (group) => group.name,
  matches: (group, q) =>
    group.name.toLowerCase().includes(q) || group.id.toLowerCase().includes(q),
  columns: [
    {
      header: a.colGroup,
      width: "minmax(0,1fr)",
      cell: (group) => (
        <div className="flex min-w-0 items-center gap-3">
          <Thumb src={group.image} alt={group.name} rounded />
          <span className="truncate text-sm font-semibold text-foreground">
            {group.name}
          </span>
        </div>
      ),
    },
  ],
  fields: [
    {
      key: "name",
      label: a.fieldGroupName,
      type: "text",
      placeholder: "e.g. Cycling Club",
      full: true,
      required: true,
    },
    { key: "image", label: a.fieldLogoImage, type: "image", full: true, required: true, uploadFolder: "media/sig" },
  ],
  blank: () => ({ id: "", name: "", image: "", icon: "" }),
});
