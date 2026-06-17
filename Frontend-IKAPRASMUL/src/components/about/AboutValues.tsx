import {
  Compass,
  Network,
  Target,
  HandHeart,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { getServerDict } from "@/i18n/server";

// One icon per value (the four C's). Falls back to Compass if a value is renamed.
const VALUE_ICONS: Record<string, LucideIcon> = {
  Character: Compass,
  Competency: Target,
  Connectivity: Network,
  Contribution: HandHeart,
};

export async function AboutValues() {
  const { t } = await getServerDict();
  const { valuesTitle, values } = t.about;
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto mb-10 w-fit text-center">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
              {valuesTitle}
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gold" />
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => {
            const Icon = VALUE_ICONS[value] ?? Compass;
            return (
              <Reveal key={value} delay={i * 90} className="h-full">
                <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-primary/10 bg-white px-6 py-8 text-center transition-[transform,box-shadow] duration-300 hover:scale-[1.04] hover:shadow-lg">
                  <Icon className="size-8 text-gold" strokeWidth={1.5} />
                  <p className="text-base font-bold uppercase tracking-wide text-primary sm:text-lg">
                    {value}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
