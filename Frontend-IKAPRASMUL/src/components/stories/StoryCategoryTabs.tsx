"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layouts/Container";
import { useDragScroll } from "@/hooks/useDragScroll";
import { useLang } from "@/components/shared/LanguageProvider";
import {
  BriefcaseIcon,
  GlobeThinIcon,
  NetworkIcon,
  PresentationIcon,
  PurposeIcon,
} from "@/components/icons";

// Icons + the canonical category value stay here (value is the data key used for
// filtering); the visible label + subtitle come from the dictionary.
const TABS = [
  { value: "All", Icon: NetworkIcon },
  { value: "Founder Stories", Icon: PresentationIcon },
  { value: "Executive Journey", Icon: BriefcaseIcon },
  { value: "International Alumni", Icon: GlobeThinIcon },
  { value: "Impact Stories", Icon: PurposeIcon },
];

export function StoryCategoryTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLang();

  const currentCategory = searchParams.get("category") || "All";

  const {
    ref: tabsRef,
    onMouseDown: onTabsMouseDown,
    wasDragged: tabsWasDragged,
  } = useDragScroll();

  const handleTabClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    // Category filtering only applies in the "view all" stage — selecting a
    // category always takes you there (and resets pagination).
    params.set("view", "all");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border-t border-white/10 bg-[#002d56]">
      <Container>
        <div
          ref={tabsRef}
          onMouseDown={onTabsMouseDown}
          className="flex cursor-grab overflow-x-auto no-scrollbar select-none active:cursor-grabbing"
        >
          <div className="flex flex-row mx-auto">
            {TABS.map((tab) => {
              const isActive = currentCategory === tab.value;
              const label = t.categories.story[tab.value] ?? tab.value;
              const subtitle = t.categories.storySub[tab.value] ?? "";
              return (
                <button
                  key={tab.value}
                  onClick={() => {
                    if (tabsWasDragged()) return;
                    handleTabClick(tab.value);
                  }}
                  className={cn(
                    "group flex min-w-max items-center gap-4 border-b-2 px-6 py-5 text-left transition-colors",
                    isActive
                      ? "border-[#c6b273] bg-[#00396c]"
                      : "border-transparent hover:bg-white/5",
                  )}
                >
                  <tab.Icon
                    className={cn(
                      "size-6 shrink-0 transition-colors",
                      isActive ? "text-[#c6b273]" : "text-white/70 group-hover:text-[#c6b273]"
                    )}
                  />
                  <div>
                    <p className={cn(
                      "text-[13px] font-bold leading-tight",
                      isActive ? "text-white" : "text-white/90"
                    )}>
                      {label}
                    </p>
                    <p className={cn(
                      "text-[11px] leading-tight mt-0.5",
                      isActive ? "text-white/80" : "text-white/60"
                    )}>
                      {subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
