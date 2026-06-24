"use client";

import type { Story } from "@/types";
import { ResourcePage } from "./ResourcePage";
import { storiesConfig } from "./configs/stories";

export function StoriesManager({ items }: { items: Story[] }) {
  return <ResourcePage config={storiesConfig} initialItems={items} />;
}
