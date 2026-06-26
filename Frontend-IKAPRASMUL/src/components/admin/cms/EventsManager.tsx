"use client";

import type { AlumniEvent } from "@/types";
import { ResourcePage } from "./ResourcePage";
import { eventsConfig } from "./configs/events";
import { useLang } from "@/components/shared/LanguageProvider";

export function EventsManager({ items }: { items: AlumniEvent[] }) {
  const { t } = useLang();
  return <ResourcePage config={eventsConfig(t.admin)} initialItems={items} />;
}
