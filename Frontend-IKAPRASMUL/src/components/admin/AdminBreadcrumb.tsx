"use client";

import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const SECTIONS: { href: string; label: string }[] = [
  { href: ROUTES.adminSig, label: "SIG Groups" },
  { href: ROUTES.adminBusiness, label: "Alumni Business" },
  { href: ROUTES.adminStories, label: "Alumni Stories" },
  { href: ROUTES.adminNews, label: "News & Insights" },
];

// "Admin / <section>" breadcrumb mirroring the design header.
export function AdminBreadcrumb() {
  const pathname = usePathname();
  const current =
    SECTIONS.find((section) => pathname.startsWith(section.href))?.label ??
    "Dashboard";

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Admin</span>
      <span className="text-border">/</span>
      <span className="font-semibold text-foreground">{current}</span>
    </div>
  );
}
