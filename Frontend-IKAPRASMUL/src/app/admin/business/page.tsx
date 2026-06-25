import type { Metadata } from "next";
import { getAdminBusinesses } from "@/lib/adminContent";
import { BusinessManager } from "@/components/admin/cms/BusinessManager";

export const metadata: Metadata = {
  title: "Alumni Business",
  robots: { index: false, follow: false },
};

export default async function AdminBusinessPage() {
  const items = await getAdminBusinesses();
  return <BusinessManager items={items} />;
}
