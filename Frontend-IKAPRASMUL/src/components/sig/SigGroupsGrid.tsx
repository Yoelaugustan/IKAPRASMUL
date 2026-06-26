import type { SigGroup } from "@/types";
import { EmptyState } from "@/components/shared/EmptyState";
import { Reveal } from "@/components/shared/Reveal";
import { getServerDict } from "@/i18n/server";
import { SigCard } from "./SigCard";

// Grid of SIG group cards — image + name (icon fallback).
export async function SigGroupsGrid({ groups }: { groups: SigGroup[] }) {
  if (groups.length === 0) {
    const { t } = await getServerDict();
    return (
      <EmptyState
        title={t.cards.noGroupsTitle}
        description={t.cards.noGroupsDesc}
      />
    );
  }

  return (
    <Reveal stagger={80} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <SigCard key={group.id} sig={group} />
      ))}
    </Reveal>
  );
}
