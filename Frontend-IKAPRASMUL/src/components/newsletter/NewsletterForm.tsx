"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { newsletterSchema, type NewsletterInput } from "@/types/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNewsletter } from "./hooks/useNewsletter";

type NewsletterFormProps = {
  /** "footer" = compact dark theme; "card" = light Stay-Informed card. */
  variant?: "footer" | "card";
  className?: string;
};

export function NewsletterForm({
  variant = "footer",
  className,
}: NewsletterFormProps) {
  const subscribe = useNewsletter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    // Consent is implied by submitting (disclosure shown below the field). We
    // keep it in the schema so the server contract stays explicit.
    defaultValues: { consent: true },
  });

  const onSubmit = (data: NewsletterInput) => {
    subscribe.mutate(data, {
      onSuccess: () => {
        toast.success("You're subscribed! Watch your inbox for updates.");
        reset({ email: "", consent: true });
      },
      onError: () =>
        toast.error("Something went wrong. Please try again."),
    });
  };

  const isDark = variant === "footer";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("w-full", className)}>
      <div className={cn("flex gap-3", isDark ? "flex-col" : "flex-col sm:flex-row")}>
        <div className="flex-1">
          <label htmlFor={`newsletter-${variant}`} className="sr-only">
            Email address
          </label>
          <Input
            id={`newsletter-${variant}`}
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={cn(
              isDark &&
                "border-white/15 bg-white/5 text-primary-foreground placeholder:text-primary-foreground/40",
            )}
            {...register("email")}
          />
        </div>
        <Button
          type="submit"
          variant="gold"
          disabled={subscribe.isPending}
          className={cn("shrink-0 font-semibold uppercase tracking-wide", isDark && "w-full")}
        >
          {subscribe.isPending ? (
            <Loader2 className="animate-spin" />
          ) : isDark ? (
            "Subscribe"
          ) : (
            <>
              Subscribe <ArrowRight />
            </>
          )}
        </Button>
      </div>
      {errors.email && (
        <p
          className={cn(
            "mt-1.5 text-sm text-destructive",
            isDark && "text-red-300",
          )}
        >
          {errors.email.message}
        </p>
      )}
      {!isDark && (
        <p className="mt-2 text-xs text-muted-foreground">
          By subscribing you agree to receive updates. Unsubscribe anytime.
        </p>
      )}
    </form>
  );
}
