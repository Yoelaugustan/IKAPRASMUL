import type { Metadata } from "next";
import Link from "next/link";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutSubNav } from "@/components/about/AboutSubNav";
import { VisionMission } from "@/components/about/VisionMission";
import { OurJourney } from "@/components/about/OurJourney";
import { BoardSection } from "@/components/about/BoardSection";
import { OrganizationStructureChart } from "@/components/about/OrganizationStructureChart";
import { GovernanceDocuments } from "@/components/about/GovernanceDocuments";
import { AboutContactSection } from "@/components/about/AboutContactSection";
import {
  EXECUTIVE_BOARD,
  DEWAN_PELINDUNG,
  DEWAN_PENASIHAT,
  DEWAN_PAKAR,
  DEWAN_PENYANTUN,
} from "@/data/about";
import { getServerDict } from "@/i18n/server";

export const metadata: Metadata = {
  title: "About IKAPRASMUL",
  description:
    "Empowering alumni. Enabling impact. IKAPRASMUL's vision, mission, history, governing bodies, organization structure, and governance documents.",
};

export default async function AboutPage() {
  const { t } = await getServerDict();

  return (
    <div className="bg-[#F8FAFC]">
      <AboutHero
        eyebrow={t.about.heroEyebrow}
        title={
          <>
            {t.about.heroTitleLine1}
            <br />
            <span className="text-gold">{t.about.heroTitleLine2}</span>
          </>
        }
        subtitle={t.about.heroSubtitle}
      >
        <Link
          href="#vision-mission"
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-bold text-gold-foreground transition-colors hover:bg-gold-dark"
        >
          {t.about.exploreOrg}
        </Link>
      </AboutHero>

      <AboutSubNav />

      <VisionMission />

      <OurJourney />

      <BoardSection id="executive-board" title={t.about.subNav.executiveBoard} members={EXECUTIVE_BOARD} />
      <BoardSection id="dewan-pelindung" title={t.about.subNav.dewanPelindung} members={DEWAN_PELINDUNG} tint />
      <BoardSection id="dewan-penasihat" title={t.about.subNav.dewanPenasihat} members={DEWAN_PENASIHAT} />
      <BoardSection id="dewan-pakar" title={t.about.subNav.dewanPakar} members={DEWAN_PAKAR} tint />
      <BoardSection id="dewan-penyantun" title={t.about.subNav.dewanPenyantun} members={DEWAN_PENYANTUN} />

      <OrganizationStructureChart />

      <GovernanceDocuments />

      <AboutContactSection />
    </div>
  );
}
