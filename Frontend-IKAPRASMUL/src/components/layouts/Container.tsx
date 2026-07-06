import { cn } from "@/lib/utils";

// Centered content wrapper with consistent gutters. Max width widened from
// the original ~1280px Figma canvas so large screens use more of the
// available width instead of leaving big empty side margins.
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1536px] px-6 sm:px-8 lg:px-12 xl:px-16", className)}>
      {children}
    </div>
  );
}
