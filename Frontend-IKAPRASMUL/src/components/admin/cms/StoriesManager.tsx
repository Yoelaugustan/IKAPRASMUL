"use client";

import type { Story } from "@/types";
import { ResourcePage } from "./ResourcePage";
import { storiesConfig } from "./configs/stories";
import { useLang } from "@/components/shared/LanguageProvider";

export function StoriesManager({ items }: { items: Story[] }) {
  const { t } = useLang();
  return <ResourcePage config={storiesConfig(t.admin)} initialItems={items} />;
}
