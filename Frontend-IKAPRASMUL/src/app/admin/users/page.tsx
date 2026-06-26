import type { Metadata } from "next";
import { getAdminUsers } from "@/lib/adminContent";
import { getAdminSession } from "@/lib/auth";
import { UsersManager } from "@/components/admin/UsersManager";

export const metadata: Metadata = {
  title: "User Management",
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  const [users, session] = await Promise.all([getAdminUsers(), getAdminSession()]);
  return <UsersManager users={users} isSuperAdmin={session?.role === "SuperAdmin"} />;
}
