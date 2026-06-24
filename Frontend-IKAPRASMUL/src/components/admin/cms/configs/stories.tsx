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
      width: "86px",
      cell: (story) =>
        story.isFeatured ? (
          <Badge className="bg-gold/20 text-gold-foreground">★ Featured</Badge>
        ) : (
          <span className="text-xs text-muted-foreground">Published</span>
        ),
    },
  ],
  fields: [
    { key: "title", label: "Title", type: "text", full: true },
    {
      key: "slug",
      label: "Slug",
      type: "text",
      placeholder: "story-slug",
      hint: "Used in the URL.",
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: STORY_CATEGORIES,
    },
    { key: "author.name", label: "Author name", type: "text" },
    {
      key: "author.class",
      label: "Author class",
      type: "text",
      placeholder: "S1 Business '13",
    },
    {
      key: "excerpt",
      label: "Excerpt",
      type: "textarea",
      rows: 2,
      full: true,
    },
    { key: "body", label: "Body", type: "rich", full: true },
    { key: "coverImage", label: "Cover image", type: "image", full: true },
    { key: "publishedAt", label: "Published date", type: "date" },
    { key: "readMinutes", label: "Read minutes", type: "number" },
    {
      key: "isFeatured",
      label: "Feature in Alumni Stories",
      type: "toggle",
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
    isFeaturedHome: false,
  }),
};
