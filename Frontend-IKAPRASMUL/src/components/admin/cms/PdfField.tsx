"use client";

import { useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MAX_BYTES = 20 * 1024 * 1024;

// File is NOT uploaded immediately. The parent (EditDialog) collects queued
// files and uploads them right before calling onSave.
export function PdfField({
  value,
  onChange,
  onFileQueued,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  onFileQueued?: (file: File | null) => void;
  error?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (file.type !== "application/pdf") {
      const message = `${file.name}: only PDF files are allowed.`;
      setFileError(message);
      toast.error(message);
      return;
    }
    if (file.size > MAX_BYTES) {
      const message = `${file.name}: PDF must be 20 MB or smaller.`;
      setFileError(message);
      toast.error(message);
      return;
    }

    setFileError(null);
    setPendingFile(file);
    onFileQueued?.(file);
  };

  const clearAll = () => {
    setPendingFile(null);
    onFileQueued?.(null);
    onChange("");
  };

  const displayName = pendingFile
    ? pendingFile.name
    : value
      ? (value.split("/").pop() ?? value)
      : null;

  const hasSomething = pendingFile !== null || Boolean(value);

  return (
    <div className={cn("space-y-2 rounded-md", error && "outline outline-1 outline-destructive p-2")}>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="size-4" />
          Upload PDF
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handleFile}
        />
        {hasSomething && (
          <button
            type="button"
            title="Remove"
            onClick={clearAll}
            className="grid size-7 place-items-center rounded text-muted-foreground hover:text-destructive"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {fileError && <p className="text-xs text-destructive">{fileError}</p>}

      {displayName && (
        <div className="flex items-center gap-2 rounded-md border border-input bg-surface px-3 py-2">
          <FileText className="size-4 shrink-0 text-primary" />
          <span className="truncate text-sm text-muted-foreground">
            {displayName}
          </span>
          {pendingFile ? (
            <span className="ml-auto shrink-0 text-xs text-amber-600 dark:text-amber-400">
              Pending — uploads on save
            </span>
          ) : value ? (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto shrink-0 text-xs text-primary underline"
            >
              Open
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}
