import { Container } from "@/components/layouts/Container";
import {
  BulbIcon,
  EarthIcon,
  FilmIcon,
  GatherIcon,
  GlobeThinIcon,
} from "@/components/icons";

const ITEMS = [
  {
    title: "Gatherings & Networking",
    Icon: GatherIcon,
  },
  {
    title: "Webinars & Knowledge Sharing",
    Icon: FilmIcon,
  },
  {
    title: "Social & Community Activities",
    Icon: GlobeThinIcon,
  },
  {
    title: "Skill Development & Learning",
    Icon: BulbIcon,
  },
  {
    title: "Create Bigger Impact",
    subtitle: "With Alumni Network Support",
    Icon: EarthIcon,
  },
];

export function WhatYouCanDo() {
  return (
    <section className="pb-16">
      <Container>
        <div className="rounded-2xl bg-[#00396c] p-8 md:p-10 text-white shadow-xl">
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] text-gold">
            What You Can Do in a SIG
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            {ITEMS.map(({ title, subtitle, Icon }) => (
              <div key={title} className="flex flex-col items-start gap-4">
                <Icon className="size-6 text-gold shrink-0" />
                <div className="space-y-1">
                  <h4 className="whitespace-nowrap text-[15px] font-medium text-white leading-snug">
                    {title}
                  </h4>
                  {subtitle && (
                    <p className="text-[13px] leading-normal text-white/70">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
