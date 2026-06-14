"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenisInstance, scrollToTop } from "@/lib/scroll";

// Global smooth scrolling (Lenis). Disabled for reduced-motion users. Handles
// in-page anchor links (#id) with an offset for the sticky header, and ignores
// wheel inside elements marked `data-lenis-prevent` (modals/sheets).
export function SmoothScroll() {
  const pathname = usePathname();

  // Always land at the top when navigating to a new page. Lenis manages its own
  // scroll position and overrides the router's default scroll restoration, so
  // we reset it explicitly on pathname changes (not on initial mount, and not
  // on searchParams-only changes — those drive the in-page scroll-to-content).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scrollToTop(true);
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenisInstance(lenis);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const href = anchor?.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -88 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return null;
}
