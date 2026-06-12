"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, Presentation, Briefcase, Globe, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layouts/Container";
import { useDragScroll } from "@/hooks/useDragScroll";

const TABS = [
  { label: "All Stories", value: "All", Icon: LayoutGrid, subtitle: "Explore all" },
  { label: "Founder Stories", value: "Founder Stories", Icon: Presentation, subtitle: "Building from the ground up" },
  { label: "Executive Journey", value: "Executive Journey", Icon: Briefcase, subtitle: "Leading with impact" },
  { label: "International Alumni", value: "International Alumni", Icon: Globe, subtitle: "Making an impact globally" },
  { label: "Impact Stories", value: "Impact Stories", Icon: Heart, subtitle: "Creating positive change" },
];

export function StoryCategoryTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
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
              return (
                <button
                  key={tab.label}
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
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className={cn(
                      "text-[13px] font-bold leading-tight",
                      isActive ? "text-white" : "text-white/90"
                    )}>
                      {tab.label}
                    </p>
                    <p className={cn(
                      "text-[11px] leading-tight mt-0.5",
                      isActive ? "text-white/80" : "text-white/60"
                    )}>
                      {tab.subtitle}
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
