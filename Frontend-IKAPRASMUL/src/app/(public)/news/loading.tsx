import { Container } from "@/components/layouts/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroSkeleton, ListRowSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <>
      <HeroSkeleton />
      <Container className="pb-20">
        <div className="relative z-10 -mt-16 rounded-3xl border border-slate-100 bg-white p-5 shadow-xl sm:p-8 lg:p-10">
          <Skeleton className="mb-10 h-14 w-full rounded-xl" />
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <div className="space-y-6">
              <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ListRowSkeleton key={i} />
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <Skeleton className="h-52 w-full rounded-2xl" />
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-11 w-full rounded-md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
