import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { MissionIcon, VisionIcon } from "@/components/icons";

export function VisionMission({
  vision,
  mission,
}: {
  vision: string;
  mission: string[];
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {/* Vision */}
          <div className="flex flex-col items-center px-8 py-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-primary">
              <VisionIcon className="size-7 text-gold" />
            </span>
            <h3 className="mt-5 text-base font-bold uppercase tracking-[0.12em] text-foreground sm:text-lg">
              Our Vision
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-7 text-muted-foreground sm:text-base">
              {vision}
            </p>
          </div>

          {/* Mission */}
          <div className="flex flex-col items-center px-8 py-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-primary">
              <MissionIcon className="size-7 text-gold" />
            </span>
            <h3 className="mt-5 text-base font-bold uppercase tracking-[0.12em] text-foreground sm:text-lg">
              Our Mission
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
