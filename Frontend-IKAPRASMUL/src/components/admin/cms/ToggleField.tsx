"use client";

import { cn } from "@/lib/utils";

// Pill switch used for boolean flags (isSpotlight, isFeatured, isHighlight, …).
export function ToggleField({
  label,
  checked,
  onChange,
  disabled,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "flex items-center gap-3",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <span
          className={cn(
            "relative h-5 w-9 shrink-0 rounded-full transition-colors",
            checked ? "bg-primary" : "bg-border",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition-all",
              checked ? "left-[18px]" : "left-0.5",
            )}
          />
        </span>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </button>
      {hint && (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}
