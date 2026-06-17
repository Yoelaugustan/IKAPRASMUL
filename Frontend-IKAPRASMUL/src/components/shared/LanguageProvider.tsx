"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { LANG_COOKIE, type Lang } from "@/i18n/config";
import { dictionaries, type Dictionary } from "@/i18n/dictionaries";

type LanguageContextValue = {
  lang: Lang;
  /** Dictionary for the current language. */
  t: Dictionary;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Holds the active language for client components and keeps it in sync with the
// server. `initialLang` comes from the cookie read in the root layout (RSC), so
// the first render already matches what the server rendered. Switching writes
// the cookie and calls router.refresh() so Server Components re-render too.
export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>(initialLang);

  function changeLang(next: Lang) {
    if (next === lang) return;
    setLang(next);
    // Persist for SSR + future visits (1 year). Read by getLang() on the server.
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    // Re-render Server Components (page content, footer, etc.) in the new language.
    router.refresh();
  }

  const value: LanguageContextValue = {
    lang,
    t: dictionaries[lang],
    setLang: changeLang,
    toggle: () => changeLang(lang === "en" ? "id" : "en"),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
