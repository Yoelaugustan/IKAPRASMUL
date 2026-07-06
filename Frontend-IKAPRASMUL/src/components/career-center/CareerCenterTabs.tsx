"use client";

import { useState } from "react";
import { ArrowRight, Briefcase, Building2, GraduationCap, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/shared/LanguageProvider";

const CAREER_PORTAL_URL =
  "https://www.prasetiyamulya.ac.id/pusat-pengembangan-karir-mahasiswa/";

type TabId = "jobs" | "internship";

export function CareerCenterTabs() {
  const { t } = useLang();
  const c = t.careerCenter;
  const [tab, setTab] = useState<TabId>("jobs");

  const talentTitle = tab === "jobs" ? c.jobsTalentTitle : c.internshipTalentTitle;
  const talentDesc = tab === "jobs" ? c.jobsTalentDesc : c.internshipTalentDesc;
  const recruiterTitle = tab === "jobs" ? c.jobsRecruiterTitle : c.internshipRecruiterTitle;
  const recruiterDesc = tab === "jobs" ? c.jobsRecruiterDesc : c.internshipRecruiterDesc;

  const TABS: { id: TabId; label: string; Icon: typeof Briefcase }[] = [
    { id: "jobs", label: c.tabJobs, Icon: Briefcase },
    { id: "internship", label: c.tabInternship, Icon: GraduationCap },
  ];

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-100 bg-white p-1.5 shadow-sm">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                  tab === id
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal
            key={`${tab}-talent`}
            delay={80}
            className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-8 py-9 text-center shadow-sm"
          >
            <span className="grid size-14 place-items-center rounded-full bg-primary">
              <UserRound className="size-6 text-gold" strokeWidth={1.75} />
            </span>
            <span className="mt-4 block h-1 w-10 rounded-full bg-gold" />
            <h3 className="mt-4 text-base font-bold text-primary sm:text-lg">
              {talentTitle}
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-7 text-muted-foreground sm:text-base">
              {talentDesc}
            </p>
          </Reveal>

          <Reveal
            key={`${tab}-recruiter`}
            delay={140}
            className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-8 py-9 text-center shadow-sm"
          >
            <span className="grid size-14 place-items-center rounded-full bg-primary">
              <Building2 className="size-6 text-gold" strokeWidth={1.75} />
            </span>
            <span className="mt-4 block h-1 w-10 rounded-full bg-gold" />
            <h3 className="mt-4 text-base font-bold text-primary sm:text-lg">
              {recruiterTitle}
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-7 text-muted-foreground sm:text-base">
              {recruiterDesc}
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-10 flex justify-center">
          <Button asChild variant="gold" size="lg">
            <a href={CAREER_PORTAL_URL} target="_blank" rel="noreferrer">
              {c.ctaLabel}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
