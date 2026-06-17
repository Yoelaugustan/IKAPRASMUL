import Image from "next/image";
import { getServerDict } from "@/i18n/server";

export async function HistoryTimeline() {
  const { t } = await getServerDict();
  const milestones = t.about.history;
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
        {t.about.historyTitle}
      </h2>

      <ol className="relative mt-6 border-l border-gold/40 pl-7">
        {milestones.map((m, i) => (
          <li
            key={m.year}
            className={`relative ${i < milestones.length - 1 ? "mb-6" : ""}`}
          >
            <span className="absolute -left-[34px] mt-1 size-[11px] rounded-full bg-gold ring-4 ring-slate-50" />
            <p className="text-sm font-bold text-primary">{m.year}</p>
            <p className="mt-0.5 text-sm leading-6 text-muted-foreground">
              {m.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
