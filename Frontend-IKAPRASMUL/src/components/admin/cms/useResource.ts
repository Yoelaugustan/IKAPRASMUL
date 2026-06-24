"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { ResourceConfig } from "./types";
import { getPath, setPath, slugify } from "./utils";

const LOCAL_NOTE = "Local preview — not saved to the server yet.";

// Local-only CRUD state for one resource. Seeded from live read data; create /
// edit / delete mutate component state and fire a toast. No persistence yet —
// drops in to real endpoints once the admin write API exists.
export function useResource<T>(config: ResourceConfig<T>, initial: T[]) {
  const [items, setItems] = useState<T[]>(initial);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<{ item: T; isNew: boolean } | null>(
    null,
  );
  const [confirming, setConfirming] = useState<T | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const getKey = (item: T) => String(getPath(item, config.keyField) ?? "");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => config.matches(item, q));
  }, [items, query, config]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filtered.slice(startIndex, startIndex + pageSize);
  }, [filtered, currentPage]);

  const openNew = () => setEditing({ item: config.blank(), isNew: true });
  const openEdit = (item: T) => setEditing({ item, isNew: false });
  const closeEdit = () => setEditing(null);

  const save = (draft: T) => {
    const isNew = editing?.isNew ?? false;
    setItems((prev) => {
      if (isNew) {
        let next = draft;
        if (!getKey(next)) {
          const generated = slugify(config.getLabel(next)) || `new-${Date.now()}`;
          next = setPath(next, config.keyField, generated);
        }
        return [next, ...prev];
      }
      const key = editing ? getKey(editing.item) : "";
      return prev.map((item) => (getKey(item) === key ? draft : item));
    });
    toast.success(`${config.name} ${isNew ? "created" : "updated"}`, {
      description: LOCAL_NOTE,
    });
    setEditing(null);
  };

  const askDelete = (item: T) => setConfirming(item);
  const cancelDelete = () => setConfirming(null);
  const confirmDelete = () => {
    if (!confirming) return;
    const key = getKey(confirming);
    setItems((prev) => prev.filter((item) => getKey(item) !== key));
    toast.success(`${config.name} deleted`, { description: LOCAL_NOTE });
    setConfirming(null);
  };

  // Dashboard "Quick actions" deep-link with ?new=1 to open the create form.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("new") !== "1") return;
    // Opening the create form from a URL param is a genuine post-mount effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEditing({ item: config.blank(), isNew: true });
    params.delete("new");
    const qs = params.toString();
    window.history.replaceState(
      {},
      "",
      window.location.pathname + (qs ? `?${qs}` : ""),
    );
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    filtered,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    query,
    setQuery,
    getKey,
    editing,
    openNew,
    openEdit,
    closeEdit,
    save,
    confirming,
    askDelete,
    cancelDelete,
    confirmDelete,
  };
}
