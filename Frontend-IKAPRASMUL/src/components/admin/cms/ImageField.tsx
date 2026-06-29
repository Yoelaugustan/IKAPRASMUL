"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// File is NOT uploaded immediately on select. The parent (EditDialog) collects
// queued files and uploads them right before calling onSave, so no orphaned
// uploads are created when the user closes without saving.
export function ImageField({
  value,
  onFileQueued,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  onFileQueued?: (file: File | null) => void;
  error?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // Revoke the object URL when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    const url = URL.createObjectURL(file);
    setBlobUrl(url);
    onFileQueued?.(file);
  };

  const clearPending = () => {
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    setBlobUrl(null);
    onFileQueued?.(null);
  };

  const previewSrc = blobUrl ?? value;

  return (
    <div className={cn("space-y-2 rounded-md", error && "outline outline-1 outline-destructive p-2")}>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="size-4" />
          Upload image
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFile}
        />
        {blobUrl && (
          <>
            <span className="text-xs text-amber-600 dark:text-amber-400">
              Pending — uploads on save
            </span>
            <button
              type="button"
              title="Remove pending file"
              onClick={clearPending}
              className="grid size-5 place-items-center rounded text-muted-foreground hover:text-destructive"
            >
              <X className="size-3.5" />
            </button>
          </>
        )}
      </div>
      {previewSrc ? (
        <div className="relative h-28 w-full overflow-hidden rounded-md border border-input bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewSrc}
            alt="Preview"
            className="h-full w-full object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}
