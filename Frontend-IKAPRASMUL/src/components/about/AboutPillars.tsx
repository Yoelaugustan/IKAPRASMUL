import {
  Landmark,
  Briefcase,
  Handshake,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { getServerDict } from "@/i18n/server";

// One icon per pillar, in order (governance, career, partnership, education,
// community). Indexed because the pillar names are long.
const PILLAR_ICONS: LucideIcon[] = [
  Landmark,
  Briefcase,
  Handshake,
  GraduationCap,
  Users,
];

export async function AboutPillars() {
  const { t } = await getServerDict();
  const { pillarsTitle, pillarLabel, impactLegacy, pillars } = t.about;
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto mb-10 w-fit text-center">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
              {pillarsTitle}
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gold" />
          </div>
        </Reveal>

        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6">
          {pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i] ?? Landmark;
            return (
              <Reveal
                key={pillar.name}
                delay={i * 80}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <div className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                  <div className="flex items-center gap-3.5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-gold">
                      <Icon className="size-6" strokeWidth={1.5} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">
                      {pillarLabel} {i + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold leading-snug text-primary">
                    {pillar.name}
                  </h3>

                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gold/80">
                      {impactLegacy}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
