"use client";

import type { Article } from "@/types";
import { ResourcePage } from "./ResourcePage";
import { newsConfig } from "./configs/news";
import { useLang } from "@/components/shared/LanguageProvider";

export function NewsManager({ items }: { items: Article[] }) {
  const { t } = useLang();
  return <ResourcePage config={newsConfig(t.admin)} initialItems={items} />;
}
