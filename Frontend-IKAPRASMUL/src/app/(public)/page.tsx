import { Hero } from "@/components/home/Hero";
import { ImpactStats } from "@/components/layouts/ImpactStats";
import { FeaturedHighlights } from "@/components/home/FeaturedHighlights";

// Home — thin page that composes feature sections (fe-standard §3.1).
export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStats overlap />
      <FeaturedHighlights />
    </>
  );
}
