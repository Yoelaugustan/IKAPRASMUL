import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import {
  BulbIcon,
  EarthIcon,
  FilmIcon,
  GatherIcon,
  GlobeThinIcon,
} from "@/components/icons";
import { getServerDict } from "@/i18n/server";

// Icons stay here (structural); the activity titles come from the dictionary,
// matched by position to t.sig.activities.
const ICONS = [GatherIcon, FilmIcon, GlobeThinIcon, BulbIcon, EarthIcon];

export async function WhatYouCanDo() {
  const { t } = await getServerDict();
  return (
    <section className="pb-16">
      <Container>
        <Reveal className="rounded-2xl bg-[#00396c] p-8 md:p-10 text-white shadow-xl">
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] text-gold">
            {t.sig.whatYouCanDo}
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {t.sig.activities.map(({ title, subtitle }, i) => {
              const Icon = ICONS[i] ?? GatherIcon;
              return (
                <div key={title} className="flex flex-col items-start gap-4">
                  <Icon className="size-6 text-gold shrink-0" />
                  <div className="space-y-1">
                    <h4 className="text-[15px] font-medium text-white leading-snug">
                      {title}
                    </h4>
                    {subtitle && (
                      <p className="text-[13px] leading-normal text-white/70">
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
