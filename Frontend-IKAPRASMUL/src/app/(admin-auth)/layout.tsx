import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layouts/Logo";
import { ROUTES } from "@/constants/routes";
import { getServerDict } from "@/i18n/server";

// Minimal layout for admin sign-in flows — no public header/footer.
// Mobile/tablet: image fills the screen as background, form floats on top.
// Desktop (900px+): classic split — image left column, form right column.
export default async function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = await getServerDict();

  return (
    <div className="relative min-h-screen min-[900px]:grid min-[900px]:grid-cols-[1.5fr_1fr]">
      {/* Image panel — absolute full-screen bg on mobile, left grid column on desktop */}
      <aside className="absolute inset-0 flex flex-col justify-between overflow-hidden min-[900px]:relative min-[900px]:inset-auto">
        <Image
          src="/images/auth/building.jpg"
          alt="IKAPRASMUL building"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/80" />
        <div className="relative z-10 flex h-full flex-col justify-between p-8 min-[900px]:p-12">
          <Logo variant="inverted" />
          <div className="hidden min-[900px]:block">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              {t.admin.adminConsole}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white">
              {t.admin.adminTagline}
            </h1>
            <p className="mt-4 max-w-md text-white/70">
              {t.admin.adminDesc}
            </p>
          </div>
          <p className="hidden text-xs text-white/50 min-[900px]:block">
            © 2024 IKAPRASMUL
          </p>
        </div>
      </aside>

      {/* Form panel — floats above image on mobile, right grid column on desktop */}
      <main className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-12 sm:px-12 min-[900px]:min-h-0 min-[900px]:bg-slate-50">
        <div className="mx-auto w-full max-w-md">
          <Link
            href={ROUTES.home}
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white min-[900px]:text-muted-foreground min-[900px]:hover:text-primary"
          >
            <ArrowLeft className="size-4" /> {t.admin.backToSite}
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
}
