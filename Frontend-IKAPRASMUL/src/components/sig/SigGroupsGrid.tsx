import type { SigGroup } from "@/types";
import { EmptyState } from "@/components/shared/EmptyState";
import { SigCard } from "./SigCard";

// Grid of SIG group cards — image + name (icon fallback).
export function SigGroupsGrid({ groups }: { groups: SigGroup[] }) {
  if (groups.length === 0) {
    return (
      <EmptyState
        title="No interest groups available right now"
        description="Groups couldn't be loaded. Please check back shortly."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <SigCard key={group.id} sig={group} />
      ))}
    </div>
  );
}
