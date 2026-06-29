"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ResourceConfig } from "./types";
import { getPath, setPath, slugify } from "./utils";
import { deleteResource, saveResource } from "@/lib/adminApi";

// CRUD state for one resource. Seeded from the admin read list; create / edit /
// delete call the admin BFF (which persists to the database) and then reconcile
// local state + revalidate the route.
export type SortOption = "newest" | "oldest" | "az" | "za";

export function useResource<T>(config: ResourceConfig<T>, initial: T[]) {
  const router = useRouter();
  const [items, setItems] = useState<T[]>(initial);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [editing, setEditing] = useState<{ item: T; isNew: boolean } | null>(
    null,
  );
  const [confirming, setConfirming] = useState<T | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Reset to first page when search or sort changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [query, sortBy]);

  // Debounced backend re-fetch: keeps local state for instant feedback while
  // syncing to the server 400 ms after the last keystroke / sort change.
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      try {
        const qs = new URLSearchParams({ sort: sortBy });
        if (query.trim()) qs.set("search", query.trim());
        const res = await fetch(`/api/admin/${config.resourcePath}?${qs}`);
        if (!res.ok) return;
        const data = await res.json() as unknown;
        const fetched: T[] = Array.isArray(data)
          ? (data as T[])
          : ((data as { items?: T[] }).items ?? []);
        setItems(fetched);
        setCurrentPage(1);
      } catch { /* silently keep stale data */ }
    }, 400);
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
    // config.resourcePath is a module-level constant — stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, sortBy]);

  const getKey = (item: T) => String(getPath(item, config.keyField) ?? "");

  // New items are prepended in `save`, so the array is naturally newest-first.
  const sorted = useMemo(() => {
    const copy = [...items];
    switch (sortBy) {
      case "oldest": return copy.reverse();
      case "az":     return copy.sort((a, b) => config.getLabel(a).localeCompare(config.getLabel(b)));
      case "za":     return copy.sort((a, b) => config.getLabel(b).localeCompare(config.getLabel(a)));
      default:       return copy; // newest = insertion order
    }
  }, [items, sortBy, config]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((item) => config.matches(item, q));
  }, [sorted, query, config]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filtered.slice(startIndex, startIndex + pageSize);
  }, [filtered, currentPage]);

  const openNew = () => setEditing({ item: config.blank(), isNew: true });
  const openEdit = (item: T) => setEditing({ item, isNew: false });
  const closeEdit = () => setEditing(null);

  const save = async (draft: T) => {
    const editingSnapshot = editing;
    const isNew = editingSnapshot?.isNew ?? false;

    // Ensure a key exists for new records (mirrors the server's slug fallback).
    let payloadItem = draft;
    if (isNew && !getKey(payloadItem)) {
      const generated = slugify(config.getLabel(payloadItem)) || `new-${Date.now()}`;
      payloadItem = setPath(payloadItem, config.keyField, generated);
    }

    // On edit, tell the API the original key so it can rename rather than insert.
    const payload: Record<string, unknown> = { ...(payloadItem as object) };
    if (!isNew && editingSnapshot) {
      const cap = config.keyField.charAt(0).toUpperCase() + config.keyField.slice(1);
      payload[`original${cap}`] = getKey(editingSnapshot.item);
    }

    try {
      const saved = await saveResource<T>(config.resourcePath, payload);
      const savedKey = getKey(saved);
      setItems((prev) => {
        if (!isNew && editingSnapshot) {
          const oldKey = getKey(editingSnapshot.item);
          return prev.map((item) => (getKey(item) === oldKey ? saved : item));
        }
        // New record — replace if the key already exists, else prepend.
        return prev.some((item) => getKey(item) === savedKey)
          ? prev.map((item) => (getKey(item) === savedKey ? saved : item))
          : [saved, ...prev];
      });
      const savedRec = saved as Record<string, unknown>;
      const hasDraftField = "isDraft" in savedRec;
      const isDraft = hasDraftField && Boolean(savedRec.isDraft);
      const action = !hasDraftField
        ? isNew ? "created" : "updated"
        : isDraft ? "saved as draft"
        : isNew ? "published" : "updated";
      toast.success(`${config.name} ${action}`);
      setEditing(null);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : `Couldn't save ${config.name}.`,
      );
    }
  };

  const askDelete = (item: T) => setConfirming(item);
  const cancelDelete = () => setConfirming(null);
  const confirmDelete = async () => {
    if (!confirming) return;
    const key = getKey(confirming);
    try {
      await deleteResource(config.resourcePath, key);
      setItems((prev) => prev.filter((item) => getKey(item) !== key));
      toast.success(`${config.name} deleted`);
      setConfirming(null);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : `Couldn't delete ${config.name}.`,
      );
    }
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
    items,
    filtered,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    query,
    setQuery,
    sortBy,
    setSortBy,
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
