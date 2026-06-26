import { useMutation } from "@tanstack/react-query";
import type { AdminLoginInput } from "@/types/schemas";
import { client } from "@/lib/api";

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: AdminLoginInput) =>
      client.post("/api/auth/login", credentials).then(() => undefined),
  });
}
