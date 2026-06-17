"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavSource } from "./NavSourceProvider";

// Friendly names for the top-level pages a detail can be opened from.
const PATH_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/sig": "SIG",
  "/stories": "Alumni Stories",
  "/business": "Alumni Business",
  "/news": "News & Insight",
};

// Goes back to the previous page (preserving its scroll position). Falls back to
// a route when there's no history (e.g. opened directly). With `dynamicLabel`,
// the label names where it was opened from (e.g. "Back to Home").
export function BackButton({
  fallback = "/",
  label = "Back",
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

  let resolvedLabel = label;
  if (dynamicLabel) {
    const name = from ? PATH_LABELS[from] : undefined;
    resolvedLabel = name ? `Back to ${name}` : "Back";
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
