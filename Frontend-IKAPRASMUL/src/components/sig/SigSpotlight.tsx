import { getSigSpotlights } from "@/lib/content";
import { EmptyState } from "@/components/shared/EmptyState";
import { getServerDict } from "@/i18n/server";
import { SigSpotlightCard } from "./SigSpotlightCard";

// SIG Spotlight sidebar — a separate, news-like feature (its own data source).
// Each card opens a "Learn More" detail modal (see SigSpotlightCard).
export async function SigSpotlight() {
  const [{ t }, spotlights] = await Promise.all([
    getServerDict(),
    getSigSpotlights(),
  ]);

  return (
    <div>
      <h3 className="mb-8 text-xl font-bold uppercase tracking-wide text-[#00396c]">
        {t.sig.spotlightTitle}
      </h3>
      {spotlights.length === 0 ? (
        <EmptyState
          title={t.sig.noSpotlightTitle}
          description={t.sig.noSpotlightDesc}
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
