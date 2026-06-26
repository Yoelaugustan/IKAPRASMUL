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
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { uploadFile } from "@/lib/adminApi";
import { ToggleField } from "./ToggleField";
import { ImageField } from "./ImageField";
import { PdfField } from "./PdfField";
import { RichTextEditor } from "./RichTextEditor";
import { getPath, setPath, slugify } from "./utils";
import type { FieldConfig, ResourceConfig } from "./types";
import { useLang } from "@/components/shared/LanguageProvider";

interface EditDialogProps<T> {
  config: ResourceConfig<T>;
  open: boolean;
  item: T | null;
  isNew: boolean;
  /** Full unfiltered list used to enforce toggle slot limits. */
  allItems?: T[];
  onClose: () => void;
  onSave: (draft: T) => void;
}

export function EditDialog<T>({
  config,
  open,
  item,
  isNew,
  allItems = [],
  onClose,
  onSave,
}: EditDialogProps<T>) {
  const { t } = useLang();
  const [form, setForm] = useState<T | null>(item);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Set<string>>(new Set());
  const slugTouched = useRef(false);
  const initialForm = useRef<T | null>(item);
  const pendingFiles = useRef<Map<string, File>>(new Map());
  // blob URL → { file, folder } for images inserted into rich text fields.
  // Uploaded and replaced with real URLs on save; revoked on cancel/close.
  const pendingBodyImages = useRef<Map<string, { file: File; folder: string }>>(new Map());
  const scrollRef = useRef<HTMLDivElement>(null);

  const revokePendingBodyImages = () => {
    for (const blobUrl of pendingBodyImages.current.keys()) URL.revokeObjectURL(blobUrl);
    pendingBodyImages.current.clear();
  };

  // Sync form when dialog opens; clear it after close animation finishes.
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(item);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFieldErrors(new Set());
      slugTouched.current = false;
      initialForm.current = item;
      pendingFiles.current.clear();
      revokePendingBodyImages();
    } else {
      pendingFiles.current.clear();
      revokePendingBodyImages();
      const t = setTimeout(() => setForm(null), 300);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, item]);

  // Scroll to top so the error banner is visible when validation fails.
  useEffect(() => {
    if (fieldErrors.size > 0) {
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [fieldErrors]);

  const slugTarget = config.slugTarget ?? "slug";

  const clearError = (key: string) =>
    setFieldErrors((prev) => {
      if (!prev.has(key)) return prev;
      const next = new Set(prev);
      next.delete(key);
      return next;
    });

  const setField = (key: string, value: unknown) => {
    if (key === slugTarget) slugTouched.current = true;
    clearError(key);
    setForm((current) => {
      if (!current) return current;
      let next = setPath(current, key, value);
      if (isNew && !slugTouched.current && config.slugSource === key) {
        next = setPath(next, slugTarget, slugify(String(value)));
      }
      return next;
    });
  };

  const handleFileQueued = (key: string, file: File | null) => {
    if (file) {
      pendingFiles.current.set(key, file);
      clearError(key);
    } else {
      pendingFiles.current.delete(key);
    }
  };

  const handleBodyImageQueued = (folder: string) => (blobUrl: string, file: File) => {
    pendingBodyImages.current.set(blobUrl, { file, folder });
  };

  const str = (key: string) => {
    const value = getPath(form, key);
    return value === undefined || value === null ? "" : String(value);
  };

  const renderField = (field: FieldConfig) => {
    const error = fieldErrors.has(field.key);
    const errClass = error ? "border-destructive focus-visible:ring-destructive" : "";
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            value={str(field.key)}
            rows={field.rows ?? 3}
            placeholder={field.placeholder}
            className={errClass}
            onChange={(event) => setField(field.key, event.target.value)}
          />
        );
      case "rich":
        return (
          <RichTextEditor
            value={str(field.key)}
            placeholder={field.placeholder}
            error={error}
            onChange={(html) => setField(field.key, html)}
            uploadFolder={field.uploadFolder}
            onFileQueued={field.uploadFolder ? handleBodyImageQueued(field.uploadFolder) : undefined}
          />
        );
      case "pdf":
        return (
          <PdfField
            value={str(field.key)}
            error={error}
            onChange={(value) => setField(field.key, value)}
            onFileQueued={(file) => handleFileQueued(field.key, file)}
          />
        );
      case "image":
        return (
          <ImageField
            value={str(field.key)}
            error={error}
            onChange={(value) => setField(field.key, value)}
            onFileQueued={(file) => handleFileQueued(field.key, file)}
          />
        );
      case "select":
        return (
          <Select
            value={str(field.key)}
            onValueChange={(value) => setField(field.key, value)}
          >
            <SelectTrigger className={cn("w-full", errClass)}>
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
            className={errClass}
            onChange={(event) => setField(field.key, event.target.value)}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={str(field.key)}
            placeholder={field.placeholder}
            className={errClass}
            onChange={(event) =>
              setField(
                field.key,
                event.target.value === "" ? 0 : Number(event.target.value),
              )
            }
          />
        );
      case "toggle": {
        const limitMax = config.toggleLimits?.[field.key];
        const currentKey = String(getPath(form, config.keyField) ?? "");
        const atLimit =
          limitMax !== undefined &&
          !getPath(form, field.key) &&
          allItems.filter(
            (i) =>
              Boolean(getPath(i, field.key)) &&
              String(getPath(i, config.keyField) ?? "") !== currentKey,
          ).length >= limitMax;
        return (
          <ToggleField
            label={field.label}
            checked={Boolean(getPath(form, field.key))}
            disabled={atLimit}
            hint={atLimit ? t.admin.limitReached.replace("{n}", String(limitMax)) : undefined}
            onChange={(value) => {
              setField(field.key, value);
              if (value && field.linkedToggleOff) {
                setField(field.linkedToggleOff, false);
              }
            }}
          />
        );
      }
      default:
        return (
          <Input
            value={str(field.key)}
            placeholder={field.placeholder}
            className={errClass}
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
      ? t.admin.publish
      : `${t.admin.create} ${config.name}`
    : isCurrentlyDraft
      ? t.admin.publish
      : t.admin.saveChanges;

  const visibleFields = () =>
    config.fields.filter((f) => !f.hidden?.(form));

  const saveAs = async (asDraft: boolean) => {
    if (!form) return;

    if (asDraft) {
      // Drafts skip most validation, but need at minimum a title/name so the
      // record can be identified in the table. slugSource is always the label field.
      const labelKey = config.slugSource;
      if (labelKey) {
        const labelVal = getPath(form, labelKey);
        if (!labelVal || String(labelVal).trim() === "") {
          setFieldErrors(new Set([labelKey]));
          return;
        }
      }
    } else {
      // Full validation when publishing.
      const emptyKeys = visibleFields()
        .filter((f) => f.required)
        .filter((f) => {
          const val = getPath(form, f.key);
          // Also treat a queued-but-not-yet-uploaded file as non-empty.
          if (pendingFiles.current.has(f.key)) return false;
          return typeof val === "string"
            ? val.trim() === ""
            : val === null || val === undefined;
        })
        .map((f) => f.key);

      if (emptyKeys.length > 0) {
        setFieldErrors(new Set(emptyKeys));
        return;
      }
    }

    setSaving(true);
    let current = form;

    // Upload any queued files now — only on actual save, never on file select.
    for (const [key, file] of pendingFiles.current) {
      try {
        const fieldDef = config.fields.find((f) => f.key === key);
        const url = await uploadFile(file, fieldDef?.uploadFolder);
        current = setPath(current, key, url);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : `Upload failed for ${key}.`);
        setSaving(false);
        return;
      }
    }
    pendingFiles.current.clear();

    // Upload body images that are still referenced in the HTML, replace blob URLs.
    const richFields = config.fields.filter((f) => f.type === "rich");
    for (const [blobUrl, { file, folder }] of pendingBodyImages.current) {
      const inUse = richFields.some((f) =>
        (getPath(current, f.key) as string ?? "").includes(blobUrl),
      );
      if (inUse) {
        try {
          const realUrl = await uploadFile(file, folder);
          for (const f of richFields) {
            const html = getPath(current, f.key) as string ?? "";
            if (html.includes(blobUrl)) {
              current = setPath(current, f.key, html.replaceAll(blobUrl, realUrl));
            }
          }
        } catch (err) {
          toast.error(err instanceof Error ? err.message : "Body image upload failed.");
          setSaving(false);
          return;
        }
      }
      URL.revokeObjectURL(blobUrl);
    }
    pendingBodyImages.current.clear();

    setSaving(false);

    onSave(hasDraftSupport ? setPath(current, "isDraft", asDraft) : current);
  };

  // On close, auto-save as draft for new items only when the label field is
  // filled in — otherwise silently discard the empty form.
  const handleClose = () => {
    if (isNew && form && hasDraftSupport) {
      const hasChanges =
        JSON.stringify(form) !== JSON.stringify(initialForm.current);
      const labelKey = config.slugSource;
      const hasLabel = labelKey
        ? Boolean(String(getPath(form, labelKey) ?? "").trim())
        : hasChanges;
      if (hasChanges && hasLabel) {
        toast.info(t.admin.savingDraft);
        void saveAs(true);
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
              {isNew ? `${t.admin.newLabel} ${config.name}` : `${t.admin.editLabel} ${config.name}`}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {isNew ? `${t.admin.create} ${config.name}` : `${t.admin.editLabel} ${config.name}`}
            </DialogDescription>
            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="absolute right-4 top-4 grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
            >
              <X className="size-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5">
            {fieldErrors.size > 0 && (
              <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
                {t.admin.requiredError}
              </p>
            )}
            <div className="grid grid-cols-1 gap-x-3.5 gap-y-4 sm:grid-cols-2">
              {visibleFields().map((field) => (
                <div
                  key={field.key}
                  className={cn(field.full && "sm:col-span-2")}
                >
                  {field.type !== "toggle" && (
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">
                      {field.label}
                      {field.required && (
                        <span className="ml-1 text-destructive">*</span>
                      )}
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
            {saving && (
              <span className="text-xs text-muted-foreground">
                {t.admin.uploading}
              </span>
            )}
            <div className="flex gap-2.5">
              {hasDraftSupport && (
                <Button
                  variant="outline"
                  disabled={saving}
                  onClick={() => void saveAs(true)}
                >
                  {saving && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
                  {t.admin.saveAsDraft}
                </Button>
              )}
              <Button disabled={saving} onClick={() => void saveAs(false)}>
                {saving && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
                {primaryLabel}
              </Button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
