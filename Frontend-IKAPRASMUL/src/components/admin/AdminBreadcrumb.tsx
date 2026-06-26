"use client";

import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useLang } from "@/components/shared/LanguageProvider";

export function AdminBreadcrumb() {
  const pathname = usePathname();
  const { t } = useLang();

  const SECTIONS = [
    { href: ROUTES.adminSig, label: t.admin.sigGroups },
    { href: ROUTES.adminBusiness, label: t.admin.alumniBusiness },
    { href: ROUTES.adminStories, label: t.admin.alumniStories },
    { href: ROUTES.adminNews, label: t.admin.newsInsights },
    { href: ROUTES.adminEvents, label: t.admin.events },
    { href: ROUTES.adminUsers, label: t.admin.userManagement },
  ];

  const current =
    SECTIONS.find((section) => pathname.startsWith(section.href))?.label ??
    t.admin.dashboard;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>{t.admin.breadcrumbRoot}</span>
      <span className="text-border">/</span>
      <span className="font-semibold text-foreground">{current}</span>
    </div>
  );
}
