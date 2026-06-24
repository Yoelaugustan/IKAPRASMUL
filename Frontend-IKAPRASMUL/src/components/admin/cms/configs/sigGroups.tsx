import type { SigGroup } from "@/types";
import { Thumb } from "../Thumb";
import type { ResourceConfig } from "../types";

export const sigGroupsConfig: ResourceConfig<SigGroup> = {
  name: "SIG Group",
  title: "SIG Groups",
  subtitle: "Shared Interest Groups shown on the public SIG page.",
  kicker: "SIG Group",
  searchPlaceholder: "Search groups…",
  keyField: "id",
  getLabel: (group) => group.name,
  matches: (group, q) =>
    group.name.toLowerCase().includes(q) || group.id.toLowerCase().includes(q),
  columns: [
    {
      header: "Group",
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
    {
      header: "ID / Slug",
      width: "150px",
      cell: (group) => (
        <span className="block truncate font-mono text-xs text-muted-foreground">
          {group.id}
        </span>
      ),
    },
  ],
  fields: [
    {
      key: "name",
      label: "Group name",
      type: "text",
      placeholder: "e.g. Cycling Club",
      full: true,
    },
    { key: "image", label: "Logo / image", type: "image", full: true },
  ],
  blank: () => ({ id: "", name: "", image: "", icon: "" }),
};
