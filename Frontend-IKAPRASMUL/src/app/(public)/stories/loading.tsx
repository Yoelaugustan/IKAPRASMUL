import { Container } from "@/components/layouts/Container";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CardGridSkeleton,
  HeroSkeleton,
} from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <>
      <HeroSkeleton />
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Skeleton className="h-72 w-full rounded-2xl" />
            <CardGridSkeleton
              count={3}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </Container>
    </>
  );
}
