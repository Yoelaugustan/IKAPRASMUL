import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { ROUTES } from "@/constants/routes";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { LogoutButton } from "@/components/admin/LogoutButton";

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
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
          <p className="text-sm text-muted-foreground">
            Signed in as{" "}
            <span className="font-medium text-foreground">{session.email}</span>
          </p>
          <LogoutButton />
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
