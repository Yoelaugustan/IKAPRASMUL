import Image from "next/image";
import {
  Globe,
  Globe2,
  Handshake,
  Landmark,
  Monitor,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getServerDict } from "@/i18n/server";

const ICONS: Record<string, LucideIcon> = {
  founding: Landmark,
  community: Users,
  expansion: Globe,
  entrepreneurship: Handshake,
  digital: Monitor,
  global: Globe2,
};

export async function HistoryTimeline() {
  const { t } = await getServerDict();
  const milestones = t.about.history;

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-4">
      <div className="relative -ml-6 -mr-6 -mt-6 aspect-[16/10] shrink-0 overflow-hidden rounded-t-xl sm:-ml-8 sm:-mr-8 sm:-mt-8 lg:mr-0 lg:-mb-8 lg:aspect-auto lg:w-96 lg:rounded-t-none lg:rounded-l-2xl">
        <Image
          src="/images/about/campus-building.jpg"
          alt="Universitas Prasetiya Mulya campus"
          fill
          sizes="(min-width: 1024px) 384px, 100vw"
          className="object-cover"
        />
      </div>

      {/* Milestone timeline */}
      <div className="min-w-0 flex-1 overflow-x-auto">
        <div className="min-w-[720px] sm:min-w-[840px] lg:pt-2">
          <div className="relative grid grid-cols-6 gap-2">
            <div className="pointer-events-none absolute left-[8.33%] right-[8.33%] top-1/2 h-px -translate-y-1/2 bg-primary" />
            {milestones.map((m, i) => {
              const gold = i % 2 === 1;
              return (
                <div key={m.year} className="flex justify-center">
                  <span
                    className={`relative z-10 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                      gold ? "bg-gold text-gold-foreground" : "bg-primary text-white"
                    }`}
                  >
                    {m.year}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stems connecting the badges to the icon row */}
          <div className="grid grid-cols-6 gap-2">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex justify-center">
                <span className={`h-3 w-px ${i % 2 === 1 ? "bg-gold" : "bg-primary"}`} />
              </div>
            ))}
          </div>

          {/* Icons, threaded together by a single connecting line */}
          <div className="relative grid grid-cols-6 gap-2">
            <div className="pointer-events-none absolute left-[8.33%] right-[8.33%] top-1/2 h-px -translate-y-1/2 bg-gold/40" />
            {milestones.map((m, i) => {
              const Icon = ICONS[m.icon] ?? Landmark;
              const gold = i % 2 === 1;
              return (
                <div key={m.year} className="flex justify-center">
                  <span className="relative z-10 grid size-11 place-items-center rounded-full bg-slate-50 ring-1 ring-slate-100 sm:size-12">
                    <Icon
                      className={`size-5 ${gold ? "text-gold-dark" : "text-primary"}`}
                      strokeWidth={1.75}
                    />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Labels */}
          <div className="grid grid-cols-6 gap-2">
            {milestones.map((m) => (
              <div key={m.year} className="mt-3 px-1 text-center">
                <p className="text-xs font-bold leading-snug text-primary sm:text-[13px]">
                  {m.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
