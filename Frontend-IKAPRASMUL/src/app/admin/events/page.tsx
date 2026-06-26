import type { Metadata } from "next";
import { getAdminEvents } from "@/lib/adminContent";
import { EventsManager } from "@/components/admin/cms/EventsManager";

export const metadata: Metadata = {
  title: "Events",
  robots: { index: false, follow: false },
};

export default async function AdminEventsPage() {
  const items = await getAdminEvents();
  return <EventsManager items={items} />;
}
