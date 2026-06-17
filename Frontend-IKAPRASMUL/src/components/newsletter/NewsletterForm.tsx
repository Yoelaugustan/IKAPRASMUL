"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { makeNewsletterSchema, type NewsletterInput } from "@/types/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/shared/LanguageProvider";
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
  const subscribe = useNewsletter(variant === "footer" ? "footer" : "news");
  const { t } = useLang();
  const schema = useMemo(() => makeNewsletterSchema(t.validation), [t]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(schema),
    // Consent is implied by submitting (disclosure shown below the field). We
    // keep it in the schema so the server contract stays explicit.
    defaultValues: { consent: true },
  });

  const onSubmit = (data: NewsletterInput) => {
    subscribe.mutate(data, {
      onSuccess: () => {
        toast.success(t.newsletter.successToast);
        reset({ email: "", consent: true });
      },
      onError: () => toast.error(t.newsletter.errorToast),
    });
  };

  const isDark = variant === "footer";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("w-full", className)}>
      <div className={cn("flex gap-3", isDark ? "flex-col" : "flex-col sm:flex-row")}>
        <div className="flex-1">
          <label htmlFor={`newsletter-${variant}`} className="sr-only">
            {t.newsletter.emailLabel}
          </label>
          <Input
            id={`newsletter-${variant}`}
            type="email"
            placeholder={t.newsletter.emailPlaceholder}
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
            t.newsletter.subscribe
          ) : (
            <>
              {t.newsletter.subscribe} <ArrowRight />
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
          {t.newsletter.consent}
        </p>
      )}
    </form>
  );
}
