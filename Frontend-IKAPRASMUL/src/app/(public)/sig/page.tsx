import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layouts/PageHero";
import { ImpactStats } from "@/components/layouts/ImpactStats";
import { SigDescription } from "@/components/sig/SigDescription";
import { WhatYouCanDo } from "@/components/sig/WhatYouCanDo";
import { SigGroupsGrid } from "@/components/sig/SigGroupsGrid";
import { SigSpotlight } from "@/components/sig/SigSpotlight";
import { ContactCtaButton } from "@/components/contact/ContactCtaButton";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { getSigGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shared Interest Groups",
  description:
    "Connect. Share. Grow. Through shared interests. Discover Prasmul alumni Shared Interest Groups — from PGPM to Runners Club, Financial Club, and more.",
};

export default async function SigPage() {
  const groups = await getSigGroups();

  return (
    <>
      {/* 1. Hero with background image + overlapping stats */}
      <PageHero
        eyebrow="SIG (Shared Interest Group)"
        title={
          <>
            Connect. Share. Grow.
            <br />
            <span className="text-gold">Through Shared Interests.</span>
          </>
        }
        subtitle="SIG (Shared Interest Group) is a platform for Prasetiya Mulya alumni to discuss, share, and learn about topics, hobbies, and activities they are passionate about."
        backgroundImage="/images/sig/hero-banner.jpg"
        overlap
      >
        <ContactCtaButton
          subject="Contact Alumni Network"
          variant="gold"
          size="lg"
        >
          Contact Alumni Network <ArrowRight className="ml-1 size-4" />
        </ContactCtaButton>
      </PageHero>

      {/* 2. Impact Stats overlapping the hero */}
      <ImpactStats overlap />

      {/* 3. Description + CTA card */}
      <SigDescription />

      {/* 4. What You Can Do — gold bar */}
      <WhatYouCanDo />

      {/* 5. SIG Groups + Spotlight side by side */}
      <section className="py-16 sm:py-20 bg-[#f8fafc] border-t border-slate-100/50">
        <Container>
          <Reveal className="grid items-start gap-12 lg:grid-cols-[1fr_340px]">
            {/* Left: groups heading + grid */}
            <div>
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-bold uppercase tracking-wide text-[#00396c]">
                  Our Shared Interest Groups
                </h2>
                {/* <ContactCtaButton
                  subject="Create a SIG"
                  variant="outline"
                  className="flex items-center gap-2 bg-white border border-slate-300 text-slate-800 font-semibold px-5 py-2.5 h-11 rounded-lg text-sm shadow-xs hover:bg-slate-50 transition-colors"
                >
                  <UserPlus className="size-4 text-slate-600" />
                  <span>Create a SIG</span>
                  <ArrowRight className="size-4 text-slate-600 ml-1" />
                </ContactCtaButton> */}
              </div>
              <SigGroupsGrid groups={groups} />
            </div>

            {/* Right: SIG Spotlight sidebar */}
            <aside>
              <SigSpotlight />
            </aside>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

