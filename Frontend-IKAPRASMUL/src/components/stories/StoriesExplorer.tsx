"use client";

import { useMemo, useState } from "react";
import type { Story } from "@/types";
import { STORY_CATEGORIES } from "@/constants/categories";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { StoryCard } from "./StoryCard";
import { EmptyState } from "@/components/shared/EmptyState";

// Client explorer: category tabs + filtered grid. Receives the full list from
// the server page (static data) and filters in memory.
export function StoriesExplorer({ stories }: { stories: Story[] }) {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () =>
      category === "All"
        ? stories
        : stories.filter((s) => s.category === category),
    [stories, category],
  );

  return (
    <div>
      <CategoryTabs
        options={STORY_CATEGORIES}
        value={category}
        onChange={setCategory}
        className="mb-8"
      />
      {filtered.length === 0 ? (
        <EmptyState
          title="No stories yet"
          description="There are no stories in this category right now. Check back soon."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}
