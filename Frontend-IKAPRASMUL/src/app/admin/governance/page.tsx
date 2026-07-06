import type { Metadata } from "next";
import { getAdminGovernanceDocuments } from "@/lib/adminContent";
import { GovernanceDocumentsManager } from "@/components/admin/cms/GovernanceDocumentsManager";

export const metadata: Metadata = {
  title: "Governance Documents",
  robots: { index: false, follow: false },
};

export default async function AdminGovernancePage() {
  const items = await getAdminGovernanceDocuments();
  return <GovernanceDocumentsManager items={items} />;
}
