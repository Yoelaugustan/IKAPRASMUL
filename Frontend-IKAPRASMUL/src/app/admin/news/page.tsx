import type { Metadata } from "next";
import { getArticles } from "@/lib/content";
import { NewsManager } from "@/components/admin/cms/NewsManager";

export const metadata: Metadata = {
  title: "News & Insights",
  robots: { index: false, follow: false },
};

export default async function AdminNewsPage() {
  const items = await getArticles();
  return <NewsManager items={items} />;
}
