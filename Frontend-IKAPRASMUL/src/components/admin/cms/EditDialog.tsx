"use client";

import { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";
import { ToggleField } from "./ToggleField";
import { ImageField } from "./ImageField";
import { RichTextEditor } from "./RichTextEditor";
import { getPath, setPath } from "./utils";
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

  useEffect(() => {
    if (open) {
      setForm(item);
    } else {
      // Clear form after a short delay to allow exit animation to finish
      const t = setTimeout(() => setForm(null), 300);
      return () => clearTimeout(t);
    }
  }, [open, item]);

  const setField = (key: string, value: unknown) =>
    setForm((current) => (current ? setPath(current, key, value) : current));

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

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      {form && (
        <DialogContent
          showCloseButton={false}
          className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-[680px]"
        >
          <div className="border-b px-6 py-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-gold">
              {config.kicker ?? config.name}
            </div>
            <DialogTitle className="mt-1 text-lg text-primary">
              {isNew ? `New ${config.name}` : `Edit ${config.name}`}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {isNew ? `Create a new ${config.name}` : `Edit ${config.name}`}
            </DialogDescription>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="grid grid-cols-1 gap-x-3.5 gap-y-4 sm:grid-cols-2">
              {config.fields.map((field) => (
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
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={() => form && onSave(form)}>
                {isNew ? `Create ${config.name}` : "Save changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
