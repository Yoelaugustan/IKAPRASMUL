import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { ROUTES } from "@/constants/routes";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session || session.role !== "Admin") {
    redirect(ROUTES.login);
  }

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
