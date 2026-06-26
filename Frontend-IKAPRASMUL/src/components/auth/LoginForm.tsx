"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { adminLoginSchema, type AdminLoginInput } from "@/types/schemas";
import { useLogin } from "./hooks/useLogin";
import { useLang } from "@/components/shared/LanguageProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useLogin();
  const { t } = useLang();

  const form = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: AdminLoginInput) => {
    try {
      await login.mutateAsync(data);
      const from = searchParams.get("from") ?? ROUTES.admin;
      router.push(from);
      router.refresh();
    } catch {
      // error displayed via login.error below
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {login.error && (
          <p
            role="alert"
            className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {login.error.message}
          </p>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.admin.emailLabel}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="admin@prasmul.ac.id"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.admin.passwordLabel}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="gold"
          className="w-full"
          disabled={login.isPending}
        >
          {login.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            t.admin.signIn
          )}
        </Button>
      </form>
    </Form>
  );
}
