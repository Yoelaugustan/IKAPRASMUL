import type { Story } from "@/types";
import { STORY_CATEGORIES } from "@/constants/categories";
import { Badge } from "@/components/ui/badge";
import { Thumb } from "../Thumb";
import { formatDate } from "../utils";
import type { ResourceConfig } from "../types";

export const storiesConfig: ResourceConfig<Story> = {
  name: "Story",
  title: "Alumni Stories",
  subtitle: "Long-form alumni features published on the public site.",
  kicker: "Alumni Story",
  searchPlaceholder: "Search stories…",
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
      header: "Story",
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
      header: "Category",
      width: "118px",
      cell: (story) => <Badge variant="secondary">{story.category}</Badge>,
    },
    {
      header: "Published",
      width: "96px",
      cell: (story) => (
        <span className="text-xs text-muted-foreground">
          {formatDate(story.publishedAt)}
        </span>
      ),
    },
    {
      header: "Status",
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
    { key: "title", label: "Title", type: "text", full: true, required: true },
    {
      key: "slug",
      label: "Page URL",
      type: "text",
      placeholder: "story-page-url",
      hint: "Auto-generated from the title. You can customise it.",
      required: true,
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: STORY_CATEGORIES,
      required: true,
    },
    { key: "author.name", label: "Author name", type: "text", required: true },
    {
      key: "author.class",
      label: "Author class",
      type: "text",
      placeholder: "S1 Business '13",
      required: true,
    },
    {
      key: "excerpt",
      label: "Short summary",
      type: "textarea",
      rows: 2,
      placeholder: "A brief preview shown on listing cards…",
      full: true,
      required: true,
    },
    { key: "body", label: "Body", type: "rich", full: true, required: true, uploadFolder: "media/stories" },
    { key: "coverImage", label: "Cover image", type: "image", full: true, required: true, uploadFolder: "media/stories" },
    { key: "publishedAt", label: "Published date", type: "date" },
    { key: "readMinutes", label: "Read minutes", type: "number" },
    {
      key: "isHighlight",
      label: "Pin to Highlights (max 3)",
      type: "toggle",
      linkedToggleOff: "isFeatured",
    },
    {
      key: "isFeatured",
      label: "Feature in Alumni Stories (max 4)",
      type: "toggle",
      linkedToggleOff: "isHighlight",
    },
    {
      key: "isFeaturedHome",
      label: "Alumni of the Month (home page)",
      type: "toggle",
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
  toggleLimits: { isFeatured: 4, isHighlight: 3 },
};
