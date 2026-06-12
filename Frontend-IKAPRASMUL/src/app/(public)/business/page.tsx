import type { Metadata } from "next";
import { PageHero } from "@/components/layouts/PageHero";
import { Section } from "@/components/layouts/Section";
import { BusinessExplorer } from "@/components/business/BusinessExplorer";
import { BusinessSpotlight } from "@/components/business/BusinessSpotlight";
import { CtaBand } from "@/components/shared/CtaBand";
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
      <PageHero
        eyebrow="Alumni Business"
        title="Built By Alumni. For Alumni."
        subtitle="Discover ventures founded by Prasmul alumni — and support the community that builds with you."
      />

      <Section
        eyebrow="Featured Businesses"
        title="Explore the directory"
        description="Search and browse by industry to find alumni-led businesses."
      >
        <BusinessExplorer businesses={businesses} />
      </Section>

      <BusinessSpotlight />

      <CtaBand
        title="Run an alumni business?"
        description="Request a listing and the alumni network will add your business to the directory."
        buttonLabel="List Your Business"
        subject="List Your Business"
      />
    </>
  );
}
