import type { Metadata } from "next";
import { getAdminStories } from "@/lib/adminContent";
import { StoriesManager } from "@/components/admin/cms/StoriesManager";

export const metadata: Metadata = {
  title: "Alumni Stories",
  robots: { index: false, follow: false },
};

export default async function AdminStoriesPage() {
  const items = await getAdminStories();
  return <StoriesManager items={items} />;
}
