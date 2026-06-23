import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="rounded-2xl bg-card px-12 py-10 shadow-xl">
      <h2 className="text-2xl font-bold tracking-tight text-primary">
        Sign in to the admin console
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Enter your admin credentials to continue.
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
