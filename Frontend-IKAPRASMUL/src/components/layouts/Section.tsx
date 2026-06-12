import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  /** Small uppercase eyebrow above the title. */
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Visual background treatment. */
  variant?: "default" | "surface";
  className?: string;
  containerClassName?: string;
  headerAlign?: "left" | "center";
  children: React.ReactNode;
};

export function Section({
  eyebrow,
  title,
  description,
  variant = "default",
  className,
  containerClassName,
  headerAlign = "left",
  children,
}: SectionProps) {
  const hasHeader = eyebrow || title || description;
  return (
    <section
      className={cn(
        "py-16 sm:py-20",
        variant === "surface" && "bg-surface",
        className,
      )}
    >
      <Container className={containerClassName}>
        {hasHeader && (
          <div
            className={cn(
              "mb-10 max-w-2xl",
              headerAlign === "center" && "mx-auto text-center",
            )}
          >
            {eyebrow && (
              <p
                className={cn(
                  "mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-gold",
                  headerAlign === "center" && "justify-center",
                )}
              >
                {eyebrow}
                <span className="h-px w-12 bg-gold" />
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
