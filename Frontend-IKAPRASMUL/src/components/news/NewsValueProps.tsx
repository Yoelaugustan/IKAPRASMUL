"use client";

import {
  BookOpenIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
} from "@/components/icons";
import { useLang } from "@/components/shared/LanguageProvider";

// Icons stay here; the titles/descriptions come from the dictionary by position.
const ICONS = [BookOpenIcon, TargetIcon, TrendingUpIcon, UsersIcon];

export function NewsValueProps() {
  const { t } = useLang();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {t.newsList.valueProps.map(({ title, description }, i) => {
        const Icon = ICONS[i] ?? BookOpenIcon;
        return (
          <div key={title} className="flex items-start gap-3.5">
            <Icon className="mt-0.5 size-6 shrink-0 text-primary" />
            <div>
              <h3 className="text-[15px] font-bold text-slate-900">{title}</h3>
              <p className="mt-1 text-[13px] leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
