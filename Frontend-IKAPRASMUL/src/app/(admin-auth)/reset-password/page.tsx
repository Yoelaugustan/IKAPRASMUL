import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Set New Password",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-primary">
        Set a new password
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Choose a strong password for your admin account.
      </p>
      <div className="mt-8">
        <ResetPasswordForm />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        <Link href={ROUTES.login} className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
