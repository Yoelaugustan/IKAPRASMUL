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
          <div className="mx-auto mb-12 w-fit text-center">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
              {valuesTitle}
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gold" />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-y-10 sm:gap-y-12 lg:grid-cols-4 lg:divide-x lg:divide-gray-200">
          {values.map((value, i) => {
            const Icon = VALUE_ICONS[value] ?? Compass;
            return (
              <Reveal key={value} delay={i * 90}>
                <div className="flex flex-col items-center gap-3 px-8 text-center">
                  <Icon className="size-7 text-gold" strokeWidth={1.5} />
                  <p className="text-sm font-bold uppercase tracking-widest text-primary">
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
