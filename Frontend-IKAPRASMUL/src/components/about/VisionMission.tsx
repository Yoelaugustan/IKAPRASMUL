import { Check, Flag, HandHeart, Telescope } from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { getServerDict } from "@/i18n/server";

export async function VisionMission() {
  const { t } = await getServerDict();
  const { ourVision, ourMission, ourPurpose, vision, mission, purpose } = t.about;
  return (
    <section id="vision-mission" className="scroll-mt-[150px] bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-8 py-9 text-center shadow-sm">
            <span className="grid size-16 place-items-center rounded-full bg-primary">
              <Telescope className="size-7 text-gold" />
            </span>
            <span className="mt-4 block h-1 w-10 rounded-full bg-gold" />
            <h3 className="mt-4 text-base font-bold uppercase tracking-[0.12em] text-foreground sm:text-lg">
              {ourVision}
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-7 text-muted-foreground sm:text-base">
              {vision}
            </p>
          </Reveal>

          <Reveal delay={80} className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-8 py-9 text-center shadow-sm">
            <span className="grid size-16 place-items-center rounded-full bg-primary">
              <Flag className="size-7 text-gold" />
            </span>
            <span className="mt-4 block h-1 w-10 rounded-full bg-gold" />
            <h3 className="mt-4 text-base font-bold uppercase tracking-[0.12em] text-foreground sm:text-lg">
              {ourMission}
            </h3>
            <ol className="mt-3 max-w-md space-y-3 text-left">
              {mission.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15px] leading-7 text-muted-foreground sm:text-base"
                >
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-gold/15 text-xs font-bold leading-none text-gold-dark">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={160} className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-8 py-9 text-center shadow-sm">
            <span className="grid size-16 place-items-center rounded-full bg-primary">
              <HandHeart className="size-7 text-gold" />
            </span>
            <span className="mt-4 block h-1 w-10 rounded-full bg-gold" />
            <h3 className="mt-4 text-base font-bold uppercase tracking-[0.12em] text-foreground sm:text-lg">
              {ourPurpose}
            </h3>
            <ol className="mt-3 max-w-md space-y-3 text-left">
              {purpose.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-[15px] leading-7 text-muted-foreground sm:text-base"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
