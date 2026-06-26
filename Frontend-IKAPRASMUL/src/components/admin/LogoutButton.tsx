"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { client } from "@/lib/api";
import { useLang } from "@/components/shared/LanguageProvider";

type LogoutButtonProps = React.ComponentProps<typeof Button>;

export function LogoutButton({ className, variant = "outline", size = "sm", ...props }: LogoutButtonProps) {
  const router = useRouter();
  const { t } = useLang();

  const logout = useMutation({
    mutationFn: () => client.post("/api/auth/logout").then(() => undefined),
    onSuccess: () => {
      router.push(ROUTES.login);
      router.refresh();
    },
  });

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
