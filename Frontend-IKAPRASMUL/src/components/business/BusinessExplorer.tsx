"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Business } from "@/types";
import { INDUSTRIES } from "@/constants/categories";
import { Input } from "@/components/ui/input";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { EmptyState } from "@/components/shared/EmptyState";
import { BusinessCard } from "./BusinessCard";

// Search (business / founder / company) + Browse-by-Industry tabs over the
// static listing set.
export function BusinessExplorer({ businesses }: { businesses: Business[] }) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return businesses.filter((b) => {
      const matchIndustry = industry === "All" || b.industry === industry;
      const matchQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.founder.name.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q);
      return matchIndustry && matchQuery;
    });
  }, [businesses, query, industry]);

  return (
    <div>
      <div className="relative mb-6 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by business, founder, or location"
          className="pl-9"
          aria-label="Search businesses"
        />
      </div>

      <CategoryTabs
        options={INDUSTRIES}
        value={industry}
        onChange={setIndustry}
        className="mb-8"
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No businesses found"
          description="Try a different search term or industry filter."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <BusinessCard key={b.slug} business={b} />
          ))}
        </div>
      )}
    </div>
  );
}
