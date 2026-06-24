// Small helpers shared across the CMS toolkit.

/** Read a nested value by dot-path, e.g. getPath(b, "founder.name"). */
export function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/** Immutably set a nested value by dot-path, returning a deep clone. */
export function setPath<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split(".");
  const next = structuredClone(obj) as Record<string, unknown>;
  let cursor = next;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (cursor[key] == null || typeof cursor[key] !== "object") {
      cursor[key] = {};
    }
    cursor = cursor[key] as Record<string, unknown>;
  }
  cursor[keys[keys.length - 1]] = value;
  return next as T;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
