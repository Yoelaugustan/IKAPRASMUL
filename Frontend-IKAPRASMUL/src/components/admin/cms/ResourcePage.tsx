"use client";

import type { ReactNode } from "react";
import { Plus, Search, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResource } from "./useResource";
import { EditDialog } from "./EditDialog";
import { DeleteDialog } from "./DeleteDialog";
import type { ResourceConfig } from "./types";

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
  const { columns } = config;
  // One track per column plus a fixed 76px track for the actions cell.
  const gridTemplateColumns = [...columns.map((c) => c.width), "76px"].join(" ");
  const count = r.filtered.length;

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="flex items-end justify-between gap-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            {config.title}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {config.subtitle}
          </p>
        </div>
        <Button onClick={r.openNew} className="gap-2">
          <Plus className="size-4" />
          New {config.name}
        </Button>
      </div>

      {subTabs ? <div className="mt-5">{subTabs}</div> : null}

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-[340px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={r.query}
            onChange={(event) => r.setQuery(event.target.value)}
            placeholder={config.searchPlaceholder ?? "Search…"}
            className="pl-9"
          />
        </div>
        <span className="shrink-0 text-sm text-muted-foreground">
          {count} {count === 1 ? config.name : `${config.name}s`}
        </span>
      </div>

      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="size-1.5 rounded-full bg-gold" />
        Local preview — create, edit and delete aren&apos;t saved to the server
        yet.
      </p>

      <div className="mt-4 overflow-hidden rounded-xl shadow-sm bg-card">
        <div
          className="grid items-center gap-2 bg-card px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
          style={{ gridTemplateColumns }}
        >
          {columns.map((column) => (
            <span key={column.header} className={cn(column.align === "right" && "text-right")}>
              {column.header}
            </span>
          ))}
          <span className="text-right">Actions</span>
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
                onClick={() => r.openEdit(row)}
                title="Edit"
                className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <Pencil className="size-4" />
              </button>
              <button
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
            No {config.name.toLowerCase()}s match your search.
          </div>
        )}

        {r.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-card px-5 py-4">
            <span className="text-sm text-muted-foreground">
              Page {r.currentPage} of {r.totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => r.setCurrentPage(Math.max(1, r.currentPage - 1))}
                disabled={r.currentPage === 1}
              >
                <ChevronLeft className="mr-1 size-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => r.setCurrentPage(Math.min(r.totalPages, r.currentPage + 1))}
                disabled={r.currentPage === r.totalPages}
              >
                Next
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
