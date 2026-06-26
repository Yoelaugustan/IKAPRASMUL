import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { getServerDict } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const { t } = await getServerDict();

  return (
    <div className="rounded-2xl bg-card px-12 py-10 shadow-xl">
      <h2 className="text-2xl font-bold tracking-tight text-primary">
        {t.admin.loginTitle}
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {t.admin.loginSubtitle}
      </p>
      <div className="mt-8">
        {/* LoginForm reads search params (?from=) → needs a Suspense boundary. */}
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
