"use client";

import { Children, isValidElement, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Scroll-into-view reveal: a measured fade + rise with a faint blur that settles
// on a soft ease-out-expo curve. Plays once. Respects reduced-motion (content
// appears immediately). When `stagger` is set, direct children cascade in one
// after another — an editorial, hand-sequenced entrance rather than one block.
// Keep usage section-level, not on every node.

const HIDDEN = "translate-y-4 opacity-0 blur-[3px]";
const SHOWN = "translate-y-0 opacity-100 blur-0";
const MOTION =
  "transition-[opacity,transform,filter] duration-700 ease-expo will-change-transform " +
  "motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!blur-0 motion-reduce:!transition-none";

export function Reveal({
  children,
  className,
  delay = 0,
  stagger = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** ms between each direct child's entrance. 0 = reveal the block as one. */
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Staggered mode: the wrapper keeps the layout (e.g. a grid), each child gets
  // its own delay. `[&>*]:h-full` lets flex-col cards fill an equal-height cell.
  if (stagger > 0) {
    return (
      <div ref={ref} className={className}>
        {Children.map(children, (child, i) =>
          isValidElement(child) ? (
            <div
              className={cn("h-full [&>*]:h-full", MOTION, shown ? SHOWN : HIDDEN)}
              style={{ transitionDelay: `${delay + i * stagger}ms` }}
            >
              {child}
            </div>
          ) : (
            child
          ),
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(MOTION, shown ? SHOWN : HIDDEN, className)}
    >
      {children}
    </div>
  );
}
