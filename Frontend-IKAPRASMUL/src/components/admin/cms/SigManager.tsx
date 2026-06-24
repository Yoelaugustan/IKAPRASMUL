"use client";

import { useState } from "react";
import type { SigGroup, SigSpotlight } from "@/types";
import { cn } from "@/lib/utils";
import { ResourcePage } from "./ResourcePage";
import { sigGroupsConfig } from "./configs/sigGroups";
import { sigSpotlightConfig } from "./configs/sigSpotlight";

type Tab = "groups" | "spotlight";

export function SigManager({
  groups,
  spotlights,
}: {
  groups: SigGroup[];
  spotlights: SigSpotlight[];
}) {
  const [tab, setTab] = useState<Tab>("groups");

  const subTabs = (
    <div className="inline-flex gap-1 rounded-lg bg-accent p-1">
      {(
        [
          ["groups", "SIG Groups"],
          ["spotlight", "SIG Spotlight"],
        ] as const
      ).map(([key, label]) => (
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

  // Keyed so each tab gets its own fresh local CRUD state.
  return tab === "groups" ? (
    <ResourcePage
      key="groups"
      config={sigGroupsConfig}
      initialItems={groups}
      subTabs={subTabs}
    />
  ) : (
    <ResourcePage
      key="spotlight"
      config={sigSpotlightConfig}
      initialItems={spotlights}
      subTabs={subTabs}
    />
  );
}
