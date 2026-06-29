import type { Metadata } from "next";
import { Suspense } from "react";
import { BusinessHero } from "@/components/business/BusinessHero";
import { BusinessExplorer } from "@/components/business/BusinessExplorer";
import { Reveal } from "@/components/shared/Reveal";
import {
  getBusinesses,
  getBusinessPageFeatured,
  getBusinessSpotlight,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Alumni Business",
  description:
    "Built by alumni. For alumni. Discover and connect with ventures founded by the Prasmul alumni community across every industry.",
};

export default async function BusinessPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; industry?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const search = sp.search || undefined;
  const industry = sp.industry || undefined;
  const sort = sp.sort || undefined;

  const [businesses, featuredBusinesses, spotlight] = await Promise.all([
    getBusinesses({ search, industry, sort }),
    getBusinessPageFeatured(),
    getBusinessSpotlight(),
  ]);

  return (
    <>
      <BusinessHero />
      <Reveal>
        <div id="featured-businesses">
          <Suspense fallback={<div className="h-96" />}>
            <BusinessExplorer
              businesses={businesses}
              featuredBusinesses={featuredBusinesses}
              spotlight={spotlight}
            />
          </Suspense>
        </div>
      </Reveal>
    </>
  );
}
