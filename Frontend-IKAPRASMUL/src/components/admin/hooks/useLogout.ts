"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { client } from "@/lib/api";

// Shared by LogoutButton (sidebar) and the profile dropdown's "Sign out" item.
export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: () => client.post("/api/auth/logout").then(() => undefined),
    onSuccess: () => {
      router.push(ROUTES.login);
      router.refresh();
    },
  });
}
