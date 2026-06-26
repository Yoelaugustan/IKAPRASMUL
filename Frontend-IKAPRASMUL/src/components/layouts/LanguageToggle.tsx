"use client";

import { useLang } from "@/components/shared/LanguageProvider";
import { LANGS, LANG_LABELS } from "@/i18n/config";
import { cn } from "@/lib/utils";

// Segmented EN | ID switch.
// variant="inverted" — for dark/navy headers (default)
// variant="default"  — for light backgrounds (admin panel)
export function LanguageToggle({
  className,
  variant = "inverted",
}: {
  className?: string;
  variant?: "inverted" | "default";
}) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center rounded-full p-0.5",
        variant === "inverted" ? "border border-white/30" : "border border-border",
        className,
      )}
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-bold transition-colors",
            lang === l
              ? "bg-gold text-gold-foreground"
              : variant === "inverted"
                ? "text-primary-foreground/70 hover:text-white"
                : "text-muted-foreground hover:text-foreground",
          )}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
