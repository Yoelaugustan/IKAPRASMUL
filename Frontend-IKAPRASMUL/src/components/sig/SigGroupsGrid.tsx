import type { Sig } from "@/types";
import { SigCard } from "./SigCard";

// Compact list grid matching the design — 3 columns of SIG names with icons.
export function SigGroupsGrid({ sigs }: { sigs: Sig[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sigs.map((sig) => (
        <SigCard key={sig.id} sig={sig} />
      ))}
    </div>
  );
}
