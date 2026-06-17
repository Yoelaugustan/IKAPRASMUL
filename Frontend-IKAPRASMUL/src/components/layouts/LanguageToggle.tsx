"use client";

import { useLang } from "@/components/shared/LanguageProvider";
import { LANGS, LANG_LABELS } from "@/i18n/config";
import { cn } from "@/lib/utils";

// Segmented EN | ID switch. Designed for the navy header (uses inverted colors).
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center rounded-full border border-white/30 p-0.5",
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
              : "text-primary-foreground/70 hover:text-white",
          )}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
