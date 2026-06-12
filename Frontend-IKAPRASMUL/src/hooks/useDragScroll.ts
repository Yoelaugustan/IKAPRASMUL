import { useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

// Click-and-drag horizontal scrolling for a scroll container (mouse users).
// Attach `ref` + `onMouseDown` to the scrollable element; call `wasDragged()`
// inside child click handlers to ignore the click that ends a drag.
// Touch / trackpad / wheel scrolling continue to work natively.
export function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const onMouseDown = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    state.current = {
      down: true,
      startX: e.pageX,
      startScroll: el.scrollLeft,
      moved: false,
    };
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      const s = state.current;
      if (!el || !s.down) return;
      const dx = e.pageX - s.startX;
      if (Math.abs(dx) > 4) s.moved = true;
      el.scrollLeft = s.startScroll - dx;
    };
    const onUp = () => {
      state.current.down = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return { ref, onMouseDown, wasDragged: () => state.current.moved };
}
