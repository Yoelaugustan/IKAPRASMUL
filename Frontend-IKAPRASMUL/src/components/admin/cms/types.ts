import type { ReactNode } from "react";

// Field-driven CMS toolkit. Mirrors the "Admin Dashboard.dc.html" design's
// generic edit modal: a single set of field types renders every entity form.
export type FieldType =
  | "text"
  | "textarea"
  | "rich"
  | "image"
  | "select"
  | "date"
  | "number"
  | "toggle";

export interface FieldConfig {
  /** Dot-path into the entity, e.g. "name" or "founder.name". */
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  /** Options for `select` fields. */
  options?: readonly string[];
  rows?: number;
  hint?: string;
  /** Span both columns of the 2-col form grid. */
  full?: boolean;
}

export interface ColumnConfig<T> {
  header: string;
  /** CSS grid track for this column, e.g. "minmax(0,1fr)" or "120px". */
  width: string;
  align?: "right";
  cell: (row: T) => ReactNode;
}

export interface ResourceConfig<T> {
  /** Singular label, e.g. "SIG Group". */
  name: string;
  /** Page heading, e.g. "SIG Groups". */
  title: string;
  subtitle: string;
  /** Small uppercase kicker shown above the edit-modal title. */
  kicker?: string;
  searchPlaceholder?: string;
  /** Dot-path to the entity's unique key (used for list keys + de-dupe). */
  keyField: string;
  /** Human label for the delete-confirm + generated keys. */
  getLabel: (item: T) => string;
  /** `q` is already lower-cased. */
  matches: (item: T, q: string) => boolean;
  columns: ColumnConfig<T>[];
  fields: FieldConfig[];
  /** Fresh empty draft for the "New" action. */
  blank: () => T;
}
