"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

interface LogoutButtonProps extends React.ComponentProps<typeof Button> {}

export function LogoutButton({ className, variant = "outline", size = "sm", ...props }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(ROUTES.login);
    router.refresh();
  };

  return (
    <Button variant={variant} size={size} className={className} onClick={handleLogout} {...props}>
      <LogOut className="mr-2 size-4" /> Sign out
    </Button>
  );
}
