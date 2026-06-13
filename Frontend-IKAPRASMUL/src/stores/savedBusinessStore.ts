import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Client-only "saved businesses" — persisted to localStorage. This is a
// browser-local bookmark (no account yet). When the .NET backend is wired,
// swap the persistence for a per-user API call; the component API stays stable.
type SavedBusinessState = {
  saved: string[];
  toggle: (slug: string) => void;
};

export const useSavedBusinessStore = create<SavedBusinessState>()(
  persist(
    (set) => ({
      saved: [],
      toggle: (slug) =>
        set((state) => ({
          saved: state.saved.includes(slug)
            ? state.saved.filter((s) => s !== slug)
            : [...state.saved, slug],
        })),
    }),
    { name: "ikap.saved-businesses" },
  ),
);

// False on the server / first client render, true thereafter. Use to gate
// rendering of persisted state so the server-rendered HTML (always empty)
// matches the first client render (avoids hydration mismatches).
const emptySubscribe = () => () => {};
export function useHasHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
