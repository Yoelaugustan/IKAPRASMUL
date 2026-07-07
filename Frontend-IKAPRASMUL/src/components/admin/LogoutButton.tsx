"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/shared/LanguageProvider";
import { useLogout } from "./hooks/useLogout";

type LogoutButtonProps = React.ComponentProps<typeof Button>;

export function LogoutButton({ className, variant = "outline", size = "sm", ...props }: LogoutButtonProps) {
  const { t } = useLang();
  const logout = useLogout();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      disabled={logout.isPending}
      onClick={() => logout.mutate()}
      {...props}
    >
      <LogOut className="mr-2 size-4" /> {t.admin.signOut}
    </Button>
  );
}
