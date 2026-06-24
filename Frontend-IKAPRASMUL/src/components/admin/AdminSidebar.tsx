"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users2,
  Building2,
  BookOpen,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { LogoutButton } from "@/components/admin/LogoutButton";

// Content Admin nav — the five sections from the Admin Dashboard design.
const NAV = [
  { label: "Dashboard", href: ROUTES.admin, Icon: LayoutDashboard },
  { label: "SIG Groups", href: ROUTES.adminSig, Icon: Users2 },
  { label: "Alumni Business", href: ROUTES.adminBusiness, Icon: Building2 },
  { label: "Alumni Stories", href: ROUTES.adminStories, Icon: BookOpen },
  { label: "News & Insights", href: ROUTES.adminNews, Icon: Newspaper },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === ROUTES.admin ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      <div className="flex items-center gap-3 border-b border-sidebar-border p-5">
        <Image
          src="/images/logo-white.png"
          alt="IKAPRASMUL Logo"
          width={150}
          height={40}
          className="object-contain"
        />
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV.map(({ label, href, Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive(href)
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4 flex flex-col gap-4">
        <LogoutButton
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
        />
      </div>
    </aside>
  );
}
