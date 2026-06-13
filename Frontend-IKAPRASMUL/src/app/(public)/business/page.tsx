import type { Metadata } from "next";
import { BusinessHero } from "@/components/business/BusinessHero";
import { BusinessExplorer } from "@/components/business/BusinessExplorer";
import { getBusinesses } from "@/lib/content";

export const metadata: Metadata = {
  title: "Alumni Business",
  description:
    "Built by alumni. For alumni. Discover and connect with ventures founded by the Prasmul alumni community across every industry.",
};

export default async function BusinessPage() {
  const businesses = await getBusinesses();

  return (
    <>
      <BusinessHero />
      <div id="featured-businesses">
        <BusinessExplorer businesses={businesses} />
      </div>
    </>
  );
}
