import type { AlumniEvent } from "@/types";
import { EVENT_CATEGORIES } from "@/constants/categories";
import { Badge } from "@/components/ui/badge";
import { Thumb } from "../Thumb";
import { formatDate } from "../utils";
import type { ResourceConfig } from "../types";
import type { Dictionary } from "@/i18n/dictionaries";

type A = Dictionary["admin"];

export const eventsConfig = (a: A): ResourceConfig<AlumniEvent> => ({
  name: a.nameEvent,
  title: a.titleEvents,
  subtitle: a.subtitleEvents,
  searchPlaceholder: a.searchEvents,
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
      header: a.colEvent,
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
      header: a.colCategory,
      width: "112px",
      cell: (event) =>
        event.category ? (
          <Badge variant="secondary">{event.category}</Badge>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        ),
    },
    {
      header: a.colDate,
      width: "104px",
      cell: (event) => (
        <span className="text-xs text-muted-foreground">
          {event.date ? formatDate(event.date) : "—"}
        </span>
      ),
    },
    {
      header: a.colStatus,
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
    { key: "title", label: a.fieldTitle, type: "text", full: true, required: true },
    {
      key: "slug",
      label: a.fieldPageUrl,
      type: "text",
      placeholder: "event-page-url",
      hint: a.hintPageUrl,
      required: true,
    },
    {
      key: "category",
      label: a.fieldCategory,
      type: "select",
      options: EVENT_CATEGORIES,
      required: true,
    },
    { key: "date", label: a.fieldEventDate, type: "date", required: true },
    {
      key: "location",
      label: a.fieldLocation,
      type: "text",
      placeholder: "e.g. BSD Campus, Jakarta",
      required: true,
    },
    {
      key: "description",
      label: a.fieldDescription,
      type: "rich",
      placeholder: "What the event is about…",
      full: true,
      required: true,
      uploadFolder: "media/events",
    },
    {
      key: "coverImage",
      label: a.fieldCoverImage,
      type: "image",
      full: true,
      required: true,
      uploadFolder: "media/events",
    },
    {
      key: "registerUrl",
      label: a.fieldRegistrationLink,
      type: "text",
      placeholder: "https://…",
      full: true,
    },
    {
      key: "isFeatured",
      label: a.toggleEventFeatured,
      type: "toggle",
      full: true,
    },
    {
      key: "isFeaturedHome",
      label: a.toggleEventHome,
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
});
