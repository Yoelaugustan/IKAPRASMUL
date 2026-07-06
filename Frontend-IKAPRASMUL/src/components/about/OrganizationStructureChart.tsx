import { FileText, User, Wallet } from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { ORG_CHART_DEPARTMENTS } from "@/data/orgChart";
import { getServerDict } from "@/i18n/server";

function Pill({ children, variant }: { children: React.ReactNode; variant: "navy" | "gold" }) {
  return (
    <div
      className={`mx-auto w-full max-w-md rounded-lg py-3 text-center text-sm font-bold uppercase tracking-wide sm:max-w-lg ${
        variant === "navy" ? "bg-primary text-white" : "bg-gold text-gold-foreground"
      }`}
    >
      {children}
    </div>
  );
}

function Stem() {
  return <div className="mx-auto h-6 w-px bg-gold/50" />;
}

function centersForColumns(n: number) {
  return Array.from({ length: n }, (_, i) => ((i + 0.5) / n) * 100);
}

function Connector({ from, to }: { from: number; to: number[] }) {
  const left = Math.min(...to);
  const right = Math.max(...to);
  return (
    <div className="relative h-7">
      <div
        className="absolute top-0 h-1/2 w-px bg-gold"
        style={{ left: `${from}%` }}
      />
      <div
        className="absolute top-1/2 border-t-2 border-gold"
        style={{ left: `${left}%`, width: `${right - left}%` }}
      />
      {to.map((t, i) => (
        <div
          key={i}
          className="absolute bottom-0 top-1/2 w-px bg-gold"
          style={{ left: `${t}%` }}
        />
      ))}
    </div>
  );
}

export async function OrganizationStructureChart() {
  const { t } = await getServerDict();
  const { pelindung, penasihat, ketuaUmum, wakilKetua, sekjen, bendahara, departments } =
    t.about.orgChart;

  const roleBoxes = [
    { label: wakilKetua, Icon: User },
    { label: sekjen, Icon: FileText },
    { label: bendahara, Icon: Wallet },
  ];
  const roleCenters = centersForColumns(roleBoxes.length);
  const deptCenters = centersForColumns(ORG_CHART_DEPARTMENTS.length);

  return (
    <section id="organization-structure" className="scroll-mt-[150px] bg-slate-50 py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
            {t.about.subNav.orgStructure}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
            {t.about.orgChartTitle}
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-gold" />
        </Reveal>

        <Reveal delay={100} className="mt-10 overflow-x-auto rounded-2xl bg-white p-6 shadow-sm sm:p-10">
          <div className="min-w-[720px]">
            <Pill variant="navy">{pelindung}</Pill>
            <Stem />
            <Pill variant="navy">{penasihat}</Pill>
            <Stem />
            <Pill variant="gold">{ketuaUmum}</Pill>

            {/* Chairman connects to all three roles below */}
            <Connector from={50} to={roleCenters} />

            <div className="grid grid-cols-3 gap-4">
              {roleBoxes.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-center text-sm font-semibold text-primary"
                >
                  <Icon className="size-4 shrink-0 text-gold" strokeWidth={2} />
                  {label}
                </div>
              ))}
            </div>

            {/* Secretary General (centered, same as Chairman above) connects
                to every department */}
            <Connector from={roleCenters[1]} to={deptCenters} />

            <div className="grid grid-cols-7 gap-3">
              {ORG_CHART_DEPARTMENTS.map(({ labelKey, icon: Icon }) => (
                <div
                  key={labelKey}
                  className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 px-2 py-4 text-center"
                >
                  <Icon className="size-5 text-gold" strokeWidth={1.75} />
                  <p className="text-xs font-semibold leading-snug text-primary">
                    {departments[labelKey]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
