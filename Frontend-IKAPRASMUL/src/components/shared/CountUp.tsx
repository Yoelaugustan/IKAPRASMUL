"use client";

import { useEffect, useRef, useState } from "react";

// Counts a numeric stat up from 0 → target when it scrolls into view (once).
// Handles formatted values like "18,000+", "35+", "2,000+". Falls back to the
// raw string for non-numeric values or reduced-motion users (no animation).
const DURATION = 1500;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function parse(value: string) {
  const m = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!m) return null;
  const target = parseFloat(m[2].replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;
  return { prefix: m[1], suffix: m[3], target };
}

export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Start at the final value so SSR / no-JS / reduced-motion render correctly.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parsed = parse(value);
    const el = ref.current;
    if (!parsed || !el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const { prefix, suffix, target } = parsed;
    let raf = 0;
    let startTime = 0;
    const step = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / DURATION, 1);
      const current = Math.round(easeOutCubic(progress) * target);
      setDisplay(`${prefix}${current.toLocaleString("en-US")}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          io.disconnect();
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
