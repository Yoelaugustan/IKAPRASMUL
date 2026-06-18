import { getImpactStats } from "@/lib/content";
import { getServerDict } from "@/i18n/server";
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
  sig: GlobeIcon,
  entrepreneurs: RocketIcon,
  events: CalendarCheckIcon,
};

export async function ImpactStats({ overlap = false }: { overlap?: boolean }) {
  const [stats, { t }] = await Promise.all([getImpactStats(), getServerDict()]);
  return (
    <div
      className={
        overlap ? "relative z-10 -mt-28 sm:-mt-32" : "py-12 sm:py-16"
      }
    >
      <Container>
        <div className="rounded-2xl bg-primary px-6 py-8 text-primary-foreground shadow-2xl ring-1 ring-white/10 sm:px-10">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/90">
            {t.impact.title}
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
                    {t.impact.labels[stat.key] ?? stat.label}
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
