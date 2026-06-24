"use client";

import { useRef, useState, type ReactNode } from "react";
import { Bold, Heading, Quote, List, Link2 } from "lucide-react";

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
// seeded once from `value`, then reports changes up via onChange(innerHTML).
// Parent remounts it (via key) when switching records, so the seed stays fresh.
export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Freeze the initial HTML so re-renders don't reset the caret position.
  const [initial] = useState(value);

  const run = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    ref.current?.focus();
    onChange(ref.current?.innerHTML ?? "");
  };

  const addLink = () => {
    const url = window.prompt("Link URL");
    if (url) run("createLink", url);
  };

  return (
    <div className="overflow-hidden rounded-md border border-input bg-background">
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
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        data-ph={placeholder}
        onInput={() => onChange(ref.current?.innerHTML ?? "")}
        className="rte min-h-[140px] px-3 py-2.5"
        dangerouslySetInnerHTML={{ __html: initial }}
      />
    </div>
  );
}
