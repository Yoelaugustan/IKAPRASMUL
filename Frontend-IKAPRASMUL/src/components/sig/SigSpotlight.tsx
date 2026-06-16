import { getSigSpotlights } from "@/lib/content";
import { EmptyState } from "@/components/shared/EmptyState";
import { SigSpotlightCard } from "./SigSpotlightCard";

// SIG Spotlight sidebar — a separate, news-like feature (its own data source).
// Each card opens a "Learn More" detail modal (see SigSpotlightCard).
export async function SigSpotlight() {
  const spotlights = await getSigSpotlights();

  return (
    <div>
      <h3 className="mb-8 text-xl font-bold uppercase tracking-wide text-[#00396c]">
        SIG Spotlight
      </h3>
      {spotlights.length === 0 ? (
        <EmptyState
          title="No spotlight available right now"
          description="Please check back shortly."
          className="py-10"
        />
      ) : (
        <div className="space-y-6">
          {spotlights.map((spotlight) => (
            <SigSpotlightCard key={spotlight.id} spotlight={spotlight} />
          ))}
        </div>
      )}
    </div>
  );
}
