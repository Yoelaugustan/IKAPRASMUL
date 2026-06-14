import type Lenis from "lenis";

// Shared scroll helpers. The Lenis instance is registered by <SmoothScroll/>;
// when present we route through it so programmatic scrolls match the smooth
// wheel behaviour. Falls back to native scrolling (respecting reduced-motion).
let lenis: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenis = instance;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Scroll an element to just below the sticky header.
export function scrollToElement(el: HTMLElement | null, offset = -88) {
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function scrollToTop(immediate = false) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo({
    top: 0,
    behavior: immediate || prefersReducedMotion() ? "auto" : "smooth",
  });
}
