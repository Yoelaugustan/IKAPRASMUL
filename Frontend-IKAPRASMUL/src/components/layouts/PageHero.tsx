import Image from "next/image";
import { cn } from "@/lib/utils";
import { HERO_BLUR } from "@/lib/heroBlur";
import { Container } from "./Container";

type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
  /** Optional full-bleed background photo (e.g. for About page). */
  backgroundImage?: string;
  /** Add extra bottom padding to make room for an overlapping band below
   * (e.g. ImpactStats, which pulls itself up with a negative margin). */
  overlap?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  children,
  backgroundImage,
  overlap = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-primary text-primary-foreground",
        className,
      )}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          placeholder={HERO_BLUR[backgroundImage] ? "blur" : "empty"}
          blurDataURL={HERO_BLUR[backgroundImage]}
          sizes="100vw"
          className="object-cover"
        />
      )}
      {/* gradient: full bleed when there's an image; subtle glow when plain */}
      {backgroundImage ? (
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        </>
      )}

      <Container
        className={cn(
          "relative pt-20 sm:pt-24 lg:pt-28",
          overlap ? "pb-40 sm:pb-48 lg:pb-52" : "pb-20 sm:pb-24 lg:pb-28",
        )}
      >
        <div
          className={cn(
            "max-w-3xl animate-in fade-in-0 slide-in-from-bottom-4 duration-700 ease-out motion-reduce:animate-none",
            align === "center" && "mx-auto text-center",
          )}
        >
          {eyebrow && (
            <p
              className={cn(
                "mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-gold",
                align === "center" && "justify-center",
              )}
            >
              {eyebrow}
              <span className="h-px w-12 bg-gold" />
            </p>
          )}
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
