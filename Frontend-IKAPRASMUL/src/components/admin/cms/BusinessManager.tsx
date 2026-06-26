"use client";

import type { Business } from "@/types";
import { ResourcePage } from "./ResourcePage";
import { businessConfig } from "./configs/business";
import { useLang } from "@/components/shared/LanguageProvider";

export function BusinessManager({ items }: { items: Business[] }) {
  const { t } = useLang();
  return <ResourcePage config={businessConfig(t.admin)} initialItems={items} />;
}
