"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Mail, FileText } from "lucide-react";
import { useDragScroll } from "@/hooks/useDragScroll";
import { EmptyState } from "@/components/shared/EmptyState";
import { useLang } from "@/components/shared/LanguageProvider";
import { useContactModalStore } from "@/stores/contactModalStore";
import { useGovernanceCarouselStore } from "@/stores/governanceCarouselStore";
import { useGovernanceDocuments } from "./hooks/useGovernanceDocuments";

const CARD_WIDTH = 280;
const CARD_GAP = 20;

function CardSkeleton() {
  return (
    <div className="h-[286px] w-[280px] shrink-0 animate-pulse rounded-2xl border border-slate-100 bg-slate-50" />
  );
}

export function GovernanceDocumentsCarousel() {
  const { t } = useLang();
  const { data, isLoading, isError } = useGovernanceDocuments();
  const openContactModal = useContactModalStore((s) => s.open);
  const { ref: trackRef, onMouseDown, wasDragged } = useDragScroll();
  const { canScrollPrev, canScrollNext, setScrollState } = useGovernanceCarouselStore();

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setScrollState(el.scrollLeft > 4, el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * (CARD_WIDTH + CARD_GAP) * 2, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex gap-5 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <EmptyState
        title={t.about.noGovDocsTitle}
        description={t.about.noGovDocsDesc}
        className="py-10"
      />
    );
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onScroll={updateScrollState}
        className="no-scrollbar -my-6 flex gap-5 overflow-x-auto px-1 py-6 scroll-smooth"
      >
        {data.map((doc) => (
          <div
            key={doc.id}
            className="flex w-[280px] shrink-0 flex-col items-center rounded-2xl border border-slate-100 bg-white px-6 py-8 text-center shadow-sm transition-[transform,box-shadow] duration-300 ease-expo hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-18px_rgba(0,57,108,0.30)]"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-slate-100 text-red-500">
              <FileText className="size-6" strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 min-h-[42px] text-[15px] font-bold leading-snug text-primary">
              {doc.title}
            </h3>
            <p className="min-h-[46px] text-sm leading-relaxed text-muted-foreground">
              {doc.description}
            </p>
            <button
              type="button"
              onClick={() => openContactModal("Governance Document")}
              className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-lg border border-gold px-4 py-2 text-xs font-bold uppercase tracking-wide text-gold-dark transition-colors hover:bg-gold/10"
            >
              <Mail className="size-3.5" strokeWidth={2} />
              {t.about.govDocsDownload}
            </button>
          </div>
        ))}
      </div>

      {data.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => !wasDragged() && scrollBy(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous"
            className="absolute -left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white text-primary shadow-md ring-1 ring-slate-100 transition-opacity disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => !wasDragged() && scrollBy(1)}
            disabled={!canScrollNext}
            aria-label="Next"
            className="absolute -right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white text-primary shadow-md ring-1 ring-slate-100 transition-opacity disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}
    </div>
  );
}
