import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { ImpactStats } from "@/components/layouts/ImpactStats";
import { FeaturedHighlights } from "@/components/home/FeaturedHighlights";
import { Container } from "@/components/layouts/Container";
import { CardGridSkeleton } from "@/components/shared/Skeletons";

// Home — thin page that composes feature sections (fe-standard §3.1).
export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStats overlap />
      <Suspense
        fallback={
          <section className="py-16 sm:py-20">
            <Container>
              <CardGridSkeleton count={4} />
            </Container>
          </section>
        }
      >
        <FeaturedHighlights />
      </Suspense>
    </>
  );
}
