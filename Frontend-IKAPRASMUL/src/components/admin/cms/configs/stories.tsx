import type { Story } from "@/types";
import { STORY_CATEGORIES } from "@/constants/categories";
import { Badge } from "@/components/ui/badge";
import { Thumb } from "../Thumb";
import { formatDate } from "../utils";
import type { ResourceConfig } from "../types";
import type { Dictionary } from "@/i18n/dictionaries";

type A = Dictionary["admin"];

export const storiesConfig = (a: A): ResourceConfig<Story> => ({
  name: a.nameStory,
  title: a.titleStories,
  subtitle: a.subtitleStories,
  kicker: a.kickerStory,
  searchPlaceholder: a.searchStories,
  keyField: "slug",
  resourcePath: "stories",
  publicPath: "/stories",
  slugSource: "title",
  getLabel: (story) => story.title,
  matches: (story, q) =>
    story.title.toLowerCase().includes(q) ||
    story.author.name.toLowerCase().includes(q) ||
    story.category.toLowerCase().includes(q),
  columns: [
    {
      header: a.colStory,
      width: "minmax(0,1fr)",
      cell: (story) => (
        <div className="flex min-w-0 items-center gap-3">
          <Thumb src={story.coverImage} alt={story.title} />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {story.title}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {story.author.name}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: a.colCategory,
      width: "118px",
      cell: (story) => <Badge variant="secondary">{story.category}</Badge>,
    },
    {
      header: a.colPublished,
      width: "96px",
      cell: (story) => (
        <span className="text-xs text-muted-foreground">
          {formatDate(story.publishedAt)}
        </span>
      ),
    },
    {
      header: a.colStatus,
      width: "96px",
      cell: (story) =>
        story.isDraft ? (
          <Badge variant="outline" className="text-muted-foreground">Draft</Badge>
        ) : story.isHighlight ? (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">◆ Highlight</Badge>
        ) : story.isFeatured ? (
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
      placeholder: "story-page-url",
      hint: a.hintPageUrl,
      required: true,
    },
    {
      key: "category",
      label: a.fieldCategory,
      type: "select",
      options: STORY_CATEGORIES,
      required: true,
    },
    { key: "author.name", label: a.fieldAlumniName, type: "text", required: true },
    {
      key: "author.class",
      label: a.fieldAlumniClass,
      type: "text",
      placeholder: "S1 Business '13",
      required: true,
    },
    {
      key: "excerpt",
      label: a.fieldShortSummary,
      type: "textarea",
      rows: 2,
      placeholder: "A brief preview shown on listing cards…",
      full: true,
      required: true,
    },
    { key: "body", label: a.fieldBody, type: "rich", full: true, required: true, uploadFolder: "media/stories" },
    { key: "coverImage", label: a.fieldCoverImage, type: "image", full: true, required: true, uploadFolder: "media/stories" },
    { key: "publishedAt", label: a.fieldPublishedDate, type: "date" },
    { key: "readMinutes", label: a.fieldReadMinutes, type: "number" },
    {
      key: "isHighlight",
      label: a.toggleStoriesHighlight,
      type: "toggle",
      full: true,
      linkedToggleOff: "isFeatured",
    },
    {
      key: "isFeatured",
      label: a.toggleStoriesFeatured,
      type: "toggle",
      full: true,
      linkedToggleOff: "isHighlight",
    },
    {
      key: "isFeaturedHome",
      label: a.toggleAlumniOfMonth,
      type: "toggle",
      full: true,
    },
  ],
  blank: () => ({
    slug: "",
    title: "",
    excerpt: "",
    body: "",
    category: "Founder Stories",
    author: { name: "", class: "" },
    coverImage: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    readMinutes: 3,
    isFeatured: false,
    isHighlight: false,
    isFeaturedHome: false,
    isDraft: false,
  }),
  toggleLimits: { isFeatured: 4, isHighlight: 3, isFeaturedHome: 1 },
});
