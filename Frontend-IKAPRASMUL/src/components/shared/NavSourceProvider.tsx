"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";

// Exposes the path the user navigated *from*, so a detail page's "Back to X"
// button can name where it was opened. The provider sits above the page in the
// tree, so its value is set before the page (and its BackButton) render.
const NavSourceContext = createContext<string | null>(null);

export const useNavSource = () => useContext(NavSourceContext);

export function NavSourceProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [paths, setPaths] = useState<{
    current: string | null;
    previous: string | null;
  }>({ current: null, previous: null });

  // Derive previous-from-current during render (a supported React pattern for
  // storing info from previous renders) — runs once per path change.
  if (paths.current !== pathname) {
    setPaths({ current: pathname, previous: paths.current });
  }

  return (
    <NavSourceContext.Provider value={paths.previous}>
      {children}
    </NavSourceContext.Provider>
  );
}
