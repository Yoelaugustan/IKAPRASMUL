import type { Metadata } from "next";
import { getSigGroups, getSigSpotlights } from "@/lib/content";
import { SigManager } from "@/components/admin/cms/SigManager";

export const metadata: Metadata = {
  title: "SIG Groups",
  robots: { index: false, follow: false },
};

export default async function AdminSigPage() {
  const [groups, spotlights] = await Promise.all([
    getSigGroups(),
    getSigSpotlights(),
  ]);

  return <SigManager groups={groups} spotlights={spotlights} />;
}
