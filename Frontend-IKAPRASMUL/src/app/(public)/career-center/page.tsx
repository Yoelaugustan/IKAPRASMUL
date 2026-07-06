import type { Metadata } from "next";
import { PageHero } from "@/components/layouts/PageHero";
import { CareerCenterTabs } from "@/components/career-center/CareerCenterTabs";
import { getServerDict } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Career Center",
  description:
    "Bridging Prasmul alumni talent and business opportunities with the Career Development Center (CDC) of Universitas Prasetiya Mulya.",
};

export default async function CareerCenterPage() {
  const { t } = await getServerDict();

  return (
    <>
      <PageHero
        eyebrow={t.careerCenter.heroEyebrow}
        title={
          <>
            {t.careerCenter.heroTitleLine1}
            <br />
            <span className="text-gold">{t.careerCenter.heroTitleLine2}</span>
          </>
        }
        subtitle={t.careerCenter.heroSubtitle}
        backgroundImage="/images/career/hero.jpg"
      />

      <CareerCenterTabs />
    </>
  );
}
