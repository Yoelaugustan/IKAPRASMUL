"use client";

import { useRef } from "react";
import { FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// File picker for PDF uploads. Stores a blob URL locally (non-persistent) or
// accepts a pasted URL for an already-hosted PDF. When the backend upload
// endpoint is wired, replace the blob URL path with a real upload call here.
export function PdfField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  const displayName = value
    ? value.startsWith("blob:")
      ? "Local file — not uploaded yet"
      : value.split("/").pop() ?? value
    : null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="size-4" />
          Choose PDF
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handleFile}
        />
        {value && (
          <button
            type="button"
            title="Remove"
            onClick={() => onChange("")}
            className="grid size-7 place-items-center rounded text-muted-foreground hover:text-destructive"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {displayName ? (
        <div className="flex items-center gap-2 rounded-md border border-input bg-surface px-3 py-2">
          <FileText className="size-4 shrink-0 text-primary" />
          <span className="truncate text-sm text-muted-foreground">
            {displayName}
          </span>
          {value && !value.startsWith("blob:") && (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto shrink-0 text-xs text-primary underline"
            >
              Open
            </a>
          )}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-input px-3 py-3 text-center text-xs text-muted-foreground">
          Or paste a URL to an already-hosted PDF
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://…/newsletter.pdf"
            className="mt-2 text-xs"
          />
        </div>
      )}
    </div>
  );
}
