import type { Metadata } from "next";
import { getBusinesses } from "@/lib/content";
import { BusinessManager } from "@/components/admin/cms/BusinessManager";

export const metadata: Metadata = {
  title: "Alumni Business",
  robots: { index: false, follow: false },
};

export default async function AdminBusinessPage() {
  const items = await getBusinesses();
  return <BusinessManager items={items} />;
}
