"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(ROUTES.login);
    router.refresh();
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      <LogOut /> Sign out
    </Button>
  );
}
