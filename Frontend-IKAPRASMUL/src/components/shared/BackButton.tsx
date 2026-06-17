"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "./LanguageProvider";
import { useNavSource } from "./NavSourceProvider";

// Goes back to the previous page (preserving its scroll position). Falls back to
// a route when there's no history (e.g. opened directly). With `dynamicLabel`,
// the label names where it was opened from (e.g. "Back to Home").
export function BackButton({
  fallback = "/",
  label,
  dynamicLabel = false,
  className,
}: {
  fallback?: string;
  label?: string;
  dynamicLabel?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const from = useNavSource();
  const { t } = useLang();

  // Friendly (translated) names for the top-level pages a detail opens from.
  const pathLabels: Record<string, string> = {
    "/": t.nav.home,
    "/about": t.nav.about,
    "/sig": t.nav.sig,
    "/stories": t.nav.stories,
    "/business": t.nav.business,
    "/news": t.nav.news,
  };

  let resolvedLabel = label ?? t.common.back;
  if (dynamicLabel) {
    const name = from ? pathLabels[from] : undefined;
    resolvedLabel = name ? `${t.common.backTo} ${name}` : t.common.back;
  }

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-gold",
        className,
      )}
    >
      <ArrowLeft className="size-4" /> {resolvedLabel}
    </button>
  );
}
