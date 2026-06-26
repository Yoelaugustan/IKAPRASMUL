"use client";

import { useState } from "react";
import type { SigGroup, SigSpotlight } from "@/types";
import { cn } from "@/lib/utils";
import { ResourcePage } from "./ResourcePage";
import { sigGroupsConfig } from "./configs/sigGroups";
import { sigSpotlightConfig } from "./configs/sigSpotlight";
import { useLang } from "@/components/shared/LanguageProvider";

type Tab = "groups" | "spotlight";

export function SigManager({
  groups,
  spotlights,
}: {
  groups: SigGroup[];
  spotlights: SigSpotlight[];
}) {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("groups");

  const tabs: { key: Tab; label: string }[] = [
    { key: "groups", label: t.admin.tabSigGroups },
    { key: "spotlight", label: t.admin.tabSigSpotlight },
  ];

  const subTabs = (
    <div className="inline-flex gap-1 rounded-lg bg-accent p-1">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setTab(key)}
          className={cn(
            "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
            tab === key
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return tab === "groups" ? (
    <ResourcePage
      key="groups"
      config={sigGroupsConfig(t.admin)}
      initialItems={groups}
      subTabs={subTabs}
    />
  ) : (
    <ResourcePage
      key="spotlight"
      config={sigSpotlightConfig(t.admin)}
      initialItems={spotlights}
      subTabs={subTabs}
    />
  );
}
