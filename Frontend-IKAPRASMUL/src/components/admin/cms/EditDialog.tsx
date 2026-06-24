"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToggleField } from "./ToggleField";
import { ImageField } from "./ImageField";
import { PdfField } from "./PdfField";
import { RichTextEditor } from "./RichTextEditor";
import { getPath, setPath, slugify } from "./utils";
import type { FieldConfig, ResourceConfig } from "./types";

interface EditDialogProps<T> {
  config: ResourceConfig<T>;
  open: boolean;
  item: T | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (draft: T) => void;
}

export function EditDialog<T>({
  config,
  open,
  item,
  isNew,
  onClose,
  onSave,
}: EditDialogProps<T>) {
  const [form, setForm] = useState<T | null>(item);
  const slugTouched = useRef(false);
  // Snapshot of the form state when the dialog opened — used to detect changes.
  const initialForm = useRef<T | null>(item);

  // Sync form when the dialog opens with a new item, and clear it after close.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    if (open) {
      setForm(item);
      slugTouched.current = false;
      initialForm.current = item;
    } else {
      const t = setTimeout(() => setForm(null), 300);
      return () => clearTimeout(t);
    }
  }, [open, item]);

  const slugTarget = config.slugTarget ?? "slug";

  const setField = (key: string, value: unknown) => {
    if (key === slugTarget) slugTouched.current = true;
    setForm((current) => {
      if (!current) return current;
      let next = setPath(current, key, value);
      // Auto-fill the slug/id field from the designated source field for new records only.
      if (isNew && !slugTouched.current && config.slugSource === key) {
        next = setPath(next, slugTarget, slugify(String(value)));
      }
      return next;
    });
  };

  const str = (key: string) => {
    const value = getPath(form, key);
    return value === undefined || value === null ? "" : String(value);
  };

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            value={str(field.key)}
            rows={field.rows ?? 3}
            placeholder={field.placeholder}
            onChange={(event) => setField(field.key, event.target.value)}
          />
        );
      case "rich":
        return (
          <RichTextEditor
            value={str(field.key)}
            placeholder={field.placeholder}
            onChange={(html) => setField(field.key, html)}
          />
        );
      case "pdf":
        return (
          <PdfField
            value={str(field.key)}
            onChange={(value) => setField(field.key, value)}
          />
        );
      case "image":
        return (
          <ImageField
            value={str(field.key)}
            placeholder={field.placeholder}
            onChange={(value) => setField(field.key, value)}
          />
        );
      case "select":
        return (
          <Select
            value={str(field.key)}
            onValueChange={(value) => setField(field.key, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={field.placeholder ?? "Select…"} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "date":
        return (
          <Input
            type="date"
            value={str(field.key).slice(0, 10)}
            onChange={(event) => setField(field.key, event.target.value)}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={str(field.key)}
            placeholder={field.placeholder}
            onChange={(event) =>
              setField(
                field.key,
                event.target.value === "" ? 0 : Number(event.target.value),
              )
            }
          />
        );
      case "toggle":
        return (
          <ToggleField
            label={field.label}
            checked={Boolean(getPath(form, field.key))}
            onChange={(value) => setField(field.key, value)}
          />
        );
      default:
        return (
          <Input
            value={str(field.key)}
            placeholder={field.placeholder}
            onChange={(event) => setField(field.key, event.target.value)}
          />
        );
    }
  };

  const hasDraftSupport =
    form !== null && "isDraft" in (form as Record<string, unknown>);
  const isCurrentlyDraft = hasDraftSupport && Boolean(getPath(form, "isDraft"));
  const primaryLabel = isNew
    ? hasDraftSupport
      ? "Publish"
      : `Create ${config.name}`
    : isCurrentlyDraft
      ? "Publish"
      : "Save changes";

  const saveAs = (draft: boolean) => {
    if (!form) return;
    onSave(hasDraftSupport ? setPath(form, "isDraft", draft) : form);
  };

  // On close, auto-save as draft for new items if the user already typed something.
  const handleClose = () => {
    if (isNew && form && hasDraftSupport) {
      const hasChanges =
        JSON.stringify(form) !== JSON.stringify(initialForm.current);
      if (hasChanges) {
        onSave(setPath(form, "isDraft", true));
        return;
      }
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && handleClose()}>
      {form && (
        <DialogContent
          showCloseButton={false}
          className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-[680px]"
        >
          <div className="relative border-b px-6 py-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-gold">
              {config.kicker ?? config.name}
            </div>
            <DialogTitle className="mt-1 text-lg text-primary">
              {isNew ? `New ${config.name}` : `Edit ${config.name}`}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {isNew ? `Create a new ${config.name}` : `Edit ${config.name}`}
            </DialogDescription>
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="grid grid-cols-1 gap-x-3.5 gap-y-4 sm:grid-cols-2">
              {config.fields.filter((field) => !field.hidden?.(form)).map((field) => (
                <div
                  key={field.key}
                  className={cn(field.full && "sm:col-span-2")}
                >
                  {field.type !== "toggle" && (
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">
                      {field.label}
                    </label>
                  )}
                  {renderField(field)}
                  {field.hint && (
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {field.hint}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t bg-surface px-6 py-4">
            <span className="hidden text-xs text-muted-foreground sm:block">
              Local preview — not saved to the server yet.
            </span>
            <div className="flex gap-2.5">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              {hasDraftSupport && (
                <Button variant="outline" onClick={() => saveAs(true)}>
                  Save as Draft
                </Button>
              )}
              <Button onClick={() => saveAs(false)}>
                {primaryLabel}
              </Button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
