import { getSigs } from "@/lib/content";
import { EmptyState } from "@/components/shared/EmptyState";
import { SigSpotlightCard } from "./SigSpotlightCard";

// SIG Spotlight sidebar — shows up to 2 featured SIGs with images, displayed as
// stacked cards on the right side of the SIG groups section. Each card opens a
// "Learn More" detail modal (see SigSpotlightCard).
export async function SigSpotlight() {
  const allSigs = await getSigs();
  const spotlights = allSigs.filter((s) => s.isSpotlight).slice(0, 2);

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
          {spotlights.map((sig) => (
            <SigSpotlightCard key={sig.id} sig={sig} />
          ))}
        </div>
      )}
    </div>
  );
}
