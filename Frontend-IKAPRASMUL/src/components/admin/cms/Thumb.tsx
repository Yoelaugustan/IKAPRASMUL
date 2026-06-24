import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Small list thumbnail. `unoptimized` so admin-entered URLs (any host) render
// without needing next.config remotePatterns; /media paths stay same-origin.
export function Thumb({
  src,
  alt,
  rounded = false,
}: {
  src?: string;
  alt: string;
  rounded?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative grid size-10 shrink-0 place-items-center overflow-hidden bg-surface",
        rounded ? "rounded-full" : "rounded-md",
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="40px"
          className="object-cover"
        />
      ) : (
        <ImageIcon className="size-4 text-muted-foreground" aria-hidden />
      )}
    </span>
  );
}
