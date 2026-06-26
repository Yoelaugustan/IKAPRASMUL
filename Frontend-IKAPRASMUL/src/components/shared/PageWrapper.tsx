"use client";

import { usePathname } from "next/navigation";

// Re-mounts on every route change so the fade-in animation replays per page.
export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div
      key={pathname}
      className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300"
    >
      {children}
    </div>
  );
}
