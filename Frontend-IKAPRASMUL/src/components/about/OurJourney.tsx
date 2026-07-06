import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { HistoryTimeline } from "./HistoryTimeline";
import { WorldMapGraphic } from "./WorldMapGraphic";
import { getServerDict } from "@/i18n/server";

export async function OurJourney() {
  const { t } = await getServerDict();
  const { journeyEyebrow, journeyTitle, journeyP1, journeyP2 } = t.about;

  return (
    <section id="our-journey" className="scroll-mt-[150px] bg-slate-50 py-16 sm:py-20">
      <Container>
        <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
              {journeyEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-primary sm:text-3xl">
              {journeyTitle}
            </h2>
            <span className="mt-4 block h-1 w-16 rounded-full bg-gold" />
            <p className="mt-5 text-[15px] leading-7 text-muted-foreground">
              {journeyP1}
            </p>
            <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
              {journeyP2}
            </p>
          </div>

          <WorldMapGraphic />
        </Reveal>

        <Reveal delay={100} className="mt-14 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <HistoryTimeline />
        </Reveal>
      </Container>
    </section>
  );
}
