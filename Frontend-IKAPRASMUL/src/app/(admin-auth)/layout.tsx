import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layouts/Logo";
import { ROUTES } from "@/constants/routes";

// Minimal layout for admin sign-in flows — no public header/footer. Split
// image panel + content. There is no public registration.
export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.5fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden lg:flex">
        {/* Building photo */}
        <Image
          src="/images/auth/building.jpg"
          alt="IKAPRASMUL building"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/80" />
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <Logo variant="inverted" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Admin Console
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white">
              Manage the home of Prasmul alumni.
            </h1>
            <p className="mt-4 max-w-md text-white/70">
              Author stories, curate the homepage, manage SIGs and business
              listings, and respond to inquiries — all in one place.
            </p>
          </div>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} IKAPRASMUL
          </p>
        </div>
      </aside>

      <main className="flex flex-col justify-center bg-slate-50 px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
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
