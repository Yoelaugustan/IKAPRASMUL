import type { Metadata } from "next";
import { PageHero } from "@/components/layouts/PageHero";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { ImpactStats } from "@/components/layouts/ImpactStats";
import { VisionMission } from "@/components/about/VisionMission";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutPillars } from "@/components/about/AboutPillars";
import { HistoryTimeline } from "@/components/about/HistoryTimeline";
import { GovernanceStructure } from "@/components/about/GovernanceStructure";
import { getServerDict } from "@/i18n/server";

export const metadata: Metadata = {
  title: "About IKAPRASMUL",
  description:
    "Empowering alumni. Enabling impact. IKAPRASMUL's vision, mission, values, strategic pillars, history, and the people who lead the Prasmul alumni association.",
};

export default async function AboutPage() {
  const { t } = await getServerDict();

  return (
    <>
      <PageHero
        eyebrow={t.about.heroEyebrow}
        title={
          <>
            {t.about.heroTitleLine1}
            <br />
            <span className="text-gold">{t.about.heroTitleLine2}</span>
          </>
        }
        subtitle={t.about.heroSubtitle}
        backgroundImage="/images/about/hero-building.jpg"
        overlap
      />

      <ImpactStats overlap />

      <VisionMission />

      <AboutValues />

      <AboutPillars />

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <Reveal className="grid gap-12 lg:grid-cols-[340px_1fr] lg:gap-16">
            <HistoryTimeline />
            <GovernanceStructure />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
