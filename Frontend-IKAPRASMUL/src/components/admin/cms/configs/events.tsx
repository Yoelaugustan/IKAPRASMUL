import type { AlumniEvent } from "@/types";
import { EVENT_CATEGORIES } from "@/constants/categories";
import { Badge } from "@/components/ui/badge";
import { Thumb } from "../Thumb";
import { formatDate } from "../utils";
import type { ResourceConfig } from "../types";

export const eventsConfig: ResourceConfig<AlumniEvent> = {
  name: "Event",
  title: "Events",
  subtitle:
    "Events shown on the public Events page. The Featured Event headlines the page.",
  kicker: "Events",
  searchPlaceholder: "Search events…",
  keyField: "slug",
  resourcePath: "events",
  publicPath: "/events",
  slugSource: "title",
  getLabel: (event) => event.title,
  matches: (event, q) =>
    (event.title || "").toLowerCase().includes(q) ||
    (event.location || "").toLowerCase().includes(q) ||
    (event.category || "").toLowerCase().includes(q),
  columns: [
    {
      header: "Event",
      width: "minmax(0,1.5fr)",
      cell: (event) => (
        <div className="flex min-w-0 items-center gap-3">
          <Thumb src={event.coverImage} alt={event.title} />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {event.title}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {event.location}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      width: "112px",
      cell: (event) =>
        event.category ? (
          <Badge variant="secondary">{event.category}</Badge>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        ),
    },
    {
      header: "Date",
      width: "104px",
      cell: (event) => (
        <span className="text-xs text-muted-foreground">
          {event.date ? formatDate(event.date) : "—"}
        </span>
      ),
    },
    {
      header: "Status",
      width: "104px",
      cell: (event) =>
        event.isDraft ? (
          <Badge variant="outline" className="text-muted-foreground">Draft</Badge>
        ) : event.isFeatured ? (
          <Badge className="bg-gold/20 text-gold-foreground">★ Featured</Badge>
        ) : (
          <span className="text-xs text-muted-foreground">Published</span>
        ),
    },
  ],
  fields: [
    { key: "title", label: "Title", type: "text", full: true, required: true },
    {
      key: "slug",
      label: "Page URL",
      type: "text",
      placeholder: "event-page-url",
      hint: "Auto-generated from the title. You can customise it.",
      required: true,
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: EVENT_CATEGORIES,
      required: true,
    },
    { key: "date", label: "Event date", type: "date", required: true },
    {
      key: "location",
      label: "Location",
      type: "text",
      placeholder: "e.g. BSD Campus, Jakarta",
      required: true,
    },
    {
      key: "description",
      label: "Description",
      type: "rich",
      placeholder: "What the event is about…",
      full: true,
      required: true,
      uploadFolder: "media/events",
    },
    {
      key: "coverImage",
      label: "Cover image",
      type: "image",
      full: true,
      required: true,
      uploadFolder: "media/events",
    },
    {
      key: "registerUrl",
      label: "Registration link",
      type: "text",
      placeholder: "https://…",
      full: true,
    },
    {
      key: "isFeatured",
      label: "Feature on the events page (max 1)",
      type: "toggle",
      full: true,
    },
    {
      key: "isFeaturedHome",
      label: "Show on the home page as Upcoming Event (max 1)",
      type: "toggle",
      full: true,
    },
  ],
  blank: () => ({
    slug: "",
    title: "",
    date: new Date().toISOString().slice(0, 10),
    location: "",
    category: "Networking",
    coverImage: "",
    description: "",
    registerUrl: "",
    isFeatured: false,
    isFeaturedHome: false,
    isDraft: false,
  }),
  toggleLimits: { isFeatured: 1, isFeaturedHome: 1 },
};
