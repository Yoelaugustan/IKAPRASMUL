import type { Metadata } from "next";
import { getStories } from "@/lib/content";
import { StoriesManager } from "@/components/admin/cms/StoriesManager";

export const metadata: Metadata = {
  title: "Alumni Stories",
  robots: { index: false, follow: false },
};

export default async function AdminStoriesPage() {
  const items = await getStories();
  return <StoriesManager items={items} />;
}
