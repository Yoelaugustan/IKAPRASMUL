import { Skeleton } from "@/components/ui/skeleton";

// Row skeleton mimicking the table rows in ResourcePage
function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-t border-slate-100 px-5 py-4">
      <Skeleton className="size-10 shrink-0 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-2/5" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-16" />
      <div className="flex gap-1.5">
        <Skeleton className="size-8 rounded-md" />
        <Skeleton className="size-8 rounded-md" />
      </div>
    </div>
  );
}

// Stat card skeleton used on the dashboard
export function StatCardSkeleton() {
  return (
    <div className="rounded-xl bg-card p-5 shadow-md">
      <div className="flex items-center justify-between">
        <Skeleton className="size-10 rounded-lg" />
        <Skeleton className="h-8 w-10" />
      </div>
      <Skeleton className="mt-4 h-4 w-28" />
      <Skeleton className="mt-1.5 h-3 w-20" />
    </div>
  );
}

// Full table skeleton (header + rows) for CMS pages
export function ResourceTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="mx-auto max-w-[1180px]">
      {/* Page title */}
      <div className="flex items-end justify-between gap-5">
        <div className="space-y-2">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>

      {/* Search bar */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <Skeleton className="h-10 w-80 rounded-lg" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-xl bg-card shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-4 bg-card px-5 py-4">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="ml-auto h-3 w-14" />
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

// Dashboard skeleton
export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-[1080px]">
      <Skeleton className="h-7 w-36" />
      <Skeleton className="mt-1.5 h-4 w-80" />

      {/* Stat cards */}
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Bottom cards */}
      <div className="mt-5 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="overflow-hidden rounded-xl bg-card shadow-md">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-28" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 border-b border-slate-100 px-5 py-3 last:border-b-0">
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-card p-5 shadow-md">
          <Skeleton className="h-4 w-28" />
          <div className="mt-3.5 flex flex-col gap-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
