import Image from "next/image";
import { cn } from "@/lib/utils";

// Logo component. `inverted` uses the white PNG asset (for navy header/footer).
// `default` falls back to text-based mark (for light backgrounds like the mobile sheet).
export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "inverted";
}) {
  if (variant === "inverted") {
    return (
      <span className={cn("flex items-center", className)}>
        <Image
          src="/images/logo-white.png"
          alt="IKAPRASMUL"
          width={250}
          height={100}
          priority
          className="h-16 w-auto object-contain"
        />
      </span>
    );
  }

  // Text fallback for light backgrounds (mobile sheet, etc.)
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-primary text-[9px] font-bold text-primary">
        IKA
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-tight text-primary">
          <span className="font-light">IKA</span>PRASMUL
        </span>
        <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Empowering Alumni, Enabling Impact
        </span>
      </span>
    </span>
  );
}
