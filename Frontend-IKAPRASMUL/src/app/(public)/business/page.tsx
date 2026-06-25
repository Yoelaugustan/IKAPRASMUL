import type { Metadata } from "next";
import { BusinessHero } from "@/components/business/BusinessHero";
import { BusinessExplorer } from "@/components/business/BusinessExplorer";
import { Reveal } from "@/components/shared/Reveal";
import { getBusinesses, getBusinessPageFeatured } from "@/lib/content";

export const metadata: Metadata = {
  title: "Alumni Business",
  description:
    "Built by alumni. For alumni. Discover and connect with ventures founded by the Prasmul alumni community across every industry.",
};

export default async function BusinessPage() {
  const [businesses, featuredBusinesses] = await Promise.all([
    getBusinesses(),
    getBusinessPageFeatured(),
  ]);

  return (
    <>
      <BusinessHero />
      <Reveal>
        <div id="featured-businesses">
          <BusinessExplorer businesses={businesses} featuredBusinesses={featuredBusinesses} />
        </div>
      </Reveal>
    </>
  );
}
