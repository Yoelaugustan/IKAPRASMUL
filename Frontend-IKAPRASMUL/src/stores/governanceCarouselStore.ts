import { create } from "zustand";

// Scroll-boundary state for the Governance Documents carousel, updated by a
// scroll listener on the track and read by the prev/next arrow buttons to
// know when to disable themselves.
type GovernanceCarouselState = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  setScrollState: (canScrollPrev: boolean, canScrollNext: boolean) => void;
};

export const useGovernanceCarouselStore = create<GovernanceCarouselState>((set) => ({
  canScrollPrev: false,
  canScrollNext: true,
  setScrollState: (canScrollPrev, canScrollNext) => set({ canScrollPrev, canScrollNext }),
}));
