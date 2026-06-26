"use client";

import type { ReactNode } from "react";
import { Plus, Search, Pencil, Trash2, ChevronLeft, ChevronRight, ArrowUpDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useResource } from "./useResource";
import { EditDialog } from "./EditDialog";
import { DeleteDialog } from "./DeleteDialog";
import type { ResourceConfig } from "./types";
import { useLang } from "@/components/shared/LanguageProvider";

// Shared list shell for a single resource: header + "New" button, optional
// sub-tabs slot, search toolbar, config-driven table, and the edit/delete
// modals. Reused by every CMS section.
export function ResourcePage<T>({
  config,
  initialItems,
  subTabs,
}: {
  config: ResourceConfig<T>;
  initialItems: T[];
  subTabs?: ReactNode;
}) {
  const r = useResource(config, initialItems);
  const { t } = useLang();
  const { columns } = config;
  // One track per column plus a fixed 76px track for the actions cell.
  const gridTemplateColumns = [...columns.map((c) => c.width), "76px"].join(" ");
  const count = r.filtered.length;

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            {config.title}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {config.subtitle}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          {config.publicPath && (
            <Button asChild variant="outline" className="gap-2">
              <a href={config.publicPath} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-4" />
                {t.admin.viewWebsite}
              </a>
            </Button>
          )}
          <Button onClick={r.openNew} className="gap-2">
            <Plus className="size-4" />
            {t.admin.newItem} {config.name}
          </Button>
        </div>
      </div>

      {subTabs ? <div className="mt-5">{subTabs}</div> : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 basis-40 max-w-[340px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={r.query}
            onChange={(event) => r.setQuery(event.target.value)}
            placeholder={config.searchPlaceholder ?? "Search…"}
            className="pl-9"
          />
        </div>

        <Select value={r.sortBy} onValueChange={(v) => r.setSortBy(v as typeof r.sortBy)}>
          <SelectTrigger className="w-[140px] shrink-0 sm:w-[160px]">
            <ArrowUpDown className="mr-2 size-3.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t.admin.sortNewest}</SelectItem>
            <SelectItem value="oldest">{t.admin.sortOldest}</SelectItem>
            <SelectItem value="az">{t.admin.sortAZ}</SelectItem>
            <SelectItem value="za">{t.admin.sortZA}</SelectItem>
          </SelectContent>
        </Select>

        <span className="ml-auto shrink-0 text-sm text-muted-foreground">
          {count} {count === 1 ? config.name : `${config.name}s`}
        </span>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl shadow-sm bg-card">
        {/* overflow-x-auto lets the grid table scroll horizontally on narrow screens;
            min-w-[560px] gives a concrete floor while still letting the table fill
            wider containers so truncate on the title column actually fires. */}
        <div className="relative">
        <div className="overflow-x-auto">
          <div className="min-w-[560px]">
            <div
              className="grid items-center gap-2 bg-card px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
              style={{ gridTemplateColumns }}
            >
              {columns.map((column) => (
                <span key={column.header} className={cn(column.align === "right" && "text-right")}>
                  {column.header}
                </span>
              ))}
              <span className="text-right">{t.admin.actions}</span>
            </div>

            {r.paginatedItems.map((row) => (
              <div
                key={r.getKey(row)}
                className="grid items-center gap-2 border-t border-slate-100 px-5 py-4 transition-colors hover:bg-slate-50/50"
                style={{ gridTemplateColumns }}
              >
                {columns.map((column, index) => (
                  <div
                    key={index}
                    className={cn("min-w-0 text-sm", column.align === "right" && "text-right")}
                  >
                    {column.cell(row)}
                  </div>
                ))}
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => r.openEdit(row)}
                    title="Edit"
                    className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => r.askDelete(row)}
                    title="Delete"
                    className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}

            {count === 0 && (
              <div className="border-t px-6 py-12 text-center text-sm text-muted-foreground">
                No {config.name.toLowerCase()}s {t.admin.noResults}
              </div>
            )}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-card to-transparent sm:hidden" />
        </div>

        {r.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-card px-5 py-4">
            <span className="text-sm text-muted-foreground">
              {t.admin.page} {r.currentPage} {t.admin.of} {r.totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => r.setCurrentPage(Math.max(1, r.currentPage - 1))}
                disabled={r.currentPage === 1}
              >
                <ChevronLeft className="mr-1 size-4" />
                {t.admin.previous}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => r.setCurrentPage(Math.min(r.totalPages, r.currentPage + 1))}
                disabled={r.currentPage === r.totalPages}
              >
                {t.admin.next}
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <EditDialog
        config={config}
        open={r.editing !== null}
        item={r.editing?.item ?? null}
        isNew={r.editing?.isNew ?? false}
        allItems={r.items}
        onClose={r.closeEdit}
        onSave={r.save}
      />
      <DeleteDialog
        open={r.confirming !== null}
        name={r.confirming ? config.getLabel(r.confirming) : ""}
        onClose={r.cancelDelete}
        onConfirm={r.confirmDelete}
      />
    </div>
  );
}
