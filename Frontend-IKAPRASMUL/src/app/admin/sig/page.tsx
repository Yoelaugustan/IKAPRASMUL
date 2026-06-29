import type { Metadata } from "next";
import { getAdminSigGroups, getAdminSigSpotlights } from "@/lib/adminContent";
import { SigManager } from "@/components/admin/cms/SigManager";

export const metadata: Metadata = {
  title: "SIG",
  robots: { index: false, follow: false },
};

export default async function AdminSigPage() {
  const [groups, spotlights] = await Promise.all([
    getAdminSigGroups(),
    getAdminSigSpotlights(),
  ]);

  return <SigManager groups={groups} spotlights={spotlights} />;
}
