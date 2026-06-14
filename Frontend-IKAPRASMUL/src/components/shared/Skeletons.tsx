import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/layouts/Container";

// Route-level loading skeletons. Shown by Next.js `loading.tsx` while a page's
// data resolves. (Today the data is static so this rarely shows, but it keeps
// the loading UX ready for the real API.)

export function HeroSkeleton() {
  return (
    <div className="bg-primary">
      <Container className="py-20 sm:py-24 lg:py-28">
        <Skeleton className="h-3.5 w-40 bg-white/10" />
        <Skeleton className="mt-6 h-11 w-3/4 max-w-xl bg-white/10" />
        <Skeleton className="mt-3 h-11 w-2/3 max-w-md bg-white/10" />
        <Skeleton className="mt-6 h-4 w-full max-w-lg bg-white/10" />
        <Skeleton className="mt-2 h-4 w-2/3 max-w-md bg-white/10" />
      </Container>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="space-y-2.5 p-5">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({
  count = 8,
  className = "grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ListRowSkeleton() {
  return (
    <div className="flex gap-4 rounded-xl border border-slate-100 bg-white p-3">
      <Skeleton className="size-20 shrink-0 rounded-lg" />
      <div className="flex-1 space-y-2 py-1">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}
