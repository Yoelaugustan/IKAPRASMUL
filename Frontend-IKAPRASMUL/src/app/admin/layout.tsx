import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { ROUTES } from "@/constants/routes";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
// Role-gated admin shell. Deny-by-default (security-standard §3): no valid
// Admin session → redirect to sign-in. This runs server-side on every request,
// in addition to the coarse proxy.ts gate.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session || session.role !== "Admin") {
    redirect(ROUTES.login);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
          <AdminBreadcrumb />
          <div className="flex items-center gap-4">
            <p className="hidden text-sm text-muted-foreground sm:block">
              Signed in as{" "}
              <span className="font-medium text-foreground">
                {session.email}
              </span>
            </p>
            <span className="grid size-8 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {session.email?.[0]?.toUpperCase() ?? "A"}
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto min-h-0 p-6 lg:p-8" data-lenis-prevent>
          {children}
        </main>
      </div>
    </div>
  );
}
