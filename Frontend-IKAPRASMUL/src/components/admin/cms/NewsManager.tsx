"use client";

import type { Article } from "@/types";
import { ResourcePage } from "./ResourcePage";
import { newsConfig } from "./configs/news";

export function NewsManager({ items }: { items: Article[] }) {
  return <ResourcePage config={newsConfig} initialItems={items} />;
}
