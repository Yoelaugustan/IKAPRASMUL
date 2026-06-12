import type { Metadata } from "next";
import { PageHero } from "@/components/layouts/PageHero";
import { Container } from "@/components/layouts/Container";
import { ImpactStats } from "@/components/layouts/ImpactStats";
import { VisionMissionPurpose } from "@/components/about/VisionMissionPurpose";
import { HistoryTimeline } from "@/components/about/HistoryTimeline";
import { GovernanceStructure } from "@/components/about/GovernanceStructure";
import { getAboutContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About IKAPRASMUL",
  description:
    "Empowering alumni. Enabling impact. Learn about IKAPRASMUL's vision, mission, history, and the people who lead the Prasmul alumni association.",
};

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <>
      <PageHero
        eyebrow="About IKAPRASMUL"
        title={
          <>
            Empowering Alumni.
            <br />
            <span className="text-gold">Enabling Impact.</span>
          </>
        }
        subtitle="IKAPRASMUL is the official alumni association of Universitas Prasetiya Mulya, committed to building a lifelong ecosystem that connects, grows, and empowers alumni to create meaningful impact for Indonesia and the world."
        backgroundImage="/images/about/hero-building.jpg"
        overlap
      />

      <ImpactStats overlap />

      <VisionMissionPurpose
        vision={about.vision}
        mission={about.mission}
        purpose={about.purpose}
      />

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[340px_1fr] lg:gap-16">
            <HistoryTimeline milestones={about.history} />
            <GovernanceStructure
              executiveBoard={about.executiveBoard}
              boardMembers={about.boardMembers}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
