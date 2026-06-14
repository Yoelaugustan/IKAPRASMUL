// Small formatting helpers shared across content cards.

export function formatDate(
  iso: string,
  opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
) {
  return new Intl.DateTimeFormat("en-GB", opts).format(new Date(iso));
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatCompactNumber(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(n);
}

// US-style "May 20, 2025" — used on the News & Insight page.
export function formatDateUS(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}
