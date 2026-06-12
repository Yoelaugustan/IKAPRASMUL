"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  CalendarDays,
  FileText,
  Home,
  Inbox,
  LayoutDashboard,
  Mail,
  Newspaper,
  Users2,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { Logo } from "@/components/layouts/Logo";

const NAV = [
  { label: "Dashboard", href: ROUTES.admin, Icon: LayoutDashboard },
  { label: "Home Curation", href: ROUTES.adminHome, Icon: Home },
  { label: "SIGs", href: ROUTES.adminSig, Icon: Users2 },
  { label: "Stories", href: ROUTES.adminStories, Icon: FileText },
  { label: "News", href: ROUTES.adminNews, Icon: Newspaper },
  { label: "Business", href: ROUTES.adminBusiness, Icon: Building2 },
  { label: "Events", href: ROUTES.adminEvents, Icon: CalendarDays },
  { label: "About", href: ROUTES.adminAbout, Icon: Info },
  { label: "Inquiries", href: ROUTES.adminInquiries, Icon: Inbox },
  { label: "Newsletter", href: ROUTES.adminNewsletter, Icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === ROUTES.admin ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      <div className="border-b border-sidebar-border p-5">
        <Logo variant="inverted" />
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
    </aside>
  );
}
