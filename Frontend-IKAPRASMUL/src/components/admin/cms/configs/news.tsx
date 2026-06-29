import type { Article } from "@/types";
import { NEWS_CATEGORIES } from "@/constants/categories";
import { Badge } from "@/components/ui/badge";
import { Thumb } from "../Thumb";
import { formatDate } from "../utils";
import type { ResourceConfig } from "../types";
import type { Dictionary } from "@/i18n/dictionaries";

type A = Dictionary["admin"];

export const newsConfig = (a: A): ResourceConfig<Article> => ({
  name: a.nameArticle,
  namePlural: a.nameArticle,
  createLabel: a.createNews,
  formTabs: [
    {
      label: a.tabArticle,
      field: "category",
      value: "Campus News",
      isActive: (form) => (form as Article).category !== "Newsletter",
      formName: a.tabArticle,
    },
    {
      label: a.tabNewsletter,
      field: "category",
      value: "Newsletter",
      formName: a.tabNewsletter,
    },
  ],
  title: a.titleNews,
  subtitle: a.subtitleNews,
  kicker: a.kickerNews,
  searchPlaceholder: a.searchNews,
  keyField: "slug",
  resourcePath: "news",
  publicPath: "/news",
  slugSource: "title",
  getLabel: (article) => article.title,
  matches: (article, q) =>
    (article.title || "").toLowerCase().includes(q) ||
    (article.author?.name || "").toLowerCase().includes(q) ||
    (article.category || "").toLowerCase().includes(q),
  columns: [
    {
      header: a.colArticle,
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
      header: a.colCategory,
      width: "118px",
      cell: (article) => <Badge variant="secondary">{article.category}</Badge>,
    },
    {
      header: a.colPublished,
      width: "96px",
      cell: (article) => (
        <span className="text-xs text-muted-foreground">
          {formatDate(article.publishedAt)}
        </span>
      ),
    },
    {
      header: a.colStatus,
      width: "96px",
      cell: (article) =>
        article.isDraft ? (
          <Badge variant="outline" className="text-muted-foreground">Draft</Badge>
        ) : article.isFeatured ? (
          <Badge className="bg-gold/20 text-gold-foreground">★ Featured</Badge>
        ) : article.isTopStory ? (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">◆ Top Story</Badge>
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
      placeholder: "article-page-url",
      hint: a.hintPageUrl,
      required: true,
    },
    {
      key: "category",
      label: a.fieldCategory,
      type: "select",
      options: NEWS_CATEGORIES.filter((c) => c !== "Newsletter"),
      hidden: (form) => (form as Article).category === "Newsletter",
      required: true,
    },
    { key: "author.name", label: a.fieldAuthorName, type: "text", required: true },
    {
      key: "excerpt",
      label: a.fieldShortSummary,
      type: "textarea",
      rows: 2,
      placeholder: "A brief preview shown on listing cards…",
      full: true,
      required: true,
    },
    {
      key: "body",
      label: a.fieldBody,
      type: "rich",
      full: true,
      hidden: (form) => (form as Article).category === "Newsletter",
      required: true,
      uploadFolder: "media/news",
    },
    {
      key: "pdfUrl",
      label: a.fieldNewsletterPdf,
      type: "pdf",
      full: true,
      hidden: (form) => (form as Article).category !== "Newsletter",
      required: true,
      uploadFolder: "media/news/newsletters",
    },
    {
      key: "coverImage",
      label: a.fieldCoverImage,
      type: "image",
      full: true,
      required: true,
      uploadFolder: "media/news",
    },
    { key: "publishedAt", label: a.fieldPublishedDate, type: "date" },
    {
      key: "readMinutes",
      label: a.fieldReadMinutes,
      type: "number",
      hidden: (form) => (form as Article).category === "Newsletter",
    },
    {
      key: "isFeatured",
      label: a.toggleNewsFeatured,
      type: "toggle",
      full: true,
    },
    {
      key: "isTopStory",
      label: a.toggleNewsTopStory,
      type: "toggle",
      full: true,
    },
    {
      key: "isFeaturedHome",
      label: a.toggleNewsHome,
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
    isTopStory: false,
    isFeaturedHome: false,
    isDraft: false,
  }),
  toggleLimits: { isFeatured: 1, isTopStory: 3, isFeaturedHome: 1 },
});
