import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { AboutImpactSection } from "./AboutImpactSection";
import { GovernanceDocumentsCarousel } from "./GovernanceDocumentsCarousel";
import { getServerDict } from "@/i18n/server";

export async function GovernanceDocuments() {
  const { t } = await getServerDict();
  const { govDocsEyebrow, govDocsTitle } = t.about;

  return (
    <section id="governance" className="scroll-mt-[150px] py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
            {govDocsEyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
            {govDocsTitle}
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-gold" />
        </Reveal>

        <div className="mt-10">
          <GovernanceDocumentsCarousel />
        </div>
      </Container>

      <div className="mt-16">
        <AboutImpactSection />
      </div>
    </section>
  );
}
