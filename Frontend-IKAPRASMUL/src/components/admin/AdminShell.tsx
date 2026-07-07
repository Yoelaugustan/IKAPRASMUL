"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { KeyRound, LogOut, Menu, User } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { ChangeMyPasswordDialog } from "./ChangeMyPasswordDialog";
import { useLogout } from "./hooks/useLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageToggle } from "@/components/layouts/LanguageToggle";
import { useLang } from "@/components/shared/LanguageProvider";

interface AdminShellProps {
  email: string;
  isSuperAdmin?: boolean;
  permissions?: string[];
  children: React.ReactNode;
}

export function AdminShell({ email, isSuperAdmin = false, permissions = [], children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const { t } = useLang();
  const pathname = usePathname();
  const logout = useLogout();

  // The admin layout's server-side auth gate only runs on an actual
  // navigation request — Next reuses the cached layout across client-side
  // navigations between already-visited admin pages, so a session that
  // died while the tab sat open (overnight, or several restored tabs
  // racing to refresh) can otherwise go unnoticed until a write silently
  // fails. Re-check on every route change instead of waiting for that.
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => {
        if (!res.ok) {
          window.location.href = `/login?from=${encodeURIComponent(pathname)}`;
        }
      })
      .catch(() => {});
  }, [pathname]);

  return (
    <div className="flex h-dvh overflow-hidden bg-surface">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isSuperAdmin={isSuperAdmin}
        permissions={permissions}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={t.admin.openMenu}
              className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <AdminBreadcrumb />
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle variant="default" />
            <p className="hidden text-sm text-muted-foreground sm:block">
              {t.admin.signedInAs}{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label={t.admin.signedInAs}
                  className="grid size-8 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {email?.[0]?.toUpperCase() ?? "A"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="flex items-center gap-2 truncate">
                  <User className="size-4 shrink-0" /> {email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setPasswordDialogOpen(true)}>
                  <KeyRound /> {t.admin.changeMyPassword}
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  disabled={logout.isPending}
                  onClick={() => logout.mutate()}
                >
                  <LogOut /> {t.admin.signOut}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <ChangeMyPasswordDialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen} />

        <main
          className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 lg:p-8"
          data-lenis-prevent
        >
          {children}
        </main>
      </div>
    </div>
  );
}
