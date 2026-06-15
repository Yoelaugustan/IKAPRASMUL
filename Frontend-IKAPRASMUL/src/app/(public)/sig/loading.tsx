import { Container } from "@/components/layouts/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { CardGridSkeleton, HeroSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <>
      <HeroSkeleton />
      <Container className="py-16">
        <Skeleton className="mb-8 h-6 w-64" />
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_340px]">
          <CardGridSkeleton
            count={9}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          />
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </Container>
    </>
  );
}
