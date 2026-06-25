import type { Metadata } from "next";
import { getAdminArticles } from "@/lib/adminContent";
import { NewsManager } from "@/components/admin/cms/NewsManager";

export const metadata: Metadata = {
  title: "News & Insights",
  robots: { index: false, follow: false },
};

export default async function AdminNewsPage() {
  const items = await getAdminArticles();
  return <NewsManager items={items} />;
}
