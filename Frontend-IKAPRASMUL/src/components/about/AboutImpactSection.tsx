import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImpactStats } from "@/lib/content";
import { getServerDict } from "@/i18n/server";
import { Container } from "@/components/layouts/Container";
import { CountUp } from "@/components/shared/CountUp";
import { ROUTES } from "@/constants/routes";
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

export async function AboutImpactSection() {
  const [stats, { t }] = await Promise.all([getImpactStats(), getServerDict()]);
  const { ourImpactEyebrow, ourImpactTitle, ourImpactDesc, ourImpactCta } = t.about;

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-2xl ring-1 ring-white/10">
          <div
            className="pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat opacity-[0.06]"
            style={{ backgroundImage: "url(/images/about/dotted-world-map.png)" }}
          />

          <div
            translate="no"
            className="notranslate relative grid gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-12"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
                {ourImpactEyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
                {ourImpactTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
                {ourImpactDesc}
              </p>
              <Link
                href={ROUTES.sig}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-bold text-gold-foreground transition-colors hover:bg-gold-dark"
              >
                {ourImpactCta} <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
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
        </div>
      </Container>
    </div>
  );
}
