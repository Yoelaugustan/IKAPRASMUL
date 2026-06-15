import type { Sig } from "@/types";
import { EmptyState } from "@/components/shared/EmptyState";
import { SigCard } from "./SigCard";

// Compact list grid matching the design — 3 columns of SIG names with icons.
export function SigGroupsGrid({ sigs }: { sigs: Sig[] }) {
  if (sigs.length === 0) {
    return (
      <EmptyState
        title="No interest groups available right now"
        description="Groups couldn't be loaded. Please check back shortly."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sigs.map((sig) => (
        <SigCard key={sig.id} sig={sig} />
      ))}
    </div>
  );
}
