import { Container } from "@/components/layouts/Container";
import {
  CardGridSkeleton,
  HeroSkeleton,
} from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <>
      <HeroSkeleton />
      <div className="bg-slate-50 pb-16">
        <Container className="pt-14">
          <CardGridSkeleton count={8} />
        </Container>
      </div>
    </>
  );
}
