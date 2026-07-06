import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layouts/Container";

const HERO_IMAGE = "/images/about/hero.png";

// Hero Background
const STARFIELD_STYLE: React.CSSProperties = {
  backgroundImage: [
    "radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.9), transparent)",
    "radial-gradient(1px 1px at 60px 95px, rgba(255,255,255,0.55), transparent)",
    "radial-gradient(1.5px 1.5px at 105px 45px, rgba(255,255,255,0.8), transparent)",
    "radial-gradient(1px 1px at 145px 125px, rgba(255,255,255,0.5), transparent)",
    "radial-gradient(1px 1px at 185px 15px, rgba(255,255,255,0.65), transparent)",
    "radial-gradient(1.5px 1.5px at 25px 155px, rgba(255,255,255,0.75), transparent)",
    "radial-gradient(1px 1px at 150px 175px, rgba(255,255,255,0.55), transparent)",
    "radial-gradient(1px 1px at 205px 105px, rgba(255,255,255,0.6), transparent)",
  ].join(", "),
  backgroundRepeat: "repeat",
  backgroundSize: "220px 220px",
};

export function AboutHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#103870] via-[#0a3068] to-[#082850] text-primary-foreground"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70" style={STARFIELD_STYLE} />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-[#3d6bb0]/15 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 min-[1025px]:inset-y-0 min-[1025px]:left-auto min-[1025px]:right-0 min-[1025px]:w-[65%]">
        <Image
          src={HERO_IMAGE}
          alt="IKAPRASMUL board members and alumni"
          fill
          priority
          className="object-cover object-center min-[1025px]:object-contain"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#082850] via-[#082850]/70 to-transparent min-[1025px]:hidden" />

      <Container className="relative py-14 sm:py-16 lg:py-20">
        <div className="max-w-lg [&>*]:fill-mode-both [&>*]:duration-700 [&>*]:ease-out motion-reduce:[&>*]:animate-none">
          {eyebrow && (
            <p className="mb-4 flex animate-in items-center gap-3 text-sm font-semibold uppercase tracking-wider text-gold fade-in-0 slide-in-from-bottom-4">
              {eyebrow}
              <span className="h-px w-12 bg-gold" />
            </p>
          )}
          <h1
            className={cn(
              "animate-in text-balance text-4xl font-bold leading-tight tracking-tight fade-in-0 slide-in-from-bottom-4 sm:text-5xl",
              eyebrow ? "delay-100" : "",
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "mt-5 max-w-md animate-in text-base leading-7 text-primary-foreground/80 fade-in-0 slide-in-from-bottom-4 sm:text-lg",
                eyebrow ? "delay-200" : "delay-100",
              )}
            >
              {subtitle}
            </p>
          )}
          {children && (
            <div
              className={cn(
                "mt-8 animate-in fade-in-0 slide-in-from-bottom-4",
                eyebrow ? "delay-300" : "delay-200",
              )}
            >
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
