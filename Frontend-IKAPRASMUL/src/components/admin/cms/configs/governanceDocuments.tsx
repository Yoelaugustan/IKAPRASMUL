import type { GovernanceDocument } from "@/types/governance";
import type { ResourceConfig } from "../types";
import type { Dictionary } from "@/i18n/dictionaries";

type A = Dictionary["admin"];

export const governanceDocumentsConfig = (
  a: A,
): ResourceConfig<GovernanceDocument> => ({
  name: a.nameGovernanceDocument,
  title: a.titleGovernanceDocuments,
  subtitle: a.subtitleGovernanceDocuments,
  searchPlaceholder: a.searchGovernanceDocuments,
  keyField: "id",
  resourcePath: "governance-documents",
  publicPath: "/about#governance",
  getLabel: (doc) => doc.title,
  matches: (doc, q) =>
    (doc.title || "").toLowerCase().includes(q) ||
    (doc.description || "").toLowerCase().includes(q),
  columns: [
    {
      header: a.colDocument,
      width: "minmax(0,1.5fr)",
      cell: (doc) => (
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-foreground">
            {doc.title}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {doc.description}
          </div>
        </div>
      ),
    },
    {
      header: a.colSortOrder,
      width: "96px",
      cell: (doc) => (
        <span className="text-xs text-muted-foreground">{doc.sortOrder}</span>
      ),
    },
  ],
  fields: [
    { key: "title", label: a.fieldTitle, type: "text", full: true, required: true },
    {
      key: "description",
      label: a.fieldDescription,
      type: "textarea",
      full: true,
      required: true,
    },
    {
      key: "pdfUrl",
      label: a.fieldPdfFile,
      type: "pdf",
      full: true,
      required: true,
      uploadFolder: "media/governance",
    },
    {
      key: "sortOrder",
      label: a.fieldSortOrder,
      type: "number",
      hint: a.hintSortOrder,
      required: true,
    },
  ],
  blank: () => ({
    id: "",
    title: "",
    description: "",
    pdfUrl: "",
    sortOrder: 0,
  }),
});
