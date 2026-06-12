import { Heart, Navigation, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layouts/Container";

const ITEMS: { label: string; Icon: LucideIcon }[] = [
  { label: "Our Vision", Icon: Navigation },
  { label: "Our Mission", Icon: Zap },
  { label: "Our Purpose", Icon: Heart },
];

export function VisionMissionPurpose({
  vision,
  mission,
  purpose,
}: {
  vision: string;
  mission: string;
  purpose: string;
}) {
  const bodies = [vision, mission, purpose];

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {ITEMS.map(({ label, Icon }, i) => (
            <div
              key={label}
              className="flex flex-col items-center px-8 py-8 text-center"
            >
              <span className="grid size-16 place-items-center rounded-full bg-primary">
                <Icon className="size-7 text-gold" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-foreground">
                {label}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">
                {bodies[i]}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
