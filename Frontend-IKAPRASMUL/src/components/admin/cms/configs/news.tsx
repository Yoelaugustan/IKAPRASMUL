import type { Article } from "@/types";
import { NEWS_CATEGORIES } from "@/constants/categories";
import { Badge } from "@/components/ui/badge";
import { Thumb } from "../Thumb";
import { formatDate } from "../utils";
import type { ResourceConfig } from "../types";

export const newsConfig: ResourceConfig<Article> = {
  name: "Article",
  title: "News & Insights",
  subtitle: "News posts and articles published on the public site.",
  kicker: "News & Insights",
  searchPlaceholder: "Search articles…",
  keyField: "slug",
  getLabel: (article) => article.title,
  matches: (article, q) =>
    (article.title || "").toLowerCase().includes(q) ||
    (article.author?.name || "").toLowerCase().includes(q) ||
    (article.category || "").toLowerCase().includes(q),
  columns: [
    {
      header: "Article",
      width: "minmax(0,1fr)",
      cell: (article) => (
        <div className="flex min-w-0 items-center gap-3">
          <Thumb src={article.coverImage} alt={article.title} />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {article.title}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {article.author?.name || "Unknown"}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      width: "118px",
      cell: (article) => <Badge variant="secondary">{article.category}</Badge>,
    },
    {
      header: "Published",
      width: "96px",
      cell: (article) => (
        <span className="text-xs text-muted-foreground">
          {formatDate(article.publishedAt)}
        </span>
      ),
    },
  ],
  fields: [
    { key: "title", label: "Title", type: "text", full: true },
    {
      key: "slug",
      label: "Slug",
      type: "text",
      placeholder: "article-slug",
      hint: "Used in the URL.",
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: NEWS_CATEGORIES,
    },
    { key: "author.name", label: "Author name", type: "text" },
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
      label: "Feature in News & Insights",
      type: "toggle",
      full: true,
    },
  ],
  blank: () => ({
    slug: "",
    title: "",
    excerpt: "",
    body: "",
    category: "Campus News",
    author: { name: "", class: "" },
    coverImage: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    readMinutes: 3,
    views: 0,
    isFeatured: false,
  }),
};
