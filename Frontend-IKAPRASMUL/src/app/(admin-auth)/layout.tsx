import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layouts/Logo";
import { ROUTES } from "@/constants/routes";

// Minimal layout for admin sign-in flows — no public header/footer. Split
// navy brand panel + content. There is no public registration.
export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <Logo variant="inverted" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Admin Console
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight">
            Manage the home of Prasmul alumni.
          </h1>
          <p className="mt-4 max-w-md text-primary-foreground/70">
            Author stories, curate the homepage, manage SIGs and business
            listings, and respond to inquiries — all in one place.
          </p>
        </div>
        <p className="relative text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} IKAPRASMUL
        </p>
      </aside>

      <main className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link
            href={ROUTES.home}
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Back to site
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
}
