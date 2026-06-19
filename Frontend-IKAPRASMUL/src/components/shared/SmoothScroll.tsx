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
  const firstRender = useRef(true);
  const isPopNavigation = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Detect browser back/forward button before the pathname updates.
  useEffect(() => {
    const onPopState = () => {
      isPopNavigation.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Track the latest scroll position for the current page. On cleanup (i.e.
  // when navigating away) persist it to sessionStorage so back-navigation can
  // restore it. Using cleanup instead of a debounce avoids any race with the
  // forward-navigation scrollToTop that fires right after.
  useEffect(() => {
    const key = `scroll:${pathname}`;
    let lastY = window.scrollY;
    const onScroll = () => {
      lastY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (lastY > 0) sessionStorage.setItem(key, String(lastY));
      else sessionStorage.removeItem(key);
    };
  }, [pathname]);

  // On forward navigation scroll to the top. On back navigation re-sync Lenis
  // to the saved position (the browser restores window.scrollY but Lenis's
  // internal state doesn't know, so its RAF loop would override it).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (isPopNavigation.current) {
      isPopNavigation.current = false;
      const saved = sessionStorage.getItem(`scroll:${pathname}`);
      if (saved) {
        const y = Number(saved);
        // Two rAF frames: first lets Next.js commit the new DOM, second lets
        // the browser apply its own scroll restoration before we override it.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (lenisRef.current) lenisRef.current.scrollTo(y, { immediate: true });
            else window.scrollTo(0, y);
          }),
        );
      }
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
    lenisRef.current = lenis;

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
      lenisRef.current = null;
    };
  }, []);

  return null;
}
