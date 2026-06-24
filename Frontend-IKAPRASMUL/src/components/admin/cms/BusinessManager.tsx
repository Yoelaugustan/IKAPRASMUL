"use client";

import type { Business } from "@/types";
import { ResourcePage } from "./ResourcePage";
import { businessConfig } from "./configs/business";

export function BusinessManager({ items }: { items: Business[] }) {
  return <ResourcePage config={businessConfig} initialItems={items} />;
}
