import { getImpactStats } from "@/lib/content";
import { Container } from "./Container";
import { CountUp } from "@/components/shared/CountUp";
import {
  CalendarCheckIcon,
  GlobeIcon,
  RocketIcon,
  UsersIcon,
} from "@/components/icons";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  alumni: UsersIcon,
  countries: GlobeIcon,
  entrepreneurs: RocketIcon,
  events: CalendarCheckIcon,
};

// "Our Impact in Numbers" — a navy card. With `overlap` it pulls up to sit over
// the bottom of the hero above it (Home, About); otherwise it sits inline with
// its own vertical spacing (SIG). Server Component.
export async function ImpactStats({ overlap = false }: { overlap?: boolean }) {
  const stats = await getImpactStats();
  return (
    <div
      className={
        overlap ? "relative z-10 -mt-28 sm:-mt-32" : "py-12 sm:py-16"
      }
    >
      <Container>
        <div className="rounded-2xl bg-primary px-6 py-8 text-primary-foreground shadow-2xl ring-1 ring-white/10 sm:px-10">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/90">
            Our Impact in Numbers
          </h2>
          <div className="mt-7 grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
            {stats.map((stat) => {
              const Icon = ICONS[stat.key] ?? UsersIcon;
              return (
                <div key={stat.key} className="px-4 text-center">
                  <Icon className="mx-auto size-7 text-gold" />
                  <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary-foreground/60">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
