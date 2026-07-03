import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MailX } from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { getServerDict } from "@/i18n/server";

const API_URL = process.env.API_URL ?? "http://localhost:5080";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

async function unsubscribe(email: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${API_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`,
      { cache: "no-store" },
    );
    return res.ok;
  } catch {
    return false;
  }
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { t } = await getServerDict();
  const { email } = await searchParams;

  const success = Boolean(email) && (await unsubscribe(email!));

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-secondary/40 py-20">
      <Container className="flex justify-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-[0_2px_20px_rgba(0,0,0,0.05)]">
          <span
            className={cn(
              "mx-auto grid size-16 place-items-center rounded-full",
              success ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500",
            )}
          >
            {success ? (
              <CheckCircle2 className="size-8" />
            ) : (
              <MailX className="size-8" />
            )}
          </span>

          <h1 className="mt-6 text-2xl font-bold text-primary">
            {success ? t.unsubscribe.successTitle : t.unsubscribe.errorTitle}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {success ? t.unsubscribe.successDesc : t.unsubscribe.errorDesc}
          </p>

          {success && email && (
            <p className="mt-3 text-xs font-medium text-slate-400">{email}</p>
          )}

          <Link
            href={ROUTES.home}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.unsubscribe.backHome}
          </Link>
        </div>
      </Container>
    </div>
  );
}
