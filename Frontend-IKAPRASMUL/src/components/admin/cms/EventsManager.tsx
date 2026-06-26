"use client";

import type { AlumniEvent } from "@/types";
import { ResourcePage } from "./ResourcePage";
import { eventsConfig } from "./configs/events";

export function EventsManager({ items }: { items: AlumniEvent[] }) {
  return <ResourcePage config={eventsConfig} initialItems={items} />;
}
