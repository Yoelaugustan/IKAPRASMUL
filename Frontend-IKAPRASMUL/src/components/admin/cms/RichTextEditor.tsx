"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Bold, Heading, Quote, List, Link2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;

function ToolButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      // Keep the editor's selection while clicking a toolbar button.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className="grid size-7 place-items-center rounded text-muted-foreground hover:bg-accent hover:text-primary"
    >
      {children}
    </button>
  );
}

// Minimal contentEditable rich-text editor for body fields. Uncontrolled:
// content is seeded once via useEffect (not dangerouslySetInnerHTML) so that
// React 19's concurrent re-renders never reset the cursor or wipe user input.
// Images are inserted as blob: URLs immediately for preview; the parent
// (EditDialog) replaces them with real uploaded URLs on save.
export function RichTextEditor({
  value,
  onChange,
  placeholder,
  error,
  uploadFolder,
  onFileQueued,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  error?: boolean;
  uploadFolder?: string;
  onFileQueued?: (blobUrl: string, file: File) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Seed content once on mount via direct DOM write — avoids React reconciling
  // innerHTML on every re-render and resetting the cursor (React 19 issue with
  // dangerouslySetInnerHTML on contentEditable).
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const run = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    ref.current?.focus();
    onChange(ref.current?.innerHTML ?? "");
  };

  const addLink = () => {
    const url = window.prompt("Link URL");
    if (url) run("createLink", url);
  };

  const handleImageFiles = (files: File[]) => {
    const valid = files.filter((f) => {
      if (!ACCEPTED.includes(f.type)) {
        toast.error(`${f.name}: only JPG, PNG, or WebP images are allowed.`);
        return false;
      }
      if (f.size > MAX_BYTES) {
        toast.error(`${f.name}: image must be 5 MB or smaller.`);
        return false;
      }
      return true;
    });
    if (valid.length === 0) return;

    if (valid.length === 1) {
      // Single image — insert inline.
      const blobUrl = URL.createObjectURL(valid[0]);
      if (ref.current) {
        const img = document.createElement("img");
        img.src = blobUrl;
        img.alt = "";
        img.style.maxWidth = "100%";
        img.style.height = "auto";
        img.style.display = "block";
        img.style.margin = "0.5rem 0";
        ref.current.appendChild(img);
        onChange(ref.current.innerHTML);
        img.scrollIntoView({ behavior: "smooth", block: "nearest" });
        ref.current.focus();
      }
      onFileQueued?.(blobUrl, valid[0]);
    } else {
      // Multiple images — wrap in a 2-column photo grid.
      const wrapper = document.createElement("div");
      wrapper.className = "auto-img-grid";
      valid.forEach((file) => {
        const blobUrl = URL.createObjectURL(file);
        const img = document.createElement("img");
        img.src = blobUrl;
        img.alt = "";
        wrapper.appendChild(img);
        onFileQueued?.(blobUrl, file);
      });
      if (ref.current) {
        ref.current.appendChild(wrapper);
        onChange(ref.current.innerHTML);
        wrapper.scrollIntoView({ behavior: "smooth", block: "nearest" });
        ref.current.focus();
      }
    }

    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className={cn("overflow-hidden rounded-md border bg-background", error ? "border-destructive" : "border-input")}>
      <div className="flex items-center gap-1 border-b border-input bg-surface px-2 py-1.5">
        <ToolButton title="Bold" onClick={() => run("bold")}>
          <Bold className="size-4" />
        </ToolButton>
        <ToolButton title="Heading" onClick={() => run("formatBlock", "h3")}>
          <Heading className="size-4" />
        </ToolButton>
        <ToolButton title="Quote" onClick={() => run("formatBlock", "blockquote")}>
          <Quote className="size-4" />
        </ToolButton>
        <ToolButton title="List" onClick={() => run("insertUnorderedList")}>
          <List className="size-4" />
        </ToolButton>
        <ToolButton title="Link" onClick={addLink}>
          <Link2 className="size-4" />
        </ToolButton>

        {uploadFolder && (
          <>
            <div className="mx-1 h-4 w-px bg-border" />
            <ToolButton title="Insert image (select multiple for grid)" onClick={() => fileRef.current?.click()}>
              <ImageIcon className="size-4" />
            </ToolButton>
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPTED.join(",")}
              multiple
              className="sr-only"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                if (files.length > 0) handleImageFiles(files);
              }}
            />
          </>
        )}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        data-ph={placeholder}
        onInput={() => onChange(ref.current?.innerHTML ?? "")}
        className="rte min-h-[140px] px-3 py-2.5"
      />
    </div>
  );
}
