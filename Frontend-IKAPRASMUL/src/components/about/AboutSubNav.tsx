"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { scrollToElement } from "@/lib/scroll";
import { useDragScroll } from "@/hooks/useDragScroll";
import { useLang } from "@/components/shared/LanguageProvider";
import { Container } from "@/components/layouts/Container";

export const ABOUT_SECTION_IDS = [
  "vision-mission",
  "our-journey",
  "executive-board",
  "dewan-pelindung",
  "dewan-penasihat",
  "dewan-pakar",
  "dewan-penyantun",
  "organization-structure",
  "governance",
  "contact",
] as const;

type SectionId = (typeof ABOUT_SECTION_IDS)[number];

const LABEL_KEYS: Record<SectionId, string> = {
  "vision-mission": "visionMission",
  "our-journey": "ourJourney",
  "executive-board": "executiveBoard",
  "dewan-pelindung": "dewanPelindung",
  "dewan-penasihat": "dewanPenasihat",
  "dewan-pakar": "dewanPakar",
  "dewan-penyantun": "dewanPenyantun",
  "organization-structure": "orgStructure",
  governance: "governance",
  contact: "contact",
};

export function AboutSubNav() {
  const { t } = useLang();
  const [active, setActive] = useState<SectionId>("vision-mission");
  const { ref: scrollRef, onMouseDown, wasDragged } = useDragScroll();
  const tabRefs = useRef<Partial<Record<SectionId, HTMLButtonElement>>>({});

  useEffect(() => {
    const sections = ABOUT_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const onScroll = () => {
      const line = 150;
      let current: SectionId = ABOUT_SECTION_IDS[0];
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) {
          current = el.id as SectionId;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  const handleClick = (id: SectionId) => {
    if (wasDragged()) return;
    scrollToElement(document.getElementById(id), 10);
  };

  return (
    <div className="sticky top-[88px] z-10 -mt-6 sm:-mt-8">
      <Container>
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          className="no-scrollbar flex items-center justify-center-safe overflow-x-auto rounded-2xl bg-white px-2 shadow-[0_8px_30px_-8px_rgba(19,41,75,0.25)] sm:px-4"
        >
          {ABOUT_SECTION_IDS.map((id, i) => {
            const isActive = active === id;
            return (
              <div key={id} className="flex shrink-0 items-center">
                {i > 0 && <span aria-hidden className="h-4 w-px shrink-0 bg-slate-200" />}
                <button
                  type="button"
                  ref={(el) => {
                    if (el) tabRefs.current[id] = el;
                  }}
                  onClick={() => handleClick(id)}
                  className={cn(
                    "group relative whitespace-nowrap px-4 py-5 text-sm font-semibold transition-colors sm:px-5",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {t.about.subNav[LABEL_KEYS[id] as keyof typeof t.about.subNav]}
                  <span
                    className={cn(
                      "absolute bottom-3 left-4 h-0.5 rounded-full bg-gold transition-[width] duration-300 ease-expo sm:left-5",
                      isActive
                        ? "w-[calc(100%_-_2rem)] sm:w-[calc(100%_-_2.5rem)]"
                        : "w-0 group-hover:w-[calc(100%_-_2rem)] sm:group-hover:w-[calc(100%_-_2.5rem)]",
                    )}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
