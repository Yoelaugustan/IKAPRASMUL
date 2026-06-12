import Image from "next/image";
import type { HistoryMilestone } from "@/types";

export function HistoryTimeline({
  milestones,
}: {
  milestones: HistoryMilestone[];
}) {
  return (
    <div>
      {/* Campus photo */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <Image
          src="/images/about/campus-building.png"
          alt="Universitas Prasetiya Mulya campus"
          fill
          sizes="(min-width: 1024px) 360px, 100vw"
          className="object-cover"
        />
      </div>

      <h2 className="mt-8 text-xl font-bold uppercase tracking-tight text-primary">
        Our History
      </h2>

      <ol className="relative mt-6 border-l border-gold/40 pl-7">
        {milestones.map((m, i) => (
          <li
            key={m.year}
            className={i < milestones.length - 1 ? "mb-7" : ""}
          >
            <span className="absolute -left-[6px] mt-1 size-[11px] rounded-full bg-gold ring-4 ring-slate-50" />
            <div className="flex gap-4">
              <p className="w-12 shrink-0 text-sm font-bold text-primary">
                {m.year}
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                {m.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
