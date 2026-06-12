import { getImpactStats } from "@/lib/content";
import { Container } from "./Container";

// Filled icon SVGs for the impact band (Lucide icons are outline-only;
// these custom paths match the same shapes but render as solid fills).
function AlumniIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="mx-auto size-7 text-gold" aria-hidden>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="mx-auto size-7 text-gold" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="mx-auto size-7 text-gold" aria-hidden>
      <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.65 1.8-.5l1.34.21zM11.17 17c-.51.51-.59 1.31-.16 1.9L13 21l4.05-4.05c.47-.47.65-1.15.5-1.8l-.21-1.34C17.05 14.1 13.79 15.5 11.17 17zM21 2.69c-4.04-.55-7.39.98-9.57 3.16-.44.44-3.34 3.55-3.34 3.55l4.65 4.65s3.11-2.9 3.55-3.34c2.18-2.18 3.71-5.53 3.16-9.57l.55-.45zM9.88 15.53l-1.41-1.41L5 17.59 3.5 19.09c-.2.2-.2.51 0 .71l.71.71c.2.2.51.2.71 0L6.41 19l3.47-3.47z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="mx-auto size-7 text-gold" aria-hidden>
      <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13zm-5-9H7v2h8v-2zm-4 4H7v2h4v-2z" />
    </svg>
  );
}

const ICONS: Record<string, () => React.JSX.Element> = {
  alumni: AlumniIcon,
  countries: GlobeIcon,
  entrepreneurs: RocketIcon,
  events: CalendarIcon,
};

// "Our Impact in Numbers" — a navy card. With `overlap` it pulls up to sit over
// the bottom of the hero above it (Home, About); otherwise it sits inline with
// its own vertical spacing (SIG). Server Component.
export async function ImpactStats({ overlap = false }: { overlap?: boolean }) {
  const stats = await getImpactStats();
  return (
    <div
      className={
        overlap
          ? "relative z-10 -mt-28 sm:-mt-32"
          : "py-12 sm:py-16"
      }
    >
      <Container>
        <div className="rounded-2xl bg-primary px-6 py-8 text-primary-foreground shadow-2xl ring-1 ring-white/10 sm:px-10">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/90">
            Our Impact in Numbers
          </h2>
          <div className="mt-7 grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
            {stats.map((stat) => {
              const Icon = ICONS[stat.key] ?? AlumniIcon;
              return (
                <div key={stat.key} className="px-4 text-center">
                  <Icon />
                  <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    {stat.value}
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
