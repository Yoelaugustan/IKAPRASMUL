import {
  Landmark,
  Briefcase,
  Handshake,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Pillar } from "@/types";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";

// One icon per pillar, in order (governance, career, partnership, education,
// community). Indexed because the pillar names are long.
const PILLAR_ICONS: LucideIcon[] = [
  Landmark,
  Briefcase,
  Handshake,
  GraduationCap,
  Users,
];

export function AboutPillars({ pillars }: { pillars: Pillar[] }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto mb-10 w-fit text-center">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
              Pilar Strategis
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gold" />
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i] ?? Landmark;
            return (
            <Reveal key={pillar.name} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/5">
                    <Icon className="size-5 text-gold" strokeWidth={1.5} />
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-widest text-gold">
                    Pilar {i + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-[15px] font-bold leading-snug text-primary">
                  {pillar.name}
                </h3>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold/80">
                    Impact &amp; Legacy
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {pillar.impact}
                  </p>
                </div>
              </div>
            </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
