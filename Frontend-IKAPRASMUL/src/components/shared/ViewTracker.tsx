"use client";

import { useEffect } from "react";

// Fires a fire-and-forget view-count increment after the article page mounts.
// Never blocks render or throws — a failed ping is silently ignored.
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    void fetch(`/api/news-view/${encodeURIComponent(slug)}`, { method: "POST" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
