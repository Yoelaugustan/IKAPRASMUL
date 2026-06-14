"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToTop } from "@/lib/scroll";

// Floating "back to top" button. Fades in once the user has scrolled past the
// first viewport and routes through the shared (Lenis-aware) scroll helper.
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial check off the effect's synchronous path.
    const id = requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => scrollToTop()}
      aria-label="Scroll back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full bg-[#00396c] text-white shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:bg-[#0a192f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6b273] focus-visible:ring-offset-2",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
